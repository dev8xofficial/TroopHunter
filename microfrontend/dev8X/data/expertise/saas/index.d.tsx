import { HeartIcon } from '@heroicons/react/24/outline';
import AsteriskIcon from '@repo/components/src/Icons/Asterisk';
import CardIcon from '@repo/components/src/Icons/Card';
import PlanetRingIcon from '@repo/components/src/Icons/PlanetRing';
import SaaSIcon from '@repo/components/src/Icons/SaaS';

const PageData = {
  IconCardsItems: [
    {
      title: 'SaaS with Substance',
      description: 'We build SaaS products that are as powerful as they are intuitive—balancing robust functionality with beautifully crafted user experiences.',
      icon: <SaaSIcon width="26" />
    },
    {
      title: 'Scalable Foundations',
      description: 'From MVP to enterprise-grade platforms, our architecture scales with your product. We lay the technical groundwork to support your growth trajectory.',
      icon: <PlanetRingIcon width="24" />
    },
    {
      title: 'Subscription & User Management',
      description: 'Design seamless onboarding, billing, and access systems tailored to the needs of your users—backed by secure, efficient infrastructure.',
      icon: <CardIcon width="28" />
    },
    {
      title: 'Product-Led Thinking',
      description: 'We craft experiences that drive engagement, adoption, and retention—helping you convert trial users into lifelong customers.',
      icon: <HeartIcon width="28" />
    }
  ],
  ContentAsideImageItems: [
    {
      title: 'Transform your business with SaaS',
      paragraph: 'Elevate your operations with tailored SaaS solutions that streamline workflows and boost efficiency. We design and build robust platforms that meet your specific business needs, delivering intuitive, scalable, and secure tools to enhance your digital transformation journey.',
      icon: <SaaSIcon width="64" />
    },
    {
      title: 'Intuitive user experiences at scale',
      paragraph: 'Every successful SaaS product needs a seamless user experience. Our focus is on simplifying complex workflows, ensuring that every interaction is intuitive and easy, even as your product scales. Whether it’s for internal teams or external customers, we ensure your users stay engaged and productive.',
      icon: <SaaSIcon width="64" />
    },
    {
      title: 'Tailored for your growth',
      paragraph: 'From start-ups to enterprises, we design SaaS platforms that evolve with your business. With an agile approach and a deep understanding of industry-specific needs, we help you develop a product that grows with your users, fostering long-term success and scalability.',
      icon: <SaaSIcon width="64" />
    },
    {
      title: 'End-to-end SaaS development',
      paragraph: 'We partner with you through every stage of your SaaS journey—strategy, design, development, and deployment. Whether building from scratch or refining an existing product, our team ensures every feature serves its purpose, supporting your goals and delivering exceptional user experiences.',
      icon: <SaaSIcon width="64" />
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
