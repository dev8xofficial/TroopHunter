import AsteriskIcon from '@repo/components/src/Icons/Asterisk';
import InfinityIcon from '@repo/components/src/Icons/Infinity';
import MagicWandIcon from '@repo/components/src/Icons/MagicWand';
import PaintSwatchIcon from '@repo/components/src/Icons/PaintSwatch';
import PuzzlePieceIcon from '@repo/components/src/Icons/PuzzlePiece';
import TargetIcon from '@repo/components/src/Icons/Target';
import React from 'react';

const PageData = {
  IconCardsItems: [
    {
      title: 'Seamless Automation',
      description: 'Automate every step of your development pipeline with robust CI/CD processes, reducing manual intervention and accelerating time to delivery.',
      icon: <MagicWandIcon width="26" />
    },
    {
      title: 'Continuous Integration',
      description: 'Integrate code changes frequently and automatically, ensuring every feature works together smoothly with early detection of issues for more reliable releases.',
      icon: <PuzzlePieceIcon width="24" />
    },
    {
      title: 'Continuous Deployment',
      description: 'Streamline your delivery process by deploying code to production as soon as it passes automated tests, ensuring your application is always up-to-date.',
      icon: <TargetIcon width="28" />
    },
    {
      title: 'Tailored Solutions',
      description: 'Every organization is unique, and so is every CI/CD pipeline. We work closely with you to develop solutions that meet your specific needs, from version control to deployment strategies.',
      icon: <PaintSwatchIcon width="28" />
    }
  ],
  ContentAsideImageItems: [
    {
      title: 'Seamless Integration & Deployment',
      paragraph: 'Transform your development pipeline into a fluid and efficient process. With our CI/CD expertise, we streamline the integration of code, automate testing, and deploy with confidence. We help you establish a continuous flow from development to production, ensuring faster time to market with higher quality.',
      icon: <InfinityIcon width="64" />
    },
    {
      title: 'Automated Pipelines for Continuous Success',
      paragraph: 'Take the guesswork out of deployment. By automating your workflows, we ensure that each code change is tested, validated, and deployed seamlessly. Whether you’re handling a monolithic application or microservices, our CI/CD pipelines are built to suit your needs and scale with your growth.',
      icon: <InfinityIcon width="64" />
    },
    {
      title: 'Collaborative Development for Faster Delivery',
      paragraph: 'Integrating your development, testing, and operations teams into a unified workflow is key to delivering quality products. We design and implement CI/CD pipelines that foster collaboration, enabling teams to iterate quickly while maintaining high standards across every stage of development.',
      icon: <InfinityIcon width="64" />
    },
    {
      title: 'Ensure Quality at Every Stage',
      paragraph: 'Quality assurance is integral to our CI/CD approach. With automated testing and continuous integration, we ensure that each change is thoroughly tested before it reaches production. Our process catches errors early, giving you confidence that your code is always in top shape.',
      icon: <InfinityIcon width="64" />
    },
    {
      title: 'Your CI/CD Partner',
      paragraph: 'Behind every efficient CI/CD pipeline is a collaborative partnership. From setup to maintenance, our in-house team of DevOps engineers, developers, and project managers will work with you to create a pipeline tailored to your needs. Together, we ensure faster releases, higher quality, and a streamlined development process.',
      icon: <InfinityIcon width="64" />
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
