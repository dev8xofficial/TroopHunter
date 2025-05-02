import React from 'react';
import Head from 'next/head';
<<<<<<< HEAD
import { FooterRevealPageWrap, ContentAsideImage, Footer, Header, Hero, IconCards, ModularBlocks, Button, ExpertiseCard } from '@repo/components';
=======

import { FooterRevealPageWrap, ContentAsideImage, Footer, Header, Hero, ModularBlocks, IconCards, CardStack, AwardsBlock } from '@repo/components';
>>>>>>> 9462275350fb529763d78a19c2c16cfdb2111e94
import { PageData } from './index.d';

import PictureStyles from '../../../components/Surfaces/Picture/index.module.css';
import styles from './index.module.css';

const UI: React.FC = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Dev8X - Solutions Made Simple!</title>
        <meta name="description" content="TroopHunter simplifies finding and connecting with businesses around the world."></meta>
        <link rel="canonical" href={`${process.env.VITE_TROOPHUNTER_PUBLIC_URL}`} />

        {/* Open Graph Tags */}
        <meta property="og:title" content="TroopHunter - Find your next client!"></meta>
        <meta property="og:description" content="TroopHunter simplifies finding and connecting with businesses around the world."></meta>
        <meta property="og:url" content={`${process.env.VITE_TROOPHUNTER_PUBLIC_URL}`}></meta>
        <meta property="og:locale" content="en_US"></meta>
        <meta property="og:image" content={`${process.env.VITE_TROOPHUNTER_PUBLIC_URL}/logo/logo-social.png`}></meta>
        <meta property="og:image:secure_url" content={`${process.env.VITE_TROOPHUNTER_PUBLIC_URL}/logo/logo-social.png`}></meta>
        <meta property="og:type" content="website"></meta>
        <meta property="og:site_name" content="TroopHunter"></meta>

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image"></meta>
        <meta name="twitter:title" content="TroopHunter - Find your next client!"></meta>
        <meta name="twitter:description" content="TroopHunter simplifies finding and connecting with businesses around the world."></meta>
        <meta name="twitter:image" content={`${process.env.VITE_TROOPHUNTER_PUBLIC_URL}/logo/logo-social.png`}></meta>
        <meta name="twitter:site" content="@TroopHunter"></meta>
      </Head>
      <FooterRevealPageWrap variant="frame">
        <Header />
        <FooterRevealPageWrap variant="page">
          {/* Main container with smooth-scrollbar */}
          <main className={`${styles['expertise-single']} container-full`}>
            <Hero tagText="User Interface Design" heading="Cutting edge UI designed for your application" image="https://a-us.storyblok.com/f/1017006/3810x2036/6fe5a4bbe5/sussex-3810-x-2039.jpg" />
            <div>
              <ModularBlocks>
                <IconCards title="Bespoke user interfaces" paragraph="Combining human aesthetics with functional design, we take a systematised approach to designing practical and intuitive user interfaces." IconCardsItems={PageData.IconCardsItems} />
                <ContentAsideImage ContentAsideImageItems={PageData.ContentAsideImageItems} />
              </ModularBlocks>
<<<<<<< HEAD
              <div className={styles['expertise-container']}>
                <footer className={styles['expertise-cta']}>
                  <h2 className={styles['expertise-cta__content']}>
                    <span>Extraordinary Digital Experiences</span>
                  </h2>
                  <div>
                    <Button>Submit a brief</Button>
                  </div>
                </footer>
                <ExpertiseCard />
=======
              <AwardsBlock />
              <div className={styles['expertise-container']}>
                <h2 className="hidden">Testimonials:</h2>
                <CardStack variant="Stack">
                  {PageData.testimonials.map((item, index) => (
                    <CardStack variant="Card" index={index}>
                      <figure className={styles['testimonial-card']} style={{ backgroundColor: `${item.bgColor}`, color: `${item.color}` }}>
                        <picture className={`${PictureStyles['picture']} ${PictureStyles['picture--responsive']} ${styles['testimonial-card__image']}`}>
                          <source srcSet={`${item.image}/m/390x360/filters:quality(80) 1x, ${item.image}/m/780x720/filters:quality(80) 2x`} media="(min-width: 0px) and (max-width: 479px)" />
                          <source srcSet={`${item.image}/m/872x806/filters:quality(80) 1x, ${item.image}/m/1744x1612/filters:quality(80) 2x`} media="(min-width: 480px) and (max-width: 991px)" />
                          <source srcSet={`${item.image}/m/667x609/filters:quality(80) 1x, ${item.image}/m/1334x1218/filters:quality(80) 2x`} media="(min-width: 992px)" />
                          <img src={`${item.image}/m/390x360/filters:quality(80)`} loading="lazy" width="390" height="360" alt="" className="" draggable="false" />
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
>>>>>>> 9462275350fb529763d78a19c2c16cfdb2111e94
              </div>
            </div>
          </main>
        </FooterRevealPageWrap>
        <Footer footerMainContent={PageData.footerMainContent} footerForm={PageData.footerForm} footerSocialLinks={PageData.footerSocialLinks} />
      </FooterRevealPageWrap>
    </>
  );
};

export default UI;
