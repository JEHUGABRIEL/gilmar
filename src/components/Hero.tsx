import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Minus, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { media } from '../data/media';
import { useBooking } from '../context/BookingContext';

type Slide = { badge: string; title: string; titleAccent: string; subtitle: string };

export function Hero() {
  const { t } = useTranslation();
  const { openBooking } = useBooking();
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [arrival, setArrival] = useState('');
  const [departure, setDeparture] = useState('');
  const [guests, setGuests] = useState(2);

  const slides = t('hero.slides', { returnObjects: true }) as Slide[];
  const count = media.hero.length;

  const next = useCallback(() => setCurrent((p) => (p + 1) % count), [count]);
  const prev = () => setCurrent((p) => (p - 1 + count) % count);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 6500);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  const slide = slides[current] ?? slides[0];
  const check = () => openBooking({ arrival, departure, guests });

  return (
    <section
      className="relative h-[100svh] min-h-[640px] flex items-center justify-center overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {media.hero.map((src, index) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity duration-[1200ms] ease-in-out"
          style={{ opacity: index === current ? 1 : 0 }}
        >
          <img
            src={src}
            alt=""
            className={`w-full h-full object-cover transition-transform duration-[7000ms] ease-out ${
              index === current ? 'scale-105' : 'scale-100'
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-950/70 via-brand-950/40 to-brand-950/85" />
        </div>
      ))}

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto -mt-10 lg:-mt-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
          >
            <span className="inline-block text-sand-200 font-medium tracking-[5px] uppercase text-xs md:text-sm mb-6">
              {slide.badge}
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-white font-light mb-5 leading-[1.1] tracking-[3px]">
              {slide.title}
              <br />
              <span className="italic text-sand-300">{slide.titleAccent}</span>
            </h1>
            <p className="text-white/80 text-base md:text-lg font-light max-w-xl mx-auto mb-9">{slide.subtitle}</p>
            <Link
              to="/appartements"
              className="inline-block border border-white text-white font-medium text-[13px] uppercase tracking-[2px] px-7 py-3 transition-all duration-300 hover:bg-white hover:text-brand-950"
            >
              {t('hero.ctaDiscover')}
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Contrôles du diaporama */}
      <div className="absolute z-10 left-1/2 -translate-x-1/2 bottom-8 lg:bottom-[150px] flex items-center gap-4">
        <button onClick={prev} aria-label="Précédent" className="text-white/70 hover:text-white">
          <ChevronLeft className="w-5 h-5" />
        </button>
        {media.hero.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Diapositive ${i + 1}`}
            className={`h-[3px] transition-all duration-300 ${i === current ? 'w-10 bg-sand-300' : 'w-5 bg-white/40 hover:bg-white/70'}`}
          />
        ))}
        <button onClick={next} aria-label="Suivant" className="text-white/70 hover:text-white">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Barre de réservation (desktop) */}
      <div className="hidden lg:block absolute bottom-0 left-0 right-0 z-10 pb-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-4xl mx-auto bg-white shadow-2xl p-1 flex items-center divide-x divide-slate-100"
        >
          <DateField label={t('hero.arrival')} value={arrival} onChange={setArrival} />
          <DateField label={t('hero.departure')} value={departure} onChange={setDeparture} min={arrival} />
          <div className="flex-1 px-5 py-4">
            <label className="block text-[0.65rem] font-bold uppercase tracking-[0.15em] text-slate-400 mb-1.5">
              {t('hero.guests')}
            </label>
            <div className="flex items-center gap-3">
              <Stepper onClick={() => setGuests(Math.max(1, guests - 1))} label="-">
                <Minus className="w-3 h-3" />
              </Stepper>
              <span className="text-sm font-semibold text-slate-800 w-5 text-center">{guests}</span>
              <Stepper onClick={() => setGuests(Math.min(10, guests + 1))} label="+">
                <Plus className="w-3 h-3" />
              </Stepper>
            </div>
          </div>
          <div className="px-3 py-3">
            <button
              onClick={check}
              className="bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs uppercase tracking-[1.5px] px-6 py-4 transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <Calendar className="w-4 h-4" />
              {t('hero.check')}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function DateField({
  label,
  value,
  onChange,
  min,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  min?: string;
}) {
  return (
    <div className="flex-1 px-5 py-4">
      <label className="block text-[0.65rem] font-bold uppercase tracking-[0.15em] text-slate-400 mb-1.5">{label}</label>
      <div className="flex items-center gap-2">
        <Calendar className="w-4 h-4 text-brand-500 shrink-0" />
        <input
          type="date"
          value={value}
          min={min || new Date().toISOString().slice(0, 10)}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent text-sm text-slate-800 outline-none [color-scheme:light]"
        />
      </div>
    </div>
  );
}

function Stepper({ onClick, label, children }: { onClick: () => void; label: string; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="w-7 h-7 flex items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:border-brand-400 hover:text-brand-600 transition-colors"
    >
      {children}
    </button>
  );
}
