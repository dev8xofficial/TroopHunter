import AsteriskIcon from '@repo/components/src/Icons/Asterisk';
import PaintSwatchIcon from '@repo/components/src/Icons/PaintSwatch';
import PlanetRingIcon from '@repo/components/src/Icons/PlanetRing';
import ShieldIcon from '@repo/components/src/Icons/Shield';
import SparklerIcon from '@repo/components/src/Icons/Sparkler';
import UserIcon from '@repo/components/src/Icons/User';

const PageData = {
  IconCardsItems: [
    {
      title: 'Bases Covered',
      description: 'Our bespoke component libraries combine aesthetics, usability, accessibility and your unique brand style across all your sites and devices.',
      icon: <UserIcon width="26" />
    },
    {
      title: 'A Tailored Approach',
      description: "We recognise that every product and project is different. We'll work with you to determine the best approach to align to your product roadmap.",
      icon: <SparklerIcon width="24" />
    },
    {
      title: 'Comprehensive & Consistent',
      description: 'Our team will supply detailed and annotated documentation, covering appropriate use of your design tokens and patterns according to current best practice.',
      icon: <PaintSwatchIcon width="28" />
    },
    {
      title: 'Award Winning Design',
      description: 'Leverage our award-winning design approach to offer a world-class look & feel across your organisation’s entire online presence or digital product.',
      icon: <ShieldIcon width="28" />
    }
  ],
  ContentAsideImageItems: [
    {
      title: 'An on-brand design language',
      paragraph: 'Develop your own design language, built around your brand. With a bespoke component library of modular UI elements and interface design patterns, you can offer your audience a consistent visual and interactive experience no matter where they are in your digital ecosystem. Foster brand trust and encourage flow by removing unnecessary barriers to getting visitors where they need to go.',
      icon: <PlanetRingIcon width="28" />
    },
    {
      title: 'Simplify your design & development efforts',
      paragraph: 'Free up your teams to focus on solving more complex problems. With a wealth of design resources on hand, your design, development and content teams can create and replication components & patterns quickly and at scale, saving hours on re-thinking ideas, re-doing work, and repairing accidental inconsistencies.',
      icon: <PlanetRingIcon width="28" />
    },
    {
      title: 'Style that lasts',
      paragraph: 'As part of your design system, we can deliver a comprehensive style guide covering best-practice use of the resources in your component library and pattern library, including the rationale behind design decisions particular to your brand. The aim is to create a style that lasts, no matter whose hands are on the tools or where they are in the world.',
      icon: <PlanetRingIcon width="28" />
    },
    {
      title: 'Made for humans, with Humaan',
      paragraph: 'Behind every best-in-class product is a collaborative agency–client partnership. Everything we craft is entirely bespoke, as unique as the story you tell. With an in-house team of strategists, designers, developers and project managers, we can offer diverse perspectives, seamless end results, and a truly collaborative design and delivery process.',
      icon: <PlanetRingIcon width="28" />
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
