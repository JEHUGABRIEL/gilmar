import { useTranslation } from 'react-i18next';
import { media } from '../data/media';
import { ApartmentGrid } from '../components/Apartments';
import { Amenities } from '../components/Amenities';
import { Gallery } from '../components/Gallery';

export function ApartmentsPage() {
  const { t } = useTranslation();

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

      <Gallery />
    </main>
  );
}
