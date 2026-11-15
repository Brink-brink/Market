import type { Locale } from "./i18n";

// Templates for writing an offer: a solved problem with measurable value.
// The website's listing flow and the plugin's listing-draft skill (via /api/offer-templates) both use these.
// Numbers are suggestions the seller changes; "{v}" in a criterion is replaced by its value.

type Localized = Record<Locale, string>;

export type Delivery = "skill" | "api" | "both";

export type ValueMeasure = {
  label: Localized;
  unit: Localized;
  today: number;
  after: number;
};

export type Criterion = {
  text: Localized;
  value: string;
};

export type Tier = {
  name: Localized;
  scope: Localized;
  // Criteria this tier adds on top of the shared ones. Every tier must work on its own.
  criteria: Criterion[];
  // Fixed price range in site.currency.
  price: [number, number];
};

export type OfferTemplate = {
  id: "erp-report" | "support-cases" | "quotes";
  name: Localized;
  pitch: Localized;
  title: Localized;
  problem: Localized;
  values: ValueMeasure[];
  criteria: Criterion[];
  delivery: Delivery;
  // AI cost per run in site.currency, measured in the seller's test. Only used when the solution runs via the API.
  costPerRun: number;
  runsPerMonth: number;
  hypercareRuns: number;
  hypercareUnit: Localized;
  tiers: Tier[];
};

export const offerTemplates: OfferTemplate[] = [
  {
    id: "erp-report",
    name: { en: "Weekly report from the business system", sv: "Veckorapport från affärssystemet" },
    pitch: {
      en: "Reads sales, invoices and orders and says what needs action this week.",
      sv: "Läser försäljning, fakturor och order och säger vad som behöver göras den här veckan.",
    },
    title: { en: "Weekly report: customers at risk of leaving", sv: "Veckorapport: kunder som håller på att tappa" },
    problem: {
      en: "Someone exports sales and invoices from the business system and goes through them by hand. It takes hours, and customers who are buying less or invoices that are overdue get missed.",
      sv: "Någon tar ut försäljning och fakturor ur affärssystemet och går igenom dem för hand. Det tar timmar, och kunder som köper mindre eller fakturor som är förfallna missas.",
    },
    values: [
      { label: { en: "Time spent", sv: "Tid som läggs" }, unit: { en: "hours/month", sv: "timmar/mån" }, today: 16, after: 1 },
      { label: { en: "Customers missed", sv: "Missade kunder" }, unit: { en: "per quarter", sv: "per kvartal" }, today: 5, after: 0 },
    ],
    criteria: [
      { text: { en: "The report arrives every Monday before {v}", sv: "Rapporten kommer varje måndag före kl. {v}" }, value: "08:00" },
      { text: { en: "It lists every customer buying {v} % less than last quarter", sv: "Den tar med alla kunder som köper {v} % mindre än förra kvartalet" }, value: "30" },
      { text: { en: "It takes under {v} minutes to read", sv: "Den tar under {v} minuter att läsa" }, value: "10" },
    ],
    delivery: "api",
    costPerRun: 0.4,
    runsPerMonth: 4,
    hypercareRuns: 4,
    hypercareUnit: { en: "reports in a row", sv: "rapporter i rad" },
    tiers: [
      { name: { en: "Report", sv: "Rapport" }, scope: { en: "One weekly report with one rule", sv: "En veckorapport med en regel" }, criteria: [], price: [600, 900] },
      {
        name: { en: "Report and actions", sv: "Rapport och åtgärder" },
        scope: { en: "Several rules and a suggested action per customer", sv: "Flera regler och ett förslag på åtgärd per kund" },
        criteria: [{ text: { en: "Every customer on the list has a suggested action", sv: "Varje kund på listan har ett förslag på åtgärd" }, value: "" }],
        price: [1100, 1600],
      },
      {
        name: { en: "With follow-up", sv: "Med uppföljning" },
        scope: { en: "Also a follow-up list that is ticked off in Claude", sv: "Dessutom en uppföljningslista som bockas av i Claude" },
        criteria: [{ text: { en: "Customers not followed up within {v} days show up again", sv: "Kunder som inte följts upp inom {v} dagar kommer tillbaka på listan" }, value: "7" }],
        price: [1800, 2600],
      },
    ],
  },
  {
    id: "support-cases",
    name: { en: "Support cases against the system", sv: "Supportärenden mot systemet" },
    pitch: {
      en: "Looks up the order, customer and delivery behind each case and suggests the cause and a reply.",
      sv: "Slår upp ordern, kunden och leveransen bakom varje ärende och föreslår orsak och svar.",
    },
    title: { en: "Support cases answered with the facts from the system", sv: "Supportärenden besvarade med fakta ur systemet" },
    problem: {
      en: "Every case means someone has to search the system for the order, the customer and the delivery before anyone can reply. Customers wait, and the same searches are made again and again.",
      sv: "Varje ärende kräver att någon letar i systemet efter ordern, kunden och leveransen innan man kan svara. Kunderna får vänta, och samma sökningar görs om och om igen.",
    },
    values: [
      { label: { en: "Time per case", sv: "Tid per ärende" }, unit: { en: "minutes", sv: "minuter" }, today: 20, after: 4 },
      { label: { en: "Time to reply", sv: "Tid till svar" }, unit: { en: "hours", sv: "timmar" }, today: 24, after: 2 },
    ],
    criteria: [
      { text: { en: "Finds the right order, customer and delivery in {v} of 10 test cases", sv: "Hittar rätt order, kund och leverans i {v} av 10 testärenden" }, value: "9" },
      { text: { en: "Suggests a cause and a reply within {v} minutes", sv: "Föreslår orsak och svar inom {v} minuter" }, value: "2" },
      { text: { en: "Never sends anything without a person approving it", sv: "Skickar aldrig något utan att en person godkänt det" }, value: "" },
    ],
    delivery: "skill",
    costPerRun: 0.12,
    runsPerMonth: 300,
    hypercareRuns: 20,
    hypercareUnit: { en: "cases in a row", sv: "ärenden i rad" },
    tiers: [
      { name: { en: "Look-up", sv: "Uppslag" }, scope: { en: "Looks up and summarises the case", sv: "Slår upp och sammanfattar ärendet" }, criteria: [], price: [500, 800] },
      {
        name: { en: "Cause and reply", sv: "Orsak och svar" },
        scope: { en: "Also suggests the cause and a reply", sv: "Föreslår också orsak och svar" },
        criteria: [{ text: { en: "The suggested reply is usable without changes in {v} of 10 test cases", sv: "Svarsförslaget går att använda utan ändringar i {v} av 10 testärenden" }, value: "7" }],
        price: [900, 1400],
      },
      {
        name: { en: "Draft in the inbox", sv: "Utkast i inkorgen" },
        scope: { en: "Also writes the reply as a draft in the mailbox", sv: "Skriver dessutom svaret som utkast i mejlen" },
        criteria: [{ text: { en: "The draft is in the mailbox within {v} minutes of the case arriving", sv: "Utkastet ligger i mejlen inom {v} minuter från att ärendet kom in" }, value: "5" }],
        price: [1500, 2200],
      },
    ],
  },
  {
    id: "quotes",
    name: { en: "Quotes from the price list", sv: "Offerter från prislistan" },
    pitch: {
      en: "Turns an enquiry into a quote draft from the price list that the owner only has to approve.",
      sv: "Gör en förfrågan till ett offertutkast från prislistan som ägaren bara behöver godkänna.",
    },
    title: { en: "Quote drafts the same day", sv: "Offertutkast samma dag" },
    problem: {
      en: "Enquiries are left waiting because writing a quote takes time. The quote goes out days later, and the customer has often already chosen someone else.",
      sv: "Förfrågningar blir liggande eftersom det tar tid att skriva offerten. Den går ut flera dagar senare, och kunden har ofta redan valt någon annan.",
    },
    values: [
      { label: { en: "Time per quote", sv: "Tid per offert" }, unit: { en: "minutes", sv: "minuter" }, today: 45, after: 5 },
      { label: { en: "Days to reply", sv: "Dagar till svar" }, unit: { en: "days", sv: "dagar" }, today: 3, after: 0 },
    ],
    criteria: [
      { text: { en: "The quote draft is ready within {v} minutes of the enquiry", sv: "Offertutkastet är klart inom {v} minuter från förfrågan" }, value: "10" },
      { text: { en: "Prices match the price list in {v} of 10 tests", sv: "Priserna stämmer med prislistan i {v} av 10 test" }, value: "10" },
      { text: { en: "The owner approves before anything is sent", sv: "Ägaren godkänner innan något skickas" }, value: "" },
    ],
    delivery: "skill",
    costPerRun: 0.1,
    runsPerMonth: 60,
    hypercareRuns: 10,
    hypercareUnit: { en: "quotes in a row", sv: "offerter i rad" },
    tiers: [
      { name: { en: "Draft", sv: "Utkast" }, scope: { en: "A quote draft from the price list", sv: "Ett offertutkast från prislistan" }, criteria: [], price: [400, 700] },
      {
        name: { en: "With stock", sv: "Med lager" },
        scope: { en: "Also checks what is in stock", sv: "Kollar också vad som finns i lager" },
        criteria: [{ text: { en: "Items out of stock are marked in {v} of 10 tests", sv: "Varor som saknas i lager är markerade i {v} av 10 test" }, value: "10" }],
        price: [800, 1200],
      },
      {
        name: { en: "With reminders", sv: "Med påminnelser" },
        scope: { en: "Also reminds about quotes that have had no answer", sv: "Påminner dessutom om offerter som inte fått svar" },
        criteria: [{ text: { en: "Quotes without an answer after {v} days get a reminder draft", sv: "Offerter utan svar efter {v} dagar får ett utkast till påminnelse" }, value: "3" }],
        price: [1200, 1800],
      },
    ],
  },
];

export const fillCriterion = (text: string, value: string) => text.replace("{v}", value || "…");

// A criterion can be checked only if it states a number, a time or a limit.
export const isMeasurable = (text: string) => /\d/.test(text) || /\b(aldrig|never|alltid|always|innan|before)\b/i.test(text);

// What /api/skill-to-offer returns after reading a seller's own skill or plugin.
export type SkillOffer = {
  found: Record<"name" | "does" | "steps" | "clients" | "tools" | "systems" | "services" | "keys" | "scripts", string>;
  templateId: OfferTemplate["id"] | "none";
  title: string;
  problem: string;
  criteria: string[];
  delivery: Delivery;
  hypercareUnit: string;
  notes: string[];
};
