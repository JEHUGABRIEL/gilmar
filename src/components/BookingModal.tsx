import { useTranslation } from 'react-i18next';
import { Coffee, Phone } from 'lucide-react';
import { site } from '../data/site';
import { media } from '../data/media';
import { useBooking } from '../context/BookingContext';
import { BookingForm } from './BookingForm';
import { Modal } from './Modal';

export function BookingModal() {
  const { t } = useTranslation();
  const { isOpen, prefill, closeBooking } = useBooking();

  return (
    <Modal open={isOpen} onClose={closeBooking} className="max-w-3xl" closeLabel={t('booking.close')}>
      <div className="grid md:grid-cols-[0.8fr_1.2fr]">
        <div className="relative hidden md:block bg-brand-950">
          <img src={media.apartments.e4[0]} alt="" className="absolute inset-0 w-full h-full object-cover opacity-60" />
          <div className="relative h-full flex flex-col justify-end p-7 text-white">
            <img src={media.logo} alt="" className="w-14 h-14 rounded-full mb-4" />
            <div className="flex items-start gap-2 bg-white/10 backdrop-blur-sm p-3 text-sm">
              <Coffee className="w-4 h-4 text-sand-300 mt-0.5 shrink-0" />
              {t('booking.offer')}
            </div>
            <p className="text-xs text-white/70 mt-4">{t('booking.call')}</p>
            <a href={site.phoneHref} className="flex items-center gap-2 font-semibold text-lg">
              <Phone className="w-4 h-4" /> {site.phoneDisplay}
            </a>
          </div>
        </div>
        <div className="p-8 max-sm:p-6">
          <h3 className="font-serif text-[30px] text-brand-950 leading-tight pr-8">{t('booking.title')}</h3>
          <p className="text-sm text-slate-500 mt-2 mb-6">{t('booking.subtitle')}</p>
          {/* key : réinitialise le formulaire à chaque ouverture avec le nouveau préremplissage */}
          <BookingForm key={JSON.stringify(prefill)} prefill={prefill} onSent={closeBooking} />
        </div>
      </div>
    </Modal>
  );
}
