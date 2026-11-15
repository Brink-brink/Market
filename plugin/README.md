# AI-jobb

Plugin för dig som bygger AI-lösningar som löser ett konkret problem för företag, och för företag som behöver en. Det som säljs är ett löst problem med mätbart värde; skillen, pluginen eller API-lösningen är leveransformen.

## Vad pluginen gör

Skillen `market-analysis` tar ett problem hos företag, till exempel "supportärenden som kräver sökning i affärssystemet", och söker på webben efter:

- **Hur vanligt** – hur många företag har problemet, och hur ofta kommer uppgiften?
- **Vad det kostar i dag** – tid, fel och förseningar, och timkostnaden för den som gör jobbet
- **Vad som löser det nu** – inbyggda funktioner, SaaS, konsulter, och till vilket pris

Utifrån det räknar den ut **värdet för ett företag**, föreslår **mätbara acceptanskriterier, leveransform och ett pris** förankrat i värdet, och bedömer om det är **värt att lösa**. Den säger vilken mall som passar för erbjudandet.

Skillen `listing-draft` hjälper dig skriva ett **erbjudande** steg för steg från en mall (veckorapport från affärssystemet, supportärenden eller offerter): kundens problem och värdet i siffror, mätbara acceptanskriterier som du får betalt på, leveransform (skill i kundens AI, API eller båda), AI-kostnaden i pengar med tak, hypercare tills ett antal körningar i rad fungerar, och upp till tre prisnivåer. Mallarna hämtas från webbplatsen, där samma steg finns på annonssidan. Den kontrollerar utkastet mot granskningen. Inget sparas eller skickas än.

Skillen `need-draft` hjälper dig som företagare hitta rätt AI-agent. Den ställer en kravfråga i taget (verksamhet, problem, vad agenten ska göra, kanal, budget, nuvarande system, volym, språk, tider, vad som händer när agenten inte kan hjälpa, känsliga uppgifter, när och område), säger vilken sorts agent och vilka verktyg som passar, hämtar katalogen från webbplatsen och ger flera alternativ i olika prislägen med 1–5 stjärnor för hur väl de möter dina krav. Alternativen öppnas i webbläsaren. Du kan be Claude spela en agent för att prova den. Till sist skrivs ett **behovsutkast** som säljare kan sätta fast pris på. Inga kontaktuppgifter tas med, och inget sparas eller skickas än. Från en annons på webbplatsen startar du den med `/ai-jobb:need-draft <annonsens id>`.

I värdeanalysen får varje siffra en källa. När skillen inte hittar något skriver den "hittade inget" i stället för att gissa. Svaret kommer på samma språk som du skriver på.

## Användning

I Claude Code, skriv:

```
/market
```

Claude frågar om du är köpare eller säljare. Som säljare får du veta hur det fungerar (löst problem med mätbart värde, betalt när acceptanskriterierna håller, sedan hypercare) och väljer att hitta ett problem värt att lösa, skapa ett erbjudande från en mall, se köparnas intresse eller se dina erbjudanden; i dag fungerar värdeanalysen och erbjudandet. Som köpare får du hjälp att hitta rätt agent: Claude frågar om dina krav och öppnar annonserna som passar i webbläsaren, eller öppnar hela katalogen. Att begära erbjudanden är inte öppet än, och inget sparas. Fungerar inte `/market` (om ett annat kommando har samma namn) skriver du `/ai-jobb:market`.

Du kan också gå direkt till analysen:

```
/ai-jobb:market-analysis supportärenden som kräver sökning i affärssystemet
```

Installera från GitHub (kräver Claude Code 2.1.275 eller senare, och att du har åtkomst till repot medan det är privat):

```
/plugin install ai-jobb --marketplace Brink-brink/Market
```

Eller i två steg från terminalen:

```
claude plugin marketplace add Brink-brink/Market
claude plugin install ai-jobb@ai-jobb
```

Installera lokalt från repots marknadsplats (kör från mappen `ai-jobb-plugin`):

```
claude plugin marketplace add ./
claude plugin install ai-jobb@ai-jobb
```

Du kan också fråga med egna ord, till exempel "Lönar det sig att bygga AI-receptionister åt tandläkare?". Claude använder då skillen automatiskt.

## Vad pluginen kör och skickar

Pluginen innehåller bara instruktioner (skills). Den har ingen egen server, inga skript och ingen MCP-koppling. Den använder Claudes inbyggda webbsökning (`WebSearch`) och sidhämtning (`WebFetch`). Sökfrågorna bygger på problemet du anger. För att räkna om priser i utländsk valuta till kronor hämtar den dagens kurs från Riksbankens öppna API (`api.riksbank.se`). Pluginen sparar ingenting och skickar inga data någon annanstans.
