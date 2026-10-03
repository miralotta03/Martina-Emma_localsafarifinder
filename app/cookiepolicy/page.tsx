import { cookiepolicy } from "@/content/juridik/cookiepolicy";
import { LegalPage, legalPageMetadata } from "@/components/legal/LegalPage";

export const metadata = legalPageMetadata(cookiepolicy);

export default function CookiePolicyPage() {
  return <LegalPage page={cookiepolicy} />;
}
