/* eslint-disable prettier/prettier */
import React from 'react';
import styles from '../index.module.css';
// import AboutHero from '../../../components/Surfaces/AboutHero/index.module.css';

const Capabilities: React.FC = (): JSX.Element => {
  return (
    <>
      <div className={styles['about-capabilities__grid']}>
        {[
          {
            heading: 'Strategy & UX',
            items: ['Digital Strategy', 'User Research', 'User Journey Mapping', 'Information Architecture', 'Wireframing']
          },
          {
            heading: 'Design',
            items: ['Interaction Design', 'User Interface Design', 'Design Systems', 'Prototyping & Animation', 'Accessibility']
          },
          {
            heading: 'Development',
            items: ['Websites', 'eCommerce', 'Web Applications', 'Mobile Apps (iOS & Android)', 'Platform Integrations']
          },
          {
            heading: 'Technology',
            items: ['Vue & React.js', 'Headless Content Management', 'WordPress & WooCommerce', 'Laravel', 'Shopify']
          },
          {
            heading: 'Optimisation',
            items: ['Website / App Review', 'Performance Optimisation', 'Conversion Optimisation', 'A/B Testing', 'Ongoing Enhancements']
          },
          {
            heading: 'Support',
            items: ['Project Management', 'Website Hosting', 'Website Maintenance', 'Performance & Security', '3rd Party Integrations']
          }
        ].map(({ heading, items }) => (
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
