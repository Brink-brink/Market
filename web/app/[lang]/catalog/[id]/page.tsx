import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BadgeCheck, CalendarClock, Check, GraduationCap, ListChecks, Minus, PackageCheck, Play, Route, ShieldCheck, Star, Wrench } from "lucide-react";
import { BuyBox } from "@/components/BuyBox";
import { LiveWindow } from "@/components/LiveWindow";
import { fill, locales } from "@/lib/i18n";
import { listingView, liveCards } from "@/lib/listing-view";
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

  // Shown in the window's demo tab when the live demo is switched off.
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
          <section id="live">
            <LiveWindow
              variant="listing"
              lang={lang}
              labels={t.live}
              assistantLabels={t.assistant}
              agentTypeLabels={t.agentTypes}
              cards={liveCards(lang, t)}
              intro={fill(t.live.introListing, { title: view.title })}
              listing={{
                id: listing.id,
                title: view.title,
                tone: view.tone,
                greeting: listing.liveDemo.greeting[lang],
                prompts: listing.liveDemo.prompts.map((prompt) => prompt[lang]),
                demoNote: listing.agentType === "phone" ? `${c.livePhone} ${c.liveNote}` : c.liveNote,
                demoPlaceholder: c.livePlaceholder,
                sample: sampleConversation,
              }}
            />
          </section>

          <section>
            <h2>{c.details}</h2>
            <p className="section-note">{c.detailsNote}</p>

            <details className="fold">
              <summary>
                <PackageCheck size={20} aria-hidden="true" />{c.included}
                <span className="meta">{listing.includes.length}</span>
              </summary>
              <div className="fold-body">
                <ul className="checklist two-col">
                  {listing.includes.map((item) => (
                    <li key={item.en}><Check size={18} aria-hidden="true" />{item[lang]}</li>
                  ))}
                </ul>
              </div>
            </details>

            <details className="fold" id="acceptance">
              <summary>
                <ListChecks size={20} aria-hidden="true" />{c.acceptanceTitle}
                <span className="meta">{listing.acceptance.length}</span>
              </summary>
              <div className="fold-body">
                <p className="section-note">{c.acceptanceNote}</p>
                <ol className="criteria">
                  {listing.acceptance.map((item, i) => (
                    <li key={item.en}>
                      <span className="check" aria-hidden="true"><Check size={16} /></span>
                      <span className="criterion-number">{i + 1}</span>
                      <span>{item[lang]}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </details>

            <details className="fold">
              <summary><Route size={20} aria-hidden="true" />{c.deliveryTitle}</summary>
              <div className="fold-body">
                <ol className="timeline">
                  {c.deliverySteps.map((step) => (
                    <li key={step.title}>
                      <h3>{step.title}</h3>
                      <p>{step.text}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </details>

            {listing.extras.length > 0 && (
              <details className="fold" id="extras">
                <summary>
                  <GraduationCap size={20} aria-hidden="true" />{c.extrasTitle}
                  <span className="meta">{listing.extras.length}</span>
                </summary>
                <div className="fold-body">
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
                </div>
              </details>
            )}

            <details className="fold">
              <summary>
                <Minus size={20} aria-hidden="true" />{c.notIncluded}
                <span className="meta">{listing.notIncluded.length}</span>
              </summary>
              <div className="fold-body">
                <ul className="checklist muted">
                  {listing.notIncluded.map((item) => (
                    <li key={item.en}><Minus size={18} aria-hidden="true" />{item[lang]}</li>
                  ))}
                </ul>
              </div>
            </details>

            <details className="fold">
              <summary><ShieldCheck size={20} aria-hidden="true" />{c.data}</summary>
              <div className="fold-body">
                <p>{listing.dataHandling[lang]}</p>
              </div>
            </details>
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
          <p className="meta">{c.aliasNote}</p>
        </BuyBox>
      </div>
    </>
  );
}
