'use client';

import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, staggerItem } from '@/shared/lib/animations';
import { Card } from '@/shared/ui/Card';
import { fsdLayers } from '../model/constants';

export function FsdLayers() {
  return (
    <section className="container-narrow py-20">
      <motion.h2
        className="mb-12 text-center text-3xl font-bold tracking-tight text-[var(--color-text-primary)] md:text-4xl"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        Feature-Sliced Layers
      </motion.h2>

      <motion.div className="flex flex-col gap-3" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        {fsdLayers.map((item) => (
          <motion.div key={item.layer} variants={staggerItem}>
            <Card>
              <Card.Body className="flex items-center gap-4 p-5">
                <div
                  className="h-3 w-3 shrink-0 rounded-full bg-[var(--color-brand-primary)] opacity-70"
                  aria-hidden="true"
                />
                <div>
                  <span className="font-mono text-sm font-semibold text-[var(--color-text-primary)]">{item.layer}/</span>
                  <span className="ml-2 text-sm text-[var(--color-text-muted)]">{item.desc}</span>
                </div>
              </Card.Body>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

