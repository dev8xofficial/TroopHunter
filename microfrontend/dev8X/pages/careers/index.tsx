import Head from 'next/head';
import { FooterRevealPageWrap, Footer, Header, CareerContentsModal } from '@repo/components';
import { getDev8xPublicUrl } from '../../utils/helpers';
import PageData from '../../data/careers/index.d';

import WorkStyles from '../work/index.module.css';

const WorkPage: React.FC = (): JSX.Element => {
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
              --theme-primary: var(--default-primary);
              --theme-primary-text: var(--default-primary-text);
              --theme-secondary: var(--default-secondary);
              --theme-text: var(--default-text);
              --theme-background: var(--default-tertiary);
              --theme-logo: var(--default-secondary);
              --theme-header-face: var(--default-primary);
            }
          `}</style>
          {/* Main container with smooth-scrollbar */}
          <main className={WorkStyles['project-page']}>
            <CareerContentsModal />
          </main>
        </FooterRevealPageWrap>
        <Footer footerMainContent={PageData.footerMainContent} footerForm={PageData.footerForm} footerSocialLinks={PageData.footerSocialLinks} />
      </FooterRevealPageWrap>
    </>
  );
};

export default WorkPage;
