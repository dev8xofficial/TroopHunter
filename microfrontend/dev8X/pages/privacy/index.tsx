import React from 'react';
import Head from 'next/head';

import { useSetAtom } from 'jotai';
import { toggleSmoothModalAtom } from '../../store/smoothModalAtom';
import { FooterRevealPageWrap, Footer, Header, ContactFormModal } from '@repo/components';
import SmoothModalWrapper from '../../components/Surfaces/SmoothModalWrapper/SmoothModalWrapper';
import { getDev8xPublicUrl } from '../../utils/helpers';
import PageData from '../../data/privacy/index.d';

import styles from './index.module.css';
import WYSIWYGStyles from '../../../../packages/components/src/Surfaces/WYSIWYG/index.module.css';

const Privacy: React.FC = (): JSX.Element => {
  const toggleModal = useSetAtom(toggleSmoothModalAtom);

  return (
    <>
      <Head>
        <title>{PageData.meta.title}</title>
        <meta name="description" content={PageData.meta.description}></meta>
        <link rel="canonical" href={`${getDev8xPublicUrl()}/not-found`} />

        {/* Open Graph Tags */}
        <meta property="og:title" content={PageData.meta.title}></meta>
        <meta property="og:description" content={PageData.meta.description}></meta>
        <meta property="og:url" content={`${getDev8xPublicUrl()}/not-found`}></meta>
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
          <main className={styles['privacy-policy']}>
            <style jsx global>
              {`
                :root {
                  --theme-primary: var(--default-primary);
                  --theme-primary-text: var(--default-primary-text);
                  --theme-secondary: var(--default-secondary);
                  --theme-text: var(--default-text);
                  --theme-background: var(--default-tertiary);
                  --theme-logo: var(--default-secondary);
                  --theme-header-face: var(--default-primary);
                }
              `}
            </style>
            <div className={styles['privacy-policy__container']}>
              <div className={`${WYSIWYGStyles['wysiwyg']} ${styles['privacy-policy__wysiwyg']}`}>
                <h2>Dev8X Terms of Service</h2>
                <h3>1. Terms</h3>
                <p>
                  By accessing the website at{' '}
                  <a href="https://dev8x.com/">
                    <u>https://dev8x.com</u>
                  </a>
                  , you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trademark law.
                </p>
                <h3>2. Use License</h3>
                <ol>
                  <li>
                    <p>Permission is granted to temporarily download one copy of the materials (information or software) on Dev8X’s website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license, you may not:</p>
                    <ol>
                      <li>
                        <p>modify or copy the materials;</p>
                      </li>
                      <li>
                        <p>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</p>
                      </li>
                      <li>
                        <p>attempt to decompile or reverse engineer any software contained on Dev8X’s website;</p>
                      </li>
                      <li>
                        <p>remove any copyright or other proprietary notations from the materials; or</p>
                      </li>
                      <li>
                        <p>transfer the materials to another person or “mirror” the materials on any other server.</p>
                      </li>
                    </ol>
                  </li>
                  <li>
                    <p>This license shall automatically terminate if you violate any of these restrictions and may be terminated by Dev8X at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.</p>
                  </li>
                </ol>
                <h3>3. Disclaimer</h3>
                <ol>
                  <li>
                    <p>The materials on Dev8X’s website are provided on an ‘as is’ basis. Dev8X makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
                  </li>
                  <li>
                    <p>Further, Dev8X does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.</p>
                  </li>
                </ol>
                <h3>4. Limitations</h3>
                <p>In no event shall Dev8X or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Dev8X’s website, even if Dev8X or a Dev8X authorized representative has been notified orally or in writing of the possibility of such damage.</p>
                <h3>5. Accuracy of materials</h3>
                <p>The materials appearing on Dev8X’s website could include technical, typographical, or photographic errors. Dev8X does not warrant that any of the materials on its website are accurate, complete or current. Dev8X may make changes to the materials contained on its website at any time without notice.</p>
                <h3>6. Links</h3>
                <p>Dev8X has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Dev8X of the site. Use of any such linked website is at the user’s own risk.</p>
                <h3>7. Modifications</h3>
                <p>Dev8X may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.</p>
                <h3>8. Governing Law</h3>
                <p>These terms and conditions are governed by and construed in accordance with the laws of Lahore, Pakistan, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.</p>
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

export default Privacy;
