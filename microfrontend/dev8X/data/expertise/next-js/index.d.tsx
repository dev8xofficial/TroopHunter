import AsteriskIcon from '@repo/components/src/Icons/Asterisk';
import LightningIcon from '@repo/components/src/Icons/Lightning';
import NextjsIcon from '@repo/components/src/Icons/Nextjs';
import PuzzlePieceIcon from '@repo/components/src/Icons/PuzzlePiece';
import ShieldIcon from '@repo/components/src/Icons/Shield';

const PageData = {
  IconCardsItems: [
    {
      title: 'Production-ready by design',
      description: 'Build fast, scalable, and secure applications with Next.js—designed from the ground up to perform across every device and connection.',
      icon: <ShieldIcon width="26" />
    },
    {
      title: 'Framework Flexibility',
      description: 'Whether it’s static site generation, server-side rendering or API integration, we’ll harness Next.js features to suit your product’s unique technical requirements.',
      icon: <NextjsIcon width="24" />
    },
    {
      title: 'Blazing Performance',
      description: 'Optimised for speed and SEO, our Next.js solutions take advantage of modern front-end architecture to deliver exceptional load times and smooth interactions.',
      icon: <LightningIcon width="28" />
    },
    {
      title: 'Scalable Foundations',
      description: 'From MVPs to enterprise platforms, we use Next.js as a robust foundation to grow with your needs, making future enhancements faster and easier.',
      icon: <PuzzlePieceIcon width="28" />
    }
  ],
  ContentAsideImageItems: [
    {
      title: 'Dynamic & Scalable Web Applications',
      paragraph: 'Leverage the power of Next.js to build fast, scalable, and dynamic web applications. From static sites to complex applications, Next.js enables seamless routing, fast rendering, and enhanced SEO capabilities, allowing you to create an optimized digital experience.',
      image: 'https://a-us.storyblok.com/f/1017006/1864x1314/d3a8753394/golden-pipeline.jpg'
    },
    {
      title: 'Optimized Performance',
      paragraph: 'Next.js provides automatic server-side rendering (SSR) and static site generation (SSG), ensuring your applications load fast and perform well across all devices. We take full advantage of these features to deliver an unparalleled user experience with minimal latency.',
      image: 'https://a-us.storyblok.com/f/1017006/1864x1314/aec4c6cecc/data.png'
    },
    {
      title: 'Powerful API Routes & Flexibility',
      paragraph: 'Streamline your backend by integrating API routes directly into your Next.js application. Whether you need to fetch data or integrate with third-party services, Next.js makes it easy to handle server-side logic seamlessly, with no extra overhead.',
      image: 'https://a-us.storyblok.com/f/1017006/1864x1314/c1a8cc32bd/fluidity.jpg'
    },
    {
      title: 'Seamless User Experiences',
      paragraph: "With Next.js, we can create user-centric experiences that blend dynamic content with static elements, allowing for seamless transitions, real-time updates, and an overall smooth performance. Whether you're building an e-commerce site, blog, or complex SaaS application, Next.js scales effortlessly.",
      image: 'https://a-us.storyblok.com/f/1017006/1864x1314/c1a8cc32bd/fluidity.jpg'
    },
    {
      title: 'Collaborative Development',
      paragraph: 'Building with Next.js requires collaboration at every stage. Our team works closely with you to ensure that every aspect of your project, from component libraries to deployment, is well-aligned with your product roadmap and business goals. With an experienced in-house team of strategists, developers, and designers, we deliver high-quality Next.js solutions that are both efficient and scalable.',
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
