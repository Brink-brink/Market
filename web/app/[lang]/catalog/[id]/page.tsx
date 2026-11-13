import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, GraduationCap, Minus, Wrench } from "lucide-react";
import { locales } from "@/lib/i18n";
import { listingView } from "@/lib/listing-view";
import { getListing, listings } from "@/lib/listings";
import { pageContext } from "@/lib/page";
import { formatMoney } from "@/lib/site";

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
  const extraLabel = { setup: c.extraSetup, training: c.extraTraining };
  const extraIcon = { setup: Wrench, training: GraduationCap };

  return (
    <>
      <section className={`detail-top tone-${view.tone}`} style={{ marginTop: -40 }}>
        <div className="wrap">
          <p><Link href={link("/catalog")}>← {t.common.back}</Link></p>
          <div className="tile-tags">
            {listing.example && <span className="tag-solid">{t.common.example}</span>}
            <span>{view.proofLabel}</span>
            <span>{view.reviewedText}</span>
            <span>{view.industryLabel}</span>
            <span>{view.agentTypeLabel}</span>
          </div>
          <h1>{view.title}</h1>
          <p className="lead">{view.summary}</p>
          <nav className="detail-nav">
            {listing.demo.length > 0 && <a href="#demo">{c.demoTitle}</a>}
            <a href="#acceptance">{c.acceptanceTitle}</a>
            {listing.extras.length > 0 && <a href="#extras">{c.extrasTitle}</a>}
          </nav>
        </div>
      </section>

      <div className="detail">
        <div>
          {listing.demo.length > 0 && (
            <section id="demo">
              <h2>{c.demoTitle}</h2>
              <p className="section-note">{c.demoNote}</p>
              <div className="demo">
                {listing.demo.map((turn, i) => (
                  <div key={i} className={`demo-turn demo-${turn.from}`}>
                    <small>{turn.from === "agent" ? c.agent : c.customer}</small>
                    <p>{turn.text[lang]}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section>
            <h2>{c.included}</h2>
            <ul className="checklist">
              {listing.includes.map((item) => (
                <li key={item.en}><Check size={18} aria-hidden="true" />{item[lang]}</li>
              ))}
            </ul>
          </section>

          <section id="acceptance">
            <h2>{c.acceptanceTitle}</h2>
            <p className="section-note">{c.acceptanceNote}</p>
            <ol className="criteria">
              {listing.acceptance.map((item) => (
                <li key={item.en}>
                  <span className="check" aria-hidden="true"><Check size={16} /></span>
                  <span>
                    <small />
                    {item[lang]}
                  </span>
                </li>
              ))}
            </ol>
          </section>

          {listing.extras.length > 0 && (
            <section id="extras">
              <h2>{c.extrasTitle}</h2>
              <p className="section-note">{c.extrasNote}</p>
              <div className="extras">
                {listing.extras.map((extra) => {
                  const Icon = extraIcon[extra.kind];
                  return (
                    <div key={extra.kind} className="extra">
                      <span className="icon" aria-hidden="true"><Icon size={22} /></span>
                      <h3>{extraLabel[extra.kind]}</h3>
                      <p>{extra.text[lang]}</p>
                      <strong>{formatMoney(extra.price, lang)}</strong>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          <section>
            <h2>{c.notIncluded}</h2>
            <ul className="checklist muted">
              {listing.notIncluded.map((item) => (
                <li key={item.en}><Minus size={18} aria-hidden="true" />{item[lang]}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2>{c.data}</h2>
            <p>{listing.dataHandling[lang]}</p>
          </section>
        </div>

        <aside className="card card-large buy-box">
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
