'use client';

import React from 'react';
import { useRouter } from 'next/router';
import { AppearOnScroll, CapabilitiesContent } from '@repo/components';

import TextAnimateStyles from '../TextAnimateUp/index.module.css';
import styles from './index.module.css';

interface CapabilitiesProps {
  capabilitiesHeading: string;
  capabilities: CapabilitiesContent;
}

const Capabilities: React.FC<CapabilitiesProps> = ({ capabilities, capabilitiesHeading }): JSX.Element => {
  const router = useRouter();
  const isAboutPage = router.pathname === '/about';

  return (
    <AppearOnScroll>
      <div className={styles['about-capabilities']}>
        <h2 className={styles['about-capabilities__intro']} aria-label={capabilitiesHeading || 'Our capabilities'}>
          {(capabilitiesHeading || 'Our capabilities').split(' ').map((word, index) => {
            const isSpecial = word.toLowerCase().includes('capabilities');
            return (
              <span
                key={index}
                className={`${TextAnimateStyles['word']} ${isSpecial ? styles['format'] : ''}`}
                aria-hidden="true"
                style={{
                  display: 'inline-block',
                  whiteSpace: 'pre',
                  transform: 'translate3d(0px, 0%, 0px)',
                  opacity: 1,
                  transitionDelay: `${index * 0.05}s`
                }}
              >
                <span aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', opacity: 1 }}>
                  {word + ' '}
                </span>
              </span>
            );
          })}
        </h2>

        <div className={`${styles['about-capabilities__grid']} ${!isAboutPage && styles['about-capabilities__grid--custom-dev8x-grid-columns']}`}>
          {capabilities?.length > 0 &&
            capabilities.map((capability, index) => (
              <section
                className={styles['about-column']}
                style={{ opacity: 1, transform: 'translateX(0px)' }}
                key={capability.heading || index}
              >
                {capability.heading && <h3 className={styles['about-column__heading']}>{capability.heading}</h3>}
                <ul className={`${styles['about-column__list']} ${!isAboutPage && styles['about-column__list--custom-grid-columns-2']}`}>
                  {capability.items.map((item, itemIndex) => {
                    const itemName = typeof item === 'string' ? item : item.name;
                    const itemIcon = typeof item === 'object' ? (item as any).icon : undefined;

                    return (
                      <li key={itemIndex} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {itemIcon && <span style={{ display: 'block', width: 40, height: 40 }}>{itemIcon}</span>}
                        <span>{itemName}</span>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}
        </div>
      </div>
    </AppearOnScroll>
  );
};

export default Capabilities;
