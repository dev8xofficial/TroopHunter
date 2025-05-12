import AsteriskIcon from '@repo/components/src/Icons/Asterisk';
import CardIcon from '@repo/components/src/Icons/Card';
import DevicesIcon from '@repo/components/src/Icons/Devices';
import GlobeIcon from '@repo/components/src/Icons/Globe';
import GPSIcon from '@repo/components/src/Icons/GPS';
import ShieldIcon from '@repo/components/src/Icons/Shield';

const PageData = {
  IconCardsItems: [
    {
      title: 'Tailor Made',
      description: 'We combine insights, data and our deep expertise to align with your vision, creating an entirely bespoke platform to suit your business and audience needs.',
      icon: <GPSIcon width="26" />
    },
    {
      title: 'World-class UX & Design',
      description: 'Our award-winning UX and design approach informs every concept, creative solution, key decision, and prototype to help drive your brand forward.',
      icon: <GlobeIcon width="26" />
    },
    {
      title: 'Robust, Secure, Flexible',
      description: 'Our core stack of preferred technologies aims for maximum flexibility, security, and performance, ensuring the end results continues to meet your needs in the long term.',
      icon: <ShieldIcon width="24" />
    },
    {
      title: 'Digital Partners',
      description: 'We believe in extraordinary client relationships, service and support. We’re in it for the long haul to maintain your advantage and ensure ongoing success.',
      icon: <DevicesIcon width="28" />
    }
  ],
  ContentAsideImageItems: [
    {
      title: 'Ready for scale',
      paragraph: 'As your business evolves, so will your technological requirements. We implement a practical blend of proven solutions and latest technologies to produce applications that effortlessly adapt and expand. Be relevant now, stay relevant in the future.',
      icon: <CardIcon width="64" />
    },
    {
      title: 'From startups to enterprise',
      paragraph: 'We work with clients of all size, from startups poised for rapid growth or established enterprises looking to enhance their digital infrastructure. Our custom-designed and purpose-built web applications support and drive business success at every stage.',
      icon: <CardIcon width="64" />
    },
    {
      title: 'Entirely bespoke',
      paragraph: 'Unique businesses demand unique solutions. From marketplaces to automation, we work with each partner to strategise, design and execute web applications that are built to spec and integrate with your existing business systems.',
      icon: <CardIcon width="64" />
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
