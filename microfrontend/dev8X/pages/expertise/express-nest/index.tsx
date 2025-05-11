import React from 'react';
import Head from 'next/head';

import { FooterRevealPageWrap, ContentAsideImage, Footer, Header, Hero, ModularBlocks, IconCards, Button, ExpertiseCard, AwardsBlock, CardStack } from '@repo/components';
import { getDev8xPublicUrl } from '../../../utils/helpers';
import PageData from '../../../data/expertise/express-nest/index.d';

import PictureStyles from '../../../components/Surfaces/Picture/index.module.css';
import styles from '../index.module.css';

const Websites: React.FC = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Dev8X - Solutions Made Simple!</title>
        <meta name="description" content="Dev8X simplifies finding and connecting with businesses around the world."></meta>
        <link rel="canonical" href={`${getDev8xPublicUrl()}/express-nest`} />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Dev8X - Solutions Made Simple!"></meta>
        <meta property="og:description" content="Dev8X simplifies finding and connecting with businesses around the world."></meta>
        <meta property="og:url" content={`${getDev8xPublicUrl()}/express-nest`}></meta>
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
        <style jsx global>{`
          :root {
            --theme-primary: var(--pink-primary);
            --theme-primary-text: var(--pink-primary-text);
            --theme-secondary: var(--pink-secondary);
            --theme-text: var(--pink-text);
            --theme-background: var(--pink-tertiary);
            --theme-logo: var(--pink-secondary);
            --theme-header-face: var(--pink-primary);
          }
        `}</style>
        <Header />
        <FooterRevealPageWrap variant="page">
          <main className={`${styles['expertise-single']} container-full`}>
            <Hero variant="pink" tagText="Express.js/Nest.js" heading="Build fast, scalable APIs with precision" image="https://a-us.storyblok.com/f/1017006/3810x2036/6fe5a4bbe5/sussex-3810-x-2039.jpg" />

            <ModularBlocks>
              <IconCards title="Efficient server-side solutions" paragraph="Harness the power of Express.js and Nest.js to create lightweight, scalable backend applications. Whether you need a quick REST API or a robust GraphQL server, our team helps you build efficient, maintainable solutions." IconCardsItems={PageData.IconCardsItems} />
              <ContentAsideImage ContentAsideImageItems={PageData.ContentAsideImageItems} />
            </ModularBlocks>

            <div className={styles['expertise-container']}>
              <AwardsBlock />

              <div className={styles['expertise-container']}>
                <h2 className="hidden">Testimonials:</h2>

                <CardStack variant="Stack">
                  {PageData.testimonials.map((item, index) => (
                    <CardStack variant="Card" index={index} key={index}>
                      <figure className={styles['testimonial-card']} style={{ backgroundColor: item.bgColor, color: item.color }}>
                        <picture className={`${PictureStyles['picture']} ${PictureStyles['picture--responsive']} ${styles['testimonial-card__image']}`}>
                          <source srcSet={`${item.image}/m/390x360/filters:quality(80) 1x, ${item.image}/m/780x720/filters:quality(80) 2x`} media="(min-width: 0px) and (max-width: 479px)" />
                          <source srcSet={`${item.image}/m/872x806/filters:quality(80) 1x, ${item.image}/m/1744x1612/filters:quality(80) 2x`} media="(min-width: 480px) and (max-width: 991px)" />
                          <source srcSet={`${item.image}/m/667x609/filters:quality(80) 1x, ${item.image}/m/1334x1218/filters:quality(80) 2x`} media="(min-width: 992px)" />
                          <img src={`${item.image}/m/390x360/filters:quality(80)`} loading="lazy" width={390} height={360} alt="" draggable={false} />
                        </picture>

                        <blockquote className={styles['testimonial-card__quote']}>{`“${item.comment}”`}</blockquote>

                        <figcaption className={styles['testimonial-card__author']}>
                          <dl className={styles['testimonial-card__author-details']}>
                            <dt className={styles['testimonial-card__author-name']}>{item.name}</dt>
                            <dd className={styles['testimonial-card__author-title']}>{item.company}</dd>
                          </dl>
                        </figcaption>
                      </figure>
                    </CardStack>
                  ))}
                </CardStack>

                <footer className={styles['expertise-cta']}>
                  <h2 className={styles['expertise-cta__content']}>
                    <span>Extraordinary Digital Experiences</span>
                  </h2>
                  <div>
                    <Button>Submit a brief</Button>
                  </div>
                </footer>

                <ExpertiseCard />
              </div>
            </div>
          </main>
        </FooterRevealPageWrap>

        <Footer footerMainContent={PageData.footerMainContent} footerForm={PageData.footerForm} footerSocialLinks={PageData.footerSocialLinks} />
      </FooterRevealPageWrap>
    </>
  );
};

export default Websites;
