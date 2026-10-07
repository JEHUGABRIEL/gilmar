import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Coffee, ShieldCheck, Snowflake, CookingPot, ParkingSquare, MapPin } from 'lucide-react';
import { SectionHeading } from './SectionHeading';

const icons = [Coffee, ShieldCheck, Snowflake, CookingPot, ParkingSquare, MapPin];

export function Amenities() {
  const { t } = useTranslation();
  const items = t('amenities.items', { returnObjects: true }) as { title: string; desc: string }[];

  return (
    <section id="atouts" className="bg-brand-950 py-28 max-md:py-20 relative overflow-hidden">
      <div
        aria-hidden
        className="absolute -right-40 -top-40 w-[520px] h-[520px] rounded-full border border-sand-300/10"
      />
      <div
        aria-hidden
        className="absolute -right-24 -top-24 w-[360px] h-[360px] rounded-full border border-sand-300/10"
      />
      <div className="max-w-[1140px] mx-auto px-5 relative">
        <SectionHeading badge={t('amenities.badge')} title={t('amenities.title')} dark />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 mt-14 border border-white/10">
          {items.map((item, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-brand-950 px-10 max-md:px-7 py-11 group hover:bg-brand-900 transition-colors duration-300"
              >
                <Icon className="w-9 h-9 text-sand-300 mb-6 transition-transform duration-300 group-hover:-translate-y-1" strokeWidth={1.4} />
                <h3 className="font-serif text-white text-[23px] mb-3">{item.title}</h3>
                <p className="text-white/60 text-[14px] leading-[1.7]">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
