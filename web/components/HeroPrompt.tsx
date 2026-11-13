"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { pendingKey } from "@/lib/pending-need";

type Props = {
  mode: "need" | "listing";
  target: string;
  placeholder: string;
  cta: string;
  hints: string[];
};

// The box on the home page. What the visitor writes is handed to the assistant on the target page.
export function HeroPrompt({ mode, target, placeholder, cta, hints }: Props) {
  const router = useRouter();
  const [text, setText] = useState("");

  function go() {
    const value = text.trim();
    // Kept in the browser only, never in the address.
    if (value) sessionStorage.setItem(pendingKey(mode), value);
    router.push(target);
  }

  return (
    <form
      className="prompt"
      onSubmit={(e) => {
        e.preventDefault();
        go();
      }}
    >
      <textarea
        value={text}
        maxLength={4000}
        placeholder={placeholder}
        aria-label={placeholder}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            go();
          }
        }}
      />
      <div className="prompt-row">
        <div className="chips">
          {hints.map((hint) => (
            <button key={hint} type="button" className="chip" onClick={() => setText(hint)}>
              {hint}
            </button>
          ))}
        </div>
        <button className="button" type="submit">{cta}</button>
      </div>
    </form>
  );
}
