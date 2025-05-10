import AsteriskIcon from '@repo/components/src/Icons/Asterisk';
import ShieldIcon from '@repo/components/src/Icons/Shield';
import ShoppingBagIcon from '@repo/components/src/Icons/ShoppingBag';
import ShoppingCartIcon from '@repo/components/src/Icons/ShoppingCart';
import UserIcon from '@repo/components/src/Icons/User';

import React from 'react';

const PageData = {
  IconCardsItems: [
    {
      title: 'Seamless Online Retail',
      description: 'Simplified administration and automation, high-performing customer experiences and ongoing optimisation for pureplay and omni-channel retailers.',
      icon: <ShoppingBagIcon width="28" />
    },
    {
      title: 'Butter-smooth Checkouts',
      description: 'We apply our award-winning UX and design approach with analytical data and best-practice UX principles to convert spend and minimise abandonment.',
      icon: <ShoppingCartIcon width="25" />
    },
    {
      title: 'Securely Integrated',
      description: 'We can connect and configure your business systems and payment solutions to ensure data integrity throughout your entire infrastructure.',
      icon: <ShieldIcon width="24" />
    },
    {
      title: 'eCommerce Partners',
      description: 'We’re in this for the long haul. We’ll work in close collaboration with you to ensure extraordinary outcomes and your ongoing success over time.',
      icon: <UserIcon width="27" />
    }
  ],
  ContentAsideImageItems: [
    {
      title: 'Elevate your brand experience',
      paragraph: 'Every customer engagement forms the bigger picture of an overall brand experience. Our approach to ethical UX and conversion design draws from this philosophy, ensuring better customer experiences that last long after the final sale.',
      image: 'https://a-us.storyblok.com/f/1017006/1864x1314/d3a8753394/golden-pipeline.jpg'
    },
    {
      title: 'Comprehensive eCommerce functionality',
      paragraph: 'We offer a holistic suite of features designed to streamline every aspect of your online store. From product management and secure payment gateways to personalised recommendations and seamless checkout processes, we equip your eCommerce platform with all the tools to operate efficiently, adapt to market changes, and deliver an exceptional shopping experience.',
      image: 'https://a-us.storyblok.com/f/1017006/1864x1314/aec4c6cecc/data.png'
    },
    {
      title: 'Bring your products to life online',
      paragraph: 'We work hard translating your tangible and tactile product experiences to the digital medium, reaching a new customer base through visually engaging interfaces that hero your products and convert attention into sales. From 360-degree product views to augmented reality, we encourage customers to explore and interact with products in a rich, immersive way.',
      image: 'https://a-us.storyblok.com/f/1017006/1864x1314/c1a8cc32bd/fluidity.jpg'
    }
  ],
  footerMainContent: {
    link: '/contact',
    start: 'Let’s make',
    end: 'something wonderful'
  },
  footerForm: {
    privacy: {
      year: '2025',
      text: 'Privacy'
    },
    button: {
      text: 'Submit a brief'
    }
  },
  footerSocialLinks: [
    {
      title: (
        <>
          <s>Twitter</s> X
        </>
      ),
      icon: <AsteriskIcon width="13" />,
      href: 'https://x.com/dev8x'
    },
    {
      title: 'Instagram',
      icon: <AsteriskIcon width="13" />,
      href: 'https://instagram.com/dev8x'
    },
    {
      title: 'LinkedIn',
      href: 'https://www.linkedin.com/company/dev8x/posts/'
    }
  ],
  testimonials: [
    {
      name: 'Henry Luong',
      company: 'Unios',
      bgColor: '#ffffff',
      color: '#111111',
      transformOrigin: 'center top',
      image: 'https://a-us.storyblok.com/f/1017006/1744x1612/1d5f3959f9/unios.jpeg',
      comment: 'Without a doubt, a number of projects have been won on the back of our new website and project specification toolbox built by the team at Humaan.'
    },
    {
      name: 'Paula McCarville',
      company: 'Curtin University',
      bgColor: '#4C21E2',
      color: '#F0EBFF',
      transformOrigin: 'center top',
      image: 'https://a-us.storyblok.com/f/1017006/1744x1612/4c0927054c/curtin-open-day.jpg',
      comment: 'From the very beginning, it was evident that the team truly grasped our brief and vision, effectively translating it into a remarkable reality.'
    },
    {
      name: 'Steph Jojart',
      company: 'Schrole',
      bgColor: '#1665A3',
      color: '#E8F5FF',
      transformOrigin: 'top center',
      image: 'https://a-us.storyblok.com/f/1017006/3488x3224/f6a5e2a115/schrole-1744px-x-1612px.jpg',
      comment: 'From conception through to launch, the Humaan team has been nothing short of amazing. I wouldn’t hesitate to recommend Humaan to any business.'
    }
  ]
};

export default PageData;
