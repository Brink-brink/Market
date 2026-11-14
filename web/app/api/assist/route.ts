import Anthropic from "@anthropic-ai/sdk";
import { advisorSchema, parseAdvisorReply } from "@/lib/advisor";
import { advisorPrompt, demoPrompt, listingPrompt } from "@/lib/assistant-prompts";
import { hasLocale } from "@/lib/i18n";
import { getListing, listings } from "@/lib/listings";

// Limits that keep a public, unauthenticated endpoint cheap to abuse.
const MAX_MESSAGES = 40;
const MAX_MESSAGE_CHARS = 4000;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 30;

// Per-instance memory only: a basic brake, not a guarantee. Put a shared limiter in front before real traffic.
const requestLog = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (requestLog.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);
  recent.push(now);
  requestLog.set(ip, recent);
  return recent.length > MAX_REQUESTS_PER_WINDOW;
}

const enabled = () => Boolean(process.env.ANTHROPIC_API_KEY);

export async function GET() {
  return Response.json({ enabled: enabled() });
}

type Body = { mode?: unknown; lang?: unknown; listingId?: unknown; messages?: unknown };

function parseMessages(value: unknown): Anthropic.MessageParam[] | "too_long" | null {
  if (!Array.isArray(value) || value.length === 0 || value.length > MAX_MESSAGES) return null;
  const messages: Anthropic.MessageParam[] = [];
  for (const item of value) {
    const { role, content } = (item ?? {}) as { role?: unknown; content?: unknown };
    if ((role !== "user" && role !== "assistant") || typeof content !== "string" || !content.trim()) {
      return null;
    }
    if (content.length > MAX_MESSAGE_CHARS) return "too_long";
    messages.push({ role, content });
  }
  if (messages[0].role !== "user" || messages[messages.length - 1].role !== "user") return null;
  return messages;
}

export async function POST(request: Request) {
  if (!enabled()) return Response.json({ error: "off" }, { status: 503 });

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) return Response.json({ error: "rate_limited" }, { status: 429 });

  const body = (await request.json().catch(() => null)) as Body | null;
  const mode = body?.mode;
  const lang = body?.lang;
  if (typeof lang !== "string" || !hasLocale(lang)) {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }
  const focus = typeof body?.listingId === "string" ? getListing(body.listingId) : undefined;
  const listingIds = listings.map((listing) => listing.id);
  let system: string;
  if (mode === "listing") {
    system = listingPrompt(lang);
  } else if (mode === "advisor") {
    // The requirements advisor. A listing id means the window was opened from that listing.
    system = advisorPrompt(lang, listings, focus);
  } else if (mode === "demo") {
    // The live demo plays the agent of one listing. It never calls the freelancer's own address.
    if (!focus) return Response.json({ error: "bad_request" }, { status: 400 });
    system = demoPrompt(focus, lang);
  } else {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }
  const messages = parseMessages(body?.messages);
  if (messages === "too_long") return Response.json({ error: "too_long" }, { status: 400 });
  if (!messages) return Response.json({ error: "bad_request" }, { status: 400 });

  const client = new Anthropic();
  try {
    // The conversation is not stored: the browser sends the whole history each time.
    const response = await client.beta.messages.create({
      model: "claude-opus-5-5",
      max_tokens: 16000,
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      // The advisor answers in JSON so the window can show requirements and matches beside the chat.
      output_config:
        mode === "advisor"
          ? { effort: "low", format: { type: "json_schema", schema: advisorSchema(listingIds) } }
          : { effort: "low" },
      system,
      messages,
    });

    if (response.stop_reason === "refusal") {
      return Response.json({ error: "refused" }, { status: 200 });
    }
    const reply = response.content
      .filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("\n")
      .trim();
    if (!reply) return Response.json({ error: "error" }, { status: 502 });
    if (mode === "advisor") {
      const parsed = parseAdvisorReply(reply, listingIds);
      if (!parsed) return Response.json({ error: "error" }, { status: 502 });
      return Response.json(parsed);
    }
    return Response.json({ reply });
  } catch (error) {
    if (error instanceof Anthropic.RateLimitError) {
      return Response.json({ error: "rate_limited" }, { status: 429 });
    }
    if (error instanceof Anthropic.AuthenticationError) {
      console.error("Assistant: the API key was rejected");
      return Response.json({ error: "off" }, { status: 503 });
    }
    if (error instanceof Anthropic.APIError) {
      console.error(`Assistant: API error ${error.status}`);
      return Response.json({ error: "error" }, { status: 502 });
    }
    throw error;
  }
}
