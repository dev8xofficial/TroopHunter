import AsteriskIcon from '@repo/components/src/Icons/Asterisk';
import FrameIcon from '@repo/components/src/Icons/Frame';
import GPSIcon from '@repo/components/src/Icons/GPS';
import HandPalmIcon from '@repo/components/src/Icons/HandPalm';
import MagicWandIcon from '@repo/components/src/Icons/MagicWand';
import TargetIcon from '@repo/components/src/Icons/Target';

const PageData = {
  IconCardsItems: [
    {
      title: 'High Fidelity',
      description: 'We’ll convert your napkin sketches into complex, high-fidelity wireframes, whether you’re after detailed concepts or a working interactive prototype.',
      icon: <GPSIcon width="26" />
    },
    {
      title: 'Audience Validation',
      description: 'Quickly prepare a test product with just the bare essentials. Get answers directly from your target audience, so you can build a better MVP.',
      icon: <FrameIcon width="24" />
    },
    {
      title: 'Confidentiality Assured',
      description: 'Our privacy-conscious processes and secure systems help protect your IP, along with any confidential information you share with us about your project.',
      icon: <TargetIcon width="28" />
    },
    {
      title: 'Your Design Partner',
      description: 'We’ll collaborate with you to deliver high-quality digital prototypes to inform your product development. Our experienced team are with you all the way.',
      icon: <HandPalmIcon width="28" />
    }
  ],
  ContentAsideImageItems: [
    {
      title: 'Mockups, wireframes & interactive prototypes',
      paragraph: 'No matter the size of your business, we can help prepare high-fidelity concepts and digital prototypes to support your product development journey. Power up your stakeholder and investor pitches with clickable, interactive prototypes that demonstrate key concepts that define your initiative.',
      icon: <MagicWandIcon width="26" />
    },
    {
      title: 'Unite multidisciplinary product teams',
      paragraph: 'Digital prototyping channels your high-level concepts into single, high-impact points of reference, bringing together multi-faceted product teams and stakeholders, leaving less room for ambiguity and miscommunication. Provide definitive documentation that your people can refer to throughout the lifespan of the project.',
      icon: <MagicWandIcon width="26" />
    },
    {
      title: 'Get real audience feedback',
      paragraph: 'Use digital prototypes to test with real users, whether an existing audience or inviting new users from a target demographic. Validate key product assumptions and see how your users understand the platform to find the right solution before committing to a full project rollout.',
      icon: <MagicWandIcon width="26" />
    },
    {
      title: 'Your Product Design Partner',
      paragraph: 'Behind every best-in-class product is a collaborative agency–client partnership. We’ll collaborate with you to deliver just the essential prototypes for your early-stage project, or partner with you throughout the entire product development journey. With an in-house team of strategists, designers, developers and project managers, we can offer diverse perspectives, seamless prototyping and product builds, and a truly collaborative design and delivery process.',
      icon: <MagicWandIcon width="26" />
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
