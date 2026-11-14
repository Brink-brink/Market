"use client";

import { useState } from "react";
import { Check, Copy, ExternalLink, Sparkles, Star } from "lucide-react";
import type { Dict } from "@/lib/i18n";

type Props = {
  labels: Dict["handoff"];
  // The text the visitor takes to their own AI (see lib/handoff-prompt.ts).
  prompt: string;
  // A large card on a listing or the buyer page, or a slim row in the catalog.
  variant: "listing" | "advisor" | "banner";
  // Colour of the card on a listing.
  tone?: string;
};

// Sends the visitor to their own AI. The requirements conversation happens there, not on this website:
// the button copies a prompt that carries the questions and the catalog.
export function AiHandoff({ labels, prompt, variant, tone }: Props) {
  const [copied, setCopied] = useState(false);
  const [showText, setShowText] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 4000);
    } catch {
      // Copying can be blocked. Show the text so it can be selected by hand.
      setShowText(true);
    }
  }

  const copyButton = (
    <button type="button" className="button handoff-copy" onClick={() => void copy()}>
      {copied ? <Check size={18} aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />}
      <span aria-live="polite">{copied ? labels.copied : labels.copy}</span>
    </button>
  );

  if (variant === "banner") {
    return (
      <div className="handoff-banner">
        <span className="icon" aria-hidden="true"><Sparkles size={22} /></span>
        <div>
          <strong>{labels.bannerTitle}</strong>
          <p>{labels.bannerText}</p>
        </div>
        {copyButton}
      </div>
    );
  }

  return (
    <div className={`handoff ${tone ? `tone-${tone}` : "handoff-ink"}`}>
      <div className="handoff-text">
        <span className="handoff-badge"><Sparkles size={14} aria-hidden="true" />{labels.badge}</span>
        <h2>{variant === "listing" ? labels.listingTitle : labels.advisorTitle}</h2>
        <p>{variant === "listing" ? labels.listingText : labels.advisorText}</p>
        <ol className="handoff-steps">
          {labels.steps.map((step) => <li key={step}>{step}</li>)}
        </ol>
        <div className="actions">
          {copyButton}
          <a className="button button-secondary" href="https://claude.ai/new" target="_blank" rel="noopener noreferrer">
            {labels.openClaude}<ExternalLink size={15} aria-hidden="true" />
          </a>
          <a className="button button-secondary" href="https://chatgpt.com/" target="_blank" rel="noopener noreferrer">
            {labels.openChatgpt}<ExternalLink size={15} aria-hidden="true" />
          </a>
        </div>
        <p className="handoff-note">{labels.note}</p>
        <details className="handoff-show" open={showText} onToggle={(e) => setShowText(e.currentTarget.open)}>
          <summary>{labels.show}</summary>
          <textarea readOnly value={prompt} rows={8} aria-label={labels.show} onFocus={(e) => e.currentTarget.select()} />
        </details>
      </div>

      {/* A picture of what happens in the visitor's AI. Decoration only. */}
      <div className="handoff-preview" aria-hidden="true">
        <span className="handoff-preview-bar"><i /><i /><i /></span>
        <span className="bubble bubble-assistant">{labels.previewQuestion}</span>
        <span className="chips">
          {labels.previewOptions.map((text) => <span key={text} className="chip">{text}</span>)}
        </span>
        <span className="handoff-preview-title">{labels.previewAlt}</span>
        {[5, 4, 3].map((stars) => (
          <span key={stars} className="handoff-preview-row">
            <span className="stars">
              {[1, 2, 3, 4, 5].map((n) => (
                <Star key={n} size={14} className={n <= stars ? "star-on" : "star-off"} />
              ))}
            </span>
            <i style={{ width: `${30 + stars * 10}%` }} />
          </span>
        ))}
      </div>
    </div>
  );
}
