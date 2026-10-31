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
- **Köpare** → en meny:
  1. *Hitta någon som bygger din AI-agent*: beskriva behovet, och sedan bläddra i katalogen eller bli matchad (se Köparens väg)
  2. *Mina förfrågningar och erbjudanden*: köparen klistrar in koden från bekräftelsemejlet

Fas 1: säljare kan analysera och skapa ett **annonsutkast**, och köpare kan skriva ett **behovsutkast**. Inget av dem sparas eller skickas. Köparens intresse, inskickade annonser, katalogen, förfrågningar och erbjudanden kräver servern; tills dess säger Claude att det inte är öppet än.

Säljare kan också fråga med egna ord ("lönar det sig att…"); då väljer Claude marknadsanalysen själv.

## Kärnflöde

0. Säljaren skapar en annons som granskas (`GRANSKNING.md`). Först en godkänd annons gör säljaren synlig i katalogen och matchningen.
1. Köparen hittar en säljare på ett av två sätt, och godkänner förfrågan (bransch, behov, budget, kontakt-e-post) innan den skickas:
   - **Katalogen:** bläddrar bland godkända annonser och begär offert från upp till 3 av dem.
   - **Matchning:** beskriver sitt behov i chatten; servern matchar mot högst 3 säljare med godkänd annons i nischen, efter relevans, omdömen och svarstid.
2. Köparen bekräftar sin e-post med en länk. Först då går förfrågan ut till säljarna. Bekräftelsemejlet innehåller koden köparen använder för att se förfrågan och erbjudandena.
3. Säljaren ser förfrågan anonymiserad (ingen kontaktinfo) och svarar med ett paket och ett pris.
4. Köparen ser erbjudandena i chatten (med koden) och svarar på högst 2 åt gången inom varje kategori.
5. Då dras en kredit från säljaren och kontaktuppgifterna lämnas ut åt båda.
6. Leverans och betalning för paketet sker direkt mellan köpare och säljare.
7. Köparen lämnar omdöme, som påverkar framtida matchning.

## Köparens väg

Köparen behöver inget konto. Bara det köparen godkänner sparas, och ingen kontakt sker före betalt lead.

### 1. Behovet

Claude hjälper köparen beskriva behovet med enkla frågor: bransch, vad som går fel i dag, vad agenten ska göra, nuvarande system, volym, budget, när och område (stad eller region, aldrig exakt adress). Svaret "vet inte" är okej. Kontaktuppgifter tas aldrig med i behovstexten. I fas 1 är det här **behovsutkastet** (skill `need-draft`); inget sparas.

### 2. Katalog eller matchning

- **Katalogen:** Claude visar godkända annonser som passar bransch och budget: alias, paket, prisintervall, leveranstid, märket Prototyp/I drift, "demo granskad <datum>" och betyg. Ordningen går inte att köpa, och det står i svaret. Köparen väljer upp till 3 annonser.
- **Matchning:** tjänsten väljer upp till 3 säljare med godkänd annons i nischen (se ARKITEKTUR, Matchning).

### 3. Godkänna och bekräfta

Claude visar exakt vad som skickas: alla fält från behovet, vilka säljare (alias) eller "matchas av tjänsten", och e-postadressen med texten "visas bara för säljaren vars erbjudande du svarar på". Köparen väljer Skicka eller Ändra. Kontaktfiltret körs på behovstexten.

Efter Skicka får köparen ett mejl med en bekräftelselänk och en kod. Förfrågan går ut till säljarna först när länken är klickad. Det skyddar säljarna mot falska förfrågningar, som de annars skulle betala för. En obekräftad förfrågan raderas efter 48 timmar.

### 4. Koden

Koden identifierar köparen utan konto. Köparen skriver `/market` → Köpare → *Mina förfrågningar och erbjudanden* och klistrar in koden; samma kod fungerar på webbplatsen. Koden ger bara tillgång till den förfrågan och dess erbjudanden. Tappar köparen koden kan en ny skickas till samma e-post.

### 5. Erbjudanden

Ett erbjudande visar: säljarens alias och betyg, paket, pris (fast intervall eller fast pris), vad som ingår, leveranstid, ett kort meddelande som passerat kontaktfiltret, och hur länge erbjudandet gäller (14 dagar). Köparen får mejl när ett erbjudande kommer.

Köparen kan:

- **Svara.** Claude frågar först: "När du svarar får säljaren ditt namn och din e-post, och du får säljarens kontaktuppgifter. Vill du svara?" Vid ja dras krediten och kontakten lämnas ut åt båda hållen.
- **Tacka nej**, med frivillig anledning. Säljaren betalar ingenting.

**Högst 2 åt gången inom varje kategori.** En kategori är en typ av agent, till exempel chattbot, bokningsagent eller telefonagent. Köparen kan ha svarat på högst 2 erbjudanden i samma kategori samtidigt. Vill köparen svara på ett tredje markerar hen först ett av de tidigare som "blev ingen affär". Det håller nere antalet säljare som betalar för samma affär.

### 6. Om ingen svarar

Har inget erbjudande kommit inom 48 timmar efter bekräftelsen får köparen ett ärligt mejl om det. En matchad förfrågan kan då gå till nästa säljare i turordningen, högst 3 totalt. Förfrågan stängs efter 14 dagar; köparen kan skapa en ny.

### 7. Efter kontakt

- Leverans och betalning sker direkt mellan köpare och säljare.
- 3–4 veckor efter svaret får köparen ett mejl: "Blev det affär?" och ett omdöme 1–5. Bara den som fått kontakt genom ett betalt lead kan lämna omdöme.
- Köparen kan anmäla en säljare som aldrig hör av sig; det påverkar säljarens betyg och kan pausa annonsen (`GRANSKNING.md`).
- Säljaren kan begära tillbaka krediten om köparen är falsk eller inte går att nå. Admin beslutar.

## Funktioner

### MVP (måste finnas)

**Köpare (i pluginen)**
- Bläddra i katalogen av granskade annonser. Köparen ser bara: säljarens alias, nisch, paketets innehåll, prisintervall, leveranstid, märket Prototyp/I drift, "demo granskad <datum>" och betyg. Aldrig namn, företagsnamn, demo-länk eller annat som gör kontakt möjlig före betalt lead
- Begära offert från en eller flera annonser (högst 3 per förfrågan)
- Skapa förfrågan utifrån samtalet, med godkännande innan den skickas
- Bekräfta e-posten innan förfrågan går ut; få en kod i bekräftelsemejlet
- Se inkomna erbjudanden för sin förfrågan med koden
- Svara på ett erbjudande (högst 2 åt gången inom varje kategori) eller tacka nej
- Anmäla en säljare som inte hör av sig
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

## Ingen kontakt före betalt lead

Köpare och säljare kan inte hitta eller kontakta varandra förrän säljaren har betalat för leadet, det vill säga när köparen har svarat på säljarens erbjudande. Så upprätthålls det:

- **Alias:** säljare visas under ett alias som tjänsten tilldelar. Inget riktigt namn eller företagsnamn.
- **Demo bara för granskaren:** köparen ser att demon är granskad och när, men aldrig länken, testnumret eller videon.
- **Kontaktfilter på all fritext:** annonser, förfrågningar och erbjudanden kontrolleras automatiskt för namn, företagsnamn, e-post, telefon, webbadresser och konton i sociala medier. Träffar tas bort innan texten visas för den andra parten. Annonser granskas dessutom manuellt.
- **Villkor:** att försöka kringgå tjänsten är förbjudet i villkoren och leder till att annonsen pausas.

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
| Andel svarade leads som blir affär (mejlet "Blev det affär?") | ≥ 50 % |
| Svarstid säljare → erbjudande | < 24 h |
| Snittbetyg från köpare | ≥ 4 av 5 |

## Öppna frågor

- Godkänner Anthropic och OpenAI lead-modellen? (Fråga innan bygge.)
- Ska Claude säga till när köparen sannolikt inte behöver någon som bygger (t.ex. när bokningssystemet redan skickar påminnelser)? Beslut: senare, troligen ja.
- Vilket pris per lead tål nybörjare?
- Ansvar om en säljares agent ger fel besked till en kund (villkor/ansvarsbegränsning).
- Hinner en person granska alla annonser? Mål 3 arbetsdagar; behövs fler granskare när säljarna blir många.
- Annonsen ersätter inträdestestet: ska nya säljare utan godkänd annons kunna göra något alls utöver analys och utkast?
