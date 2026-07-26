import React from "react";
import { Mail, MessageCircle } from "lucide-react";
import { mailtoLink, whatsappLink } from "@/lib/contact";
import { useLang } from "@/i18n/LanguageContext";

/**
 * The mandatory pair of contact buttons repeated under every program/project.
 * `program` is the plain-language name injected into the mailto/WhatsApp text.
 */
export default function ContactButtons({ program, testPrefix = "contact", compact = false }) {
  const { t, lang } = useLang();
  const pad = compact ? "px-5 py-3 text-sm" : "px-6 py-4";

  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full">
      <a
        href={mailtoLink(program, lang)}
        data-testid={`${testPrefix}-email-btn`}
        className={`flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-white text-ink border border-gray-200 hover:border-brand hover:text-brand font-medium transition-colors ${pad}`}
      >
        <Mail className="w-4 h-4" strokeWidth={2.2} aria-hidden="true" />
        <span>{t.contactButtons.email}</span>
      </a>
      <a
        href={whatsappLink(program, lang)}
        target="_blank"
        rel="noopener noreferrer"
        data-testid={`${testPrefix}-whatsapp-btn`}
        className={`flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-wa hover:bg-wa-dark text-white font-medium transition-colors ${pad}`}
      >
        <MessageCircle className="w-4 h-4" strokeWidth={2.2} aria-hidden="true" />
        <span>{t.contactButtons.whatsapp}</span>
      </a>
    </div>
  );
}
