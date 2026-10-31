# PRD – AI-jobb-plugin

## Problem

- **Nybörjare** som vill tjäna extra på att bygga AI-agenter får inget första uppdrag. Fiverr och Upwork premierar omdömen, och nya profiler syns inte.
- **Småföretag** vill ha AI-agenter (bokning, telefon, leaduppföljning) men vet inte vem de ska anlita eller vad det kostar.
- Båda frågar redan Claude och ChatGPT. Där finns ingen matchning i dag.

## Målgrupper

| Roll | Vem | Vad de vill |
| --- | --- | --- |
| Köpare | Småföretag (först), privatpersoner (senare) | Ett fungerande agentpaket till fast pris, utan att leta |
| Säljare | Personer som vill ha ett extrajobb och bygger med Claude/ChatGPT; många från AI-communities på Skool | Uppdrag, och veta vilken nisch som lönar sig |
| Admin | Philip | Godkänna säljare, hantera paket, följa intäkter |

## Ingång: `/market`

Både köpare och säljare börjar med kommandot `/market` (fullt namn `/ai-jobb:market`). Claude frågar "Är du köpare eller säljare?" med klickbara alternativ där klienten har det, annars i text.

- **Säljare** → en meny:
  1. *Analysera en nisch*: marknadsanalysen (efterfrågan, priser, konkurrenter från webben)
  2. *Se köparnas intresse*: summerad efterfrågan per nisch från förfrågningar i tjänsten, och matchade förfrågningar
  3. *Skapa en annons*: paket + prototyp eller produkt i drift, som granskas innan den visas (se `GRANSKNING.md`)
  4. *Mina annonser och förfrågningar*: status, matchade förfrågningar, kreditsaldo
- **Köpare** → bläddra i katalogen av granskade annonser och begära offert, eller beskriva sitt behov och bli matchad.

Fas 1: säljare kan analysera och skapa ett **annonsutkast** (inget sparas eller skickas). Köparens intresse, inskickade annonser och köparvägen kräver servern; tills dess säger Claude att det inte är öppet än.

Säljare kan också fråga med egna ord ("lönar det sig att…"); då väljer Claude marknadsanalysen själv.

## Kärnflöde

0. Säljaren skapar en annons som granskas (`GRANSKNING.md`). Först en godkänd annons gör säljaren synlig i katalogen och matchningen.
1. Köparen hittar en säljare på ett av två sätt, och godkänner förfrågan (bransch, behov, budget, kontakt-e-post) innan den skickas:
   - **Katalogen:** bläddrar bland godkända annonser och begär offert från upp till 3 av dem.
   - **Matchning:** beskriver sitt behov i chatten; servern matchar mot högst 3 säljare med godkänd annons i nischen, efter relevans, omdömen och svarstid.
2. Servern sparar förfrågan och skickar den till de valda eller matchade säljarna.
3. Säljaren ser förfrågan anonymiserad (ingen kontaktinfo) och svarar med ett paket och ett pris.
4. Köparen ser erbjudandena i chatten och svarar på ett.
5. Då dras en kredit från säljaren och kontaktuppgifterna lämnas ut åt båda.
6. Leverans och betalning för paketet sker direkt mellan köpare och säljare.
7. Köparen lämnar omdöme, som påverkar framtida matchning.

## Funktioner

### MVP (måste finnas)

**Köpare (i pluginen)**
- Bläddra i katalogen av granskade annonser (nisch, paket, prisintervall, märket Prototyp/I drift, betyg). Inga kontaktuppgifter visas
- Begära offert från en eller flera annonser (högst 3 per förfrågan)
- Skapa förfrågan utifrån samtalet, med godkännande innan den skickas
- Se inkomna erbjudanden för sin förfrågan
- Svara på ett erbjudande
- Lämna omdöme

**Säljare (i pluginen + webbplatsen)**
- Marknadsanalys av en nisch: efterfrågan, prisnivåer, konkurrenter (som en färdighet/skill med webbsökning)
- Skapa annons med Claudes hjälp: paket, fast prisintervall, leveranstid, bevistyp (Prototyp/I drift), demo, testinstruktioner, datahantering. Skickas till granskning efter säljarens godkännande
- Se sina annonser och deras granskningsstatus
- Se köparnas intresse: antal förfrågningar och vanlig budget per nisch, bara summor
- Se matchade förfrågningar, anonymiserade
- Svara med paket och pris
- Se sitt kreditsaldo (bara saldot, aldrig köpknapp i pluginen)

**Webbplats**
- Säljarregistrering. Den första godkända annonsen ersätter inträdestestet
- Köp av kreditpaket (Stripe)
- Katalogen av godkända annonser (samma innehåll som i pluginen)
- Paketmallar per bransch som säljare kan utgå från
- Admin: granska annonser enligt `GRANSKNING.md`, pausa annonser, se leads, återbetala krediter

### Senare

- Privatpersoner som köpare
- Fler branscher
- Abonnemang för säljare (verktyg + analys)
- Integration med OpenAI:s "Get Quote" om det blir tillgängligt för oss

### Ingår inte

- Betalning för själva paketet mellan köpare och säljare
- Köpt placering eller "boost" av säljare eller annonser, i katalogen eller matchningen (förbjudet enligt plattformsreglerna)
- Snabbare eller mildare granskning mot betalning
- Att ta emot, lagra eller köra säljarens kod; allt granskas via säljarens egen demo
- Kall utgående e-post som paket i MVP (för riskabelt för nybörjare)

## Intäktsmodell

- Säljaren köper krediter på webbplatsen.
- En kredit dras **först när köparen svarar** på säljarens erbjudande. Inget svar = ingen kostnad.
- Startpris att testa: 5–10 % av paketets pris per svarat lead (t.ex. 150–300 kr för ett paket på 3 000 kr).
- Nya säljare får gratis krediter de första månaderna.

## Startnisch

En bransch och tre paket i MVP. Förslag: frisörer/skönhet eller tandvård, med
1. Chattbot på hemsidan (FAQ + fångar kontakt)
2. Bokningsagent med påminnelser
3. Recensionsagent (ber nöjda kunder om omdömen)

Bransch är inte beslutad – se `TASKS.md`.

## Mätetal

| Mätetal | Mål i validering |
| --- | --- |
| Säljare som köpt krediter | ≥ 20 |
| Andel svarade leads som blir affär | ≥ 50 % |
| Svarstid säljare → erbjudande | < 24 h |
| Snittbetyg från köpare | ≥ 4 av 5 |

## Öppna frågor

- Godkänner Anthropic och OpenAI lead-modellen? (Fråga innan bygge.)
- Hur hämtar köparen erbjudanden utan konto? Förslag: förfrågans id + hemlig token, plus e-postavisering.
- Vilket pris per lead tål nybörjare?
- Ansvar om en säljares agent ger fel besked till en kund (villkor/ansvarsbegränsning).
- Katalogen gör det lättare för köpare och säljare att gå runt tjänsten (hitta säljaren via demon och kontakta direkt). Räcker det att granskningen stoppar kontaktuppgifter i annons och demo?
- Hinner en person granska alla annonser? Mål 3 arbetsdagar; behövs fler granskare när säljarna blir många.
- Annonsen ersätter inträdestestet: ska nya säljare utan godkänd annons kunna göra något alls utöver analys och utkast?
