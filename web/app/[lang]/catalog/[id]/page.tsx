import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { locales } from "@/lib/i18n";
import { listingView } from "@/lib/listing-view";
import { getListing, listings } from "@/lib/listings";
import { pageContext } from "@/lib/page";

export function generateStaticParams() {
  return locales.flatMap((lang) => listings.map((listing) => ({ lang, id: listing.id })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/catalog/[id]">): Promise<Metadata> {
  const { lang } = await pageContext(params);
  const listing = getListing((await params).id);
  return { title: listing?.title[lang] };
}

export default async function ListingDetailPage({ params }: PageProps<"/[lang]/catalog/[id]">) {
  const { lang, t, link } = await pageContext(params);
  const listing = getListing((await params).id);
  if (!listing) notFound();

  const view = listingView(listing, lang, t);
  const c = t.catalog;

  return (
    <>
      <p><Link href={link("/catalog")}>← {t.common.back}</Link></p>
      <p>
        {listing.example && <span className="badge badge-accent">{t.common.example}</span>}
        <span className="badge">{view.proofLabel}</span>
        <span className="badge">{view.reviewedText}</span>
        <span className="badge">{view.industryLabel}</span>
        <span className="badge">{view.agentTypeLabel}</span>
      </p>
      <h1>{view.title}</h1>
      <p className="lead">{view.summary}</p>

      <div className="detail">
        <div>
          <h2>{c.included}</h2>
          <ul className="steps">
            {listing.includes.map((item) => <li key={item.en}>{item[lang]}</li>)}
          </ul>

          <h2>{c.notIncluded}</h2>
          <ul className="steps">
            {listing.notIncluded.map((item) => <li key={item.en}>{item[lang]}</li>)}
          </ul>

          <h2>{c.data}</h2>
          <p>{listing.dataHandling[lang]}</p>
        </div>

        <aside className="card card-large">
          <div className="price">{view.setupText}</div>
          <p>{view.monthlyText}</p>
          <p>{view.deliveryText}</p>
          <p className="meta">{listing.alias} · {view.ratingText}</p>
          <div className="actions">
            <span className="button" aria-disabled="true">{c.requestCta}</span>
          </div>
          <p className="meta">{c.requestNote}</p>
          <Link href={link("/buyers#assistant")} className="button button-secondary">{c.describeCta}</Link>
          <p className="meta">{c.aliasNote}</p>
        </aside>
      </div>
    </>
  );
}
