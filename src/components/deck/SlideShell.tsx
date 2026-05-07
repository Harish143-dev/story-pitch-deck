import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function SlideShell({
  eyebrow,
  number,
  children,
  variant = "light",
  className = "",
}: {
  eyebrow?: string;
  number?: string;
  children: ReactNode;
  variant?: "light" | "dark";
  className?: string;
}) {
  const dark = variant === "dark";
  return (
    <section
      className={`relative h-full w-full overflow-y-auto overflow-x-hidden ${dark ? "bg-ink text-cream" : "bg-cream text-ink"} ${className}`}
    >
      <div className="flex min-h-full flex-col px-5 pt-8 pb-24 sm:px-8 sm:pt-10 md:px-20 md:pt-16">
        {(eyebrow || number) && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`mb-6 md:mb-10 flex items-center gap-4 text-[10px] md:text-[11px] uppercase tracking-[0.3em] ${dark ? "text-cream/50" : "text-ink-soft"}`}
          >
            {number && <span className="text-gold">{number}</span>}
            {eyebrow && <span>{eyebrow}</span>}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
