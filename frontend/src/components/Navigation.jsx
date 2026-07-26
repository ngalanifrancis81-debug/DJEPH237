import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, Mail, MessageCircle, ChevronDown, Globe, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useLang } from "@/i18n/LanguageContext";
import { NGO_EMAIL, mailtoLink, whatsappLink } from "@/lib/contact";

export default function Navigation() {
  const { t, lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (window.__lenis) window.__lenis.scrollTo(el, { offset: -90 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  const goToSection = (id) => {
    setMobileOpen(false);
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: id } });
    } else {
      scrollToId(id);
    }
  };

  const links = [
    { label: t.nav.home, action: () => goToSection("top") },
    { label: t.nav.approach, action: () => goToSection("esprit") },
    { label: t.nav.programs, action: () => goToSection("programs") },
    { label: t.nav.incubator, action: () => goToSection("incubator") },
    { label: t.nav.coliving, action: () => goToSection("coliving") },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "glass border-b border-gray-200/60 py-3" : "bg-transparent py-5"
      }`}
      data-testid="site-header"
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between gap-6">
        <Link to="/" onClick={() => goToSection("top")} className="flex items-center gap-3 shrink-0" data-testid="logo-link">
          <span className="grid place-items-center w-10 h-10 rounded-xl bg-brand text-white font-display font-semibold">
            WIV
          </span>
          <span className="hidden sm:block font-display font-medium text-ink leading-tight text-sm">
            Widad International
            <br /> Volunteers
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-7">
          {links.map((l) => (
            <button
              key={l.label}
              onClick={l.action}
              className="text-sm font-medium text-ink/80 hover:text-brand transition-colors"
              data-testid={`nav-${l.label}`}
            >
              {l.label}
            </button>
          ))}
          <Link to="/don" className="text-sm font-medium text-ink/80 hover:text-brand transition-colors" data-testid="nav-donate-link">
            {t.nav.donate}
          </Link>
          <Link to="/contact" className="text-sm font-medium text-ink/80 hover:text-brand transition-colors" data-testid="nav-contact-link">
            {t.nav.contact}
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setLang(lang === "fr" ? "en" : "fr")}
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-ink/70 hover:text-brand transition-colors px-2 py-1"
            data-testid="lang-switch"
            aria-label="Switch language"
          >
            <Globe className="w-4 h-4" />
            {lang === "fr" ? "FR" : "EN"}
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-brand hover:bg-brand-hover text-white text-sm font-medium px-5 py-2.5 transition-colors"
                data-testid="contact-cta-dropdown"
              >
                {t.nav.contactCta}
                <ChevronDown className="w-4 h-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuItem asChild>
                <a href={mailtoLink("WIV", lang)} data-testid="cta-email-item" className="cursor-pointer">
                  <Mail className="w-4 h-4 mr-2 text-brand" /> {t.nav.byEmail}
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href={whatsappLink("WIV", lang)} target="_blank" rel="noopener noreferrer" data-testid="cta-whatsapp-item" className="cursor-pointer">
                  <MessageCircle className="w-4 h-4 mr-2 text-wa" /> {t.nav.byWhatsapp}
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile burger */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button className="lg:hidden grid place-items-center w-10 h-10 rounded-xl border border-gray-200 text-ink" data-testid="mobile-menu-btn" aria-label="Menu">
                <Menu className="w-5 h-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[86vw] max-w-sm p-0">
              <div className="flex items-center justify-between px-6 py-5 border-b">
                <span className="font-display font-medium text-ink">Menu</span>
                <button onClick={() => setMobileOpen(false)} data-testid="mobile-close-btn" aria-label="Close"><X className="w-5 h-5" /></button>
              </div>
              <div className="flex flex-col px-6 py-6 gap-1">
                {links.map((l) => (
                  <button key={l.label} onClick={l.action} className="text-left py-3 text-lg font-display text-ink hover:text-brand transition-colors" data-testid={`mobile-nav-${l.label}`}>
                    {l.label}
                  </button>
                ))}
                <Link to="/don" onClick={() => setMobileOpen(false)} className="py-3 text-lg font-display text-ink hover:text-brand transition-colors" data-testid="mobile-nav-donate">{t.nav.donate}</Link>
                <Link to="/contact" onClick={() => setMobileOpen(false)} className="py-3 text-lg font-display text-ink hover:text-brand transition-colors" data-testid="mobile-nav-contact">{t.nav.contact}</Link>

                <button onClick={() => setLang(lang === "fr" ? "en" : "fr")} className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-ink/70" data-testid="mobile-lang-switch">
                  <Globe className="w-4 h-4" /> {lang === "fr" ? "Français → English" : "English → Français"}
                </button>

                <div className="mt-6 flex flex-col gap-3">
                  <a href={mailtoLink("WIV", lang)} className="inline-flex items-center justify-center gap-2 rounded-full bg-white border border-gray-200 text-ink px-5 py-3 font-medium" data-testid="mobile-cta-email">
                    <Mail className="w-4 h-4" /> {t.nav.byEmail}
                  </a>
                  <a href={whatsappLink("WIV", lang)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-wa text-white px-5 py-3 font-medium" data-testid="mobile-cta-whatsapp">
                    <MessageCircle className="w-4 h-4" /> {t.nav.byWhatsapp}
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
