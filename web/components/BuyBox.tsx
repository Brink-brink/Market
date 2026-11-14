"use client";

import { useState, type ReactNode } from "react";

type Extra = { id: string; label: string; price: number };

type Props = {
  locale: string;
  currency: string;
  setup: [number, number];
  monthlyText: string;
  deliveryText: string;
  extras: Extra[];
  labels: { yourPackage: string; setupPrice: string; total: string; cta: string; ctaNote: string };
  children?: ReactNode;
};

// The price box on a listing. Ticking an extra adds its price to the total.
export function BuyBox({ locale, currency, setup, monthlyText, deliveryText, extras, labels, children }: Props) {
  const [chosen, setChosen] = useState<string[]>([]);
  const money = (amount: number) =>
    new Intl.NumberFormat(locale, { style: "currency", currency, maximumFractionDigits: 0 }).format(amount);
  const range = (min: number, max: number) => `${money(min)}–${money(max)}`;

  const added = extras.filter((extra) => chosen.includes(extra.id)).reduce((sum, extra) => sum + extra.price, 0);
  const toggle = (id: string) =>
    setChosen((current) => (current.includes(id) ? current.filter((x) => x !== id) : [...current, id]));

  return (
    <aside className="buy-box card">
      <p className="buy-label">{labels.yourPackage}</p>
      <div className="buy-row">
        <span>{labels.setupPrice}</span>
        <span>{range(setup[0], setup[1])}</span>
      </div>
      {extras.map((extra) => (
        <label key={extra.id} className="buy-row buy-extra">
          <span>
            <input type="checkbox" checked={chosen.includes(extra.id)} onChange={() => toggle(extra.id)} />
            {extra.label}
          </span>
          <span>+{money(extra.price)}</span>
        </label>
      ))}
      <div className="buy-row buy-total">
        <span>{labels.total}</span>
        <span aria-live="polite">{range(setup[0] + added, setup[1] + added)}</span>
      </div>
      <p className="meta">{monthlyText} · {deliveryText}</p>
      <span className="button buy-cta" aria-disabled="true">{labels.cta}</span>
      <p className="meta">{labels.ctaNote}</p>
      {children}
    </aside>
  );
}
