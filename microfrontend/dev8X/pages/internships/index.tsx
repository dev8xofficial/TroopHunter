import Head from 'next/head';
import { toggleSmoothModalAtom } from '../../store/smoothModalAtom';
import { useSetAtom } from 'jotai';
import { FooterRevealPageWrap, Footer, Header, CareerContentsModal, ExpertiseCard, AwardsBlock, SubmitApplicationModal, ContactFormModal } from '@repo/components';
import SmoothModalWrapper from '../../components/Surfaces/SmoothModalWrapper/SmoothModalWrapper';
import { getDev8xPublicUrl } from '../../utils/helpers';
import PageData from '../../data/internships/index.d';
import EXPERTISES from '../../data/expertise/index.d';

import WorkStyles from '../work/index.module.css';
import ExpertiseStyles from '../expertise/index.module.css';

const InternshipsPage: React.FC = (): JSX.Element => {
  const toggleModal = useSetAtom(toggleSmoothModalAtom);
  const getNextExpertise = (currentSlug: string) => {
    const currentIndex = EXPERTISES.findIndex((e) => e.slug === currentSlug);

    if (currentIndex === -1) return null; // if slug not found

    const nextIndex = (currentIndex + 1) % EXPERTISES.length;
    return EXPERTISES[nextIndex];
  };

  const nextExpertise = getNextExpertise('websites');

  return (
    <>
      <Head>
        <title>{PageData.meta.title}</title>
        <meta name="description" content={PageData.meta.description}></meta>
        <link rel="canonical" href={`${getDev8xPublicUrl()}/work`} />

        {/* Open Graph Tags */}
        <meta property="og:title" content={PageData.meta.title}></meta>
        <meta property="og:description" content={PageData.meta.description}></meta>
        <meta property="og:url" content={`${getDev8xPublicUrl()}/work`}></meta>
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
        <Header />
        <FooterRevealPageWrap variant="page">
          <style jsx global>{`
            :root {
              --theme-primary: var(--purple-primary);
              --theme-primary-text: var(--purple-primary-text);
              --theme-secondary: var(--purple-secondary);
              --theme-text: var(--purple-text);
              --theme-background: var(--purple-tertiary);
              --theme-logo: var(--purple-secondary);
              --theme-header-face: var(--purple-primary);
            }
          `}</style>
          {/* Main container with smooth-scrollbar */}
          <main className={WorkStyles['project-page']}>
            <CareerContentsModal />

            <div className={ExpertiseStyles['expertise-container']}>
              <AwardsBlock />
              <div className={ExpertiseStyles['expertise-container']}>
                <ExpertiseCard variant={nextExpertise.variant} tagText={nextExpertise.tagText} heading={nextExpertise.iconCards.paragraph} slug={nextExpertise.slug} image={nextExpertise.image} />
              </div>
            </div>
          </main>
        </FooterRevealPageWrap>
        <Footer footerMainContent={PageData.footerMainContent} footerForm={PageData.footerForm} footerSocialLinks={PageData.footerSocialLinks} onClick={() => toggleModal('contact')} />
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

export default InternshipsPage;
