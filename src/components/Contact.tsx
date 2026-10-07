import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Phone, MapPin, Mail, Clock, ExternalLink } from 'lucide-react';
import type { ReactNode } from 'react';
import { site } from '../data/site';
import { BookingForm } from './BookingForm';
import { SectionHeading } from './SectionHeading';

export function Contact() {
  const { t } = useTranslation();

  return (
    <section id="contact" className="py-28 max-md:py-20 bg-brand-50 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <SectionHeading badge={t('contact.badge')} title={t('contact.title')} subtitle={t('contact.subtitle')} />
          <div className="space-y-7 mt-10">
            <Item icon={<Phone className="w-5 h-5" />} title={t('contact.phone')}>
              <a href={site.phoneHref} className="text-xl font-semibold text-brand-600 hover:text-brand-700">
                {site.phoneDisplay}
              </a>
            </Item>
            <Item icon={<MapPin className="w-5 h-5" />} title={t('contact.address')}>
              <p>{t('about.addressLine')}</p>
              <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-brand-600 hover:underline mt-1">
                {t('contact.map')} <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </Item>
            <Item icon={<Mail className="w-5 h-5" />} title={t('contact.email')}>
              <a href={`mailto:${site.email}`} className="hover:text-brand-600 break-all">
                {site.email}
              </a>
            </Item>
            <Item icon={<Clock className="w-5 h-5" />} title={t('contact.hours')}>
              <p>{t('contact.hoursValue')}</p>
            </Item>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="bg-white p-8 md:p-10 shadow-xl border border-slate-100 self-start"
        >
          <h3 className="text-2xl font-serif text-brand-950 mb-6">{t('contact.formTitle')}</h3>
          <BookingForm />
        </motion.div>
      </div>
    </section>
  );
}

function Item({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <div className="flex items-start gap-4">
      <div className="bg-white w-12 h-12 rounded-full shadow-sm text-brand-600 flex items-center justify-center shrink-0">{icon}</div>
      <div className="text-slate-600 font-light">
        <h4 className="font-serif text-lg text-brand-950 mb-0.5">{title}</h4>
        {children}
      </div>
    </div>
  );
}
