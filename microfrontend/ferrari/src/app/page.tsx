'use client';

import { FsdLayers, HomeHero, TechStackGrid } from '@/features/home';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg-primary)]">
      <HomeHero />
      <TechStackGrid />
      <FsdLayers />
    </main>
  );
}
