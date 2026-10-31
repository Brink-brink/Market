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
- [x] Lokal marknadsplats (`.claude-plugin/marketplace.json`) så pluginen kan installeras med `claude plugin install ai-jobb@ai-jobb`
- [x] `claude plugin validate --strict` passerar för plugin och marknadsplats
- [x] Pluginen laddar med `--plugin-dir` (`claude plugin list`)
- [x] Git-repo initierat med första commit
- [ ] Testa analysen själv på 2–3 nischer och justera SKILL.md
- [ ] Lägg repot på GitHub så testarna kan installera
- [ ] 10 säljare testar analysen
- [ ] Beslut: licens (krävs av katalogen, `license` i plugin.json eller LICENSE-fil)
- [ ] Ikon 512–2048 px PNG (varning i katalogvalideringen)
- [ ] Eval-svit med `claude plugin eval` (källa per siffra, "hittade inget", språk, inga kreditpriser)

## Fas 2
- [ ] Landningssida för säljare
- [ ] Stripe Payment Links för kreditpaket
- [ ] Formulär för köpare
- [ ] Kalkylark för manuell matchning och debitering

## Fas 3
- [ ] Repo-struktur (monorepo: `plugin/`, `server/`, `web/`)
- [ ] Postgres-schema + migrationer
- [ ] MCP-server: köparverktyg
- [ ] MCP-server: säljarverktyg
- [ ] Debitering i transaktion vid `accept_offer`
- [ ] OAuth för säljare
- [ ] Webbplats: registrering och inträdestest
- [ ] Webbplats: Stripe-köp av krediter
- [ ] Webbplats: admin
- [ ] E-postaviseringar
- [ ] Integritetspolicy och villkor
- [ ] Tester för lead-livscykeln

## Öppna frågor
- [ ] Hur hämtar köparen erbjudanden utan konto? (förslag: id + token + e-post)
- [ ] Pris per lead
- [ ] Ansvarsbegränsning i villkoren
