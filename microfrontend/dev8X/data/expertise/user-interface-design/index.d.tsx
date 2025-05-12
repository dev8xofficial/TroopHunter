import AsteriskIcon from '@repo/components/src/Icons/Asterisk';
import HandPalmIcon from '@repo/components/src/Icons/HandPalm';
import MonitorIcon from '@repo/components/src/Icons/Monitor';
import PaintSwatchIcon from '@repo/components/src/Icons/PaintSwatch';
import SelectionIcon from '@repo/components/src/Icons/Selection';
import WandIcon from '@repo/components/src/Icons/Wand';

const PageData = {
  IconCardsItems: [
    {
      title: 'Proven UI Design',
      description: 'Our award-winning UI design approach informs every concept, interface solution, key decision, and prototype to help achieve what you need.',
      icon: <PaintSwatchIcon width="28" />
    },
    {
      title: 'Digital Dashboards',
      description: 'Leverage best-practice interface design and human-centred design thinking to create simple and intuitive experiences for complex data and scenarios',
      icon: <MonitorIcon width="22" />
    },
    {
      title: 'Design System',
      description: 'Our team can supply a comprehensive design system and style guide, empowering your in-house teams to deliver long-term UI consistency at scale.',
      icon: <WandIcon width="26" />
    },
    {
      title: 'Your Design Partner',
      description: 'We believe in extraordinary client relationships, service and support. We’ll collaborate with you to ensure world-class outcomes and ongoing success.',
      icon: <HandPalmIcon width="26" />
    }
  ],
  ContentAsideImageItems: [
    {
      title: 'Engaging Reports & Dashboards',
      paragraph: 'Surface insights from raw data with visually compelling, interactive experiences and consolidated touchpoints. We design and create data-driven user interfaces to suit any objective, from immersive reports for public consumption to bespoke internal tools and dashboards that support and inform your stakeholders.',
       icon: <SelectionIcon width="26" />
    },
    {
      title: 'An intuitive product experience',
      paragraph: 'Data informs every interface design decision we make, a vital strategy when crafting digital tools to serve complex information workflows. Using quantitative and qualitative research methods, we can determine the clearest and most intuitive UI designs for your purpose, and find the optimal path to achieving user goals.',
       icon: <SelectionIcon width="26" />
    },
    {
      title: 'Human interfaces',
      paragraph: 'Tune into how people work. From eCommerce checkouts to detailed customisation tools, our systematic UI design approach has produced dynamic, future-ready outcomes across traditional and emergent industries. With over 6 years’ experience making digital products for people, we know the details that make the difference.',
      icon: <SelectionIcon width="26" />
    },
    {
      title: 'Your UI Design Partner',
      paragraph: 'Behind every best-in-class product is a collaborative agency–client partnership. Everything we craft is entirely bespoke, as unique as the story you tell. With an in-house team of strategists, designers, developers and project managers, we can offer diverse perspectives, seamless user interface experiences, and a truly collaborative design and delivery process.',
      icon: <SelectionIcon width="26" />
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
