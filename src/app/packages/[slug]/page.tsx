import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageShell from "@/components/site/PageShell";
import Sections from "@/components/site/Sections";
import Gallery from "@/components/site/Gallery";
import { getPackagePage, getPackages, getPricing, getSite, paragraphs } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

/* Every page here is built ahead of time, so letting it wait for its address costs
   nothing and keeps a real "not found" response for addresses that don't exist. */
export const instant = false;

/* One page per package file in content/packages. */
export function generateStaticParams() {
  return getPackages().map((p) => ({ slug: p.slug }));
}

const findPackage = (slug: string) => getPackages().find((p) => p.slug === slug);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pkg = findPackage((await params).slug);
  if (!pkg) return {};
  return { title: `${pkg.name} | ${getSite().studioName}`, description: pkg.description };
}

export default async function PackagePage({ params }: Props) {
  const pkg = findPackage((await params).slug);
  if (!pkg) notFound();
  const text = getPackagePage();
  const popularLabel = getPricing().popularLabel;

  return (
    <PageShell>
      <article className="section page page-wide pad">
        <Link className="more page-back" href="/#pricing">
          ← {text.backLink}
        </Link>
        <div className="page-pills">
          <span className="pill pill-offer">{pkg.price}</span>
          {pkg.timeline && <span className="pill pill-concept">{pkg.timeline}</span>}
          {pkg.mostPopular && <span className="pill pill-concept">{popularLabel}</span>}
        </div>
        <h2>{pkg.name}</h2>
        {paragraphs(pkg.pageIntro || pkg.description).map((p) => (
          <p className="page-lead muted" key={p}>
            {p}
          </p>
        ))}
        <div className="page-actions">
          <Link className="btn btn-ink" href="/#contact">
            {text.buttonText}
          </Link>
        </div>

        <div className="page-columns">
          {pkg.features.length > 0 && (
            <section className="page-section">
              <h3>{text.includedHeading}</h3>
              <ul className="tick-list">
                {pkg.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </section>
          )}
          {pkg.whoItsFor && (
            <section className="page-section">
              <h3>{text.whoItsForHeading}</h3>
              {paragraphs(pkg.whoItsFor).map((p) => (
                <p className="muted" key={p}>
                  {p}
                </p>
              ))}
            </section>
          )}
        </div>

        <div className="page-body">
          <Sections sections={pkg.details} />
          <Gallery images={pkg.screenshots} heading={text.screenshotsHeading} />
        </div>

        <div className="page-cta">
          <h3>{pkg.name}: {pkg.price}</h3>
          <Link className="btn btn-ink" href="/#contact">
            {text.buttonText}
          </Link>
        </div>
      </article>
    </PageShell>
  );
}
