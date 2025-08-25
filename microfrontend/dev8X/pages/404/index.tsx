import React from 'react';
import Head from 'next/head';

import { FooterRevealPageWrap, Footer, Header } from '@repo/components';
import PageData from '../../data/404/index.d';

import styles from './index.module.css';

const Work: React.FC = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>{PageData.meta.title}</title>
        <meta name="description" content={PageData.meta.description}></meta>
        <link rel="canonical" href="/not-found" />

        {/* Open Graph Tags */}
        <meta property="og:title" content={PageData.meta.title}></meta>
        <meta property="og:description" content={PageData.meta.description}></meta>
        <meta property="og:url" content="/not-found"></meta>
        <meta property="og:locale" content="en_US"></meta>
        <meta property="og:image" content="/logo-social.png"></meta>
        <meta property="og:image:secure_url" content="/logo-social.png"></meta>
        <meta property="og:type" content="website"></meta>
        <meta property="og:site_name" content="Dev8X"></meta>

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image"></meta>
        <meta name="twitter:title" content={PageData.meta.title}></meta>
        <meta name="twitter:description" content={PageData.meta.description}></meta>
        <meta name="twitter:image" content="/logo-social.png"></meta>
        <meta name="twitter:site" content="@Dev8X"></meta>
      </Head>
      <FooterRevealPageWrap variant="frame">
        <Header />
        <FooterRevealPageWrap variant="page">
          <div className={styles['not-found']}>
            <style jsx global>{`
              :root {
                --theme-primary: var(--blue-primary);
                --theme-primary-text: var(--blue-primary-text);
                --theme-secondary: var(--blue-secondary);
                --theme-text: var(--blue-text);
                --theme-background: var(--blue-tertiary);
                --theme-logo: var(--blue-secondary);
                --theme-header-face: var(--blue-primary);
              }
            `}</style>
            <h1 className={styles['not-found__heading']}>Whoops!</h1>
            <h2 className={styles['not-found__error']}>This page does not exist.</h2>
            <img className={styles['not-found__image']} src="https://www.humaan.com/assets/404.gif" alt="Sad James, Sad Balloon" width="440" height="400" />
          </div>
        </FooterRevealPageWrap>
        <Footer footerMainContent={PageData.footerMainContent} footerForm={PageData.footerForm} footerSocialLinks={PageData.footerSocialLinks} />
      </FooterRevealPageWrap>
    </>
  );
};

export default Work;
