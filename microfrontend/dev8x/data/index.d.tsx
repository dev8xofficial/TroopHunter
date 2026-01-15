import { HomeContent } from '@repo/components';
import { prefixed } from '@repo/components/utils/helpers';

const PageData: HomeContent = {
  meta: {
    title: 'Solutions Made Simple! — Dev8X',
    description: 'We design, launch, and scale digital products for ambitious brands. Dev8X combines strategy, design, and technology to create meaningful, frictionless experiences.'
  },
  title: 'Solutions <br /> Made Simple.',
  video: prefixed('/videos/header/header.mp4'),
  paragraph: 'We design, build and ship world-class digital products for forward-thinking brands.',
  whyDev8XContent: {
    heading: 'Why Dev8X',
    para1: 'We believe that meaningful design starts with empathy. Every product we create is centered around improving real lives—helping people achieve more with less friction.',
    para2: 'By combining strategy, creativity, and technology, we unlock opportunities, transform businesses, and make experiences that truly matter. As an independent team, our agility and passion shape every project into something exceptional.',
    image: 'https://a-us.storyblok.com/f/1017006/1200x1400/dc71890964/humaanpeople.jpg/m/450x548/filters:quality(80)',
    stats: [
      { title: '100%', span: ['In-house ', '& ', 'independent'] },
      { title: '6+', span: ['Years ', 'crafting ', 'digital ', 'experiences'] },
      { title: '20+', span: ['Digital ', 'solutions ', 'launched ', 'worldwide'] }
    ]
  },
  footerMainContent: {
    link: '/contact',
    start: 'Let’s make',
    end: 'something wonderful!'
  },
  footerData: {
    global: {
      heading: 'We work globally',
      email: 'contact@dev8x.com',
      buttonText: 'Submit a brief'
    },
    offices: [
      {
        country: 'Pakistan (HQ)',
        city: 'Lahore, Punjab',
        phone: '+92 (329) 294-7777'
      },
      {
        country: 'USA (Remote)',
        city: 'San Francisco, CA',
        phone: '+1 (321) 300-2393'
      }
    ],
    // careers: {
    //   heading: 'We're Growing – Join Our Team',
    //   description: 'Let's build the future, together.',
    //   link: '/careers',
    //   linkText: 'Explore Careers'
    // },
    copyright: {
      year: '2026',
      text: 'Privacy Policy',
      privacyLink: '/privacy'
    }
  },
  footerSocialLinks: [
    {
      title: 'LinkedIn',
      icon: { name: 'AsteriskIcon', size: 10 },
      href: 'https://www.linkedin.com/company/dev8x/'
    },
    {
      title: 'Instagram',
      icon: { name: 'AsteriskIcon', size: 10 },
      href: 'https://www.instagram.com/dev8xofficial/'
    },
    {
      title: 'Facebook',
      // icon: { name: 'AsteriskIcon', size: 10 },
      href: 'https://www.facebook.com/profile.php?id=61569289660818'
    }
    // {
    //   title: 'Youtube',
    //   href: 'https://www.youtube.com/@Dev8XOfficial-s3v'
    // }
  ]
};

export default PageData;
