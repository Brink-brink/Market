// Site-wide settings. Working name only; change here when the name and domain are decided.
export const site = {
  name: "Brinc",
  // All catalog prices are shown in one currency.
  currency: "EUR",
  // Set in .env.local when the Tally form exists, e.g. https://tally.so/embed/xxxx
  listingFormUrl: process.env.NEXT_PUBLIC_LISTING_FORM_URL ?? "",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
};

export type CreditPackage = {
  id: string;
  name: string;
  credits: number;
  // Price in site.currency. null until the lead price is decided (docs/TASKS.md).
  price: number | null;
  // Stripe Payment Link. Empty until Stripe is set up.
  paymentLinkUrl: string;
};

export const creditPackages: CreditPackage[] = [
  { id: "small", name: "Start", credits: 5, price: null, paymentLinkUrl: process.env.NEXT_PUBLIC_STRIPE_LINK_SMALL ?? "" },
  { id: "medium", name: "Plus", credits: 15, price: null, paymentLinkUrl: process.env.NEXT_PUBLIC_STRIPE_LINK_MEDIUM ?? "" },
  { id: "large", name: "Pro", credits: 40, price: null, paymentLinkUrl: process.env.NEXT_PUBLIC_STRIPE_LINK_LARGE ?? "" },
];

export const formatMoney = (amount: number, locale: string) =>
  new Intl.NumberFormat(locale, {
    style: "currency",
    currency: site.currency,
    maximumFractionDigits: 0,
  }).format(amount);

export const formatRange = ([min, max]: [number, number], locale: string) =>
  `${formatMoney(min, locale)}–${formatMoney(max, locale)}`;
