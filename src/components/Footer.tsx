import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Facebook } from 'lucide-react';
import { site, whatsappLink } from '../data/site';
import { media } from '../data/media';
import { WhatsAppIcon } from './WhatsAppIcon';

const links = [
  { key: 'nav.home', to: '/' },
  { key: 'nav.about', to: '/#about' },
  { key: 'nav.apartments', to: '/appartements' },
  { key: 'nav.restaurant', to: '/#restaurant' },
  { key: 'nav.vehicles', to: '/#vehicules' },
  { key: 'nav.gym', to: '/#sport' },
];

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-brand-950 text-white/70 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr_1fr] gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img src={media.logo} alt={site.legalName} className="h-16 w-16 rounded-full" />
              <span className="leading-none">
                <span className="block font-serif text-2xl text-white">Gilmar</span>
                <span className="block text-[10px] uppercase tracking-[3.5px] text-sand-300 mt-1">Résidence</span>
              </span>
            </div>
            <p className="text-sm font-light leading-relaxed max-w-xs">{t('footer.description')}</p>
          </div>

          <div>
            <h4 className="font-sans text-white font-semibold uppercase tracking-[2px] text-xs mb-5">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2.5 text-sm font-light">
              {links.map((l) => (
                <li key={l.key}>
                  <Link to={l.to} className="hover:text-sand-300 transition-colors">
                    {t(l.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-sans text-white font-semibold uppercase tracking-[2px] text-xs mb-5">{t('footer.contact')}</h4>
            <p className="text-sm font-light leading-relaxed">{t('about.addressLine')}</p>
            <a href={site.phoneHref} className="text-sand-300 hover:text-sand-200 text-lg font-semibold block mt-4">
              {site.phoneDisplay}
            </a>
            <a href={`mailto:${site.email}`} className="text-sm hover:text-sand-300 break-all">
              {site.email}
            </a>
            <h4 className="font-sans text-white/50 font-semibold uppercase tracking-[2px] text-[11px] mt-7 mb-3">{t('footer.followUs')}</h4>
            <div className="flex gap-3">
              <a href={site.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-500 hover:text-white transition-colors">
                <Facebook className="w-[18px] h-[18px]" />
              </a>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-colors">
                <WhatsAppIcon className="w-[18px] h-[18px]" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-xs font-light text-white/50 flex flex-col md:flex-row justify-between gap-2">
          <p>
            © {new Date().getFullYear()} {site.legalName}. {t('footer.rights')}
          </p>
          <p>{t('footer.country')}</p>
        </div>
      </div>
    </footer>
  );
}
