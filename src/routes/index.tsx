import { createFileRoute } from "@tanstack/react-router";



import titanLogo from "@/assets/titan-logo.png";
import { PartnerDialog, openPartnerDialog } from "@/components/partner-dialog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Titan Solutions — NYC Luxury Hotel Overnight Operations" },
      {
        name: "description",
        content:
          "New York's overnight operations partner for luxury hospitality. Full FOH and BOH management, supervised and delivered before your first guest arrives.",
      },
      { property: "og:title", content: "Titan Solutions — NYC Luxury Hotel Overnight Operations" },
      {
        property: "og:description",
        content:
          "New York's overnight operations partner for luxury hospitality. Full FOH and BOH management, supervised and delivered before your first guest arrives.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Titan Solutions",
          url: "https://titansolutionsco.com/",
          description:
            "Owner-operated overnight FOH and BOH operations for NYC luxury hotels — cleaning, kitchen support, and floor management delivered before first arrivals.",
          areaServed: "New York City",
          address: { "@type": "PostalAddress", addressLocality: "New York", addressRegion: "NY", addressCountry: "US" },
        }),
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
  
  { id: "partners", label: "Partners" },
  { id: "contact", label: "Contact" },
];




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
    <header className="fixed top-0 inset-x-0 z-50 bg-black/70 backdrop-blur-xl border-b border-gold/60 shadow-[0_1px_0_0_rgba(201,168,76,0.25)]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 h-20 flex items-center justify-between gap-3">
        <Logo />
        <button onClick={openPartnerDialog} className="btn-gold text-[0.55rem] sm:text-[0.72rem] px-3 sm:px-7 py-2.5 sm:py-4 whitespace-nowrap">
          Become a Partner
        </button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="relative w-full overflow-hidden border-b border-gold/60 min-h-[calc(100vh-80px)] md:min-h-[calc(100vh-230px)]">
      <video
        className="absolute inset-0 w-full h-full object-cover bg-black"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 hero-overlay" />
      <div className="absolute inset-0 diagonal-texture" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 h-full flex flex-col items-center text-center justify-center pt-32 pb-20 md:py-24 lg:py-32">
        <div className="flex items-center gap-4 mb-8">
          <span className="gold-rule" />
          <span className="eyebrow">New York's Premier Overnight Operations Partner</span>
          <span className="gold-rule" />
        </div>

        <h1 className="font-black tracking-tight text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.02] max-w-5xl mx-auto uppercase">
          Wake Up To A<br className="sm:hidden" />{" "}
          <span className="text-gold">Flawless Hotel.</span><br />
          Every Single Morning.
        </h1>


        <p className="mt-6 md:mt-8 max-w-2xl mx-auto text-base md:text-xl font-light text-muted-foreground leading-relaxed">
          For NYC luxury hotels that don’t get second chances in the morning.&nbsp;
          <br />
          No missed floors. No morning panic. No excuses.
        </p>

        <div className="mt-10 w-full flex flex-col sm:flex-row sm:flex-wrap justify-center items-stretch sm:items-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto">
          <button
            onClick={openPartnerDialog}
            className="btn-gold w-full sm:w-auto !text-white !bg-gold hover:!bg-gold-soft text-sm sm:text-[0.78rem] py-4 sm:py-5 px-8 sm:px-10 shadow-[0_20px_50px_-15px_rgba(213,175,76,0.55)]"
            style={{ color: "#ffffff" }}
          >
            Become a Partner →
          </button>
          <a href="#system" className="btn-ghost-gold w-full sm:w-auto">View The Titan System</a>
        </div>

      </div>

    </section>
  );
}


function CredentialBand() {
  const items = ["NSF Certified", "Avendra Approved", "Marriott Partner", "CRM Live Reporting", "Owner Operated", "365 Nights/Year", "NYC Based"];
  return (
    <section className="section-depth-soft relative bg-transparent overflow-hidden">
      <div className="glow-orb -z-10 w-[700px] h-[700px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-60" style={{ animation: "goldPulse 7s ease-in-out infinite" }} />
      <div className="glow-orb-soft -z-10 w-[500px] h-[500px] -left-32 -top-32" />
      <div className="glow-orb-soft -z-10 w-[500px] h-[500px] -right-32 -bottom-32" />

      {/* Marquee row */}
      <div
        className="overflow-hidden relative py-3"
        style={{
          maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
        }}
      >
        <div className="marquee-track text-[0.68rem] tracking-wide-2 uppercase text-muted-foreground">
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

      {/* Hairline between rows */}
      <div className="h-px w-full bg-gold/15" />

      {/* Stats row */}
      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex flex-row divide-x divide-border">
          {[
            { display: "365", label: "Nights / Year" },
            { display: "5+", label: "Years Active" },
            { display: "5★", label: "Luxury Properties" },
          ].map((s) => (
            <div key={s.label} className="flex-1 text-center px-4 py-5 transition-colors hover:bg-gold/[0.03]">
              <div className="font-serif text-3xl md:text-4xl text-gold leading-none">{s.display}</div>
              <div className="mt-2 text-[0.6rem] md:text-[0.65rem] tracking-elite text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



const WHO_CARDS = [
  { n: "01", t: "Communication First", d: "Open, consistent dialogue with hotel management so nothing goes unaddressed and no standard goes unmet." },
  { n: "02", t: "Transparency Always", d: "Live access to nightly operations through our mobile app. Every task, every area, every issue, documented in real time." },
  { n: "03", t: "Standards Without Compromise", d: "Full uniform every night. The discipline in how we arrive reflects the discipline we bring to every inch of your property." },
  { n: "04", t: "Long Term Partnership", d: "We're not here for a contract. We're here to become an extension of your team, year after year." },
];

function WhoWeAre() {
  return (
    <section id="who" className="section-depth relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">

          <div className="reveal">
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="gold-rule" />
              <span className="eyebrow">Our Promise</span>
              <span className="gold-rule" />
            </div>
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.02] tracking-tight">
              We don't have clients.<br />
              <span className="italic gold-shimmer">We have partners.</span>
            </h2>
            <div className="mt-8 flex items-center justify-center gap-3">
              <span className="h-px w-16 bg-gold" />
              <span className="text-[0.7rem] tracking-elite uppercase text-gold/80">Est. New York</span>
              <span className="h-px w-16 bg-gold" />
            </div>
          </div>
          <div className="reveal mt-12">
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
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
    <section id="services" className="section-depth relative py-24 lg:py-32 bg-transparent overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="reveal max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="gold-rule" />
            <span className="eyebrow">What We Do</span>
            <span className="gold-rule" />
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

function IPhonePortal() {
  return (
    <div className="relative mx-auto" style={{ width: "min(360px, 80vw)" }}>
      <div className="absolute -inset-10 bg-gold/10 blur-3xl rounded-full -z-10" />
      <div
        className="relative bg-black rounded-[3rem] p-[14px] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7),0_0_0_2px_rgba(212,175,55,0.15)]"
        style={{ aspectRatio: "9 / 19.5" }}
      >
        <span className="absolute left-[-3px] top-[110px] w-[3px] h-[32px] bg-neutral-800 rounded-l" />
        <span className="absolute left-[-3px] top-[170px] w-[3px] h-[56px] bg-neutral-800 rounded-l" />
        <span className="absolute left-[-3px] top-[240px] w-[3px] h-[56px] bg-neutral-800 rounded-l" />
        <span className="absolute right-[-3px] top-[180px] w-[3px] h-[80px] bg-neutral-800 rounded-r" />
        <div className="relative w-full h-full rounded-[2.4rem] overflow-hidden bg-background">
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[90px] h-[26px] bg-black rounded-full z-20" />
          <iframe
            title="Titan Portal"
            src="https://titan-cleaning-solutions.lovable.app/demo"
            className="absolute inset-0 w-full h-full"
            loading="lazy"
            referrerPolicy="no-referrer"
            sandbox="allow-scripts allow-same-origin allow-forms"
          />
        </div>
      </div>
    </div>
  );
}

function PortalShowcase() {
  return (
    <section id="portal" className="section-depth relative py-24 lg:py-32 bg-transparent overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="reveal mb-16 max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="gold-rule" />
            <span className="eyebrow">Live Portal</span>
            <span className="gold-rule" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl leading-[1.1]">
            See the operation <span className="italic text-gold">in your hand.</span>
          </h2>
          <p className="mt-6 text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
            Open the Titan portal from anywhere. Tap through tonight's shift, see every task, every
            verification, every photo, in real time.
          </p>
        </div>
        <div className="reveal flex justify-center">
          <IPhonePortal />
        </div>
      </div>
    </section>
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
    <section id="system" className="section-depth relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="reveal max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="gold-rule" />
            <span className="eyebrow">The Titan System</span>
            <span className="gold-rule" />
          </div>
          <h2 className="font-serif text-5xl md:text-6xl leading-[1.05]">
            Your overnight operation.<br />
            <span className="italic text-gold">Completely visible.</span><br />
            Every single night.
          </h2>
          <p className="mt-8 text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
            Most overnight vendors ask you to trust them. Titan Solutions shows you. Our centralized
            CRM gives hotel management live access to every shift, with tasks, verifications, and
            photos uploaded before your team arrives.
          </p>
          <p className="mt-4 text-foreground font-medium">You will never wonder what happened overnight. You will know.</p>
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
    <section id="leadership" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="reveal mb-16 max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="gold-rule" />
            <span className="eyebrow">Owner Involvement</span>
            <span className="gold-rule" />
          </div>
          <h2 className="font-serif text-5xl md:text-6xl leading-[1.05]">
            Leadership is present<br />
            <span className="italic text-gold">at every property.</span>
          </h2>
          <div className="mt-8 max-w-3xl mx-auto space-y-5 text-muted-foreground text-lg leading-relaxed">
            <p>
              At Titan Solutions, leadership is not a title on a contract. Our founder is actively involved in the
              oversight of every property partnership we maintain, present during onboarding, weekly site reviews,
              and directly reachable at any hour. When our partners reach out, they speak directly to decision makers.
            </p>
          </div>
        </div>


        <div className="reveal card-elite rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
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
    </section>
  );
}

function Partners() {
  return (
    <section id="partners" className="section-depth relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="reveal max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="gold-rule" />
            <span className="eyebrow">Trusted Hospitality Brands</span>
            <span className="gold-rule" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl leading-[1.1]">
            Built for the brands<br />
            <span className="italic text-gold">that demand the best.</span>
          </h2>
        </div>


        <div
          className="reveal mt-14 overflow-hidden relative py-10 border-y border-gold/40 bg-black/40"
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
    <section id="contact" className="section-depth relative py-24 lg:py-32 overflow-hidden bg-transparent">
      <div className="relative max-w-[1100px] mx-auto px-6 lg:px-12">
        <div className="reveal relative rounded-3xl border border-gold/20 bg-gradient-to-b from-white/[0.04] to-white/[0.01] backdrop-blur-sm px-8 py-16 md:px-16 md:py-20 text-center shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
          <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gold/5 blur-3xl -z-10" />
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="gold-rule" />
            <span className="eyebrow">Begin The Partnership</span>
            <span className="gold-rule" />
          </div>
          <h2 className="font-serif text-5xl md:text-7xl leading-[1.03]">
            Ready to stop thinking<br />
            <span className="italic text-gold">about overnight?</span>
          </h2>
          <p className="mt-8 max-w-2xl mx-auto text-muted-foreground text-lg leading-relaxed">
            We work exclusively with luxury hotel properties in the New York metropolitan area. If you are ready to
            discuss a partnership, reach out directly to Frank.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <button onClick={openPartnerDialog} className="btn-gold">Become a Partner →</button>
            <a href="tel:3474088559" className="btn-ghost-gold">Call Us</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-gold/15">
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
  return (
    <div className="text-foreground min-h-screen">
      <Nav />
      <main>
        <Hero />
        <CredentialBand />
        <WhoWeAre />
        <Services />
        <TitanSystem />
        <PortalShowcase />
        <Leadership />
        <Partners />

        <FinalCTA />
      </main>
      <Footer />
      <PartnerDialog />
    </div>
  );
}
