import React from "react";
import { Link } from "react-router-dom";
import { Mail, MessageCircle, MapPin } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { NGO_EMAIL, WHATSAPP_NUMBER, LOCATION, whatsappLink } from "@/lib/contact";

export default function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 bg-ink text-white" data-testid="site-footer">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2 max-w-sm">
          <div className="flex items-center gap-3">
            <span className="grid place-items-center w-11 h-11 rounded-xl bg-brand font-display font-semibold text-lg">
              WIV
            </span>
            <span className="font-display text-lg leading-tight">
              Widad International
              <br /> Volunteers
            </span>
          </div>
          <p className="mt-6 text-white/60 text-base leading-relaxed">{t.footer.tagline}</p>
        </div>

        <div>
          <h4 className="font-display text-sm uppercase tracking-widest text-white/40 mb-4">
            {t.footer.quickLinks}
          </h4>
          <ul className="space-y-3 text-white/75">
            <li><Link to="/" className="hover:text-brand transition-colors" data-testid="footer-link-home">{t.nav.home}</Link></li>
            <li><Link to="/#programs" className="hover:text-brand transition-colors" data-testid="footer-link-programs">{t.nav.programs}</Link></li>
            <li><Link to="/don" className="hover:text-brand transition-colors" data-testid="footer-link-donate">{t.nav.donate}</Link></li>
            <li><Link to="/contact" className="hover:text-brand transition-colors" data-testid="footer-link-contact">{t.nav.contact}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm uppercase tracking-widest text-white/40 mb-4">
            {t.footer.contactTitle}
          </h4>
          <ul className="space-y-3 text-white/75">
            <li>
              <a href={`mailto:${NGO_EMAIL}`} className="flex items-center gap-2 hover:text-brand transition-colors break-all" data-testid="footer-email">
                <Mail className="w-4 h-4 shrink-0" /> {NGO_EMAIL}
              </a>
            </li>
            <li>
              <a href={whatsappLink("WIV")} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-wa transition-colors" data-testid="footer-whatsapp">
                <MessageCircle className="w-4 h-4 shrink-0" /> +237 677 958 119
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4 shrink-0" /> {LOCATION}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-white/50">
          <p>© {year} Widad International Volunteers. {t.footer.rights}</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-white/80 transition-colors cursor-pointer">{t.footer.legal}</span>
            <span className="hover:text-white/80 transition-colors cursor-pointer">{t.footer.privacy}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
