# Plan: skills och plugins på Brinc

> **Pausad 2026-11-15.** Planen började från utbudet. Brinc utgår i stället från kundens problem: det vi skapar är ett löst problem med mätbart värde, och skills och plugins är bara leveransformen. Se annonsflödet med mallar (`web/lib/offer-templates.ts`) och `GRANSKNING.md`.

Utkast 2026-11-14. Bygger på svaren i planeringen och en genomgång av hur skills och plugins marknadsförs i dag (källor längst ner).

## Beslut hittills

- **Två produkttyper:** agentpaket (som i dag) och skills/plugins.
- **Köpare:** småföretag, yrkesfolk som använder Claude/ChatGPT dagligen, och utvecklare. Filter per målgrupp.
- **Betalning för skills:** engångsköp på webbplatsen, Brinc tar provision. Köpet sker aldrig inne i pluginen (plattformsreglerna).
- **Populära skills från GitHub:** listas gratis i en egen katalog med licens och länk till upphovspersonen. Frilansare säljer installation och anpassning runt dem.
- **Alias även för skills:** säljarens egna betalda skills och tjänster visas under alias. Repo och namn syns efter köp.
- **Plattformar:** Claude (app och webb), Claude Code, ChatGPT, andra agenter som läser SKILL.md (Cursor, Codex, Gemini CLI), Lovable, Replit.

### Att lösa: alias mot GitHub-katalogen

Gratisposterna från GitHub måste visa upphovsperson, licens och länk. Licenserna kräver ofta att upphovspersonen anges, och utan länk går skillen inte att hämta. Förslag: aliasregeln gäller **säljare och det de säljer**. Gratisposterna är inte säljarens, utan upphovspersonens, och visar därför källan. En tjänst kopplad till en gratispost ("jag installerar och anpassar den här åt dig") visas under säljarens alias.

## Tre sorters annonser

| Typ | Vad köparen får | Betalning | Vem visas |
| --- | --- | --- | --- |
| Agentpaket | En färdig agent i drift (som i dag) | Fast pris + månad, lead-krediter | Alias |
| Skill/plugin | En fil eller plugin att installera, granskad | Engångsköp, provision | Alias tills köp |
| Tjänst | Installation och anpassning av en skill (egen eller från GitHub) | Fast pris, lead-krediter | Alias |

Plus **gratisposter** från GitHub: inte annonser, utan katalogsidor med källa, licens och "Få hjälp att installera" som leder till tjänsterna.

## Områden

Huvudområden (från start):

1. **Kundservice och bokning:** svara kunder, boka, påminna, recensioner
2. **Sälj och marknadsföring:** offerter, leads, annonser, inlägg, SEO, nyhetsbrev
3. **Ekonomi och administration:** fakturor, bokföring, rapporter, avtal, HR
4. **Dokument och kontor:** Word, PDF, presentationer, kalkylark (det största området bland de officiella skillsen)
5. **Kod och utveckling:** granskning, tester, felsökning, drift
6. **Data och analys:** rapporter, dashboards, kalkyler

Möjliga senare: säkerhet, design och kreativt, utbildning.

Filter ovanpå områdena: **målgrupp** (företag, yrkesfolk, utvecklare), **plattform** (listan ovan), **pris** (gratis, engångsköp, paket).

## Annonsmall för en skill/plugin

Det som återkommer i katalogerna (Claude, ChatGPT, marknader för skills och n8n-flöden):

| Fält | Varför |
| --- | --- |
| Namn och en mening om vad den gör | Det köparen ser i listan |
| Område, målgrupp, plattformar | Filtren |
| **Säg så här:** 2–4 exempel på vad man skriver | Katalogerna visar exempelprompter; det säljer bäst |
| **Före och efter:** ett exempel på resultatet | Visar värdet, ersätter skärmdumpar |
| Vad den gör och inte gör | Samma som "ingår / ingår inte" i dag |
| Krav: MCP-server, API-nycklar, konton | Undviker besvikelse efter köp |
| **Behörigheter:** vilka verktyg den kör, vilken data den läser, om den skickar något utanför | Skills kör kod; det här är förtroendet |
| Licens och version, senast uppdaterad | Krävs för gratisposter, bra för betalda |
| Pris | Engångspris, valfritt med tjänst ovanpå |
| Granskad den (datum) | Som i dag |

Granskning (`GRANSKNING.md` behöver ett avsnitt för skills): vi läser hela skillen, kör den i en sandlåda, kontrollerar att den inte skickar data någonstans eller har dolda instruktioner, och att exemplen stämmer.

## Hur det marknadsförs (från genomgången)

- Katalogerna visar namn, beskrivning, kategori, bilder eller skärmdumpar, exempelprompter och integritetsinformation. Inlämningar granskas för hand.
- ChatGPT:s katalog visar ingen topplista eller köpt placering; den rankar efter sammanhang och kvalitet. Det passar vår regel att placering inte går att köpa.
- Det finns ingen officiell marknad för att sälja skills. Anthropic har en gratis plugin-katalog. Betalda marknader finns hos tredje part, ofta med granskning innan publicering.
- Utvalt slår mängd: säljare som handplockar och dokumenterar får förtroende. Pris efter värdet för köparen, inte efter arbetstid.
- Flera säljare tjänar mer på installation och anpassning än på själva filen. Det stöder tjänsteannonserna.

## Faser

- **A. Gratiskatalogen:** 30–50 handplockade skills från GitHub, med licens som tillåter listning, fältet "Säg så här", plattformar och länk. Bygger trafik och visar katalogen.
- **B. Tjänster runt skills:** frilansare annonserar installation och anpassning; leads som i dag.
- **C. Betalda skills:** annonsmallen ovan, granskning, engångsköp med provision via Stripe, nedladdning efter köp.
- **D. Pluginen:** `/market` hittar skills och tjänster på samma sätt som agentpaket, och öppnar dem på `/picks`.

## Öppna frågor

1. Provision för betalda skills: hur stor andel?
2. Leverans efter köp: nedladdning av en zip, eller ett privat repo/plugin-marknad per köpare?
3. Vem granskar skills, och hur snabbt?
4. Får gratisposter visas utan att upphovspersonen tillfrågats, om licensen tillåter det, eller ska vi fråga först?
5. Behövs en ny `listing-draft` för skills, eller en gemensam med produkttyp som första fråga?

## Källor

- https://www.gradually.ai/en/claude-marketplaces/
- https://skillselion.com/guides/claude-skills-marketplace-guide
- https://www.developersdigest.tech/blog/best-claude-code-skills-2026
- https://www.moburst.com/blog/chatgpt-app-directory-explained-what-brands-need-to-know/
- https://bigideasdb.com/chatgpt-apps-directory-market-map
- https://neura.market/creators/guide
- https://community.latenode.com/t/whats-the-best-way-to-sell-my-workflow-templates-in-a-marketplace/40791
- https://github.com/travisvn/awesome-claude-skills
- https://www.analyticsvidhya.com/blog/2026/03/github-repositories-to-get-free-claude-code-skills/
