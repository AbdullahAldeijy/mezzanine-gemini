import { useApp } from '../context/AppContext';
import { translations } from './translations';

export const useTranslation = () => {
  const { language } = useApp();

  const t = (key) => {
    const keys = key.split('.');
    let current = translations[language] ?? translations.en;
    for (const k of keys) {
      current = current?.[k];
      if (current === undefined) break;
    }
    // Fallback to English if key missing in current language
    if (current === undefined) {
      let fallback = translations.en;
      for (const k of keys) {
        fallback = fallback?.[k];
        if (fallback === undefined) break;
      }
      return fallback ?? key;
    }
    return current;
  };

  return { t, language, isRTL: language === 'ar' };
};
