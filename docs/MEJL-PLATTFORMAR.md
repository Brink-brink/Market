# Utkast: frågor till Anthropic och OpenAI om lead-modellen

Utkast, inte skickade. Fyll i `[arbetsnamn]` och `[domän]` när de är beslutade (fas 0). Skicka från den adress du vill använda för plattformskontakten.

- Anthropic: e-post till mcp-review@anthropic.com
- OpenAI: via plugin-portalen (texten nedan passar i ett supportformulär)

---

## Anthropic

**Subject:** Policy question before building: plugin that connects small businesses with AI agent builders (paid leads, no payments in the plugin)

Hello,

I am planning a Claude plugin and MCP server and would like to check that the business model fits the Anthropic Software Directory Policy before I build it.

**What it does**

The plugin connects small businesses that need an AI agent (for example a booking or phone agent for a hair salon) with independent builders who make such agents as a side job.

- **Buyers** (businesses) use it for free, with no account and no sign-up. They describe their need in chat, browse a catalog of reviewed listings, and send a request to at most three builders. Before anything is sent, Claude shows exactly what will be shared and the buyer approves it. The buyer then confirms their e-mail address via a link.
- **Sellers** (builders) publish a listing: a package with a fixed price range and a working demo. I review every listing manually before it is shown. In chat they can analyse a niche, draft a listing, see anonymised requests and reply with an offer.
- **Revenue:** sellers buy credits on our own website (Stripe). One credit is used only when a buyer replies to a seller's offer. Then, and only then, contact details are released to both sides. Payment for the actual work happens directly between buyer and seller, outside our service.

**What the plugin does not do**

- No payments, prices of credits, purchase links or upgrade prompts inside the plugin. Sellers can see their credit balance, nothing more.
- No paid placement. Catalog order and matching are based only on relevance and quality (niche, ratings, response time) and cannot be bought. Reviews of listings cannot be bought or sped up either.
- No money moves without a human action: a credit is used only when the buyer explicitly replies to an offer, after Claude has asked for confirmation.
- No chat history is stored and no user profiles are built from conversations. We store only the fields the buyer approves.
- Sellers appear under an alias until a lead is paid; a contact filter removes e-mail, phone numbers, links and similar from all free text.

The first version is already live as skills only (no server): a market analysis with web search and a listing draft. Nothing is stored or sent.

**My questions**

1. Is a lead-based model like this, where sellers pay per answered lead on our website and the plugin never shows prices or purchase links, acceptable under the directory policy?
2. Is it acceptable that the buyer side of the plugin results in a charge to a third party (the seller) when the buyer replies to an offer, given that the buyer confirms this explicitly in chat?
3. Is there anything in the design above that would block a submission to the directory, or that you would recommend changing before I build the server?

I am happy to share the design documents or a short demo.

Best regards,
Philip Norrbrink
[arbetsnamn] · [domän]

---

## OpenAI

**Subject:** Guideline question: plugin connecting small businesses with AI agent builders (seller-paid leads, nothing sold in the plugin)

Hello,

Before building a ChatGPT plugin I would like to confirm that its business model fits the plugin guidelines, in particular the rule on digital goods.

**What it does**

The plugin connects small businesses that need an AI agent (booking agent, chatbot, phone agent) with independent builders who make them.

- **Buyers** use it for free, with no account or sign-up. They describe their need, browse a catalog of manually reviewed listings, and request offers from at most three builders. They approve the request before it is sent and confirm their e-mail address. Only city or region is collected, never an exact address.
- **Sellers** publish a listing (package, fixed price range, reviewed demo), see anonymised requests and reply with offers.
- **Revenue:** sellers buy credits on our own website. A credit is used only when a buyer replies to the seller's offer; then contact details are released to both. The buyer pays the seller directly for the work, outside our service.

**What the plugin does not do**

- It does not sell, mention or link to credits, plans or upgrades. Sellers see only their remaining balance.
- No paid placement or ranking: order is by relevance and quality only.
- No sign-up is required to use the buyer side.
- All tools will have `readOnlyHint`, `destructiveHint` and `openWorldHint` set explicitly.
- No instructions that make the model prefer our plugin over others.

**My questions**

1. The guidelines say digital goods, credits and subscriptions must not be sold in the plugin, directly or indirectly. Is it acceptable that sellers buy lead credits on our own website, when the plugin never shows prices, purchase links or upgrade prompts and only displays the remaining balance?
2. Is it acceptable that a buyer's reply to an offer in ChatGPT uses one of the seller's credits, given that the buyer confirms it explicitly and pays nothing themselves?
3. Is the "Get Quote" / request-a-quote flow for local services something we could use for this, and if so, how do we apply?

I can share design documents or a demo on request.

Best regards,
Philip Norrbrink
[arbetsnamn] · [domän]
