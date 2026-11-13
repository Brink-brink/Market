# Delägarskap och uppköp av produkter

En **produkt** är ett agentpaket med en godkänd annons (`GRANSKNING.md`). Andra säljare kan bygga vidare på en produkt och bli delägare, och en produkt kan köpas upp av någon som vill fortsätta utveckla och sälja den.

Beslutat 2026-11-13. Bygger på att paketen betalas via tjänsten (se Betalning). Kräver juridisk hjälp innan lansering (se Juridik).

## Begrepp

| Begrepp | Betydelse |
| --- | --- |
| Ägare | Den som skapade produkten eller köpte upp den. Godkänner bidrag |
| Bidragsgivare | En säljare som bygger något på produkten |
| Bidrag | En avgränsad förbättring: en integration, ett språk, en ny funktion |
| Arbetslogg | Allt som är gjort på ett bidrag, med bevis. Kan bara läggas till, aldrig ändras |
| Andelsbok | Vem som äger hur stor del av produktens intäkter |

## Bygga vidare

1. Ägaren markerar produkten som **öppen för bidrag** och listar önskade bidrag, till exempel "SMS-påminnelser" eller "engelska".
2. En bidragsgivare föreslår ett bidrag: vad som byggs, storlek (S/M/L) och teknisk nivå (enkel/medel/avancerad). Tjänsten visar föreslagen andel enligt tabellen nedan.
3. Ägaren godkänner förslaget. Ett **bidragsavtal** skrivs under av båda (se Juridik).
4. Bidragsgivaren bygger. Arbetet loggas med bevis (se Arbetslogg).
5. Bidragsgivaren anmäler bidraget som klart. Granskaren kontrollerar bevisen och demon, som i `GRANSKNING.md`.
6. Ägaren godkänner leveransen. Andelen förs in i andelsboken och gäller från nästa försäljning.

### Föreslagen andel

Andel av produktens intäkter efter tjänstens avgift. Utgångspunkt som går att justera inom ±50 % om båda är överens och granskaren godkänner motiveringen.

| Storlek \ Nivå | Enkel | Medel | Avancerad |
| --- | --- | --- | --- |
| **S** (några dagar) | 2 % | 3 % | 5 % |
| **M** (1–2 veckor) | 5 % | 8 % | 12 % |
| **L** (flera veckor) | 10 % | 15 % | 20 % |

Siffrorna är ett första förslag och ska testas. Nya andelar tas proportionellt från alla befintliga ägare.

## Arbetslogg

Varje bidrag har en arbetslogg som visar vad som faktiskt är gjort. Den används för granskningen, vid tvist och som underlag vid uppköp.

| Bevis | Hur | Styrka |
| --- | --- | --- |
| **Ändringar i koden** | Produktens repo kopplas till tjänsten med läsbehörighet (GitHub-app). Vi loggar metadata: commits, pull requests, antal ändrade rader och filer, datum och vem. Vi sparar och kör aldrig koden | Stark: går inte att efterkonstruera |
| **Demo före och efter** | Video eller testlänk som visar skillnaden | Stark |
| **Testscenarier** | Minst 3 scenarier med förväntat och faktiskt resultat, körs av granskaren | Stark |
| **Beskrivning** | Vad som byggdes, vilka tjänster som lagts till, ändrad datahantering | Behövs, men är bara påstående |
| **Tid** | Självrapporterade timmar | Svag, bara som stöd |

Regler:
- Loggen kan bara läggas till, aldrig ändras eller raderas. Varje post har tidsstämpel och kontrollsumma.
- Kodmängd används som stöd, aldrig som formel. Fler rader betyder inte mer värde.
- Både ägare och bidragsgivare ser hela loggen för sitt bidrag.

## Uppköp

1. Ägaren sätter produkten **till salu** med ett pris. Annonsen visas under alias.
2. Tjänsten tar fram ett **värderingsunderlag** från verifierad data: sålda paket, intäkter via tjänsten, månadsintäkter, omdömen, arbetsloggar. Claude kan hjälpa till att tolka det men sätter inte priset.
3. En köpare lägger ett bud. Efter accepterat bud betalar köparen till ett **spärrat konto** (escrow). Först då får köparen se koden och detaljerna (due diligence), och parternas namn lämnas ut för avtalet.
4. **Överlämning** enligt checklista: repot överförs, demo, konton hos röstplattform och språkmodell (köparen skaffar egna nycklar), dokumentation, och kundavtal och personuppgiftsbiträdesavtal flyttas med kundernas medgivande.
5. Köparen bekräftar överlämningen, eller så går en tidsgräns ut utan invändning. Då betalas pengarna ut:
   1. tjänstens avgift
   2. bidragsgivarna **löses ut** med sin andel av köpeskillingen
   3. resten till ägaren
6. Köparen blir ensam ägare. Andelsboken börjar om.

## Kontakt mellan säljare

Samma princip som mellan köpare och säljare: **alias** tills ett avtal skrivs.

- Förslag, frågor och arbetslogg går genom tjänsten under alias, med kontaktfiltret på all fritext.
- Riktiga namn lämnas ut när bidragsavtalet ska skrivas under, eller när köparen vid uppköp har betalat till det spärrade kontot. Avtalen kräver riktiga parter.

## Betalning

Paket för produkter med delägare, och alla uppköp, betalas **via tjänsten** på webbplatsen (Stripe Connect). Aldrig i pluginen.

- Varje ägare och bidragsgivare har ett Stripe Connect-konto med identitetskontroll.
- Köparen betalar paketet på webbplatsen. Pengarna hålls tills köparen bekräftat leveransen eller en tidsgräns gått ut. Sedan delas de automatiskt enligt andelsboken, som alla parter har godkänt.
- Ingen överföring sker utan att en människa godkänt den: köparen godkänner betalningen och leveransen, ägare och bidragsgivare har godkänt andelarna.

## Tjänstens intäkter

- En procent av köpeskillingen vid uppköp.
- En procent av intäkterna från produkter som betalas via tjänsten.
- Nivåerna är inte bestämda.

## Juridik

Kräver jurist innan lansering:

- **Upphovsrätt:** bidragsavtalet ska reglera vem som äger koden i bidraget. Förslag: rätten överlåts till produkten (ägaren), mot andelen.
- **Patent:** programvara som sådan är i regel inte patenterbar i Sverige och EU. Skyddet är främst upphovsrätt, avtal och varumärke. Juristen bedömer om något i en produkt kan patenteras och vem som i så fall äger det.
- **Delägaravtal:** vad andelen ger rätt till (intäkter, inte beslut), vad som händer vid uppköp, om ägaren slutar, eller vid tvist.
- **Överlåtelse vid uppköp:** köpeavtal, överföring av kundavtal och personuppgiftsbiträdesavtal.
- **Moms och skatt** när intäkter delas mellan flera säljare.
- **Ingen investering:** bara den som faktiskt bidrar med arbete får andelar. Andelar säljs aldrig separat till passiva investerare, eftersom det kan räknas som finansiella instrument.

## Öppna frågor

- Ska alla paket betalas via tjänsten, eller bara produkter med delägare? Ersätter avgiften på intäkter då leadavgiften för de produkterna?
- Hur stor andel får bidragsgivare ha totalt? Ska ägaren alltid ha majoritet?
- Vad händer om ägaren slutar underhålla produkten?
- Hur länge gäller en andel om bidraget senare byggs om?
