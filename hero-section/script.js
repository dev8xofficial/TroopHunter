/* ═══════════════════════════════════════════════════════════
   THE BURKES GROUP — Hero Section Scripts
   Animation Engine: Vanilla JS (inspired by GSAP patterns)
   Matches Olivia Harper Homes motion design principles:
   - Scroll-driven narrative
   - Subtle over flashy
   - Performance-aware (will-change, RAF)
   ═══════════════════════════════════════════════════════════ */

(function () {
    'use strict';

    /* ────────────────────────────────────────────────────────
       1. INITIALIZATION — Wait for fonts before animating
       ──────────────────────────────────────────────────────── */

    document.addEventListener('DOMContentLoaded', () => {
        const hero = document.querySelector('.hero');
        if (hero) hero.classList.add('is-loading');

        // Wait for custom fonts to load (prevents layout shift with SplitText-style animations)
        document.fonts.ready.then(() => {
            if (hero) hero.classList.remove('is-loading');
            requestAnimationFrame(() => {
                initHeroAnimations();
                initMobileMenu();
                initHeaderScroll();
            });
        });
    });


    /* ────────────────────────────────────────────────────────
       2. HERO ANIMATIONS — Line-by-line title reveal
       ──────────────────────────────────────────────────────── */

    function initHeroAnimations() {
        const titles = document.querySelectorAll('.hero__title');
        const tags = document.getElementById('hero-tags');
        const subtitle = document.getElementById('hero-subtitle');
        const scroll = document.getElementById('hero-scroll');

        // Staggered title reveal (matches Olivia Harper's Lottie title timing at 1.6x speed)
        titles.forEach((title, index) => {
            const delay = 300 + (index * 250);
            setTimeout(() => {
                title.classList.add('is-revealed');
            }, delay);
        });

        // Tags reveal after titles
        if (tags) {
            setTimeout(() => {
                tags.classList.add('is-revealed');
            }, 950);
        }

        // Subtitle reveal
        if (subtitle) {
            setTimeout(() => {
                subtitle.classList.add('is-revealed');
            }, 1100);
        }

        // Scroll indicator reveal
        if (scroll) {
            setTimeout(() => {
                scroll.classList.add('is-revealed');
            }, 1350);
        }
    }


    /* ────────────────────────────────────────────────────────
       3. MOBILE MENU — Hamburger toggle
       ──────────────────────────────────────────────────────── */

    function initMobileMenu() {
        const hamburger = document.getElementById('hamburger-toggle');
        const mobileMenu = document.getElementById('mobile-menu');
        const closeBtn = document.getElementById('mobile-menu-close');
        const menuLinks = document.querySelectorAll('.mobile-menu__link');

        if (!hamburger || !mobileMenu) return;

        function openMenu() {
            mobileMenu.classList.add('is-open');
            mobileMenu.setAttribute('aria-hidden', 'false');
            hamburger.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        }

        function closeMenu() {
            mobileMenu.classList.remove('is-open');
            mobileMenu.setAttribute('aria-hidden', 'true');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }

        hamburger.addEventListener('click', openMenu);

        if (closeBtn) {
            closeBtn.addEventListener('click', closeMenu);
        }

        // Close menu when a link is clicked
        menuLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Close menu on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
                closeMenu();
            }
        });
    }


    /* ────────────────────────────────────────────────────────
       4. HEADER SCROLL BEHAVIOR — Subtle opacity shift
       ──────────────────────────────────────────────────────── */

    function initHeaderScroll() {
        const header = document.getElementById('header');
        if (!header) return;

        let ticking = false;

        function onScroll() {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrollY = window.scrollY;
                    const heroHeight = window.innerHeight * 0.94;

                    if (scrollY > heroHeight * 0.1) {
                        header.style.backdropFilter = 'blur(12px)';
                        header.style.webkitBackdropFilter = 'blur(12px)';
                        header.style.background = 'rgba(49, 49, 49, 0.25)';
                    } else {
                        header.style.backdropFilter = 'blur(4px)';
                        header.style.webkitBackdropFilter = 'blur(4px)';
                        header.style.background = '';
                    }

                    ticking = false;
                });
                ticking = true;
            }
        }

        window.addEventListener('scroll', onScroll, { passive: true });
    }

})();
