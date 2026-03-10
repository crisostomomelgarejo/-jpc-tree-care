import { useState, useEffect, useRef } from "react";
import {
  Phone, Mail, MapPin, Star, Shield, Award, Clock,
  Scissors, TreePine, Tractor, ChevronRight, Globe,
  CheckCircle, Zap, Users, Camera, Video, Image,
  ArrowRight, Quote, Menu, X, Play, Leaf
} from "lucide-react";

// ─── BRAND PALETTE ────────────────────────────────
const B = {
  brown: "#4A2C0A",
  brownLight: "#6B3F10",
  brownDark: "#2E1A06",
  greenDark: "#1B5E2F",
  greenMid: "#2E7D32",
  greenLight: "#7CB342",
  greenPale: "#F1F8E9",
  greenAccent: "#8BC34A",
  offWhite: "#FAFAF7",
  lightGray: "#F4F0EC",
  text: "#1C0F05",
  textMuted: "#7A5C42",
  textLight: "#B08060",
};

// ─── TRANSLATIONS ────────────────────────────────────────────────────────────
const T = {
  en: {
    nav: { call: "Call Now", estimate: "Free Estimate" },
    hero: {
      eyebrow: "Serving Chicago's Western Suburbs Since 2009",
      h1a: "Your Trees.",
      h1b: "Our Craft.",
      sub: "Expert removal, pruning & lot clearing — safe, insured, and done right.",
      cta1: "Get Free Estimate",
      cta2: "Call (630) 449-7923",
      t1: "Fully Insured",
      t2: "Free Estimates",
      t3: "Same-Day Response",
      t4: "15+ Years",
    },
    stats: [
      { n: "15+", label: "Years in Business" },
      { n: "2,000+", label: "Trees Removed" },
      { n: "5★", label: "Google Rating" },
      { n: "100%", label: "Insured & Licensed" },
    ],
    services: {
      title: "What We Do",
      sub: "Three core services, delivered with precision and care.",
      items: [
        { title: "Pruning & Trimming", desc: "Shape and strengthen your trees for health, safety, and curb appeal.", tag: "Most Popular", img: "/images/service_pruning.png" },
        { title: "Tree Removal", desc: "Safe, efficient removal of any tree — no job too large or dangerous.", tag: "Emergency Available", img: "/images/service_removal.png" },
        { title: "Lot Clearing", desc: "Full land clearing for construction, landscaping, or reclaiming your space.", tag: "Free Quote", img: "/images/service_clearing.png" },
      ],
    },
    why: {
      title: "Why Choose JPC?",
      items: [
        { icon: Shield, title: "Fully Insured", desc: "Complete liability and worker's comp. You're always protected." },
        { icon: Zap, title: "Fast Response", desc: "Same-day callbacks. Storm emergency? We mobilize fast." },
        { icon: Users, title: "Local & Family-Owned", desc: "Based in Montgomery, IL. We know this region's trees deeply." },
      ],
    },
    work: {
      title: "Our Work",
      sub: "Before & after — results speak louder than words.",
    },
    reviews: {
      title: "Real Customers. Real Results.",
      items: [
        { name: "Maria G.", city: "Naperville", text: "Removed a massive oak threatening our roof. Professional, clean, and fairly priced. Best tree service in the suburbs." },
        { name: "Tom R.", city: "Aurora", text: "Trimmed a dozen trees in one day. The crew was on time, respectful, and results look incredible." },
        { name: "Linda P.", city: "Wheaton", text: "Three downed trees after the storm. JPC came next day, handled everything safely. Five stars doesn't do it justice." },
      ],
    },
    areas: {
      title: "We Come to You",
      sub: "Serving 35+ communities across Chicago's western suburbs.",
      cities: ["Aurora", "Naperville", "Wheaton", "Bolingbrook", "Oswego", "Montgomery", "Geneva", "St. Charles", "Batavia", "Lisle", "Downers Grove", "Plainfield", "Romeoville", "Lombard", "Elmhurst", "Schaumburg", "Elgin", "Carol Stream", "Bartlett", "Yorkville"],
    },
    form: {
      title: "Get Your Free Estimate",
      sub: "Takes 30 seconds. We'll call you back within the hour.",
      name: "Your Name",
      phone: "Phone Number",
      service: "Service Needed",
      services: ["Select a service…", "Pruning & Trimming", "Tree Removal", "Lot Clearing", "Storm Damage", "Other"],
      btn: "Request Free Estimate",
      sent: "We got it! Expect a call within the hour.",
      or: "Or call us directly:",
    },
    footer: "© 2024 JPC Tree Care LLC · 1079 Sard Ave, Montgomery IL 60538 · All rights reserved.",
    floatCta: "Call Now",
  },
  es: {
    nav: { call: "Llamar", estimate: "Presupuesto Gratis" },
    hero: {
      eyebrow: "Sirviendo los Suburbios Occidentales desde 2009",
      h1a: "Tus Árboles.",
      h1b: "Nuestro Arte.",
      sub: "Remoción, poda y limpieza de terrenos — seguro, asegurado y bien hecho.",
      cta1: "Presupuesto Gratis",
      cta2: "Llamar (630) 449-7923",
      t1: "Totalmente Asegurado",
      t2: "Presupuestos Gratis",
      t3: "Respuesta el Mismo Día",
      t4: "15+ Años",
    },
    stats: [
      { n: "15+", label: "Años de Servicio" },
      { n: "2,000+", label: "Árboles Removidos" },
      { n: "5★", label: "Calificación Google" },
      { n: "100%", label: "Asegurado y Licenciado" },
    ],
    services: {
      title: "Lo Que Hacemos",
      sub: "Tres servicios principales, con precisión y cuidado profesional.",
      items: [
        { title: "Poda y Recorte", desc: "Dale forma y salud a tus árboles para mayor seguridad y belleza.", tag: "Más Popular", img: "/images/service_pruning.png" },
        { title: "Remoción de Árboles", desc: "Remoción segura y eficiente de cualquier árbol.", tag: "Emergencias Disponibles", img: "/images/service_removal.png" },
        { title: "Limpieza de Terrenos", desc: "Limpieza total para construcción, paisajismo o recuperación de terrenos.", tag: "Cotización Gratis", img: "/images/service_clearing.png" },
      ],
    },
    why: {
      title: "¿Por Qué JPC?",
      items: [
        { icon: Shield, title: "Totalmente Asegurado", desc: "Cobertura completa de responsabilidad. Siempre protegido." },
        { icon: Zap, title: "Respuesta Rápida", desc: "Llamadas el mismo día. ¿Emergencia por tormenta? Respondemos." },
        { icon: Users, title: "Empresa Familiar Local", desc: "Con sede en Montgomery, IL. Conocemos los árboles de la región." },
      ],
    },
    work: {
      title: "Nuestro Trabajo",
      sub: "Antes y después — los resultados hablan solos.",
    },
    reviews: {
      title: "Clientes Reales. Resultados Reales.",
      items: [
        { name: "Maria G.", city: "Naperville", text: "Removieron un enorme roble que amenazaba nuestro techo. Profesionales, limpios y precio justo. El mejor servicio de árboles." },
        { name: "Tom R.", city: "Aurora", text: "Podaron una docena de árboles en un día. El equipo llegó a tiempo y los resultados se ven increíbles." },
        { name: "Linda P.", city: "Wheaton", text: "Tres árboles caídos tras la tormenta. JPC llegó al día siguiente. Cinco estrellas se queda corto." },
      ],
    },
    areas: {
      title: "Llegamos a Ti",
      sub: "Sirviendo más de 35 comunidades en los suburbios occidentales de Chicago.",
      cities: ["Aurora", "Naperville", "Wheaton", "Bolingbrook", "Oswego", "Montgomery", "Geneva", "St. Charles", "Batavia", "Lisle", "Downers Grove", "Plainfield", "Romeoville", "Lombard", "Elmhurst", "Schaumburg", "Elgin", "Carol Stream", "Bartlett", "Yorkville"],
    },
    form: {
      title: "Tu Presupuesto Gratis",
      sub: "30 segundos. Te llamamos en menos de una hora.",
      name: "Tu Nombre",
      phone: "Número de Teléfono",
      service: "Servicio Necesario",
      services: ["Selecciona un servicio…", "Poda y Recorte", "Remoción de Árboles", "Limpieza de Terrenos", "Daño por Tormenta", "Otro"],
      btn: "Solicitar Presupuesto Gratis",
      sent: "¡Recibido! Espera una llamada en menos de una hora.",
      or: "O llámanos directamente:",
    },
    footer: "© 2024 JPC Tree Care LLC · 1079 Sard Ave, Montgomery IL 60538 · Todos los derechos reservados.",
    floatCta: "Llamar",
  },
};

// ─── SCROLL FADE HOOK ─────────────────────────────────────────────────────────
function Fade({ children, className = "", delay = 0, style = {} }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.08 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      ...style,
    }}>
      {children}
    </div>
  );
}

// ─── LOGO COMPONENT ─────────────────────────────────────
// Nota: Reemplaza las URLs (logo-icon.png y logo-full.png) por los nombres reales de tus archivos.
function Logo({ height = 44, darkBg = false, iconOnly = false }) {
  if (iconOnly) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {/* 🚨 TODO: REPLACE "/logo-icon.png" WITH YOUR SQUARE ICON 🚨 */}
        <img
          src="/logo-icon.png"
          alt="JPC Tree Care Icon"
          style={{ height, width: height, objectFit: "contain", filter: darkBg ? "brightness(0) invert(1)" : "none", background: "rgba(139,195,74,0.3)", borderRadius: 8 }}
        />
        <span className="desk-only" style={{ fontFamily: "Outfit", fontWeight: 800, fontSize: 18, color: darkBg ? "white" : B.brown }}>JPC TREE CARE</span>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      {/* 🚨 TODO: REPLACE "/logo-full.png" WITH YOUR FULL RECTANGULAR LOGO 🚨 */}
      <img
        src="/logo-full.png"
        alt="JPC Tree Care LLC"
        style={{ height, width: "auto", objectFit: "contain", filter: darkBg ? "brightness(0) invert(1)" : "none", background: "rgba(255,255,255,0.8)", borderRadius: 8, padding: 4 }}
      />
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [lang, setLang] = useState("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const t = T[lang];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };

  return (
    <div style={{ fontFamily: "'Libre Baskerville', Georgia, serif", color: B.text, overflowX: "hidden", background: B.offWhite }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Outfit:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        .outfit { font-family: 'Outfit', sans-serif; }
        .baskerville { font-family: 'Libre Baskerville', Georgia, serif; }
        ::selection { background: ${B.greenMid}; color: white; }

        .btn-cta {
          background: ${B.brown};
          color: white;
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          transition: all 0.18s ease;
          box-shadow: 0 3px 18px rgba(74,44,10,0.28);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .btn-cta:hover { background: ${B.brownLight}; transform: translateY(-2px); box-shadow: 0 8px 28px rgba(74,44,10,0.38); }

        .btn-green {
          background: ${B.greenDark};
          color: white;
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          transition: all 0.18s ease;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .btn-green:hover { background: ${B.greenMid}; transform: translateY(-2px); }

        .btn-ghost {
          background: transparent;
          color: white;
          font-family: 'Outfit', sans-serif;
          font-weight: 600;
          border-radius: 6px;
          border: 2px solid rgba(255,255,255,0.45);
          cursor: pointer;
          transition: all 0.18s ease;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .btn-ghost:hover { border-color: white; background: rgba(255,255,255,0.1); }

        .svc-card { transition: all 0.22s ease; cursor: default; }
        .svc-card:hover { transform: translateY(-5px); box-shadow: 0 20px 50px rgba(74,44,10,0.12) !important; }

        .pill { transition: all 0.15s ease; cursor: default; }
        .pill:hover { background: ${B.greenDark} !important; color: white !important; border-color: ${B.greenDark} !important; transform: scale(1.04); }

        .lang-btn {
          font-family: 'Outfit', sans-serif; font-weight: 600; font-size: 13px;
          background: transparent; cursor: pointer; transition: all 0.15s;
          display: flex; align-items: center; gap: 5px; border-radius: 6px; padding: 7px 14px;
        }

        input, select, textarea {
          font-family: 'Outfit', sans-serif; background: rgba(255,255,255,0.06); color: white;
          border: 1.5px solid rgba(255,255,255,0.15); border-radius: 8px; padding: 13px 16px;
          font-size: 15px; width: 100%; transition: border-color 0.2s, box-shadow 0.2s;
        }
        input:focus, select:focus, textarea:focus { outline: none; border-color: ${B.greenAccent}; box-shadow: 0 0 0 3px rgba(139,195,74,0.15); }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.35); }
        select option { background: ${B.brownDark}; color: white; }

        @keyframes heroIn { from { opacity:0; transform:translateY(32px); } to { opacity:1; transform:translateY(0); } }
        .h1 { animation: heroIn 0.9s ease 0.1s both; }
        .h2 { animation: heroIn 0.9s ease 0.3s both; }
        .h3 { animation: heroIn 0.9s ease 0.5s both; }
        .h4 { animation: heroIn 0.9s ease 0.65s both; }
        .h5 { animation: heroIn 0.9s ease 0.8s both; }

        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.4} }
        .blink { animation: blink 2.2s ease infinite; }

        @media (max-width: 768px) { .desk-only { display: none !important; } }
        @media (min-width: 769px) { .mob-only { display: none !important; } }
      `}</style>

      {/* STICKY HEADER */}
      <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: scrolled ? "rgba(250,250,247,0.96)" : "transparent", backdropFilter: scrolled ? "blur(14px)" : "none", borderBottom: scrolled ? `1px solid rgba(74,44,10,0.08)` : "none", boxShadow: scrolled ? "0 2px 24px rgba(74,44,10,0.07)" : "none", transition: "all 0.3s ease" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 clamp(16px, 4vw, 24px)", height: 72, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Logo height={scrolled ? 42 : 46} darkBg={!scrolled} iconOnly={true} />

          <div className="desk-only" style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button onClick={() => scrollTo("services")} style={{ background: "none", border: "none", cursor: "pointer", color: scrolled ? B.textMuted : "rgba(255,255,255,0.75)", fontSize: 14, fontFamily: "'Outfit',sans-serif", fontWeight: 500, padding: "6px 10px" }}>{t.nav.estimate === "Free Estimate" ? "Services" : "Servicios"}</button>
            <button onClick={() => scrollTo("testimonials")} style={{ background: "none", border: "none", cursor: "pointer", color: scrolled ? B.textMuted : "rgba(255,255,255,0.75)", fontSize: 14, fontFamily: "'Outfit',sans-serif", fontWeight: 500, padding: "6px 10px" }}>{lang === "en" ? "Reviews" : "Reseñas"}</button>
            <button onClick={() => scrollTo("areas")} style={{ background: "none", border: "none", cursor: "pointer", color: scrolled ? B.textMuted : "rgba(255,255,255,0.75)", fontSize: 14, fontFamily: "'Outfit',sans-serif", fontWeight: 500, padding: "6px 10px" }}>{lang === "en" ? "Areas" : "Áreas"}</button>
            <div style={{ width: 1, height: 24, background: scrolled ? "rgba(74,44,10,0.15)" : "rgba(255,255,255,0.2)", margin: "0 6px" }} />
            <button onClick={() => setLang(lang === "en" ? "es" : "en")} className="lang-btn" style={{ border: `1.5px solid ${scrolled ? B.greenDark : "rgba(255,255,255,0.35)"}`, color: scrolled ? B.greenDark : "white" }}><Globe size={13} /> {lang === "en" ? "ES" : "EN"}</button>
            <a href="tel:6304497923" className="btn-cta" style={{ padding: "10px 20px", fontSize: 14 }}><Phone size={13} /> (630) 449-7923</a>
            <button onClick={() => scrollTo("contact")} className="btn-green" style={{ padding: "10px 18px", fontSize: 14 }}>{t.nav.estimate}</button>
          </div>

          <div className="mob-only" style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button onClick={() => setLang(lang === "en" ? "es" : "en")} style={{ background: "none", border: "none", cursor: "pointer", color: scrolled ? B.greenDark : "white", padding: 4 }}><Globe size={18} /></button>
            <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", cursor: "pointer", color: scrolled ? B.brown : "white", padding: 4 }}>{menuOpen ? <X size={24} /> : <Menu size={24} />}</button>
          </div>
        </div>

        {menuOpen && (
          <div style={{ background: B.offWhite, borderTop: `1px solid rgba(74,44,10,0.1)`, padding: "16px 24px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
            {[["services", lang === "en" ? "Services" : "Servicios"], ["testimonials", lang === "en" ? "Reviews" : "Reseñas"], ["areas", lang === "en" ? "Areas" : "Áreas"], ["contact", lang === "en" ? "Free Estimate" : "Presupuesto"]].map(([id, label]) => (
              <button key={id} onClick={() => scrollTo(id)} style={{ textAlign: "left", background: "none", border: "none", cursor: "pointer", color: B.textMuted, fontFamily: "'Outfit',sans-serif", fontWeight: 600, fontSize: 16, padding: "8px 0", borderBottom: `1px solid rgba(74,44,10,0.07)` }}>{label}</button>
            ))}
            <a href="tel:6304497923" className="btn-cta" style={{ padding: "13px 20px", fontSize: 15, justifyContent: "center", marginTop: 4 }}><Phone size={15} /> (630) 449-7923</a>
          </div>
        )}
      </header>

      {/* HERO */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <img src="/images/hero_background.png" alt="Arborist at work" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, rgba(26,14,4,0.9) 0%, rgba(27,94,47,0.75) 55%, rgba(12,8,3,0.92) 100%)` }} />
        </div>

        <div style={{ position: "relative", zIndex: 10, maxWidth: 1120, margin: "0 auto", padding: "clamp(100px, 15vw, 140px) clamp(16px, 4vw, 24px) clamp(60px, 10vw, 90px)", width: "100%" }}>
          <div className="h1" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(139,195,74,0.25)", borderRadius: 100, padding: "6px 16px", marginBottom: 28 }}>
            <span className="blink" style={{ width: 7, height: 7, borderRadius: "50%", background: B.greenAccent, display: "inline-block" }} />
            <span className="outfit" style={{ color: "rgba(255,255,255,0.8)", fontSize: 13, fontWeight: 500 }}>{t.hero.eyebrow}</span>
          </div>

          <div className="h2" style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Logo height={120} darkBg={true} iconOnly={false} />
            </div>
            <h1 className="baskerville" style={{ fontSize: "clamp(48px, 8vw, 98px)", color: "white", lineHeight: 0.95, margin: 0, maxWidth: 720 }}>
              {t.hero.h1a}<br /><em style={{ color: B.greenAccent, fontStyle: "italic" }}>{t.hero.h1b}</em>
            </h1>
          </div>

          <p className="h3 outfit" style={{ color: "rgba(255,255,255,0.78)", fontSize: "clamp(16px, 2vw, 20px)", lineHeight: 1.55, marginBottom: 38, maxWidth: 520 }}>{t.hero.sub}</p>

          <div className="h4" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 44 }}>
            <button onClick={() => scrollTo("contact")} className="btn-cta" style={{ padding: "15px 30px", fontSize: 16 }}>{t.hero.cta1} <ArrowRight size={17} /></button>
            <a href="tel:6304497923" className="btn-ghost" style={{ padding: "15px 28px", fontSize: 16 }}><Phone size={15} /> {t.hero.cta2}</a>
          </div>

          <div className="h5" style={{ display: "flex", flexWrap: "wrap", gap: "10px 24px" }}>
            {[t.hero.t1, t.hero.t2, t.hero.t3, t.hero.t4].map((b, i) => (
              <span key={i} className="outfit" style={{ display: "flex", alignItems: "center", gap: 7, color: "rgba(255,255,255,0.7)", fontSize: 13, fontWeight: 500 }}><CheckCircle size={13} color={B.greenAccent} /> {b}</span>
            ))}
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80, background: `linear-gradient(to bottom, transparent, ${B.offWhite})`, zIndex: 5 }} />
      </section>

      {/* STATS BAR */}
      <section style={{ background: B.brown, padding: "32px 24px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 8 }}>
          {t.stats.map((s, i) => (
            <Fade key={i} delay={i * 70}>
              <div style={{ textAlign: "center", padding: "10px 0" }}>
                <div className="outfit" style={{ fontSize: 42, fontWeight: 800, color: "white", lineHeight: 1 }}>{s.n}</div>
                <div className="outfit" style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, fontWeight: 500, marginTop: 3, letterSpacing: "0.04em", textTransform: "uppercase" }}>{s.label}</div>
              </div>
            </Fade>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ padding: "clamp(60px, 10vw, 100px) clamp(16px, 4vw, 24px)", background: B.offWhite }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <Fade>
            <div style={{ marginBottom: 60 }}>
              <span className="outfit" style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", color: B.greenDark, textTransform: "uppercase" }}>Services</span>
              <h2 className="baskerville" style={{ fontSize: "clamp(30px, 5vw, 50px)", margin: "10px 0 12px", color: B.brown }}>{t.services.title}</h2>
              <p className="outfit" style={{ color: B.textMuted, fontSize: 17, maxWidth: 420 }}>{t.services.sub}</p>
            </div>
          </Fade>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {t.services.items.map((svc, i) => {
              const icons = [Scissors, TreePine, Tractor];
              const Icon = icons[i];
              return (
                <Fade key={i} delay={i * 90}>
                  <div className="svc-card" style={{ background: "white", borderRadius: 16, overflow: "hidden", boxShadow: "0 4px 24px rgba(74,44,10,0.07)", border: `1px solid rgba(74,44,10,0.07)` }}>
                    <img src={svc.img} alt={svc.title} style={{ width: "100%", height: 200, objectFit: "cover" }} />
                    <div style={{ padding: "22px 24px 26px" }}>
                      <span className="outfit" style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", color: B.greenDark, textTransform: "uppercase" }}>{svc.tag}</span>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "9px 0 10px" }}>
                        <div style={{ width: 34, height: 34, borderRadius: 8, background: B.greenPale, display: "flex", alignItems: "center", justifyContent: "center" }}><Icon size={17} color={B.greenDark} /></div>
                        <h3 className="baskerville" style={{ fontSize: 20, margin: 0, color: B.brown }}>{svc.title}</h3>
                      </div>
                      <p className="outfit" style={{ color: B.textMuted, lineHeight: 1.6, marginBottom: 18, fontSize: 14 }}>{svc.desc}</p>
                      <button onClick={() => scrollTo("contact")} style={{ display: "flex", alignItems: "center", gap: 5, color: B.greenDark, fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: 13, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                        {lang === "en" ? "Get Free Quote" : "Cotización Gratis"} <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                </Fade>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE JPC */}
      <section style={{ padding: "clamp(50px, 8vw, 80px) clamp(16px, 4vw, 24px)", background: B.lightGray }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <Fade><h2 className="baskerville" style={{ fontSize: "clamp(26px, 4vw, 42px)", textAlign: "center", marginBottom: 50, color: B.brown }}>{t.why.title}</h2></Fade>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 18 }}>
            {t.why.items.map(({ icon: Icon, title, desc }, i) => (
              <Fade key={i} delay={i * 80}>
                <div style={{ background: "white", borderRadius: 14, padding: "26px", border: `1px solid rgba(74,44,10,0.08)`, display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div style={{ width: 42, height: 42, borderRadius: 10, background: B.greenPale, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon size={20} color={B.greenDark} /></div>
                  <div>
                    <h3 className="outfit" style={{ margin: "0 0 5px", fontSize: 16, fontWeight: 700, color: B.brown }}>{title}</h3>
                    <p className="outfit" style={{ margin: 0, color: B.textMuted, fontSize: 14, lineHeight: 1.6 }}>{desc}</p>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO GALLERY */}
      <section id="work" style={{ padding: "clamp(60px, 10vw, 100px) clamp(16px, 4vw, 24px)", background: B.offWhite }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <Fade>
            <div style={{ marginBottom: 48 }}>
              <span className="outfit" style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", color: B.greenDark, textTransform: "uppercase" }}>Portfolio</span>
              <h2 className="baskerville" style={{ fontSize: "clamp(28px, 4vw, 46px)", margin: "10px 0 10px", color: B.brown }}>{t.work.title}</h2>
              <p className="outfit" style={{ color: B.textMuted, fontSize: 16 }}>{t.work.sub}</p>
            </div>
          </Fade>

          {/* Mosaic Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 14 }}>
            <img src="/images/gallery_main.png" alt="Arborist climbing tree" style={{ width: "100%", height: 350, objectFit: "cover", borderRadius: 16 }} />
            <img src="/images/gallery_before.png" alt="Tree care before" style={{ width: "100%", height: 350, objectFit: "cover", borderRadius: 16 }} />
            <img src="/images/gallery_after.png" alt="Tree team working" style={{ width: "100%", height: 350, objectFit: "cover", borderRadius: 16 }} />
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" style={{ padding: "clamp(60px, 10vw, 96px) clamp(16px, 4vw, 24px)", background: B.lightGray }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <Fade>
            <div style={{ textAlign: "center", marginBottom: 52 }}>
              <div style={{ display: "flex", justifyContent: "center", gap: 4, marginBottom: 14 }}>{[...Array(5)].map((_, i) => <Star key={i} size={20} fill={B.greenDark} color={B.greenDark} />)}</div>
              <h2 className="baskerville" style={{ fontSize: "clamp(26px, 4vw, 44px)", color: B.brown, marginBottom: 6 }}>{t.reviews.title}</h2>
            </div>
          </Fade>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
            {t.reviews.items.map((r, i) => (
              <Fade key={i} delay={i * 80}>
                <div style={{ background: "white", borderRadius: 16, padding: "26px", border: `1px solid rgba(74,44,10,0.07)`, position: "relative" }}>
                  <Quote size={26} style={{ position: "absolute", top: 18, right: 18, color: B.greenDark, opacity: 0.1 }} />
                  <div style={{ display: "flex", gap: 2, marginBottom: 14 }}>{[...Array(5)].map((_, s) => <Star key={s} size={13} fill={B.greenDark} color={B.greenDark} />)}</div>
                  <p className="outfit" style={{ color: B.textMuted, lineHeight: 1.65, marginBottom: 20, fontSize: 14, fontStyle: "italic" }}>"{r.text}"</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 38, height: 38, borderRadius: "50%", background: B.greenPale, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Camera size={13} color={B.greenDark} opacity={0.5} /></div>
                    <div>
                      <div className="outfit" style={{ fontWeight: 700, fontSize: 13, color: B.brown }}>{r.name}</div>
                      <div className="outfit" style={{ fontSize: 12, color: B.textLight }}>{r.city}</div>
                    </div>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICE AREAS */}
      <section id="areas" style={{ padding: "clamp(50px, 8vw, 80px) clamp(16px, 4vw, 24px)", background: B.offWhite }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", textAlign: "center" }}>
          <Fade>
            <span className="outfit" style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", color: B.greenDark, textTransform: "uppercase" }}>Coverage</span>
            <h2 className="baskerville" style={{ fontSize: "clamp(26px, 4vw, 44px)", margin: "10px 0 10px", color: B.brown }}>{t.areas.title}</h2>
            <p className="outfit" style={{ color: B.textMuted, marginBottom: 36, fontSize: 16 }}>{t.areas.sub}</p>
          </Fade>
          <Fade delay={80}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
              {t.areas.cities.map((city, i) => <span key={i} className="pill outfit" style={{ padding: "8px 18px", borderRadius: 100, border: `1.5px solid ${B.greenDark}`, color: B.greenDark, fontSize: 13, fontWeight: 600 }}>{city}</span>)}
              <span className="outfit" style={{ padding: "8px 18px", borderRadius: 100, background: B.lightGray, color: B.textLight, fontSize: 13, fontWeight: 500 }}>+15 {lang === "en" ? "more" : "más"}…</span>
            </div>
          </Fade>
        </div>
      </section>

      {/* CONTACT / LEAD FORM */}
      <section id="contact" style={{ padding: "clamp(60px, 10vw, 100px) clamp(16px, 4vw, 24px)", background: B.brownDark, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(ellipse at 85% 15%, rgba(27,94,47,0.35) 0%, transparent 55%), radial-gradient(ellipse at 5% 90%, rgba(139,195,74,0.08) 0%, transparent 45%)`, pointerEvents: "none" }} />
        <div style={{ maxWidth: 1120, margin: "0 auto", position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "clamp(30px, 8vw, 60px)", alignItems: "center" }}>
          <Fade>
            <div>
              <span className="outfit" style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", color: B.greenAccent, textTransform: "uppercase" }}>Contact</span>
              <h2 className="baskerville" style={{ fontSize: "clamp(28px, 4vw, 46px)", color: "white", margin: "12px 0 10px" }}>{t.form.title}</h2>
              <p className="outfit" style={{ color: "rgba(255,255,255,0.55)", marginBottom: 32, fontSize: 16 }}>{t.form.sub}</p>
              {submitted ? (
                <div style={{ background: "rgba(139,195,74,0.1)", border: `1.5px solid rgba(139,195,74,0.3)`, borderRadius: 12, padding: 30, textAlign: "center" }}>
                  <CheckCircle size={38} color={B.greenAccent} style={{ marginBottom: 12 }} />
                  <p className="outfit" style={{ color: "white", fontWeight: 600, fontSize: 17 }}>{t.form.sent}</p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} style={{ display: "flex", flexDirection: "column", gap: 13 }}>
                  <input required placeholder={t.form.name} />
                  <input required type="tel" placeholder={t.form.phone} />
                  <select required>{t.form.services.map((s, i) => <option key={i} value={i === 0 ? "" : s}>{s}</option>)}</select>
                  <button type="submit" className="btn-cta" style={{ padding: "15px", fontSize: 16, justifyContent: "center", marginTop: 4, borderRadius: 8 }}>{t.form.btn} <ArrowRight size={17} /></button>
                  <p className="outfit" style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, textAlign: "center", margin: 0 }}>{t.form.or} <a href="tel:6304497923" style={{ color: B.greenAccent, fontWeight: 700, textDecoration: "none" }}>(630) 449-7923</a></p>
                </form>
              )}
            </div>
          </Fade>
          <Fade delay={140}>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div style={{ display: "flex", justifyContent: "center", padding: "20px 0 8px" }}><Logo height={64} darkBg={true} /></div>
              <img src="/images/team_photo.png" alt="JPC Team" style={{ width: "100%", height: 220, objectFit: "cover", borderRadius: 14 }} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[
                  { Icon: Phone, val: "(630) 449-7923", href: "tel:6304497923" },
                  { Icon: Mail, val: "jpctree@gmail.com", href: "mailto:jpctree@gmail.com" },
                  { Icon: MapPin, val: "1079 Sard Ave, Montgomery IL", href: null },
                  { Icon: Clock, val: "Mon–Sat: 7am – 6pm", href: null },
                ].map(({ Icon, val, href }, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: "12px 14px" }}>
                    <Icon size={14} color={B.greenAccent} style={{ marginTop: 2, flexShrink: 0 }} />
                    {href ? <a href={href} className="outfit" style={{ color: "rgba(255,255,255,0.8)", fontSize: 13, fontWeight: 500, textDecoration: "none", lineHeight: 1.3 }}>{val}</a> : <span className="outfit" style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, lineHeight: 1.3 }}>{val}</span>}
                  </div>
                ))}
              </div>
            </div>
          </Fade>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#0d0903", padding: "24px", textAlign: "center" }}>
        <div style={{ marginBottom: 10 }}><Logo height={36} darkBg={true} /></div>
        <p className="outfit" style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, margin: 0 }}>{t.footer}</p>
      </footer>

      {/* FLOATING MOBILE CTA (Calls app opens instantly) */}
      <a href="tel:6304497923" className="btn-cta mob-only" style={{ position: "fixed", bottom: 20, left: "50%", transform: "translateX(-50%)", padding: "14px 30px", fontSize: 15, borderRadius: 100, zIndex: 200, boxShadow: "0 8px 32px rgba(74,44,10,0.4)", whiteSpace: "nowrap" }}>
        <Phone size={15} /> {t.floatCta}: (630) 449-7923
      </a>
    </div>
  );
}