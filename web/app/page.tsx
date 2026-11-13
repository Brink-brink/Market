import Link from "next/link";
import { site } from "@/lib/site";

export default function Home() {
  return (
    <>
      <h1>{site.tagline}</h1>
      <p className="lead">
        Småföretag som behöver en AI-agent, till exempel en chattbot, en bokningsagent eller en
        telefonagent, får hitta dig. Du betalar bara när en köpare svarar på ditt erbjudande.
      </p>
      <div className="actions">
        <Link href="/annons" className="button">Skicka in annons</Link>
        <Link href="/katalog" className="button button-secondary">Se katalogen</Link>
      </div>

      <h2>Så fungerar det</h2>
      <ol className="steps">
        <li>
          <strong>Analysera din nisch</strong> i Claude med kommandot <code>/market</code>: efterfrågan,
          prisnivåer och konkurrenter, med källa för varje siffra.
        </li>
        <li>
          <strong>Skriv en annons</strong> för ditt paket: innehåll, fast prisintervall, leveranstid och en
          demo. Claude hjälper dig med utkastet.
        </li>
        <li>
          <strong>Skicka in annonsen</strong> här. Vi granskar demon och annonsen, normalt inom 3
          arbetsdagar. Din första godkända annons gör dig synlig.
        </li>
        <li>
          <strong>Få förfrågningar.</strong> Köpare ser din annons under ett alias och skickar en
          förfrågan. Du svarar med ett erbjudande.
        </li>
        <li>
          <strong>Betala bara för svar.</strong> En kredit dras först när köparen svarar på ditt
          erbjudande. Då får ni varandras kontaktuppgifter.
        </li>
      </ol>

      <h2>Det här lovar vi</h2>
      <div className="grid">
        <div className="card">
          <h3>Ingen köpt placering</h3>
          <p>Katalogen och matchningen styrs bara av relevans och kvalitet. Ingen kan betala sig högre upp.</p>
        </div>
        <div className="card">
          <h3>Inget svar, ingen kostnad</h3>
          <p>Du betalar inte för att svara på förfrågningar, bara när köparen svarar dig.</p>
        </div>
        <div className="card">
          <h3>Ärlig granskning</h3>
          <p>Alla granskas efter samma checklista. Granskningen går inte att köpa snabbare eller mildare.</p>
        </div>
      </div>
    </>
  );
}
