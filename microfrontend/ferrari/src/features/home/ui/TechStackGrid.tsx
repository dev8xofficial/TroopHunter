'use client';

import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, staggerItem } from '@/shared/lib/animations';
import { Card } from '@/shared/ui/Card';
import { techStack } from '../model/constants';

export function TechStackGrid() {
  return (
    <section className="container-narrow py-20">
      <motion.h2
        className="mb-12 text-center text-3xl font-bold tracking-tight text-[var(--color-text-primary)] md:text-4xl"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        Architecture &amp; Stack
      </motion.h2>

      <motion.div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        {techStack.map((item) => (
          <motion.div key={item.title} variants={staggerItem} className="transition-all duration-300 hover:-translate-y-1">
            <Card>
              <Card.Body className="p-6">
                <span className="mb-3 block text-3xl">{item.icon}</span>
                <h3 className="mb-1 text-base font-semibold text-[var(--color-text-primary)]">{item.title}</h3>
                <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">{item.desc}</p>
              </Card.Body>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

