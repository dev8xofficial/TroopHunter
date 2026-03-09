'use client';

/**
 * GSAP Animation Utilities
 *
 * Server-safe: All functions check for window before executing.
 * Registers ScrollTrigger for scroll-driven animations.
 */

import { gsap } from 'gsap';

// Dynamically import ScrollTrigger only on client
let ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger | null = null;

export async function initGSAP() {
  if (typeof window === 'undefined') return;

  const mod = await import('gsap/ScrollTrigger');
  ScrollTrigger = mod.ScrollTrigger;
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Create a GSAP timeline with sensible defaults
 */
export function createTimeline(config?: gsap.TimelineVars) {
  return gsap.timeline({
    paused: true,
    ...config
  });
}

/**
 * Create a scroll-triggered animation
 */
export function createScrollAnimation(trigger: string | Element, animation: gsap.TweenVars, scrollConfig?: ScrollTrigger.Vars) {
  if (typeof window === 'undefined' || !ScrollTrigger) return null;

  return gsap.to(trigger, {
    ...animation,
    scrollTrigger: {
      trigger,
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse',
      ...scrollConfig
    }
  });
}

/**
 * Fade-in-up animation preset
 */
export function fadeInUp(element: string | Element, delay: number = 0) {
  return gsap.fromTo(element, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, delay, ease: 'power3.out' });
}

/**
 * Staggered children animation
 */
export function staggerReveal(parent: string | Element, childSelector: string, stagger: number = 0.1) {
  return gsap.fromTo(`${parent} ${childSelector}`, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, stagger, ease: 'power2.out' });
}

export { gsap };
