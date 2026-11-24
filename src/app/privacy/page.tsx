import type { Metadata } from "next";
import LegalPage from "@/components/site/LegalPage";
import { getLegal, getSite } from "@/lib/content";

export const metadata: Metadata = {
  title: `${getLegal("privacy").title} | ${getSite().studioName}`,
};

export default function PrivacyPage() {
  return <LegalPage page="privacy" />;
}
