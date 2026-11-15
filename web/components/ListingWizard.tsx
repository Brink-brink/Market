"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, ArrowLeft, ArrowRight, Check, CheckCircle2, Copy, KeyRound, LifeBuoy, ListChecks, Plus, Trash2 } from "lucide-react";
import { fill, type Dict, type Locale } from "@/lib/i18n";
import { fillCriterion, isMeasurable, offerTemplates, type Delivery, type OfferTemplate } from "@/lib/offer-templates";
import { site } from "@/lib/site";

type Labels = Dict["wizard"];

type Row = { text: string; value: string };
type TierDraft = { on: boolean; name: string; scope: string; criteria: Row[]; min: number; max: number };
type Draft = {
  templateId: OfferTemplate["id"];
  title: string;
  problem: string;
  values: { label: string; unit: string; today: number; after: number }[];
  criteria: Row[];
  delivery: Delivery;
  costPerRun: number;
  runsPerMonth: number;
  cap: number;
  hypercareRuns: number;
  hypercareUnit: string;
  tiers: TierDraft[];
  splitPayment: boolean;
};

const storageKey = "brinc-offer-draft";

function fromTemplate(t: OfferTemplate, lang: Locale): Draft {
  const monthly = t.costPerRun * t.runsPerMonth;
  return {
    templateId: t.id,
    title: t.title[lang],
    problem: t.problem[lang],
    values: t.values.map((v) => ({ label: v.label[lang], unit: v.unit[lang], today: v.today, after: v.after })),
    criteria: t.criteria.map((c) => ({ text: c.text[lang], value: c.value })),
    delivery: t.delivery,
    costPerRun: t.costPerRun,
    runsPerMonth: t.runsPerMonth,
    cap: Math.max(5, Math.ceil((monthly * 2) / 5) * 5),
    hypercareRuns: t.hypercareRuns,
    hypercareUnit: t.hypercareUnit[lang],
    tiers: t.tiers.map((tier, i) => ({
      on: i < 2,
      name: tier.name[lang],
      scope: tier.scope[lang],
      criteria: tier.criteria.map((c) => ({ text: c.text[lang], value: c.value })),
      min: tier.price[0],
      max: tier.price[1],
    })),
    splitPayment: false,
  };
}

// Writing an offer step by step from a template, with the buyer's view beside the form.
// The draft is kept in this browser only. Submitting is not open yet; the seller copies the text.
export function ListingWizard({ lang, labels }: { lang: Locale; labels: Labels }) {
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved) as { step: number; draft: Draft };
        // Restoring a saved draft from storage is a one-time sync with an external system.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setDraft(parsed.draft);
        setStep(parsed.step);
      }
    } catch {
      // Storage can be blocked; the flow works without it.
    }
  }, []);

  useEffect(() => {
    if (!draft) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify({ step, draft }));
    } catch {
      // Ignore: the draft simply isn't remembered.
    }
  }, [draft, step]);

  const money = (amount: number, digits = 0) =>
    new Intl.NumberFormat(lang, { style: "currency", currency: site.currency, maximumFractionDigits: digits, minimumFractionDigits: digits }).format(amount);

  const update = (patch: Partial<Draft>) => setDraft((d) => (d ? { ...d, ...patch } : d));
  const steps = labels.steps;
  const last = steps.length - 1;

  const start = (t: OfferTemplate) => {
    setDraft(fromTemplate(t, lang));
    setStep(1);
  };

  const reset = () => {
    try {
      localStorage.removeItem(storageKey);
    } catch {}
    setDraft(null);
    setStep(0);
  };

  const usesApi = draft ? draft.delivery !== "skill" : false;
  const monthly = draft ? draft.costPerRun * draft.runsPerMonth : 0;
  const activeTiers = draft ? draft.tiers.filter((t) => t.on) : [];
  const allCriteria = draft ? [...draft.criteria, ...activeTiers.flatMap((t) => t.criteria)] : [];
  const unmeasurable = allCriteria.filter((c) => c.text.trim() && !isMeasurable(fillCriterion(c.text, c.value)));

  const asText = () => {
    if (!draft) return "";
    const lines = [
      `# ${draft.title}`,
      "",
      `${labels.preview.problem}: ${draft.problem}`,
      "",
      `## ${labels.preview.value}`,
      ...draft.values.map((v) => `- ${v.label}: ${v.today} → ${v.after} ${v.unit}`),
      "",
      `## ${labels.preview.criteria}`,
      ...draft.criteria.map((c, i) => `${i + 1}. ${fillCriterion(c.text, c.value)}`),
      "",
      `## ${labels.preview.delivery}`,
      `- ${labels.delivery[draft.delivery]}`,
      usesApi
        ? `- ${fill(labels.preview.costLine, { run: money(draft.costPerRun, 2), month: money(monthly, 0), cap: money(draft.cap, 0) })}`
        : `- ${labels.preview.costIncluded}`,
      usesApi ? `- ${labels.preview.ownAccount}` : "",
      `- ${fill(labels.preview.hypercareLine, { n: draft.hypercareRuns, unit: draft.hypercareUnit })}`,
      draft.splitPayment ? `- ${labels.preview.split}` : "",
      "",
      `## ${labels.preview.tiers}`,
      ...activeTiers.flatMap((t) => [
        `### ${t.name} · ${money(t.min)}–${money(t.max)}`,
        t.scope,
        ...t.criteria.map((c) => `+ ${fillCriterion(c.text, c.value)}`),
      ]),
    ];
    return lines.filter((line, i, all) => line !== "" || all[i - 1] !== "").join("\n");
  };

  const copy = () => {
    void navigator.clipboard.writeText(asText()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const rowsEditor = (rows: Row[], onChange: (rows: Row[]) => void) => (
    <div className="wz-rows">
      {rows.map((row, i) => {
        const shown = fillCriterion(row.text, row.value);
        const ok = !row.text.trim() || isMeasurable(shown);
        const set = (patch: Partial<Row>) => onChange(rows.map((r, j) => (j === i ? { ...r, ...patch } : r)));
        return (
          <div key={i} className={`wz-row${ok ? "" : " wz-warn"}`}>
            {row.text.includes("{v}") ? (
              <p className="wz-crit">
                {row.text.split("{v}")[0]}
                <input aria-label={labels.criterionValue} value={row.value} onChange={(e) => set({ value: e.target.value })} />
                {row.text.split("{v}")[1]}
              </p>
            ) : (
              <input className="wz-free" aria-label={labels.criterionText} value={row.text} placeholder={labels.criterionPlaceholder} onChange={(e) => set({ text: e.target.value })} />
            )}
            <button type="button" className="wz-icon" aria-label={labels.remove} onClick={() => onChange(rows.filter((_, j) => j !== i))}>
              <Trash2 size={16} aria-hidden="true" />
            </button>
            {!ok && <small><AlertTriangle size={14} aria-hidden="true" /> {labels.notMeasurable}</small>}
          </div>
        );
      })}
      <button type="button" className="wz-add" onClick={() => onChange([...rows, { text: "", value: "" }])}>
        <Plus size={16} aria-hidden="true" />{labels.addCriterion}
      </button>
    </div>
  );

  const preview = draft && (
    <aside className="wz-preview" aria-label={labels.preview.title}>
      <p className="wz-eyebrow">{labels.preview.title}</p>
      <h3>{draft.title || "…"}</h3>
      <p className="meta">{labels.preview.alias} · {offerTemplates.find((t) => t.id === draft.templateId)?.name[lang]}</p>
      <div className="wz-metrics">
        {draft.values.map((v, i) => (
          <div key={i}>
            <small>{v.label}</small>
            <strong>{v.today} → {v.after}</strong>
            <small>{v.unit}</small>
          </div>
        ))}
      </div>
      <ul className="wz-facts">
        <li><ListChecks size={16} aria-hidden="true" />{fill(labels.preview.criteriaCount, { n: draft.criteria.filter((c) => c.text.trim()).length })}</li>
        <li><LifeBuoy size={16} aria-hidden="true" />{fill(labels.preview.hypercareLine, { n: draft.hypercareRuns, unit: draft.hypercareUnit })}</li>
        {usesApi ? (
          <>
            <li><KeyRound size={16} aria-hidden="true" />{labels.preview.ownAccount}</li>
            <li><CheckCircle2 size={16} aria-hidden="true" />{fill(labels.preview.costShort, { month: money(monthly), cap: money(draft.cap) })}</li>
          </>
        ) : (
          <li><CheckCircle2 size={16} aria-hidden="true" />{labels.preview.costIncluded}</li>
        )}
      </ul>
      {activeTiers.length > 0 && (
        <div className="wz-tiers-preview">
          {activeTiers.map((t, i) => (
            <div key={i}>
              <span>{t.name}</span>
              <strong>{money(t.min)}–{money(t.max)}</strong>
            </div>
          ))}
        </div>
      )}
      {draft.splitPayment && <p className="meta">{labels.preview.split}</p>}
    </aside>
  );

  if (!draft) {
    return (
      <div className="wz">
        <p className="wz-lead">{labels.pickLead}</p>
        <div className="wz-templates">
          {offerTemplates.map((t) => (
            <button key={t.id} type="button" className="wz-template" onClick={() => start(t)}>
              <strong>{t.name[lang]}</strong>
              <span>{t.pitch[lang]}</span>
              <span className="wz-template-go">{labels.useTemplate} <ArrowRight size={16} aria-hidden="true" /></span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="wz">
      <ol className="wz-steps">
        {steps.map((name, i) => (
          <li key={name} className={i < step ? "done" : i === step ? "now" : ""}>
            <button type="button" onClick={() => setStep(i)} disabled={i === 0}>
              {i < step ? <Check size={14} aria-hidden="true" /> : <span>{i + 1}</span>}{name}
            </button>
          </li>
        ))}
      </ol>

      <div className="wz-body">
        <section className="wz-form">
          {step === 1 && (
            <>
              <h3>{labels.problemTitle}</h3>
              <label>{labels.titleLabel}<input value={draft.title} onChange={(e) => update({ title: e.target.value })} /></label>
              <label>{labels.problemLabel}<textarea rows={4} value={draft.problem} onChange={(e) => update({ problem: e.target.value })} /></label>
              <p className="wz-hint">{labels.valueHint}</p>
              <div className="wz-values">
                <span /> <small>{labels.today}</small> <small>{labels.after}</small> <span />
                {draft.values.map((v, i) => {
                  const set = (patch: Partial<Draft["values"][number]>) => update({ values: draft.values.map((x, j) => (j === i ? { ...x, ...patch } : x)) });
                  return (
                    <div key={i} className="wz-value">
                      <input aria-label={labels.measure} value={v.label} onChange={(e) => set({ label: e.target.value })} />
                      <input type="number" min={0} aria-label={labels.today} value={v.today} onChange={(e) => set({ today: Number(e.target.value) })} />
                      <input type="number" min={0} aria-label={labels.after} value={v.after} onChange={(e) => set({ after: Number(e.target.value) })} />
                      <input aria-label={labels.unit} value={v.unit} onChange={(e) => set({ unit: e.target.value })} />
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h3>{labels.criteriaTitle}</h3>
              <p className="wz-hint">{labels.criteriaHint}</p>
              {rowsEditor(draft.criteria, (criteria) => update({ criteria }))}
            </>
          )}

          {step === 3 && (
            <>
              <h3>{labels.deliveryTitle}</h3>
              <div className="wz-choice" role="radiogroup" aria-label={labels.deliveryTitle}>
                {(["skill", "api", "both"] as const).map((d) => (
                  <button key={d} type="button" role="radio" aria-checked={draft.delivery === d} className={draft.delivery === d ? "on" : ""} onClick={() => update({ delivery: d })}>
                    <strong>{labels.delivery[d]}</strong>
                    <span>{labels.deliveryText[d]}</span>
                  </button>
                ))}
              </div>
              {usesApi ? (
                <>
                  <p className="wz-hint">{labels.costHint}</p>
                  <div className="wz-grid3">
                    <label>{labels.costPerRun}<input type="number" min={0} step={0.01} value={draft.costPerRun} onChange={(e) => update({ costPerRun: Number(e.target.value) })} /></label>
                    <label>{labels.runsPerMonth}<input type="number" min={0} value={draft.runsPerMonth} onChange={(e) => update({ runsPerMonth: Number(e.target.value) })} /></label>
                    <label>{labels.cap}<input type="number" min={0} value={draft.cap} onChange={(e) => update({ cap: Number(e.target.value) })} /></label>
                  </div>
                  <p className="wz-sum">{fill(labels.monthlySum, { month: money(monthly) })}</p>
                  {monthly > draft.cap && <p className="wz-error"><AlertTriangle size={16} aria-hidden="true" /> {labels.overCap}</p>}
                  <p className="wz-hint"><KeyRound size={14} aria-hidden="true" /> {labels.ownAccountNote}</p>
                </>
              ) : (
                <p className="wz-hint">{labels.skillCostNote}</p>
              )}
            </>
          )}

          {step === 4 && (
            <>
              <h3>{labels.hypercareTitle}</h3>
              <p className="wz-hint">{labels.hypercareHint}</p>
              <div className="wz-grid2">
                <label>{labels.hypercareRuns}<input type="number" min={1} value={draft.hypercareRuns} onChange={(e) => update({ hypercareRuns: Number(e.target.value) })} /></label>
                <label>{labels.hypercareUnit}<input value={draft.hypercareUnit} onChange={(e) => update({ hypercareUnit: e.target.value })} /></label>
              </div>

              <h3>{labels.tiersTitle}</h3>
              <p className="wz-hint">{labels.tiersHint}</p>
              {draft.tiers.map((tier, i) => {
                const set = (patch: Partial<TierDraft>) => update({ tiers: draft.tiers.map((x, j) => (j === i ? { ...x, ...patch } : x)) });
                return (
                  <div key={i} className={`wz-tier${tier.on ? "" : " off"}`}>
                    <label className="wz-check">
                      <input type="checkbox" checked={tier.on} disabled={i === 0} onChange={(e) => set({ on: e.target.checked })} />
                      {fill(labels.tierN, { n: i + 1 })}
                    </label>
                    {tier.on && (
                      <>
                        <div className="wz-grid2">
                          <label>{labels.tierName}<input value={tier.name} onChange={(e) => set({ name: e.target.value })} /></label>
                          <label>{labels.tierScope}<input value={tier.scope} onChange={(e) => set({ scope: e.target.value })} /></label>
                          <label>{labels.priceMin}<input type="number" min={0} value={tier.min} onChange={(e) => set({ min: Number(e.target.value) })} /></label>
                          <label>{labels.priceMax}<input type="number" min={0} value={tier.max} onChange={(e) => set({ max: Number(e.target.value) })} /></label>
                        </div>
                        {i > 0 && (
                          <>
                            <p className="wz-hint">{labels.tierCriteria}</p>
                            {rowsEditor(tier.criteria, (criteria) => set({ criteria }))}
                          </>
                        )}
                        {tier.min > tier.max && <p className="wz-error"><AlertTriangle size={16} aria-hidden="true" /> {labels.priceOrder}</p>}
                      </>
                    )}
                  </div>
                );
              })}

              <label className="wz-check wz-split">
                <input type="checkbox" checked={draft.splitPayment} onChange={(e) => update({ splitPayment: e.target.checked })} />
                <span><strong>{labels.splitTitle}</strong><br />{labels.splitText}</span>
              </label>
            </>
          )}

          {step === last && (
            <>
              <h3>{labels.checkTitle}</h3>
              <ul className="wz-checks">
                <li className={draft.criteria.filter((c) => c.text.trim()).length >= 3 ? "ok" : "bad"}>{labels.checks.criteria}</li>
                <li className={unmeasurable.length === 0 ? "ok" : "bad"}>{labels.checks.measurable}</li>
                <li className={draft.values.every((v) => v.today !== v.after) ? "ok" : "bad"}>{labels.checks.value}</li>
                <li className={!usesApi || (draft.costPerRun > 0 && monthly <= draft.cap) ? "ok" : "bad"}>{labels.checks.cost}</li>
                <li className={activeTiers.every((t) => t.min > 0 && t.min <= t.max) ? "ok" : "bad"}>{labels.checks.price}</li>
              </ul>
              <p className="wz-hint">{labels.aliasNote}</p>
              <div className="wz-actions">
                <button type="button" className="button" onClick={copy}>
                  {copied ? <Check size={18} aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />}{copied ? labels.copied : labels.copy}
                </button>
                {site.listingFormUrl && <a className="button button-secondary" href={site.listingFormUrl} target="_blank" rel="noopener noreferrer">{labels.submit}</a>}
              </div>
              <p className="meta">{site.listingFormUrl ? labels.submitNote : labels.submitSoon}</p>
            </>
          )}

          <div className="wz-nav">
            <button type="button" className="button button-secondary" onClick={() => setStep(Math.max(1, step - 1))} disabled={step <= 1}>
              <ArrowLeft size={18} aria-hidden="true" />{labels.back}
            </button>
            {step < last && (
              <button type="button" className="button" onClick={() => setStep(step + 1)}>
                {labels.next}<ArrowRight size={18} aria-hidden="true" />
              </button>
            )}
          </div>
          <p className="meta wz-saved">
            {labels.saved} <button type="button" className="wz-link" onClick={reset}>{labels.restart}</button>
          </p>
        </section>

        {preview}
      </div>
    </div>
  );
}
