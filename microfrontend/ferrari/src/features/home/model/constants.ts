export const techStack = [
  { icon: '⚡', title: 'Next.js 16', desc: 'App Router with Turbopack' },
  { icon: '🏗️', title: 'Feature-Sliced Design', desc: 'Scalable architecture' },
  { icon: '🎨', title: 'Tailwind CSS', desc: 'Utility-first styling' },
  { icon: '🎬', title: 'Framer Motion', desc: 'Layout transitions' },
  { icon: '✨', title: 'GSAP', desc: 'Complex timelines & ScrollTrigger' },
  { icon: '📦', title: 'Redux Toolkit', desc: 'Global UI state slices' },
  { icon: '🔍', title: 'Zod', desc: 'End-to-end type safety' },
  { icon: '🌊', title: 'Lenis', desc: 'Smooth scrolling' }
] as const;

export const fsdLayers = [
  { layer: 'app', desc: 'Next.js App Router — routing, layouts, metadata' },
  { layer: 'processes', desc: 'Cross-feature orchestration & workflows' },
  { layer: 'features', desc: 'Self-contained feature modules (UI + model)' },
  { layer: 'entities', desc: 'Business domain models & data' },
  { layer: 'shared', desc: 'UI kit, animations, API client, store, config' }
] as const;

