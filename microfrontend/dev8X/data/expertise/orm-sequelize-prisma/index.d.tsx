import AsteriskIcon from '@repo/components/src/Icons/Asterisk';
import DataIcon from '@repo/components/src/Icons/Data';
import EditIcon from '@repo/components/src/Icons/Edit';
import GraphAnalysisIcon from '@repo/components/src/Icons/GraphAnalysis';
import PuzzlePieceIcon from '@repo/components/src/Icons/PuzzlePiece';

const PageData = {
  IconCardsItems: [
    {
      title: 'Robust Data Architecture',
      description: 'We design and implement structured, scalable ORM solutions using tools like Sequelize and Prisma—ensuring your data flows smoothly and stays in sync across systems.',
      icon: <DataIcon width="26" />
    },
    {
      title: 'Tailored to Your Stack',
      description: 'Whether you’re building with SQL or NoSQL, microservices or monoliths, we align ORM configurations with your tech stack and business needs for maximum flexibility and performance.',
      icon: <PuzzlePieceIcon width="24" />
    },
    {
      title: 'Consistent & Maintainable Code',
      description: 'Create cleaner, more maintainable backend logic with type-safe models, migration tracking, and reusable query logic—improving developer experience and reducing bugs.',
      icon: <EditIcon width="28" />
    },
    {
      title: 'Built for Growth',
      description: 'From MVPs to large-scale applications, our ORM setups are built to evolve. We help teams future-proof their data layer to keep up with growing complexity and changing requirements.',
      icon: <GraphAnalysisIcon width="28" />
    }
  ],
  ContentAsideImageItems: [
    {
      title: 'Efficient Data Management',
      paragraph: "Unlock the power of streamlined data management with advanced ORM frameworks like Sequelize and Prisma. Our expertise helps you design and implement seamless database interactions that are both intuitive and high-performance, whether you're building a single application or scaling to enterprise-level systems.",
      image: 'https://a-us.storyblok.com/f/1017006/1864x1314/d3a8753394/golden-pipeline.jpg'
    },
    {
      title: 'Powerful Querying & Relationships',
      paragraph: 'Leverage the full potential of relational databases by building complex queries and managing relationships effortlessly. With tools like Sequelize and Prisma, we enable you to express even the most intricate data relationships in clean, readable, and efficient code, simplifying your workflows and speeding up development.',
      image: 'https://a-us.storyblok.com/f/1017006/1864x1314/aec4c6cecc/data.png'
    },
    {
      title: 'Optimized for Performance',
      paragraph: "We focus on creating highly efficient and optimized database queries to ensure your applications perform at their best. Whether you're managing simple CRUD operations or complex aggregations, we help you optimize for speed, reduce latency, and maintain robust data integrity.",
      image: 'https://a-us.storyblok.com/f/1017006/1864x1314/c1a8cc32bd/fluidity.jpg'
    },
    {
      title: 'Your ORM Experts',
      paragraph: 'With our deep experience in Sequelize and Prisma, we help you unlock the full potential of ORM systems. Our team crafts tailored solutions to ensure your data models are scalable, maintainable, and easy to work with, empowering your developers to focus on delivering value instead of wrestling with database queries.',
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
