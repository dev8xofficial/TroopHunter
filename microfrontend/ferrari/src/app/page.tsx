'use client';

import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, staggerItem } from '@/shared/lib/animations';

const techStack = [
  { icon: '⚡', title: 'Next.js 16', desc: 'App Router with Turbopack' },
  { icon: '🏗️', title: 'Feature-Sliced Design', desc: 'Scalable architecture' },
  { icon: '🎨', title: 'Tailwind CSS', desc: 'Utility-first styling' },
  { icon: '🎬', title: 'Framer Motion', desc: 'Layout transitions' },
  { icon: '✨', title: 'GSAP', desc: 'Complex timelines & ScrollTrigger' },
  { icon: '📦', title: 'Redux Toolkit', desc: 'Global UI state slices' },
  { icon: '🔍', title: 'Zod', desc: 'End-to-end type safety' },
  { icon: '🌊', title: 'Lenis', desc: 'Smooth scrolling' }
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[var(--ferrari-light)]">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center min-h-[85vh] px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-[var(--ferrari-dark)] leading-none">Ferrari</h1>
        </motion.div>

        <motion.p className="mt-6 text-lg md:text-xl text-[var(--ferrari-muted)] max-w-xl leading-relaxed" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}>
          A production-ready Next.js 16 microfrontend built with Feature-Sliced Design, Redux Toolkit, Zod, and a high-performance animation stack.
        </motion.p>

        <motion.div className="mt-8" initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}>
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--ferrari-dark)] text-white text-sm font-medium tracking-wide">🏎️ Ready to race</span>
        </motion.div>
      </section>

      {/* Tech Stack Grid */}
      <section className="container-narrow py-20">
        <motion.h2 className="text-3xl md:text-4xl font-bold text-center text-[var(--ferrari-dark)] mb-12 tracking-tight" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          Architecture & Stack
        </motion.h2>

        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
          {techStack.map((item) => (
            <motion.div key={item.title} variants={staggerItem} className="p-6 rounded-2xl bg-white/70 border border-black/[0.04] hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
              <span className="text-3xl block mb-3">{item.icon}</span>
              <h3 className="text-base font-semibold text-[var(--ferrari-dark)] mb-1">{item.title}</h3>
              <p className="text-sm text-[var(--ferrari-muted)] leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* FSD Layers */}
      <section className="container-narrow py-20">
        <motion.h2 className="text-3xl md:text-4xl font-bold text-center text-[var(--ferrari-dark)] mb-12 tracking-tight" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          Feature-Sliced Layers
        </motion.h2>

        <motion.div className="flex flex-col gap-3" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {[
            { layer: 'app', desc: 'Next.js App Router — routing, layouts, metadata', color: 'bg-red-500' },
            { layer: 'processes', desc: 'Cross-feature orchestration & workflows', color: 'bg-orange-500' },
            { layer: 'features', desc: 'Self-contained feature modules (UI + model)', color: 'bg-amber-500' },
            { layer: 'entities', desc: 'Business domain models & data', color: 'bg-emerald-500' },
            { layer: 'shared', desc: 'UI kit, animations, API client, store, config', color: 'bg-blue-500' }
          ].map((item) => (
            <motion.div key={item.layer} variants={staggerItem} className="flex items-center gap-4 p-5 rounded-xl bg-white/70 border border-black/[0.04]">
              <div className={`w-3 h-3 rounded-full ${item.color} shrink-0`} />
              <div>
                <span className="font-mono text-sm font-semibold text-[var(--ferrari-dark)]">{item.layer}/</span>
                <span className="ml-2 text-sm text-[var(--ferrari-muted)]">{item.desc}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </main>
  );
}
