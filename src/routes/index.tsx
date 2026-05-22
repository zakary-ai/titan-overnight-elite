import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import heroPoster from "@/assets/hero-poster.jpg";
import founderImg from "@/assets/founder.jpg";
import titanLogo from "@/assets/titan-logo.png";
import { PartnerDialog, openPartnerDialog } from "@/components/partner-dialog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Titan Solutions, NYC Overnight Operations for Luxury Hotels" },
      {
        name: "description",
        content:
          "New York's overnight operations partner for luxury hospitality. Full FOH and BOH overnight management, documented, supervised, and delivered before your first guest arrives.",
      },
      { property: "og:title", content: "Titan Solutions, Overnight Operations for Luxury Hotels" },
      {
        property: "og:description",
        content:
          "Pristine every morning. Without question. Owner operated overnight operations for NYC luxury hotels.",
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
    <a href="#home" className={`flex items-center group ${className}`}>
      <img
        src={titanLogo}
        alt="Titan Solutions, Maintaining Properties, Elevating Standards"
        className="h-12 sm:h-14 w-auto object-contain"
      />
    </a>
  );
}

function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-black border-b border-gold/60 shadow-[0_1px_0_0_rgba(201,168,76,0.25)]">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12 h-20 flex items-center justify-between">
        <Logo />
        <button onClick={openPartnerDialog} className="btn-gold text-[0.6rem] sm:text-[0.72rem] px-4 sm:px-7 py-3 sm:py-4">
          Become a Partner
        </button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="relative w-full overflow-hidden border-b border-gold/60" style={{ height: "88vh", minHeight: "640px" }}>
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

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 h-full flex flex-col justify-center pt-20">
        <div className="flex items-center gap-4 mb-8">
          <span className="gold-rule" />
          <span className="eyebrow">New York City's Overnight Operations Partner</span>
        </div>

        <h1 className="font-serif text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.02] max-w-5xl">
          Your property.<br />
          <span className="italic text-gold">Pristine every morning.</span><br />
          Without question.
        </h1>

        <p className="mt-8 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed">
          Full overnight operations for luxury hospitality properties. Documented, supervised, and
          delivered before your first guest arrives.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <button onClick={openPartnerDialog} className="btn-gold">Become a Partner →</button>
          <a href="#system" className="btn-ghost-gold">View The Titan System</a>
        </div>

      </div>
    </section>
  );
}

function CertMarquee() {
  const items = ["NSF Certified", "Avendra Approved", "Marriott Partner", "CRM Live Reporting", "Owner Operated", "365 Nights/Year", "NYC Based"];
  return (
    <section className="relative bg-black border-t border-b-0 border-gold/60">
      <div
        className="overflow-hidden relative py-5"
        style={{
          maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
        }}
      >
        <div className="marquee-track text-[0.7rem] tracking-wide-2 uppercase text-muted-foreground">
          {[...Array(2)].map((_, dup) => (
            <div key={dup} className="flex items-center shrink-0">
              {items.map((t) => (
                <span key={`${dup}-${t}`} className="flex items-center gap-3 pr-10">
                  <span className="w-1 h-1 bg-gold rounded-full" /> {t}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="h-px bg-gold/60" />
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
    <section ref={ref} className="relative border-y border-border bg-black overflow-hidden">
      <div className="glow-orb -z-10 w-[700px] h-[700px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ animation: "goldPulse 7s ease-in-out infinite" }} />
      <div className="glow-orb-soft -z-10 w-[500px] h-[500px] -left-32 -top-32" />
      <div className="glow-orb-soft -z-10 w-[500px] h-[500px] -right-32 -bottom-32" />
      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-border">
          <StatItem value={365} label="Nights / Year" trigger={trig} />
          <StatItem value={5} suffix="+" label="Years Active" trigger={trig} />
          <StatItem value={5} suffix="★" label="Luxury Properties" trigger={trig} />
        </div>
      </div>
    </section>
  );
}

const WHO_CARDS = [
  { n: "01", t: "Communication First", d: "Open, consistent dialogue with hotel management so nothing goes unaddressed and no standard goes unmet." },
  { n: "02", t: "Transparency Always", d: "Live access to nightly operations through our CRM. Every task, every area, every issue, documented in real time." },
  { n: "03", t: "Standards Without Compromise", d: "Full uniform every night. The discipline in how we arrive reflects the discipline we bring to every inch of your property." },
  { n: "04", t: "Long Term Partnership", d: "We're not here for a contract. We're here to become an extension of your team, year after year." },
];

function WhoWeAre() {
  return (
    <section id="who" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="grid-overlay -z-10" />
      <div className="glow-orb-soft -z-10 w-[600px] h-[600px] -right-40 top-20" />
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
              Titan Solutions is a New York based overnight operations company built exclusively for luxury hospitality.
              We manage the full overnight operation across front of house and back of house spaces, arriving in
              uniform every night and ensuring every area meets the standard your guests expect by morning. Every partner has{" "}
              <span className="text-foreground font-medium">direct access to our team, our owner, and our systems at all times.</span>
            </p>
          </div>
        </div>

        <div className="mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {WHO_CARDS.map((c) => (
            <div key={c.n} className="card-elite p-8 reveal rounded-xl">
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
  { n: "01", t: "Front of House Operations", d: "Overnight cleaning and resetting of all guest facing spaces by morning.", tag: "Core" },
  { n: "02", t: "Back of House Operations", d: "Complete overnight maintenance of employee and service areas across every level.", tag: "Core" },
  { n: "03", t: "Kitchen & Culinary Support", d: "NSF certified, NFPA 96 compliant overnight kitchen cleaning, restored nightly.", tag: "Certified" },
  { n: "04", t: "Stone & Marble Maintenance", d: "Specialized care for natural stone and specialty surfaces that define luxury.", tag: "Specialty" },
  { n: "05", t: "Deep Cleaning Projects", d: "Carpet extraction, hard floor, power washing, window washing on schedule.", tag: "Scheduled" },
  { n: "06", t: "Custom Specialty Work", d: "Any project, handled by the team that already knows your building.", tag: "On Request" },
];

function Services() {
  return (
    <section id="services" className="relative py-24 lg:py-32 bg-ink/40 border-y border-border overflow-hidden">
      <div className="glow-orb-soft -z-10 w-[700px] h-[700px] -left-60 top-1/3" />
      <div className="glow-orb-soft -z-10 w-[500px] h-[500px] -right-40 bottom-0" />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="reveal max-w-4xl">
          <div className="flex items-center gap-4 mb-8">
            <span className="gold-rule" />
            <span className="eyebrow">What We Do</span>
          </div>
          <h2 className="font-serif text-5xl md:text-6xl leading-[1.05]">
            Everything your property <span className="italic text-gold">needs overnight.</span><br />
            Nothing it doesn't.
          </h2>
        </div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((s) => (
            <article
              key={s.n}
              className="reveal card-elite rounded-2xl p-7 flex flex-col gap-5 min-h-[220px]"
            >
              <div className="flex items-center justify-between">
                <span className="w-10 h-10 rounded-full border border-gold/50 grid place-items-center font-serif text-gold text-sm">
                  {s.n}
                </span>
                <span className="text-[0.6rem] tracking-elite uppercase text-gold/80 border border-gold/30 rounded-full px-3 py-1">
                  {s.tag}
                </span>
              </div>
              <div>
                <h3 className="font-serif text-2xl text-foreground mb-2">{s.t}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.d}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PortalEmbed() {
  return (
    <div className="card-elite rounded-2xl p-4 md:p-5 relative">
      <div className="flex items-center justify-between border-b border-border pb-3 mb-4 px-2">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border border-gold/60 rotate-45 grid place-items-center">
            <span className="-rotate-45 font-serif text-gold text-sm">T</span>
          </div>
          <div>
            <div className="text-[0.6rem] tracking-elite text-muted-foreground">Property Portal</div>
            <div className="text-sm font-medium">Live Operations</div>
          </div>
        </div>
        <span className="flex items-center gap-2 text-[0.6rem] tracking-elite text-gold">
          <span className="w-2 h-2 rounded-full bg-gold animate-pulse" /> Live Shift
        </span>
      </div>

      <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-border bg-background">
        {/* TODO: replace src with the real portal embed URL */}
        <iframe
          title="Titan Portal"
          src="about:blank"
          className="absolute inset-0 w-full h-full"
          loading="lazy"
          referrerPolicy="no-referrer"
          sandbox="allow-scripts allow-same-origin allow-forms"
        />
        <div className="absolute inset-0 grid place-items-center pointer-events-none text-center px-6">
          <div>
            <div className="text-[0.6rem] tracking-elite text-gold mb-2">Portal Embed</div>
            <p className="font-serif text-xl text-muted-foreground">
              Live portal will appear here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const SYSTEM_BENEFITS = [
  { n: "01", t: "Live Access For Your Team", d: "Real time visibility into every shift. Every area assigned, every task tracked, every completion verified as it happens." },
  { n: "02", t: "Supervisor Verification", d: "Nothing is marked complete without physical verification by our on site working supervisor." },
  { n: "03", t: "Photo Documentation Nightly", d: "End of shift photos uploaded for every space. A visual record of the completed operation each morning." },
  { n: "04", t: "Zero Unresolved Issues", d: "Every issue identified overnight is logged, assigned, and resolved before it reaches your team." },
];

function TitanSystem() {
  return (
    <section id="system" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="grid-overlay -z-10" />
      <div className="glow-orb -z-10 w-[500px] h-[500px] left-1/2 -translate-x-1/2 top-10" style={{ animation: "goldPulse 9s ease-in-out infinite" }} />
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
              Most overnight vendors ask you to trust them. Titan Solutions shows you. Our centralized
              CRM gives hotel management live access to every shift, with tasks, verifications, and
              photos uploaded before your team arrives.
            </p>
            <p className="mt-4 text-foreground font-medium">You will never wonder what happened overnight. You will know.</p>
          </div>
          <div className="lg:col-span-6 reveal">
            <PortalEmbed />
          </div>
        </div>

        <div className="mt-24 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {SYSTEM_BENEFITS.map((b) => (
            <div key={b.n} className="reveal card-elite rounded-xl p-7">
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
    <section id="leadership" className="relative py-24 lg:py-32 bg-ink/40 border-y border-border overflow-hidden">
      <div className="glow-orb-soft -z-10 w-[650px] h-[650px] -right-48 -top-32" />
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
              oversight of every property partnership we maintain, present during onboarding, weekly site reviews,
              and directly reachable at any hour. When our partners reach out, they speak directly to decision makers.
            </p>
          </div>
        </div>

        <div className="reveal grid lg:grid-cols-12 gap-10 card-elite rounded-2xl p-8 md:p-12">
          <div className="lg:col-span-4">
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
              <img
                src={founderImg}
                alt="Frank Boccia, Founder and President of Titan Solutions"
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
              Founder and President, Titan Solutions
            </div>
            <ul className="mt-8 space-y-4">
              {[
                "Structured weekly property reviews conducted alongside hotel management",
                "Direct leadership access, 24 hours a day, 365 days a year",
                "Immediate response to any concern at any partner property",
                "Personal accountability on every contract, without exception",
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
                New York, NY, around the clock
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
    <section id="partners" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="grid-overlay -z-10" />
      <div className="glow-orb-soft -z-10 w-[600px] h-[600px] -left-40 bottom-10" />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="reveal max-w-3xl">
          <div className="flex items-center gap-4 mb-8">
            <span className="gold-rule" />
            <span className="eyebrow">Trusted Hospitality Brands</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl leading-[1.1]">
            Built for the brands<br />
            <span className="italic text-gold">that demand the best.</span>
          </h2>
        </div>

        <div
          className="reveal mt-14 overflow-hidden relative py-10 border-y border-gold/40 bg-black"
          style={{
            maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
            WebkitMaskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
          }}
        >
          <div className="marquee-track items-center">
            {[...Array(2)].map((_, dup) => (
              <div key={dup} className="flex items-center shrink-0">
                {[
                  { name: "MARRIOTT", font: "font-serif", tracking: "tracking-[0.25em]" },
                  { name: "HYATT", font: "font-sans", tracking: "tracking-[0.35em]" },
                  { name: "HILTON", font: "font-serif", tracking: "tracking-[0.18em]" },
                  { name: "SONESTA", font: "font-sans", tracking: "tracking-[0.3em]" },
                ].map((b) => (
                  <div
                    key={`${dup}-${b.name}`}
                    className="flex items-center justify-center px-10 sm:px-16 shrink-0"
                  >
                    <span
                      className={`${b.font} ${b.tracking} text-xl sm:text-2xl md:text-3xl font-light text-foreground/70 hover:text-gold transition-colors whitespace-nowrap`}
                    >
                      {b.name}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>

        </div>

        <blockquote className="reveal mt-16 max-w-4xl mx-auto text-center">
          <p className="font-serif italic text-2xl md:text-3xl leading-snug text-foreground/90">
            "Our partners walk in every morning and overnight operations are not something they have to think about.
            That is exactly what we set out to deliver, and it is what we deliver every single night."
          </p>
          <footer className="mt-6 text-[0.65rem] tracking-elite text-gold">
            Frank Boccia, Founder and President, Titan Solutions
          </footer>
        </blockquote>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section id="contact" className="relative py-24 lg:py-32 border-t border-border overflow-hidden bg-black">
      <div className="glow-orb -z-10 w-[800px] h-[800px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ animation: "goldPulse 8s ease-in-out infinite" }} />
      <div className="grid-overlay -z-10" />
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
          <button onClick={openPartnerDialog} className="btn-gold">Become a Partner →</button>
          <a href="tel:3474088559" className="btn-ghost-gold">Call Us</a>
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
          Overnight operations for luxury hospitality. Owner operated. New York City.
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

function Index() {
  useReveal();
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Nav />
      <main>
        <Hero />
        <CertMarquee />
        <StatBand />
        <WhoWeAre />
        <Services />
        <TitanSystem />
        <Leadership />
        <Partners />
        <FinalCTA />
      </main>
      <Footer />
      <PartnerDialog />
    </div>
  );
}
