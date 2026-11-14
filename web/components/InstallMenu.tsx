"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Download, ExternalLink } from "lucide-react";
import type { Dict } from "@/lib/i18n";
import { pluginStores } from "@/lib/plugin";

const storeNames = { claude: "Claude", chatgpt: "ChatGPT" };

// The "get the plugin" button. It opens a menu with the AI assistants' plugin directories.
// A directory without an address is shown as coming soon.
export function InstallMenu({ labels, moreHref, light }: { labels: Dict["plugin"]; moreHref: string; light?: boolean }) {
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (event: MouseEvent | KeyboardEvent) => {
      if (event instanceof KeyboardEvent ? event.key === "Escape" : !box.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", close);
    };
  }, [open]);

  return (
    <div className="install-menu" ref={box}>
      <button
        type="button"
        className={`button${light ? " handoff-copy" : ""}`}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen(!open)}
      >
        <Download size={18} aria-hidden="true" />{labels.installCta}<ChevronDown size={16} aria-hidden="true" />
      </button>
      {open && (
        <div className="install-list">
          {pluginStores.map((store) =>
            store.url ? (
              <a key={store.id} href={store.url} target="_blank" rel="noopener noreferrer" className="install-item">
                <strong>{storeNames[store.id]}</strong>
                <small>{labels.stores[store.id]}</small>
                <ExternalLink size={16} aria-hidden="true" />
              </a>
            ) : (
              <span key={store.id} className="install-item install-soon" aria-disabled="true">
                <strong>{storeNames[store.id]}</strong>
                <small>{labels.stores[store.id]}</small>
                <span className="install-badge">{labels.soon}</span>
              </span>
            ),
          )}
          <Link href={moreHref} className="install-more" onClick={() => setOpen(false)}>{labels.more} →</Link>
        </div>
      )}
    </div>
  );
}
