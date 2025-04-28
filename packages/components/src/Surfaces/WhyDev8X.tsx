import React from 'react';

type WhyDev = {
  title: string;
  paragraph: string;
};

type WhyProps = {
  heading: string;
  para1: string;
  para2: string;
  image: string; // better to keep it string (URL)
  whyinfo: WhyDev[];
};

export const WhyDev8X: React.FC<WhyProps> = ({ heading, para1, para2, image, whyinfo }): JSX.Element => {
  return (
    <>
      <div className="grid-template-areas-heading-content-image-stats m-[clamp(5rem,5.291005291vw,6.65rem)_auto] grid w-full px-[var(--container-gutter)] max-w-[calc(clamp(89.5rem,94.708994709vw,119.035rem)+var(--container-gutter)*2)] lg:gap-[clamp(3.125rem,3.3068783069vw,4.15625rem)] lg:my-[clamp(8.125rem,8.5978835979vw,10.80625rem)]">
        {/* Heading */}
        <span className="leading-[1.15] text-[clamp(2.5rem,8.3333333333vw,3.325rem)] m-[0_0_.75em] max-w-[7.5em] text-[var(--theme-secondary)] row-start-[heading] col-start-[heading] row-end-[heading] col-end-[heading] lg:leading-[.75] lg:text-[clamp(8.125rem,8.5978835979vw,10.80625rem)]">
          <span style={{ display: 'inline-block', whiteSpace: 'pre' }}>{heading}</span>
        </span>
        <div className="row-start-[content] col-start-[content] row-end-[content] col-end-[content]">
          <div className="leading-[1.6] text-[clamp(1rem,1.6129032258vw,1.33rem)] text-[var(--theme-secondary)]">
            <p className="m-[1em_0] mb-[1em] mt-0">{para1}</p>
            <p className="m-[1em_0] mb-0">{para2}</p>
          </div>
        </div>
        <div className="row-start-[image] col-start-[image] row-end-[image] col-end-[image]">
          <picture className="mt-[clamp(3.75rem,12.5vw,4.9875rem)] overflow-hidden rounded-[30px] max-w-full leading-[0] block lg:mt-0">
            <img className="max-w-full m-0 object-cover h-auto w-full" src={image} loading="lazy" width="450" height="548" alt="About Image" draggable="false" />
          </picture>
        </div>
        <div className="self-end mt-[clamp(3.125rem,3.3068783069vw,4.15625rem)] grid row-start-[stats] col-start-[stats] row-end-[stats] col-end-[stats]">
          <ul className="grid p-0 m-0 list-none">
            {whyinfo.map((item, index) => (
              <li key={index} className="border-b border-[rgba(0,0,0,.1)] pb-[clamp(1.875rem,1.9841269841vw,2.49375rem)] grid-cols-[40%_60%] items-center grid text-[var(--theme-secondary)] pt-[clamp(1.875rem,1.9841269841vw,2.49375rem)]">
                <span className="text-[clamp(3.125rem,5.0403225806vw,4.15625rem)] max-w-full leading-[1] font-medium">{item.title}</span>
                <span className="text-[clamp(1.5rem,2.4193548387vw,1.995rem)] max-w-full leading-[1] font-medium pl-[clamp(2.8125rem,2.9761904762vw,3.740625rem)]">{item.paragraph}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};


