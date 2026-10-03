import { anvandarvillkor } from "@/content/juridik/anvandarvillkor";
import { LegalPage, legalPageMetadata } from "@/components/legal/LegalPage";

export const metadata = legalPageMetadata(anvandarvillkor);

export default function TermsPage() {
  return <LegalPage page={anvandarvillkor} />;
}
