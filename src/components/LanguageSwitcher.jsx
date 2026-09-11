import { useState, useRef, useEffect } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useTranslation } from '../i18n/useTranslation';

const LANGUAGES = [
  { code: 'en', native: 'English', label: 'English', flag: '🇺🇸' },
  { code: 'ar', native: 'العربية', label: 'Arabic', flag: '🇸🇦' },
];

export const LanguageSwitcher = ({ className = '' }) => {
  const { language, setLanguage } = useApp();
  const { isRTL } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const current = LANGUAGES.find(l => l.code === language);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-teal-300 transition-all text-sm font-medium text-gray-700 select-none"
      >
        <Globe size={14} className="text-teal-500 shrink-0" />
        <span className="text-base leading-none">{current.flag}</span>
        <span className="font-semibold tracking-wide text-xs">{current.code.toUpperCase()}</span>
        <ChevronDown
          size={12}
          className={`text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div
          className={`absolute top-full mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-[200] w-44 ${
            isRTL ? 'left-0' : 'right-0'
          }`}
        >
          {LANGUAGES.map(lang => (
            <button
              key={lang.code}
              onClick={() => { setLanguage(lang.code); setOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 transition-colors ${
                language === lang.code
                  ? 'bg-teal-50 text-teal-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="text-xl leading-none">{lang.flag}</span>
              <div className="flex-1 text-left">
                <div className="font-semibold text-sm">{lang.native}</div>
                <div className="text-xs text-gray-400">{lang.label}</div>
              </div>
              {language === lang.code && (
                <Check size={13} className="text-teal-500 shrink-0" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
