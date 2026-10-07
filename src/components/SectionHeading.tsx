import { motion } from 'framer-motion';

export function SectionHeading({
  badge,
  title,
  subtitle,
  align = 'left',
  dark = false,
}: {
  badge: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  dark?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={align === 'center' ? 'text-center mx-auto max-w-2xl' : 'max-w-2xl'}
    >
      <span className="font-sans text-sand-400 text-[12px] font-semibold uppercase tracking-[4px] mb-3 block">
        {badge}
      </span>
      <h2 className={`font-serif text-[44px] max-lg:text-[36px] leading-[1.1] font-normal ${dark ? 'text-white' : 'text-brand-950'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`font-sans text-[15px] leading-[1.7] mt-4 ${dark ? 'text-white/70' : 'text-slate-600'}`}>{subtitle}</p>
      )}
    </motion.div>
  );
}
