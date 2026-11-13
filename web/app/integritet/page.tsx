import type { Metadata } from "next";

export const metadata: Metadata = { title: "Integritet" };

export default function PrivacyPage() {
  return (
    <>
      <h1>Integritet</h1>
      <div className="note">Utkast. Ska granskas innan tjänsten öppnar.</div>
      <h2>Vad vi sparar</h2>
      <ul className="steps">
        <li><strong>Säljare:</strong> namn, e-post, annonsens innehåll, demo och testinstruktioner (demon ses bara av granskaren).</li>
        <li><strong>Köpare:</strong> bara det köparen själv godkänner i en förfrågan, och e-postadressen.</li>
        <li>Vi sparar aldrig chatthistorik och bygger inga profiler från samtal.</li>
        <li>Betalningar hanteras av Stripe. Vi ser aldrig kortuppgifter.</li>
      </ul>
    </>
  );
}
