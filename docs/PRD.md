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

## Kärnflöde

1. Köparen beskriver sitt behov i chatten. Pluginen gör om det till en strukturerad förfrågan (bransch, behov, budget, kontakt-e-post). Köparen godkänner innan den skickas.
2. Servern sparar förfrågan och matchar den mot högst 3 säljare, efter nisch, testresultat och omdömen.
3. Säljaren ser förfrågan anonymiserad (ingen kontaktinfo) och svarar med ett paket och ett pris.
4. Köparen ser erbjudandena i chatten och svarar på ett.
5. Då dras en kredit från säljaren och kontaktuppgifterna lämnas ut åt båda.
6. Leverans och betalning för paketet sker direkt mellan köpare och säljare.
7. Köparen lämnar omdöme, som påverkar framtida matchning.

## Funktioner

### MVP (måste finnas)

**Köpare (i pluginen)**
- Skapa förfrågan utifrån samtalet, med godkännande innan den skickas
- Se inkomna erbjudanden för sin förfrågan
- Svara på ett erbjudande
- Lämna omdöme

**Säljare (i pluginen + webbplatsen)**
- Marknadsanalys av en nisch: efterfrågan, prisnivåer, konkurrenter (som en färdighet/skill med webbsökning)
- Se matchade förfrågningar, anonymiserade
- Svara med paket och pris
- Se sitt kreditsaldo (bara saldot, aldrig köpknapp i pluginen)

**Webbplats**
- Säljarregistrering med inträdestest
- Köp av kreditpaket (Stripe)
- Paketkatalog: färdiga paketmallar per bransch
- Admin: godkänna säljare, se leads, återbetala krediter

### Senare

- Privatpersoner som köpare
- Fler branscher
- Abonnemang för säljare (verktyg + analys)
- Integration med OpenAI:s "Get Quote" om det blir tillgängligt för oss

### Ingår inte

- Betalning för själva paketet mellan köpare och säljare
- Köpt placering eller "boost" av säljare (förbjudet enligt plattformsreglerna)
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
