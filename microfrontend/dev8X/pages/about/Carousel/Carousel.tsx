/* eslint-disable prettier/prettier */
import React from 'react';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Carousel: React.FC = (): JSX.Element => {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 3000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: 'linear',
    pauseOnHover: true,
    pauseOnFocus: true
  }

  const media = [
    { src: 'https://a-us.storyblok.com/f/1017006/1121x694/0e805b7b17/office.jpg', type: 'image'},
    { src: 'https://player.vimeo.com/progressive_redirect/playback/901002501/rendition/1080p/file.mp4?loc=external&log_user=0&signature=ba88205b79ded12806ea6b753a880ac05c401d21a0400b43428b1f80fd0f06a2', type: 'video' },
    { src: 'https://a-us.storyblok.com/f/1017006/1041x694/7e4f322b19/chats.jpg', type: 'image' },
    { src: 'https://a-us.storyblok.com/f/1017006/958x990/b81de9285b/letsinterface.jpg', type: 'image' },
    { src: 'https://a-us.storyblok.com/f/1017006/1800x900/f9f47af7d2/6_icecream.jpg', type: 'image' },
    { src: 'https://player.vimeo.com/progressive_redirect/playback/901002491/rendition/1080p/file.mp4?loc=external&log_user=0&signature=9b091e62d7300795690127c92eaf2f3d0cc08651da621b5bd6928df579df593b', type: 'video' },
    { src: 'https://a-us.storyblok.com/f/1017006/1251x694/c65618e8d1/tennis_2.jpg', type: 'image' },
    { src: 'https://a-us.storyblok.com/f/1017006/742x990/f9c484e104/ross-jess.jpg', type: 'image' },
    { src: 'https://player.vimeo.com/progressive_redirect/playback/901002477/rendition/720p/file.mp4?loc=external&log_user=0&signature=a7ee1000b5f48b65d0397e12fca18be3c1c58ba1ef9466c58c180f4548a1e6d8', type: 'video' },
    { src: 'https://a-us.storyblok.com/f/1017006/500x500/eb95e694ec/2_workshop.jpg', type: 'image' },
    { src: 'https://a-us.storyblok.com/f/1017006/1041x694/3c7a908d0d/lunching.jpg', type: 'image' },
    { src: 'https://a-us.storyblok.com/f/1017006/500x500/9d5515c81a/9_bowling.jpg', type: 'image' },
  ];

  return (
    <div className="w-full">
      <Slider {...settings}>
        {media.map((item, index) => (
          <div key={index} className="flex justify-center items-center p-2">
            {item.type === 'image' ? (
              <img
                src={item.src}
                alt={`Slide ${index + 1}`}
                className="w-full max-w-[800px] h-auto object-cover rounded-[10px] lg:rounded-[30px] border-transparent"
              />
            ) : (
              <video
                src={item.src}
                autoPlay
                loop
                muted
                playsInline
                className="w-full max-w-[800px] h-auto object-cover rounded-[10px] lg:rounded-[30px] border-transparent"
              />
            )}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
