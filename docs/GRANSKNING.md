# Granskning av annonser

En säljares första godkända annons ersätter inträdestestet. Granskningen ska visa att säljaren kan leverera det annonsen lovar, att annonsen är ärlig och att köparens data hanteras rimligt.

## Vad säljaren skickar in

| Fält | Krav |
| --- | --- |
| Nisch | Kundtyp + agenttyp, t.ex. "bokningsagent för frisörer" |
| Paketnamn och innehåll | Konkreta leveranser: vad byggs, vilka integrationer, hur lång support |
| Pris | Fast intervall för uppstart, plus månadsavgift om det finns. Aldrig "offert" eller "från" |
| Leveranstid | I arbetsdagar |
| Bevistyp | **Prototyp** eller **I drift** |
| Demo | Prototyp: testlänk eller video (max 5 min). I drift: testlänk eller testnummer, plus en kort beskrivning av en verklig installation |
| Testinstruktioner | Minst 3 scenarier granskaren ska prova, med förväntat resultat |
| Datahantering | Vilka uppgifter agenten hanterar, var de lagras (land), vilka tjänster som används (t.ex. röstplattform, språkmodell) |

Vi tar inte emot kod och kör aldrig säljarens kod. Allt granskas via säljarens egen demo.

Demon, testinstruktionerna och den fullständiga datahanteringen ses bara av granskaren. Köparen ser aldrig demolänken, testnumret eller videon, bara att demon är granskad och när.

## Steg 1: Automatisk förkontroll

Görs innan annonsen hamnar hos en granskare. Fel här skickas direkt tillbaka till säljaren.

- Alla fält ovan är ifyllda.
- Priset är ett fast intervall med siffror.
- Det köparen ser i annonsen innehåller inget som gör det möjligt att hitta eller kontakta säljaren: inget namn, företagsnamn, varumärke, e-post, telefonnummer, webbadress eller konto i sociala medier. Kontakt lämnas ut först när leadet är betalt.
- Demolänken svarar.
- Inga påståenden som "GDPR-certifierad", "100 % säker" eller "garanterad ökning" utan belägg.

## Steg 2: Manuell granskning

Görs av admin (Philip) i fas 2–3. Mål: beslut inom 3 arbetsdagar.

### A. Demon fungerar

1. Kör säljarens 3 scenarier. Stämmer resultatet med det förväntade?
2. Kör 2 egna scenarier:
   - en fråga utanför agentens område (svarar den ärligt att den inte kan, eller hittar den på?)
   - en begäran agenten inte ska utföra (t.ex. lämna ut en annan kunds bokning)
3. För röstagenter: ring testnumret. Förstår agenten svenska med normal talhastighet?

### B. Annonsen stämmer med demon

- Varje funktion i paketbeskrivningen syns i demon, eller är tydligt markerad som "byggs vid leverans".
- Integrationer som utlovas (t.ex. "bokar direkt i Bokadirekt") visas i demon eller är markerade som ej demonstrerade.
- Bevistypen stämmer: "I drift" kräver att agenten används av en verklig kund.

### C. Data och risk

- Säljaren har beskrivit vilka uppgifter agenten hanterar och var de lagras.
- Nischer med känsliga uppgifter (vård, tandvård, ekonomi, barn) kräver dessutom att säljaren beskriver hur hälsouppgifter eller motsvarande undviks eller skyddas. Saknas det: begär ändringar.
- Agenten utger sig inte för att vara människa när någon frågar.

### D. Pris och villkor

- Fast prisintervall, rimligt beskrivet. Vi sätter inte säljarens pris och avslår inte för högt eller lågt pris; vi kräver bara att det är tydligt.

## Beslut

| Beslut | När | Vad säljaren får |
| --- | --- | --- |
| **Godkänd** | A–D uppfyllda | Annonsen syns i katalogen och matchningen under säljarens alias, med märket Prototyp eller I drift och "demo granskad <datum>" |
| **Ändringar begärs** | Något i A–D saknas men går att rätta | En lista med det som ska rättas. Säljaren skickar in igen |
| **Avslagen** | Demon fungerar inte alls, annonsen är vilseledande, eller nischen är olämplig | Motivering. Säljaren kan skicka in en ny annons |

Varje beslut sparas med checklistan (A–D) och en kommentar, så att det går att förklara i efterhand.

## Efter godkännande

- Väsentliga ändringar av annonsen (innehåll, pris, bevistyp, demo) granskas igen. Under tiden visas den godkända versionen.
- En annons kan **pausas** vid försök att kringgå tjänsten (kontakt före betalt lead), klagomål från köpare, lågt snittbetyg (under 3 av 5 efter minst 3 omdömen) eller en demo som slutat fungera. Säljaren får motivering och kan rätta.
- Granskningen påverkar aldrig rankningen genom betalning. Ingen kan betala för snabbare eller mildare granskning.
