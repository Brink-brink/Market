# AI-jobb

Plugin för dig som vill tjäna extra på att bygga AI-agenter åt småföretag. Status: fas 1 – marknadsanalysen som skill.

## Vad pluginen gör

Skillen `market-analysis` tar en nisch, till exempel "bokningsagent för frisörer", och söker på webben efter:

- **Efterfrågan** – finns det företag som behöver det här, och hur stort är behovet?
- **Prisnivåer** – vad tar andra betalt för liknande uppdrag?
- **Konkurrenter** – vilka säljer redan något liknande, och till vilket pris?

Utifrån det föreslår den **tre paket med fast prisintervall** och bedömer om nischen **passar en nybörjare**.

Varje siffra får en källa. När skillen inte hittar något skriver den "hittade inget" i stället för att gissa. Svaret kommer på samma språk som du skriver på.

## Användning

I Claude Code:

```
/ai-jobb:market-analysis bokningsagent för frisörer
```

Installera lokalt från repots marknadsplats (kör från mappen `ai-jobb-plugin`):

```
claude plugin marketplace add ./
claude plugin install ai-jobb@ai-jobb
```

Du kan också fråga med egna ord, till exempel "Lönar det sig att bygga AI-receptionister åt tandläkare?". Claude använder då skillen automatiskt.

## Vad pluginen kör och skickar

Pluginen innehåller bara instruktioner (en skill). Den har ingen egen server, inga skript och ingen MCP-koppling. Den använder Claudes inbyggda webbsökning (`WebSearch`) och sidhämtning (`WebFetch`). Sökfrågorna bygger på nischen du anger. För att räkna om priser i utländsk valuta till kronor hämtar den dagens kurs från Riksbankens öppna API (`api.riksbank.se`). Pluginen sparar ingenting och skickar inga data någon annanstans.
