import React from 'react';

const FeatureVideo: React.FC = (): JSX.Element => {
  return (
    <>
      <div className="grid-template-areas-top-bottom grid-rows-[50%_50%] grid px-[var(--container-gutter)] w-full">
        <div className="row-start-[top] col-start-[bottom] row-end-[top] col-end-[bottom]">
          <div className="rounded-[inherit] z-[1] relative grid">
            <div className="overflow-hidden grid relative origin-[50%_50%_0px] transform-none rounded-[30px]">
              <picture className="max-w-full leading-0 block rounded-[inherit] aspect-square row-start-1 -col-start-1 row-end-auto col-end-auto object-cover w-full">
                <source srcSet="https://a-us.storyblok.com/f/1017006/1920x1080/709b0d5177/showreel_placeholder.png/m/450x364/filters:quality(80) 1x, https://a-us.storyblok.com/f/1017006/1920x1080/709b0d5177/showreel_placeholder.png/m/900x728/filters:quality(80) 2x" media="(min-width: 0px) and (max-width: 479px)" />
                <source srcSet="https://a-us.storyblok.com/f/1017006/1920x1080/709b0d5177/showreel_placeholder.png/m/1452x890/filters:quality(80) 1x, https://a-us.storyblok.com/f/1017006/1920x1080/709b0d5177/showreel_placeholder.png/m/2904x1780/filters:quality(80) 2x" media="(min-width: 480px)" />
                <img className="block m-0 max-w-full object-cover h-full w-full left-0 top-0 absolute outline-offset-0 rounded-[inherit] border border-solid border-transparent transform transition-[outline_.4s]" src="https://a-us.storyblok.com/f/1017006/1920x1080/709b0d5177/showreel_placeholder.png/m/450x364/filters:quality(80)" alt="" />
              </picture>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeatureVideo;
