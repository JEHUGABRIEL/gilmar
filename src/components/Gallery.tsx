import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { BedDouble, Sofa, UtensilsCrossed, Trees, Expand, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { gallery, type GalleryCategory } from '../data/media';

const categories: { key: GalleryCategory; icon: typeof BedDouble }[] = [
  { key: 'rooms', icon: BedDouble },
  { key: 'living', icon: Sofa },
  { key: 'restaurant', icon: UtensilsCrossed },
  { key: 'outside', icon: Trees },
];

// 1 grande photo (2×2) + 5 vignettes = 3 rangées pleines sur la grille à 3 colonnes.
const FIRST_PAGE = 6;
const PAGE = 6;

export function Gallery() {
  const { t } = useTranslation();
  const [category, setCategory] = useState<GalleryCategory>('rooms');
  const [visible, setVisible] = useState(FIRST_PAGE);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const photos = useMemo(() => gallery.filter((g) => g.category === category), [category]);
  const shown = photos.slice(0, visible);
  const remaining = photos.length - shown.length;

  const select = (c: GalleryCategory) => {
    setCategory(c);
    setVisible(FIRST_PAGE);
  };

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight') setLightbox((i) => (i! + 1) % photos.length);
      if (e.key === 'ArrowLeft') setLightbox((i) => (i! - 1 + photos.length) % photos.length);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [lightbox, photos.length]);

  return (
    <section id="galerie" className="bg-white py-24 max-md:py-16 scroll-mt-16">
      <div className="max-w-[1240px] mx-auto px-5">
        <div className="mb-10">
          <h2 className="font-serif text-[42px] max-md:text-[34px] text-brand-950 leading-tight">{t('page.galleryTitle')}</h2>
          <p className="text-slate-500 mt-2">{t('page.gallerySubtitle')}</p>
        </div>

        {/* Filtres */}
        <div role="tablist" className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {categories.map(({ key, icon: Icon }) => {
            const active = key === category;
            const count = gallery.filter((g) => g.category === key).length;
            const cover = gallery.find((g) => g.category === key)!.src;
            return (
              <button
                key={key}
                role="tab"
                aria-selected={active}
                onClick={() => select(key)}
                className={`relative overflow-hidden h-24 max-sm:h-20 text-left transition-all duration-300 group ${
                  active ? 'ring-2 ring-sand-300 ring-offset-2' : 'opacity-80 hover:opacity-100'
                }`}
              >
                <img src={cover} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <span className={`absolute inset-0 transition-colors ${active ? 'bg-brand-950/55' : 'bg-brand-950/70 group-hover:bg-brand-950/60'}`} />
                <span className="relative h-full flex items-center gap-3 px-4 max-sm:px-3 text-white">
                  <span className={`w-10 h-10 max-sm:w-8 max-sm:h-8 rounded-full flex items-center justify-center shrink-0 ${active ? 'bg-sand-300 text-brand-950' : 'bg-white/15'}`}>
                    <Icon className="w-5 h-5 max-sm:w-4 max-sm:h-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-semibold text-[13px] max-sm:text-[12px] uppercase tracking-[1.5px] leading-tight">
                      {t(`page.filters.${key}`)}
                    </span>
                    <span className="block text-xs text-white/70 mt-0.5">
                      {count} {t('page.photos')}
                    </span>
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Grille */}
        <AnimatePresence mode="wait">
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[260px] max-sm:auto-rows-[240px]"
          >
            {shown.map((p, i) => (
              <motion.button
                key={p.src}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: i >= FIRST_PAGE ? (i % PAGE) * 0.05 : 0 }}
                onClick={() => setLightbox(i)}
                className={`relative overflow-hidden group bg-slate-100 ${i === 0 ? 'sm:col-span-2 sm:row-span-2' : ''}`}
              >
                <img
                  src={p.src}
                  alt={t(`page.filters.${category}`)}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-brand-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <span className="text-xs tracking-[2px]">
                    {String(i + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
                  </span>
                  <span className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Expand className="w-4 h-4" />
                  </span>
                </span>
              </motion.button>
            ))}
          </motion.div>
        </AnimatePresence>

        {photos.length > FIRST_PAGE && (
          <div className="flex justify-center mt-10">
            {remaining > 0 ? (
              <button
                onClick={() => setVisible((v) => v + PAGE)}
                className="inline-flex items-center gap-2 border border-brand-950 text-brand-950 text-[12px] font-semibold uppercase tracking-[2px] px-6 py-3.5 hover:bg-brand-950 hover:text-white transition-colors"
              >
                {t('page.showMore')} ({remaining})
                <ChevronDown className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => {
                  setVisible(FIRST_PAGE);
                  document.getElementById('galerie')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 text-slate-500 text-[12px] font-semibold uppercase tracking-[2px] px-6 py-3.5 hover:text-brand-950 transition-colors"
              >
                {t('page.showLess')}
                <ChevronUp className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/95 flex items-center justify-center"
            onClick={() => setLightbox(null)}
          >
            <img
              src={photos[lightbox].src}
              alt=""
              className="max-w-[92vw] max-h-[86vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button aria-label="Fermer" className="absolute top-5 right-5 text-white/80 hover:text-white">
              <X className="w-7 h-7" />
            </button>
            <button
              aria-label="Précédent"
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((lightbox - 1 + photos.length) % photos.length);
              }}
              className="absolute left-3 md:left-8 w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              aria-label="Suivant"
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((lightbox + 1) % photos.length);
              }}
              className="absolute right-3 md:right-8 w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            <span className="absolute bottom-5 text-white/60 text-sm">
              {t(`page.filters.${category}`)} · {lightbox + 1} / {photos.length}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
