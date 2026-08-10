import React from "react";
import { Link } from "react-router-dom";
import { Mail, MessageCircle, MapPin } from "lucide-react";
import { NGO_EMAIL, WHATSAPP_DISPLAY, LOCATION, mailtoGeneric, whatsappGeneric } from "@/lib/contact";

const COUNTRIES = [
  ["cameroun", "Cameroun"], ["mali", "Mali"], ["nigeria", "Nigeria"], ["senegal", "Sénégal"],
  ["maroc", "Maroc"], ["benin", "Bénin"], ["burkina-faso", "Burkina Faso"], ["niger", "Niger"],
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative z-10 bg-ink text-white" data-testid="site-footer">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2.5">
            <img
              src="https://customer-assets-eiarnc6j.emergentagent.net/job_widad-innovate/artifacts/3cyjn1kk_wiv_logo_v4_fond_sombre-removebg-preview%20%281%29.png"
              alt="Widad International Volunteers"
              className="h-12 w-auto"
            />
          </div>
          <p className="mt-5 text-white/60 leading-relaxed text-sm">
            Volontariat, entrepreneuriat solidaire et cours de langues locales à travers l'Afrique.
          </p>
        </div>

        <div>
          <h4 className="font-display font-bold text-sm uppercase tracking-wider text-white/40 mb-4">Projets par pays</h4>
          <ul className="grid grid-cols-2 gap-2 text-white/75 text-sm">
            {COUNTRIES.map(([slug, name]) => (
              <li key={slug}><Link to={`/pays/${slug}`} className="hover:text-brand transition-colors" data-testid={`footer-country-${slug}`}>{name}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold text-sm uppercase tracking-wider text-white/40 mb-4">Navigation</h4>
          <ul className="space-y-2.5 text-white/75 text-sm">
            <li><Link to="/" className="hover:text-brand transition-colors">Accueil</Link></li>
            <li><Link to="/cours" className="hover:text-brand transition-colors" data-testid="footer-courses">Cours de langue</Link></li>
            <li><a href={mailtoGeneric()} className="hover:text-brand transition-colors">Nous contacter</a></li>
            <li><span className="text-white/40">Mentions légales</span></li>
            <li><span className="text-white/40">Politique de confidentialité</span></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold text-sm uppercase tracking-wider text-white/40 mb-4">Contact</h4>
          <ul className="space-y-3 text-white/75 text-sm">
            <li><a href={mailtoGeneric()} className="flex items-center gap-2 hover:text-brand transition-colors break-all" data-testid="footer-email"><Mail className="w-4 h-4 shrink-0" /> {NGO_EMAIL}</a></li>
            <li><a href={whatsappGeneric()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#25D366] transition-colors" data-testid="footer-whatsapp"><MessageCircle className="w-4 h-4 shrink-0" /> {WHATSAPP_DISPLAY}</a></li>
            <li className="flex items-center gap-2"><MapPin className="w-4 h-4 shrink-0 text-brand" /> {LOCATION}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 text-sm text-white/50">
          © {year} Widad International Volunteers. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
