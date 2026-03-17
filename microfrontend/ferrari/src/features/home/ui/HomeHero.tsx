'use client';

import { motion } from 'framer-motion';
import { Button } from '@/shared/ui/Button';

export function HomeHero() {
  return (
    <section className="flex min-h-[85vh] flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1 className="text-6xl font-bold leading-none tracking-tighter text-[var(--color-text-primary)] md:text-8xl lg:text-9xl">
          Ferrari
        </h1>
      </motion.div>

      <motion.p
        className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--color-text-muted)] md:text-xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        A production-ready Next.js 16 microfrontend built with Feature-Sliced Design, Redux Toolkit, Zod, and a high-performance
        animation stack.
      </motion.p>

      <motion.div
        className="mt-8"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <Button variant="primary" size="md">
          🏎️ Ready to race
        </Button>
      </motion.div>
    </section>
  );
}

