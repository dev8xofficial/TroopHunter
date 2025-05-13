import React from 'react';
import Head from 'next/head';
import RightArrowIcon from '@repo/components/src/Icons/RightArrow';
import PointerIcon from '@repo/components/src/Icons/Pointer';
import EXPERTISES from '../../data/expertise/index.d';

import { FooterRevealPageWrap, ContentAsideImage, Footer, Header, Hero, ModularBlocks, IconCards, Button, ExpertiseCard, AwardsBlock, CardStack, WorkDetail, ExpertiseContent } from '@repo/components';
import { getDev8xPublicUrl } from '../../utils/helpers';

import PictureStyles from '../../components/Surfaces/Picture/index.module.css';
import styles from './index.module.css';

const Websites: React.FC = ({ slug, variant, ...PageData }: ExpertiseContent): JSX.Element => {
  console.log(slug, variant, PageData);
  return (
    <>
      <Head>
        <title>Dev8X - Solutions Made Simple!</title>
        <meta name="description" content="Dev8X simplifies finding and connecting with businesses around the world."></meta>
        <link rel="canonical" href={`${getDev8xPublicUrl()}/expertise/${slug}`} />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Dev8X - Solutions Made Simple!"></meta>
        <meta property="og:description" content="Dev8X simplifies finding and connecting with businesses around the world."></meta>
        <meta property="og:url" content={`${getDev8xPublicUrl()}/expertise/${slug}`}></meta>
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
            --theme-primary: var(--${variant}-primary);
            --theme-primary-text: var(--${variant}-primary-text);
            --theme-secondary: var(--${variant}-secondary);
            --theme-text: var(--${variant}-text);
            --theme-background: var(--${variant}-tertiary);
            --theme-logo: var(--${variant}-secondary);
            --theme-header-face: var(--${variant}-primary);
          }
        `}</style>
        <Header />
        <FooterRevealPageWrap variant="page">
          <main className={`${styles['expertise-single']} container-full`}>
            <Hero variant={variant} tagText={PageData.tagText} heading={PageData.heading} icon={<PointerIcon width="120" />} />

            <ModularBlocks>
              <IconCards title={PageData.iconCards?.title} paragraph={PageData.iconCards?.paragraph} items={PageData.iconCards?.items} />
              <ContentAsideImage contentAsideImageItems={PageData.contentAsideImageItems} />
            </ModularBlocks>

            <div className={styles['expertise-container']}>
              <AwardsBlock />

              <div className={styles['expertise-container']}>
                <h2 className="hidden">Testimonials:</h2>

                <CardStack variant="Stack">
                  {PageData?.testimonials?.map((item, index) => (
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
                    <Button
                      iconType="svg"
                      icon={
                        <>
                          <RightArrowIcon width="14" className={styles['button--icon']} />
                        </>
                      }
                      bgClass={Button['button--bg-secondary']}
                    >
                      See all awards
                    </Button>
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

export async function getStaticPaths() {
  const paths = EXPERTISES.map((project) => ({
    params: { slug: project.slug }
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const PageData = EXPERTISES.find((p) => p.slug === params.slug);
  const { slug, variant, tagText, heading, iconCards, contentAsideImageItems, footerMainContent, footerForm, footerSocialLinks, testimonials } = PageData;

  if (!PageData) {
    return { notFound: true };
  }

  return {
    props: { slug, variant, tagText, heading, iconCards, contentAsideImageItems, footerMainContent, footerForm, footerSocialLinks, testimonials }
  };
}
