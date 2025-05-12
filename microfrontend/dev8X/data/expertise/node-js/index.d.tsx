import AsteriskIcon from '@repo/components/src/Icons/Asterisk';
import LightningIcon from '@repo/components/src/Icons/Lightning';
import NodejsIcon from '@repo/components/src/Icons/Nodejs';
import PointerIcon from '@repo/components/src/Icons/Pointer';
import PuzzlePieceIcon from '@repo/components/src/Icons/PuzzlePiece';
import SeismometerIcon from '@repo/components/src/Icons/Seismometer';

const PageData = {
  IconCardsItems: [
    {
      title: 'Performance-first development',
      description: 'We build fast, scalable, and lightweight backend systems using Node.js—perfect for modern web applications requiring speed, concurrency, and real-time capabilities.',
      icon: <LightningIcon width="26" />
    },
    {
      title: 'API-first architecture',
      description: "Design and develop robust, secure APIs to power your digital ecosystem. Whether you're integrating with third-party services or building a headless platform, we ensure your API layer is clean, stable, and future-ready.",
      icon: <PointerIcon width="24" />
    },
    {
      title: 'Real-time capabilities',
      description: 'From live data streaming to instant notifications, we harness the real-time strengths of Node.js to deliver dynamic user experiences where speed and responsiveness matter most.',
      icon: <SeismometerIcon width="28" />
    },
    {
      title: 'Scalable foundations',
      description: 'Our approach to Node.js development lays the groundwork for future growth—modular, testable, and maintainable codebases that adapt with your product and team needs.',
      icon: <PuzzlePieceIcon width="28" />
    }
  ],
  ContentAsideImageItems: [
    {
      title: 'Powerful, Scalable Backend Solutions',
      paragraph: 'Harness the power of Node.js to build fast, scalable, and reliable backend systems. From high-performance APIs to real-time applications, our expertise in Node.js allows us to deliver flexible solutions that scale with your business needs, ensuring seamless performance even as your user base grows.',
      icon: <NodejsIcon width="64" />
    },
    {
      title: 'Real-time, Event-driven Architecture',
      paragraph: "Leverage the full potential of Node.js’s event-driven architecture to handle real-time data with low-latency performance. Whether it's live data streaming, instant messaging, or real-time analytics, we create systems that deliver dynamic and interactive experiences for your users.",
      icon: <NodejsIcon width="64" />
    },
    {
      title: 'Custom APIs & Microservices',
      paragraph: 'Unlock the flexibility of microservices with Node.js. We craft efficient, maintainable APIs that integrate effortlessly with third-party systems and allow you to scale parts of your application independently, empowering your team to focus on what truly matters while improving your development speed.',
      icon: <NodejsIcon width="64" />
    },
    {
      title: 'Your Node.js Development Partner',
      paragraph: 'We don’t just build Node.js applications; we become your trusted partner in delivering custom backend solutions that drive your product forward. With our deep knowledge of Node.js and its ecosystem, we provide comprehensive solutions, from initial planning to deployment, with ongoing support and optimization.',
      icon: <NodejsIcon width="64" />
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
