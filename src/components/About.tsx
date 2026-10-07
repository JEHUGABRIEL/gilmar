import { useState, useEffect } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { motion } from 'framer-motion';
import { MapPin, Clock, Star } from 'lucide-react';
import { media } from '../data/media';

export function About() {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((p) => (p + 1) % media.about.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="about" className="py-28 max-md:py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-20 max-lg:gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative md:mr-10"
        >
          <div className="aspect-[4/5] overflow-hidden shadow-xl relative">
            {media.about.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={t('about.imgAlt')}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
                style={{ opacity: i === current ? 1 : 0 }}
              />
            ))}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {media.about.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Photo ${i + 1}`}
                  className={`h-1.5 transition-all ${i === current ? 'w-5 bg-white' : 'w-1.5 bg-white/50'}`}
                />
              ))}
            </div>
          </div>

          <div className="absolute -bottom-10 -right-10 w-1/2 aspect-[4/5] border-8 border-white overflow-hidden hidden md:block shadow-xl">
            <img src={media.aboutOffset} alt={t('about.imgAlt')} loading="lazy" className="w-full h-full object-cover" />
          </div>

          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 shadow-sm flex items-center gap-1.5">
            {[1, 2, 3, 4].map((i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-current text-sand-400" />
            ))}
            <span className="text-[10px] font-semibold text-slate-700 uppercase tracking-wider ml-0.5">
              {t('about.statBadge')}
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-sand-400 font-semibold tracking-[4px] uppercase text-xs mb-3 block">{t('about.badge')}</span>
          <h2 className="text-[42px] max-md:text-[34px] font-serif text-brand-950 mb-7 leading-[1.1]">{t('about.title')}</h2>

          <div className="space-y-5 text-slate-600 font-light leading-relaxed text-[15.5px]">
            <p>
              <Trans i18nKey="about.p1" components={{ strong: <strong className="font-semibold text-brand-900" /> }} />
            </p>
            <p>{t('about.p2')}</p>
            <p>{t('about.p3')}</p>
          </div>

          <div className="mt-9 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-start gap-3 p-4 bg-brand-50 border-l-2 border-brand-500">
              <MapPin className="w-5 h-5 text-brand-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-brand-950">{t('about.addressTitle')}</p>
                <p className="text-xs text-slate-500 leading-relaxed mt-0.5">{t('about.addressLine')}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-sand-50 border-l-2 border-sand-300">
              <Clock className="w-5 h-5 text-sand-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-brand-950">{t('about.hoursTitle')}</p>
                <p className="text-xs text-slate-500 mt-0.5">{t('about.hoursLine')}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
