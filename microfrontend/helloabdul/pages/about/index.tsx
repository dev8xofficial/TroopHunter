'use client';

import React from 'react';
import Head from 'next/head';
import { FormModal, toggleSmoothModalAtom } from '@repo/components';
import { useSetAtom } from 'jotai';
import { AboutGallery, ContactFormModal, Footer, FooterRevealPageWrap, Header, LogoGrid, TestimonialAbout } from '@repo/components';
import { AppearOnScroll } from '@repo/components/src/Animations/AppearOnScroll';
import Capabilities from './Capabilities/Capabilities';
import SmoothModalWrapper from '../../components/Surfaces/SmoothModalWrapper/SmoothModalWrapper';
import PageData from '../../data/about/index.d';
import SubmenuData from '../../data/navigation/index.d';
import { prefixed } from '../../utils/helpers';

import AboutHeroStyles from '../../components/Surfaces/AboutHero/index.module.css';
import TextAnimateStyles from '../../components/Surfaces/TextAnimateUp/index.module.css';
import PictureStyles from '../../components/Surfaces/Picture/index.module.css';
import styles from './index.module.css';

const Contact: React.FC = (): JSX.Element => {
  const toggleModal = useSetAtom(toggleSmoothModalAtom);

  return (
    <>
      <Head>
        <title>{PageData.meta.title}</title>
        <meta name="description" content={PageData.meta.description}></meta>
        <link rel="canonical" href={prefixed('/about')} />

        {/* Open Graph Tags */}
        <meta property="og:title" content={PageData.meta.title}></meta>
        <meta property="og:description" content={PageData.meta.description}></meta>
        <meta property="og:url" content={prefixed('/about')}></meta>
        <meta property="og:locale" content="en_US"></meta>
        <meta property="og:image" content={prefixed('/logo-social.png')}></meta>
        <meta property="og:image:secure_url" content={prefixed('/logo-social.png')}></meta>
        <meta property="og:type" content="website"></meta>
        <meta property="og:site_name" content="Dev8X"></meta>

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image"></meta>
        <meta name="twitter:title" content={PageData.meta.title}></meta>
        <meta name="twitter:description" content={PageData.meta.description}></meta>
        <meta name="twitter:image" content={prefixed('/logo-social.png')}></meta>
        <meta name="twitter:site" content="@Dev8X"></meta>
      </Head>
      <FooterRevealPageWrap variant="frame">
        <Header submenuData={SubmenuData} />
        <FooterRevealPageWrap variant="page">
          <style jsx global>{`
            :root {
              --theme-primary: var(--blue-primary);
              --theme-primary-text: var(--blue-primary-text);
              --theme-secondary: var(--blue-secondary);
              --theme-text: var(--blue-text);
              --theme-background: #d8e7ee;
              --theme-logo: var(--blue-secondary);
              --theme-header-face: var(--blue-primary);
            }
          `}</style>
          {/* Main container with smooth-scrollbar */}
          <main className={styles['about']}>
            <div className={AboutHeroStyles['about-hero']} style={{ '--scrollY': '0' } as React.CSSProperties}>
              <div>
                <AppearOnScroll>
                  <div className={AboutHeroStyles['about-hero__hero-wrapper']}>
                    {/* Mobile Heading */}
                    <h1 className={`${AboutHeroStyles['about-hero__heading']} ${['about-hero__heading--mobile']}`} aria-label="Digital Products. Human Experiences.">
                      <span className={TextAnimateStyles['word']} aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', transform: 'translate3d(0px, 80%, 0px)' }}>
                        <span aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', opacity: 0 }}>
                          Digital
                        </span>
                      </span>
                      <br />
                      <span className={TextAnimateStyles['word']} aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', transform: 'translate3d(0px, 80%, 0px)' }}>
                        <span aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', opacity: 0 }}>
                          Craft.
                        </span>
                      </span>
                      <br />
                      <span className={TextAnimateStyles['word']} aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', transform: 'translate3d(0px, 80%, 0px)' }}>
                        <span aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', opacity: 0 }}>
                          Real
                        </span>
                      </span>
                      <br />
                      <span className={TextAnimateStyles['word']} aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', transform: 'translate3d(0px, 80%, 0px)' }}>
                        <span aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', opacity: 0 }}>
                          Impact.
                        </span>
                      </span>
                    </h1>
                    {/* Desktop Heading */}
                    <h1 className={`${AboutHeroStyles['about-hero__heading']} ${['about-hero__heading--desktop']}`}>
                      <span aria-label="Digital Products.">
                        <span className={TextAnimateStyles['word']} aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', transform: 'translate3d(0px, 0%, 0px)' }}>
                          <span aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', opacity: 1 }}>
                            Digital
                          </span>
                        </span>
                        <br />
                        <span className={TextAnimateStyles['word']} aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', transform: 'translate3d(0px, 0%, 0px)' }}>
                          <span aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', opacity: 1 }}>
                            Craft.
                          </span>
                        </span>
                      </span>
                      <br />
                      <span className="AboutHero_about-hero__heading-opacity__BrOA2">
                        <span aria-label="Human Experiences.">
                          <span className={TextAnimateStyles['word']} aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', transform: 'translate3d(0px, 0%, 0px)' }}>
                            <span aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', opacity: 1 }}>
                              Real
                            </span>
                          </span>
                          <br />
                          <span className={TextAnimateStyles['word']} aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', transform: 'translate3d(0px, 0%, 0px)' }}>
                            <span aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', opacity: 1 }}>
                              Impact.
                            </span>
                          </span>
                        </span>
                      </span>
                    </h1>
                    <div className={AboutHeroStyles['about-hero__image-wrapper']}>
                      <picture className={`${AboutHeroStyles['about-hero__image']} ${PictureStyles['picture']} ${PictureStyles['picture--responsive']}`}>
                        <source srcSet="https://a-us.storyblok.com/f/1017006/3360x3386/d6ac5adeb6/humaanabout.jpg/m/450x454/filters:quality(80) 1x" media="(min-width: 0px) and (max-width: 479px)" />
                        <source srcSet="https://a-us.storyblok.com/f/1017006/3360x3386/d6ac5adeb6/humaanabout.jpg/m/992x1000/filters:quality(80) 1x" media="(min-width: 480px) and (max-width: 991px)" />
                        <source srcSet="https://a-us.storyblok.com/f/1017006/3360x3386/d6ac5adeb6/humaanabout.jpg/m/1500x1512/filters:quality(80) 1x" media="(min-width: 992px) and (max-width: 1679px)" />
                        <source srcSet="https://a-us.storyblok.com/f/1017006/3360x3386/d6ac5adeb6/humaanabout.jpg/m/1680x1693/filters:quality(80) 1x" media="(min-width: 1680px)" />
                        <img src="https://a-us.storyblok.com/f/1017006/3360x3386/d6ac5adeb6/humaanabout.jpg/m/450x454/filters:quality(80)" loading="eager" width="450" height="454" alt="" className="" draggable="false" />
                      </picture>
                      <picture
                        className={`${AboutHeroStyles['about-hero__image']} ${PictureStyles['picture']} ${PictureStyles['picture--responsive']}`}
                        style={{
                          maskSize: '100%',
                          maskImage: 'url("https://a-us.storyblok.com/f/1017006/3360x3386/eacf69343b/humaanabout_mask.png")',
                          zIndex: 1
                        }}
                      >
                        <source srcSet="https://a-us.storyblok.com/f/1017006/3360x3386/d6ac5adeb6/humaanabout.jpg/m/450x454/filters:quality(80) 1x" media="(min-width: 0px) and (max-width: 479px)" />
                        <source srcSet="https://a-us.storyblok.com/f/1017006/3360x3386/d6ac5adeb6/humaanabout.jpg/m/992x1000/filters:quality(80) 1x" media="(min-width: 480px) and (max-width: 991px)" />
                        <source srcSet="https://a-us.storyblok.com/f/1017006/3360x3386/d6ac5adeb6/humaanabout.jpg/m/1500x1512/filters:quality(80) 1x" media="(min-width: 992px) and (max-width: 1679px)" />
                        <source srcSet="https://a-us.storyblok.com/f/1017006/3360x3386/d6ac5adeb6/humaanabout.jpg/m/1680x1693/filters:quality(80) 1x" media="(min-width: 1680px)" />
                        <img src="https://a-us.storyblok.com/f/1017006/3360x3386/d6ac5adeb6/humaanabout.jpg/m/450x454/filters:quality(80)" loading="lazy" width="450" height="454" alt="" className="" draggable="false" />
                      </picture>
                      <picture className={`${AboutHeroStyles['about-hero__image']} ${PictureStyles['picture']} ${PictureStyles['picture--responsive']}`}>
                        <source srcSet="https://a-us.storyblok.com/f/1017006/3360x3386/d6ac5adeb6/humaanabout.jpg/m/900x908/filters:quality(80) 2x" media="(min-width: 0px) and (max-width: 479px)" />
                        <source srcSet="https://a-us.storyblok.com/f/1017006/3360x3386/d6ac5adeb6/humaanabout.jpg/m/1984x2000/filters:quality(80) 2x" media="(min-width: 480px) and (max-width: 991px)" />
                        <source srcSet="https://a-us.storyblok.com/f/1017006/3360x3386/d6ac5adeb6/humaanabout.jpg/m/3000x3024/filters:quality(80) 2x" media="(min-width: 992px) and (max-width: 1679px)" />
                        <source srcSet="https://a-us.storyblok.com/f/1017006/3360x3386/d6ac5adeb6/humaanabout.jpg/m/3360x3386/filters:quality(80) 2x" media="(min-width: 1680px)" />
                        <img src="https://a-us.storyblok.com/f/1017006/3360x3386/d6ac5adeb6/humaanabout.jpg/m/450x454/filters:quality(80)" loading="lazy" width="450" height="454" alt="" className="" draggable="false" />
                      </picture>
                      <picture
                        className={`${AboutHeroStyles['about-hero__image']} ${PictureStyles['picture']} ${PictureStyles['picture--responsive']}`}
                        style={{
                          maskSize: '100%',
                          maskImage: 'url("https://a-us.storyblok.com/f/1017006/3360x3386/eacf69343b/humaanabout_mask.png")',
                          zIndex: 1
                        }}
                      >
                        <source srcSet="https://a-us.storyblok.com/f/1017006/3360x3386/d6ac5adeb6/humaanabout.jpg/m/900x908/filters:quality(80) 2x" media="(min-width: 0px) and (max-width: 479px)" />
                        <source srcSet="https://a-us.storyblok.com/f/1017006/3360x3386/d6ac5adeb6/humaanabout.jpg/m/1984x2000/filters:quality(80) 2x" media="(min-width: 480px) and (max-width: 991px)" />
                        <source srcSet="https://a-us.storyblok.com/f/1017006/3360x3386/d6ac5adeb6/humaanabout.jpg/m/3000x3024/filters:quality(80) 2x" media="(min-width: 992px) and (max-width: 1679px)" />
                        <source srcSet="https://a-us.storyblok.com/f/1017006/3360x3386/d6ac5adeb6/humaanabout.jpg/m/3360x3386/filters:quality(80) 2x" media="(min-width: 1680px)" />
                        <img src="https://a-us.storyblok.com/f/1017006/3360x3386/d6ac5adeb6/humaanabout.jpg/m/450x454/filters:quality(80)" loading="lazy" width="450" height="454" alt="" className="" draggable="false" />
                      </picture>
                    </div>
                  </div>
                </AppearOnScroll>
                <AppearOnScroll>
                  <div className={AboutHeroStyles['about-hero__container']}>
                    <p className={AboutHeroStyles['about-hero__intro']} aria-label={PageData.aboutSections[0]}>
                      {PageData.aboutSections[0].split(' ').map((word, index) => {
                        const cleanWord = word.replace(/[.,]/g, '').toLowerCase();
                        const isSpecial = cleanWord === 'human-focused';
                        return (
                          <span
                            key={index}
                            className={`${TextAnimateStyles['word']} ${isSpecial ? styles['format'] : ''}`}
                            aria-hidden="true"
                            style={{
                              display: 'inline-block',
                              whiteSpace: 'pre',
                              transform: 'translate3d(0px, 0%, 0px)',
                              opacity: 1,
                              transitionDelay: `${index * 0.05}s`
                            }}
                          >
                            <span
                              aria-hidden="true"
                              style={{
                                display: 'inline-block',
                                whiteSpace: 'pre',
                                opacity: 1
                              }}
                            >
                              {word + ' '}
                            </span>
                          </span>
                        );
                      })}
                    </p>
                  </div>
                </AppearOnScroll>
              </div>
            </div>
            <div className="">
              <AboutGallery />
              <AppearOnScroll>
                <div className={styles['about-logos']}>
                  <h2 className={styles['about-logos__intro']} aria-label={PageData.aboutSections[1]}>
                    {PageData.aboutSections[1].split(' ').map((word, index) => {
                      // Clean word for accurate comparison (remove punctuation, make lowercase)
                      const cleanWord = word.replace(/[.,]/g, '').toLowerCase();
                      const isSpecial = cleanWord === 'helloabdul';

                      return (
                        <span
                          key={index}
                          className={`${TextAnimateStyles['word']} ${isSpecial ? styles['format'] : ''}`}
                          aria-hidden="true"
                          style={{
                            display: 'inline-block',
                            whiteSpace: 'pre',
                            transform: 'translate3d(0px, 0%, 0px)',
                            opacity: 1,
                            transitionDelay: `${index * 0.05}s`
                          }}
                        >
                          <span
                            aria-hidden="true"
                            style={{
                              display: 'inline-block',
                              whiteSpace: 'pre',
                              opacity: 1
                            }}
                          >
                            {word + ' '}
                          </span>
                        </span>
                      );
                    })}
                  </h2>
                  <LogoGrid />
                </div>
              </AppearOnScroll>
              <AppearOnScroll>
                <div className={styles['about-capabilities']}>
                  <h2 className={styles['about-capabilities__intro']} aria-label={PageData.aboutSections[2]}>
                    {PageData.aboutSections[2].split(' ').map((word, index) => {
                      const isSpecial = word.toLowerCase().includes('capabilities');
                      return (
                        <span
                          key={index}
                          className={`${TextAnimateStyles['word']} ${isSpecial ? styles['format'] : ''}`}
                          aria-hidden="true"
                          style={{
                            display: 'inline-block',
                            whiteSpace: 'pre',
                            transform: 'translate3d(0px, 0%, 0px)',
                            opacity: 1,
                            transitionDelay: `${index * 0.05}s`
                          }}
                        >
                          <span
                            aria-hidden="true"
                            style={{
                              display: 'inline-block',
                              whiteSpace: 'pre',
                              opacity: 1
                            }}
                          >
                            {word + ' '}
                          </span>
                        </span>
                      );
                    })}
                  </h2>

                  <Capabilities capabilities={PageData.capabilities} />
                </div>
              </AppearOnScroll>
            </div>

            <div className={`${styles['about-midpage-banner']} ${styles['about-midpage-banner--visible']}`}>
              <TestimonialAbout testimonialCSSClass={styles['about-testimonials']} testimonials={PageData.testimonials} authors={PageData.authors} />
            </div>
            <div className="">
              {/* <AwardsBlock /> */}

              <div className={styles['about-dos-donts']}>
                <AppearOnScroll>
                  <h2 className={styles['about-dos-donts__intro']} aria-label={PageData.aboutSections[3]}>
                    {PageData.aboutSections[3].split(' ').map((word, index) => (
                      <span
                        key={index}
                        className={TextAnimateStyles['word']}
                        aria-hidden="true"
                        style={{
                          display: 'inline-block',
                          whiteSpace: 'pre',
                          transform: 'translate3d(0px, 0%, 0px)',
                          opacity: 1,
                          transitionDelay: `${index * 0.05}s`
                        }}
                      >
                        <span
                          aria-hidden="true"
                          style={{
                            display: 'inline-block',
                            whiteSpace: 'pre',
                            opacity: 1
                          }}
                        >
                          {word + ' '}
                        </span>
                      </span>
                    ))}
                  </h2>
                </AppearOnScroll>
                <AppearOnScroll>
                  <div className={styles['about-dos-donts__grid']}>
                    {PageData.whatWeDo.map(({ heading, items }) => (
                      <section key={heading} className={styles['about-column']} style={{ opacity: 1, transform: 'translateX(0px)' }}>
                        <h3 className={styles['about-column__heading']}>{heading}</h3>

                        <ul className={styles['about-column__list']}>
                          {items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </section>
                    ))}
                  </div>
                </AppearOnScroll>
              </div>
            </div>
          </main>
        </FooterRevealPageWrap>
        <Footer footerMainContent={PageData.footerMainContent} footerData={PageData.footerData} footerSocialLinks={PageData.footerSocialLinks} onClick={() => toggleModal('contact')} />
      </FooterRevealPageWrap>
      <SmoothModalWrapper modalType="contact" toggle={() => toggleModal('contact')}>
        <FormModal />
      </SmoothModalWrapper>
    </>
  );
};

export default Contact;
