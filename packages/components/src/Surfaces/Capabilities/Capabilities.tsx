import React from 'react';
import { CapabilitiesContent } from '@repo/components';

interface CapabilitiesProps {
  capabilities: CapabilitiesContent;
  styles: {
    'about-capabilities__grid': string;
    'about-column': string;
    'about-column__heading': string;
    'about-column__list': string;
  };
}

const Capabilities: React.FC<CapabilitiesProps> = ({ capabilities, styles }): JSX.Element => {
  return (
    <>
      <div className={styles['about-capabilities__grid']}>
        {capabilities?.length > 0 &&
          capabilities.map((capability, index) => (
            <section className={styles['about-column']} style={{ opacity: 1, transform: 'translateX(0px)' }} key={capability.heading || index}>
              {capability.heading && (
                <h3 className={styles['about-column__heading']}>{capability.heading}</h3>
              )}
              <ul className={styles['about-column__list']}>
                {capability.items.map((item, itemIndex) => {
                  const itemName = typeof item === 'string' ? item : item.name;
                  const itemImage = typeof item === 'object' ? item.image : undefined;
                  return (
                    <li key={itemIndex} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {itemImage && (
                        <img 
                          src={itemImage} 
                          loading="lazy" 
                          width="40" 
                          alt={itemName}
                          style={{ display: 'block' }}
                        />
                      )}
                      <span>{itemName}</span>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
      </div>
    </>
  );
};

export default Capabilities;


