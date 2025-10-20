import React from 'react';
import Head from 'next/head';
import { toggleSmoothModalAtom } from '../../store/smoothModalAtom';
import { useSetAtom } from 'jotai';
import { FooterRevealPageWrap, Footer, Header, AwardsBlock, SubmitApplicationModal, ContactFormModal, Button, IconCards, ContentAsideImage, ModularBlocks, Hero, CardStack, FAQs } from '@repo/components';
import SmoothModalWrapper from '../../components/Surfaces/SmoothModalWrapper/SmoothModalWrapper';
import RightArrowIcon from '@repo/components/src/Icons/RightArrow';
import EXPERTISES from '../../data/expertise/index.d';
import { prefixed } from '../../utils/helpers';
import ExpertiseStyles from '../expertise/index.module.css';
import OFFERS from '../../data/offers/index.d';
import PictureStyles from '../../components/Surfaces/Picture/index.module.css';
import styles from "./index.module.css"

const OffersPage: React.FC = (): JSX.Element => {
  const toggleModal = useSetAtom(toggleSmoothModalAtom);

  // Get the first offers data item since PageData is an array
  const offersData = OFFERS[1];
  const variant = offersData.variant;

  const getNextExpertise = (currentSlug: string) => {
    const currentIndex = EXPERTISES.findIndex((e) => e.slug === currentSlug);

    if (currentIndex === -1) return null; // if slug not found

    const nextIndex = (currentIndex + 1) % EXPERTISES.length;
    return EXPERTISES[nextIndex];
  };

  const nextExpertise = getNextExpertise('web-applications');

  return (
    <>
      <Head>
        <title>{offersData.meta.title}</title>
        <meta name="description" content={offersData.meta.description}></meta>
        <link rel="canonical" href={prefixed("/offers")} />

        {/* Open Graph Tags */}
        <meta property="og:title" content={offersData.meta.title}></meta>
        <meta property="og:description" content={offersData.meta.description}></meta>
        <meta property="og:url" content={prefixed("/offers")}></meta>
        <meta property="og:locale" content="en_US"></meta>
        <meta property="og:image" content={prefixed("/logo-social.png")}></meta>
        <meta property="og:image:secure_url" content={prefixed("/logo-social.png")}></meta>
        <meta property="og:type" content="website"></meta>
        <meta property="og:site_name" content="Dev8X"></meta>

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image"></meta>
        <meta name="twitter:title" content={offersData.meta.title}></meta>
        <meta name="twitter:description" content={offersData.meta.description}></meta>
        <meta name="twitter:image" content={prefixed("/logo-social.png")}></meta>
        <meta name="twitter:site" content="@Dev8X"></meta>
      </Head>
      <FooterRevealPageWrap variant="frame">
        <Header />
        <FooterRevealPageWrap variant="page">
          <main className={`${ExpertiseStyles['expertise-single']} container-full`}>
            <Hero variant={variant} tagText={offersData.tagText} heading={offersData.heading} image={offersData.image} paragraph={offersData.paragraph} icon={offersData.contentAsideImageItems[Object.keys(offersData.contentAsideImageItems)[0]].icon} />
            <div>
              <ModularBlocks>
                <IconCards title={offersData.iconCards?.title} paragraph={offersData.iconCards?.paragraph} items={offersData.iconCards?.items} />
                <ContentAsideImage contentAsideImageItems={offersData.contentAsideImageItems} />
              </ModularBlocks>

              <div className={ExpertiseStyles['expertise-container']}>
                <AwardsBlock />

                <div className={ExpertiseStyles['expertise-container']}>
                  <h2 className="hidden">Testimonials:</h2>
                  <CardStack variant="Stack">
                    {offersData?.testimonials?.map((item, index) => (
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

                  <footer className={ExpertiseStyles['expertise-cta']}>
                    <h2 className={ExpertiseStyles['expertise-cta__content']}>
                      <span>Got questions? We’re here to help</span>
                    </h2>
                    <div>
                      <Button variant="secondary" context="contact" size="large" endIcon={<RightArrowIcon width="14" className={ExpertiseStyles['button--icon']} />} spanClassName={ExpertiseStyles['contact-button']} onClick={() => toggleModal('contact')}>
                        Schedule Call
                      </Button>
                    </div>
                  </footer>
                  <FAQs faqs={offersData.faqs} />
                </div>
              </div>
            </div>
          </main>
        </FooterRevealPageWrap>
        <Footer footerMainContent={offersData.footerMainContent} footerForm={offersData.footerForm} footerSocialLinks={offersData.footerSocialLinks} onClick={() => toggleModal('contact')} />
      </FooterRevealPageWrap>
      <SmoothModalWrapper modalType="career" toggle={() => toggleModal('career')}>
        <SubmitApplicationModal />
      </SmoothModalWrapper>
      <SmoothModalWrapper modalType="contact" toggle={() => toggleModal('contact')}>
        <ContactFormModal />
      </SmoothModalWrapper>
    </>
  );
};

export default OffersPage;
