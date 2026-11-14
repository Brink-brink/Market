"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Check, ClipboardList, Copy, MessageCircle, Minus, Play, Sparkles, Star, Wrench, X } from "lucide-react";
import { Assistant } from "@/components/Assistant";
import { emptyAdvisorState, requirementKeys, type AdvisorAlternative, type AdvisorState, type ExtraKind } from "@/lib/advisor";
import type { Dict, Locale } from "@/lib/i18n";
import { formatRange } from "@/lib/site";

// What the overview needs to show a listing as an alternative, with the price of each optional extra.
export type LiveCard = {
  title: string;
  alias: string;
  href: string;
  cover: string;
  setup: [number, number];
  monthlyText: string;
  extras: Partial<Record<ExtraKind, { label: string; price: number }>>;
};

type View = "advisor" | "demo" | "overview";

type Props = {
  lang: Locale;
  labels: Dict["live"];
  assistantLabels: Dict["assistant"];
  agentTypeLabels: Dict["agentTypes"];
  cards: Record<string, LiveCard>;
  // How the window is offered on the page: a large card on a listing or the buyer page, or a slim row.
  variant: "listing" | "advisor" | "banner";
  // The advisor's first line.
  intro: string;
  // Set when the window belongs to one listing: marks that listing among the alternatives and adds a tab to try its agent.
  listing?: {
    id: string;
    title: string;
    tone: string;
    greeting: string;
    prompts: string[];
    demoNote: string;
    demoPlaceholder: string;
    // Shown in the demo tab when the live demo is switched off.
    sample: ReactNode;
  };
};

// The live window: a chat that asks about the visitor's requirements, with an overview beside it that
// fills in as they answer. On a listing it also lets them try the agent.
export function LiveWindow({ lang, labels, assistantLabels, agentTypeLabels, cards, variant, intro, listing }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [opened, setOpened] = useState(false);
  const [view, setView] = useState<View>("advisor");
  const [state, setState] = useState<AdvisorState>(emptyAdvisorState);
  const [copied, setCopied] = useState(false);

  function open(next: View) {
    setOpened(true);
    setView(next);
    dialogRef.current?.showModal();
  }

  // Keep the page behind the window from scrolling while it is open.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const sync = () => document.documentElement.classList.toggle("live-open", dialog.open);
    const observer = new MutationObserver(sync);
    observer.observe(dialog, { attributes: true, attributeFilter: ["open"] });
    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("live-open");
    };
  }, []);

  const known = new Map(state.requirements.map((r) => [r.key, r.value]));
  const total = requirementKeys.length;
  const progress = labels.progress.replace("{n}", String(known.size)).replace("{total}", String(total));
  const alternatives = state.alternatives.filter((a) => cards[a.id]);
  const solved = state.solution.agentType !== "undecided";

  async function copyRequirements() {
    const lines = requirementKeys.filter((key) => known.has(key)).map((key) => `${labels.req[key]}: ${known.get(key)}`);
    await navigator.clipboard.writeText(lines.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const fitPoints = (match: AdvisorAlternative) => (
    <ul className="fit-points">
      {match.fits.map((point) => (
        <li key={point} className="fit-yes"><Check size={15} aria-hidden="true" />{point}</li>
      ))}
      {match.gaps.map((point) => (
        <li key={point} className="fit-no"><Minus size={15} aria-hidden="true" />{point}</li>
      ))}
    </ul>
  );

  const badge = <span className="live-badge"><span className="live-dot" aria-hidden="true" />{labels.badge}</span>;

  const launch =
    variant === "banner" ? (
      <div className="live-banner">
        <span className="icon" aria-hidden="true"><Sparkles size={22} /></span>
        <div>
          <strong>{labels.bannerTitle}</strong>
          <p>{labels.bannerText}</p>
        </div>
        <button type="button" className="button" onClick={() => open("advisor")}>{labels.bannerCta}</button>
      </div>
    ) : (
      <div className={`live-launch ${listing ? `tone-${listing.tone}` : "live-launch-ink"}`}>
        <div className="live-launch-text">
          {badge}
          <h2>{listing ? labels.listingTitle : labels.advisorTitle}</h2>
          <p>{listing ? labels.listingText : labels.advisorText}</p>
          <div className="actions">
            <button type="button" className="button live-launch-primary" onClick={() => open("advisor")}>
              <ClipboardList size={18} aria-hidden="true" />
              {listing ? labels.listingCheck : labels.advisorCta}
            </button>
            {listing && (
              <button type="button" className="button button-secondary" onClick={() => open("demo")}>
                <Play size={18} aria-hidden="true" />
                {labels.listingTry}
              </button>
            )}
          </div>
        </div>
        {/* A preview of the window. Clicking it opens the real one. */}
        <button type="button" className="live-preview" onClick={() => open(listing ? "demo" : "advisor")} aria-label={labels.open}>
          <span className="live-preview-bar" aria-hidden="true"><i /><i /><i /></span>
          <span className="bubble bubble-assistant">{listing ? listing.greeting : intro}</span>
          <span className="chips">
            {(listing ? listing.prompts : labels.startOptions).slice(0, 3).map((text) => (
              <span key={text} className="chip">{text}</span>
            ))}
          </span>
        </button>
      </div>
    );

  return (
    <>
      {launch}

      <dialog ref={dialogRef} className="live" data-view={view} aria-label={listing ? listing.title : labels.advisorTitle}>
        <header className={`live-head ${listing ? `tone-${listing.tone}` : "live-head-ink"}`}>
          <div className="live-head-title">
            {badge}
            <strong>{listing ? listing.title : labels.advisorTitle}</strong>
          </div>
          <nav className="live-tabs" aria-label={labels.tabsLabel}>
            <button type="button" aria-pressed={view === "advisor"} onClick={() => setView("advisor")}>
              <MessageCircle size={16} aria-hidden="true" />{labels.tabAdvisor}
            </button>
            {listing && (
              <button type="button" aria-pressed={view === "demo"} onClick={() => setView("demo")}>
                <Play size={16} aria-hidden="true" />{labels.tabDemo}
              </button>
            )}
            <button type="button" className="live-tab-overview" aria-pressed={view === "overview"} onClick={() => setView("overview")}>
              <ClipboardList size={16} aria-hidden="true" />{labels.tabOverview} {known.size}/{total}
            </button>
          </nav>
          <button type="button" className="live-close" aria-label={labels.close} onClick={() => dialogRef.current?.close()}>
            <X size={20} aria-hidden="true" />
          </button>
        </header>

        {opened && (
          <div className="live-body">
            <div className="live-pane live-pane-advisor">
              <Assistant
                mode="advisor"
                lang={lang}
                listingId={listing?.id}
                intro={intro}
                suggestions={labels.startOptions}
                labels={assistantLabels}
                onAdvisor={(next) => setState(next ?? emptyAdvisorState)}
              />
            </div>

            {listing && (
              <div className="live-pane live-pane-demo">
                <p className="section-note">{listing.demoNote}</p>
                <Assistant
                  mode="demo"
                  lang={lang}
                  listingId={listing.id}
                  intro={listing.greeting}
                  suggestions={listing.prompts}
                  placeholder={listing.demoPlaceholder}
                  labels={assistantLabels}
                  offContent={listing.sample}
                />
              </div>
            )}

            <aside className="live-overview" aria-live="polite">
              <div className="live-block">
                <div className="live-block-head">
                  <h3>{labels.reqTitle}</h3>
                  <span className="meta">{progress}</span>
                </div>
                <div className="live-progress" aria-hidden="true"><span style={{ width: `${(known.size / total) * 100}%` }} /></div>
                <ul className="req-list">
                  {requirementKeys.map((key) => (
                    <li key={key} className={known.has(key) ? "req-done" : undefined}>
                      <span className="req-mark" aria-hidden="true">{known.has(key) && <Check size={13} />}</span>
                      <span className="req-label">{labels.req[key]}</span>
                      <span className="req-value">{known.get(key) ?? ""}</span>
                    </li>
                  ))}
                </ul>
                {known.size > 0 && (
                  <button type="button" className="live-copy" onClick={() => void copyRequirements()}>
                    <Copy size={14} aria-hidden="true" />{copied ? assistantLabels.copied : labels.copy}
                  </button>
                )}
              </div>

              <div className="live-block">
                <h3>{labels.solutionTitle}</h3>
                {solved ? (
                  <>
                    <p className="solution-type">{agentTypeLabels[state.solution.agentType as keyof Dict["agentTypes"]]}</p>
                    <p>{state.solution.why}</p>
                    {state.solution.tools.length > 0 && (
                      <>
                        <h4>{labels.toolsTitle}</h4>
                        <ul className="tool-list">
                          {state.solution.tools.map((tool) => (
                            <li key={tool.name}>
                              <Wrench size={15} aria-hidden="true" />
                              <span><strong>{tool.name}</strong>{tool.why && <> · {tool.why}</>}</span>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </>
                ) : (
                  <p className="meta">{labels.solutionEmpty}</p>
                )}
              </div>

              <div className="live-block">
                <h3>{labels.altTitle}</h3>
                {alternatives.length > 0 ? (
                  <>
                    <ol className="alt-list">
                      {alternatives.map((alt) => {
                        const card = cards[alt.id];
                        const added = alt.extras.reduce((sum, kind) => sum + (card.extras[kind]?.price ?? 0), 0);
                        const variant = alt.extras.length
                          ? alt.extras.map((kind) => `+ ${card.extras[kind]?.label}`).join(" ")
                          : labels.basePackage;
                        return (
                          <li key={`${alt.id}:${alt.extras.join("+")}`} className="alt">
                            <Image src={card.cover} alt="" width={160} height={90} />
                            <div className="alt-main">
                              <div className="alt-top">
                                <span className="stars" role="img" aria-label={labels.starsLabel.replace("{n}", String(alt.stars))}>
                                  {[1, 2, 3, 4, 5].map((n) => (
                                    <Star key={n} size={16} className={n <= alt.stars ? "star-on" : "star-off"} aria-hidden="true" />
                                  ))}
                                </span>
                                {alt.budget !== "unknown" && (
                                  <span className={`budget-badge budget-${alt.budget}`}>
                                    {labels.budget[alt.budget]}
                                  </span>
                                )}
                              </div>
                              <Link href={card.href} target="_blank" className="alt-title">{card.title}</Link>
                              <span className="meta">
                                {card.alias} · {variant}
                                {listing?.id === alt.id && <> · {labels.thisListing}</>}
                              </span>
                              <span className="alt-price">
                                {formatRange([card.setup[0] + added, card.setup[1] + added], lang)} <small>{labels.setupLabel} · {card.monthlyText}</small>
                              </span>
                              {fitPoints(alt)}
                            </div>
                          </li>
                        );
                      })}
                    </ol>
                    <p className="meta">{labels.altNote}</p>
                  </>
                ) : (
                  <p className="meta">{labels.altEmpty}</p>
                )}
              </div>
            </aside>
          </div>
        )}
      </dialog>
    </>
  );
}
