import { useEffect } from 'react';
import Head from 'next/head';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Lenis from 'lenis';
import { getDev8xPublicUrl } from '../utils/helpers';
import Hero from '../components/Surfaces/Hero/Hero';
import Problems from './home/Problems/Problems';
import { FooterRevealPageWrap, Header, HomepageShowreel, Footer, WorkGrid, WhyDev8X } from '@repo/components';
import { PageData } from './index.d';

import styles from './index.module.css';

export default function Home() {
  const whyDev = {
    heading: 'Why Dev8X',
    para1: 'Dev8X is your trusted IT partner, here to help your business succeed in the digital world. We create custom solutions for websites, backend systems, and mobile apps that make your work easier, improve customer experiences, and help you reach your goals.',
    para2: 'By working with Dev8X, you gain access to smart solutions that make a real difference. We help you save time with automation, grow faster with reliable systems, and stay ahead of your competition. Whatever challenges you face, we’re here to help you succeed today and in the future.',
    image: 'https://a-us.storyblok.com/f/1017006/1200x1400/dc71890964/humaanpeople.jpg/m/450x548/filters:quality(80)',
    whyinfo: [
      { title: '100+', paragraph: 'In-house & independent' },
      { title: '5', paragraph: 'Years revolutionizing lead generation' },
      { title: '50+', paragraph: 'Success stories and counting' }
    ]
  };

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: any) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    lenis.on('scroll', ScrollTrigger.update);

    const element = document.querySelector('#showreel') as HTMLElement;
    const showreelInner = document.querySelector('#showreel-inner') as HTMLElement;

    if (element) {
      gsap.to(element, {
        '--progress': 1,
        scrollTrigger: {
          trigger: element,
          start: 'top 50%',
          end: 'bottom bottom',
          scrub: true
        }
      });

      gsap.to(showreelInner, {
        borderRadius: '0px',
        scrollTrigger: {
          trigger: element,
          start: 'top 50%',
          end: 'bottom bottom',
          scrub: true
        }
      });
    }

    return () => {
      ScrollTrigger.killAll();
    };
  }, []);

  useEffect(() => {
    const target = document.querySelector('#page-content');
    const trigger = document.querySelector('#footer-animation');

    if (target && trigger) {
      gsap.to(target, {
        scale: 0.95,
        scrollTrigger: {
          trigger: trigger,
          start: 'top bottom',
          end: 'top center',
          scrub: true
        },
        transformOrigin: 'center bottom',
        ease: 'none'
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <>
      <Head>
        <title>Dev8X - Solutions Made Simple!</title>
        <meta name="description" content="Dev8X simplifies finding and connecting with businesses around the world."></meta>
        <link rel="canonical" href={`${getDev8xPublicUrl()}`} />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Dev8X - Solutions Made Simple!"></meta>
        <meta property="og:description" content="Dev8X simplifies finding and connecting with businesses around the world."></meta>
        <meta property="og:url" content={`${getDev8xPublicUrl()}`}></meta>
        <meta property="og:locale" content="en_US"></meta>
        <meta property="og:image" content={`${getDev8xPublicUrl()}/logo-social.png`}></meta>
        <meta property="og:image:secure_url" content={`${getDev8xPublicUrl()}/logo-social.png`}></meta>
        <meta property="og:type" content="website"></meta>
        <meta property="og:site_name" content="Dev8X"></meta>

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image"></meta>
        <meta name="twitter:title" content="Dev8X - Solutions Made Simple!"></meta>
        <meta name="twitter:description" content="Dev8X simplifies finding and connecting with businesses around the world."></meta>
        <meta name="twitter:image" content={`${getDev8xPublicUrl()}/logo-social.png`}></meta>
        <meta name="twitter:site" content="@Dev8X"></meta>
      </Head>
      <FooterRevealPageWrap variant="frame">
        <Header />
        <FooterRevealPageWrap variant="page">
          {/* Main container with smooth-scrollbar */}
          <main className={styles['homepage']}>
            <Hero />
            <div className={styles['homepage__purple-change']}>
              <HomepageShowreel homepageShowreelCSSClass={styles['homepage__showreel']} />
            </div>
            <Problems />
            {/* <Hero />
            <FeatureVideoResponsive />
            <TestimonialsLarge /> */}
            <div className={styles['homepage__section']}>
              <WorkGrid workGridCSSClass={styles['work-grid']} />
              <WhyDev8X {...whyDev} />
            </div>
          </main>
        </FooterRevealPageWrap>
        <Footer footerMainContent={PageData.footerMainContent} footerForm={PageData.footerForm} footerSocialLinks={PageData.footerSocialLinks} />
      </FooterRevealPageWrap>
    </>
  );
}
