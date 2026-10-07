import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { whatsappLink } from '../data/site';
import type { BookingPrefill } from '../context/BookingContext';
import { useApartments } from './Apartments';
import { WhatsAppIcon } from './WhatsAppIcon';

const inputClass =
  'w-full px-4 py-3 border border-slate-200 bg-white text-sm text-slate-800 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all';
const labelClass = 'block text-[11px] font-semibold uppercase tracking-[1.5px] text-slate-500 mb-1.5';

/** Formulaire de réservation : compose un message et l'ouvre dans WhatsApp. */
export function BookingForm({ prefill = {}, onSent }: { prefill?: BookingPrefill; onSent?: () => void }) {
  const { t } = useTranslation();
  const apartments = useApartments();
  const [form, setForm] = useState({
    name: '',
    phone: '',
    apartment: prefill.apartment ?? '',
    arrival: prefill.arrival ?? '',
    departure: prefill.departure ?? '',
    guests: prefill.guests ?? 2,
    message: '',
  });
  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => setForm((f) => ({ ...f, [key]: value }));
  const today = new Date().toISOString().slice(0, 10);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = [
      t('contact.waGreeting'),
      '',
      `${t('contact.waName')} : ${form.name}`,
      form.phone ? `${t('contact.waPhone')} : ${form.phone}` : null,
      `${t('contact.waApartment')} : ${form.apartment || t('contact.formAny')}`,
      form.arrival ? `${t('contact.waArrival')} : ${form.arrival}` : null,
      form.departure ? `${t('contact.waDeparture')} : ${form.departure}` : null,
      `${t('contact.waGuests')} : ${form.guests}`,
      form.message ? `${t('contact.waMessage')} : ${form.message}` : null,
    ].filter((l): l is string => l !== null);
    window.open(whatsappLink(lines.join('\n')), '_blank', 'noopener');
    onSent?.();
  };

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass} htmlFor="bf-name">{t('contact.formName')}</label>
          <input id="bf-name" required value={form.name} onChange={(e) => set('name', e.target.value)} className={inputClass} placeholder={t('contact.formPlaceholderName')} />
        </div>
        <div>
          <label className={labelClass} htmlFor="bf-phone">{t('contact.formPhone')}</label>
          <input id="bf-phone" type="tel" value={form.phone} onChange={(e) => set('phone', e.target.value)} className={inputClass} placeholder={t('contact.formPlaceholderPhone')} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[1.4fr_1fr] gap-5">
        <div>
          <label className={labelClass} htmlFor="bf-apt">{t('contact.formApartment')}</label>
          <select id="bf-apt" value={form.apartment} onChange={(e) => set('apartment', e.target.value)} className={inputClass}>
            <option value="">{t('contact.formAny')}</option>
            {apartments.map((a) => (
              <option key={a.id} value={a.name}>{a.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="bf-guests">{t('contact.formGuests')}</label>
          <input id="bf-guests" type="number" min={1} max={20} value={form.guests} onChange={(e) => set('guests', Number(e.target.value) || 1)} className={inputClass} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div>
          <label className={labelClass} htmlFor="bf-arr">{t('contact.formArrival')}</label>
          <input id="bf-arr" type="date" min={today} value={form.arrival} onChange={(e) => set('arrival', e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="bf-dep">{t('contact.formDeparture')}</label>
          <input id="bf-dep" type="date" min={form.arrival || today} value={form.departure} onChange={(e) => set('departure', e.target.value)} className={inputClass} />
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="bf-msg">{t('contact.formMessage')}</label>
        <textarea id="bf-msg" rows={3} value={form.message} onChange={(e) => set('message', e.target.value)} className={`${inputClass} resize-none`} placeholder={t('contact.formPlaceholderMessage')} />
      </div>

      <button type="submit" className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1fb857] text-white font-semibold py-4 uppercase tracking-[1.5px] text-sm transition-colors">
        <WhatsAppIcon className="w-5 h-5" />
        {t('contact.formSubmit')}
      </button>
      <p className="text-xs text-center text-slate-500">{t('contact.formHint')}</p>
    </form>
  );
}
