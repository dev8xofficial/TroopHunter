import React from 'react';
import Head from 'next/head';
import { toggleSmoothModalAtom } from '../../store/smoothModalAtom';
import { useSetAtom } from 'jotai';
import { AboutGallery, AwardsBlock, ContactFormModal, Footer, FooterRevealPageWrap, Header, LogoGrid, TestimonialAbout } from '@repo/components';
import Capabilities from './Capabilities/Capabilities';
import { getDev8xPublicUrl } from '../../utils/helpers';
import SmoothModalWrapper from '../../components/Surfaces/SmoothModalWrapper/SmoothModalWrapper';
import PageData from '../../data/about/index.d';

import AboutHeroStyles from '../../components/Surfaces/AboutHero/index.module.css';
import TextAnimateStyles from '../../components/Surfaces/TextAnimateUp/index.module.css';
import PictureStyles from '../../components/Surfaces/Picture/index.module.css';

import styles from './index.module.css';

const Contact: React.FC = (): JSX.Element => {
  const toggleModal = useSetAtom(toggleSmoothModalAtom);
  const above = 'Above all, we believe in human relationships, exceptional outcomes, and having fun along the way.';
  const paragraph = 'Human-focused experiences shape everything we create – from how we collaborate as a team, to the partnerships we build, and the digital solutions we deliver. This belief lives in our culture, fuels our curiosity, and drives how we approach every project from start to finish.';
  const headingText = 'Since 2019 we’ve been working with amazing clients to create meaningful impact and compelling experiences.';
  const heading = 'Our capabilities are centred around our ability to deliver world-class websites and apps. We’re 100% in-house and work end-to-end, ensuring each project is delivered to the highest standard.';
  return (
    <>
      <Head>
        <title>Dev8X - Solutions Made Simple!</title>
        <meta name="description" content="Dev8X simplifies finding and connecting with businesses around the world."></meta>
        <link rel="canonical" href={`${getDev8xPublicUrl()}/about`} />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Dev8X - Solutions Made Simple!"></meta>
        <meta property="og:description" content="Dev8X simplifies finding and connecting with businesses around the world."></meta>
        <meta property="og:url" content={`${getDev8xPublicUrl()}/about`}></meta>
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
                <div className={AboutHeroStyles['about-hero__container']}>
                  <p className={AboutHeroStyles['about-hero__intro']} aria-label={paragraph}>
                    {paragraph.split(' ').map((word, index) => {
                      const isSpecial = word.toLowerCase().includes('Human-focused');
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
              </div>
            </div>
            <div className="">
              <AboutGallery />
              <div className={styles['about-logos']}>
                <h2 className={styles['about-logos__intro']} aria-label={headingText}>
                  {headingText.split(' ').map((word, index) => {
                    const isSpecial = word.toLowerCase().includes('clients');
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
              <div className={styles['about-capabilities']}>
                <h2 className={styles['about-capabilities__intro']} aria-label={heading}>
                  {heading.split(' ').map((word, index) => {
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

                <Capabilities />
              </div>
            </div>
            <div className={`${styles['about-midpage-banner']} ${styles['about-midpage-banner--visible']}`}>
              <TestimonialAbout />
            </div>
            <div className="">
              <AwardsBlock />
              <div className={styles['about-dos-donts']}>
                <h2 className={styles['about-dos-donts__intro']} aria-label={above}>
                  {above.split(' ').map((word, index) => (
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

                <div className={styles['about-dos-donts__grid']}>
                  <section className={styles['about-column']} style={{ opacity: 1, transform: 'translateX(0px)' }}>
                    <h3 className={styles['about-column__heading']}>What we do</h3>
                    <ul className={styles['about-column__list']}>
                      <li>World-className </li>
                      <li>Expect creativity</li>
                      <li>Celebrate success</li>
                      <li>Obsess over detail</li>
                      <li>Pub lunch Fridays</li>
                      <li>Embrace change</li>
                      <li>Unlock potential</li>
                      <li>High-five</li>
                      <li>Outstanding service</li>
                      <li>Value relationships</li>
                      <li>Exceed expectations</li>
                      <li>Party</li>
                    </ul>
                  </section>
                  <section className={styles['about-column']} style={{ opacity: 1, transform: 'translateX(0px)' }}>
                    <h3 className={styles['about-column__heading']}>
                      <span>What we don't</span>
                    </h3>
                    <ul className={styles['about-column__list']}>
                      <li>Work weekends</li>
                      <li>Outsource</li>
                      <li>Resist cake</li>
                      <li>Lose at Mario Kart</li>
                      <li>‘Make it pop’</li>
                      <li>Free pitches</li>
                      <li>Sacrifice quality</li>
                      <li>Egos</li>
                      <li>Overpromise</li>
                      <li>Cut corners</li>
                      <li>Accept mediocrity</li>
                      <li>Decaf</li>
                    </ul>
                  </section>
                </div>
              </div>
            </div>
          </main>
        </FooterRevealPageWrap>
        <Footer footerMainContent={PageData.footerMainContent} footerForm={PageData.footerForm} footerSocialLinks={PageData.footerSocialLinks} onClick={() => toggleModal('contact')} />
      </FooterRevealPageWrap>
      <SmoothModalWrapper modalType="contact" toggle={() => toggleModal('contact')}>
        <ContactFormModal />
      </SmoothModalWrapper>
    </>
  );
};

export default Contact;
