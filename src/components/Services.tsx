import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Car, Dumbbell } from 'lucide-react';
import { media } from '../data/media';
import { whatsappLink } from '../data/site';
import { Price } from './Price';
import { WhatsAppIcon } from './WhatsAppIcon';

/** Location de véhicules + salle de sport, côte à côte. */
export function Services() {
  const { t } = useTranslation();

  return (
    <section className="bg-sand-50 py-28 max-md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1.4fr_1fr] gap-7">
        {/* Véhicules */}
        <motion.article
          id="vehicules"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden bg-brand-950 text-white min-h-[520px] flex flex-col justify-end scroll-mt-24"
        >
          <img src={media.vehicles[0]} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/70 to-brand-950/10" />
          <div className="relative p-10 max-md:p-7">
            <span className="inline-flex items-center gap-2 text-sand-300 text-[12px] font-semibold uppercase tracking-[3px]">
              <Car className="w-4 h-4" /> {t('vehicles.badge')}
            </span>
            <h3 className="font-serif text-[38px] max-md:text-[30px] leading-[1.1] mt-3">{t('vehicles.title')}</h3>
            <p className="text-white/75 text-[15px] leading-relaxed mt-4 max-w-lg">{t('vehicles.desc')}</p>
            <div className="flex gap-3 mt-6">
              {media.vehicles.slice(1).map((src) => (
                <img key={src} src={src} alt="" loading="lazy" className="w-28 h-20 object-cover border-2 border-white/20" />
              ))}
            </div>
            <a
              href={whatsappLink(t('vehicles.waMessage'))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-8 bg-sand-300 text-brand-950 text-[12px] font-semibold uppercase tracking-[2px] px-6 py-3.5 hover:bg-sand-200 transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4" />
              {t('vehicles.cta')}
            </a>
          </div>
        </motion.article>

        {/* Salle de sport */}
        <motion.article
          id="sport"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white border border-sand-100 p-10 max-md:p-7 flex flex-col scroll-mt-24"
        >
          <span className="inline-flex items-center gap-2 text-sand-500 text-[12px] font-semibold uppercase tracking-[3px]">
            <Dumbbell className="w-4 h-4" /> {t('gym.badge')}
          </span>
          <h3 className="font-serif text-[34px] max-md:text-[28px] text-brand-950 leading-[1.1] mt-3">{t('gym.title')}</h3>
          <p className="text-slate-600 text-[15px] leading-relaxed mt-4">{t('gym.desc')}</p>

          <div className="grid grid-cols-2 gap-3 mt-8">
            <PriceTile label={t('gym.daily')} amount={t('gym.dailyPrice')} />
            <PriceTile label={t('gym.monthly')} amount={t('gym.monthlyPrice')} highlight />
          </div>

          <a
            href={whatsappLink(t('gym.waMessage'))}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto pt-0 inline-flex items-center justify-center gap-2 w-full bg-brand-600 text-white text-[12px] font-semibold uppercase tracking-[2px] px-6 py-3.5 hover:bg-brand-700 transition-colors max-lg:mt-8 lg:mt-8"
          >
            <WhatsAppIcon className="w-4 h-4" />
            {t('gym.cta')}
          </a>
        </motion.article>
      </div>
    </section>
  );
}

function PriceTile({ label, amount, highlight = false }: { label: string; amount: string; highlight?: boolean }) {
  return (
    <div className={`p-5 text-center ${highlight ? 'bg-brand-950 text-white' : 'bg-brand-50 text-brand-950'}`}>
      <p className={`text-[11px] uppercase tracking-[2px] font-semibold ${highlight ? 'text-sand-300' : 'text-brand-600'}`}>{label}</p>
      <p className="font-serif text-[30px] leading-none mt-2">
        <Price amount={amount} />
      </p>
    </div>
  );
}
