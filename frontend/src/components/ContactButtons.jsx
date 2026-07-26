import React from "react";
import { Mail, MessageCircle } from "lucide-react";
import { mailtoRecall, whatsappInterest } from "@/lib/contact";

/**
 * The two secondary action buttons shown on a project/course detail page:
 * "Demander un rappel par e-mail" (mailto) and "Discuter sur WhatsApp" (wa.me).
 */
export default function ContactButtons({ title, testPrefix = "detail" }) {
  return (
    <div className="grid sm:grid-cols-2 gap-3 w-full">
      <a
        href={mailtoRecall(title)}
        data-testid={`${testPrefix}-email-btn`}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-ink border-2 border-ink/10 hover:border-brand hover:text-brand font-semibold px-6 py-3.5 transition-colors"
      >
        <Mail className="w-5 h-5" strokeWidth={2.2} />
        Demander un rappel par e-mail
      </a>
      <a
        href={whatsappInterest(title)}
        target="_blank"
        rel="noopener noreferrer"
        data-testid={`${testPrefix}-whatsapp-btn`}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] hover:bg-[#1DA851] text-white font-semibold px-6 py-3.5 transition-colors"
      >
        <MessageCircle className="w-5 h-5" strokeWidth={2.2} />
        Discuter sur WhatsApp
      </a>
    </div>
  );
}
