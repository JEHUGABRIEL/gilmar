import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { media } from '../data/media';
import { whatsappLink } from '../data/site';
import { SectionHeading } from './SectionHeading';
import { WhatsAppIcon } from './WhatsAppIcon';

export function Restaurant() {
  const { t } = useTranslation();
  const points = t('restaurant.points', { returnObjects: true }) as string[];
  const [main, second, third, fourth] = media.restaurant;

  return (
    <section id="restaurant" className="bg-white py-28 max-md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_1.2fr] gap-16 items-center">
        <div>
          <SectionHeading badge={t('restaurant.badge')} title={t('restaurant.title')} subtitle={t('restaurant.desc')} />
          <ul className="grid grid-cols-2 gap-3 mt-8">
            {points.map((p) => (
              <li key={p} className="flex items-center gap-2 text-sm text-slate-700">
                <Check className="w-4 h-4 text-sand-400 shrink-0" /> {p}
              </li>
            ))}
          </ul>
          <a
            href={whatsappLink(t('restaurant.waMessage'))}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-10 bg-brand-950 text-white text-[12px] font-semibold uppercase tracking-[2px] px-6 py-3.5 hover:bg-brand-800 transition-colors"
          >
            <WhatsAppIcon className="w-4 h-4" />
            {t('restaurant.cta')}
          </a>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-6 grid-rows-[repeat(4,minmax(0,1fr))] gap-3 h-[560px] max-md:h-[440px]"
        >
          <Tile src={main} className="col-span-4 row-span-3" />
          <Tile src={second} className="col-span-2 row-span-2" />
          <Tile src={third} className="col-span-2 row-span-2" />
          <Tile src={fourth} className="col-span-4 row-span-1" />
        </motion.div>
      </div>
    </section>
  );
}

function Tile({ src, className }: { src: string; className: string }) {
  return (
    <div className={`overflow-hidden group ${className}`}>
      <img src={src} alt="" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
    </div>
  );
}
