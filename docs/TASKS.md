# Tasks

Uppdatera när något blir klart eller tillkommer.

## Fas 0
- [ ] Mejla Anthropic (mcp-review@anthropic.com) om lead-modellen
- [ ] Fråga OpenAI via plugin-portalen om lead-modellen
- [ ] Beslut: startbransch (frisörer/skönhet eller tandvård?)
- [ ] Beslut: 3 paket med prisintervall
- [ ] 10 intervjuer med företagare
- [ ] 10 intervjuer med blivande säljare (Skool-communities)
- [ ] Beslut: arbetsnamn och domän

## Fas 1
- [x] Skriv SKILL.md för marknadsanalys (`plugin/skills/market-analysis/SKILL.md`)
- [x] Skapa plugin-skelett (`plugin/.claude-plugin/plugin.json`, `plugin/README.md`)
- [x] Ingångskommandot `/market` som frågar köpare/säljare (`plugin/skills/market/SKILL.md`)
- [x] Design: säljarmeny, annonser, katalog för köpare, granskning (`docs/GRANSKNING.md`, PRD, ARKITEKTUR)
- [x] Säljarmeny i `/market` och annonsutkast (`plugin/skills/listing-draft/SKILL.md`), inget sparas
- [ ] Testa `/market` i Claude-chatten (claude.ai) och inte bara i Claude Code
- [x] Lokal marknadsplats (`.claude-plugin/marketplace.json`) så pluginen kan installeras med `claude plugin install ai-jobb@ai-jobb`
- [x] `claude plugin validate --strict` passerar för plugin och marknadsplats
- [x] Pluginen laddar med `--plugin-dir` (`claude plugin list`)
- [x] Git-repo initierat med första commit
- [x] Testa analysen själv på 2–3 nischer och justera SKILL.md (`tests/run-tests.ps1`: frisörer, tandläkare, mäklare på engelska)
- [x] Repo skapat på GitHub (`Brink-brink/Market`, privat) och kopplat som `origin`
- [ ] Första push till GitHub (`git push -u origin main`, kräver inloggning i webbläsaren)
- [ ] Bjud in testarna som collaborators och skicka testinstruktion
- [ ] 10 säljare testar analysen och annonsutkastet
- [ ] Beslut: licens (krävs av katalogen, `license` i plugin.json eller LICENSE-fil)
- [ ] Ikon 512–2048 px PNG (varning i katalogvalideringen)
- [ ] Eval-svit med `claude plugin eval` (källa per siffra, "hittade inget", språk, inga kreditpriser)

## Fas 2
- [ ] Landningssida för säljare
- [ ] Stripe Payment Links för kreditpaket
- [ ] Formulär för köpare
- [ ] Formulär för säljarnas annonser + manuell granskning enligt `GRANSKNING.md`
- [ ] Enkel katalog med godkända annonser på webbplatsen
- [ ] Kalkylark för manuell matchning och debitering

## Fas 3
- [ ] Repo-struktur (monorepo: `plugin/`, `server/`, `web/`)
- [ ] Postgres-schema + migrationer
- [ ] MCP-server: köparverktyg (inkl. `search_listings`, `get_listing`)
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

## Öppna frågor
- [ ] Hur hämtar köparen erbjudanden utan konto? (förslag: id + token + e-post)
- [ ] Pris per lead
- [ ] Ansvarsbegränsning i villkoren
- [ ] Granskningskapacitet när säljarna blir många
