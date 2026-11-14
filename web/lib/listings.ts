import type { Dict, Locale } from "./i18n";

// Approved listings shown in the catalog. Phase 2: added by hand after review (docs/GRANSKNING.md).
// Only catalog fields belong here: never a name, company, e-mail, phone, website, link or demo URL.
type Localized = Record<Locale, string>;

export type DemoTurn = { from: "customer" | "agent"; text: Localized };

export type ListingExtra = {
  kind: "setup" | "training";
  text: Localized;
  // Price in site.currency.
  price: number;
};

export type CatalogListing = {
  id: string;
  alias: string;
  industry: keyof Dict["industries"];
  agentType: keyof Dict["agentTypes"];
  title: Localized;
  summary: Localized;
  includes: Localized[];
  notIncluded: Localized[];
  // What must work for the delivery to count as done. The buyer checks these before approving.
  acceptance: Localized[];
  // Cover image in public/img.
  cover: string;
  // A sample conversation shown to buyers when the live demo is off. No names, links or contact details.
  demo: DemoTurn[];
  // The live demo buyers can try. It runs through the service, never against the freelancer's own address.
  liveDemo: {
    greeting: Localized;
    // Things a visitor can click to say first.
    prompts: Localized[];
    // The made-up business the demo agent works for. Written for the model, in English.
    facts: string;
  };
  // Optional help the freelancer offers on top of the package.
  extras: ListingExtra[];
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
    cover: "/img/cover-hair.webp",
    liveDemo: {
      greeting: {"en":"Hello, you've reached the salon. How can I help you?","sv":"Hej, du har kommit till salongen. Vad kan jag hjälpa dig med?"},
      prompts: [{"en":"I'd like a haircut on Thursday","sv":"Jag vill klippa mig på torsdag"},{"en":"What does a colouring cost?","sv":"Vad kostar en färgning?"},{"en":"I need to cancel my appointment","sv":"Jag behöver avboka min tid"}],
      facts: "A made-up hair salon. Open Tuesday to Saturday 9-18. Services: haircut 30 minutes 35 euros, colouring 90 minutes 95 euros, beard trim 15 minutes 15 euros. Free times this week: Thursday 14:30, Thursday 16:00, Friday 10:00, Saturday 11:30. A booking needs a first name; the visitor may give a made-up one. Cancelling and rebooking are allowed. Anything else is passed to staff by text message.",
    },
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
    notIncluded: [{ en: "Payments over the phone", sv: "Betalning per telefon" }],
    acceptance: [
      { en: "A caller can book, rebook and cancel without help from staff", sv: "En kund kan boka, boka om och avboka utan hjälp av personal" },
      { en: "The booking shows in your booking system within one minute", sv: "Bokningen syns i ditt bokningssystem inom en minut" },
      { en: "The agent handles a call in Swedish and a call in English", sv: "Agenten klarar ett samtal på svenska och ett på engelska" },
      { en: "When it cannot help, you get a text message with the caller's question", sv: "När den inte kan hjälpa till får du ett sms med kundens fråga" },
      { en: "It says it is an AI assistant when a caller asks", sv: "Den säger att den är en AI-assistent när en kund frågar" },
    ],
    demo: [
      { from: "customer", text: { en: "Hi, I'd like a haircut on Thursday afternoon.", sv: "Hej, jag skulle vilja klippa mig på torsdag eftermiddag." } },
      { from: "agent", text: { en: "Of course. I have 14:30 or 16:00 on Thursday. Which suits you?", sv: "Självklart. Jag har 14.30 eller 16.00 på torsdag. Vilken passar dig?" } },
      { from: "customer", text: { en: "16:00, please.", sv: "16.00, tack." } },
      { from: "agent", text: { en: "Booked: haircut on Thursday at 16:00. You'll get a text message with the details.", sv: "Bokat: klippning på torsdag kl. 16.00. Du får ett sms med detaljerna." } },
    ],
    extras: [
      { kind: "setup", price: 120, text: { en: "We connect the agent to your phone number and booking system together. 60 minutes online.", sv: "Vi kopplar agenten till ditt telefonnummer och bokningssystem tillsammans. 60 minuter online." } },
      { kind: "training", price: 90, text: { en: "Your staff learn to follow up calls and change the agent's answers. 45 minutes.", sv: "Personalen lär sig följa upp samtal och ändra agentens svar. 45 minuter." } },
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
    cover: "/img/cover-dental.webp",
    liveDemo: {
      greeting: {"en":"Hi! I can answer questions about the clinic. What would you like to know?","sv":"Hej! Jag kan svara på frågor om kliniken. Vad vill du veta?"},
      prompts: [{"en":"What does a check-up cost?","sv":"Vad kostar en undersökning?"},{"en":"When are you open?","sv":"När har ni öppet?"},{"en":"I have a bad toothache","sv":"Jag har väldigt ont i en tand"}],
      facts: "A made-up dental clinic. Open Monday to Friday 8-17. Prices: check-up 85 euros (30 minutes), hygienist 70 euros, whitening 250 euros. Before a visit: brush your teeth and bring ID. The chat cannot book appointments. Urgent pain, swelling or bleeding: tell the visitor to call the clinic, and give no medical advice. Ask visitors not to share health information.",
    },
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
    acceptance: [
      { en: "It answers ten common questions correctly from your price list", sv: "Den svarar rätt på tio vanliga frågor utifrån din prislista" },
      { en: "It refers every urgent case to the phone and gives no medical advice", sv: "Den hänvisar varje akut fall till telefon och ger inga medicinska råd" },
      { en: "It asks patients not to share health information", sv: "Den ber patienter att inte dela hälsouppgifter" },
      { en: "It says so when it does not know the answer", sv: "Den säger till när den inte vet svaret" },
    ],
    demo: [
      { from: "customer", text: { en: "What does a check-up cost?", sv: "Vad kostar en undersökning?" } },
      { from: "agent", text: { en: "A check-up costs €85 and takes about 30 minutes. Would you like to know the opening hours too?", sv: "En undersökning kostar 85 € och tar cirka 30 minuter. Vill du veta öppettiderna också?" } },
      { from: "customer", text: { en: "I have a bad toothache right now.", sv: "Jag har väldigt ont i en tand just nu." } },
      { from: "agent", text: { en: "I'm sorry to hear that. For urgent pain, call the clinic so that staff can help you today. I can't give medical advice here.", sv: "Det var tråkigt att höra. Vid akut värk, ring kliniken så att personalen kan hjälpa dig i dag. Jag kan inte ge medicinska råd här." } },
    ],
    extras: [
      { kind: "setup", price: 80, text: { en: "We go through your price list and questions together and put the chat on your website. 45 minutes online.", sv: "Vi går igenom prislistan och frågorna tillsammans och lägger chatten på hemsidan. 45 minuter online." } },
      { kind: "training", price: 60, text: { en: "The reception learns to update answers and read the chat log. 30 minutes.", sv: "Receptionen lär sig uppdatera svar och läsa chattloggen. 30 minuter." } },
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
    cover: "/img/cover-restaurant.webp",
    liveDemo: {
      greeting: {"en":"Thanks for visiting us yesterday! How was your evening, from 1 to 5?","sv":"Tack för besöket i går! Hur var kvällen, från 1 till 5?"},
      prompts: [{"en":"5","sv":"5"},{"en":"2, the food was cold","sv":"2, maten var kall"},{"en":"Stop sending me messages","sv":"Sluta skicka meddelanden"}],
      facts: "A made-up restaurant. The visitor is a guest who dined there yesterday. For a rating of 4 or 5: thank them and offer to send a link to leave a short review. For 1 to 3: apologise, ask what went wrong, and say the manager will be told; do not offer the review link. If the guest asks to stop: confirm that no more messages will be sent. One short message at a time.",
    },
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
    notIncluded: [{ en: "Replies to public reviews", sv: "Svar på offentliga omdömen" }],
    acceptance: [
      { en: "Every guest with a booking gets one message the day after, never more", sv: "Varje gäst med bokning får ett meddelande dagen efter, aldrig fler" },
      { en: "A guest who answers 1–3 stars is sent to you, not to the review site", sv: "En gäst som svarar 1–3 stjärnor skickas till dig, inte till recensionssajten" },
      { en: "A guest can opt out with one reply", sv: "En gäst kan tacka nej med ett svar" },
      { en: "Phone numbers are deleted after 30 days", sv: "Telefonnummer raderas efter 30 dagar" },
    ],
    demo: [
      { from: "agent", text: { en: "Thanks for visiting us yesterday! How was your evening, from 1 to 5?", sv: "Tack för besöket i går! Hur var kvällen, från 1 till 5?" } },
      { from: "customer", text: { en: "5", sv: "5" } },
      { from: "agent", text: { en: "Wonderful, thank you! Would you like to share that in a short review? I can send you the link.", sv: "Vad roligt, tack! Vill du dela det i ett kort omdöme? Jag kan skicka länken." } },
    ],
    extras: [
      { kind: "setup", price: 70, text: { en: "We connect the agent to your booking list and write the messages in your tone. 45 minutes online.", sv: "Vi kopplar agenten till din bokningslista och skriver meddelandena i din ton. 45 minuter online." } },
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
    cover: "/img/cover-trades.webp",
    liveDemo: {
      greeting: {"en":"Hi! Tell me what you need help with and I'll book a visit.","sv":"Hej! Berätta vad du behöver hjälp med så bokar jag ett besök."},
      prompts: [{"en":"My kitchen tap is dripping","sv":"Min kökskran droppar"},{"en":"Water is leaking under the sink!","sv":"Det läcker vatten under diskbänken!"},{"en":"I need a new socket installed","sv":"Jag behöver ett nytt eluttag"}],
      facts: "A made-up plumbing and electrical firm. Working hours Monday to Friday 7-16. Free visits: Wednesday 9-11, Friday 13-15, next Monday 8-10. Ask what the job is, where in the home, and since when. Urgent jobs (a leak, no power, a burning smell): say it has been sent to the on-call phone at once. No quotes or prices in the chat. A booking needs a first name and an area; the visitor may give made-up ones.",
    },
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
    notIncluded: [{ en: "Quotes and invoicing", sv: "Offerter och fakturering" }],
    acceptance: [
      { en: "A customer can book a visit without you answering the phone", sv: "En kund kan boka ett besök utan att du svarar i telefon" },
      { en: "The visit shows in your calendar with address and a description of the job", sv: "Besöket syns i din kalender med adress och beskrivning av jobbet" },
      { en: "The customer gets a reminder the day before", sv: "Kunden får en påminnelse dagen innan" },
      { en: "Urgent jobs, such as a leak, are sent to your phone at once", sv: "Akuta jobb, till exempel en läcka, skickas direkt till din telefon" },
    ],
    demo: [
      { from: "customer", text: { en: "My kitchen tap is dripping. Can someone come this week?", sv: "Min kökskran droppar. Kan någon komma den här veckan?" } },
      { from: "agent", text: { en: "Yes. Is it dripping from the spout or leaking under the sink?", sv: "Ja. Droppar den från pipen eller läcker det under diskbänken?" } },
      { from: "customer", text: { en: "From the spout.", sv: "Från pipen." } },
      { from: "agent", text: { en: "Then it isn't urgent. I can book Wednesday 9–11 or Friday 13–15. Which suits you?", sv: "Då är det inte akut. Jag kan boka onsdag 9–11 eller fredag 13–15. Vilken passar dig?" } },
    ],
    extras: [
      { kind: "setup", price: 100, text: { en: "We set up your job types, working hours and calendar together. 60 minutes online.", sv: "Vi lägger in dina jobbtyper, arbetstider och din kalender tillsammans. 60 minuter online." } },
      { kind: "training", price: 60, text: { en: "You learn to change questions and block time in the calendar. 30 minutes.", sv: "Du lär dig ändra frågor och spärra tid i kalendern. 30 minuter." } },
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
