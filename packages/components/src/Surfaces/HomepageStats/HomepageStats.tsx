import React from 'react';
import CountUp from 'react-countup';
import TextAnimateStyles from '../TextAnimateUp/index.module.css';
import styles from './index.module.css';

type WhyDev = {
  title: string;
  paragraph: string;
};

type HomepageStatsProps = {
  whyinfo: WhyDev[];
};

const extractNumberAndSuffix = (value: string) => {
  const match = value.match(/^(\d+)(.*)$/);
  if (!match) return { number: 0, suffix: '' };
  return {
    number: parseInt(match[1]),
    suffix: match[2],
  };
};

export const HomepageStats: React.FC<HomepageStatsProps> = ({ whyinfo }) => {
  return (
    <ul className={styles['homepage-stats']}>
      {whyinfo.map((item, index) => {
        const { number, suffix } = extractNumberAndSuffix(item.title);

        return (
          <li key={index} className={styles['homepage-stats__item']}>
            <span className={styles['homepage-stats__value']}>
              <CountUp end={number} duration={3} delay={0.2 * index} />
              {suffix}
            </span>
            <span className={styles['homepage-stats__label']}>
              <span className={TextAnimateStyles['word']}>{item.paragraph}</span>
            </span>
          </li>
        );
      })}
    </ul>
  );
};
