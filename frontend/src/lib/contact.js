// Central contact constants + helpers for the repeated Email / WhatsApp buttons.
export const NGO_EMAIL = "widadinternationalvolunteers@gmail.com";
export const WHATSAPP_NUMBER = "237677958119"; // +237 677 958 119
export const LOCATION = "Cameroun";

const MAIL_SUBJECT = {
  fr: (program) => `Demande d'information - ${program}`,
  en: (program) => `Information request - ${program}`,
};
const WA_TEXT = {
  fr: (program) => `Bonjour, je souhaite avoir des informations sur ${program}`,
  en: (program) => `Hello, I would like information about ${program}`,
};

export function mailtoLink(program = "WIV", lang = "fr") {
  const subject = MAIL_SUBJECT[lang] ? MAIL_SUBJECT[lang](program) : MAIL_SUBJECT.fr(program);
  return `mailto:${NGO_EMAIL}?subject=${encodeURIComponent(subject)}`;
}

export function whatsappLink(program = "WIV", lang = "fr") {
  const text = WA_TEXT[lang] ? WA_TEXT[lang](program) : WA_TEXT.fr(program);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
