import AsteriskIcon from '@repo/components/src/Icons/Asterisk';
import GlobeIcon from '@repo/components/src/Icons/Globe';
import LightningIcon from '@repo/components/src/Icons/Lightning';
import PlanetRingIcon from '@repo/components/src/Icons/PlanetRing';
import PuzzlePieceIcon from '@repo/components/src/Icons/PuzzlePiece';
import ShieldIcon from '@repo/components/src/Icons/Shield';

const PageData = {
  IconCardsItems: [
    {
      title: 'Scalable Cloud Solutions',
      description: 'Whether you’re using AWS, Vercel, or DigitalOcean, we help you leverage the cloud’s power to scale your applications with ease, ensuring flexibility and performance as your business grows.',
      icon: <PlanetRingIcon width="26" />
    },
    {
      title: 'Seamless Deployments',
      description: 'Experience lightning-fast deployments with Vercel’s serverless platform, or streamline your infrastructure with AWS and DigitalOcean’s simple, developer-friendly tools, allowing you to go from code to production effortlessly.',
      icon: <LightningIcon width="24" />
    },
    {
      title: 'Global Reach & Performance',
      description: 'With AWS’s global network, Vercel’s edge optimization, and DigitalOcean’s distributed infrastructure, your applications deliver fast, reliable performance to users around the world, with minimal latency and maximum uptime.',
      icon: <GlobeIcon width="28" />
    },
    {
      title: 'Tailored Infrastructure',
      description: 'We design cloud architectures tailored to your specific needs. From highly scalable AWS environments to DigitalOcean’s simplified droplets and Vercel’s optimized serverless setups, we provide solutions that fit your product roadmap and business objectives.',
      icon: <PuzzlePieceIcon width="28" />
    },
    {
      title: 'Cost-Effective & Secure',
      description: 'We ensure that your cloud infrastructure is not only cost-efficient but also secure. AWS offers robust security features, Vercel provides automated scaling, and DigitalOcean’s streamlined approach minimizes operational overhead while maximizing value.',
      icon: <ShieldIcon width="28" />
    }
  ],
  ContentAsideImageItems: [
    {
      title: 'Scalable, Secure, and Cost-Efficient Infrastructure',
      paragraph: "Whether you're running a small application or managing complex enterprise systems, we help you leverage the best of cloud infrastructure. From AWS’s powerful cloud services and Vercel’s high-performance platform to DigitalOcean’s reliable and affordable hosting solutions, we provide the tools to build, scale, and secure your digital products.",
      image: 'https://a-us.storyblok.com/f/1017006/1864x1314/d3a8753394/golden-pipeline.jpg'
    },
    {
      title: 'Optimized for Performance & Speed',
      paragraph: 'Speed is essential in today’s digital landscape. Vercel’s global CDN ensures lightning-fast delivery of your content worldwide, while AWS offers flexible services that scale with your business. DigitalOcean provides cost-effective, high-performance hosting that ensures your website or application delivers fast load times for users around the globe.',
      image: 'https://a-us.storyblok.com/f/1017006/1864x1314/aec4c6cecc/data.png'
    },
    {
      title: 'Comprehensive Cloud Services',
      paragraph: 'AWS delivers a wide range of services, from computing power and storage to machine learning and databases, ensuring you have everything you need to build a flexible and scalable infrastructure. Vercel focuses on seamless deployment and integration, optimizing your developer experience with automated workflows. DigitalOcean offers simplicity and reliability, giving you straightforward cloud hosting that lets you focus on your product, not your infrastructure.',
      image: 'https://a-us.storyblok.com/f/1017006/1864x1314/c1a8cc32bd/fluidity.jpg'
    },
    {
      title: 'Security and Reliability Built-In',
      paragraph: 'Security is a priority, and each platform provides best-in-class security features. AWS’s robust security tools help safeguard your data, Vercel’s platform is optimized for secure deployments, and DigitalOcean ensures that your cloud environment remains protected with top-notch security measures. With our expertise in these platforms, we ensure your cloud infrastructure is secure, reliable, and compliant.',
      image: 'https://a-us.storyblok.com/f/1017006/1864x1314/c1a8cc32bd/fluidity.jpg'
    },
    {
      title: 'Streamlined Development & Deployment',
      paragraph: 'Develop, deploy, and scale faster with the help of AWS, Vercel, and DigitalOcean. Vercel’s integration with frameworks like Next.js and its seamless deployment features help streamline your development process. AWS provides the flexibility to manage any infrastructure requirement with ease, while DigitalOcean’s intuitive dashboard and cost-effective solutions make it simple to launch and manage applications.',
      image: 'https://a-us.storyblok.com/f/1017006/1864x1314/c1a8cc32bd/fluidity.jpg'
    },
    {
      title: 'Expert Guidance & Support',
      paragraph: 'With years of experience across AWS, Vercel, and DigitalOcean, our team is equipped to guide you through every stage of your cloud journey. Whether you need to scale your infrastructure, optimize performance, or implement secure solutions, we offer proactive support and ensure that your cloud environment is always running at its best.',
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
