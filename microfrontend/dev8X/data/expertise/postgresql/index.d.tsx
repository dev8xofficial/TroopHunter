import AsteriskIcon from '@repo/components/src/Icons/Asterisk';
import HandshakeIcon from '@repo/components/src/Icons/Handshake';
import PuzzlePieceIcon from '@repo/components/src/Icons/PuzzlePiece';
import ShieldIcon from '@repo/components/src/Icons/Shield';
import ShuffleIcon from '@repo/components/src/Icons/Shuffle';

const PageData = {
  IconCardsItems: [
    {
      title: 'Scalable & Secure',
      description: "Whether you're handling thousands or millions of records, we structure PostgreSQL databases for performance, integrity, and long-term scalability—backed by proven security standards.",
      icon: <ShieldIcon width="26" />
    },
    {
      title: 'Tailored Architecture',
      description: 'We design schema and relationships aligned to your product’s unique logic, enabling fast queries, clean data, and simplified application development.',
      icon: <PuzzlePieceIcon width="24" />
    },
    {
      title: 'Migration & Optimisation',
      description: 'From legacy system migrations to performance tuning, we modernise and refine your database infrastructure to keep things running smoothly under pressure.',
      icon: <ShuffleIcon width="28" />
    },
    {
      title: 'Reliable Partner',
      description: 'Our team works closely with yours—from initial setup to ongoing maintenance—to ensure PostgreSQL becomes a powerful and resilient backbone of your digital product.',
      icon: <HandshakeIcon width="28" />
    }
  ],
  ContentAsideImageItems: [
    {
      title: 'Optimized Database Solutions',
      paragraph: 'Transform your data into a powerful, scalable resource with PostgreSQL. We specialize in setting up and optimizing PostgreSQL databases that ensure high performance, reliability, and security for your applications, regardless of scale.',
      image: 'https://a-us.storyblok.com/f/1017006/1864x1314/d3a8753394/golden-pipeline.jpg'
    },
    {
      title: 'Scalable Data Management',
      paragraph: 'As your business grows, so do your data needs. We design PostgreSQL database architectures that scale with your operations, enabling your team to manage complex datasets with ease, while maintaining lightning-fast access times.',
      image: 'https://a-us.storyblok.com/f/1017006/1864x1314/aec4c6cecc/data.png'
    },
    {
      title: 'Custom Queries & Optimizations',
      paragraph: 'Our team excels at creating custom queries, building efficient data models, and optimizing database performance to meet your unique business requirements. From complex joins to stored procedures, we ensure your database works efficiently.',
      image: 'https://a-us.storyblok.com/f/1017006/1864x1314/c1a8cc32bd/fluidity.jpg'
    },
    {
      title: 'Seamless Integration',
      paragraph: 'Whether you’re integrating PostgreSQL with your existing tech stack or building a new application, we provide seamless database integration that enhances functionality and simplifies your operations. We ensure your PostgreSQL solution works effortlessly with your environment.',
      image: 'https://a-us.storyblok.com/f/1017006/1864x1314/c1a8cc32bd/fluidity.jpg'
    },
    {
      title: 'Your PostgreSQL Experts',
      paragraph: 'Leverage our expertise to unlock the full potential of PostgreSQL for your business. With years of experience in building robust, high-performance database solutions, we help you craft a digital infrastructure that empowers your business to thrive.',
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
