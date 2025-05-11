import React from 'react';
import Head from 'next/head';

import { FooterRevealPageWrap, Footer, Header } from '@repo/components';
import { getDev8xPublicUrl } from '../../utils/helpers';
import PageData from '../../data/not-found/index.d';

import styles from './index.module.css';

const Work: React.FC = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Dev8X - Solutions Made Simple!</title>
        <meta name="description" content="Dev8X simplifies finding and connecting with businesses around the world."></meta>
        <link rel="canonical" href={`${getDev8xPublicUrl()}/not-found`} />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Dev8X - Solutions Made Simple!"></meta>
        <meta property="og:description" content="Dev8X simplifies finding and connecting with businesses around the world."></meta>
        <meta property="og:url" content={`${getDev8xPublicUrl()}/not-found`}></meta>
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
        <Header />
        <FooterRevealPageWrap variant="page">
          <div className={styles['not-found']}>
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
