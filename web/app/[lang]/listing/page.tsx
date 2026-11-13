import type { Metadata } from "next";
import { Assistant } from "@/components/Assistant";
import { pageContext } from "@/lib/page";
import { site } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[lang]/listing">): Promise<Metadata> {
  return { title: (await pageContext(params)).t.listing.title };
}

export default async function ListingPage({ params }: PageProps<"/[lang]/listing">) {
  const { lang, t } = await pageContext(params);
  const l = t.listing;

  return (
    <>
      <h1>{l.title}</h1>
      <p className="lead">{l.lead}</p>

      <h2 id="assistant">
        {l.assistantTitle} <span className="badge badge-accent">{t.sellers.assistantBadge}</span>
      </h2>
      <Assistant mode="listing" lang={lang} intro={t.assistant.listingIntro} labels={t.assistant} />

      <h2>{l.needTitle}</h2>
      <ul className="steps">
        {l.needs.map((need) => <li key={need}>{need}</li>)}
      </ul>
      <p className="note">{l.aliasNote}</p>

      <h2>{l.reviewTitle}</h2>
      <ol className="steps-list">
        {l.review.map((item) => <li key={item}>{item}</li>)}
      </ol>
      <p className="meta">{l.reviewNote}</p>

      <h2>{l.submitTitle}</h2>
      {site.listingFormUrl ? (
        <iframe className="form-frame" src={site.listingFormUrl} title={l.formTitle} />
      ) : (
        <p className="meta">{t.common.opensSoon}</p>
      )}
    </>
  );
}
