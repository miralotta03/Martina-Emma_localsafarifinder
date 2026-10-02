import { describe, test } from "node:test";
import assert from "node:assert/strict";
import {
  buildDestinationOptions,
  parseSearchParams,
  searchCompanies,
  toSearchHref,
  type SearchVocabulary,
} from "./search.ts";

// Egna testföretag, så att testerna inte beror på (platshållar)datan.
const moshi = { country: "Tanzania", city: "Moshi", slug: "tanzania-moshi" };
const arusha = { country: "Tanzania", city: "Arusha", slug: "tanzania-arusha" };
const nairobi = { country: "Kenya", city: "Nairobi", slug: "kenya-nairobi" };

const companies = [
  {
    slug: "berg",
    categories: ["for-tva" as const],
    activityTypes: ["bergsvandring" as const],
    destinations: [moshi],
  },
  {
    slug: "strand",
    categories: ["med-barn" as const, "for-tva" as const],
    activityTypes: ["strandsemester" as const, "paketresor" as const],
    destinations: [arusha],
  },
  {
    slug: "kenya",
    categories: ["dela-upplevelsen" as const],
    activityTypes: ["safariaventyr" as const],
    destinations: [nairobi],
  },
];

const slugs = (query: Parameters<typeof searchCompanies>[1]) =>
  searchCompanies(companies, query).map((c) => c.slug);

describe("searchCompanies", () => {
  test("tom sökning visar alla företag", () => {
    assert.deepEqual(slugs({}), ["berg", "strand", "kenya"]);
    assert.deepEqual(slugs({ aktiviteter: [] }), ["berg", "strand", "kenya"]);
  });

  test("bara destination (stad)", () => {
    assert.deepEqual(slugs({ destination: "tanzania-moshi" }), ["berg"]);
  });

  test("hela landet matchar alla städer i landet", () => {
    assert.deepEqual(slugs({ destination: "tanzania" }), ["berg", "strand"]);
    assert.deepEqual(slugs({ destination: "kenya" }), ["kenya"]);
  });

  test("flera aktiviteter matchar med ELLER", () => {
    assert.deepEqual(slugs({ aktiviteter: ["bergsvandring", "safariaventyr"] }), [
      "berg",
      "kenya",
    ]);
  });

  test("fälten kombineras med OCH", () => {
    assert.deepEqual(slugs({ destination: "tanzania", typ: "for-tva" }), [
      "berg",
      "strand",
    ]);
    assert.deepEqual(
      slugs({
        destination: "tanzania",
        typ: "for-tva",
        aktiviteter: ["paketresor"],
      }),
      ["strand"],
    );
  });

  test("ingen träff", () => {
    assert.deepEqual(
      slugs({ destination: "kenya", aktiviteter: ["bergsvandring"] }),
      [],
    );
  });
});

describe("buildDestinationOptions", () => {
  test("grupperar per land och sorterar", () => {
    assert.deepEqual(buildDestinationOptions(companies), [
      {
        country: "Kenya",
        slug: "kenya",
        cities: [{ city: "Nairobi", slug: "kenya-nairobi" }],
      },
      {
        country: "Tanzania",
        slug: "tanzania",
        cities: [
          { city: "Arusha", slug: "tanzania-arusha" },
          { city: "Moshi", slug: "tanzania-moshi" },
        ],
      },
    ]);
  });
});

describe("parseSearchParams", () => {
  const vocabulary: SearchVocabulary = {
    destinations: buildDestinationOptions(companies),
    travelTypes: ["for-tva", "med-barn", "pa-egen-hand", "dela-upplevelsen"],
    activities: ["bergsvandring", "safariaventyr", "strandsemester", "paketresor"],
  };

  test("läser giltiga värden", () => {
    assert.deepEqual(
      parseSearchParams(
        {
          destination: "tanzania-moshi",
          typ: "for-tva",
          aktivitet: "bergsvandring,safariaventyr",
        },
        vocabulary,
      ),
      {
        destination: "tanzania-moshi",
        typ: "for-tva",
        aktiviteter: ["bergsvandring", "safariaventyr"],
      },
    );
  });

  test("tar emot upprepade aktivitet-parametrar och dubbletter", () => {
    assert.deepEqual(
      parseSearchParams(
        { aktivitet: ["bergsvandring", "paketresor,bergsvandring"] },
        vocabulary,
      ),
      { aktiviteter: ["bergsvandring", "paketresor"] },
    );
  });

  test("ignorerar okända och tomma värden", () => {
    assert.deepEqual(
      parseSearchParams(
        {
          destination: "mars",
          typ: "xyz",
          aktivitet: "dykning,,bergsvandring",
          okand: "1",
        },
        vocabulary,
      ),
      { aktiviteter: ["bergsvandring"] },
    );
    assert.deepEqual(
      parseSearchParams({ destination: "", typ: "", aktivitet: "" }, vocabulary),
      {},
    );
  });
});

describe("toSearchHref", () => {
  test("bygger en läsbar URL och utelämnar tomma fält", () => {
    assert.equal(toSearchHref({}), "/sok");
    assert.equal(
      toSearchHref({
        destination: "tanzania",
        aktiviteter: ["bergsvandring", "safariaventyr"],
      }),
      "/sok?destination=tanzania&aktivitet=bergsvandring,safariaventyr",
    );
  });
});
