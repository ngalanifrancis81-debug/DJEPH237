import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { translations } from "@/i18n/translations";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem("wiv_lang") || "fr");

  useEffect(() => {
    localStorage.setItem("wiv_lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo(() => {
    const t = translations[lang] || translations.fr;
    return {
      lang,
      setLang,
      toggle: () => setLang((p) => (p === "fr" ? "en" : "fr")),
      t,
    };
  }, [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
