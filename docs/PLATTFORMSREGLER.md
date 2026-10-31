# Plattformsregler – checklista

Läst 2026-10-31. Läs källorna igen innan release; reglerna ändras.

Källor:
- Anthropic Software Directory Policy: https://support.claude.com/en/articles/13145358-anthropic-software-directory-policy
- Claude Connectors, inlämning: https://claude.com/docs/connectors/building/submission
- Claude plugin-katalogen: https://claude.com/docs/plugins/submit
- OpenAI plugin-riktlinjer: https://developers.openai.com/plugins/plugin-guidelines
- OpenAI Get Quote-spec: https://developers.openai.com/plugins/guides/local-services-request-quote-conversion-spec

## Gemensamt

- [ ] Inga annonser, sponsrat innehåll eller köpta placeringar
- [ ] Matchning styrs bara av relevans och kvalitet
- [ ] Bara nödvändig data samlas in; ingen chatthistorik
- [ ] Integritetspolicy publicerad och länkad
- [ ] Supportkontakt
- [ ] Testkonto med exempeldata till granskarna

## Anthropic (Claude)

- [ ] Inga pengaöverföringar eller transaktioner utan mänskligt godkännande
- [ ] Chattinnehåll används inte för att bygga användarprofiler
- [ ] Verktygsbeskrivningar är exakta och smala; inga dolda instruktioner
- [ ] Vi äger alla domäner och API:er pluginen anropar
- [ ] OAuth 2.0 för autentisering
- [ ] Alla verktyg har `title`, `readOnlyHint`, `destructiveHint`
- [ ] Streamable HTTP-transport
- [ ] Minst tre fungerande exempelpromptar
- [ ] Tool-namn ≤ 64 tecken
- [ ] Sparsam med tokens i svaren

## OpenAI (ChatGPT)

- [ ] Inga digitala varor, krediter eller prenumerationer säljs i pluginen, direkt eller indirekt
- [ ] Ingen länk till kassa, inga planer eller uppgraderingar visas
- [ ] Inga priser eller kampanjer i namn eller beskrivning
- [ ] Ingen nyregistrering krävs för att använda pluginen
- [ ] `readOnlyHint`, `destructiveHint`, `openWorldHint` satta explicit på alla verktyg
- [ ] Ingen exakt plats begärs
- [ ] Verifierat utvecklarkonto
- [ ] Fungerar på desktop och mobil
- [ ] Inga instruktioner som får modellen att föredra vår plugin

## Öppen fråga (måste besvaras före bygge)

Reglerna säger inte uttryckligen hur en plugin som förmedlar betalda leads bedöms. Mejla:
- Anthropic: mcp-review@anthropic.com
- OpenAI: via plugin-portalen

Beskriv: köparen är gratis, säljaren köper krediter på vår webbplats, ingen betalning eller placering i pluginen.
