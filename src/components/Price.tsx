import { useTranslation } from 'react-i18next';

/** Affiche « 40 000 FCFA / nuit », ou « Sur demande » si aucun prix n'est publié. */
export function Price({ amount, suffix, className = '' }: { amount: string; suffix?: string; className?: string }) {
  const { t } = useTranslation();
  if (!amount) return <span className={className}>{t('apartments.onRequest')}</span>;
  return (
    <span className={`inline-flex items-baseline gap-1 ${className}`}>
      <span>{amount}</span>
      <span className="text-[0.75em] font-semibold tracking-wider">FCFA</span>
      {suffix && <span className="text-[0.85em] opacity-80 normal-case tracking-normal">{suffix}</span>}
    </span>
  );
}
