import { useEffect, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

/** Fenêtre modale : verrouille le défilement, se ferme avec Échap ou un clic à l'extérieur. */
export function Modal({
  open,
  onClose,
  children,
  className = 'max-w-4xl',
  closeLabel = 'Fermer',
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  closeLabel?: string;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-brand-950/70 backdrop-blur-sm flex items-end sm:items-center justify-center sm:p-6"
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1, transition: { type: 'spring', damping: 28, stiffness: 280 } }}
            exit={{ opacity: 0, y: 20, transition: { duration: 0.15 } }}
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full ${className} bg-white shadow-2xl max-h-[92svh] overflow-y-auto`}
          >
            <button
              onClick={onClose}
              aria-label={closeLabel}
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 text-slate-700 shadow flex items-center justify-center hover:bg-white"
            >
              <X className="w-4 h-4" />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
