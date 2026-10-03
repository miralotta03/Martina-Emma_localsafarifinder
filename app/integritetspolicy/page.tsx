import { integritetspolicy } from "@/content/juridik/integritetspolicy";
import { LegalPage, legalPageMetadata } from "@/components/legal/LegalPage";

export const metadata = legalPageMetadata(integritetspolicy);

export default function PrivacyPolicyPage() {
  return <LegalPage page={integritetspolicy} />;
}
