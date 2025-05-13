import React, { ReactNode } from 'react';
import { ICON_MAP } from './IconMap';
import { ExpertiseIconCards } from '../../Interfaces/Expertise/Expertise';

// import TextAnimateUp from '../TextAnimateUp/index.module.css';
import styles from './index.module.css';

export const IconCards: React.FC<ExpertiseIconCards> = ({ title, paragraph, items }): JSX.Element => {
  return (
    <>
      <section className={styles['icon-cards']}>
        <h2 className={styles['icon-cards__heading']} aria-label="Extraordinary digital products">
          {title}
        </h2>
        <p className={styles['icon-cards__intro']} style={{ opacity: 1, transform: 'translateY(0px)' }}>
          {paragraph}
        </p>
        <ul className={styles['icon-cards__list']}>
          {items?.map((item, index) => (
            <li className={styles['icon-card']} style={{ opacity: 1, transform: 'translateX(0px)' }} key={index}>
              <div className={styles['icon-card__icon-wrapper']}>{ICON_MAP[item.icon.name]?.(item.icon.width)}</div>
              <hr className={styles['icon-card__hr']} />
              <h3 className={styles['icon-card__heading']}>{item.title}</h3>
              <p className={styles['icon-card__body']}>{item.description}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};
