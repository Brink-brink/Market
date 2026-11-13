import type { Metadata } from "next";

export const metadata: Metadata = { title: "Villkor" };

export default function TermsPage() {
  return (
    <>
      <h1>Villkor</h1>
      <div className="note">Utkast. Ska granskas av jurist innan tjänsten tar betalt.</div>
      <h2>Huvudpunkter</h2>
      <ul className="steps">
        <li>Säljaren betalar en kredit först när en köpare svarar på säljarens erbjudande.</li>
        <li>Säljaren visas under ett alias. Kontaktuppgifter lämnas ut först när leadet är betalt.</li>
        <li>Att försöka kringgå tjänsten, till exempel genom att lämna kontaktuppgifter i annonser eller erbjudanden, är förbjudet och leder till att annonsen pausas.</li>
        <li>Annonser granskas innan de visas. Placering och granskning går inte att köpa.</li>
        <li>Leverans och betalning för paketet sker direkt mellan köpare och säljare.</li>
        <li>Krediter kan återbetalas om köparen är falsk eller inte går att nå, efter beslut av tjänsten.</li>
      </ul>
    </>
  );
}
