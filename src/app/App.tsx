import { useState, useEffect } from "react";
import { Phone, MessageCircle, MapPin, ChevronDown, X, Menu, Home, Star, ChevronLeft, ChevronRight } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────
type UnitStatus = "vacant" | "occupied" | "vacating";

interface Unit {
  type: string;
  status: UnitStatus;
  rent: string;
}

interface Floor {
  label: string;
  units: Unit[];
}

// ─── Data ────────────────────────────────────────────────────────────────────
const floors: Floor[] = [
  {
    label: "Ground Floor",
    units: [
      { type: "2BHK", status: "occupied", rent: "₹20,000" },
      { type: "Shop", status: "occupied", rent: "₹8,000" },
    ],
  },
  {
    label: "First Floor",
    units: [
      { type: "1BHK", status: "occupied", rent: "₹12,000" },
      { type: "2BHK", status: "occupied", rent: "₹20,000" },
    ],
  },
  {
    label: "Second Floor",
    units: [
      { type: "1BHK", status: "vacant", rent: "₹12,000" },
      { type: "2BHK", status: "vacating", rent: "₹20,000" },
    ],
  },
  {
    label: "Third Floor",
    units: [
      { type: "1BHK", status: "occupied", rent: "₹12,000" },
      { type: "2BHK", status: "occupied", rent: "₹20,000" },
    ],
  },
  {
    label: "Fourth Floor",
    units: [
      { type: "1BHK", status: "occupied", rent: "₹12,000" },
    ],
  },
];

const STATUS = {
  vacant: {
    bg: "bg-emerald-50", border: "border-emerald-300",
    dot: "bg-emerald-500", label: "Vacant", text: "text-emerald-700",
  },
  occupied: {
    bg: "bg-stone-100", border: "border-stone-200",
    dot: "bg-stone-400", label: "Occupied", text: "text-stone-500",
  },
  vacating: {
    bg: "bg-amber-50", border: "border-amber-300",
    dot: "bg-amber-400", label: "Vacating Soon", text: "text-amber-700",
  },
};

const amenities = [
  { icon: "🛗", label: "Lift", detail: "Full passenger lift" },
  { icon: "💧", label: "Dual Water", detail: "Cauvery + Borewell" },
  { icon: "🪑", label: "Semi-Furnished", detail: "Fans, geyser & fittings" },
  { icon: "🏠", label: "Friendly Owners", detail: "On-site, fast response" },
  { icon: "🔒", label: "Secure Entry", detail: "Main gate, common lobby" },
  { icon: "📍", label: "Prime Location", detail: "E City Phase 2 IT hub" },
];

const reviews = [
  {
    name: "Akshay Kumar",
    rating: 5,
    text: "Good House. I have never seen a house with this good ventilation. And the Vastu is perfect a East facing house, with Kitchen in South east, bedroom in south west and north west and pooja room facing each.",
    since: "3 hours ago",
  },
  {
    name: "Aditya Yenugu",
    rating: 5,
    text: "Good well maintained and well ventilated House",
    since: "3 weeks ago",
  },
  {
    name: "Nishanka Nayak",
    rating: 5,
    text: "Nice and kind owner, nice house overall.",
    since: "3 weeks ago",
  },
  {
    name: "Shubham ugalmugale",
    rating: 5,
    text: "The design and overall functionality of the building are highly impressive. The layout maximizes natural light beautifully, creating an inviting and productive environment.",
    since: "3 weeks ago",
  },
];

const faqs = [
  {
    q: "Is water supply 24/7?",
    a: "Yes — Bharathi Residency has dual water supply: Cauvery/Corporation piped water plus a dedicated borewell. You are covered even during BWSSB cuts — a real advantage in Electronic City.",
  },
  {
    q: "Is parking available?",
    a: "Yes, parking space is available for residents. Confirm the exact spot with the owners at the time of agreement.",
  },
  {
    q: "Are pets allowed?",
    a: "Please speak with Murali or Akshay directly — they are friendly, on-site owners happy to discuss your situation case by case.",
  },
  {
    q: "Is this a broker listing? Any brokerage fee?",
    a: "No. This is a 100% direct owner property. Zero brokerage — you deal directly with Murali Babu or Akshay Kumar. No middlemen, no commission.",
  },
  {
    q: "What documents do I need to move in?",
    a: "Aadhaar or PAN card, address proof, 2 passport-sized photographs, and police verification if required by your employer.",
  },
  {
    q: "Are flats semi-furnished?",
    a: "Yes — fans, light points, and geyser are provided. Exact count is confirmed at the time of viewing. Tenants bring their own furniture and appliances.",
  },
];

const galleryImages = [
  { src: "/furnished_living_room.png", alt: "Fully furnished living room with TV and sofa — Bharathi Residency" },
  { src: "/furnished_bedroom.png", alt: "Cozy furnished bedroom — Bharathi Residency" },
  { src: "/furnished_kitchen_6.png", alt: "Modern equipped kitchen with fridge — Bharathi Residency" },
  { src: "/furnished_entrance.png", alt: "Premium corridor entrance — Bharathi Residency" },
  { src: "/enhanced_8.png", alt: "Modern studio bathroom — Bharathi Residency" },
  { src: "/furnished_bedroom_17.png", alt: "Second cozy furnished bedroom — Bharathi Residency" },
];

const owners = [
  { name: "Murali Babu", phone: "9790377717", waNum: "919790377717" },
  { name: "Akshay Kumar M", phone: "9994400311", waNum: "919994400311" },
];

const WA_MSG = encodeURIComponent(
  "Hi, I'm interested in renting a flat at Bharathi Residency, Electronic City Phase 2. Could you share availability?"
);

// Exact coords from Google Maps: 12.8530744, 77.6842769
const MAP_EMBED = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d972.28!2d77.6836982!3d12.8530744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae6d002cf789cb%3A0xc975172e03380d32!2sBharathi%20Residency!5e0!3m2!1sen!2sin!4v1720000000000!5m2!1sen!2sin";
const MAPS_LINK = "https://maps.app.goo.gl/bfczbCaWLBpSSQXWA";

// ─── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", unit: "", timing: "" });
  const [submitted, setSubmitted] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (popupOpen || lightboxIndex !== null || menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [popupOpen, lightboxIndex, menuOpen]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    }, { rootMargin: "-20% 0px -70% 0px" });
    
    ["availability", "gallery", "terms", "reviews", "location", "contact"].forEach(s => {
      const el = document.getElementById(s);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("br_popup")) return;
    const t = setTimeout(() => setPopupOpen(true), 60000);
    return () => clearTimeout(t);
  }, []);

  const closePopup = () => {
    setPopupOpen(false);
    sessionStorage.setItem("br_popup", "1");
  };

  const handleEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `New Rental Enquiry — Bharathi Residency\nName: ${form.name}\nPhone: ${form.phone}\nUnit: ${form.unit}\nMove-in: ${form.timing}`
    );
    window.open(`https://wa.me/919994400311?text=${msg}`, "_blank");
    setSubmitted(true);
    setTimeout(closePopup, 2200);
  };
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    if (targetId === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const target = document.getElementById(targetId);
      if (target) {
        const top = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
    setMenuOpen(false);
  };

  return (
    <div className="w-full bg-background text-foreground" style={{ fontFamily: '"DM Sans", system-ui, sans-serif' }}>

      {/* ── NAV ── */}
      <nav className={`fixed top-0 inset-x-0 z-50 pt-2 transition-colors duration-300 ${menuOpen ? "bg-white/60 backdrop-blur-2xl shadow-lg border-b border-white/20" : ""}`}>
        {/* Blurry Frosted Glass Background Layer with Gradient Fade */}
        <div 
          className={`absolute top-0 inset-x-0 h-[88px] bg-white/20 backdrop-blur-md pointer-events-none transition-opacity duration-300 ${menuOpen ? "opacity-0" : "opacity-100"}`}
          style={{ maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)' }}
        />
        
        {/* Content Layer */}
        <div className="relative max-w-6xl mx-auto px-4 h-20 flex items-center justify-between gap-4">
          <a href="#top" onClick={(e) => handleNavClick(e, "#top")} className="flex items-center gap-3 font-display text-xl md:text-2xl font-bold text-primary shrink-0">
            <img src="/image.png" alt="Bharathi Residency Logo" className="w-10 h-10 md:w-12 md:h-12 object-contain rounded-lg" />
            Bharathi Residency
          </a>
          <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-foreground/80">
            {[["#availability", "Availability"], ["#gallery", "Gallery"], ["#terms", "Rent Terms"], ["#reviews", "Reviews"], ["#location", "Location"], ["#contact", "Contact"]].map(([href, label]) => {
              const isActive = activeSection === href.replace("#", "");
              return (
                <a key={href} href={href} onClick={(e) => handleNavClick(e, href)} className={`group relative py-1 hover:text-primary transition-colors ${isActive ? "text-primary" : ""}`}>
                  {label}
                  <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] bg-primary transition-all duration-300 rounded-full ${isActive ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-40"}`} />
                </a>
              );
            })}
          </div>
          <a
            href={`https://wa.me/919994400311?text=${WA_MSG}`}
            target="_blank" rel="noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 bg-primary text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors shrink-0 shadow-md hover:shadow-lg"
          >
            <MessageCircle size={15} /> WhatsApp
          </a>
          <button className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-border/50 px-4 pb-4 pt-2 flex flex-col gap-1">
            {[["#availability", "Availability"], ["#gallery", "Gallery"], ["#terms", "Rent Terms"], ["#reviews", "Reviews"], ["#location", "Location"], ["#contact", "Contact"]].map(([href, label]) => {
              const isActive = activeSection === href.replace("#", "");
              return (
                <a key={href} href={href} onClick={(e) => handleNavClick(e, href)}
                  className={`py-2.5 px-3 font-semibold text-sm rounded-lg transition-colors ${isActive ? "bg-primary/10 text-primary" : "hover:bg-muted"}`}>
                  {label}
                </a>
              );
            })}
            <a href={`https://wa.me/919994400311?text=${WA_MSG}`} target="_blank" rel="noreferrer"
              className="mt-2 flex items-center justify-center gap-2 bg-green-600 text-white font-semibold py-3 rounded-xl text-sm">
              <MessageCircle size={16} /> WhatsApp Now
            </a>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section id="top" className="relative min-h-[100svh] flex items-end overflow-hidden" style={{ paddingTop: 56 }}>
        <img
          src="https://images.unsplash.com/photo-1779976955613-b74623824d1c?w=1600&h=900&fit=crop&auto=format"
          alt="Bharathi Residency — residential apartments for rent in Electronic City Phase 2 Bengaluru"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 pb-16 md:pb-24">
          <p className="text-amber-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-2">
            Electronic City Phase 2 · Bengaluru
          </p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-2 max-w-xl">
            Flats for Rent in<br />Electronic City
          </h1>
          <p className="text-white/75 text-sm md:text-base max-w-lg mb-1">
            1BHK &amp; 2BHK semi-furnished flats. Lift · Dual water · Friendly owners on-site.
          </p>
          <p className="text-amber-300 font-semibold text-xs mb-5">Zero brokerage — direct owner rental.</p>
          <div className="flex flex-wrap gap-3">
            <a href="#availability"
              className="bg-amber-500 hover:bg-amber-400 text-white font-bold px-5 py-2.5 rounded-full text-sm transition-colors shadow-lg">
              Check Vacancy Now
            </a>
            <a href={`https://wa.me/919994400311?text=${WA_MSG}`} target="_blank" rel="noreferrer"
              className="bg-white/15 hover:bg-white/25 border border-white/40 text-white font-bold px-5 py-2.5 rounded-full text-sm transition-colors backdrop-blur-sm">
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* ── AMENITIES STRIP ── */}
      <section className="bg-primary text-white py-8 md:py-10">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 md:gap-6">
          {amenities.map((a) => (
            <div key={a.label} className="flex flex-col items-center text-center gap-2">
              <span className="text-3xl md:text-4xl mb-1">{a.icon}</span>
              <span className="font-bold text-sm">{a.label}</span>
              <span className="text-[11px] text-white/70 leading-snug hidden sm:block">{a.detail}</span>
            </div>
          ))}
        </div>
      </section>


      {/* ── AVAILABILITY ── */}
      <section id="availability" className="py-14 md:py-20 bg-background scroll-mt-14">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-8">
            <p className="text-xs font-bold tracking-[0.18em] uppercase text-muted-foreground mb-2">Live Availability</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold">Floor &amp; Unit Status</h2>
            <p className="text-muted-foreground mt-1.5 max-w-lg text-sm">
              Updated whenever a unit changes hands. Green = available to rent right now.
            </p>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 mb-6 text-sm font-medium">
            {(Object.entries(STATUS) as [UnitStatus, typeof STATUS[UnitStatus]][]).map(([key, s]) => (
              <div key={key} className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${s.dot}`} />
                <span>{s.label}</span>
              </div>
            ))}
          </div>

          {/* Desktop table */}
          <div className="hidden md:block rounded-2xl border border-border overflow-hidden">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted border-b border-border">
                  {["Floor", "Unit", "Status", "Deposit", "Rent", "Bills", ""].map((h) => (
                    <th key={h} className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-border">
                {floors.map((floor) =>
                  floor.units.map((unit, ui) => {
                    const s = STATUS[unit.status];
                    return (
                      <tr key={`${floor.label}-${ui}`} className="hover:bg-muted/30 transition-colors">
                        {ui === 0 && (
                          <td className="py-4 px-4 font-semibold text-sm align-top" rowSpan={floor.units.length}>
                            {floor.label}
                          </td>
                        )}
                        <td className="py-4 px-4 font-medium">{unit.type}</td>
                        <td className="py-4 px-4">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${s.bg} ${s.text} ${s.border}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                            {s.label}
                          </span>
                        </td>
                        <td className="py-4 px-4 font-semibold text-foreground text-sm">
                          {unit.status !== "occupied" ? (unit.type === "2BHK" ? "₹60,000" : unit.type === "1BHK" ? "₹30,000" : "—") : <span className="text-muted-foreground font-normal">—</span>}
                        </td>
                        <td className="py-4 px-4 font-bold text-foreground">
                          {unit.status !== "occupied" ? unit.rent : <span className="text-muted-foreground font-normal">—</span>}
                        </td>
                        <td className="py-4 px-4 text-xs text-muted-foreground">
                          {unit.status !== "occupied" && unit.type !== "Shop" ? "+ Elec. & Water" : ""}
                        </td>
                        <td className="py-4 px-4">
                          {unit.status !== "occupied" && (
                            <a href={`https://wa.me/919994400311?text=${encodeURIComponent(`Hi, I want to rent the ${unit.type} on ${floor.label} at Bharathi Residency. Is it available?`)}`}
                              target="_blank" rel="noreferrer"
                              className="text-xs font-semibold text-primary hover:underline whitespace-nowrap">
                              Enquire →
                            </a>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile stacked cards */}
          <div className="md:hidden space-y-3">
            {floors.map((floor) => (
              <div key={floor.label} className="rounded-2xl border border-border overflow-hidden bg-white">
                <div className="bg-muted px-4 py-3 font-bold text-sm">{floor.label}</div>
                <div className="divide-y divide-border">
                  {floor.units.map((unit, ui) => {
                    const s = STATUS[unit.status];
                    return (
                      <div key={ui} className="px-4 py-3.5">
                        <div className="flex items-center justify-between gap-3">
                          <span className="font-semibold text-sm">{unit.type}</span>
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${s.bg} ${s.text} ${s.border}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                            {s.label}
                          </span>
                        </div>
                        {unit.status !== "occupied" && (
                          <div className="flex items-center justify-between mt-1.5">
                            <div>
                              <div className="font-bold text-foreground text-sm">
                                {unit.type === "2BHK" ? "₹60k Deposit" : unit.type === "1BHK" ? "₹30k Deposit" : ""}
                              </div>
                              <div className="text-xs text-foreground mt-0.5">
                                <span className="font-semibold">{unit.rent}</span><span className="text-muted-foreground">/mo {unit.type !== "Shop" && "+ Bills"}</span>
                              </div>
                            </div>
                            <a href={`https://wa.me/919994400311?text=${encodeURIComponent(`Hi, I want to rent the ${unit.type} on ${floor.label} at Bharathi Residency. Is it available?`)}`}
                              target="_blank" rel="noreferrer"
                              className="text-xs font-bold text-green-600 underline">
                              Chat Now
                            </a>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 text-xs text-muted-foreground font-medium px-2">
            * Electricity is billed as per BESCOM. Water is metered at 15 paisa per liter.
          </div>

          <div className="mt-5 flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-2xl p-4 text-sm text-amber-900">
            <span className="text-xl shrink-0">💬</span>
            <p>
              <strong>Interested in renting?</strong> Call or WhatsApp{" "}
              <a href="tel:+919790377717" className="font-bold underline">Murali — 9790377717</a> or{" "}
              <a href="tel:+919994400311" className="font-bold underline">Akshay — 9994400311</a> to book a visit. No brokers.
            </p>
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section id="gallery" className="py-14 md:py-20 bg-muted/50 scroll-mt-14">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-8">
            <p className="text-xs font-bold tracking-[0.18em] uppercase text-muted-foreground mb-2">Photos</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold">Inside Bharathi Residency</h2>
            <p className="text-muted-foreground mt-1.5 text-sm">Unit-specific photos available on request — WhatsApp the owners.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {galleryImages.map((img, i) => (
              <div 
                key={i}
                className={`${i === 0 ? "col-span-2 " : ""}rounded-2xl overflow-hidden bg-muted cursor-pointer`}
                style={{ aspectRatio: i === 0 ? "16/9" : "4/3" }}
                onClick={() => setLightboxIndex(i)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700"
                />
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-4">
            More photos of kitchen, bathroom & common areas —{" "}
            <a href={`https://wa.me/919994400311?text=${WA_MSG}`} target="_blank" rel="noreferrer" className="text-primary font-semibold underline">
              request on WhatsApp
            </a>
          </p>
        </div>
      </section>

      {/* ── RENT TERMS ── */}
      <section id="terms" className="py-14 md:py-20 bg-background scroll-mt-14">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-4">
            <p className="text-xs font-bold tracking-[0.18em] uppercase text-muted-foreground mb-2">For Prospective Tenants</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold">Rent Terms &amp; Conditions</h2>
          </div>
          <div className="mb-7 bg-amber-50 border-l-4 border-amber-400 rounded-r-xl pl-4 pr-3 py-3 text-sm text-amber-900 leading-relaxed">
            <strong>Note:</strong> This is a summary of standard rental terms — not the final legal agreement. A fully signed rental agreement on stamp paper, registered per Karnataka norms, is prepared for each tenant at the time of move-in.
          </div>
          <div className="grid sm:grid-cols-2 gap-3 mb-7">
            {[
              { label: "Monthly Rent — 1BHK", value: "₹12,000 / mo", note: "Payable on or before the 10th of every month" },
              { label: "Monthly Rent — 2BHK", value: "₹20,000 / mo", note: "Payable on or before the 10th of every month" },
              { label: "Electricity & Water", value: "Tenant's account", note: "Electricity as per BESCOM. Water is charged at 15 paisa per liter." },
              { label: "Rental Period", value: "11 months", note: "Renewable by mutual consent" },
              { label: "Rent on Renewal", value: "+5% per cycle", note: "Standard enhancement at each renewal" },
              { label: "Notice Period", value: "1 month", note: "Either party must give 1 month's advance notice" },
              { label: "Painting Charges", value: "1 month's rent", note: "Deducted from deposit or paid at vacating" },
              { label: "Damages", value: "Tenant's liability", note: "Repair costs deducted from deposit if unpaid" },
              { label: "Usage", value: "Residential only", note: "No subletting or unauthorised alterations" },
            ].map((item) => (
              <div key={item.label} className="bg-muted/50 border border-border rounded-2xl p-4">
                <p className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground mb-1">{item.label}</p>
                <p className="font-display text-lg font-bold text-foreground">{item.value}</p>
                <p className="text-xs text-muted-foreground mt-1 leading-snug">{item.note}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-primary/5 border border-primary/15 rounded-2xl p-5">
              <h3 className="font-bold mb-3 text-primary text-sm uppercase tracking-wider">Documents to Move In</h3>
              <ul className="space-y-2 text-sm">
                {["Aadhaar card or PAN card (ID proof)", "Address proof", "2 passport-sized photographs", "Police verification (if required)"].map((d) => (
                  <li key={d} className="flex items-start gap-2">
                    <span className="text-primary font-bold mt-0.5 shrink-0">✓</span> {d}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-secondary border border-primary/10 rounded-2xl p-5">
              <h3 className="font-bold mb-3 text-primary text-sm uppercase tracking-wider">What&apos;s Provided</h3>
              <ul className="space-y-2 text-sm">
                {[
                  "Fans (count confirmed at viewing)",
                  "Geyser (1 for 1BHK, 2 for 2BHK)",
                  "Ceiling light points throughout",
                  "Electricity + water connection",
                  "Bedrooms & Bathrooms (2BHK: 2 Bed, 2 Bath | 1BHK: 1 Bed, 1 Bath)",
                  "Balcony (available in 2BHK)"
                ].map((d) => (
                  <li key={d} className="flex items-start gap-2">
                    <span className="text-primary font-bold mt-0.5 shrink-0">✓</span> {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section id="reviews" className="py-14 md:py-20 bg-muted/50 scroll-mt-14">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold tracking-[0.18em] uppercase text-muted-foreground mb-2">What Tenants Say</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold">Tenant Reviews</h2>
            </div>
            <a
              href={MAPS_LINK}
              target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 border border-border bg-white text-foreground font-semibold px-4 py-2.5 rounded-full text-sm hover:bg-muted transition-colors shrink-0"
            >
              <Star size={14} className="text-amber-400 fill-amber-400" />
              See all reviews on Google
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {reviews.map((r) => (
              <div key={r.name} className="bg-white border border-border rounded-2xl p-5 flex flex-col gap-3">
                <div className="flex items-center gap-1">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed flex-1">&ldquo;{r.text}&rdquo;</p>
                <div className="border-t border-border pt-3 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-sm">{r.name}</p>
                    <p className="text-xs text-muted-foreground">{r.since}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                    {r.name[0]}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground mb-3">Happy in your flat? A Google review goes a long way — it helps other tenants find us.</p>
            <a href={MAPS_LINK} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-white font-bold px-5 py-2.5 rounded-full text-sm hover:bg-primary/90 transition-colors">
              Leave a Review on Google
            </a>
          </div>
        </div>
      </section>

      {/* ── LOCATION ── */}
      <section id="location" className="py-14 md:py-20 bg-background scroll-mt-14">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-8">
            <p className="text-xs font-bold tracking-[0.18em] uppercase text-muted-foreground mb-2">Getting Here</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold">Location &amp; Connectivity</h2>
            <p className="text-muted-foreground text-sm mt-1.5">Bharathi Residency · Electronic City Phase 2 · Bengaluru — 12.8531°N, 77.6843°E</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <div className="rounded-2xl overflow-hidden border border-border mb-4 bg-muted" style={{ aspectRatio: "4/3" }}>
                <iframe
                  title="Bharathi Residency — exact location Electronic City Phase 2 Bengaluru"
                  src={MAP_EMBED}
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <a href={MAPS_LINK} target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-white font-bold px-5 py-2.5 rounded-full text-sm hover:bg-primary/90 transition-colors">
                <MapPin size={15} /> Get Directions
              </a>
            </div>
            <div>
              <h3 className="font-bold text-base mb-3">What&apos;s Nearby</h3>
              <div className="divide-y divide-border border border-border rounded-2xl overflow-hidden bg-white">
                {[
                  { icon: "🏢", place: "Electronic City Phase 1 & 2 Tech Parks", dist: "5–10 min walk / auto" },
                  { icon: "🛣️", place: "NICE Road & Hosur Road", dist: "2–3 min drive" },
                  { icon: "🚌", place: "BMTC Bus Stop (Phase 2)", dist: "~3 min walk" },
                  { icon: "🏥", place: "Narayana Health / Aster Hospital", dist: "10–15 min drive" },
                  { icon: "🛒", place: "Supermarkets & Local Market", dist: "5 min walk" },
                  { icon: "🏫", place: "Schools in Electronic City", dist: "10–15 min drive" },
                ].map((l) => (
                  <div key={l.place} className="flex items-start gap-3 px-4 py-3">
                    <span className="text-lg shrink-0">{l.icon}</span>
                    <div>
                      <p className="font-semibold text-sm">{l.place}</p>
                      <p className="text-xs text-muted-foreground">{l.dist}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2.5 px-1">
                Ideal for professionals at Infosys, Wipro, HCL, or any Phase 2 tech park — minutes from your desk.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-14 md:py-20 bg-muted/50">
        <div className="max-w-3xl mx-auto px-4">
          <div className="mb-8">
            <p className="text-xs font-bold tracking-[0.18em] uppercase text-muted-foreground mb-2">Common Questions</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold">FAQ</h2>
          </div>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-border rounded-2xl overflow-hidden bg-white">
                <button
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-semibold text-sm hover:bg-muted/40 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span>{faq.q}</span>
                  <ChevronDown size={17} className={`shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed border-t border-border pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-14 md:py-20 bg-primary text-white scroll-mt-14">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-8">
            <p className="text-xs font-bold tracking-[0.18em] uppercase text-white/50 mb-2">Direct Owner Contact</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold">Rent Directly from Owners</h2>
            <p className="text-white/70 mt-2 max-w-lg text-sm">
              We are on-site friendly owners — call or WhatsApp any time. No brokers, no commission, no middlemen.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {owners.map((o) => (
              <div key={o.name} className="bg-white/10 border border-white/15 rounded-2xl p-6">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mb-3 text-lg">👤</div>
                <p className="font-display text-xl font-bold mb-0.5">{o.name}</p>
                <p className="text-white/60 text-sm mb-4">{o.phone}</p>
                <div className="flex gap-3 flex-wrap">
                  <a href={`tel:+91${o.phone}`}
                    className="inline-flex items-center gap-2 bg-white text-primary font-bold px-5 py-2.5 rounded-full text-sm hover:bg-white/90 transition-colors">
                    <Phone size={14} /> Call
                  </a>
                  <a href={`https://wa.me/${o.waNum}?text=${WA_MSG}`} target="_blank" rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-green-500 text-white font-bold px-5 py-2.5 rounded-full text-sm hover:bg-green-400 transition-colors">
                    <MessageCircle size={14} /> WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white/10 border border-white/15 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="font-bold mb-0.5">⭐ Read Google Reviews</p>
              <p className="text-white/60 text-sm">See what our current and past tenants say about living here.</p>
            </div>
            <a href={MAPS_LINK} target="_blank" rel="noreferrer"
              className="shrink-0 bg-white text-primary font-bold px-5 py-2.5 rounded-full text-sm hover:bg-white/90 transition-colors">
              View on Google Maps
            </a>
          </div>
          <p className="text-white/30 text-xs mt-6">
            📍 Bharathi Residency · Electronic City Phase 2 · Bengaluru, Karnataka · 12.8531°N 77.6843°E
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-foreground text-background/50 py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-3 text-xs">
          <div className="flex items-center gap-2 mb-1">
            <img src="/image.png" alt="Bharathi Residency Logo" className="w-8 h-8 object-contain bg-white rounded-full p-1 opacity-90" />
            <span className="font-display font-bold text-base text-background/70 tracking-wide">Bharathi Residency</span>
          </div>
          <p className="text-center">© {new Date().getFullYear()} Bharathi Residency · Electronic City Phase 2 · Bengaluru <br className="sm:hidden" /> — Direct Owner Rental · No Brokerage</p>
          <p className="text-background/40">
            Made with ❤️ by Akshay ·{" "}
            <a href="tel:+919994400311" className="hover:text-background/70 transition-colors">9994400311</a>
          </p>
        </div>
      </footer>

      {/* ── FLOATING PHONE ICON (MOBILE) ── */}
      <a 
        href="tel:+919994400311"
        className="fixed bottom-6 right-5 z-40 md:hidden bg-primary text-white p-3.5 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.3)] hover:scale-105 active:scale-95 transition-transform"
      >
        <Phone size={26} />
      </a>

      {/* ── ENQUIRY POPUP ── */}
      {popupOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-y-auto max-h-[95vh]">
            <div className="bg-primary px-6 py-6 relative">
              <button onClick={closePopup} className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors p-1">
                <X size={18} />
              </button>
              <div className="flex items-center gap-3 mb-4">
                <img src="/image.png" alt="Logo" className="w-10 h-10 object-contain bg-white rounded-full p-1 shadow-sm" />
                <p className="text-white/90 text-xs font-bold uppercase tracking-wider leading-snug">Bharathi Residency <br/><span className="font-normal text-white/70">Electronic City Phase 2</span></p>
              </div>
              <h3 className="font-display text-xl font-bold text-white leading-snug">
                Looking for a flat for rent nearby?
              </h3>
              <p className="text-white/80 text-sm mt-1.5">Tell us what you need — we&apos;ll call you back today.</p>
            </div>
            {submitted ? (
              <div className="px-6 py-10 text-center">
                <div className="text-5xl mb-3">✅</div>
                <p className="font-bold text-lg mb-1">Sent!</p>
                <p className="text-muted-foreground text-sm">Opening WhatsApp — Akshay will reply shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleEnquiry} className="px-6 py-5 space-y-3">
                <input required placeholder="Your Name" value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-border rounded-xl px-4 py-3 text-sm bg-input-background focus:outline-none focus:ring-2 focus:ring-primary/25" />
                <input required type="tel" placeholder="Phone Number" value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full border border-border rounded-xl px-4 py-3 text-sm bg-input-background focus:outline-none focus:ring-2 focus:ring-primary/25" />
                <select required value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })}
                  className="w-full border border-border rounded-xl px-4 py-3 text-sm bg-input-background focus:outline-none focus:ring-2 focus:ring-primary/25">
                  <option value="">Preferred Unit</option>
                  <option>1BHK — ₹12,000/mo</option>
                  <option>2BHK — ₹20,000/mo</option>
                  <option>Shop</option>
                </select>
                <select required value={form.timing} onChange={(e) => setForm({ ...form, timing: e.target.value })}
                  className="w-full border border-border rounded-xl px-4 py-3 text-sm bg-input-background focus:outline-none focus:ring-2 focus:ring-primary/25">
                  <option value="">Move-in Timeframe</option>
                  <option>Immediately</option>
                  <option>Within 1 month</option>
                  <option>1–3 months</option>
                  <option>Just exploring</option>
                </select>
                <button type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-400 text-white font-bold py-3.5 rounded-xl transition-colors text-sm">
                  Send Rental Enquiry via WhatsApp
                </button>
                <button type="button" onClick={closePopup} className="w-full text-sm text-muted-foreground py-1 hover:underline">
                  No thanks, I&apos;ll browse on my own
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ── LIGHTBOX ── */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4" onClick={() => setLightboxIndex(null)}>
          <button 
            onClick={() => setLightboxIndex(null)}
            className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/10 p-2 rounded-full backdrop-blur-md"
          >
            <X size={24} />
          </button>
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) => prev! === 0 ? galleryImages.length - 1 : prev! - 1);
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-white/10 p-2 rounded-full backdrop-blur-md"
          >
            <ChevronLeft size={32} />
          </button>
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) => prev! === galleryImages.length - 1 ? 0 : prev! + 1);
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-white/10 p-2 rounded-full backdrop-blur-md"
          >
            <ChevronRight size={32} />
          </button>
          
          <div className="flex flex-col items-center max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <img 
              src={galleryImages[lightboxIndex].src} 
              alt={galleryImages[lightboxIndex].alt}
              className="max-h-[85vh] object-contain rounded-lg shadow-2xl"
            />
            <p className="text-white/80 mt-4 text-center font-medium text-lg">
              {galleryImages[lightboxIndex].alt.split('—')[0]}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
