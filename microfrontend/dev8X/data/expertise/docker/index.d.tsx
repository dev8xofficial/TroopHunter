import AsteriskIcon from '@repo/components/src/Icons/Asterisk';
import DockerIcon from '@repo/components/src/Icons/Docker';
import FourDotIcon from '@repo/components/src/Icons/FourDot';
import InfinityIcon from '@repo/components/src/Icons/Infinity';
import SaaSIcon from '@repo/components/src/Icons/SaaS';

const PageData = {
  IconCardsItems: [
    {
      title: 'Simplified Containerization',
      description: 'Streamline your development and deployment workflows by leveraging Docker’s containerization technology. We’ll help you create isolated environments that are consistent and reproducible across different stages of development.',
      icon: <DockerIcon width="26" />
    },
    {
      title: 'Efficient Scaling',
      description: "Whether you're scaling up or scaling down, Docker enables seamless management of containers to ensure your application runs smoothly in any environment—local, staging, or production.",
      icon: <FourDotIcon width="24" />
    },
    {
      title: 'CI/CD Integration',
      description: 'Docker integrates effortlessly with CI/CD pipelines, automating your deployments for faster, more reliable releases. From local development to production, Docker ensures consistency and reduces deployment risk.',
      icon: <InfinityIcon width="28" />
    },
    {
      title: 'Cloud-Ready',
      description: 'Docker containers are the foundation for building scalable cloud applications. We’ll assist in setting up your containers to run efficiently on cloud platforms like AWS, GCP, or Azure, ensuring you make the most of your cloud infrastructure.',
      icon: <SaaSIcon width="28" />
    }
  ],
  ContentAsideImageItems: [
    {
      title: 'Effortless Containerization',
      paragraph: 'Simplify your application deployment by containerizing your environments with Docker. We streamline your development and deployment processes, ensuring a consistent experience across all platforms, from development to production.',
      image: 'https://a-us.storyblok.com/f/1017006/1864x1314/d3a8753394/golden-pipeline.jpg'
    },
    {
      title: 'Scalable, Reusable Solutions',
      paragraph: 'With Docker, you can scale your applications effortlessly and reuse components across projects. We help you create modular and highly portable solutions that work anywhere, ensuring you maximize efficiency and minimize redundant efforts.',
      image: 'https://a-us.storyblok.com/f/1017006/1864x1314/aec4c6cecc/data.png'
    },
    {
      title: 'Optimize Development Workflows',
      paragraph: 'Improve collaboration and streamline workflows with Docker’s containerized environments. By isolating dependencies and minimizing configuration discrepancies, we empower your teams to work faster and more reliably across different stages of the product lifecycle.',
      image: 'https://a-us.storyblok.com/f/1017006/1864x1314/c1a8cc32bd/fluidity.jpg'
    },
    {
      title: 'Your Docker Expert Partner',
      paragraph: "Transform your development and deployment processes with our expertise in Docker. Whether you’re just getting started or optimizing your existing containers, we’ll guide you through building scalable, efficient, and reliable containerized solutions. Let us help you take full advantage of Docker's capabilities to enhance your operations and product delivery.",
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
