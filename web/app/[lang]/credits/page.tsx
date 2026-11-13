import type { Metadata } from "next";
import Link from "next/link";
import { fill } from "@/lib/i18n";
import { pageContext } from "@/lib/page";
import { creditPackages, formatMoney } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[lang]/credits">): Promise<Metadata> {
  return { title: (await pageContext(params)).t.credits.title };
}

export default async function CreditsPage({ params }: PageProps<"/[lang]/credits">) {
  const { lang, t, link } = await pageContext(params);
  const c = t.credits;

  return (
    <>
      <h1>{c.title}</h1>
      <p className="lead">{c.lead}</p>

      <div className="grid">
        {creditPackages.map((pkg) => (
          <div key={pkg.id} className="card">
            <h3>{pkg.name}</h3>
            <p>{fill(c.credits, { n: pkg.credits })}</p>
            <div className="price">{pkg.price === null ? c.priceSoon : formatMoney(pkg.price, lang)}</div>
            <a className="button" href={pkg.paymentLinkUrl || undefined} aria-disabled={!pkg.paymentLinkUrl}>
              {c.buy}
            </a>
          </div>
        ))}
        <div className="card">
          <h3>{c.addonTitle}</h3>
          <p>{c.addonText}</p>
          <div className="price">{c.addonPrice}</div>
          <Link className="button button-secondary" href={link("/listing")}>{c.addonCta}</Link>
        </div>
      </div>

      <p className="meta">{c.note}</p>
    </>
  );
}
