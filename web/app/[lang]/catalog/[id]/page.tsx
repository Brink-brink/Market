import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BadgeCheck, CalendarClock, Check, GraduationCap, ListChecks, Minus, Play, ShieldCheck, Star, Wrench } from "lucide-react";
import { Assistant } from "@/components/Assistant";
import { BuyBox } from "@/components/BuyBox";
import { fill, locales } from "@/lib/i18n";
import { listingView } from "@/lib/listing-view";
import { getListing, listings } from "@/lib/listings";
import { pageContext } from "@/lib/page";
import { formatMoney, site } from "@/lib/site";

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

  // Shown in the demo frame when the live demo is switched off.
  const sampleConversation = (
    <>
      <p className="section-note">{c.liveOff}</p>
      <div className="demo">
        {listing.demo.map((turn, i) => (
          <div key={i} className={`demo-turn demo-${turn.from}`}>
            <small>{turn.from === "agent" ? c.agent : c.customer}</small>
            <p>{turn.text[lang]}</p>
          </div>
        ))}
      </div>
    </>
  );

  return (
    <>
      <section className="listing-hero">
        <Image className="listing-hero-img" src={listing.cover} alt="" width={1344} height={752} priority />
        <div className="wrap listing-hero-content">
          <p><Link href={link("/catalog")}>← {t.common.back}</Link></p>
          <div className="tile-tags">
            {listing.example && <span className="tag-solid">{t.common.example}</span>}
            <span>{view.industryLabel}</span>
            <span>{view.agentTypeLabel}</span>
          </div>
          <h1>{view.title}</h1>
          <p className="lead">{view.summary}</p>
          <div className="seller">
            <span className={`avatar tone-${view.tone}`} aria-hidden="true">{view.initials}</span>
            <span>{listing.alias}</span>
            <span className="seller-rating"><Star size={16} aria-hidden="true" /> {view.ratingText}</span>
          </div>
        </div>
      </section>

      <div className="highlights">
        <div><Play size={20} aria-hidden="true" /><span>{c.highlightLive}</span></div>
        <div><CalendarClock size={20} aria-hidden="true" /><span>{fill(c.highlightDays, { n: listing.deliveryDays })}</span></div>
        <div><BadgeCheck size={20} aria-hidden="true" /><span>{view.proofLabel} · {fill(c.highlightReviewed, { date: listing.reviewedOn })}</span></div>
        <div><ListChecks size={20} aria-hidden="true" /><span>{fill(c.criteria, { n: listing.acceptance.length })}</span></div>
      </div>

      <div className="detail">
        <div>
          <section id="demo" className="demo-stage">
            <div className={`demo-frame tone-${view.tone}`}>
              <div className="demo-frame-head">
                <h2>{c.liveTitle}</h2>
                <p>{listing.agentType === "phone" ? `${c.livePhone} ${c.liveNote}` : c.liveNote}</p>
              </div>
              <div className="demo-frame-body">
                <Assistant
                  mode="demo"
                  lang={lang}
                  listingId={listing.id}
                  intro={listing.liveDemo.greeting[lang]}
                  suggestions={listing.liveDemo.prompts.map((prompt) => prompt[lang])}
                  placeholder={c.livePlaceholder}
                  labels={t.assistant}
                  offContent={sampleConversation}
                />
              </div>
            </div>
          </section>

          <section>
            <h2>{c.included}</h2>
            <ul className="checklist two-col">
              {listing.includes.map((item) => (
                <li key={item.en}><Check size={18} aria-hidden="true" />{item[lang]}</li>
              ))}
            </ul>
          </section>

          <section id="acceptance" className="criteria-card">
            <div className="criteria-head">
              <span className="icon" aria-hidden="true"><ListChecks size={22} /></span>
              <div>
                <h2>{c.acceptanceTitle}</h2>
                <p className="section-note">{c.acceptanceNote}</p>
              </div>
            </div>
            <ol className="criteria">
              {listing.acceptance.map((item, i) => (
                <li key={item.en}>
                  <span className="check" aria-hidden="true"><Check size={16} /></span>
                  <span className="criterion-number">{i + 1}</span>
                  <span>{item[lang]}</span>
                </li>
              ))}
            </ol>
          </section>

          <section>
            <h2>{c.deliveryTitle}</h2>
            <ol className="timeline">
              {c.deliverySteps.map((step) => (
                <li key={step.title}>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
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

          <section className="data-card">
            <span className="icon" aria-hidden="true"><ShieldCheck size={22} /></span>
            <div>
              <h2>{c.data}</h2>
              <p>{listing.dataHandling[lang]}</p>
            </div>
          </section>
        </div>

        <BuyBox
          locale={lang}
          currency={site.currency}
          setup={listing.setupPrice}
          monthlyText={view.monthlyText}
          deliveryText={view.deliveryText}
          extras={listing.extras.map((extra) => ({ id: extra.kind, label: extraLabel[extra.kind], price: extra.price }))}
          labels={{ yourPackage: c.yourPackage, setupPrice: c.setupPrice, total: c.total, cta: c.requestCta, ctaNote: c.requestNote }}
        >
          <Link href={link("/buyers#assistant")} className="button button-secondary buy-cta">{c.describeCta}</Link>
          <p className="meta">{c.aliasNote}</p>
        </BuyBox>
      </div>
    </>
  );
}
