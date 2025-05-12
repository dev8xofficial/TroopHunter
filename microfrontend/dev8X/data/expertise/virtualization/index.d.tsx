import AsteriskIcon from '@repo/components/src/Icons/Asterisk';
import PuzzlePieceIcon from '@repo/components/src/Icons/PuzzlePiece';
import SaaSIcon from '@repo/components/src/Icons/SaaS';
import VirtualMachinesIcon from '@repo/components/src/Icons/VirtualMachines';
import VoltageIcon from '@repo/components/src/Icons/Voltage';

const PageData = {
  IconCardsItems: [
    {
      title: 'Optimised Infrastructure',
      description: 'We design and implement virtualized environments that streamline your IT infrastructure, making it more efficient, scalable, and cost-effective.',
      icon: <VirtualMachinesIcon width="26" />
    },
    {
      title: 'Seamless Integration',
      description: 'From on-premises solutions to cloud-based deployments, we ensure smooth integration with your existing systems, enabling flexibility and scalability.',
      icon: <PuzzlePieceIcon width="24" />
    },
    {
      title: 'Cloud Solutions',
      description: 'Empower your organization with cloud-based virtualization, allowing you to scale resources on demand, optimise workloads, and reduce operational costs.',
      icon: <SaaSIcon width="28" />
    },
    {
      title: 'Performance and Reliability',
      description: 'Our solutions ensure high performance and reliability, minimising downtime while maximizing efficiency across your virtualized infrastructure.',
      icon: <VoltageIcon width="28" />
    }
  ],
  ContentAsideImageItems: [
    {
      title: 'Transform your infrastructure',
      paragraph: 'Leverage virtualization technology to optimize and scale your IT environment. Our approach helps streamline resource management, maximize hardware utilization, and simplify the deployment of virtual machines, ensuring your infrastructure is agile, efficient, and future-ready.',
      icon: <VirtualMachinesIcon width="64" />
    },
    {
      title: 'Virtualize with flexibility',
      paragraph: "Whether you're looking to optimize server workloads, run multiple environments on a single host, or enhance your disaster recovery capabilities, we design custom solutions that bring flexibility and scalability to your business. Virtualization allows you to consolidate resources while maintaining the performance your applications demand.",
      icon: <VirtualMachinesIcon width="64" />
    },
    {
      title: 'Streamline your operations',
      paragraph: 'Integrate virtualization into your workflow to simplify system administration and improve the efficiency of your IT operations. With streamlined management tools and automated processes, we help you reduce complexity, enhance security, and scale your infrastructure with ease.',
      icon: <VirtualMachinesIcon width="64" />
    },
    {
      title: 'Your virtualization partner',
      paragraph: 'At the heart of every successful virtualization project is a strong, collaborative partnership. Our in-house team of engineers and IT specialists work closely with you to design and implement solutions that align with your unique requirements. Together, we’ll create a virtualized environment that supports your organization’s growth and technological ambitions.',
      icon: <VirtualMachinesIcon width="64" />
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
