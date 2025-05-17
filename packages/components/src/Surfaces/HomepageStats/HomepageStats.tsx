import React, { useRef, useState } from 'react';
import CountUp from 'react-countup';
import { useInView } from 'framer-motion';

import styles from './index.module.css';
import TextAnimateStyles from '../TextAnimateUp/index.module.css';

export type HomepageStat = {
  title: string;
  span: string[];
};

type HomepageStatsProps = {
  stats: HomepageStat[];
};

const extractNumberAndSuffix = (value: string) => {
  const match = value.match(/^(\d+)(.*)$/);
  if (!match) return { number: 0, suffix: '' };
  return {
    number: parseInt(match[1]),
    suffix: match[2]
  };
};

export const HomepageStats: React.FC<HomepageStatsProps> = ({ stats }) => {
  return (
    <ul className={styles['homepage-stats']}>
      {stats.map((stat, index) => {
        const { number, suffix } = extractNumberAndSuffix(stat.title);
        const ref = useRef(null);
        const isInView = useInView(ref, { once: true, margin: '-100px' });
        const [start, setStart] = useState(false);

        // Start counting when visible
        if (isInView && !start) setStart(true);

        return (
          <li key={index} className={styles['homepage-stats__item']}>
            <span className={styles['homepage-stats__value']} ref={ref}>
              {start && <CountUp end={number} duration={2.5} />}
              {!start && <span>0</span>}
              {suffix}
            </span>

            <span className={styles['homepage-stats__label']}>
              {stat.span.map((item, i) => (
                <span key={i} className={TextAnimateStyles['word']}>
                  {item}
                </span>
              ))}
            </span>
          </li>
        );
      })}
    </ul>
  );
};
