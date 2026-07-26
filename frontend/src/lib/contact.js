// Contact constants + mailto / wa.me link builders (French).
export const NGO_EMAIL = "widadinternationalvolunteers@gmail.com";
export const WHATSAPP_NUMBER = "237677958119"; // +237 677 958 119
export const WHATSAPP_DISPLAY = "+237 677 958 119";
export const LOCATION = "Cameroun";

export function mailtoRecall(title) {
  const subject = `Demande de rappel - ${title}`;
  return `mailto:${NGO_EMAIL}?subject=${encodeURIComponent(subject)}`;
}

export function whatsappInterest(title) {
  const text = `Bonjour, je suis intéressé(e) par le projet ${title}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function mailtoGeneric(subject = "Demande d'information - Widad International Volunteers") {
  return `mailto:${NGO_EMAIL}?subject=${encodeURIComponent(subject)}`;
}

export function whatsappGeneric(text = "Bonjour, je souhaite avoir des informations sur vos projets") {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
