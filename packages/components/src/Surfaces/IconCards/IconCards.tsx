/* eslint-disable prettier/prettier */
import React, { ReactNode } from 'react';

// import TextAnimateUp from '../TextAnimateUp/index.module.css';
import styles from './index.module.css';

type StepItem = {
  title: string;
  description: string;
  icon: ReactNode;
};

type IconCardsProps = {
  title: string;
  paragraph: string;
  stepsList: StepItem[];
};

export const IconCards: React.FC<IconCardsProps> = ({ title, paragraph, stepsList }): JSX.Element => {
  return (
    <>
      <section className={styles['icon-cards']}>
        <h2 className={styles['icon-cards__heading']} aria-label="Extraordinary digital products">
          {title}
        </h2>
        <p className={styles['icon-cards__intro']} style={{ opacity: 1, transform: 'translateY(0px);' }}>
          {paragraph}
        </p>
        <ul className={styles['icon-cards__list']}>
          {stepsList.map((item) => (
            <li className={styles['icon-card']} style={{ opacity: 1, transform: 'translateX(0px);' }}>
              <div className={styles['icon-card__icon-wrapper']}>{item.icon}</div>
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
