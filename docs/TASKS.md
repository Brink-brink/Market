# Tasks

Uppdatera när något blir klart eller tillkommer.

## Fas 0
- [ ] Mejla Anthropic (mcp-review@anthropic.com) om lead-modellen
- [ ] Fråga OpenAI via plugin-portalen om lead-modellen
- [ ] Beslut: startbransch (frisörer/skönhet eller tandvård?)
- [ ] Beslut: 3 paket med prisintervall
- [ ] 10 intervjuer med företagare
- [ ] 10 intervjuer med blivande säljare (Skool-communities)
- [x] Arbetsnamn: Brinc (tillfälligt)
- [ ] Köp domän före fas 2 (brinc.se, .com, .ai och .io är upptagna; brinc.nu och brincai.se var lediga 2026-11-13)
- [ ] Kolla varumärkesintrång för "Brinc" (PRV, EUIPO)

## Fas 1
- [x] Skriv SKILL.md för marknadsanalys (`plugin/skills/market-analysis/SKILL.md`)
- [x] Skapa plugin-skelett (`plugin/.claude-plugin/plugin.json`, `plugin/README.md`)
- [x] Ingångskommandot `/market` som frågar köpare/säljare (`plugin/skills/market/SKILL.md`)
- [x] Design: säljarmeny, annonser, katalog för köpare, granskning (`docs/GRANSKNING.md`, PRD, ARKITEKTUR)
- [x] Säljarmeny i `/market` och annonsutkast (`plugin/skills/listing-draft/SKILL.md`), inget sparas
- [x] Design: köparens väg (e-postbekräftelse, kod utan konto, högst 2 svar åt gången per kategori, 48 h / 14 dagar) i PRD och ARKITEKTUR
- [x] Behovsutkast för köpare (`plugin/skills/need-draft/SKILL.md`) via `/market` → Köpare, inget sparas
- [ ] Använd behovsutkastet i de 10 intervjuerna med företagare
- [ ] Testa `/market` i Claude-chatten (claude.ai) och inte bara i Claude Code
- [x] Lokal marknadsplats (`.claude-plugin/marketplace.json`) så pluginen kan installeras med `claude plugin install ai-jobb@ai-jobb`
- [x] `claude plugin validate --strict` passerar för plugin och marknadsplats
- [x] Pluginen laddar med `--plugin-dir` (`claude plugin list`)
- [x] Git-repo initierat med första commit
- [x] Testa analysen själv på 2–3 nischer och justera SKILL.md (`tests/run-tests.ps1`: frisörer, tandläkare, mäklare på engelska)
- [x] Repo skapat på GitHub (`Brink-brink/Market`, privat) och kopplat som `origin`
- [x] Första push till GitHub (`git push -u origin main`)
- [ ] Bjud in testarna som collaborators och skicka testinstruktion
- [ ] 10 säljare testar analysen och annonsutkastet
- [ ] Beslut: licens (krävs av katalogen, `license` i plugin.json eller LICENSE-fil)
- [ ] Ikon 512–2048 px PNG (varning i katalogvalideringen)
- [ ] Eval-svit med `claude plugin eval` (källa per siffra, "hittade inget", språk, inga kreditpriser)

## Fas 2
- [x] Skelett för säljarwebbplatsen (`web/`, Next.js 16): start, skicka in annons, krediter, katalog, villkor, integritet, kontakt
- [x] Hela webbplatsen på engelska och svenska: delad startsida, köparsida, säljarsida, katalog med sök och filter, annonssidor, bygg vidare, vanliga frågor
- [x] AI-assistenter på webbplatsen (behov och annons) via Claude API, avstängda tills `ANTHROPIC_API_KEY` är satt
- [x] Omgjord design: sidan vänder sig till nya frilansare, med foton (nätverkstema), ikoner och korta texter på alla sidor
- [x] Annonser med acceptanskriterier, demo för köpare (exempelsamtal) och tillägg för uppsättning och utbildning: webbplatsen, annonsutkastet i pluginen, granskningsreglerna
- [ ] Testa annonsutkastet i pluginen med de nya fälten (`tests/run-market-tests.ps1 -Only listing`)
- [x] Levande demo i annonsen på webbplatsen: Claude spelar agenten för exempelannonserna (kräver `ANTHROPIC_API_KEY`), med exempelsamtal som reserv
- [x] Omgjord annonssida: omslagsbild, höjdpunkter, demo först, acceptanskriterier som kort, leveranssteg, prisruta med valbara tillägg
- [x] Testa den levande demon med en riktig API-nyckel
- [x] Levande fönster med kravrådgivare på köparsidan, i katalogen och på varje annons; detaljerna på annonssidan hopfällda
- [x] Samma kravrådgivning i pluginen (behovsutkastet): 13 krav, en fråga i taget, rekommenderad typ av agent och verktyg
- [ ] Matchning mot katalogen från pluginen och i ChatGPT via MCP-servern (fas 3)
- [ ] Fas 3: förmedling av demon till säljarens egen agent och verktyget `try_listing_demo`
- [ ] Testa assistenterna med en riktig API-nyckel, och sätt utgiftsgräns i Claude Console
- [ ] Delad spärr mot missbruk framför `/api/assist` innan sidan får trafik
- [ ] Ta bort exempelannonserna i `web/lib/listings.ts` vid lansering
- [ ] Beslut: pris för annonsassistenten efter lanseringen
- [ ] Tally-formulär för annonser och koppling i `web/.env.local`
- [ ] Publicera på Vercel och koppla domänen
- [ ] Landningssida för säljare: slutlig text när namn och pris är beslutade
- [ ] Stripe Payment Links för kreditpaket
- [ ] Formulär för köpare (fälten från behovsutkastet) med e-postbekräftelse och kod
- [ ] Manuellt: skicka förfrågan till säljare, mejla erbjudanden till köparen, mejla "Blev det affär?" efter 3–4 veckor
- [ ] Formulär för säljarnas annonser + manuell granskning enligt `GRANSKNING.md`
- [ ] Enkel katalog med godkända annonser på webbplatsen
- [ ] Kalkylark för manuell matchning och debitering

## Fas 3
- [ ] Repo-struktur (monorepo: `plugin/`, `server/`, `web/`)
- [ ] Postgres-schema + migrationer
- [ ] MCP-server: köparverktyg (inkl. `search_listings`, `get_listing`, `get_request_status`, `decline_offer`, `mark_no_deal`, `report_problem`)
- [ ] E-postbekräftelse av förfrågan och kod (hash, ny kod till samma e-post, rate limit)
- [ ] Spärr: högst 2 öppna svar per köpare och kategori i `accept_offer`
- [ ] MCP-server: säljarverktyg (inkl. `create_listing`, `update_listing`, `list_my_listings`, `get_demand_stats`)
- [ ] Debitering i transaktion vid `accept_offer`
- [ ] OAuth för säljare
- [ ] Webbplats: registrering (första godkända annonsen ersätter inträdestestet)
- [ ] Webbplats: katalog
- [ ] Admin: granskning av annonser med checklista och beslut
- [ ] Alias för säljare och kontaktfilter på all fritext (annonser, förfrågningar, erbjudanden) + tester
- [ ] Villkor: förbud mot att kringgå tjänsten
- [ ] Webbplats: Stripe-köp av krediter
- [ ] Webbplats: admin
- [ ] E-postaviseringar
- [ ] Integritetspolicy och villkor
- [ ] Tester för lead-livscykeln

## Fas 5 – Delägarskap och uppköp (`DELAGARSKAP.md`)
- [x] Design: bygga vidare, andelstabell, arbetslogg med bevis, uppköp med utlösen, alias mellan säljare
- [ ] Jurist: bidragsavtal, delägaravtal, köpeavtal, upphovsrätt och patent, moms vid delade intäkter
- [ ] Stripe Connect: konton med identitetskontroll, betalning av paket via tjänsten, utbetalning efter bekräftad leverans
- [ ] GitHub-app med läsbehörighet för arbetsloggen (bara metadata)
- [ ] Andelsbok, bidragsflöde och granskning av bidrag
- [ ] Uppköp: värderingsunderlag, escrow, överlämningschecklista
- [ ] Beslut: avgiftsnivåer (procent av uppköp och av intäkter)
- [ ] Förbered i fas 3: annonser hör till en produkt (`products`), inte direkt till en säljare

## Öppna frågor
- [x] Hur hämtar köparen erbjudanden utan konto? Beslut: kod i bekräftelsemejlet
- [ ] Senare: ska Claude säga till när köparen sannolikt inte behöver någon som bygger?
- [ ] Pris per lead
- [ ] Ansvarsbegränsning i villkoren
- [ ] Granskningskapacitet när säljarna blir många
