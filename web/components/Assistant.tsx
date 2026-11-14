"use client";

import { useEffect, useRef, useState } from "react";
import type { Dict, Locale } from "@/lib/i18n";
import { pendingKey } from "@/lib/pending-need";

type Message = { role: "user" | "assistant"; content: string };
type Status = "checking" | "ready" | "off";

type Props = {
  lang: Locale;
  intro: string;
  labels: Dict["assistant"];
};

// The listing assistant: a chat that helps a freelancer write a listing.
// The conversation lives only in this component.
export function Assistant({ lang, intro, labels }: Props) {
  const [status, setStatus] = useState<Status>("checking");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [copied, setCopied] = useState(false);
  const [carried, setCarried] = useState("");
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/assist")
      .then((res) => res.json())
      .then((data: { enabled?: boolean }) => {
        setStatus(data.enabled ? "ready" : "off");
        // Text the visitor wrote in the box on the home page.
        const pending = sessionStorage.getItem(pendingKey);
        sessionStorage.removeItem(pendingKey);
        if (!pending) return;
        if (data.enabled) void send(pending);
        else setCarried(pending);
      })
      .catch(() => setStatus("off"));
    // Runs once on mount: checks whether the assistant is switched on.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [messages, busy]);

  const errorText: Record<string, string> = {
    off: labels.off,
    rate_limited: labels.rateLimited,
    refused: labels.refused,
    too_long: labels.tooLong,
  };

  async function send(initial?: string) {
    const text = (initial ?? input).trim();
    if (!text || busy) return;
    const next: Message[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setNotice("");
    setBusy(true);
    try {
      const res = await fetch("/api/assist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lang, messages: next }),
      });
      const data = (await res.json()) as { reply?: string; error?: string };
      if (data.reply) {
        setMessages([...next, { role: "assistant", content: data.reply }]);
      } else {
        // Give the text back so the person can change it and try again.
        setMessages(messages);
        setInput(text);
        setNotice(errorText[data.error ?? ""] ?? labels.error);
        if (data.error === "off") setStatus("off");
      }
    } catch {
      setMessages(messages);
      setInput(text);
      setNotice(labels.error);
    } finally {
      setBusy(false);
    }
  }

  const lastReply = [...messages].reverse().find((m) => m.role === "assistant")?.content;

  async function copyDraft() {
    if (!lastReply) return;
    await navigator.clipboard.writeText(lastReply);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (status === "off") {
    return (
      <div className="note">
        {carried && <p><em>{carried}</em></p>}
        {labels.off}
      </div>
    );
  }

  return (
    <div className="assistant">
      <div className="assistant-log" ref={logRef} aria-live="polite">
        <div className="bubble bubble-assistant">{intro}</div>
        {messages.map((message, i) => (
          <div key={i} className={`bubble bubble-${message.role}`}>{message.content}</div>
        ))}
        {busy && <div className="bubble bubble-assistant bubble-busy">{labels.thinking}</div>}
      </div>

      {notice && <p className="note" role="alert">{notice}</p>}

      <form
        className="assistant-form"
        onSubmit={(e) => {
          e.preventDefault();
          void send();
        }}
      >
        <textarea
          value={input}
          rows={3}
          maxLength={4000}
          placeholder={labels.placeholder}
          aria-label={labels.placeholder}
          disabled={status !== "ready"}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              void send();
            }
          }}
        />
        <div className="actions">
          <button className="button" type="submit" disabled={busy || status !== "ready" || !input.trim()}>
            {labels.send}
          </button>
          {lastReply && (
            <button className="button button-secondary" type="button" onClick={() => void copyDraft()}>
              {copied ? labels.copied : labels.copy}
            </button>
          )}
          {messages.length > 0 && (
            <button
              className="button button-secondary"
              type="button"
              disabled={busy}
              onClick={() => {
                setMessages([]);
                setNotice("");
              }}
            >
              {labels.restart}
            </button>
          )}
        </div>
      </form>
      <p className="meta">{labels.privacy}</p>
    </div>
  );
}
