// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Importar os arquivos de tradução
import translationPT from "./locales/pt/translation.json";
import translationES from "./locales/es/translation.json";
import translationEN from "./locales/en/translation.json";

const resources = {
  pt: {
    translation: translationPT,
  },
  es: {
    translation: translationES,
  },
  en: {
    translation: translationEN,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "pt", 
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, 
  },
});

export default i18n;
