import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { sendInquiryEmails, type OutgoingEmail } from "./email.ts";
import type { InquiryInput } from "./inquiry/schema.ts";
import type { ContactInput } from "./contact/schema.ts";

// Inga riktiga mejl: en låtsasavsändare samlar det som skulle ha skickats.
function mockSender(fail = false) {
  const sent: OutgoingEmail[] = [];
  return {
    sent,
    send: async (email: OutgoingEmail) => {
      sent.push(email);
      return fail ? { error: { message: "fel" } } : {};
    },
  };
}

const inquiry: InquiryInput = {
  companySlug: "smart-escapes",
  firstName: "Anna",
  email: "anna@example.com",
  whatsapp: "+46700000000",
  countryOfResidence: "Sverige",
  travelDates: "",
  travelers: "2",
  experienceTypes: ["safari-adventures"],
  dreamTrip: "Safari",
  consent: true,
  website: "",
};

const company = { slug: "smart-escapes", name: "Smart Escape Limited" };
const env = {
  RESEND_API_KEY: "re_test",
  INQUIRY_TO_SMART_ESCAPES: "foretag@example.com",
};

// Tystar varningar och loggar i testutskriften.
const quiet = <T>(fn: () => Promise<T>) => {
  const { log, warn, error } = console;
  console.log = console.warn = console.error = () => {};
  return fn().finally(() => Object.assign(console, { log, warn, error }));
};

describe("sendInquiryEmails", () => {
  test("känt företag: notis till företagets adress, bekräftelse till kunden", async () => {
    const mock = mockSender();
    const result = await quiet(() =>
      sendInquiryEmails(inquiry, company, { env, send: mock.send }),
    );
    assert.deepEqual(result, { customer: "sent", notification: "sent" });
    const notice = mock.sent.find((m) => m.to === "foretag@example.com");
    assert.ok(notice, "notis till företaget");
    assert.equal(notice.replyTo, "anna@example.com");
    assert.match(notice.subject, /Smart Escape Limited/);
    const confirmation = mock.sent.find((m) => m.to === "anna@example.com");
    assert.ok(confirmation, "bekräftelse till kunden");
    assert.equal(mock.sent.length, 2);
  });

  test("företag utan mottagaradress: inga mejl, bara loggning", async () => {
    const mock = mockSender();
    const warnings: string[] = [];
    const { warn } = console;
    console.warn = (msg: string) => warnings.push(msg);
    const result = await sendInquiryEmails(
      inquiry,
      { slug: "okant-foretag", name: "Okänt" },
      { env, send: mock.send },
    ).finally(() => (console.warn = warn));
    assert.deepEqual(result, { customer: "skipped", notification: "skipped" });
    assert.equal(mock.sent.length, 0);
    assert.match(warnings.join(" "), /okant-foretag/);
  });

  test("/kontakta-oss: notis till info@localsafarifinder.com", async () => {
    const mock = mockSender();
    const message: ContactInput = {
      name: "Bo",
      email: "bo@example.com",
      message: "Hej",
      consent: true,
      website: "",
    };
    await quiet(() =>
      sendInquiryEmails(message, null, { env, send: mock.send }),
    );
    assert.deepEqual(mock.sent.map((m) => m.to).sort(), [
      "bo@example.com",
      "info@localsafarifinder.com",
    ]);
  });

  test("misslyckat utskick kastar inte", async () => {
    const mock = mockSender(true);
    const result = await quiet(() =>
      sendInquiryEmails(inquiry, company, { env, send: mock.send }),
    );
    assert.deepEqual(result, { customer: "failed", notification: "failed" });
  });

  test("utan RESEND_API_KEY skickas inget", async () => {
    const result = await quiet(() =>
      sendInquiryEmails(inquiry, company, {
        env: { INQUIRY_TO_SMART_ESCAPES: "foretag@example.com" },
      }),
    );
    assert.deepEqual(result, { customer: "skipped", notification: "skipped" });
  });
});
