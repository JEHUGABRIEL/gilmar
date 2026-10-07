import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { site } from '../data/site';
import { media } from '../data/media';
import { useBooking } from '../context/BookingContext';

const menuItems = [
  { key: 'nav.home', to: '/' },
  { key: 'nav.about', to: '/#about' },
  { key: 'nav.apartments', to: '/appartements' },
  { key: 'nav.restaurant', to: '/#restaurant' },
  { key: 'nav.vehicles', to: '/#vehicules' },
  { key: 'nav.contact', to: '/#contact' },
];

export function Navbar() {
  const { t, i18n } = useTranslation();
  const { openBooking } = useBooking();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Les pages sans hero plein écran gardent la barre opaque.
  const solid = isScrolled || isMobileOpen || location.pathname !== '/';
  const lang = i18n.resolvedLanguage === 'en' ? 'en' : 'fr';

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setIsMobileOpen(false), [location.pathname, location.hash]);

  const linkClass = `px-3 py-2 text-[13px] font-medium uppercase tracking-[2px] transition-colors ${
    solid ? 'text-slate-700 hover:text-brand-600' : 'text-white/90 hover:text-white'
  }`;

  return (
    <nav
      className={`fixed w-full z-40 top-0 transition-all duration-500 ${
        solid ? 'bg-white/95 backdrop-blur-md shadow-sm py-2.5' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <img
            src={media.logo}
            alt={site.legalName}
            className={`rounded-full transition-all duration-500 ${solid ? 'h-11 w-11' : 'h-14 w-14 ring-2 ring-white/40'}`}
          />
          <span className="leading-none">
            <span className={`block font-serif text-[22px] tracking-wide ${solid ? 'text-brand-950' : 'text-white'}`}>Gilmar</span>
            <span className={`block text-[10px] uppercase tracking-[3.5px] ${solid ? 'text-sand-500' : 'text-sand-200'}`}>
              Résidence
            </span>
          </span>
        </Link>

        <div className="hidden xl:flex items-center gap-1">
          {menuItems.map((item) => (
            <Link key={item.key} to={item.to} className={linkClass}>
              {t(item.key)}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div
            className={`hidden lg:flex text-[12px] font-medium uppercase tracking-[1.5px] border ${
              solid ? 'border-slate-300' : 'border-white/30'
            }`}
          >
            {(['fr', 'en'] as const).map((lng) => (
              <button
                key={lng}
                onClick={() => i18n.changeLanguage(lng)}
                className={`px-2.5 py-1.5 transition-colors ${
                  lang === lng
                    ? solid
                      ? 'bg-brand-600 text-white'
                      : 'bg-white/20 text-white'
                    : solid
                      ? 'text-slate-500 hover:text-brand-600'
                      : 'text-white/70 hover:text-white'
                }`}
              >
                {lng}
              </button>
            ))}
          </div>

          <button
            onClick={() => openBooking()}
            className={`hidden lg:flex items-center gap-1.5 px-4 py-2 text-[12px] font-semibold uppercase tracking-[1.5px] transition-colors ${
              solid ? 'text-white bg-brand-600 hover:bg-brand-700' : 'text-brand-950 bg-sand-300 hover:bg-sand-200'
            }`}
          >
            {t('nav.book')}
          </button>

          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className={`xl:hidden p-2 ${solid ? 'text-slate-900' : 'text-white'}`}
            aria-label="Menu"
          >
            {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="xl:hidden bg-white absolute top-full left-0 w-full shadow-lg border-t border-slate-100 max-h-[calc(100vh-70px)] overflow-y-auto"
          >
            <div className="px-4 pt-2 pb-6">
              {menuItems.map((item) => (
                <Link
                  key={item.key}
                  to={item.to}
                  onClick={() => setIsMobileOpen(false)}
                  className="block px-3 py-3 text-base font-medium text-slate-800 hover:text-brand-600 hover:bg-slate-50"
                >
                  {t(item.key)}
                </Link>
              ))}
              <div className="border-t border-slate-100 pt-4 mt-3 px-3 space-y-3">
                <div className="flex gap-2">
                  {(['fr', 'en'] as const).map((lng) => (
                    <button
                      key={lng}
                      onClick={() => i18n.changeLanguage(lng)}
                      className={`flex-1 px-4 py-2.5 text-sm font-medium uppercase tracking-wider border transition-colors ${
                        lang === lng ? 'bg-brand-600 text-white border-brand-600' : 'text-slate-600 border-slate-200'
                      }`}
                    >
                      {lng}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => {
                    setIsMobileOpen(false);
                    openBooking();
                  }}
                  className="w-full px-5 py-3 bg-brand-600 text-white font-semibold uppercase tracking-wider text-sm hover:bg-brand-700"
                >
                  {t('nav.book')}
                </button>
                <a
                  href={site.phoneHref}
                  className="flex items-center justify-center gap-2 w-full px-5 py-3 border border-brand-600 text-brand-600 font-medium"
                >
                  <Phone className="w-4 h-4" />
                  {site.phoneDisplay}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
