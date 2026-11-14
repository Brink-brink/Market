"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, Copy, Download, Sparkles, Star } from "lucide-react";
import type { Dict } from "@/lib/i18n";
import { installCommands } from "@/lib/plugin";

type Props = {
  labels: Dict["plugin"];
  // What to write in Claude: /market, or the need draft for one listing.
  command: string;
  // A large card on a listing or the buyer page, or a slim row in the catalog.
  variant: "listing" | "advisor" | "banner";
  tone?: string;
  // The page that explains how to install the plugin.
  installHref?: string;
};


export function CopyLine({ text, labels }: { text: string; labels: Dict["plugin"] }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="cmd">
      <code>{text}</code>
      <button
        type="button"
        aria-label={copied ? labels.copied : `${labels.copy}: ${text}`}
        onClick={() => {
          void navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          });
        }}
      >
        {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
      </button>
    </div>
  );
}

// Points the visitor to the ai-jobb plugin in Claude. The requirements conversation happens there;
// the plugin then opens the matching listings on this site.
export function PluginCard({ labels, command, variant, tone, installHref }: Props) {
  if (variant === "banner") {
    return (
      <div className="handoff-banner">
        <CopyLine text={command} labels={labels} />
        {installHref && (
          <Link href={installHref} className="button">
            <Download size={18} aria-hidden="true" />{labels.installCta}
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className={`handoff ${tone ? `tone-${tone}` : "handoff-ink"}`}>
      <div className="handoff-text">
        <span className="handoff-badge"><Sparkles size={14} aria-hidden="true" />{labels.badge}</span>
        <h2>{variant === "listing" ? labels.listingTitle : labels.advisorTitle}</h2>
        <p>{variant === "listing" ? labels.listingText : labels.advisorText}</p>

        <h3 className="cmd-title">{labels.writeTitle}</h3>
        <CopyLine text={command} labels={labels} />

        <details className="handoff-show">
          <summary>{labels.installTitle}</summary>
          <p>{labels.installText}</p>
          {installCommands.map((line) => <CopyLine key={line} text={line} labels={labels} />)}
        </details>
        <p className="handoff-note">{labels.note}</p>
      </div>

      {/* A picture of what happens in Claude. Decoration only. */}
      <div className="handoff-preview" aria-hidden="true">
        <span className="handoff-preview-bar"><i /><i /><i /></span>
        <span className="bubble bubble-user">{command}</span>
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
