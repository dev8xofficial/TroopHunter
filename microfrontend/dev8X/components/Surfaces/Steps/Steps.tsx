import React from 'react';

type StepItem = {
  title: string;
  paragraph: string;
  image: string;
};

type StepsProps = {
  stepInfo: StepItem[];
};
const Steps: React.FC<StepsProps> = ({stepInfo}): JSX.Element => {
  return (
    <>
      <div className="my-[5rem] gap-[5rem] grid px-[var(--container-gutter)] md:gap-[6.25rem] lg:gap-[9.375rem]">
        <div className="w-full mx-auto px-[var(--container-gutter)] max-w-[calc(clamp(76.25rem,80.6878306878vw,101.4125rem)+var(--container-gutter)*2)] var-container-gutter-0px gap-[3.125rem] grid">
          {stepInfo.map((item, index) => (
            <div className="my-[5rem] gap-[5rem] grid px-[var(--container-gutter)] md:gap-[6.25rem] lg:gap-[9.375rem]">
              <div className="w-full mx-auto px-[var(--container-gutter)] max-w-[calc(clamp(76.25rem,80.6878306878vw,101.4125rem)+var(--container-gutter)*2)] var-container-gutter-0px items-start gap-[clamp(1.875rem,1.9841269841vw,2.49375rem)] grid lg:grid-cols-2">
                {index % 2 === 0 ? (
                  <>
                    <div className="rounded-[20px] relative overflow-hidden lg:rounded-[30px]">
                      <picture className="max-w-full leading-[0] block">
                        <source srcSet={`${item.image}/m/450x317/filters:quality(80) 1x, ${item.image}/m/900x634/filters:quality(80) 2x`} media="(min-width: 0px) and (max-width: 479px)" />
                        <source srcSet={`${item.image}/m/932x657/filters:quality(80) 1x, ${item.image}/m/1864x1314/filters:quality(80) 2x`} media="(min-width: 480px) and (max-width: 991px)" />
                        <source srcSet={`${item.image}/m/596x420/filters:quality(80) 1x, ${item.image}/m/1192x840/filters:quality(80) 2x`} media="(min-width: 992px)" />
                        <img className="m-0 max-w-full border border-transparent object-cover h-auto w-full" src={`${item.image}/m/450x317/filters:quality(80)`} loading="lazy" width="450" height="317" alt="" draggable="false" />
                      </picture>
                    </div>
                    <div className="m-[auto_0] lg:w-full lg:max-w-[clamp(28.75rem,30.4232804233vw,38.2375rem)] lg:ml-auto">
                      <h2 className="leading-[2.5rem] text-[1.875rem] m-[0_0_.8em] text-[var(--theme-secondary)] mt-0 lg:leading-[clamp(2.8125rem,2.9761904762vw,3.740625rem)] lg:text-[clamp(2.5rem,2.6455026455vw,3.325rem)]">{item.title}</h2>
                      <div>
                        <div className="leading-[1.6] text-[clamp(.9375rem,.9920634921vw,1.246875rem)]">
                          <p className="my-0">{item.paragraph}</p>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="m-[auto_0] lg:w-full lg:max-w-[clamp(28.75rem,30.4232804233vw,38.2375rem)] lg:mr-auto">
                      <h2 className="leading-[2.5rem] text-[1.875rem] m-[0_0_.8em] text-[var(--theme-secondary)] mt-0 lg:leading-[clamp(2.8125rem,2.9761904762vw,3.740625rem)] lg:text-[clamp(2.5rem,2.6455026455vw,3.325rem)]">{item.title}</h2>
                      <div>
                        <div className="leading-[1.6] text-[clamp(.9375rem,.9920634921vw,1.246875rem)]">
                          <p className="my-0">{item.paragraph}</p>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-[20px] relative overflow-hidden lg:rounded-[30px] max-lg:-order-1">
                      <picture className="max-w-full leading-[0] block">
                        <source srcSet={`${item.image}/m/450x317/filters:quality(80) 1x, ${item.image}/m/900x634/filters:quality(80) 2x`} media="(min-width: 0px) and (max-width: 479px)" />
                        <source srcSet={`${item.image}/m/932x657/filters:quality(80) 1x, ${item.image}/m/1864x1314/filters:quality(80) 2x`} media="(min-width: 480px) and (max-width: 991px)" />
                        <source srcSet={`${item.image}/m/596x420/filters:quality(80) 1x, ${item.image}/m/1192x840/filters:quality(80) 2x`} media="(min-width: 992px)" />
                        <img className="m-0 max-w-full border border-transparent object-cover h-auto w-full" src={`${item.image}/m/450x317/filters:quality(80)`} loading="lazy" width="450" height="317" alt="" draggable="false" />
                      </picture>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Steps;
