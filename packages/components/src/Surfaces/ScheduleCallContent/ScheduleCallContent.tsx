'use client';

import React, { useState } from 'react';

import { ScheduleCallModal } from '../../Modals/ScheduleCallModal/ScheduleCallModal';
import { prefixed } from '../../../utils/helpers';

import CaseStudySidebarStyles from '../../Surfaces/CaseStudySidebar/index.module.css';
import ProjectContentsStyles from '../../Surfaces/ProjectContents/index.module.css';
import PictureStyles from '../../Surfaces/Picture/index.module.css';
import WorkCardStyles from '../../Surfaces/WorkCard/index.module.css';
import WorkGridStyles from '../../Layout/WorkGrid/index.module.css';

export const ScheduleCallContent: React.FC = (): JSX.Element => {
  const [imageError, setImageError] = useState(false);
  return (
    <div className={`${ProjectContentsStyles['project-content']} project-content`}>
      <div className={ProjectContentsStyles['project-content__body']}>
        <div className={CaseStudySidebarStyles['sidebar']}>
          <div className={CaseStudySidebarStyles['sidebar__inner']}>
            <div className={CaseStudySidebarStyles['sidebar__header']}>
              {!imageError ? (
                <img src={prefixed('/images/offers/head.jpg')} alt="Schedule Call" className={CaseStudySidebarStyles['sidebar__image']} onError={() => setImageError(true)} style={{ width: '100%', height: 'auto', borderRadius: '1rem', display: 'block' }} />)
                : (
                  <div className={WorkGridStyles['work-grid']} style={{ width: '100%', height: 'auto', display: 'block' }}>
                    <div className={`${WorkGridStyles['work-grid__row']} ${WorkGridStyles['work-grid__row--landscape']}`} style={{ width: '100%', justifyContent: 'center' }}>
                      <div className={WorkCardStyles['work-card-wrapper']} style={{ '--aspect-x': 1452, '--aspect-y': 890, opacity: 1, transform: 'translateY(0px)', width: '100%', maxWidth: '100%' } as React.CSSProperties}>
                        <a className={`${WorkCardStyles['work-card']} ${WorkCardStyles['work-card--landscape']}`} href="#" style={{ display: 'block', width: '100%' }}>
                          <div className={WorkCardStyles['work-card__thumbnail-wrapper']} style={{ position: 'relative', width: '100%', height: 'auto' }}>
                            <div className={`${WorkCardStyles['work-card__thumbnail-outer']}`} style={{ backgroundColor: '#0077ff20', borderRadius: '1rem', height: '404.812px', width: '506.016px', }}></div>

                            <div className={WorkCardStyles['work-card__thumbnail-inner']}>
                              <picture className={`${PictureStyles['picture']} ${WorkCardStyles['work-card__picture']}`} style={{ display: 'block', width: '100%', height: 'auto' }}>
                                <img src={prefixed('/images/offers/fallback.jpg')} loading="lazy" alt="Fallback Preview" draggable={false} style={{ width: '100%', height: 'auto', }}
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = prefixed(
                                      '/api/images/placeholder/1080-transparent.png/m/312x178/filters:quality(80)'
                                    );
                                  }}
                                />
                              </picture>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                )}
            </div>
            <div className={CaseStudySidebarStyles['sidebar__intro']}>
              <p>Trusted by 50+ startups</p>
            </div>
            <ul className={CaseStudySidebarStyles['custom-icon-list']}>
              <li key={1}>Free & No Obligation</li>
              <li key={2}>Get Clarity on cost & timelines</li>
              <li key={3}>Meet a real technical lead</li>
            </ul>
          </div>
        </div>
        <div className={ProjectContentsStyles['project-content__blocks']}>
          <ScheduleCallModal />
        </div>
      </div>
    </div>
  );
};
