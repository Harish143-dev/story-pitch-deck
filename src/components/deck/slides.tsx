import type { ComponentType } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight, ArrowDown, Phone, MessageSquare, Sparkles,
  Search, ShoppingBag, Users, Megaphone, Handshake, MapPin,
  Check, X, Diamond, Target, Camera, Hash,
} from "lucide-react";
import { SlideShell, Reveal } from "./SlideShell";
import { AnimatedNumber } from "./AnimatedNumber";
import { InstagramIcon, MetaIcon, FacebookIcon, WhatsAppIcon, YouTubeIcon, GoogleIcon } from "./BrandIcons";
import logo from "@/assets/roomys-logo.png";

const NAVY = "var(--ink)";
const GOLD = "var(--gold)";
const SOFT = "var(--ink-soft)";

/* Inline brand icons next to platform mentions */
const BRAND_MAP: Array<{ re: RegExp; Icon: ComponentType<{ className?: string }> }> = [
  { re: /\b(Instagram|IG)\b/g, Icon: InstagramIcon },
  { re: /\b(WhatsApp)\b/g, Icon: WhatsAppIcon },
  { re: /\b(Facebook|FB)\b/g, Icon: FacebookIcon },
  { re: /\b(Meta)\b/g, Icon: MetaIcon },
  { re: /\b(YouTube)\b/g, Icon: YouTubeIcon },
  { re: /\b(Google)\b/g, Icon: GoogleIcon },
];
function withBrandIcons(text: string, iconClass = "inline-block h-[1em] w-[1em] mr-1 -mt-0.5 align-middle") {
  type Token = { type: "text"; value: string } | { type: "brand"; value: string; Icon: ComponentType<{ className?: string }> };
  let tokens: Token[] = [{ type: "text", value: text }];
  for (const { re, Icon } of BRAND_MAP) {
    const next: Token[] = [];
    for (const tok of tokens) {
      if (tok.type !== "text") { next.push(tok); continue; }
      let last = 0;
      const s = tok.value;
      const r = new RegExp(re.source, re.flags);
      let m: RegExpExecArray | null;
      while ((m = r.exec(s)) !== null) {
        if (m.index > last) next.push({ type: "text", value: s.slice(last, m.index) });
        next.push({ type: "brand", value: m[0], Icon });
        last = m.index + m[0].length;
      }
      if (last < s.length) next.push({ type: "text", value: s.slice(last) });
    }
    tokens = next;
  }
  return tokens.map((t, i) =>
    t.type === "text"
      ? <span key={i}>{t.value}</span>
      : <span key={i} className="inline-flex items-center gap-1 align-middle"><t.Icon className={iconClass} />{t.value}</span>
  );
}

/* ───────────────────────── 01 TITLE ───────────────────────── */
function Cover() {
  return (
    <section className="relative h-full w-full overflow-y-auto overflow-x-hidden bg-ink text-cream">
      <motion.div
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="absolute left-5 right-5 top-6 h-px origin-left bg-cream/15 sm:left-12 sm:right-12 sm:top-12 md:left-20 md:right-20"
      />
      <motion.div
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        className="absolute left-5 right-5 bottom-20 h-px origin-right bg-cream/15 sm:left-12 sm:right-12 sm:bottom-24 md:left-20 md:right-20"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 0.18, scale: 1 }}
        transition={{ duration: 2 }}
        className="pointer-events-none absolute -right-40 top-1/2 h-[400px] w-[400px] sm:h-[700px] sm:w-[700px] -translate-y-1/2 rounded-full bg-gold blur-[120px]"
      />

      <div className="relative flex min-h-full flex-col justify-between gap-10 px-5 pt-14 pb-24 sm:px-12 sm:pt-20 sm:pb-28 md:px-24 md:pt-24">
        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.35em] text-cream/50">
          <span>Confidential · For Roomy's Jewellery</span>
          <span>May 2026</span>
        </div>

        <div className="max-w-5xl">
          <Reveal delay={0.3}>
            <img src={logo} alt="Roomy's" className="mb-12 h-12 w-auto brightness-0 invert opacity-90" />
          </Reveal>
          <Reveal delay={0.5}>
            <h1 className="font-display text-[clamp(2.75rem,6.4vw,6rem)] leading-[1] tracking-tight text-cream">
              Hyderabad is looking for a lab&#8209;grown diamond brand it can <em className="not-italic text-gold">trust.</em>
            </h1>
          </Reveal>
          <Reveal delay={0.85}>
            <p className="mt-8 max-w-2xl text-xl leading-relaxed text-cream/75 md:text-2xl">
              Roomy's is already that brand. <span className="text-cream">This is the plan to make sure the right people find you.</span>
            </p>
          </Reveal>
        </div>

        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal delay={1.1}>
            <div className="text-xs uppercase tracking-[0.3em] text-cream/50">
              <div>Prepared for</div>
              <div className="mt-1 text-cream">Roomy's Jewellery — Banjara Hills</div>
            </div>
          </Reveal>
          <Reveal delay={1.2}>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-cream/50">
              <span>Press</span>
              <kbd className="rounded border border-cream/20 px-2 py-1 text-cream/80">→</kbd>
              <span>to begin</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── 02 OBJECTIVE ───────────────────────── */
function Objective() {
  const items = [
    { n: "01", t: "Build digital visibility", d: "Make Roomy's the first lab-grown diamond brand Hyderabad finds online.", icon: Search },
    { n: "02", t: "Generate qualified leads", d: "Capture high-intent search and social demand into a structured funnel.", icon: Target },
    { n: "03", t: "Convert to walk-ins", d: "Drive measurable in-store visits to the Banjara Hills showroom.", icon: MapPin },
  ];
  return (
    <SlideShell number="01 / Objective" eyebrow="What we're solving for">
      <Reveal>
        <h2 className="font-display text-[clamp(2.25rem,4.8vw,4.25rem)] leading-[1.05] tracking-tight max-w-4xl">
          Three outcomes. <em className="not-italic text-gold">One funnel.</em>
        </h2>
      </Reveal>
      <div className="mt-14 flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((it, i) => (
          <Reveal key={it.n} delay={0.2 + i * 0.15}>
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              className="group h-full rounded-2xl border border-ink/10 bg-card p-8 transition hover:border-gold hover:shadow-[0_20px_60px_-30px_rgba(0,0,0,0.4)]"
            >
              <div className="flex items-start justify-between">
                <div className="font-display text-3xl text-gold tabular-nums">{it.n}</div>
                <it.icon className="h-6 w-6 text-ink-soft transition group-hover:text-gold" />
              </div>
              <h3 className="mt-8 font-display text-2xl leading-tight">{it.t}</h3>
              <div className="mt-4 h-px bg-ink/10" />
              <p className="mt-5 text-sm leading-relaxed text-ink-soft">{it.d}</p>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </SlideShell>
  );
}

/* ───────────────────────── 03 TODAY: INSTAGRAM ───────────────────────── */
function TodayInstagram() {
  const rows: Array<[string, string, string, string]> = [
    ["Followers", "10,670", "34,700", "CaratLane 900K+ · BlueStone 500K+"],
    ["Total Posts", "287", "2,408", "—"],
    ["Reels Published", "146", "Minimal", "Primary format"],
    ["Avg Reel Engagement", "447", "~15 likes/post", "1,000–5,000+"],
    ["Posts per Month", "4.8", "~15", "15–20"],
    ["Reel Frequency", "~1/week", "—", "4–5/week"],
    ["Hyderabad Content", "None", "All content", "5–6/mo recommended"],
    ["Hashtag Focus", "Mumbai-centric", "Hyderabad", "Location-specific"],
    ["Account Type", "Personal", "Business", "Business"],
  ];
  return (
    <SlideShell number="02 / Today" eyebrow="Where you are on Instagram" variant="dark">
      <Reveal>
        <h2 className="font-display text-[clamp(2rem,4.2vw,3.75rem)] leading-[1.05] tracking-tight max-w-5xl text-cream">
          146 Reels live. <em className="not-italic text-gold">All pointed at the wrong city.</em>
        </h2>
      </Reveal>
      <Reveal delay={0.2}>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-cream/75">
          The content engine exists — Roomy's already publishes Reels weekly. The gap isn't format. It's geography.
          Zero Hyderabad hashtags, zero Banjara Hills location tags. The audience never sees you.
        </p>
      </Reveal>
      <Reveal delay={0.35}>
        <div className="mt-8 -mx-2 sm:mx-0 overflow-x-auto">
          <div className="min-w-[640px] rounded-2xl border border-cream/10 overflow-hidden">
            <div className="grid grid-cols-12 bg-cream/[0.05] text-[11px] uppercase tracking-[0.22em] text-cream/70">
              <div className="col-span-3 px-5 py-3.5">Metric</div>
              <div className="col-span-3 px-5 py-3.5 border-l border-cream/10 text-gold">Roomy's</div>
              <div className="col-span-3 px-5 py-3.5 border-l border-cream/10">Mangatrai</div>
              <div className="col-span-3 px-5 py-3.5 border-l border-cream/10">National Benchmark</div>
            </div>
            {rows.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45 + i * 0.04, duration: 0.4 }}
                className={`grid grid-cols-12 items-center text-sm ${i % 2 ? "bg-cream/[0.02]" : "bg-transparent"} border-t border-cream/5`}
              >
                <div className="col-span-3 px-5 py-3 font-medium text-cream">{r[0]}</div>
                <div className="col-span-3 px-5 py-3 border-l border-cream/10 text-gold font-medium">{r[1]}</div>
                <div className="col-span-3 px-5 py-3 border-l border-cream/10 text-cream/70">{r[2]}</div>
                <div className="col-span-3 px-5 py-3 border-l border-cream/10 text-cream/70">{r[3]}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </Reveal>
    </SlideShell>
  );
}

/* ───────────────────────── 04 TODAY: GOOGLE & LOCAL ───────────────────────── */
function TodayGoogle() {
  return (
    <SlideShell number="03 / Today" eyebrow="Where you are on Google & Local">
      <Reveal>
        <h2 className="font-display text-[clamp(2.25rem,4.5vw,4rem)] leading-[1.05] tracking-tight max-w-4xl">
          Strong offline reputation. <span className="text-ink-soft">Incomplete online presence.</span>
        </h2>
      </Reveal>

      <div className="mt-12 grid flex-1 grid-cols-12 gap-6">
        <Reveal delay={0.2} className="col-span-12 md:col-span-5">
          <div className="rounded-2xl border border-ink/10 bg-card p-7 h-full">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-ink-soft">
              <GoogleIcon className="h-4 w-4" /> Google My Business
            </div>
            <div className="mt-5 font-display text-7xl">
              <AnimatedNumber value={5.0} decimals={1} />
              <span className="text-3xl text-ink-soft"> / 5</span>
            </div>
            <div className="mt-2 text-ink-soft text-sm">
              <AnimatedNumber value={51} /> reviews · 98% five-star
            </div>
            <div className="mt-6 grid grid-cols-5 gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.div key={i}
                  initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
                  transition={{ delay: 0.4 + i * 0.06, duration: 0.5 }}
                  className="h-1.5 origin-bottom rounded bg-gold" />
              ))}
            </div>
            <div className="mt-7 space-y-2.5 text-sm">
              {[
                ["Address listed", true],
                ["Hours listed", true],
                ["Phone number", false],
                ["Product photos", false],
                ["GMB posts & Q&A", false],
              ].map(([label, ok]) => (
                <div key={label as string} className="flex items-center gap-3">
                  {ok ? <Check className="h-4 w-4 text-gold" /> : <X className="h-4 w-4 text-ink/40" />}
                  <span className={ok ? "text-ink" : "text-ink/50 line-through"}>{label as string}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.35} className="col-span-12 md:col-span-7">
          <div className="rounded-2xl border-2 border-dashed border-ink/20 p-7 h-full flex flex-col justify-center">
            <div className="text-xs uppercase tracking-widest text-gold">What this means</div>
            <p className="mt-5 text-xl leading-relaxed text-ink">
              A customer searches <span className="font-medium">"lab grown diamond Hyderabad"</span> — Roomy's may appear, but with an incomplete listing, no call button, and no photos.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              The trust is there in the rating. <span className="text-ink font-medium">The conversion path is broken.</span>
            </p>
            <div className="mt-8 rounded-xl border border-gold/30 bg-gold/[0.06] p-5">
              <div className="text-[11px] uppercase tracking-widest text-gold mb-2">The fix is quick</div>
              <p className="text-sm leading-relaxed text-ink">
                Adding a phone number, 10–15 product photos, and weekly GMB posts takes <span className="font-medium">one week</span> and <span className="font-medium">costs nothing</span> — but immediately improves both discoverability and walk-in conversion.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </SlideShell>
  );
}

/* ───────────────────────── 05 CUSTOMERS ───────────────────────── */
function Customers() {
  const quotes = [
    "No pressure, just honest guidance.",
    "Explained lab-grown diamonds in a simple way.",
    "High level of transparency.",
    "After comparing the market — this was the right place.",
    "Invited to see the end-to-end process — the final piece was personalised to my liking.",
  ];
  return (
    <SlideShell number="04 / Proof" eyebrow="What your customers already say" variant="dark">
      <div className="grid flex-1 grid-cols-12 gap-12">
        <div className="col-span-12 md:col-span-5 flex flex-col justify-center">
          <Reveal>
            <div className="mb-5 inline-flex items-center gap-2.5 self-start rounded-full border border-cream/15 bg-cream/[0.04] px-3.5 py-1.5">
              <GoogleIcon className="h-4 w-4" />
              <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-cream/85">Google Reviews</span>
              <span className="text-cream/40">·</span>
              <div className="flex gap-[2px]">
                {Array.from({ length: 5 }).map((_, k) => (
                  <svg key={k} viewBox="0 0 24 24" className="h-3 w-3" fill="#FBBC04">
                    <path d="M12 2l2.9 6.9L22 9.7l-5.5 4.8L18.2 22 12 18.3 5.8 22l1.7-7.5L2 9.7l7.1-.8L12 2z" />
                  </svg>
                ))}
              </div>
              <span className="text-[11px] font-semibold text-cream">5.0</span>
            </div>
          </Reveal>
          <Reveal>
            <h2 className="font-display text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[1.05] tracking-tight text-cream">
              <em className="not-italic text-gold">51 reviews.</em> <br/>Zero complaints.
            </h2>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-6 text-base text-cream/80 max-w-md leading-relaxed">
              Multiple reviews call out specific employees by name — a rare signal that the in-store team is a genuine differentiator.
            </p>
          </Reveal>
          <Reveal delay={0.5}>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-cream/65">
              The problem: this social proof exists only on Google. Not on Instagram, not in any ad, not on the website. <span className="text-cream">Every quote on the right is ready-made ad copy that no one is using.</span>
            </p>
          </Reveal>
        </div>
        <div className="col-span-12 md:col-span-7 flex flex-col justify-center gap-3">
          {quotes.map((q, i) => {
            const initials = ["AK", "PS", "RM", "VN", "SD"][i % 5];
            const names = ["Aarav K.", "Priya S.", "Rohit M.", "Vikram N.", "Sneha D."][i % 5];
            const ago = ["2 weeks ago", "a month ago", "3 weeks ago", "2 months ago", "5 days ago"][i % 5];
            return (
              <motion.blockquote
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.12, duration: 0.55 }}
                className="rounded-xl border border-cream/10 bg-cream/[0.04] p-5"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-[#4285F4] to-[#34A853] text-[11px] font-semibold text-white">
                    {initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-cream truncate">{names}</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <div className="flex gap-[2px]">
                        {Array.from({ length: 5 }).map((_, k) => (
                          <svg key={k} viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="#FBBC04">
                            <path d="M12 2l2.9 6.9L22 9.7l-5.5 4.8L18.2 22 12 18.3 5.8 22l1.7-7.5L2 9.7l7.1-.8L12 2z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-[11px] text-cream/60">{ago}</span>
                      <span className="text-cream/40">·</span>
                      <span className="inline-flex items-center gap-1 text-[11px] text-cream/70">
                        <GoogleIcon className="h-3 w-3" /> on Google
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-base leading-snug text-cream">"{q}"</p>
              </motion.blockquote>
            );
          })}
        </div>
      </div>
    </SlideShell>
  );
}

/* ───────────────────────── 06 COMPETITOR COMPARISON ───────────────────────── */
function Competitors() {
  const cols = ["Mangatrai", "BlueStone", "CaratLane", "Roomy's"];
  const rows: Array<[string, string, string, string, string]> = [
    ["Followers", "34,700", "500K+", "900K+", "10,670"],
    ["Posts/Month", "~15", "20+", "20+", "4.8"],
    ["Avg Reel Engagement", "~15", "5,400", "92,000", "447"],
    ["Reel Frequency", "Minimal", "Heavy", "Heavy", "~1/week"],
    ["Lab-Grown Specialist", "No", "No", "No", "Yes"],
    ["Local Hyderabad Focus", "Yes", "No", "No", "Not yet"],
    ["Google Rating", "—", "—", "—", "5.0 / 51"],
  ];
  const owns = [
    { who: "Mangatrai", tag: "Heritage", d: "Established Hyderabad name. High post volume but near-zero engagement. Presence without impact." },
    { who: "BlueStone", tag: "Mid-tier", d: "National scale. UGC and testimonial-led Reels (5,400 avg engagement). Strongest benchmark to learn from." },
    { who: "CaratLane", tag: "National", d: "Celebrity collabs, emotional storytelling, seasonal campaigns (92,000 avg engagement). Sets the bar — not the fight." },
  ];
  return (
    <SlideShell number="05 / Field" eyebrow="Competitor comparison">
      <Reveal>
        <h2 className="font-display text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[1.05] tracking-tight max-w-4xl">
          The field — and where Roomy's already <em className="not-italic text-gold">stands apart.</em>
        </h2>
      </Reveal>
      <div className="mt-8 grid flex-1 grid-cols-12 gap-6">
        <Reveal delay={0.2} className="col-span-12 md:col-span-7">
          <div className="-mx-2 sm:mx-0 overflow-x-auto">
            <div className="min-w-[640px] rounded-2xl border border-ink/10 overflow-hidden">
              <div className="grid grid-cols-12 bg-ink text-cream text-[11px] uppercase tracking-[0.22em]">
                <div className="col-span-4 px-4 py-3">Metric</div>
                {cols.map((c) => (
                  <div key={c} className={`col-span-2 px-3 py-3 border-l border-cream/10 ${c === "Roomy's" ? "text-gold" : ""}`}>{c}</div>
                ))}
              </div>
              {rows.map((r, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.05, duration: 0.4 }}
                  className={`grid grid-cols-12 items-center text-xs md:text-sm ${i % 2 ? "bg-card" : "bg-cream"}`}
                >
                  <div className="col-span-4 px-4 py-2.5 font-medium">{r[0]}</div>
                  <div className="col-span-2 px-3 py-2.5 border-l border-ink/10 text-ink-soft">{r[1]}</div>
                  <div className="col-span-2 px-3 py-2.5 border-l border-ink/10 text-ink-soft">{r[2]}</div>
                  <div className="col-span-2 px-3 py-2.5 border-l border-ink/10 text-ink-soft">{r[3]}</div>
                  <div className="col-span-2 px-3 py-2.5 border-l border-ink/10 text-ink font-medium bg-gold/[0.08]">{r[4]}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>
        <div className="col-span-12 md:col-span-5 flex flex-col gap-3">
          {owns.map((o, i) => (
            <Reveal key={o.who} delay={0.35 + i * 0.12}>
              <div className="rounded-xl border border-ink/10 bg-card p-5">
                <div className="flex items-center justify-between">
                  <div className="font-display text-lg">{o.who}</div>
                  <span className="text-[10px] uppercase tracking-widest text-gold">{o.tag}</span>
                </div>
                <p className="mt-2 text-sm text-ink-soft leading-relaxed">{o.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </SlideShell>
  );
}

/* ───────────────────────── 07 POSITION MATRIX ───────────────────────── */
function Matrix() {
  const points = [
    { name: "Mangatrai", x: 0.32, y: 0.08, color: NAVY, op: 0.4 },
    { name: "BlueStone", x: 0.78, y: 0.55, color: NAVY, op: 0.5 },
    { name: "CaratLane", x: 0.92, y: 0.78, color: NAVY, op: 0.55 },
    { name: "Roomy's", x: 0.28, y: 0.42, color: GOLD, op: 1, current: true },
  ];
  const target = { x: 0.42, y: 0.82 };
  return (
    <SlideShell number="06 / Position" eyebrow="Where Roomy's sits today">
      <div className="grid flex-1 grid-cols-12 gap-10">
        <div className="col-span-12 md:col-span-5 flex flex-col justify-center">
          <Reveal>
            <h2 className="font-display text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[1.05] tracking-tight">
              Already ahead locally. <br/><span className="text-ink-soft">Now go </span><em className="not-italic text-gold">vertical.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.3}>
            <ul className="mt-8 space-y-4 text-base text-ink-soft">
              <li className="flex gap-3"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" /><span>Roomy's already <span className="text-ink font-medium">outperforms the only comparable local competitor</span> on Reel engagement.</span></li>
              <li className="flex gap-3"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" /><span>The move is vertical — sharper content strategy, Hyderabad focus, higher frequency.</span></li>
              <li className="flex gap-3"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" /><span className="text-ink">Own the local axis first, then expand reach.</span></li>
            </ul>
          </Reveal>
        </div>

        <div className="col-span-12 md:col-span-7 flex items-center justify-center">
          <Reveal delay={0.2} className="w-full">
            <div className="relative aspect-square w-full max-w-[520px] mx-auto rounded-2xl border border-ink/15 bg-card p-8">
              <div className="absolute inset-8 border border-dashed border-ink/15" />
              <div className="absolute left-1/2 top-8 bottom-8 w-px bg-ink/10" />
              <div className="absolute top-1/2 left-8 right-8 h-px bg-ink/10" />
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] uppercase tracking-[0.25em] text-ink-soft">Engagement →</div>
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.25em] text-ink-soft">Local → National</div>

              <div className="absolute inset-8">
                {points.map((p, i) => (
                  <motion.div
                    key={p.name}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: p.op, scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    style={{ left: `${p.x * 100}%`, bottom: `${p.y * 100}%`, color: p.color }}
                    className="absolute -translate-x-1/2 translate-y-1/2"
                  >
                    <div
                      className={`h-3 w-3 rounded-full ${p.current ? "ring-4 ring-gold/30" : ""}`}
                      style={{ background: p.color }}
                    />
                    <div className={`mt-1 whitespace-nowrap text-xs ${p.current ? "font-semibold" : "text-ink-soft"}`}>{p.name}</div>
                  </motion.div>
                ))}
                <motion.svg
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.6, duration: 0.6 }}
                  className="absolute inset-0" viewBox="0 0 100 100" preserveAspectRatio="none"
                >
                  <defs>
                    <marker id="arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                      <path d="M0,0 L6,3 L0,6 z" fill={GOLD} />
                    </marker>
                  </defs>
                  <motion.line
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    transition={{ delay: 1.7, duration: 1 }}
                    x1={points[3].x * 100} y1={100 - points[3].y * 100}
                    x2={target.x * 100} y2={100 - target.y * 100}
                    stroke={GOLD} strokeWidth="0.5" strokeDasharray="2 1.5" markerEnd="url(#arr)"
                  />
                </motion.svg>
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: 2.2, duration: 0.6 }}
                  style={{ left: `${target.x * 100}%`, bottom: `${target.y * 100}%` }}
                  className="absolute -translate-x-1/2 translate-y-1/2 rounded border border-gold/50 bg-gold/10 px-2 py-1 text-[10px] uppercase tracking-widest text-gold"
                >
                  Target zone
                </motion.div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </SlideShell>
  );
}

/* ───────────────────────── 08 THREE LANES ───────────────────────── */
function ThreeLanes() {
  const lanes = [
    {
      n: "01",
      t: "Lab-Grown as a dedicated identity",
      d: "CaratLane and BlueStone sell lab-grown — but as one option among many. Mangatrai is rooted in traditional jewellery. Roomy's entire brand is built around lab-grown. In Hyderabad, no brand owns this position.",
      icon: Diamond,
    },
    {
      n: "02",
      t: "Hyderabad bridal digital space",
      d: "#hyderabadbrides is 100% makeup and fashion content. Zero jewellery brands. Top posts reach 1.1M views. Roomy's 146 Reels have never used this hashtag once.",
      icon: Hash,
    },
    {
      n: "03",
      t: "Authentic local storytelling",
      d: "Pan-India brands cannot structurally replicate a Hyderabad-first 5.0 narrative — named staff, real customer stories, and a Banjara Hills showroom you can actually walk into.",
      icon: Sparkles,
    },
  ];
  return (
    <SlideShell number="07 / Insight" eyebrow="Three lanes no competitor has taken" variant="dark">
      <Reveal>
        <h2 className="font-display text-[clamp(2.25rem,4.5vw,4rem)] leading-[1.05] tracking-tight max-w-4xl text-cream">
          Three open lanes. <em className="not-italic text-gold">Each Roomy's can own.</em>
        </h2>
      </Reveal>
      <div className="mt-12 flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
        {lanes.map((l, i) => (
          <Reveal key={l.n} delay={0.2 + i * 0.15}>
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              className="group h-full rounded-2xl border border-cream/10 bg-cream/[0.04] p-7 transition hover:border-gold hover:bg-cream/[0.06]"
            >
              <div className="flex items-start justify-between">
                <div className="font-display text-3xl text-gold tabular-nums">{l.n}</div>
                <l.icon className="h-6 w-6 text-cream/60 transition group-hover:text-gold" />
              </div>
              <h3 className="mt-7 font-display text-2xl leading-tight text-cream">{l.t}</h3>
              <div className="mt-5 h-px bg-cream/10" />
              <p className="mt-5 text-sm leading-relaxed text-cream/75">{l.d}</p>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </SlideShell>
  );
}

/* ───────────────────────── 09 MISSED OPPORTUNITIES ───────────────────────── */
function Missed() {
  const groups = [
    {
      tag: "Google",
      icon: GoogleIcon,
      impact: "High",
      headline: "Discovery layer is leaking",
      metric: "1,400+",
      metricLabel: "monthly searches uncaptured",
      items: [
        "No phone number on GMB — customers can't call directly",
        "No product photos on GMB — zero visual proof at discovery",
        "\"Lab grown diamond Hyderabad\" — no Search Ad capturing it",
        "No Google Shopping — competitors' products appear, Roomy's doesn't",
      ],
    },
    {
      tag: "Instagram",
      icon: InstagramIcon,
      impact: "High",
      headline: "Reach is in the wrong city",
      metric: "1.1M+",
      metricLabel: "Hyderabad views untouched",
      items: [
        "146 Reels — all Mumbai-focused, zero Hyderabad hashtags",
        "#hyderabadbrides — zero jewellery brands competing",
        "No Instagram Business Account — analytics & ads locked",
        "No Shopping · no bio CTA · 70% Reels send no one anywhere",
      ],
    },
    {
      tag: "Content",
      icon: Camera,
      impact: "Medium",
      headline: "Best content is the rarest",
      metric: "6.2%",
      metricLabel: "of content is your top performer",
      items: [
        "Educational Reels engage best (767 avg) — only 6.2% of content",
        "Sustainability messaging engages 27% higher — underused",
        "51 five-star reviews — not one quoted in an ad or post",
        "Concierge / home appointment never mentioned in any caption",
      ],
    },
    {
      tag: "Lead Capture",
      icon: MessageSquare,
      impact: "High",
      headline: "Intent arrives, then disappears",
      metric: "0",
      metricLabel: "visitors retargeted",
      items: [
        "No WhatsApp Business number visible digitally",
        "Website visitors not retargeted — traffic arrives and leaves",
      ],
    },
    {
      tag: "Partnerships",
      icon: Handshake,
      impact: "Medium",
      headline: "The bridal ecosystem is wide open",
      metric: "0",
      metricLabel: "active local collabs",
      items: [
        "Zero collabs with Hyderabad MUAs, planners, photographers reaching the same audience daily",
      ],
    },
  ];
  const impactStyle = (lvl: string) =>
    lvl === "High"
      ? "bg-gold/15 text-gold border-gold/40"
      : "bg-ink/5 text-ink-soft border-ink/20";
  return (
    <SlideShell number="08 / Gaps" eyebrow="Missed opportunities">
      <Reveal>
        <h2 className="font-display text-[clamp(2rem,4.2vw,3.5rem)] leading-[1.05] tracking-tight max-w-4xl">
          Concrete gaps <em className="not-italic text-gold">costing walk-ins right now.</em>
        </h2>
      </Reveal>
      <div className="mt-8 flex-1 grid grid-cols-12 gap-4 auto-rows-fr">
        {groups.map((g, i) => (
          <Reveal
            key={g.tag}
            delay={0.15 + i * 0.08}
            className={i < 3 ? "col-span-12 md:col-span-4" : "col-span-12 md:col-span-6"}
          >
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="group relative h-full overflow-hidden rounded-2xl border border-ink/10 bg-gradient-to-br from-card to-cream p-5 hover:border-gold/40 hover:shadow-[0_18px_40px_-24px_rgba(0,0,0,0.25)] transition-all"
            >
              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gold/5 blur-2xl transition-opacity duration-500 group-hover:bg-gold/20" />
              <div className="absolute top-2 right-3 text-[10px] font-semibold tracking-[0.2em] text-ink/25 tabular-nums">
                0{i + 1}
              </div>

              <div className="relative flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-ink text-cream">
                    <g.icon className="h-4 w-4" />
                  </div>
                  <div className="text-[11px] uppercase tracking-[0.22em] text-ink-soft font-medium">
                    {g.tag}
                  </div>
                </div>
                <div className={`text-[9px] uppercase tracking-[0.2em] font-semibold rounded-full border px-2 py-0.5 ${impactStyle(g.impact)}`}>
                  {g.impact} impact
                </div>
              </div>

              <div className="relative mb-4">
                <div className="font-display text-[1.05rem] leading-tight text-ink mb-2.5">
                  {g.headline}
                </div>
                <div className="flex items-baseline gap-2 pb-3 border-b border-dashed border-ink/15">
                  <span className="font-display text-3xl text-gold tabular-nums">{g.metric}</span>
                  <span className="text-[11px] text-ink-soft leading-tight">{g.metricLabel}</span>
                </div>
              </div>

              <ul className="relative space-y-2">
                {g.items.map((it, j) => (
                  <li key={j} className="flex gap-2 text-[12.5px] text-ink-soft leading-snug">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" />
                    <span>{withBrandIcons(it)}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </SlideShell>
  );
}

/* ───────────────────────── 10 PROPOSED SCOPE ───────────────────────── */
function Scope() {
  const levers = [
    {
      tag: "Lever 01",
      t: "Organic & Content",
      icon: Sparkles,
      items: [
        "Social Media Management — 12–15 posts/mo · 5–6 Hyderabad-specific",
        "Reel Strategy — 4–5/week, Hyderabad-first, location & hashtag tagged",
        "Google My Business — phone, photos, weekly posts, Q&A",
        "Instagram Shopping live — products shoppable from feed",
      ],
    },
    {
      tag: "Lever 02",
      t: "Paid Advertising",
      icon: Megaphone,
      items: [
        "Meta Ads — Banjara Hills, Jubilee, Gachibowli, Kondapur",
        "Google Search Ads on high-intent terms",
        "Google Shopping (PLA) — products in search results",
        "Cross-platform retargeting for site visitors",
      ],
    },
    {
      tag: "Lever 03",
      t: "Growth & Partnerships",
      icon: Handshake,
      items: [
        "3–5 Hyderabad micro-influencers/mo (10K–100K)",
        "Bridal ecosystem — planners, MUAs, photographers",
        "WhatsApp Business — catalogue, quick replies, booking flow",
        "Review-to-content pipeline — 51 5★ unlocked",
      ],
    },
  ];
  return (
    <SlideShell number="09 / Scope" eyebrow="What we recommend">
      <Reveal>
        <h2 className="font-display text-[clamp(2.25rem,4.5vw,4rem)] leading-[1.05] tracking-tight max-w-4xl">
          One funnel. <span className="text-ink-soft">Three levers pulling together.</span>
        </h2>
      </Reveal>
      <div className="mt-10 flex-1 grid grid-cols-1 md:grid-cols-3 gap-5">
        {levers.map((l, i) => (
          <Reveal key={l.tag} delay={0.2 + i * 0.15}>
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group h-full rounded-2xl border border-ink/10 bg-card p-6 transition hover:border-gold hover:shadow-[0_20px_60px_-30px_rgba(0,0,0,0.4)]"
            >
              <div className="flex items-center justify-between">
                <div className="text-[11px] uppercase tracking-[0.25em] text-gold">{l.tag}</div>
                <l.icon className="h-5 w-5 text-ink-soft transition group-hover:text-gold" />
              </div>
              <h3 className="mt-5 font-display text-2xl leading-tight">{l.t}</h3>
              <div className="mt-5 h-px bg-ink/10" />
              <ul className="mt-4 space-y-2.5">
                {l.items.map((item, j) => (
                  <motion.li
                    key={j}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.15 + j * 0.06, duration: 0.4 }}
                    className="flex gap-2.5 text-sm text-ink-soft leading-relaxed"
                  >
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" />
                    <span>{withBrandIcons(item)}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.9}>
        <div className="mt-6 rounded-xl border border-gold/30 bg-gold/[0.06] px-5 py-4 flex items-center gap-3">
          <ShoppingBag className="h-4 w-4 text-gold shrink-0" />
          <p className="text-sm text-ink leading-relaxed">
            <span className="font-medium">E-commerce growth:</span>{" "}
            {withBrandIcons("Instagram Shopping + Google Shopping create a direct purchase path alongside walk-ins. WhatsApp catalogue lets customers browse without the website. Retargeting recovers product browsers who didn't enquire.")}
          </p>
        </div>
      </Reveal>
    </SlideShell>
  );
}

/* ───────────────────────── 11 FUNNEL FLOW ───────────────────────── */
function Funnel() {
  const stages = [
    { t: "Awareness", d: "Reels + Meta Ads + Google Search reach the right Hyderabad audience.", icon: Megaphone, w: "100%" },
    { t: "Interest", d: "Educational content + Google reviews + sustainability story builds trust.", icon: Sparkles, w: "60%" },
    { t: "Consideration", d: '"Book a free appointment at our Banjara Hills store" — CTA across all channels.', icon: Search, w: "38%" },
    { t: "Lead Captured", d: "WhatsApp Business · Instagram DM · Google Lead Form.", icon: MessageSquare, w: "22%" },
    { t: "Nurture", d: "Store team follows up personally — no pressure, appointment confirmed.", icon: Users, w: "14%" },
    { t: "Walk-in", d: "In-store experience → conversion at Banjara Hills.", icon: ShoppingBag, w: "8%" },
  ];
  return (
    <SlideShell number="10 / Funnel" eyebrow="From stranger to customer">
      <Reveal>
        <h2 className="font-display text-[clamp(2.25rem,4.5vw,4rem)] leading-[1.05] tracking-tight max-w-4xl">
          Every stage <em className="not-italic text-gold">designed</em> to land at Banjara Hills.
        </h2>
      </Reveal>
      <div className="mt-10 flex-1 flex flex-col items-center gap-2">
        {stages.map((s, i) => (
          <motion.div
            key={s.t}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.12, duration: 0.5 }}
            style={{ ["--fw" as string]: s.w }}
            className="relative w-full sm:w-[var(--fw)] sm:min-w-[360px]"
          >
            <div className={`flex items-center gap-3 sm:gap-5 rounded-xl px-4 py-3 sm:px-6 ${i === stages.length - 1 ? "bg-gold text-ink" : "bg-card border border-ink/10"}`}>
              <s.icon className={`h-5 w-5 shrink-0 ${i === stages.length - 1 ? "text-ink" : "text-gold"}`} />
              <div className="flex-1 min-w-0">
                <div className="font-display text-base">{s.t}</div>
                <div className={`text-xs truncate ${i === stages.length - 1 ? "text-ink/70" : "text-ink-soft"}`}>{withBrandIcons(s.d)}</div>
              </div>
            </div>
            {i < stages.length - 1 && (
              <ArrowDown className="mx-auto mt-1 h-3 w-3 text-ink/30" />
            )}
          </motion.div>
        ))}
      </div>
    </SlideShell>
  );
}

/* ───────────────────────── 12 CLOSING ───────────────────────── */
function Closing() {
  return (
    <section className="relative h-full w-full overflow-y-auto overflow-x-hidden bg-ink text-cream">
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 0.2, scale: 1 }}
        transition={{ duration: 2 }}
        className="pointer-events-none absolute -left-40 -top-40 h-[400px] w-[400px] sm:h-[600px] sm:w-[600px] rounded-full bg-gold blur-[140px]"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 2, delay: 0.3 }}
        className="pointer-events-none absolute -right-40 -bottom-40 h-[400px] w-[400px] sm:h-[600px] sm:w-[600px] rounded-full bg-gold blur-[140px]"
      />
      <div className="relative flex min-h-full flex-col justify-between gap-10 px-5 pt-10 pb-24 sm:px-12 sm:pt-14 md:px-24">
        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.3em] text-cream/60">
          <span><span className="text-gold">12</span> · Closing</span>
          <span>Let's begin</span>
        </div>

        <div className="max-w-5xl">
          <Reveal>
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-gold mb-6">
              <Diamond className="h-3 w-3" /> The Ask
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <h2 className="font-display text-[clamp(3rem,7vw,7rem)] leading-[0.95] tracking-tight text-cream">
              The market is ready. <br/>
              <em className="not-italic text-gold">The lane is open.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.6}>
            <p className="mt-10 max-w-2xl text-xl leading-relaxed text-cream/80">
              Roomy's has what most jewellery brands spend years building — a 5.0 rating, a dedicated lab-grown identity, and a store in one of Hyderabad's most premium locations.
            </p>
          </Reveal>
          <Reveal delay={0.9}>
            <p className="mt-4 max-w-2xl text-xl leading-relaxed text-cream">
              The only thing missing is making sure the right people find it.
            </p>
          </Reveal>
        </div>

        <Reveal delay={1.2}>
          <div className="flex flex-wrap items-center gap-6">
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="inline-flex items-center gap-3 rounded-full bg-gold px-7 py-4 text-ink cursor-pointer"
            >
              <span className="text-sm font-semibold uppercase tracking-widest">Start the engagement</span>
              <ArrowRight className="h-4 w-4" />
            </motion.div>
            <div className="flex items-center gap-6 text-sm text-cream/70">
              <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-gold" /> +91 98 4567 1234</div>
              <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-gold" /> Banjara Hills, Hyderabad</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export type Slide = { title: string; component: ComponentType };

export const slides: Slide[] = [
  { title: "Title", component: Cover },
  { title: "Objective", component: Objective },
  { title: "Today · Instagram", component: TodayInstagram },
  { title: "Today · Google", component: TodayGoogle },
  { title: "Customers", component: Customers },
  { title: "Competitors", component: Competitors },
  { title: "Position", component: Matrix },
  { title: "Three Lanes", component: ThreeLanes },
  { title: "Missed Opportunities", component: Missed },
  { title: "Scope", component: Scope },
  { title: "Funnel", component: Funnel },
  { title: "Closing", component: Closing },
];
