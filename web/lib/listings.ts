import type { Dict, Locale } from "./i18n";

// Approved listings shown in the catalog. Phase 2: added by hand after review (docs/GRANSKNING.md).
// Only catalog fields belong here: never a name, company, e-mail, phone, website, link or demo URL.
type Localized = Record<Locale, string>;

export type CatalogListing = {
  id: string;
  alias: string;
  industry: keyof Dict["industries"];
  agentType: keyof Dict["agentTypes"];
  title: Localized;
  summary: Localized;
  includes: Localized[];
  notIncluded: Localized[];
  dataHandling: Localized;
  // Prices in site.currency.
  setupPrice: [number, number];
  monthlyPrice: [number, number] | null;
  deliveryDays: number;
  proofType: "prototype" | "live";
  reviewedOn: string; // YYYY-MM-DD
  ratingAvg: number | null;
  ratingCount: number;
  // Example listings show how the catalog looks before real listings exist. Remove them at launch.
  example: boolean;
};

export const listings: CatalogListing[] = [
  {
    id: "booking-hair-a7",
    alias: "Freelancer A7",
    industry: "hair",
    agentType: "phone",
    title: {
      en: "Phone agent that books appointments for hair salons",
      sv: "Telefonagent som bokar tider åt frisörsalonger",
    },
    summary: {
      en: "Answers when you are with a customer and books straight into your booking system.",
      sv: "Svarar när du står med en kund och bokar direkt i ditt bokningssystem.",
    },
    includes: [
      { en: "Answers calls in Swedish and English", sv: "Svarar på svenska och engelska" },
      { en: "Books, rebooks and cancels in your booking system", sv: "Bokar, bokar om och avbokar i ditt bokningssystem" },
      { en: "Sends you a text message when it cannot help", sv: "Skickar ett sms till dig när den inte kan hjälpa till" },
      { en: "Three months of support", sv: "Tre månaders support" },
    ],
    notIncluded: [
      { en: "Payments over the phone", sv: "Betalning per telefon" },
    ],
    dataHandling: {
      en: "Handles name and phone number for bookings. Stored in the EU.",
      sv: "Hanterar namn och telefonnummer för bokningar. Lagras inom EU.",
    },
    setupPrice: [1400, 2300],
    monthlyPrice: [80, 100],
    deliveryDays: 10,
    proofType: "live",
    reviewedOn: "2026-11-02",
    ratingAvg: 4.7,
    ratingCount: 6,
    example: true,
  },
  {
    id: "chatbot-dental-k2",
    alias: "Freelancer K2",
    industry: "dental",
    agentType: "chatbot",
    title: {
      en: "Website chatbot for dental clinics",
      sv: "Chattbot på hemsidan för tandvårdskliniker",
    },
    summary: {
      en: "Answers questions about opening hours, prices and preparation, and refers urgent cases to the phone.",
      sv: "Svarar på frågor om öppettider, priser och förberedelser, och hänvisar akuta fall till telefon.",
    },
    includes: [
      { en: "Answers from your own price list and opening hours", sv: "Svarar utifrån din egen prislista och dina öppettider" },
      { en: "Refers urgent cases to the phone", sv: "Hänvisar akuta fall till telefon" },
      { en: "One month of support", sv: "En månads support" },
    ],
    notIncluded: [
      { en: "Booking appointments (built at delivery on request)", sv: "Tidsbokning (byggs vid leverans på begäran)" },
    ],
    dataHandling: {
      en: "Stores no personal data and asks patients not to share health information in the chat.",
      sv: "Sparar inga personuppgifter och ber patienter att inte dela hälsouppgifter i chatten.",
    },
    setupPrice: [450, 750],
    monthlyPrice: null,
    deliveryDays: 5,
    proofType: "live",
    reviewedOn: "2026-10-28",
    ratingAvg: 4.4,
    ratingCount: 3,
    example: true,
  },
  {
    id: "reviews-restaurant-m4",
    alias: "Freelancer M4",
    industry: "restaurant",
    agentType: "reviews",
    title: {
      en: "Review agent for restaurants",
      sv: "Recensionsagent för restauranger",
    },
    summary: {
      en: "Asks guests for a review the day after their visit and alerts you to unhappy ones first.",
      sv: "Ber gäster om ett omdöme dagen efter besöket och varnar dig först om missnöjda gäster.",
    },
    includes: [
      { en: "Message to guests the day after a booking", sv: "Meddelande till gäster dagen efter en bokning" },
      { en: "Unhappy guests go to you, not to the review site", sv: "Missnöjda gäster går till dig, inte till recensionssajten" },
      { en: "Monthly summary", sv: "Månadssammanfattning" },
    ],
    notIncluded: [
      { en: "Replies to public reviews", sv: "Svar på offentliga omdömen" },
    ],
    dataHandling: {
      en: "Uses the guest's phone number from the booking. Stored in the EU and deleted after 30 days.",
      sv: "Använder gästens telefonnummer från bokningen. Lagras inom EU och raderas efter 30 dagar.",
    },
    setupPrice: [300, 600],
    monthlyPrice: [30, 50],
    deliveryDays: 7,
    proofType: "prototype",
    reviewedOn: "2026-11-05",
    ratingAvg: null,
    ratingCount: 0,
    example: true,
  },
  {
    id: "booking-trades-r9",
    alias: "Freelancer R9",
    industry: "trades",
    agentType: "booking",
    title: {
      en: "Booking agent for plumbers and electricians",
      sv: "Bokningsagent för rörmokare och elektriker",
    },
    summary: {
      en: "Takes job requests from your website, asks the right follow-up questions and books a visit.",
      sv: "Tar emot jobbförfrågningar från hemsidan, ställer rätt följdfrågor och bokar ett besök.",
    },
    includes: [
      { en: "Request form with follow-up questions", sv: "Förfrågningsformulär med följdfrågor" },
      { en: "Books visits in your calendar", sv: "Bokar besök i din kalender" },
      { en: "Reminder to the customer the day before", sv: "Påminnelse till kunden dagen innan" },
      { en: "Two months of support", sv: "Två månaders support" },
    ],
    notIncluded: [
      { en: "Quotes and invoicing", sv: "Offerter och fakturering" },
    ],
    dataHandling: {
      en: "Handles name, address and phone number for the visit. Stored in the EU.",
      sv: "Hanterar namn, adress och telefonnummer för besöket. Lagras inom EU.",
    },
    setupPrice: [900, 1600],
    monthlyPrice: [40, 60],
    deliveryDays: 8,
    proofType: "prototype",
    reviewedOn: "2026-11-09",
    ratingAvg: null,
    ratingCount: 0,
    example: true,
  },
];

export const getListing = (id: string) => listings.find((l) => l.id === id);
