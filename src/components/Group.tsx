import { useTranslation } from 'react-i18next';
import { BedDouble, Car, Sprout, HardHat, Ship, Store, Handshake } from 'lucide-react';
import { SectionHeading } from './SectionHeading';

const icons = [BedDouble, Car, Sprout, HardHat, Ship, Store, Handshake];

/** Les activités de la Société Gilmar, en bandeau défilant. */
export function Group() {
  const { t } = useTranslation();
  const items = t('group.items', { returnObjects: true }) as { title: string; desc: string }[];
  const loop = [...items, ...items, ...items];

  return (
    <section className="bg-white py-24 max-md:py-16 overflow-hidden">
      <div className="max-w-[1140px] mx-auto px-5 mb-12">
        <SectionHeading badge={t('group.badge')} title={t('group.title')} subtitle={t('group.subtitle')} align="center" />
      </div>
      <div className="relative">
        <div className="absolute left-0 inset-y-0 w-24 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />
        <div className="absolute right-0 inset-y-0 w-24 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />
        <div className="flex gap-6 w-max hover:[animation-play-state:paused]" style={{ animation: 'marquee 45s linear infinite' }}>
          {loop.map((item, i) => {
            const Icon = icons[i % items.length];
            return (
              <div key={i} className="w-[300px] shrink-0 border border-slate-100 bg-slate-50/60 px-8 py-9 hover:border-brand-200 hover:bg-brand-50 transition-colors">
                <Icon className="w-8 h-8 text-brand-500 mb-5" strokeWidth={1.4} />
                <h3 className="font-serif text-brand-950 text-[21px] mb-2">{item.title}</h3>
                <p className="text-slate-500 text-[13.5px] leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
