import AsteriskIcon from '@repo/components/src/Icons/Asterisk';
import HandshakeIcon from '@repo/components/src/Icons/Handshake';
import LightningIcon from '@repo/components/src/Icons/Lightning';
import PostgresqlIcon from '@repo/components/src/Icons/Postgresql';
import PuzzlePieceIcon from '@repo/components/src/Icons/PuzzlePiece';
import SeismometerIcon from '@repo/components/src/Icons/Seismometer';
import ShieldIcon from '@repo/components/src/Icons/Shield';
import SupabaseIcon from '@repo/components/src/Icons/Supabase';

const PageData = {
  IconCardsItems: [
    {
      title: 'Built for speed',
      description: 'Launch scalable applications faster with Supabase’s real-time backend infrastructure—designed for modern teams who need to ship quickly without sacrificing quality.',
      icon: <LightningIcon width="26" />
    },
    {
      title: 'Postgres-powered',
      description: 'Supabase offers the reliability and flexibility of PostgreSQL out of the box. We harness its full potential to deliver secure, high-performance databases tailored to your product.',
      icon: <PostgresqlIcon width="24" />
    },
    {
      title: 'Auth & Access Control',
      description: 'Seamless user authentication, robust permissions, and scalable access control—all configured with best practices in mind to support your growth.',
      icon: <ShieldIcon width="28" />
    },
    {
      title: 'Custom APIs, fast',
      description: 'Instantly generate RESTful and GraphQL APIs from your database. We design these interfaces for both power and usability—so your team can build smarter, not harder.',
      icon: <PuzzlePieceIcon width="28" />
    },
    {
      title: 'Realtime & Subscriptions',
      description: 'Build interactive, dynamic digital experiences with real-time updates and live data syncing, ideal for modern apps, dashboards, and collaborative tools.',
      icon: <SeismometerIcon width="28" />
    },
    {
      title: 'A trusted partner',
      description: 'From architecture to deployment, we’ll guide your team through every phase of your Supabase implementation, ensuring your backend is solid, scalable, and ready for the future.',
      icon: <HandshakeIcon width="28" />
    }
  ],
  ContentAsideImageItems: [
    {
      title: 'Real-time data at your fingertips',
      paragraph: 'Harness the power of real-time data updates with Supabase’s scalable, open-source database solution. Our approach ensures that your application can effortlessly handle live data feeds, user interactions, and notifications, creating responsive, engaging experiences for your users. Whether building collaborative apps, live dashboards, or dynamic content, Supabase enables you to turn data into immediate action.',
      icon: <SupabaseIcon width="26" />
    },
    {
      title: 'Seamless integrations for modern applications',
      paragraph: 'Integrate effortlessly with your existing infrastructure. Supabase supports a wide range of out-of-the-box integrations, including APIs, webhooks, authentication, and storage, making it an ideal choice for developers looking to build and scale their applications quickly and efficiently.',
      icon: <SupabaseIcon width="26" />
    },
    {
      title: 'Your data, our expertise',
      paragraph: 'Supabase gives you all the tools needed to manage your databases at scale with ease. From authentication and authorization to real-time capabilities, Supabase simplifies complex tasks and empowers your team to focus on building great applications. We bring our expertise in backend development and cloud-native technologies to help you unlock the full potential of Supabase, creating highly performant and secure experiences.',
      icon: <SupabaseIcon width="26" />
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
