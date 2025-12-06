'use client';

import React from 'react';
import { useSetAtom } from 'jotai';
import { ExpertiseContent, ExpertiseHeroButton } from '../../Interfaces/Expertise/Expertise';
import { ICON_MAP } from '../../Surfaces/IconCards/IconMap';
import { toggleSmoothModalAtom } from '../../../store/smoothModalAtom';
import { Button } from '../../Input/Button/Button';
import RightArrowIcon from '../../Icons/RightArrow';

import IconCardStyles from '../IconCards/index.module.css';
import ButtonStyles from '../../Input/Button/index.module.css';
import PictureStyles from '../../Surfaces/Picture/index.module.css';
import LayoutStyles from '../Layout/layout.module.css';
import HeroStyles from '../Hero/index.module.css';

interface HeroCoreProps extends Omit<ExpertiseContent, 'meta' | 'slug' | 'iconCards' | 'contentAsideImageItems' | 'footerMainContent' | 'footerData' | 'footerSocialLinks' | 'testimonials'> {
  icon?: { name: string; size: number };
  placeholder?: boolean;
  paragraph?: string;
}

export const HeroCore: React.FC<HeroCoreProps> = ({ heading, icon, image, paragraph, heroButtons = [] }): JSX.Element => {
  const toggleModal = useSetAtom(toggleSmoothModalAtom);
  const buttonsToRender = heroButtons.filter((button) => button?.label?.trim());

  const handleButtonClick = (button: ExpertiseHeroButton) => {
    if (button.modalType) {
      toggleModal(button.modalType);
      return;
    }

    const url = button.href || '/pricing/tech-founders';
    const target = button.target || '_blank';

    if (target === '_blank') {
      window.open(url, target, 'noopener,noreferrer');
      return;
    }

    window.open(url, target);
  };

  return (
    <>
      <div>
        <div>
          <div className={HeroStyles['expertise-hero-container']} data-new-theme="false">
            <div className={HeroStyles['expertise-heading-container']} data-new-theme="false">
              <div style={{ opacity: 1, transform: 'translateY(0px)' }}>
                <h2 className={HeroStyles['expertise-heading']}>
                  {heading.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </h2>
                <div style={{ opacity: 1, transform: 'translateY(0px)' }}>{paragraph && <p className={IconCardStyles['icon-cards__intro']} dangerouslySetInnerHTML={{ __html: paragraph }} />}</div>
                {buttonsToRender.length > 0 && (
                  <div className={LayoutStyles['work-header']}>
                    {buttonsToRender.map((button, index) => (
                      <Button type="button" variant="secondary" context="contact" fullWidth key={`${button.label}-${index}`} endIcon={<RightArrowIcon size={14} className={ButtonStyles['button--icon']} />} onClick={() => handleButtonClick(button)}>
                        {button.label}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {image ? (
              <div className={HeroStyles['expertise-image']} style={{ opacity: 1, transform: 'translateY(0px)' }}>
                <picture className={`${PictureStyles['picture']} ${PictureStyles['picture--responsive']} ${HeroStyles['expertise-image__picture']}`}>
                  <source srcSet={`${image}/m/450x240/filters:quality(80) 1x, ${image}/m/900x480/filters:quality(80) 2x`} media="(min-width: 0px) and (max-width: 479px)" />
                  <source srcSet={`${image}/m/932x498/filters:quality(80) 1x, ${image}/m/1864x996/filters:quality(80) 2x`} media="(min-width: 480px) and (max-width: 991px)" />
                  <source srcSet={`${image}/m/1432x765/filters:quality(80) 1x, ${image}/m/2864x1530/filters:quality(80) 2x`} media="(min-width: 992px) and (max-width: 1512px)" />
                  <source srcSet={`${image}/m/1905x1018/filters:quality(80) 1x, ${image}/m/3810x2036/filters:quality(80) 2x`} media="(min-width: 1513px)" />
                  <img src={`${image}/m/450x240/filters:quality(80)`} loading="eager" width="450" height="240" alt="Sussex Image" className="max-w-full h-auto w-full" draggable="false" />
                </picture>
              </div>
            ) : (
              icon && (
                <div className={`${HeroStyles['expertise-image']} ${HeroStyles['expertise-icon-wrapper']}`} style={{ opacity: 1, transform: 'translateY(0px)' }}>
                  {ICON_MAP[icon.name]?.(120)}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};
