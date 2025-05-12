/* eslint-disable prettier/prettier */
import React from 'react';
import { WYSIWYG } from '../WYSIWYG/WYSIWYG';
import styles from './index.module.css';

type ContentAsideImageItem = {
  title: string;
  paragraph: string;
  image?: string;
  icon: React.ReactNode;
};

type ContentAsideImageProps = {
  ContentAsideImageItems: ContentAsideImageItem[];
};

export const ContentAsideImage: React.FC<ContentAsideImageProps> = ({ ContentAsideImageItems }): JSX.Element => {
  return (
    <>
      {ContentAsideImageItems.map((item, index) => {
        return (
          <React.Fragment key={index}>
            {index % 2 === 0 ? (
              <section className={`${styles['content-aside-image']} ${styles['content-aside-image--image-left']}`}>
                {/* <div className={styles['content-aside-image__image']} style={{ opacity: 1, transform: 'translateY(0px)' }}>
                  <picture className={`${PictureStyles['picture']} ${PictureStyles['picture--responsive']}`}>
                    <source srcSet={`${item.image}/m/450x317/filters:quality(80) 1x, ${item.image}/m/900x634/filters:quality(80) 2x`} media="(min-width: 0px) and (max-width: 479px)" />
                    <source srcSet={`${item.image}/m/932x657/filters:quality(80) 1x, ${item.image}/m/1864x1314/filters:quality(80) 2x`} media="(min-width: 480px) and (max-width: 991px)" />
                    <source srcSet={`${item.image}/m/596x420/filters:quality(80) 1x, ${item.image}/m/1192x840/filters:quality(80) 2x`} media="(min-width: 992px)" />
                    <img className="m-0 max-w-full border border-transparent object-cover h-auto w-full" src={`${item.image}/m/450x317/filters:quality(80)`} loading="lazy" width="450" height="317" alt="" draggable="false" />
                  </picture>
                </div> */}
                <div className={`${styles['content-aside-image__icon']} ${styles['content-aside-image--image-left']}`} style={{ opacity: 1, transform: 'translateY(0px)' }}>
                  <div className={styles['icon-wrapper']}>{item.icon}</div>
                </div>

                <div className={styles['content-aside-image__content']}>
                  <h2 className={styles['content-aside-image__heading']} aria-label="Elevate your brand">
                    {item.title}
                  </h2>
                  <div style={{ opacity: 1, transform: 'translateY(0px)' }}>
                    <WYSIWYG>
                      <p>
                        <span style={{ color: 'rgb(0, 0, 0)' }}>{item.paragraph}</span>
                      </p>
                    </WYSIWYG>
                  </div>
                </div>
              </section>
            ) : (
              <section className={`${styles['content-aside-image']} ${styles['content-aside-image--image-right']}`}>
                <div className={styles['content-aside-image__content']}>
                  <h2 className={styles['content-aside-image__heading']} aria-label="Elevate your brand">
                    {item.title}
                  </h2>
                  <div style={{ opacity: 1, transform: 'translateY(0px)' }}>
                    <WYSIWYG>
                      <p>
                        <span style={{ color: 'rgb(0, 0, 0)' }}>{item.paragraph}</span>
                      </p>
                    </WYSIWYG>
                  </div>
                </div>
                <div className={`${styles['content-aside-image__icon']} ${styles['content-aside-image--image-right']}`} style={{ opacity: 1, transform: 'translateY(0px)' }}>
                  <div className={styles['icon-wrapper']}>{item.icon}</div>
                </div>

                {/* <div className={styles['content-aside-image__image']} style={{ opacity: 1, transform: 'translateY(0px)' }}>
                  <picture className={`${PictureStyles['picture']} ${PictureStyles['picture--responsive']}`}>
                    <source srcSet={`${item.image}/m/450x317/filters:quality(80) 1x, ${item.image}/m/900x634/filters:quality(80) 2x`} media="(min-width: 0px) and (max-width: 479px)" />
                    <source srcSet={`${item.image}/m/932x657/filters:quality(80) 1x, ${item.image}/m/1864x1314/filters:quality(80) 2x`} media="(min-width: 480px) and (max-width: 991px)" />
                    <source srcSet={`${item.image}/m/596x420/filters:quality(80) 1x, ${item.image}/m/1192x840/filters:quality(80) 2x`} media="(min-width: 992px)" />
                    <img className="m-0 max-w-full border border-transparent object-cover h-auto w-full" src={`${item.image}/m/450x317/filters:quality(80)`} loading="lazy" width="450" height="317" alt="" draggable="false" />
                  </picture>
                </div> */}
              </section>
            )}
          </React.Fragment>
        );
      })}
    </>
  );
};
