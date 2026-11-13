import type { Metadata } from "next";
import Image from "next/image";
import { Clock, Database, FileSearch, ListChecks, Package, Play, ShieldCheck, Tag, Target } from "lucide-react";
import { Assistant } from "@/components/Assistant";
import { IconGrid } from "@/components/IconGrid";
import { images } from "@/lib/images";
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
      <section className="page-head">
        <div>
          <h1>{l.title}</h1>
          <p className="lead">{l.lead}</p>
        </div>
        <Image src={images.pair} alt="" width={1168} height={880} priority />
      </section>

      <h2 id="assistant">
        {l.assistantTitle} <span className="badge badge-accent">{t.common.addonBadge}</span>
      </h2>
      <Assistant mode="listing" lang={lang} intro={t.assistant.listingIntro} labels={t.assistant} />

      <h2>{l.needTitle}</h2>
      <IconGrid boxed items={l.needs} icons={[Target, Package, Tag, Clock, Play, ListChecks, Database]} />
      <p className="note">{l.aliasNote}</p>

      <h2>{l.reviewTitle}</h2>
      <IconGrid boxed items={l.review} icons={[Play, FileSearch, ShieldCheck, Tag]} />
      <p className="meta" style={{ marginTop: 16 }}>{l.reviewNote}</p>

      <h2>{l.submitTitle}</h2>
      {site.listingFormUrl ? (
        <iframe className="form-frame" src={site.listingFormUrl} title={l.formTitle} />
      ) : (
        <p className="meta">{t.common.opensSoon}</p>
      )}
    </>
  );
}
