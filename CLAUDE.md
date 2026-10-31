# CLAUDE.md – AI-jobb-plugin

Läs detta först i varje session. Det beskriver vad projektet är, vilka regler som inte får brytas och var detaljerna finns.

## Vad vi bygger

En plugin för Claude och ChatGPT som matchar **köpare** (småföretag, senare privatpersoner) med **säljare** (personer som vill ha ett extrajobb och bygger AI-agenter med Claude eller ChatGPT).

- Köparen beskriver sitt behov i chatten, gratis.
- Säljaren får en marknadsanalys av sin nisch och matchade förfrågningar.
- Intäkten kommer från **Thumbtack-modellen**: säljaren betalar per lead, och debiteras först när köparen har svarat på säljarens erbjudande.

Detaljer: `docs/PRD.md`. Bakgrund och marknadsanalys: `docs/MARKNADSANALYS.md`.

## Regler som aldrig får brytas

Dessa kommer från Anthropics och OpenAIs regler för plugins. Bryts de avslås pluginen vid granskning. Full lista: `docs/PLATTFORMSREGLER.md`.

1. **Inget köp i pluginen.** Krediter säljs bara på vår webbplats. Pluginen visar aldrig priser på krediter, länkar aldrig till kassan och uppmanar aldrig till köp.
2. **Ingen köpt placering.** Matchning, katalogens ordning och rankning styrs bara av relevans och kvalitet, aldrig av betalning. Granskningen av annonser kan inte heller påverkas med betalning.
3. **Inga profiler från chattar.** Spara bara det köparen själv skickar in i en förfrågan, efter att köparen godkänt den. Begär aldrig chatthistorik.
4. **Köparen ska inte behöva skapa konto** för att använda pluginen.
5. **Kontaktuppgifter lämnas ut först när leadet är betalt** (köparen har svarat på ett erbjudande). Innan dess får katalog, annonser, förfrågningar och erbjudanden aldrig innehålla något som gör det möjligt att hitta eller kontakta den andra parten: inget namn, företagsnamn, e-post, telefon, webbplats, länk eller konto i sociala medier. Säljare visas under ett alias. Säljarens demo ses bara av granskaren.
6. **Inga automatiska pengaöverföringar** utan att en människa godkänner.
7. Varje MCP-verktyg har `title`, `readOnlyHint`, `destructiveHint` och `openWorldHint` satta korrekt.

## Arbetssätt

- Kod, identifierare och commit-meddelanden på engelska. Dokumentation och UI-text på svenska tills vidare.
- Bygg i den ordning som står i `docs/PLAN.md`. Hoppa inte till matchning innan fas 0 och 1 är klara.
- Uppdatera `docs/TASKS.md` när en uppgift blir klar eller tillkommer.
- Gissa inte om plattformsregler eller API:er. Läs aktuell dokumentation (länkar i `docs/PLATTFORMSREGLER.md`) innan du implementerar något som rör dem.
- Validera plugin-strukturen med `claude plugin validate` innan en release.

## Teknikstack (förslag, ändra i `docs/ARKITEKTUR.md` om vi byter)

- TypeScript överallt
- MCP-server: officiella `@modelcontextprotocol/sdk`, Streamable HTTP, OAuth 2.0
- Webbapp (säljarportal + krediter): Next.js
- Databas: Postgres
- Betalning: Stripe (bara på webbplatsen)

## Var saker finns

| Fil | Innehåll |
| --- | --- |
| `docs/PRD.md` | Användare, flöden, funktioner, vad som inte ingår |
| `docs/ARKITEKTUR.md` | Komponenter, datamodell, lead-livscykel, MCP-verktyg |
| `docs/PLATTFORMSREGLER.md` | Checklista mot Anthropic och OpenAI |
| `docs/GRANSKNING.md` | Hur säljarnas annonser granskas |
| `docs/PLAN.md` | Faser från validering till lansering |
| `docs/TASKS.md` | Backlog |
| `docs/MARKNADSANALYS.md` | Sammanfattning av marknadsanalysen |
