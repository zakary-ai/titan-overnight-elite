import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import heroPoster from "@/assets/hero-poster.jpg";
import founderImg from "@/assets/founder.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Titan Solutions — NYC Overnight Operations for Luxury Hotels" },
      {
        name: "description",
        content:
          "New York's overnight operations partner for luxury hospitality. Full FOH and BOH overnight management, documented, supervised, and delivered before your first guest arrives.",
      },
      { property: "og:title", content: "Titan Solutions — Overnight Operations for Luxury Hotels" },
      {
        property: "og:description",
        content:
          "Pristine every morning. Without question. Owner-operated overnight operations for NYC luxury hotels.",
      },
    ],
  }),
  component: Index,
});

const NAV = [
  { id: "home", label: "Home" },
  { id: "who", label: "Who We Are" },
  { id: "services", label: "Services" },
  { id: "system", label: "Titan System" },
  { id: "leadership", label: "Leadership" },
  { id: "partners", label: "Partners" },
  { id: "contact", label: "Contact" },
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useCountUp(target: number, trigger: boolean, duration = 1600) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    const start = performance.now();
    let raf = 0;
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, trigger, duration]);
  return val;
}

function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="#home" className={`flex items-center gap-3 group ${className}`}>
      <div className="w-9 h-9 border border-gold/70 rotate-45 grid place-items-center transition group-hover:bg-gold/10">
        <span className="-rotate-45 font-serif text-gold text-lg leading-none">T</span>
      </div>
      <div className="leading-none">
        <div className="font-serif text-xl tracking-wide text-foreground">TITAN</div>
        <div className="text-[0.55rem] tracking-elite text-gold mt-1">SOLUTIONS</div>
      </div>
    </a>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-border"
          : "bg-gradient-to-b from-black/70 to-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        <Logo />
        <nav className="hidden lg:flex items-center gap-9">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className="text-[0.7rem] tracking-wide-2 uppercase text-muted-foreground hover:text-gold transition-colors"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href="#contact" className="btn-gold hidden sm:inline-flex">Become a Partner</a>
          <button
            aria-label="Menu"
            className="lg:hidden w-10 h-10 border border-border grid place-items-center"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="block w-4 h-px bg-foreground relative before:content-[''] before:absolute before:-top-1.5 before:left-0 before:w-4 before:h-px before:bg-foreground after:content-[''] after:absolute after:top-1.5 after:left-0 after:w-4 after:h-px after:bg-foreground" />
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur">
          <nav className="px-6 py-6 flex flex-col gap-4">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                onClick={() => setOpen(false)}
                className="text-xs tracking-wide-2 uppercase text-muted-foreground hover:text-gold"
              >
                {n.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster={heroPoster}
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 hero-overlay" />
      <div className="absolute inset-0 diagonal-texture" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 pt-40 pb-24 min-h-screen flex flex-col justify-center">
        <div className="flex items-center gap-4 mb-8 reveal">
          <span className="gold-rule" />
          <span className="eyebrow">New York City's Overnight Operations Partner</span>
        </div>

        <h1 className="reveal font-serif text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.02] max-w-5xl">
          Your property.<br />
          <span className="italic text-gold">Pristine every morning.</span><br />
          Without question.
        </h1>

        <p className="reveal mt-8 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed">
          Full overnight operations for luxury hospitality properties — documented, supervised, and
          delivered before your first guest arrives.
        </p>

        <div className="reveal mt-10 flex flex-wrap gap-4">
          <a href="#contact" className="btn-gold">Become a Partner →</a>
          <a href="#system" className="btn-ghost-gold">View The Titan System</a>
        </div>

        <div className="reveal mt-14 flex flex-wrap gap-x-10 gap-y-3 text-[0.7rem] tracking-wide-2 uppercase text-muted-foreground">
          {["365 Nights/Year", "NYC Based", "Owner Operated", "CRM Live Reporting"].map((t) => (
            <span key={t} className="flex items-center gap-2">
              <span className="w-1 h-1 bg-gold rounded-full" /> {t}
            </span>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-[0.6rem] tracking-elite text-muted-foreground flex flex-col items-center gap-3">
        SCROLL
        <span className="w-px h-10 bg-gradient-to-b from-gold to-transparent" />
      </div>
    </section>
  );
}

function StatItem({ value, suffix, label, trigger }: { value: number; suffix?: string; label: string; trigger: boolean }) {
  const n = useCountUp(value, trigger);
  return (
    <div className="group flex-1 text-center px-4 py-10 transition-colors hover:bg-gold/[0.03]">
      <div className="font-serif text-5xl md:text-6xl text-gold">
        {n}{suffix}
      </div>
      <div className="mt-3 text-[0.65rem] tracking-elite text-muted-foreground">{label}</div>
    </div>
  );
}

function StatBand() {
  const ref = useRef<HTMLDivElement>(null);
  const [trig, setTrig] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (e) => { if (e[0].isIntersecting) { setTrig(true); io.disconnect(); } },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <section ref={ref} className="relative border-y border-border bg-charcoal/40">
      <div className="absolute inset-0 diagonal-texture pointer-events-none" />
      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-border">
          <StatItem value={365} label="Nights / Year" trigger={trig} />
          <StatItem value={5} suffix="+" label="Years Active" trigger={trig} />
          <StatItem value={5} suffix="★" label="Luxury Properties" trigger={trig} />
        </div>
      </div>
      <div className="bg-ink/60 border-t border-border">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-2 text-[0.65rem] tracking-elite text-muted-foreground">
          {["NSF Certified", "Avendra Approved", "Marriott Partner", "365 Nights Per Year", "CRM Live Reporting", "Owner Operated", "New York Based"].map((t, i, a) => (
            <span key={t} className="flex items-center gap-6">
              <span>{t}</span>
              {i < a.length - 1 && <span className="w-1 h-1 rounded-full bg-gold" />}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

const WHO_CARDS = [
  { n: "01", t: "Communication First", d: "Open, consistent dialogue with hotel management so nothing goes unaddressed and no standard goes unmet." },
  { n: "02", t: "Transparency Always", d: "Live access to nightly operations through our CRM. Every task, every area, every issue — documented in real time." },
  { n: "03", t: "Standards Without Compromise", d: "Full uniform every night. The discipline in how we arrive reflects the discipline we bring to every inch of your property." },
  { n: "04", t: "Long Term Partnership", d: "We're not here for a contract. We're here to become an extension of your team — year after year." },
];

function WhoWeAre() {
  return (
    <section id="who" className="relative py-32 lg:py-40 diagonal-texture">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-5 reveal">
            <div className="flex items-center gap-4 mb-8">
              <span className="gold-rule" />
              <span className="eyebrow">Who We Are</span>
            </div>
            <h2 className="font-serif text-5xl md:text-6xl leading-[1.05]">
              We don't have clients.<br />
              <span className="italic text-gold">We have partners.</span>
            </h2>
          </div>
          <div className="lg:col-span-7 space-y-6 text-muted-foreground text-base md:text-lg leading-relaxed reveal">
            <p>
              Titan Solutions is a New York-based overnight operations company built exclusively for luxury hospitality.
              We manage the full overnight operation across front-of-house and back-of-house spaces — arriving in
              uniform every night and ensuring every area meets the standard your guests expect by morning.
            </p>
            <p>
              What separates us is not just what we clean — it is how we communicate. Every partner has{" "}
              <span className="text-foreground font-medium">direct access to our team, our owner, and our systems at all times.</span>{" "}
              No unresolved issues. No surprises. No excuses.
            </p>
          </div>
        </div>

        <div className="mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {WHO_CARDS.map((c) => (
            <div key={c.n} className="card-elite p-8 reveal">
              <div className="font-serif text-3xl text-gold mb-6">{c.n}</div>
              <div className="text-[0.7rem] tracking-wide-2 uppercase text-foreground font-semibold mb-3">{c.t}</div>
              <p className="text-sm text-muted-foreground leading-relaxed">{c.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const SERVICES = [
  { n: "01", t: "Front of House Operations", d: "Full overnight cleaning and resetting of guest-facing spaces — lobbies, lounges, bars, staircases, elevators, restrooms, and every area your guests will encounter by morning.", tag: "Core Service" },
  { n: "02", t: "Back of House Operations", d: "Complete overnight maintenance of employee and service areas — corridors, locker rooms, cafeteria, loading dock, trash rooms, and service elevators across every level.", tag: "Core Service" },
  { n: "03", t: "Kitchen & Culinary Support", d: "NSF certified and NFPA 96 compliant overnight kitchen cleaning. Hot lines, prep areas, pastry kitchens, garde manger, and all service areas restored nightly.", tag: "Certified" },
  { n: "04", t: "Stone & Marble Maintenance", d: "Specialized care for natural stone, marble, and specialty surfaces that define luxury hospitality. Scheduled restoration to protect your property's most valuable surfaces.", tag: "Specialty" },
  { n: "05", t: "Deep Cleaning & Specialty Projects", d: "Scheduled deep cleaning, carpet extraction, hard floor maintenance, power washing, window washing, and any specialty project — handled by the team that already knows your building.", tag: "Scheduled" },
];

function Services() {
  return (
    <section id="services" className="relative py-32 lg:py-40 bg-ink/40 border-y border-border">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="reveal">
          <div className="flex items-center gap-4 mb-8">
            <span className="gold-rule" />
            <span className="eyebrow">What We Do</span>
          </div>
          <h2 className="font-serif text-5xl md:text-7xl leading-[1.03] max-w-5xl">
            Everything your property <span className="italic text-gold">needs overnight.</span><br />
            Nothing it doesn't.
          </h2>
          <p className="mt-8 max-w-2xl text-muted-foreground text-lg leading-relaxed">
            Our core focus is the full overnight FOH and BOH operation. Beyond that, we offer a complete range of
            specialty services — all executed by the same team that knows your property inside and out.
          </p>
        </div>

        <div className="mt-16 space-y-px">
          {SERVICES.map((s) => (
            <article
              key={s.n}
              className="reveal group relative grid md:grid-cols-12 gap-6 items-start p-8 md:p-10 card-elite"
            >
              <div className="md:col-span-2 font-serif text-4xl md:text-5xl text-gold">{s.n}</div>
              <div className="md:col-span-7">
                <h3 className="text-[0.78rem] tracking-wide-2 uppercase font-semibold mb-3">{s.t}</h3>
                <p className="text-muted-foreground leading-relaxed">{s.d}</p>
              </div>
              <div className="md:col-span-3 flex md:justify-end">
                <span className="border border-gold/60 text-gold text-[0.62rem] tracking-elite px-3 py-2">
                  {s.tag}
                </span>
              </div>
              <span className="absolute left-0 top-0 bottom-0 w-px bg-gold scale-y-0 origin-top group-hover:scale-y-100 transition-transform duration-500" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PortalMock() {
  return (
    <div className="card-elite p-6 md:p-8 relative">
      <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border border-gold/60 rotate-45 grid place-items-center">
            <span className="-rotate-45 font-serif text-gold text-sm">T</span>
          </div>
          <div>
            <div className="text-[0.65rem] tracking-elite text-muted-foreground">Property Portal</div>
            <div className="text-sm font-medium">Marriott Autograph — Manhattan</div>
          </div>
        </div>
        <span className="flex items-center gap-2 text-[0.65rem] tracking-elite text-gold">
          <span className="w-2 h-2 rounded-full bg-gold animate-pulse" /> Live Shift
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { l: "Areas Completed", v: "47 / 52" },
          { l: "Photos Uploaded", v: "184" },
          { l: "Issues Resolved", v: "3 / 3" },
          { l: "Supervisor", v: "Verified" },
        ].map((s) => (
          <div key={s.l} className="border border-border p-4 bg-background/40">
            <div className="text-[0.6rem] tracking-elite text-muted-foreground">{s.l}</div>
            <div className="mt-2 font-serif text-2xl text-gold">{s.v}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        {[
          { a: "Lobby — Marble polish", s: "Complete", t: "02:14" },
          { a: "Executive Lounge", s: "Complete", t: "03:02" },
          { a: "BOH Corridor 3", s: "In Progress", t: "04:18" },
          { a: "Kitchen Hot Line", s: "Queued", t: "—" },
        ].map((row) => (
          <div key={row.a} className="flex items-center justify-between border-b border-border/60 pb-3 text-sm">
            <span>{row.a}</span>
            <span className="flex items-center gap-4">
              <span className={`text-[0.65rem] tracking-elite ${row.s === "Complete" ? "text-gold" : "text-muted-foreground"}`}>{row.s}</span>
              <span className="text-muted-foreground text-xs tabular-nums">{row.t}</span>
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-end">
        <a href="#contact" className="btn-gold text-[0.65rem]">View Your Portal →</a>
      </div>
    </div>
  );
}

const SYSTEM_BENEFITS = [
  { n: "01", t: "Live Access For Your Team", d: "Hotel management has real-time visibility into every shift through our platform. Every area assigned, every task tracked, every completion verified — as it happens." },
  { n: "02", t: "Supervisor Verification", d: "Nothing is marked complete without physical verification by our on-site working supervisor. Every area inspected before the shift closes." },
  { n: "03", t: "Photo Documentation Every Night", d: "End-of-shift photos uploaded for every space. Your team receives a visual record of the completed operation each morning — no phone calls required." },
  { n: "04", t: "Zero Unresolved Issues", d: "Every issue identified overnight is logged, assigned, and resolved before it reaches your team. Nothing falls through the cracks — ever." },
];

function TitanSystem() {
  return (
    <section id="system" className="relative py-32 lg:py-40">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-6 reveal">
            <div className="flex items-center gap-4 mb-8">
              <span className="gold-rule" />
              <span className="eyebrow">The Titan System</span>
            </div>
            <h2 className="font-serif text-5xl md:text-6xl leading-[1.05]">
              Your overnight operation.<br />
              <span className="italic text-gold">Completely visible.</span><br />
              Every single night.
            </h2>
            <p className="mt-8 text-muted-foreground text-lg leading-relaxed max-w-xl">
              Most overnight vendors ask you to trust them. Titan Solutions shows you. Our centralized CRM gives
              hotel management live access to every shift in real time — tasks assigned, areas verified, issues
              logged, and photos uploaded before your team arrives in the morning.
            </p>
            <p className="mt-4 text-foreground font-medium">You will never wonder what happened overnight. You will know.</p>
          </div>
          <div className="lg:col-span-6 reveal">
            <PortalMock />
          </div>
        </div>

        <div className="mt-24 grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
          {SYSTEM_BENEFITS.map((b) => (
            <div key={b.n} className="reveal bg-background p-8 hover:bg-charcoal/60 transition-colors">
              <div className="font-serif text-3xl text-gold mb-5">{b.n}</div>
              <div className="text-[0.7rem] tracking-wide-2 uppercase font-semibold mb-3">{b.t}</div>
              <p className="text-sm text-muted-foreground leading-relaxed">{b.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Leadership() {
  return (
    <section id="leadership" className="relative py-32 lg:py-40 bg-ink/40 border-y border-border">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="reveal mb-16">
          <div className="flex items-center gap-4 mb-8">
            <span className="gold-rule" />
            <span className="eyebrow">Owner Involvement</span>
          </div>
          <h2 className="font-serif text-5xl md:text-6xl leading-[1.05] max-w-4xl">
            Leadership is present<br />
            <span className="italic text-gold">at every property.</span>
          </h2>
          <div className="mt-8 max-w-3xl space-y-5 text-muted-foreground text-lg leading-relaxed">
            <p>
              At Titan Solutions, leadership is not a title on a contract. Our founder is actively involved in the
              oversight of every property partnership we maintain — present during onboarding, present during
              weekly site reviews, and directly reachable at any hour.
            </p>
            <p>
              When our partners reach out, they speak directly to decision makers. Not account managers. Not call
              centers. The people accountable for your property.
            </p>
          </div>
        </div>

        <div className="reveal grid lg:grid-cols-12 gap-10 card-elite p-8 md:p-12">
          <div className="lg:col-span-4">
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src={founderImg}
                alt="Frank Boccia, Founder & President of Titan Solutions"
                className="w-full h-full object-cover grayscale-[20%]"
                loading="lazy"
                width={1024}
                height={1280}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            </div>
          </div>
          <div className="lg:col-span-8">
            <h3 className="font-serif text-4xl text-gold italic">Frank Boccia</h3>
            <div className="mt-2 text-[0.7rem] tracking-elite text-muted-foreground">
              Founder & President — Titan Solutions
            </div>
            <ul className="mt-8 space-y-4">
              {[
                "Structured weekly property reviews conducted alongside hotel management",
                "Direct leadership access — 24 hours a day, 365 days a year",
                "Immediate response to any concern at any partner property",
                "Personal accountability on every contract — without exception",
              ].map((b) => (
                <li key={b} className="flex gap-3 text-muted-foreground">
                  <span className="mt-2 w-1.5 h-1.5 bg-gold rounded-full shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10 pt-8 border-t border-border grid sm:grid-cols-3 gap-6 text-sm">
              <div>
                <div className="text-[0.6rem] tracking-elite text-gold mb-1">Email</div>
                <a href="mailto:frank@titansolutionsco.com" className="hover:text-gold transition-colors">
                  frank@titansolutionsco.com
                </a>
              </div>
              <div>
                <div className="text-[0.6rem] tracking-elite text-gold mb-1">Direct</div>
                <a href="tel:3474088559" className="hover:text-gold transition-colors">347.408.8559</a>
              </div>
              <div>
                <div className="text-[0.6rem] tracking-elite text-gold mb-1">Based</div>
                New York, NY — Around the clock
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Partners() {
  return (
    <section id="partners" className="relative py-32 lg:py-40">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 reveal">
            <div className="flex items-center gap-4 mb-8">
              <span className="gold-rule" />
              <span className="eyebrow">Trusted Hospitality Brands</span>
            </div>
            <h2 className="font-serif text-5xl md:text-6xl leading-[1.05]">
              Built for the brands<br />
              <span className="italic text-gold">that demand the best.</span>
            </h2>
          </div>

          <div className="lg:col-span-7 reveal">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border border border-border">
              {["MARRIOTT", "HYATT", "HILTON", "SONESTA"].map((b) => (
                <div
                  key={b}
                  className="bg-background h-28 grid place-items-center group hover:bg-charcoal/60 transition-colors"
                >
                  <span className="font-serif text-xl tracking-[0.3em] text-muted-foreground group-hover:text-gold transition-colors">
                    {b}
                  </span>
                </div>
              ))}
            </div>

            <blockquote className="reveal mt-10 border-l-2 border-gold pl-6 py-2">
              <p className="font-serif italic text-2xl md:text-3xl leading-snug text-foreground">
                "Active overnight operations contract at a Marriott Autograph Collection property in New York
                City. Multi-year partnership. Zero service failures. Zero gaps in coverage."
              </p>
              <footer className="mt-4 text-[0.65rem] tracking-elite text-muted-foreground">
                Titan Solutions — Active Engagement
              </footer>
            </blockquote>
          </div>
        </div>

        <blockquote className="reveal mt-24 max-w-5xl mx-auto text-center">
          <p className="font-serif italic text-3xl md:text-4xl leading-snug">
            "Our partners walk in every morning and overnight operations are not something they have to think about.
            That is exactly what we set out to deliver — and it is what we deliver every single night."
          </p>
          <footer className="mt-6 text-[0.65rem] tracking-elite text-gold">
            Frank Boccia — Founder & President, Titan Solutions
          </footer>
        </blockquote>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section id="contact" className="relative py-32 lg:py-40 border-t border-border overflow-hidden">
      <div className="absolute inset-0 diagonal-texture" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />
      <div className="relative max-w-[1200px] mx-auto px-6 lg:px-12 text-center">
        <div className="reveal flex items-center justify-center gap-4 mb-8">
          <span className="gold-rule" />
          <span className="eyebrow">Begin The Partnership</span>
          <span className="gold-rule" />
        </div>
        <h2 className="reveal font-serif text-5xl md:text-7xl leading-[1.03]">
          Ready to stop thinking<br />
          <span className="italic text-gold">about overnight?</span>
        </h2>
        <p className="reveal mt-8 max-w-2xl mx-auto text-muted-foreground text-lg leading-relaxed">
          We work exclusively with luxury hotel properties in the New York metropolitan area. If you are ready to
          discuss a partnership, reach out directly to Frank.
        </p>

        <div className="reveal mt-12 flex flex-wrap justify-center gap-4">
          <a href="mailto:frank@titansolutionsco.com" className="btn-gold">Become a Partner →</a>
          <a href="tel:3474088559" className="btn-ghost-gold">Call Frank</a>
          <a href="mailto:frank@titansolutionsco.com" className="btn-ghost-gold">Email Frank</a>
        </div>

        <div className="reveal mt-20 card-elite p-8 md:p-10 text-left max-w-3xl mx-auto">
          <div className="flex items-start gap-5">
            <div className="w-12 h-12 border border-gold/60 rotate-45 grid place-items-center shrink-0">
              <span className="-rotate-45 text-gold font-serif text-lg">✓</span>
            </div>
            <div>
              <div className="text-[0.7rem] tracking-wide-2 uppercase text-gold font-semibold mb-2">
                Seamless transition guaranteed
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Titan Solutions handles onboarding, learns your property before the first shift, and becomes fully
                operational from night one — no gaps, no disruptions, no compromises.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-ink">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12 grid md:grid-cols-3 gap-10 items-start">
        <Logo />
        <div className="text-sm text-muted-foreground leading-relaxed">
          Overnight operations for luxury hospitality. Owner-operated. New York City.
        </div>
        <div className="text-sm md:text-right space-y-1 text-muted-foreground">
          <div>frank@titansolutionsco.com</div>
          <div>347.408.8559</div>
          <div>New York, NY</div>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-5 flex flex-wrap justify-between gap-3 text-[0.62rem] tracking-elite text-muted-foreground">
          <span>© {new Date().getFullYear()} Titan Solutions. All rights reserved.</span>
          <span>NSF · NFPA 96 · Avendra Approved · Fully Insured</span>
        </div>
      </div>
    </footer>
  );
}

function MobileStickyCTA() {
  return (
    <a
      href="#contact"
      className="lg:hidden fixed bottom-4 left-4 right-4 z-40 btn-gold shadow-2xl"
    >
      Become a Partner →
    </a>
  );
}

function Index() {
  useReveal();
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Nav />
      <main>
        <Hero />
        <StatBand />
        <WhoWeAre />
        <Services />
        <TitanSystem />
        <Leadership />
        <Partners />
        <FinalCTA />
      </main>
      <Footer />
      <MobileStickyCTA />
    </div>
  );
}
