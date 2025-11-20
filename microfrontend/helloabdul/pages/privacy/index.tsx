'use client';

import React from 'react';
import Head from 'next/head';

import { useSetAtom } from 'jotai';
import { FormModal, toggleSmoothModalAtom } from '@repo/components';
import { FooterRevealPageWrap, Footer, Header, ContactFormModal } from '@repo/components';
import { PrivacyParagraphPart } from '@repo/components/src/Interfaces/Privacy/Privacy';
import SmoothModalWrapper from '../../components/Surfaces/SmoothModalWrapper/SmoothModalWrapper';
import PageData from '../../data/privacy/index.d';
import SubmenuData from '../../data/navigation/index.d';
import { prefixed } from '../../utils/helpers';

import WYSIWYGStyles from '../../components/Surfaces/WYSIWYG/index.module.css';
import styles from './index.module.css';

const renderParagraphPart = (part: PrivacyParagraphPart, key: React.Key) => {
  if (part.type === 'link') {
    return (
      <a key={key} href={part.href} target="_blank" rel="noopener noreferrer">
        <u>{part.label}</u>
      </a>
    );
  }

  return <React.Fragment key={key}>{part.content}</React.Fragment>;
};

const Privacy: React.FC = (): JSX.Element => {
  const toggleModal = useSetAtom(toggleSmoothModalAtom);

  return (
    <>
      <Head>
        <title>{PageData.meta.title}</title>
        <meta name="description" content={PageData.meta.description}></meta>
        <link rel="canonical" href={prefixed('/not-found')} />

        {/* Open Graph Tags */}
        <meta property="og:title" content={PageData.meta.title}></meta>
        <meta property="og:description" content={PageData.meta.description}></meta>
        <meta property="og:url" content={prefixed('/not-found')}></meta>
        <meta property="og:locale" content="en_US"></meta>
        <meta property="og:image" content={prefixed('/logo-social.png')}></meta>
        <meta property="og:image:secure_url" content={prefixed('/logo-social.png')}></meta>
        <meta property="og:type" content="website"></meta>
        <meta property="og:site_name" content="Dev8X"></meta>

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image"></meta>
        <meta name="twitter:title" content={PageData.meta.title}></meta>
        <meta name="twitter:description" content={PageData.meta.description}></meta>
        <meta name="twitter:image" content={prefixed('/logo-social.png')}></meta>
        <meta name="twitter:site" content="@Dev8X"></meta>
      </Head>
      <FooterRevealPageWrap variant="frame">
        <Header submenuData={SubmenuData} />
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
                {/* Dynamic heading */}
                <h2>{PageData.privacy[0].heading}</h2>

                {/* Dynamic Sections */}
                {PageData.privacy[0].sections.map((section, secIndex) => (
                  <section key={secIndex}>
                    <h3>{section.title}</h3>

                    {section.blocks.map((block, blockIndex) => {
                      if (block.type === 'paragraph') {
                        return <p key={blockIndex}>{block.parts.map((part, partIndex) => renderParagraphPart(part, partIndex))}</p>;
                      }

                      if (block.type === 'orderedList') {
                        return (
                          <ol key={blockIndex}>
                            {block.items.map((item, itemIdx) => (
                              <li key={itemIdx}>
                                {item.parts.map((part, partIdx) => renderParagraphPart(part, partIdx))}

                                {item.subItems && (
                                  <ol>
                                    {item.subItems.map((subItem, subIdx) => (
                                      <li key={subIdx}>{subItem.map((subPart, subPartIdx) => renderParagraphPart(subPart, subPartIdx))}</li>
                                    ))}
                                  </ol>
                                )}
                              </li>
                            ))}
                          </ol>
                        );
                      }
                      return null;
                    })}
                  </section>
                ))}
              </div>
            </div>
          </main>
        </FooterRevealPageWrap>
        <Footer footerMainContent={PageData.footerMainContent} footerData={PageData.footerData} footerSocialLinks={PageData.footerSocialLinks} onClick={() => toggleModal('contact')} />
      </FooterRevealPageWrap>
      <SmoothModalWrapper modalType="contact" toggle={() => toggleModal('contact')}>
        <FormModal />
      </SmoothModalWrapper>
    </>
  );
};

export default Privacy;
