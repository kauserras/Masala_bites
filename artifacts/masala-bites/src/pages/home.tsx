import { useState, useEffect, useRef } from "react";
import { Phone, MapPin, ChevronDown, ChevronUp, Star, Clock, Utensils, PartyPopper, Check, Menu, X } from "lucide-react";

const PHONE = "6152937885";
const PHONE_DISPLAY = "(615) 293-7885";
const GOOGLE_MAPS = "https://www.google.com/maps/dir/36.1180797,-86.9305921/2195+Nolensville+Pk,+Nashville,+TN+37211/@36.1511315,-86.9946803,11z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x886465e49afdbc41:0xb8ca1fdf061c0d0b!2m2!1d-86.7536581!2d36.1267474?entry=ttu&g_ep=EgoyMDI2MDQwMS4wIKXMDSoASAFQAw%3D%3D";
const ADDRESS = "2195 Nolensville Pike, Nashville, TN 37211";

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function RevealSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function GoldDivider() {
  return (
    <div className="flex items-center gap-3 justify-center my-4">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
      <div className="w-1.5 h-1.5 rounded-full bg-amber-500/60" />
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
    </div>
  );
}

function NavBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Why Us", href: "#why" },
    { label: "Location", href: "#location" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(18,13,9,0.95)"
          : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(200,146,42,0.2)" : "none",
      }}
    >
      <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <span className="font-serif text-xl font-semibold" style={{ color: "#e8b84b" }}>
            Masala Bites
          </span>
        </a>

        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium transition-colors duration-200"
              style={{ color: "rgba(230,210,170,0.75)" }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#e8b84b")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(230,210,170,0.75)")}
            >
              {l.label}
            </a>
          ))}
          <a
            href={`tel:${PHONE}`}
            data-testid="nav-call-button"
            className="px-4 py-2 rounded text-sm font-semibold transition-all duration-200 hover:opacity-90"
            style={{ background: "linear-gradient(135deg,#c8922a,#e8b84b)", color: "#1a0e06" }}
          >
            Call Now
          </a>
        </div>

        <button
          className="md:hidden p-2 text-amber-400"
          onClick={() => setOpen(!open)}
          data-testid="nav-mobile-toggle"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div
          className="md:hidden px-5 pb-5 flex flex-col gap-4"
          style={{ background: "rgba(18,13,9,0.98)" }}
        >
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-base font-medium py-1 border-b"
              style={{ color: "rgba(230,210,170,0.8)", borderColor: "rgba(200,146,42,0.15)" }}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href={`tel:${PHONE}`}
            data-testid="nav-mobile-call"
            className="mt-2 text-center px-4 py-3 rounded text-sm font-bold"
            style={{ background: "linear-gradient(135deg,#c8922a,#e8b84b)", color: "#1a0e06" }}
            onClick={() => setOpen(false)}
          >
            Call Now
          </a>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-5 pt-20"
      style={{
        background: `
          radial-gradient(ellipse 80% 50% at 50% -10%, rgba(200,146,42,0.18) 0%, transparent 60%),
          linear-gradient(180deg, hsl(30 15% 5%) 0%, hsl(30 15% 8%) 100%)
        `,
      }}
    >
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c8922a' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        <div
          className="inline-block text-xs font-semibold tracking-widest uppercase mb-6 px-4 py-1.5 rounded-full"
          style={{ background: "rgba(200,146,42,0.12)", color: "#e8b84b", border: "1px solid rgba(200,146,42,0.3)" }}
        >
          Nashville's Premier Catering Service
        </div>

        <h1
          className="font-serif font-bold leading-tight mb-5"
          style={{
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            color: "#f0e0b0",
          }}
          data-testid="hero-heading"
        >
          From Our Kitchen to Your{" "}
          <span style={{ background: "linear-gradient(135deg,#c8922a,#e8b84b,#f5d075)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Grand Celebration
          </span>
        </h1>

        <p
          className="text-lg mb-2 max-w-2xl mx-auto leading-relaxed"
          style={{ color: "rgba(220,195,150,0.8)" }}
        >
          Turning Events into Flavorful Experiences
        </p>

        <p
          className="text-base mb-10 max-w-xl mx-auto"
          style={{ color: "rgba(180,155,115,0.75)" }}
        >
          Full-service catering for weddings, corporate events, and celebrations throughout the Nashville area.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <a
            href={`tel:${PHONE}`}
            data-testid="hero-call-button"
            className="flex items-center gap-2.5 px-7 py-3.5 rounded text-base font-bold transition-all duration-200 hover:opacity-90 hover:scale-105 active:scale-95"
            style={{ background: "linear-gradient(135deg,#c8922a,#e8b84b)", color: "#1a0e06", minWidth: "180px", justifyContent: "center" }}
          >
            <Phone size={18} />
            Call Now
          </a>
          <a
            href={GOOGLE_MAPS}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="hero-directions-button"
            className="flex items-center gap-2.5 px-7 py-3.5 rounded text-base font-semibold transition-all duration-200 hover:opacity-90"
            style={{
              background: "transparent",
              color: "#e8b84b",
              border: "1.5px solid rgba(200,146,42,0.5)",
              minWidth: "180px",
              justifyContent: "center",
            }}
          >
            <MapPin size={18} />
            Get Directions
          </a>
        </div>

        <div
          className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-full"
          style={{ background: "rgba(200,146,42,0.08)", color: "rgba(220,195,150,0.7)", border: "1px solid rgba(200,146,42,0.18)" }}
        >
          <MapPin size={14} style={{ color: "#e8b84b" }} />
          <span>Nashville, TN &bull; Serving the Greater Nashville Area</span>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <a
          href="#services"
          className="flex flex-col items-center gap-1 text-xs"
          style={{ color: "rgba(200,146,42,0.5)" }}
        >
          <span className="tracking-wider uppercase">Explore</span>
          <ChevronDown size={18} className="animate-bounce" />
        </a>
      </div>
    </section>
  );
}

function Services() {
  const services = [
    {
      icon: <PartyPopper size={28} style={{ color: "#e8b84b" }} />,
      title: "Wedding Catering",
      description: "From intimate ceremonies to grand receptions — rich, aromatic menus that make your wedding day unforgettable. Custom packages tailored to your guest count and vision.",
    },
    {
      icon: <Utensils size={28} style={{ color: "#e8b84b" }} />,
      title: "Corporate Events",
      description: "Professional catering for conferences, team lunches, client dinners, and company celebrations. Hot, fresh meals delivered and served on schedule.",
    },
    {
      icon: <Star size={28} style={{ color: "#e8b84b" }} />,
      title: "Private Celebrations",
      description: "Birthdays, anniversaries, graduations, and family gatherings. A full spread of authentic flavors that bring people together.",
    },
    {
      icon: <Clock size={28} style={{ color: "#e8b84b" }} />,
      title: "Custom Menus",
      description: "Every event has its own taste. Work with our team to build a menu that fits your occasion, dietary needs, and budget — no one-size-fits-all packages.",
    },
  ];

  return (
    <section id="services" className="py-20 px-5" style={{ background: "hsl(30 15% 8%)" }}>
      <div className="max-w-6xl mx-auto">
        <RevealSection className="text-center mb-14">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#e8b84b" }}>
            What We Offer
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4" style={{ color: "#f0e0b0" }}>
            Catering for Every Occasion
          </h2>
          <GoldDivider />
          <p className="text-base max-w-xl mx-auto mt-4" style={{ color: "rgba(180,155,115,0.8)" }}>
            We specialize in full-service catering that covers everything — from setup to service — so you can focus on your guests.
          </p>
        </RevealSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <RevealSection key={s.title} delay={i * 100}>
              <div
                className="p-6 rounded-lg card-hover h-full"
                style={{
                  background: "hsl(30 12% 11%)",
                  border: "1px solid rgba(200,146,42,0.15)",
                }}
                data-testid={`service-card-${i}`}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: "rgba(200,146,42,0.1)" }}
                >
                  {s.icon}
                </div>
                <h3 className="font-serif text-lg font-semibold mb-2" style={{ color: "#f0e0b0" }}>
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(180,155,115,0.8)" }}>
                  {s.description}
                </p>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-20 px-5" style={{ background: "hsl(30 14% 7%)" }}>
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <RevealSection>
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#e8b84b" }}>
              Our Story
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-5" style={{ color: "#f0e0b0" }}>
              Authentic Flavors, <br />
              <span style={{ background: "linear-gradient(135deg,#c8922a,#e8b84b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Crafted with Care
              </span>
            </h2>
            <GoldDivider />
            <p className="text-base leading-relaxed mt-5 mb-4" style={{ color: "rgba(200,175,130,0.85)" }}>
              Masala Bites is a Nashville-based catering service that brings the depth and warmth of South Asian cuisine to your most important events. Based at 2195 Nolensville Pike, we're rooted in the local community and proud to serve it.
            </p>
            <p className="text-base leading-relaxed mb-6" style={{ color: "rgba(200,175,130,0.85)" }}>
              Our kitchen operates with one goal: to turn your event into a genuinely memorable experience — from the first bite to the last. Whether you're hosting 20 guests or 200, we bring the same quality, attention, and passion to every table.
            </p>
            <a
              href={`tel:${PHONE}`}
              data-testid="about-call-link"
              className="inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-200"
              style={{ color: "#e8b84b" }}
            >
              <Phone size={16} />
              {PHONE_DISPLAY}
            </a>
          </RevealSection>

          <RevealSection delay={150}>
            <div
              className="rounded-xl overflow-hidden"
              style={{ border: "1px solid rgba(200,146,42,0.2)" }}
            >
              <div
                className="w-full flex items-center justify-center"
                style={{
                  height: "360px",
                  background: "linear-gradient(135deg, hsl(30 12% 11%) 0%, hsl(30 10% 13%) 100%)",
                }}
              >
                <div className="text-center p-8">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5"
                    style={{ background: "rgba(200,146,42,0.15)", border: "2px solid rgba(200,146,42,0.3)" }}
                  >
                    <Utensils size={36} style={{ color: "#e8b84b" }} />
                  </div>
                  <p className="font-serif text-2xl font-semibold mb-2" style={{ color: "#f0e0b0" }}>
                    Full-Service Catering
                  </p>
                  <p className="text-sm" style={{ color: "rgba(180,155,115,0.7)" }}>
                    Nashville, Tennessee
                  </p>
                  <div className="mt-6 pt-6" style={{ borderTop: "1px solid rgba(200,146,42,0.15)" }}>
                    <p className="text-xs tracking-wider uppercase mb-1" style={{ color: "rgba(200,146,42,0.6)" }}>
                      Serving
                    </p>
                    <p className="text-sm font-medium" style={{ color: "rgba(200,175,130,0.8)" }}>
                      Greater Nashville Area
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </RevealSection>
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  const points = [
    "Full-service catering — we handle setup, service, and cleanup",
    "Custom menus built around your event, guests, and preferences",
    "Experienced team that works quietly in the background so you can enjoy the moment",
    "On-time, professional service for events of all sizes",
    "Serving Nashville and surrounding areas with local familiarity",
    "Direct communication — no middlemen, no surprises",
  ];

  return (
    <section id="why" className="py-20 px-5" style={{ background: "hsl(30 15% 8%)" }}>
      <div className="max-w-5xl mx-auto">
        <RevealSection className="text-center mb-14">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#e8b84b" }}>
            Why Choose Us
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4" style={{ color: "#f0e0b0" }}>
            What Sets Masala Bites Apart
          </h2>
          <GoldDivider />
        </RevealSection>

        <div className="grid md:grid-cols-2 gap-5">
          {points.map((point, i) => (
            <RevealSection key={i} delay={i * 80}>
              <div
                className="flex items-start gap-4 p-5 rounded-lg card-hover"
                style={{
                  background: "hsl(30 12% 11%)",
                  border: "1px solid rgba(200,146,42,0.13)",
                }}
                data-testid={`why-point-${i}`}
              >
                <div
                  className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(200,146,42,0.15)" }}
                >
                  <Check size={13} style={{ color: "#e8b84b" }} />
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(200,175,130,0.85)" }}>
                  {point}
                </p>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function Credibility() {
  return (
    <section className="py-16 px-5" style={{ background: "hsl(30 14% 7%)" }}>
      <div className="max-w-5xl mx-auto">
        <RevealSection className="text-center mb-10">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#e8b84b" }}>
            Our Promise
          </p>
          <h2 className="font-serif text-2xl md:text-3xl font-semibold" style={{ color: "#f0e0b0" }}>
            A Catering Partner You Can Count On
          </h2>
        </RevealSection>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              label: "Locally Based",
              desc: "We're a Nashville business serving Nashville families, businesses, and institutions — not a distant franchise.",
              icon: <MapPin size={22} style={{ color: "#e8b84b" }} />,
            },
            {
              label: "Event-Ready Team",
              desc: "Our staff is trained for event service — punctual, professional, and discreet throughout your celebration.",
              icon: <Star size={22} style={{ color: "#e8b84b" }} />,
            },
            {
              label: "Made Fresh",
              desc: "Every dish is prepared fresh for your event. No pre-packaged shortcuts — real food, real ingredients, real flavor.",
              icon: <Utensils size={22} style={{ color: "#e8b84b" }} />,
            },
          ].map((item, i) => (
            <RevealSection key={i} delay={i * 100}>
              <div
                className="p-6 rounded-lg text-center card-hover"
                style={{
                  background: "hsl(30 12% 11%)",
                  border: "1px solid rgba(200,146,42,0.15)",
                }}
                data-testid={`credibility-card-${i}`}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: "rgba(200,146,42,0.1)" }}
                >
                  {item.icon}
                </div>
                <h3 className="font-serif text-lg font-semibold mb-2" style={{ color: "#f0e0b0" }}>
                  {item.label}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(180,155,115,0.8)" }}>
                  {item.desc}
                </p>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function Location() {
  return (
    <section id="location" className="py-20 px-5" style={{ background: "hsl(30 15% 8%)" }}>
      <div className="max-w-5xl mx-auto">
        <RevealSection className="text-center mb-12">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#e8b84b" }}>
            Find Us
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4" style={{ color: "#f0e0b0" }}>
            Based in Nashville, TN
          </h2>
          <GoldDivider />
          <p className="text-base mt-4" style={{ color: "rgba(180,155,115,0.8)" }}>
            Located on Nolensville Pike — and ready to serve events across the greater Nashville area.
          </p>
        </RevealSection>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <RevealSection>
            <div
              className="rounded-xl p-8"
              style={{ background: "hsl(30 12% 11%)", border: "1px solid rgba(200,146,42,0.15)" }}
            >
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: "rgba(200,146,42,0.12)" }}
                  >
                    <MapPin size={20} style={{ color: "#e8b84b" }} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider mb-1" style={{ color: "rgba(200,146,42,0.6)" }}>
                      Address
                    </p>
                    <p className="text-base font-medium" style={{ color: "#f0e0b0" }}>
                      2195 Nolensville Pike
                    </p>
                    <p className="text-sm" style={{ color: "rgba(180,155,115,0.8)" }}>
                      Nashville, TN 37211
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: "rgba(200,146,42,0.12)" }}
                  >
                    <Phone size={20} style={{ color: "#e8b84b" }} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider mb-1" style={{ color: "rgba(200,146,42,0.6)" }}>
                      Phone
                    </p>
                    <a
                      href={`tel:${PHONE}`}
                      data-testid="location-phone-link"
                      className="text-base font-medium transition-colors"
                      style={{ color: "#f0e0b0" }}
                      onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#e8b84b")}
                      onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#f0e0b0")}
                    >
                      {PHONE_DISPLAY}
                    </a>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href={GOOGLE_MAPS}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="location-directions-button"
                    className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded text-sm font-bold transition-all duration-200 hover:opacity-90"
                    style={{ background: "linear-gradient(135deg,#c8922a,#e8b84b)", color: "#1a0e06" }}
                  >
                    <MapPin size={16} />
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </div>
          </RevealSection>

          <RevealSection delay={120}>
            <div
              className="rounded-xl overflow-hidden"
              style={{ border: "1px solid rgba(200,146,42,0.15)", height: "280px", background: "hsl(30 12% 11%)" }}
            >
              <iframe
                title="Masala Bites Location"
                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY&q=2195+Nolensville+Pike,Nashville,TN+37211"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) saturate(1.5)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </RevealSection>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  const faqs = [
    {
      q: "How far in advance should I book?",
      a: "We recommend reaching out at least 2-4 weeks before your event, and earlier for large events like weddings. For last-minute requests, contact us and we'll do our best to accommodate.",
    },
    {
      q: "Do you accommodate dietary restrictions?",
      a: "Yes. We can work around vegetarian, vegan, gluten-free, and other dietary requirements. Just let us know when you reach out and we'll build your menu accordingly.",
    },
    {
      q: "What events do you cater?",
      a: "Weddings, corporate functions, birthday parties, anniversaries, graduation events, private dinners, and community gatherings. If you're in Nashville and feeding a group, we can help.",
    },
    {
      q: "Is there a minimum guest count?",
      a: "We cater events of various sizes. Reach out with your details and we'll find the right option for your headcount and budget.",
    },
    {
      q: "Do you provide staff and service at the event?",
      a: "Yes. Our full-service catering includes on-site staff who handle setup, service, and cleanup so you don't have to manage anything on the day.",
    },
  ];

  return (
    <section className="py-20 px-5" style={{ background: "hsl(30 14% 7%)" }}>
      <div className="max-w-3xl mx-auto">
        <RevealSection className="text-center mb-12">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#e8b84b" }}>
            FAQ
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold" style={{ color: "#f0e0b0" }}>
            Common Questions
          </h2>
        </RevealSection>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <RevealSection key={i} delay={i * 60}>
              <div
                className="rounded-lg overflow-hidden"
                style={{ border: "1px solid rgba(200,146,42,0.15)", background: "hsl(30 12% 11%)" }}
                data-testid={`faq-item-${i}`}
              >
                <button
                  className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 transition-colors duration-200"
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                >
                  <span className="font-medium text-sm" style={{ color: "#f0e0b0" }}>
                    {faq.q}
                  </span>
                  {open === i ? (
                    <ChevronUp size={16} style={{ color: "#e8b84b", flexShrink: 0 }} />
                  ) : (
                    <ChevronDown size={16} style={{ color: "rgba(200,146,42,0.5)", flexShrink: 0 }} />
                  )}
                </button>
                {open === i && (
                  <div
                    className="px-6 pb-5 text-sm leading-relaxed"
                    style={{ color: "rgba(180,155,115,0.85)", borderTop: "1px solid rgba(200,146,42,0.1)" }}
                  >
                    <div className="pt-4">{faq.a}</div>
                  </div>
                )}
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-20 px-5" style={{ background: "hsl(30 15% 8%)" }}>
      <div className="max-w-4xl mx-auto text-center">
        <RevealSection>
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#e8b84b" }}>
            Get In Touch
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-5" style={{ color: "#f0e0b0" }}>
            Ready to Book Your Event?
          </h2>
          <GoldDivider />
          <p className="text-base mt-6 mb-10 max-w-xl mx-auto" style={{ color: "rgba(180,155,115,0.8)" }}>
            Call us directly to discuss your event, get a quote, or ask any questions. We respond fast and keep the process simple.
          </p>
        </RevealSection>

        <RevealSection delay={100}>
          <div className="grid sm:grid-cols-2 gap-5 max-w-2xl mx-auto mb-10">
            <a
              href={`tel:${PHONE}`}
              data-testid="contact-call-button"
              className="flex flex-col items-center justify-center gap-2 py-6 px-6 rounded-xl transition-all duration-200 hover:opacity-90 hover:scale-105"
              style={{
                background: "linear-gradient(135deg,#c8922a,#e8b84b)",
                color: "#1a0e06",
              }}
            >
              <Phone size={24} />
              <span className="font-bold text-base">Call Now</span>
              <span className="text-sm font-medium opacity-80">{PHONE_DISPLAY}</span>
            </a>

            <a
              href={GOOGLE_MAPS}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="contact-directions-button"
              className="flex flex-col items-center justify-center gap-2 py-6 px-6 rounded-xl transition-all duration-200 hover:opacity-90 hover:scale-105"
              style={{
                background: "hsl(30 12% 11%)",
                border: "1.5px solid rgba(200,146,42,0.35)",
                color: "#e8b84b",
              }}
            >
              <MapPin size={24} />
              <span className="font-bold text-base">Get Directions</span>
              <span className="text-sm font-medium opacity-70">Nashville, TN</span>
            </a>
          </div>
        </RevealSection>

        <RevealSection delay={150}>
          <div
            className="inline-flex items-center gap-3 px-5 py-3 rounded-full"
            style={{ background: "rgba(200,146,42,0.08)", border: "1px solid rgba(200,146,42,0.2)" }}
          >
            <MapPin size={15} style={{ color: "#e8b84b" }} />
            <span className="text-sm" style={{ color: "rgba(200,175,130,0.8)" }}>
              {ADDRESS}
            </span>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      className="py-10 px-5"
      style={{ background: "hsl(30 15% 5%)", borderTop: "1px solid rgba(200,146,42,0.15)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
          <div>
            <p className="font-serif text-xl font-semibold mb-1" style={{ color: "#e8b84b" }}>
              Masala Bites
            </p>
            <p className="text-sm" style={{ color: "rgba(180,155,115,0.7)" }}>
              Full-Service Catering &bull; Nashville, TN
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={`tel:${PHONE}`}
              data-testid="footer-call-button"
              className="flex items-center gap-2 px-5 py-2.5 rounded text-sm font-bold transition-all hover:opacity-90"
              style={{ background: "linear-gradient(135deg,#c8922a,#e8b84b)", color: "#1a0e06" }}
            >
              <Phone size={15} />
              {PHONE_DISPLAY}
            </a>
            <a
              href={GOOGLE_MAPS}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="footer-directions-link"
              className="flex items-center gap-2 px-5 py-2.5 rounded text-sm font-medium transition-all hover:opacity-80"
              style={{ border: "1px solid rgba(200,146,42,0.3)", color: "#e8b84b" }}
            >
              <MapPin size={15} />
              Directions
            </a>
          </div>
        </div>

        <div
          className="pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
          style={{ borderTop: "1px solid rgba(200,146,42,0.12)" }}
        >
          <p className="text-xs" style={{ color: "rgba(180,155,115,0.5)" }}>
            &copy; {new Date().getFullYear()} Masala Bites. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: "rgba(180,155,115,0.5)" }}>
            {ADDRESS}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: "hsl(30 15% 8%)" }}>
      <NavBar />
      <Hero />
      <Services />
      <About />
      <WhyUs />
      <Credibility />
      <Location />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
}
