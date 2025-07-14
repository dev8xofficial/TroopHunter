import React from 'react';
import Head from 'next/head';
import { toggleSmoothModalAtom } from '../../store/smoothModalAtom';
import { useSetAtom } from 'jotai';
import RightArrowIcon from '@repo/components/src/Icons/RightArrow';
import EXPERTISES from '../../data/expertise/index.d';
import PROCESS from '../../data/our-process/index.d';
import { FooterRevealPageWrap, ContentAsideImage, Footer, Header, Hero, ModularBlocks, IconCards, Button, ExpertiseCard, AwardsBlock, CardStack, WorkDetail, ExpertiseContent, ContactFormModal } from '@repo/components';
import { getDev8xPublicUrl } from '../../utils/helpers';
import SmoothModalWrapper from '../../components/Surfaces/SmoothModalWrapper/SmoothModalWrapper';

import ExpertiseStyles from '../expertise/index.module.css';

const ProcessPage: React.FC = (): JSX.Element => {
  const toggleModal = useSetAtom(toggleSmoothModalAtom);
  const slug: string = PROCESS[0].slug;
  const variant = PROCESS[0].variant;
  const PageData = PROCESS[0];
  const nextExpertise = EXPERTISES[2];

  return (
    <>
      <Head>
        <title>{PageData.meta.title}</title>
        <meta name="description" content={PageData.meta.description}></meta>
        <link rel="canonical" href={`${getDev8xPublicUrl()}/expertise/${slug}`} />

        {/* Open Graph Tags */}
        <meta property="og:title" content={PageData.meta.title}></meta>
        <meta property="og:description" content={PageData.meta.description}></meta>
        <meta property="og:url" content={`${getDev8xPublicUrl()}/expertise/${slug}`}></meta>
        <meta property="og:locale" content="en_US"></meta>
        <meta property="og:image" content={`${getDev8xPublicUrl()}/logo-social.png`}></meta>
        <meta property="og:image:secure_url" content={`${getDev8xPublicUrl()}/logo-social.png`}></meta>
        <meta property="og:type" content="website"></meta>
        <meta property="og:site_name" content="Dev8X"></meta>

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image"></meta>
        <meta name="twitter:title" content={PageData.meta.title}></meta>
        <meta name="twitter:description" content={PageData.meta.description}></meta>
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
          <main className={`${ExpertiseStyles['expertise-single']} container-full`}>
            <Hero variant={variant} tagText={PageData.tagText} heading={PageData.heading} image={PageData.image} icon={PageData.contentAsideImageItems[Object.keys(PageData.contentAsideImageItems)[0]].icon} />

            <div>
              <ModularBlocks>
                <IconCards title={PageData.iconCards?.title} paragraph={PageData.iconCards?.paragraph} items={PageData.iconCards?.items} />
                <ContentAsideImage contentAsideImageItems={PageData.contentAsideImageItems} />
              </ModularBlocks>

              <div className={ExpertiseStyles['expertise-container']}>
                <AwardsBlock />

                <div className={ExpertiseStyles['expertise-container']}>
                  <footer className={ExpertiseStyles['expertise-cta']}>
                    <h2 className={ExpertiseStyles['expertise-cta__content']}>
                      <span>Extraordinary Digital Experiences</span>
                    </h2>
                    <div>
                      <Button variant="secondary" context="contact" size="large" endIcon={<RightArrowIcon width="14" className={ExpertiseStyles['button--icon']} />} spanClassName={ExpertiseStyles['contact-button']} onClick={() => toggleModal('contact')}>
                        Submit a brief
                      </Button>
                    </div>
                  </footer>

                  <ExpertiseCard variant={nextExpertise.variant} tagText={nextExpertise.tagText} heading={nextExpertise.iconCards.paragraph} slug={nextExpertise.slug} image={nextExpertise.image} />
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

export default ProcessPage;
