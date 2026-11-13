// Site-wide settings. Working name only; change here when the name and domain are decided.
export const site = {
  name: "Brinc",
  tagline: "Uppdrag för dig som bygger AI-agenter åt småföretag",
  // Set in .env.local when the Tally form exists, e.g. https://tally.so/embed/xxxx
  listingFormUrl: process.env.NEXT_PUBLIC_LISTING_FORM_URL ?? "",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
};

export type CreditPackage = {
  id: string;
  name: string;
  credits: number;
  // Price in SEK. null until the lead price is decided (docs/TASKS.md).
  priceSek: number | null;
  // Stripe Payment Link. Empty until Stripe is set up.
  paymentLinkUrl: string;
};

export const creditPackages: CreditPackage[] = [
  { id: "small", name: "Start", credits: 5, priceSek: null, paymentLinkUrl: process.env.NEXT_PUBLIC_STRIPE_LINK_SMALL ?? "" },
  { id: "medium", name: "Mellan", credits: 15, priceSek: null, paymentLinkUrl: process.env.NEXT_PUBLIC_STRIPE_LINK_MEDIUM ?? "" },
  { id: "large", name: "Stor", credits: 40, priceSek: null, paymentLinkUrl: process.env.NEXT_PUBLIC_STRIPE_LINK_LARGE ?? "" },
];

export const nav = [
  { href: "/", label: "Start" },
  { href: "/annons", label: "Skicka in annons" },
  { href: "/krediter", label: "Krediter" },
  { href: "/katalog", label: "Katalog" },
];
