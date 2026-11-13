import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Skicka in annons" };

export default function ListingPage() {
  return (
    <>
      <h1>Skicka in annons</h1>
      <p className="lead">
        Skriv gärna utkastet först i Claude med <code>/market</code> → Säljare → Skapa en annons. Klistra
        sedan in det här.
      </p>

      <h2>Det här behöver du</h2>
      <ul className="steps">
        <li><strong>Nisch:</strong> kundtyp och typ av agent, till exempel bokningsagent för frisörer</li>
        <li><strong>Paket:</strong> vad som byggs, vilka integrationer, hur lång support</li>
        <li><strong>Pris:</strong> ett fast intervall för uppstart, plus månadsavgift om det finns</li>
        <li><strong>Leveranstid</strong> i arbetsdagar</li>
        <li><strong>Prototyp eller I drift</strong>, och en demo: testlänk, testnummer eller video</li>
        <li><strong>Minst 3 testscenarier</strong> med förväntat resultat</li>
        <li><strong>Datahantering:</strong> vilka uppgifter, var de lagras, vilka tjänster som används</li>
      </ul>

      <div className="note">
        Köpare ser dig bara under ett alias. Skriv inte namn, företagsnamn, e-post, telefon, webbadress
        eller sociala medier i annonstexten. Demon och testinstruktionerna ser bara granskaren.
      </div>

      {site.listingFormUrl ? (
        <iframe className="form-frame" src={site.listingFormUrl} title="Formulär för annons" />
      ) : (
        <p className="meta">Formuläret öppnar snart.</p>
      )}
    </>
  );
}
