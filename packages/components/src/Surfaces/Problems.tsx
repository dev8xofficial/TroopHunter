/* eslint-disable prettier/prettier */
import React, { ReactNode } from 'react';

type StepItem = {
  title: string;
  description: string;
  icon: ReactNode;
};

type ProblemProps = {
  title: string;
  paragraph: string;
  stepsList: StepItem[];
};

export const Problems: React.FC<ProblemProps> = ({ title, paragraph, stepsList }): JSX.Element => {
  return (
    <>
      <div className="my-[9.375rem] gap-[5rem] grid px-[var(--container-gutter)] md:gap-[6.25rem] lg:gap-[9.375rem]">
        <section className="w-full mx-auto px-[var(--container-gutter)] max-w-[calc(clamp(76.25rem,80.6878306878vw,101.4125rem)+var(--container-gutter)*2)] var-container-gutter-0px gap-[3.125rem] grid">
          <h2 className="font-medium text-[1.875rem] text-balance leading-[1] max-w-[clamp(51.875rem,54.8941798942vw,68.99375rem)] m-0 text-[#0f1d07] mt-0 lg:text-[clamp(6.25rem,6.6137566138vw,8.3125rem)]">{title}</h2>
          <p className="m-0 max-w-[clamp(45.625rem,48.2804232804vw,60.68125rem)] leading-[clamp(1.875rem,1.9841269841vw,2.49375rem)] text-[clamp(1.25rem,1.3227513228vw,1.6625rem)] text-[rgba(28,50,50,.7)] opacity-100">{paragraph}</p>
          <ul className="items-start  gap-[clamp(3.125rem,3.3068783069vw,4.15625rem)_clamp(2rem,2.1164021164vw,2.66rem)] grid list-none p-0 m-0 grid-cols-2 lg:grid-cols-4">
            {stepsList.map((item) => (
              <li className="gap-[clamp(1.25rem,1.3227513228vw,1.6625rem)] grid">
                <div className="relative h-[clamp(1.625rem,1.7195767196vw,2.16125rem)]">{item.icon}</div>
                <hr className="overflow-visible h-0 box-content opacity-5 border-b border-t-0 w-full m-0" />
                <h3 className="leading-[clamp(1.5rem,1.5873015873vw,1.995rem)] text-[clamp(1.125rem,1.1904761905vw,1.49625rem)] m-0 text-[var(--theme-secondary)]">{item.title}</h3>
                <p className="leading-[clamp(1.5625rem,1.6534391534vw,2.078125rem)] text-[clamp(.9375rem,.9920634921vw,1.246875rem)] m-0">{item.description}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
};
