import React from 'react';
import Head from 'next/head';
import { toggleSmoothModalAtom } from '../../store/smoothModalAtom';
import { useSetAtom } from 'jotai';
import PROPOSALS from '../../data/proposals/index.d';
import PROPOSALSDATA from '../../data/proposals/proposals.d';
import COMPANIES from '../../data/proposals/companies.d';
import { FooterRevealPageWrap, Footer, Header, ModularBlocks, ContactFormModal, ProposalSilder } from '@repo/components';
import { useBreakpoint } from '../../hooks/useBreakpoint';
import SmoothModalWrapper from '../../components/Surfaces/SmoothModalWrapper/SmoothModalWrapper';
import { prefixed } from '../../utils/helpers';

import ProposalsPageStyles from '../index.module.css';
import ExpertiseStyles from '../expertise/index.module.css';

interface ProposalsPageProps {
  variant?: string;
  meta?: {
    title: string;
    description: string;
  };
  footerMainContent?: any;
  footerData?: any;
  footerSocialLinks?: any[];
  testimonials?: any[] | null;
}

const Proposals: React.FC<ProposalsPageProps> = ({ variant = 'default', meta, footerMainContent, footerData, footerSocialLinks, testimonials }) => {
  const toggleModal = useSetAtom(toggleSmoothModalAtom);
  const isMobile = useBreakpoint();

  return (
    <>
      <Head>
        <title>{meta?.title || 'Dev8X - Extraordinary Digital Experiences'}</title>
        <meta name="description" content={meta?.description || 'Creating extraordinary digital experiences'}></meta>
        <link rel="canonical" href={prefixed('/')} />

        {/* Open Graph Tags */}
        <meta property="og:title" content={meta?.title || 'Dev8X - Extraordinary Digital Experiences'}></meta>
        <meta property="og:description" content={meta?.description || 'Creating extraordinary digital experiences'}></meta>
        <meta property="og:url" content={prefixed('/')}></meta>
        <meta property="og:locale" content="en_US"></meta>
        <meta property="og:image" content={prefixed('/logo-social.png')}></meta>
        <meta property="og:image:secure_url" content={prefixed('/logo-social.png')}></meta>
        <meta property="og:type" content="website"></meta>
        <meta property="og:site_name" content="Dev8X"></meta>

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image"></meta>
        <meta name="twitter:title" content={meta?.title || 'Dev8X - Extraordinary Digital Experiences'}></meta>
        <meta name="twitter:description" content={meta?.description || 'Creating extraordinary digital experiences'}></meta>
        <meta name="twitter:image" content={prefixed('/logo-social.png')}></meta>
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
            <div>
              <ModularBlocks>
                {COMPANIES.map((company) => {
                  const filteredProposals = PROPOSALSDATA.filter((p) => p.proposal.companyId === company.id);
                  const feedSliderItems = filteredProposals.map((p) => p.proposal);

                  return (
                    <div key={company.id} className={ProposalsPageStyles['homepage__feed-wrapper']}>
                      <div className={ProposalsPageStyles['homepage__feed-wrapper-inner']}>
                        <ProposalSilder heading={company.name} feedSliderItems={feedSliderItems} />
                      </div>
                    </div>
                  );
                })}
              </ModularBlocks>
            </div>
          </main>
        </FooterRevealPageWrap>

        <Footer footerMainContent={footerMainContent} footerData={footerData} footerSocialLinks={footerSocialLinks} onClick={() => toggleModal('contact')} />
      </FooterRevealPageWrap>
      <SmoothModalWrapper modalType="contact" toggle={() => toggleModal('contact')}>
        <ContactFormModal />
      </SmoothModalWrapper>
    </>
  );
};

export default Proposals;

export async function getStaticProps() {
  // Get the first offer or default homepage data
  const PageData = PROPOSALS[0] || null;

  if (!PageData) {
    return {
      props: {
        variant: 'default',
        meta: {
          title: 'Dev8X - Extraordinary Digital Experiences',
          description: 'Creating extraordinary digital experiences'
        }
      }
    };
  }

  const { variant, meta, footerMainContent, footerData, footerSocialLinks } = PageData;

  return {
    props: {
      variant: variant ?? 'default',
      meta: meta ?? null,
      footerMainContent: footerMainContent ?? null,
      footerData: footerData ?? null,
      footerSocialLinks: footerSocialLinks ?? null
    }
  };
}
