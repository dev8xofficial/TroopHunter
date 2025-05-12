import AnalysisIcon from '@repo/components/src/Icons/Analysis';
import AsteriskIcon from '@repo/components/src/Icons/Asterisk';
import FourDotIcon from '@repo/components/src/Icons/FourDot';
import MyspaceIcon from '@repo/components/src/Icons/Myspace';
import SparklerIcon from '@repo/components/src/Icons/Sparkler';
import WandIcon from '@repo/components/src/Icons/Wand';
import React from 'react';

const PageData = {
  IconCardsItems: [
    {
      title: 'What, Why & How',
      description: 'Get clear insights into target audience goals and pain points, determining key challenges and needs to inform a better product.',
      icon: <AnalysisIcon width="26" />
    },
    {
      title: 'A/B Testing',
      description: 'Drawing from years of experience in building products for people, we can design tests that specifically explore what appeals most to your customers.',
      icon: <FourDotIcon width="24" />
    },
    {
      title: 'User Interviews',
      description: 'Our approach includes more personalised user interviews and focus groups to go deeper on broad patterns discovered in the initial user testing stages.',
      icon: <WandIcon width="28" />
    },
    {
      title: 'Comprehensive Report',
      description: 'Every research activity informs a comprehensive set of recommendations and specs, suitable for project stakeholders at every organisational level.',
      icon: <SparklerIcon width="28" />
    }
  ],
  ContentAsideImageItems: [
    {
      title: 'Diverse user research and testing',
      paragraph: 'Our team employs a diverse and bespoke selection of quantitative and qualitative research methods, tailored to the needs of your project. This may include user interviews, surveys, stakeholder workshops, focus groups, and data analysis in the early discovery stages, followed by usability testing, concept testing, card sorting, and more at key implementation milestones.',
      icon: <MyspaceIcon width="64" />
    },
    {
      title: 'Design an intuitive product experience',
      paragraph: 'Data informs every design decision we make, a vital strategy when creating eCommerce websites, functional webapps, and conversion-focused journeys like signups, enrolments and checkouts. Using validation methods such as tree testing, targeted A/B testing, and usability testing, we can determine the clearest and most intuitive user workflows for your audience.',
      icon: <MyspaceIcon width="64" />
    },
    {
      title: 'Meaningful data analysis and reporting',
      paragraph: 'We can prepare a report of our research findings, written to suit the requirements of your project, stakeholders and organisation. Most of our clients request design concepts, complemented by supporting insights and statistics, but our team can also provide a comprehensive review and analysis, with a full best-practice list of recommendations.',
      icon: <MyspaceIcon width="64" />
    },
    {
      title: 'Rewarding partnerships',
      paragraph: 'Behind every best-in-class product is a collaborative agency–client partnership. With an in-house team of strategists, designers, developers and project managers, we can offer diverse perspectives, seamless end results, and a truly collaborative process, no matter what industry you’re in.',
      icon: <MyspaceIcon width="64" />
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
