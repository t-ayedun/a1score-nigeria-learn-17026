
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation files
import en from './locales/en.json';
import pidgin from './locales/pidgin.json';
import yoruba from './locales/yoruba.json';
import hausa from './locales/hausa.json';
import igbo from './locales/igbo.json';

const resources = {
  en: { translation: en },
  pidgin: { translation: pidgin },
  yoruba: { translation: yoruba },
  hausa: { translation: hausa },
  igbo: { translation: igbo }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    
    interpolation: {
      escapeValue: false,
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

export default i18n;
