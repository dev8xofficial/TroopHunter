import AsteriskIcon from '@repo/components/src/Icons/Asterisk';
import GroupUsersIcon from '@repo/components/src/Icons/GroupUsers';
import MagicWandIcon from '@repo/components/src/Icons/MagicWand';
import MonitorIcon from '@repo/components/src/Icons/Monitor';
import SeismometerIcon from '@repo/components/src/Icons/Seismometer';
import ShuffleIcon from '@repo/components/src/Icons/Shuffle';

const PageData = {
  IconCardsItems: [
    {
      title: 'Live by design',
      description: 'We design and develop responsive real-time experiences—from collaborative tools to live dashboards—that feel immediate, fluid, and alive.',
      icon: <MagicWandIcon width="26" />
    },
    {
      title: 'Performance-first',
      description: 'Our engineering focus ensures real-time features are lightweight, reliable, and performant across devices, networks, and locations.',
      icon: <MonitorIcon width="24" />
    },
    {
      title: 'Built to scale',
      description: "Whether it's live chat, instant notifications, or multiplayer features, we build systems that scale seamlessly with your audience and demands.",
      icon: <GroupUsersIcon width="28" />
    },
    {
      title: 'Always in sync',
      description: 'From sockets to state management, we make sure your app stays consistent and synchronised—delivering the right information at the right time.',
      icon: <ShuffleIcon width="28" />
    }
  ],
  ContentAsideImageItems: [
    {
      title: 'Seamless, Instant Connectivity',
      paragraph: 'Create applications that provide real-time updates and instantaneous interaction. Whether you’re building live chat platforms, collaborative tools, or online gaming experiences, our approach ensures a smooth, responsive, and engaging experience for your users—every time they interact.',
      icon: <SeismometerIcon width="64" />
    },
    {
      title: 'Transformative User Experiences',
      paragraph: 'We specialize in designing and developing real-time applications that push the boundaries of user interaction. From real-time notifications to live data feeds, we create dynamic systems that engage users in meaningful, real-time experiences while maintaining optimal performance and reliability.',
      icon: <SeismometerIcon width="64" />
    },
    {
      title: 'Scalable Solutions for Every Need',
      paragraph: 'We build scalable architectures to support real-time data processing, ensuring that your app can grow as your user base expands. Whether handling hundreds or millions of simultaneous users, we leverage cutting-edge technologies to guarantee performance under pressure, offering seamless scalability for your real-time application needs.',
      icon: <SeismometerIcon width="64" />
    },
    {
      title: 'Powerful Real-Time Systems',
      paragraph: 'Our expertise goes beyond simple integrations—we develop sophisticated back-end systems that allow for secure, real-time communication between users and devices. From instant messaging apps to real-time dashboards, we ensure your application remains fast, reliable, and always connected.',
      icon: <SeismometerIcon width="64" />
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
