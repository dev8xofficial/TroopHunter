/* eslint-disable prettier/prettier */
import React from 'react';

type HeroProps = {
  tagBgColor: string;
  tagText: string;
  heading: string[];
  image: string;
};

const Hero: React.FC<HeroProps> = ({ tagBgColor, tagText, heading, image }): JSX.Element => {
  return (
    <>
      <div className="grid-rows-[auto_auto] grid-cols-[1fr] grid">
        <div className="[box-sizing:inherit] row-start-[-1] row-end-auto col-start-[1]"></div>
        <main className="block w-full my-[4.0625rem] mx-auto px-[clamp(2.5rem,2.6455026455vw,3.325rem)] max-w-[calc(clamp(89.5rem,94.708994709vw,119.035rem) + var(--container-gutter)*2)]">
          <div className="my-0 mx-auto">
            <div className="flex-col flex">
              <div className="translate-y-0 opacity-100">
                <h1 className={`mx-0 inline-block font-[600] leading-[1] text-[clamp(.9375rem,.9920634921vw,1.246875rem)] p-[clamp(.625rem,.6613756614vw,.83125rem)_clamp(.75rem,.7936507937vw,.9975rem)] rounded-[100vw] text-[#1c3232] bg-[${tagBgColor}] my-0`}>{tagText}</h1>
              </div>
            </div>
            <h2 className="m-[2rem_0] text-[2.5rem] text-[#12032a] leading-[1] max-w-[clamp(76.25rem,80.6878306878vw,101.4125rem)] font-bold lg:m-[clamp(5rem,5.291005291vw,6.65rem)_0!important] lg:text-[clamp(6.25rem,6.6137566138vw,8.3125rem)] ml-[2rem] lg:ml-[4rem]">
              {heading.map((text) => (
                <span className="translate-x-[0.5rem] whitespace-pre inline-block">
                  <span className="opacity-[1] whitespace-pre inline-block">{text}</span>
                  <span className="opacity-[1] whitespace-pre inline-block"> </span>
                </span>
              ))}
            </h2>
          </div>

          <div className="flex-1 relative rounded-[30px] overflow-hidden opacity-100">
            <picture className="max-w-full leading-0 block">
              <source srcSet={`${image}/m/450x240/filters:quality(80) 1x, ${image}/m/900x480/filters:quality(80) 2x`} media="(min-width: 0px) and (max-width: 479px)" />
              <source srcSet={`${image}/m/932x498/filters:quality(80) 1x, ${image}/m/1864x996/filters:quality(80) 2x`} media="(min-width: 480px) and (max-width: 991px)" />
              <source srcSet={`${image}/m/1432x765/filters:quality(80) 1x, ${image}/m/2864x1530/filters:quality(80) 2x`} media="(min-width: 992px) and (max-width: 1512px)" />
              <source srcSet={`${image}/m/1905x1018/filters:quality(80) 1x, ${image}/m/3810x2036/filters:quality(80) 2x`} media="(min-width: 1513px)" />
              <img src={`${image}/m/450x240/filters:quality(80)`} loading="eager" width="450" height="240" alt="Sussex Image" className="max-w-full h-auto w-full" draggable="false" />
            </picture>
          </div>
        </main>
      </div>
    </>
  );
};

export default Hero;
