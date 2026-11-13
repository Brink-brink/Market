import type { Metadata } from "next";
import { creditPackages } from "@/lib/site";

export const metadata: Metadata = { title: "Krediter" };

const formatSek = (n: number) => `${n.toLocaleString("sv-SE")} kr`;

export default function CreditsPage() {
  return (
    <>
      <h1>Krediter</h1>
      <p className="lead">
        En kredit dras först när en köpare svarar på ditt erbjudande. Inget svar betyder ingen kostnad.
      </p>

      <div className="grid">
        {creditPackages.map((pkg) => (
          <div key={pkg.id} className="card">
            <h3>{pkg.name}</h3>
            <p>{pkg.credits} krediter</p>
            <div className="price">{pkg.priceSek === null ? "Pris kommer" : formatSek(pkg.priceSek)}</div>
            <a
              className="button"
              href={pkg.paymentLinkUrl || undefined}
              aria-disabled={!pkg.paymentLinkUrl}
            >
              Köp
            </a>
          </div>
        ))}
      </div>

      <p className="meta">
        Nya säljare får gratis krediter de första månaderna. Betalning sker med Stripe.
      </p>
    </>
  );
}
