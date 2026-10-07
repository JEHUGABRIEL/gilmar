import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, ChevronLeft, ChevronRight, Users, BedDouble, LayoutGrid } from 'lucide-react';
import { media } from '../data/media';
import { useBooking } from '../context/BookingContext';
import { Modal } from './Modal';
import { Price } from './Price';
import type { ApartmentCard } from './Apartments';

export function DetailModal({ apartment, onClose }: { apartment: ApartmentCard | null; onClose: () => void }) {
  const { t } = useTranslation();
  const { openBooking } = useBooking();
  const [index, setIndex] = useState(0);

  useEffect(() => setIndex(0), [apartment?.id]);

  const photos = apartment ? media.apartments[apartment.id] : [];
  const go = (d: number) => setIndex((i) => (i + d + photos.length) % photos.length);

  return (
    <Modal open={!!apartment} onClose={onClose} closeLabel={t('booking.close')}>
      {apartment && (
        <div className="grid md:grid-cols-[1.15fr_1fr]">
          <div className="relative bg-brand-950 aspect-[4/3] md:aspect-auto md:min-h-[540px]">
            <img src={photos[index]} alt={apartment.name} className="absolute inset-0 w-full h-full object-cover" />
            {photos.length > 1 && (
              <>
                <button
                  onClick={() => go(-1)}
                  aria-label="Précédent"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/85 flex items-center justify-center"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => go(1)}
                  aria-label="Suivant"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/85 flex items-center justify-center"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <div className="absolute bottom-3 inset-x-0 flex justify-center gap-1.5 px-4">
                  {photos.map((src, i) => (
                    <button
                      key={src}
                      onClick={() => setIndex(i)}
                      className={`w-11 h-8 overflow-hidden border-2 transition-all ${i === index ? 'border-sand-300' : 'border-transparent opacity-70'}`}
                    >
                      <img src={src} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="p-8 max-sm:p-6 flex flex-col">
            <span className="text-sand-500 text-[11px] font-semibold uppercase tracking-[3px]">{apartment.badge}</span>
            <h3 className="font-serif text-[34px] text-brand-950 leading-tight mt-1">{apartment.name}</h3>
            <p className="text-brand-600 font-semibold mt-2 text-lg">
              <Price amount={apartment.price} suffix={apartment.price ? t('apartments.perNight') : undefined} />
            </p>

            <div className="grid grid-cols-3 gap-2 mt-6 text-xs text-slate-600">
              <Spec icon={<LayoutGrid className="w-4 h-4" />} text={apartment.size} />
              <Spec icon={<Users className="w-4 h-4" />} text={apartment.capacity} />
              <Spec icon={<BedDouble className="w-4 h-4" />} text={apartment.bed} />
            </div>

            <p className="text-slate-600 text-[14.5px] leading-relaxed mt-6">{apartment.desc}</p>

            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 mt-6">
              {apartment.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-slate-700">
                  <Check className="w-4 h-4 text-brand-500 shrink-0" /> {f}
                </li>
              ))}
            </ul>

            <button
              onClick={() => {
                onClose();
                openBooking({ apartment: apartment.name });
              }}
              className="mt-auto pt-0 w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold uppercase tracking-[1.5px] text-sm py-4 transition-colors max-md:mt-8 md:mt-8"
            >
              {t('apartments.book')}
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}

function Spec({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="bg-brand-50 px-2.5 py-3 flex flex-col items-center text-center gap-1.5">
      <span className="text-brand-600">{icon}</span>
      <span className="leading-tight">{text}</span>
    </div>
  );
}
