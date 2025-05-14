import React from 'react';
import { useRef, useEffect } from 'react';

import PictureStyles from '../Picture/index.module.css';
import styles from './index.module.css';

export const AboutGallery: React.FC = (): JSX.Element => {
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    const mouseDown = (e: MouseEvent) => {
      isDown = true;
      gallery.classList.add(styles.dragging); // use a CSS module class
      startX = e.pageX - gallery.offsetLeft;
      scrollLeft = gallery.scrollLeft;
    };

    const mouseLeave = () => {
      isDown = false;
      gallery.classList.remove(styles.dragging);
    };

    const mouseUp = () => {
      isDown = false;
      gallery.classList.remove(styles.dragging);
    };

    const mouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - gallery.offsetLeft;
      const walk = (x - startX) * 1.5;
      gallery.scrollLeft = scrollLeft - walk;
    };

    gallery.addEventListener('mousedown', mouseDown);
    gallery.addEventListener('mouseleave', mouseLeave);
    gallery.addEventListener('mouseup', mouseUp);
    gallery.addEventListener('mousemove', mouseMove);

    return () => {
      gallery.removeEventListener('mousedown', mouseDown);
      gallery.removeEventListener('mouseleave', mouseLeave);
      gallery.removeEventListener('mouseup', mouseUp);
      gallery.removeEventListener('mousemove', mouseMove);
    };
  }, []);
  return (
    <>
      <div className={`${styles['gallery-wrapper']} ${styles['about-gallery']}`} ref={galleryRef}>
        <div className={styles['gallery']} style={{ transform: 'translateX(-6913.17px) translateZ(0px)' }}>
          {/* Mobile Slider Loop-Left */}
          <div className={`${styles['gallery__shrink-drag']} gallery__item--loop-left`}>
            <div className={styles['gallery__item']}>
              <picture className={`${PictureStyles['picture']} ${styles['gallery__image']} AboutGallery_gallery__image--short`}>
                <source srcSet="https://a-us.storyblok.com/f/1017006/1121x694/0e805b7b17/office.jpg/m/0x347/filters:quality(80) 1x, https://a-us.storyblok.com/f/1017006/1121x694/0e805b7b17/office.jpg/m/0x694/filters:quality(80) 2x" media="(min-width: 0px)" />
                <img src="https://a-us.storyblok.com/f/1017006/1121x694/0e805b7b17/office.jpg/m/0x347/filters:quality(80)" loading="eager" height="347" alt="" className="" draggable="false" />
              </picture>
            </div>
          </div>
          <div className={`${styles['gallery__shrink-drag']} gallery__item--loop-left`}>
            <div className={styles['gallery__item']}>
              <picture className={`${PictureStyles['picture']} ${styles['gallery__image']} AboutGallery_gallery__image--short`}>
                <source srcSet="https://a-us.storyblok.com/f/1017006/990x990/b8b5d62739/video1_placeholder.jpg/m/0x495/filters:quality(80) 1x, https://a-us.storyblok.com/f/1017006/990x990/b8b5d62739/video1_placeholder.jpg/m/0x990/filters:quality(80) 2x" media="(min-width: 0px)" />
                <img src="https://a-us.storyblok.com/f/1017006/990x990/b8b5d62739/video1_placeholder.jpg/m/0x495/filters:quality(80)" loading="eager" height="347" alt="" className="" draggable="false" />
              </picture>
              <video className={styles['gallery__video']} src="https://player.vimeo.com/progressive_redirect/playback/901002501/rendition/1080p/file.mp4?loc=external&log_user=0&signature=ba88205b79ded12806ea6b753a880ac05c401d21a0400b43428b1f80fd0f06a2" loop />
            </div>
          </div>
          <div className={`${styles['gallery__shrink-drag']} gallery__item--loop-left`}>
            <div className={styles['gallery__item']}>
              <picture className={`${PictureStyles['picture']} ${styles['gallery__image']} AboutGallery_gallery__image--short`}>
                <source srcSet="https://a-us.storyblok.com/f/1017006/1041x694/7e4f322b19/chats.jpg/m/0x347/filters:quality(80) 1x, https://a-us.storyblok.com/f/1017006/1041x694/7e4f322b19/chats.jpg/m/0x694/filters:quality(80) 2x" media="(min-width: 0px)" />
                <img src="https://a-us.storyblok.com/f/1017006/1041x694/7e4f322b19/chats.jpg/m/0x347/filters:quality(80)" loading="eager" height="347" alt="" className="" draggable="false" />
              </picture>
            </div>
          </div>
          <div className={`${styles['gallery__shrink-drag']} gallery__item--loop-left`}>
            <div className={styles['gallery__item']}>
              <picture className={`${PictureStyles['picture']} ${styles['gallery__image']} AboutGallery_gallery__image--tall`}>
                <source srcSet="https://a-us.storyblok.com/f/1017006/958x990/b81de9285b/letsinterface.jpg/m/0x495/filters:quality(80) 1x, https://a-us.storyblok.com/f/1017006/958x990/b81de9285b/letsinterface.jpg/m/0x990/filters:quality(80) 2x" media="(min-width: 0px)" />
                <img src="https://a-us.storyblok.com/f/1017006/958x990/b81de9285b/letsinterface.jpg/m/0x495/filters:quality(80)" loading="eager" height="495" alt="" className="" draggable="false" />
              </picture>
            </div>
          </div>
          <div className={`${styles['gallery__shrink-drag']} gallery__item--loop-left`}>
            <div className={styles['gallery__item']}>
              <picture className={`${PictureStyles['picture']} ${styles['gallery__image']} AboutGallery_gallery__image--short`}>
                <source srcSet="https://a-us.storyblok.com/f/1017006/1800x900/f9f47af7d2/6_icecream.jpg/m/0x347/filters:quality(80) 1x, https://a-us.storyblok.com/f/1017006/1800x900/f9f47af7d2/6_icecream.jpg/m/0x694/filters:quality(80) 2x" media="(min-width: 0px)" />
                <img src="https://a-us.storyblok.com/f/1017006/1800x900/f9f47af7d2/6_icecream.jpg/m/0x347/filters:quality(80)" loading="eager" height="347" alt="" className="" draggable="false" />
              </picture>
            </div>
          </div>
          <div className={`${styles['gallery__shrink-drag']} gallery__item--loop-left`}>
            <div className={styles['gallery__item']}>
              <picture className={`${PictureStyles['picture']} ${styles['gallery__image']} AboutGallery_gallery__image--tall`}>
                <source srcSet="https://a-us.storyblok.com/f/1017006/990x990/b8d8879cf1/video2_placeholder.jpg/m/0x495/filters:quality(80) 1x, https://a-us.storyblok.com/f/1017006/990x990/b8d8879cf1/video2_placeholder.jpg/m/0x990/filters:quality(80) 2x" media="(min-width: 0px)" />
                <img src="https://a-us.storyblok.com/f/1017006/990x990/b8d8879cf1/video2_placeholder.jpg/m/0x495/filters:quality(80)" loading="eager" height="495" alt="" className="" draggable="false" />
              </picture>
              <video className={styles['gallery__video']} src="https://player.vimeo.com/progressive_redirect/playback/901002491/rendition/1080p/file.mp4?loc=external&log_user=0&signature=9b091e62d7300795690127c92eaf2f3d0cc08651da621b5bd6928df579df593b" loop />
            </div>
          </div>
          <div className={`${styles['gallery__shrink-drag']} gallery__item--loop-left`}>
            <div className={styles['gallery__item']}>
              <picture className={`${PictureStyles['picture']} ${styles['gallery__image']} AboutGallery_gallery__image--short`}>
                <source srcSet="https://a-us.storyblok.com/f/1017006/1251x694/c65618e8d1/tennis_2.jpg/m/0x347/filters:quality(80) 1x, https://a-us.storyblok.com/f/1017006/1251x694/c65618e8d1/tennis_2.jpg/m/0x694/filters:quality(80) 2x" media="(min-width: 0px)" />
                <img src="https://a-us.storyblok.com/f/1017006/1251x694/c65618e8d1/tennis_2.jpg/m/0x347/filters:quality(80)" loading="eager" height="347" alt="" className="" draggable="false" />
              </picture>
            </div>
          </div>
          <div className={`${styles['gallery__shrink-drag']} gallery__item--loop-left`}>
            <div className={styles['gallery__item']}>
              <picture className={`${PictureStyles['picture']} ${styles['gallery__image']} AboutGallery_gallery__image--tall`}>
                <source srcSet="https://a-us.storyblok.com/f/1017006/742x990/f9c484e104/ross-jess.jpg/m/0x495/filters:quality(80) 1x, https://a-us.storyblok.com/f/1017006/742x990/f9c484e104/ross-jess.jpg/m/0x990/filters:quality(80) 2x" media="(min-width: 0px)" />
                <img src="https://a-us.storyblok.com/f/1017006/742x990/f9c484e104/ross-jess.jpg/m/0x495/filters:quality(80)" loading="eager" height="495" alt="" className="" draggable="false" />
              </picture>
            </div>
          </div>
          <div className={`${styles['gallery__shrink-drag']} gallery__item--loop-left`}>
            <div className={styles['gallery__item']}>
              <picture className={`${PictureStyles['picture']} ${styles['gallery__image']} AboutGallery_gallery__image--short`}>
                <source srcSet="https://a-us.storyblok.com/f/1017006/1234x694/1fb9cf9818/video3_placeholder.jpg/m/0x347/filters:quality(80) 1x, https://a-us.storyblok.com/f/1017006/1234x694/1fb9cf9818/video3_placeholder.jpg/m/0x694/filters:quality(80) 2x" media="(min-width: 0px)" />
                <img src="https://a-us.storyblok.com/f/1017006/1234x694/1fb9cf9818/video3_placeholder.jpg/m/0x347/filters:quality(80)" loading="eager" height="347" alt="" className="" draggable="false" />
              </picture>
              <video className={styles['gallery__video']} src="https://player.vimeo.com/progressive_redirect/playback/901002477/rendition/720p/file.mp4?loc=external&log_user=0&signature=a7ee1000b5f48b65d0397e12fca18be3c1c58ba1ef9466c58c180f4548a1e6d8" loop />
            </div>
          </div>
          <div className={`${styles['gallery__shrink-drag']} gallery__item--loop-left`}>
            <div className={styles['gallery__item']}>
              <picture className={`${PictureStyles['picture']} ${styles['gallery__image']} AboutGallery_gallery__image--tall`}>
                <source srcSet="https://a-us.storyblok.com/f/1017006/500x500/eb95e694ec/2_workshop.jpg/m/0x495/filters:quality(80) 1x, https://a-us.storyblok.com/f/1017006/500x500/eb95e694ec/2_workshop.jpg/m/0x990/filters:quality(80) 2x" media="(min-width: 0px)" />
                <img src="https://a-us.storyblok.com/f/1017006/500x500/eb95e694ec/2_workshop.jpg/m/0x495/filters:quality(80)" loading="eager" height="495" alt="" className="" draggable="false" />
              </picture>
            </div>
          </div>
          <div className={`${styles['gallery__shrink-drag']} gallery__item--loop-left`}>
            <div className={styles['gallery__item']}>
              <picture className={`${PictureStyles['picture']} ${styles['gallery__image']} AboutGallery_gallery__image--short`}>
                <source srcSet="https://a-us.storyblok.com/f/1017006/1041x694/3c7a908d0d/lunching.jpg/m/0x347/filters:quality(80) 1x, https://a-us.storyblok.com/f/1017006/1041x694/3c7a908d0d/lunching.jpg/m/0x694/filters:quality(80) 2x" media="(min-width: 0px)" />
                <img src="https://a-us.storyblok.com/f/1017006/1041x694/3c7a908d0d/lunching.jpg/m/0x347/filters:quality(80)" loading="eager" height="347" alt="" className="" draggable="false" />
              </picture>
            </div>
          </div>
          <div className={`${styles['gallery__shrink-drag']} gallery__item--loop-left`}>
            <div className={styles['gallery__item']}>
              <picture className={`${PictureStyles['picture']} ${styles['gallery__image']} AboutGallery_gallery__image--tall`}>
                <source srcSet="https://a-us.storyblok.com/f/1017006/500x500/9d5515c81a/9_bowling.jpg/m/0x495/filters:quality(80) 1x, https://a-us.storyblok.com/f/1017006/500x500/9d5515c81a/9_bowling.jpg/m/0x990/filters:quality(80) 2x" media="(min-width: 0px)" />
                <img src="https://a-us.storyblok.com/f/1017006/500x500/9d5515c81a/9_bowling.jpg/m/0x495/filters:quality(80)" loading="eager" height="495" alt="" className="" draggable="false" />
              </picture>
            </div>
          </div>
          {/* Dekstop Silder */}
          <div className={`${styles['gallery__shrink-drag']}`}>
            <div className={styles['gallery__item']} style={{ opacity: 1, transform: 'translateY(0px)' }}>
              <picture className={`${PictureStyles['picture']} ${styles['gallery__image']} AboutGallery_gallery__image--tall`}>
                <source srcSet="https://a-us.storyblok.com/f/1017006/1121x694/0e805b7b17/office.jpg/m/0x347/filters:quality(80) 1x, https://a-us.storyblok.com/f/1017006/1121x694/0e805b7b17/office.jpg/m/0x694/filters:quality(80) 2x" media="(min-width: 0px)" />
                <img src="https://a-us.storyblok.com/f/1017006/1121x694/0e805b7b17/office.jpg/m/0x347/filters:quality(80)" loading="eager" height="347" alt="" className="" draggable="false" />
              </picture>
            </div>
          </div>
          <div className={`${styles['gallery__shrink-drag']}`}>
            <div className={styles['gallery__item']} style={{ opacity: 1, transform: 'translateY(0px)' }}>
              <picture className={`${PictureStyles['picture']} ${styles['gallery__image']} AboutGallery_gallery__image--short`}>
                <source srcSet="https://a-us.storyblok.com/f/1017006/990x990/b8b5d62739/video1_placeholder.jpg/m/0x495/filters:quality(80) 1x, https://a-us.storyblok.com/f/1017006/990x990/b8b5d62739/video1_placeholder.jpg/m/0x990/filters:quality(80) 2x" media="(min-width: 0px)" />
                <img src="https://a-us.storyblok.com/f/1017006/990x990/b8b5d62739/video1_placeholder.jpg/m/0x495/filters:quality(80)" loading="eager" height="347" alt="" className="" draggable="false" />
              </picture>
              <video className={styles['gallery__video']} src="https://player.vimeo.com/progressive_redirect/playback/901002501/rendition/1080p/file.mp4?loc=external&log_user=0&signature=ba88205b79ded12806ea6b753a880ac05c401d21a0400b43428b1f80fd0f06a2" autoPlay muted loop playsInline controls></video>
            </div>
          </div>
          <div className={`${styles['gallery__shrink-drag']}`}>
            <div className={styles['gallery__item']} style={{ opacity: 1, transform: 'translateY(0px)' }}>
              <picture className={`${PictureStyles['picture']} ${styles['gallery__image']} AboutGallery_gallery__image--short`}>
                <source srcSet="https://a-us.storyblok.com/f/1017006/1041x694/7e4f322b19/chats.jpg/m/0x347/filters:quality(80) 1x, https://a-us.storyblok.com/f/1017006/1041x694/7e4f322b19/chats.jpg/m/0x694/filters:quality(80) 2x" media="(min-width: 0px)" />
                <img src="https://a-us.storyblok.com/f/1017006/1041x694/7e4f322b19/chats.jpg/m/0x347/filters:quality(80)" loading="eager" height="347" alt="" className="" draggable="false" />
              </picture>
            </div>
          </div>
          <div className={`${styles['gallery__shrink-drag']}`}>
            <div className={styles['gallery__item']} style={{ opacity: 1, transform: 'translateY(0px)' }}>
              <picture className={`${PictureStyles['picture']} ${styles['gallery__image']} AboutGallery_gallery__image--tall`}>
                <source srcSet="https://a-us.storyblok.com/f/1017006/958x990/b81de9285b/letsinterface.jpg/m/0x495/filters:quality(80) 1x, https://a-us.storyblok.com/f/1017006/958x990/b81de9285b/letsinterface.jpg/m/0x990/filters:quality(80) 2x" media="(min-width: 0px)" />
                <img src="https://a-us.storyblok.com/f/1017006/958x990/b81de9285b/letsinterface.jpg/m/0x495/filters:quality(80)" loading="eager" height="495" alt="" className="" draggable="false" />
              </picture>
            </div>
          </div>
          <div className={`${styles['gallery__shrink-drag']}`}>
            <div className={styles['gallery__item']} style={{ opacity: 1, transform: 'translateY(0px)' }}>
              <picture className={`${PictureStyles['picture']} ${styles['gallery__image']} AboutGallery_gallery__image--short`}>
                <source srcSet="https://a-us.storyblok.com/f/1017006/1800x900/f9f47af7d2/6_icecream.jpg/m/0x347/filters:quality(80) 1x, https://a-us.storyblok.com/f/1017006/1800x900/f9f47af7d2/6_icecream.jpg/m/0x694/filters:quality(80) 2x" media="(min-width: 0px)" />
                <img src="https://a-us.storyblok.com/f/1017006/1800x900/f9f47af7d2/6_icecream.jpg/m/0x347/filters:quality(80)" loading="eager" height="347" alt="" className="" draggable="false" />
              </picture>
            </div>
          </div>
          <div className={`${styles['gallery__shrink-drag']}`}>
            <div className={styles['gallery__item']} style={{ opacity: 1, transform: 'translateY(0px)' }}>
              <picture className={`${PictureStyles['picture']} ${styles['gallery__image']} AboutGallery_gallery__image--tall`}>
                <source srcSet="https://a-us.storyblok.com/f/1017006/990x990/b8d8879cf1/video2_placeholder.jpg/m/0x495/filters:quality(80) 1x, https://a-us.storyblok.com/f/1017006/990x990/b8d8879cf1/video2_placeholder.jpg/m/0x990/filters:quality(80) 2x" media="(min-width: 0px)" />
                <img src="https://a-us.storyblok.com/f/1017006/990x990/b8d8879cf1/video2_placeholder.jpg/m/0x495/filters:quality(80)" loading="eager" height="495" alt="" className="" draggable="false" />
              </picture>
              <video className={styles['gallery__video']} src="https://player.vimeo.com/progressive_redirect/playback/901002491/rendition/1080p/file.mp4?loc=external&log_user=0&signature=9b091e62d7300795690127c92eaf2f3d0cc08651da621b5bd6928df579df593b" loop />
            </div>
          </div>
          <div className={`${styles['gallery__shrink-drag']}`}>
            <div className={styles['gallery__item']} style={{ opacity: 1, transform: 'translateY(0px)' }}>
              <picture className={`${PictureStyles['picture']} ${styles['gallery__image']} AboutGallery_gallery__image--short`}>
                <source srcSet="https://a-us.storyblok.com/f/1017006/1251x694/c65618e8d1/tennis_2.jpg/m/0x347/filters:quality(80) 1x, https://a-us.storyblok.com/f/1017006/1251x694/c65618e8d1/tennis_2.jpg/m/0x694/filters:quality(80) 2x" media="(min-width: 0px)" />
                <img src="https://a-us.storyblok.com/f/1017006/1251x694/c65618e8d1/tennis_2.jpg/m/0x347/filters:quality(80)" loading="eager" height="347" alt="" className="" draggable="false" />
              </picture>
            </div>
          </div>
          <div className={`${styles['gallery__shrink-drag']}`}>
            <div className={styles['gallery__item']} style={{ opacity: 1, transform: 'translateY(0px)' }}>
              <picture className={`${PictureStyles['picture']} ${styles['gallery__image']} AboutGallery_gallery__image--tall`}>
                <source srcSet="https://a-us.storyblok.com/f/1017006/742x990/f9c484e104/ross-jess.jpg/m/0x495/filters:quality(80) 1x, https://a-us.storyblok.com/f/1017006/742x990/f9c484e104/ross-jess.jpg/m/0x990/filters:quality(80) 2x" media="(min-width: 0px)" />
                <img src="https://a-us.storyblok.com/f/1017006/742x990/f9c484e104/ross-jess.jpg/m/0x495/filters:quality(80)" loading="eager" height="495" alt="" className="" draggable="false" />
              </picture>
            </div>
          </div>
          {/* Mobile Silder Loop-Right */}
          <div className={`${styles['gallery__shrink-drag']} gallery__item--loop-right`}>
            <div className={styles['gallery__item']}>
              <picture className={`${PictureStyles['picture']} ${styles['gallery__image']} AboutGallery_gallery__image--short`}>
                <source srcSet="https://a-us.storyblok.com/f/1017006/1121x694/0e805b7b17/office.jpg/m/0x347/filters:quality(80) 1x, https://a-us.storyblok.com/f/1017006/1121x694/0e805b7b17/office.jpg/m/0x694/filters:quality(80) 2x" media="(min-width: 0px)" />
                <img src="https://a-us.storyblok.com/f/1017006/1121x694/0e805b7b17/office.jpg/m/0x347/filters:quality(80)" loading="eager" height="347" alt="" className="" draggable="false" />
              </picture>
            </div>
          </div>
          <div className={`${styles['gallery__shrink-drag']} gallery__item--loop-right`}>
            <div className={styles['gallery__item']}>
              <picture className={`${PictureStyles['picture']} ${styles['gallery__image']} AboutGallery_gallery__image--short`}>
                <source srcSet="https://a-us.storyblok.com/f/1017006/990x990/b8b5d62739/video1_placeholder.jpg/m/0x495/filters:quality(80) 1x, https://a-us.storyblok.com/f/1017006/990x990/b8b5d62739/video1_placeholder.jpg/m/0x990/filters:quality(80) 2x" media="(min-width: 0px)" />
                <img src="https://a-us.storyblok.com/f/1017006/990x990/b8b5d62739/video1_placeholder.jpg/m/0x495/filters:quality(80)" loading="eager" height="347" alt="" className="" draggable="false" />
              </picture>
              <video className={styles['gallery__video']} src="https://player.vimeo.com/progressive_redirect/playback/901002501/rendition/1080p/file.mp4?loc=external&log_user=0&signature=ba88205b79ded12806ea6b753a880ac05c401d21a0400b43428b1f80fd0f06a2" autoPlay muted loop playsInline controls></video>
            </div>
          </div>
          <div className={`${styles['gallery__shrink-drag']} gallery__item--loop-right`}>
            <div className={styles['gallery__item']}>
              <picture className={`${PictureStyles['picture']} ${styles['gallery__image']} AboutGallery_gallery__image--short`}>
                <source srcSet="https://a-us.storyblok.com/f/1017006/1041x694/7e4f322b19/chats.jpg/m/0x347/filters:quality(80) 1x, https://a-us.storyblok.com/f/1017006/1041x694/7e4f322b19/chats.jpg/m/0x694/filters:quality(80) 2x" media="(min-width: 0px)" />
                <img src="https://a-us.storyblok.com/f/1017006/1041x694/7e4f322b19/chats.jpg/m/0x347/filters:quality(80)" loading="eager" height="347" alt="" className="" draggable="false" />
              </picture>
            </div>
          </div>
          <div className={`${styles['gallery__shrink-drag']} gallery__item--loop-right`}>
            <div className={styles['gallery__item']}>
              <picture className={`${PictureStyles['picture']} ${styles['gallery__image']} AboutGallery_gallery__image--tall`}>
                <source srcSet="https://a-us.storyblok.com/f/1017006/958x990/b81de9285b/letsinterface.jpg/m/0x495/filters:quality(80) 1x, https://a-us.storyblok.com/f/1017006/958x990/b81de9285b/letsinterface.jpg/m/0x990/filters:quality(80) 2x" media="(min-width: 0px)" />
                <img src="https://a-us.storyblok.com/f/1017006/958x990/b81de9285b/letsinterface.jpg/m/0x495/filters:quality(80)" loading="eager" height="495" alt="" className="" draggable="false" />
              </picture>
            </div>
          </div>
          <div className={`${styles['gallery__shrink-drag']} gallery__item--loop-right`}>
            <div className={styles['gallery__item']}>
              <picture className={`${PictureStyles['picture']} ${styles['gallery__image']} AboutGallery_gallery__image--short`}>
                <source srcSet="https://a-us.storyblok.com/f/1017006/1800x900/f9f47af7d2/6_icecream.jpg/m/0x347/filters:quality(80) 1x, https://a-us.storyblok.com/f/1017006/1800x900/f9f47af7d2/6_icecream.jpg/m/0x694/filters:quality(80) 2x" media="(min-width: 0px)" />
                <img src="https://a-us.storyblok.com/f/1017006/1800x900/f9f47af7d2/6_icecream.jpg/m/0x347/filters:quality(80)" loading="eager" height="347" alt="" className="" draggable="false" />
              </picture>
            </div>
          </div>
          <div className={`${styles['gallery__shrink-drag']} gallery__item--loop-right`}>
            <div className={styles['gallery__item']}>
              <picture className={`${PictureStyles['picture']} ${styles['gallery__image']} AboutGallery_gallery__image--tall`}>
                <source srcSet="https://a-us.storyblok.com/f/1017006/990x990/b8d8879cf1/video2_placeholder.jpg/m/0x495/filters:quality(80) 1x, https://a-us.storyblok.com/f/1017006/990x990/b8d8879cf1/video2_placeholder.jpg/m/0x990/filters:quality(80) 2x" media="(min-width: 0px)" />
                <img src="https://a-us.storyblok.com/f/1017006/990x990/b8d8879cf1/video2_placeholder.jpg/m/0x495/filters:quality(80)" loading="eager" height="495" alt="" className="" draggable="false" />
              </picture>
              <video className={styles['gallery__video']} src="https://player.vimeo.com/progressive_redirect/playback/901002491/rendition/1080p/file.mp4?loc=external&log_user=0&signature=9b091e62d7300795690127c92eaf2f3d0cc08651da621b5bd6928df579df593b" loop />
            </div>
          </div>
          <div className={`${styles['gallery__shrink-drag']} gallery__item--loop-right`}>
            <div className={styles['gallery__item']}>
              <picture className={`${PictureStyles['picture']} ${styles['gallery__image']} AboutGallery_gallery__image--short`}>
                <source srcSet="https://a-us.storyblok.com/f/1017006/1251x694/c65618e8d1/tennis_2.jpg/m/0x347/filters:quality(80) 1x, https://a-us.storyblok.com/f/1017006/1251x694/c65618e8d1/tennis_2.jpg/m/0x694/filters:quality(80) 2x" media="(min-width: 0px)" />
                <img src="https://a-us.storyblok.com/f/1017006/1251x694/c65618e8d1/tennis_2.jpg/m/0x347/filters:quality(80)" loading="eager" height="347" alt="" className="" draggable="false" />
              </picture>
            </div>
          </div>
          <div className={`${styles['gallery__shrink-drag']} gallery__item--loop-right`}>
            <div className={styles['gallery__item']}>
              <picture className={`${PictureStyles['picture']} ${styles['gallery__image']} AboutGallery_gallery__image--tall`}>
                <source srcSet="https://a-us.storyblok.com/f/1017006/742x990/f9c484e104/ross-jess.jpg/m/0x495/filters:quality(80) 1x, https://a-us.storyblok.com/f/1017006/742x990/f9c484e104/ross-jess.jpg/m/0x990/filters:quality(80) 2x" media="(min-width: 0px)" />
                <img src="https://a-us.storyblok.com/f/1017006/742x990/f9c484e104/ross-jess.jpg/m/0x495/filters:quality(80)" loading="eager" height="495" alt="" className="" draggable="false" />
              </picture>
            </div>
          </div>
          <div className={`${styles['gallery__shrink-drag']} gallery__item--loop-right`}>
            <div className={styles['gallery__item']}>
              <picture className={`${PictureStyles['picture']} ${styles['gallery__image']} AboutGallery_gallery__image--short`}>
                <source srcSet="https://a-us.storyblok.com/f/1017006/1234x694/1fb9cf9818/video3_placeholder.jpg/m/0x347/filters:quality(80) 1x, https://a-us.storyblok.com/f/1017006/1234x694/1fb9cf9818/video3_placeholder.jpg/m/0x694/filters:quality(80) 2x" media="(min-width: 0px)" />
                <img src="https://a-us.storyblok.com/f/1017006/1234x694/1fb9cf9818/video3_placeholder.jpg/m/0x347/filters:quality(80)" loading="eager" height="347" alt="" className="" draggable="false" />
              </picture>
              <video className={styles['gallery__video']} src="https://player.vimeo.com/progressive_redirect/playback/901002477/rendition/720p/file.mp4?loc=external&log_user=0&signature=a7ee1000b5f48b65d0397e12fca18be3c1c58ba1ef9466c58c180f4548a1e6d8" loop />
            </div>
          </div>
          <div className={`${styles['gallery__shrink-drag']} gallery__item--loop-right`}>
            <div className={styles['gallery__item']}>
              <picture className={`${PictureStyles['picture']} ${styles['gallery__image']} AboutGallery_gallery__image--tall`}>
                <source srcSet="https://a-us.storyblok.com/f/1017006/500x500/eb95e694ec/2_workshop.jpg/m/0x495/filters:quality(80) 1x, https://a-us.storyblok.com/f/1017006/500x500/eb95e694ec/2_workshop.jpg/m/0x990/filters:quality(80) 2x" media="(min-width: 0px)" />
                <img src="https://a-us.storyblok.com/f/1017006/500x500/eb95e694ec/2_workshop.jpg/m/0x495/filters:quality(80)" loading="eager" height="495" alt="" className="" draggable="false" />
              </picture>
            </div>
          </div>
          <div className={`${styles['gallery__shrink-drag']} gallery__item--loop-right`}>
            <div className={styles['gallery__item']}>
              <picture className={`${PictureStyles['picture']} ${styles['gallery__image']} AboutGallery_gallery__image--short`}>
                <source srcSet="https://a-us.storyblok.com/f/1017006/1041x694/3c7a908d0d/lunching.jpg/m/0x347/filters:quality(80) 1x, https://a-us.storyblok.com/f/1017006/1041x694/3c7a908d0d/lunching.jpg/m/0x694/filters:quality(80) 2x" media="(min-width: 0px)" />
                <img src="https://a-us.storyblok.com/f/1017006/1041x694/3c7a908d0d/lunching.jpg/m/0x347/filters:quality(80)" loading="eager" height="347" alt="" className="" draggable="false" />
              </picture>
            </div>
          </div>
          <div className={`${styles['gallery__shrink-drag']} gallery__item--loop-right`}>
            <div className={styles['gallery__item']}>
              <picture className={`${PictureStyles['picture']} ${styles['gallery__image']} AboutGallery_gallery__image--tall`}>
                <source srcSet="https://a-us.storyblok.com/f/1017006/500x500/9d5515c81a/9_bowling.jpg/m/0x495/filters:quality(80) 1x, https://a-us.storyblok.com/f/1017006/500x500/9d5515c81a/9_bowling.jpg/m/0x990/filters:quality(80) 2x" media="(min-width: 0px)" />
                <img src="https://a-us.storyblok.com/f/1017006/500x500/9d5515c81a/9_bowling.jpg/m/0x495/filters:quality(80)" loading="eager" height="495" alt="" className="" draggable="false" />
              </picture>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
