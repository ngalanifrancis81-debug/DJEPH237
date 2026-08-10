import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, Mail, MessageCircle, ChevronDown, X, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { mailtoGeneric, whatsappGeneric } from "@/lib/contact";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goSearch = () => {
    setOpen(false);
    if (location.pathname !== "/") navigate("/", { state: { scrollTo: "recherche" } });
    else {
      const el = document.getElementById("recherche");
      if (window.__lenis && el) window.__lenis.scrollTo(el, { offset: -80 });
      else el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const solid = scrolled || location.pathname !== "/";

  const links = [
    { label: "Accueil", to: "/" },
    { label: "Projets", action: goSearch },
    { label: "Cours de langue", to: "/cours" },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        solid ? "bg-white/90 backdrop-blur-xl border-b border-ink/10 py-3" : "bg-transparent py-5"
      }`}
      data-testid="site-header"
    >
      <nav className="max-w-7xl mx-auto px-5 lg:px-10 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5 shrink-0" data-testid="logo-link">
          <img
            src="https://customer-assets-eiarnc6j.emergentagent.net/job_widad-innovate/artifacts/3cyjn1kk_wiv_logo_v4_fond_sombre-removebg-preview%20%281%29.png"
            alt="Widad International Volunteers"
            className="h-11 w-auto"
          />
          <span className={`hidden sm:block font-display font-bold leading-tight text-[15px] ${solid ? "text-ink" : "text-ink"}`}>
            Widad<span className="text-brand">.</span>
            <span className="block text-[11px] font-semibold text-muted-foreground -mt-0.5">International Volunteers</span>
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {links.map((l) =>
            l.to ? (
              <Link key={l.label} to={l.to} className="text-[15px] font-semibold text-ink/80 hover:text-brand transition-colors" data-testid={`nav-${l.label}`}>
                {l.label}
              </Link>
            ) : (
              <button key={l.label} onClick={l.action} className="text-[15px] font-semibold text-ink/80 hover:text-brand transition-colors" data-testid={`nav-${l.label}`}>
                {l.label}
              </button>
            )
          )}
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-brand hover:bg-brand-hover text-white text-sm font-bold px-5 py-2.5 transition-colors" data-testid="contact-cta-dropdown">
                Nous contacter <ChevronDown className="w-4 h-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <a href={mailtoGeneric()} data-testid="cta-email-item" className="cursor-pointer font-semibold">
                  <Mail className="w-4 h-4 mr-2 text-brand" /> Par e-mail
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href={whatsappGeneric()} target="_blank" rel="noopener noreferrer" data-testid="cta-whatsapp-item" className="cursor-pointer font-semibold">
                  <MessageCircle className="w-4 h-4 mr-2 text-[#25D366]" /> Par WhatsApp
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button className="lg:hidden grid place-items-center w-11 h-11 rounded-2xl border border-ink/10 text-ink" data-testid="mobile-menu-btn" aria-label="Menu">
                <Menu className="w-5 h-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[86vw] max-w-sm p-0">
              <div className="flex items-center justify-between px-6 py-5 border-b">
                <span className="font-display font-bold text-ink">Menu</span>
                <button onClick={() => setOpen(false)} data-testid="mobile-close-btn" aria-label="Fermer"><X className="w-5 h-5" /></button>
              </div>
              <div className="flex flex-col px-6 py-6 gap-1">
                <button onClick={goSearch} className="flex items-center gap-2 text-left py-3 text-lg font-display font-semibold text-ink hover:text-brand" data-testid="mobile-nav-search"><Search className="w-5 h-5" /> Rechercher un projet</button>
                <Link to="/" onClick={() => setOpen(false)} className="py-3 text-lg font-display font-semibold text-ink hover:text-brand" data-testid="mobile-nav-home">Accueil</Link>
                <Link to="/cours" onClick={() => setOpen(false)} className="py-3 text-lg font-display font-semibold text-ink hover:text-brand" data-testid="mobile-nav-courses">Cours de langue</Link>
                <div className="mt-6 flex flex-col gap-3">
                  <a href={mailtoGeneric()} className="inline-flex items-center justify-center gap-2 rounded-full bg-white border border-ink/10 text-ink px-5 py-3 font-bold" data-testid="mobile-cta-email"><Mail className="w-4 h-4" /> Par e-mail</a>
                  <a href={whatsappGeneric()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] text-white px-5 py-3 font-bold" data-testid="mobile-cta-whatsapp"><MessageCircle className="w-4 h-4" /> WhatsApp</a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
