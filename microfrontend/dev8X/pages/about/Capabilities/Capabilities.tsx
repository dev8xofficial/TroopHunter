import React from 'react';
import { CapabilitiesContent } from '@repo/components';

import styles from '../index.module.css';

const Capabilities: React.FC<{ capabilities: CapabilitiesContent }> = ({ capabilities }): JSX.Element => {
  return (
    <>
      <div className={styles['about-capabilities__grid']}>
        {capabilities.map(({ heading, items }) => (
          <section className={styles['about-column']} style={{ opacity: 1, transform: 'translateX(0px)' }} key={heading}>
            <h3 className={styles['about-column__heading']}>{heading}</h3>
            <ul className={styles['about-column__list']}>
              {items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
};

export default Capabilities;
