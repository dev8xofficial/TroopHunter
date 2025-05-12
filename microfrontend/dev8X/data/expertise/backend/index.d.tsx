import AsteriskIcon from '@repo/components/src/Icons/Asterisk';
import BackendIcon from '@repo/components/src/Icons/Backend';
import GlobeIcon from '@repo/components/src/Icons/Globe';
import GraphAnalysisIcon from '@repo/components/src/Icons/GraphAnalysis';
import PlanetRingIcon from '@repo/components/src/Icons/PlanetRing';
import ShieldIcon from '@repo/components/src/Icons/Shield';

const PageData = {
  IconCardsItems: [
    {
      title: 'Robust architecture',
      description: 'We design and build secure, scalable backend systems that power digital experiences with reliability and precision, no matter the complexity.',
      icon: <PlanetRingIcon width="26" />
    },
    {
      title: 'API-first thinking',
      description: 'Whether it’s RESTful or GraphQL, our backend services are designed with integration in mind—supporting seamless connectivity across devices and platforms.',
      icon: <GlobeIcon width="24" />
    },
    {
      title: 'Performance & security',
      description: 'From caching strategies to role-based access and encryption, we ensure your backend performs under pressure while keeping your data protected.',
      icon: <ShieldIcon width="28" />
    },
    {
      title: 'Built to scale',
      description: 'As your product grows, so does your backend. We develop future-proof systems that evolve with your user base, business needs and technical demands.',
      icon: <GraphAnalysisIcon width="28" />
    }
  ],
  ContentAsideImageItems: [
    {
      title: 'Robust & Scalable Architectures',
      paragraph: 'We build backend systems that scale with your business, supporting high performance and reliability. From database management to server-side logic, we ensure your infrastructure is robust, flexible, and able to handle growth seamlessly.',
      icon: <BackendIcon width="26" />
    },
    {
      title: 'Streamline Data Flow',
      paragraph: 'Transform complex data processes into smooth, efficient workflows. Our backend solutions integrate various data sources, ensuring your systems communicate effectively, reducing friction and enabling timely insights for better decision-making.',
      icon: <BackendIcon width="26" />
    },
    {
      title: 'Seamless Integrations',
      paragraph: "We specialize in building custom backend solutions that integrate effortlessly with third-party services, APIs, and platforms. Whether it's payment gateways, CRM systems, or cloud services, we ensure your application connects smoothly and securely with the tools that power your business.",
      icon: <BackendIcon width="26" />
    },
    {
      title: 'Your Backend Development Partner',
      paragraph: 'Behind every powerful backend system is a collaborative agency–client partnership. Our team of strategists, developers, and project managers work together to understand your unique needs and deliver tailored backend solutions that drive long-term success. We’re committed to helping you build a system that supports your entire business ecosystem.',
      icon: <BackendIcon width="26" />
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
