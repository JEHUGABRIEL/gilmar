import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { whatsappLink } from '../data/site';
import { WhatsAppIcon } from './WhatsAppIcon';

export function WhatsAppFab() {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed bottom-24 right-5 z-40 group">
          <div className="absolute bottom-1/2 translate-y-1/2 right-full mr-3 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity hidden lg:block">
            <div className="bg-white text-slate-700 text-xs font-medium px-3 py-2 rounded-lg shadow-lg border border-slate-100 whitespace-nowrap">
              {t('footer.whatsappTooltip')}
            </div>
          </div>
          <motion.a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30"
          >
            <WhatsAppIcon className="w-7 h-7" />
          </motion.a>
          <motion.div
            aria-hidden
            className="absolute inset-0 rounded-full bg-[#25D366] -z-10"
            initial={{ opacity: 0.4, scale: 1 }}
            animate={{ opacity: 0, scale: 1.5 }}
            transition={{ repeat: Infinity, duration: 2, delay: 1, ease: 'easeOut' }}
          />
        </div>
      )}
    </AnimatePresence>
  );
}
