// Cloudflare Worker för formulären. Allt annat på sajten är statiska filer i
// out/ som Cloudflare serverar direkt, utan att Workern körs (se
// assets.run_worker_first i wrangler.jsonc: bara /api/* når hit).
//
// Hemligheter (RESEND_API_KEY, INQUIRY_TO_*) sätts i Cloudflares dashboard och
// läses via process.env (nodejs_compat), som i lib/email.ts.
import {
  handleContact,
  handleInquiry,
  handlePartnerApplication,
} from "../lib/api/handlers";

const routes: Record<string, (request: Request) => Promise<Response>> = {
  "/api/contact": handleContact,
  "/api/inquiry": handleInquiry,
  "/api/partner-application": handlePartnerApplication,
};

const worker = {
  async fetch(request: Request): Promise<Response> {
    const handler = routes[new URL(request.url).pathname];
    if (!handler) {
      return Response.json({ error: "Hittades inte." }, { status: 404 });
    }
    if (request.method !== "POST") {
      return Response.json(
        { error: "Metoden stöds inte." },
        { status: 405, headers: { Allow: "POST" } },
      );
    }
    return handler(request);
  },
};

export default worker;
