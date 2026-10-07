import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, BedDouble } from 'lucide-react';
import { media } from '../data/media';
import { useBooking } from '../context/BookingContext';
import { DetailModal } from './DetailModal';
import { Price } from './Price';
import { SectionHeading } from './SectionHeading';

export type ApartmentCard = {
  id: string;
  name: string;
  price: string;
  badge: string;
  size: string;
  capacity: string;
  bed: string;
  desc: string;
  features: string[];
};

export function useApartments() {
  const { t } = useTranslation();
  return t('apartments.cards', { returnObjects: true }) as ApartmentCard[];
}

export function ApartmentGrid() {
  const { t } = useTranslation();
  const { openBooking } = useBooking();
  const apartments = useApartments();
  const [selected, setSelected] = useState<ApartmentCard | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-7 max-md:gap-5">
        {apartments.map((apt, i) => (
          <motion.article
            key={apt.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group relative aspect-[4/5] overflow-hidden bg-brand-950 cursor-pointer"
            onClick={() => setSelected(apt)}
          >
            <img
              src={media.apartments[apt.id][0]}
              alt={apt.name}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute top-0 right-6 bg-sand-300 px-2 pt-4 pb-5 z-[3]">
              <span className="text-brand-950 text-[10px] font-semibold tracking-[2px] uppercase block" style={{ writingMode: 'vertical-rl' }}>
                {apt.badge}
              </span>
            </div>
            <div
              className="absolute bottom-0 left-0 w-full z-[2] px-7 pb-8 pt-16"
              style={{ background: 'linear-gradient(transparent, rgba(26,38,72,0.92))' }}
            >
              <p className="text-sand-300 text-[12px] font-semibold uppercase tracking-[2px] mb-1.5">
                <Price amount={apt.price} suffix={apt.price ? t('apartments.perNight') : undefined} />
              </p>
              <h3 className="font-serif text-white text-[25px] leading-tight">{apt.name}</h3>
              <div className="flex gap-4 mt-3 text-white/70 text-xs">
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" /> {apt.capacity}
                </span>
                <span className="flex items-center gap-1.5">
                  <BedDouble className="w-3.5 h-3.5" /> {apt.bed}
                </span>
              </div>
            </div>
            <div className="absolute inset-0 bg-brand-950/60 flex flex-col items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[1]">
              <span className="text-white text-[12px] uppercase tracking-[2px] border-b border-white pb-0.5">
                {t('apartments.details')}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openBooking({ apartment: apt.name });
                }}
                className="text-white text-[11px] uppercase tracking-[2px] px-5 py-2 border border-white/60 hover:bg-white hover:text-brand-950 transition-colors"
              >
                {t('apartments.book')}
              </button>
            </div>
          </motion.article>
        ))}
      </div>
      <DetailModal apartment={selected} onClose={() => setSelected(null)} />
    </>
  );
}

export function Apartments() {
  const { t } = useTranslation();
  return (
    <section id="appartements" className="bg-sand-50 py-28 max-md:py-20">
      <div className="max-w-[1240px] mx-auto px-5">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeading badge={t('apartments.badge')} title={t('apartments.title')} subtitle={t('apartments.subtitle')} />
          <Link
            to="/appartements"
            className="self-start md:self-auto shrink-0 inline-flex items-center gap-2 text-brand-950 text-[12px] font-semibold uppercase tracking-[2px] border border-brand-950 px-5 py-3 transition-colors hover:bg-brand-950 hover:text-white group"
          >
            {t('apartments.seeAll')}
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <ApartmentGrid />
      </div>
    </section>
  );
}
