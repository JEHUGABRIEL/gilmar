import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { media, gallery, type GalleryCategory } from '../data/media';
import { ApartmentGrid } from '../components/Apartments';
import { Amenities } from '../components/Amenities';

const filters: ('all' | GalleryCategory)[] = ['all', 'rooms', 'living', 'restaurant', 'outside'];

export function ApartmentsPage() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<(typeof filters)[number]>('all');
  const [lightbox, setLightbox] = useState<number | null>(null);

  const photos = useMemo(() => (filter === 'all' ? gallery : gallery.filter((g) => g.category === filter)), [filter]);

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
    <main>
      <header className="relative h-[52vh] min-h-[380px] flex items-end overflow-hidden">
        <img src={media.hero[0]} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-brand-950/50 to-brand-950/30" />
        <div className="relative max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-14">
          <span className="text-sand-300 text-xs font-semibold uppercase tracking-[4px]">Gilmar Résidence</span>
          <h1 className="font-serif text-white text-6xl max-md:text-[44px] font-light mt-3">{t('page.title')}</h1>
          <p className="text-white/75 mt-3 text-lg font-light">{t('page.subtitle')}</p>
        </div>
      </header>

      <section className="bg-sand-50 py-20 max-md:py-14">
        <div className="max-w-[1240px] mx-auto px-5">
          <ApartmentGrid />
        </div>
      </section>

      <Amenities />

      <section className="bg-white py-24 max-md:py-16">
        <div className="max-w-[1240px] mx-auto px-5">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <h2 className="font-serif text-[42px] max-md:text-[34px] text-brand-950 leading-tight">{t('page.galleryTitle')}</h2>
            <div className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 text-[12px] font-semibold uppercase tracking-[1.5px] border transition-colors ${
                    filter === f ? 'bg-brand-950 text-white border-brand-950' : 'border-slate-200 text-slate-600 hover:border-brand-400'
                  }`}
                >
                  {t(`page.filters.${f}`)}
                </button>
              ))}
            </div>
          </div>

          <motion.div layout className="columns-2 md:columns-3 lg:columns-4 gap-3 [&>*]:mb-3">
            <AnimatePresence mode="popLayout">
              {photos.map((p, i) => (
                <motion.button
                  layout
                  key={p.src}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25 }}
                  onClick={() => setLightbox(i)}
                  className="block w-full overflow-hidden group break-inside-avoid"
                >
                  <img src={p.src} alt="" loading="lazy" className="w-full h-auto transition-transform duration-500 group-hover:scale-105" />
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

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
              {lightbox + 1} / {photos.length}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
