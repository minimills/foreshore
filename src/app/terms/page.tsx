import type { Metadata } from "next";
import LegalPage from "@/components/site/LegalPage";
import { getLegal, getSite } from "@/lib/content";

export const metadata: Metadata = {
  title: `${getLegal("terms").title} | ${getSite().studioName}`,
};

export default function TermsPage() {
  return <LegalPage page="terms" />;
}
