import AsteriskIcon from '@repo/components/src/Icons/Asterisk';
import DataIcon from '@repo/components/src/Icons/Data';
import DevicesIcon from '@repo/components/src/Icons/Devices';
import EyeIcon from '@repo/components/src/Icons/Eye';
import PieChartIcon from '@repo/components/src/Icons/PieChart';
import SparklerIcon from '@repo/components/src/Icons/Sparkler';
import React from 'react';

const PageData = {
  IconCardsItems: [
    {
      title: 'Compelling experiences',
      description: 'We create compelling, interactive visualisations and creative experiences to engage your audience and connect them with your data.',
      icon: <EyeIcon width="28" />
    },
    {
      title: 'Visualise complexity',
      description: 'Leverage best-practice UX and human-centred design thinking to create simple and intuitive experiences for complex data and scenarios.',
      icon: <SparklerIcon width="24" />
    },
    {
      title: 'Dashboards and internal platforms',
      description: 'Build better data platforms, from single-page applications through to highly bespoke online systems, bringing data management and visualisation together.',
      icon: <DevicesIcon width="28" />
    },
    {
      title: 'Powerful tools',
      description: 'Provide powerful digital tools, tailored to the complexities and idiosyncrasies of your organisation’s data, processes and systems.',
      icon: <PieChartIcon width="28" />
    }
  ],
  ContentAsideImageItems: [
    {
      title: 'Tell a story with data',
      paragraph: 'Transform complex datasets into immersive narratives that inform and inspire action. Our approach combines rich visuals with insightful analysis, creating a seamless and engaging experience. Whether you aim to drive change, highlight trends, or demonstrate impact, curate your data in the best possible way for powerful digital experiences with lasting impact.',
     icon: <DataIcon width="64" />
    },
    {
      title: 'Engaging reports and dashboards',
      paragraph: 'Surface insights from raw data with visually compelling, interactive experiences and consolidated touchpoints. We design and create data-driven interfaces to suit any objective, from immersive reports for public consumption to bespoke internal tools and dashboards that support and inform stakeholders.',
      icon: <DataIcon width="64" />
    },
    {
      title: 'Your data, our expertise',
      paragraph: 'Leverage our expertise and transform your data into unique and compelling experiences that educate, inspire and delight. By blending your data with our experience in information graphics, data visualisation and modern interface design, we help unlock the full potential and create digital experiences with lasting impact.',
      icon: <DataIcon width="64" />
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
