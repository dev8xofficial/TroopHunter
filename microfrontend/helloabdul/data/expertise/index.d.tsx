import { ExpertiseContent } from '@repo/components';
import { prefixed } from '../../utils/helpers';

const EXPERTISES: ExpertiseContent[] = [
  {
    slug: 'websites',
    variant: 'cyan',
    tagText: 'Websites',
    heading: 'Exceptional websites for ambitious, modern brands',
    image: prefixed('/api/images/work/totalhealthdentalcare/mobile/1.png'),
    iconCards: {
      title: 'Remarkable digital experiences',
      paragraph: "We focus on what we do best: For more than 6 years, we've been imagining, crafting, and launching inspiring work on the web.",
      items: [
        {
          title: 'Idea to Execution',
          description: 'An entire product delivered in-house, from initial strategy to the end result. This means everything we do is fit for purpose, produced to the highest quality.',
          icon: { name: 'VoltageIcon', width: 18 }
        },
        {
          title: 'Full Stack',
          description: 'An entire product delivered in-house, from initial strategy to the end result. This means we everything we do is fit for purpose, produced to the highest quality.',
          icon: { name: 'BackendIcon', width: 28 }
        },
        {
          title: 'Technology Neutral',
          description: 'The best technology is the one that works. We continually listen and observe, so we can recommend the optimal solution for your business problem.',
          icon: { name: 'MonitorIcon', width: 22 }
        },
        {
          title: 'Integrated',
          description: 'We put your website at the heart of your digital ecosystem, providing secure API integrations and automated solutions across your business systems',
          icon: { name: 'PieChartIcon', width: 26 }
        }
      ]
    },
    contentAsideImageItems: [
      {
        title: 'Elevate your brand',
        paragraph: 'We blend innovative design, cutting-edge technology, and strategic content to deliver websites that are visually appealing and highly functional. Harness the power of deeply engaging digital experiences to take your brand to the next level.',
        icon: { name: 'PointerIcon', width: 64 },
        image: prefixed('/api/images/work/scheduler/mobile/2.png')
      },
      {
        title: 'Human experiences',
        paragraph: 'Offer an immersive user experience that captures the essence of your brand and resonates with your target audience. From intuitive navigation to immersive storytelling, every website is meticulously crafted to command attention and leave a lasting impression.',
        icon: { name: 'PointerIcon', width: 64 },
        image: prefixed('/api/images/work/troophunter/mobile/1.png')
      },
      {
        title: 'Robust, Secure, Flexible',
        paragraph: 'Every website we build is backed by secure and performant infrastructure, tailored to the needs of the organisation. This ensures that your digital presence can scale with demand and offer flexibility to meet the needs of your business over time.',
        icon: { name: 'PointerIcon', width: 64 },
        image: prefixed('/api/images/work/totalhealthdentalcare/desktop/26.png')
      },
      {
        title: 'Rewarding partnerships',
        paragraph: 'Behind every best-in-class website is a collaborative agency–client partnership. We work in close collaboration with you to ensure outcomes that offer extraordinary experiences while delivering results. Awards are nice, but your success means so much more.',
        icon: { name: 'PointerIcon', width: 64 },
        image: prefixed('/api/images/work/goldendao/desktop/14.png')
      }
    ],
    footerMainContent: {
      link: '/contact',
      start: 'Let’s make',
      end: 'something wonderful'
    },
    meta: {
      title: 'Web Developers | Our Expertise — Dev8X | Dev8X: World class digital products',
      description: 'Exceptional websites for ambitious, modern brands'
    },
    footerData: {
      global: {
        heading: 'I work globally',
        email: 'contact@helloabdul.com',
        buttonText: 'Hire me'
      },
      offices: [
        {
          country: 'USA',
          city: 'Orlando, Florida',
          phone: '+1 (321) 300-2393'
        },
        {
          country: 'Pakistan',
          city: 'Lahore, Punjab',
          phone: '+92 (329) 294-7777'
        }
      ],
      // careers: {
      //   heading: 'We’re Growing – Join Our Team',
      //   description: 'Let’s build the future, together.',
      //   link: '/careers',
      //   linkText: 'Explore Careers'
      // },
      copyright: {
        year: '2025',
        text: 'Privacy Policy',
        privacyLink: '/privacy'
      }
    },
    footerSocialLinks: [
      {
        title: 'LinkedIn',
        icon: { name: 'AsteriskIcon', width: 10 },
        href: 'https://www.linkedin.com/company/dev8xofficial/'
      },
      {
        title: 'Instagram',
        icon: { name: 'AsteriskIcon', width: 10 },
        href: 'https://www.instagram.com/dev8xofficial/'
      },
      {
        title: 'Facebook',
        // icon: { name: 'AsteriskIcon', width: 10 },
        href: 'https://www.facebook.com/profile.php?id=61569289660818'
      }
      // {
      //   title: 'Youtube',
      //   href: 'https://www.youtube.com/@Dev8XOfficial-s3v'
      // }
    ],
    testimonials: [
      {
        name: 'Henry Luong',
        company: 'Unios',
        bgColor: '#ffffff',
        color: '#111111',
        transformOrigin: 'center top',
        image: 'https://a-us.storyblok.com/f/1017006/1744x1612/1d5f3959f9/unios.jpeg',
        comment: 'Without a doubt, a number of projects have been won on the back of our new website and project specification toolbox built by the team at Dev8X.'
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
        comment: 'From conception through to launch, the Dev8X team has been nothing short of amazing. I wouldn’t hesitate to recommend Dev8X to any business.'
      }
    ]
  },
  {
    slug: 'web-applications',
    variant: 'pink',
    tagText: 'Web Applications',
    heading: 'Tailored digital solutions, from concept to launch',
    image: prefixed('/api/images/work/totalhealthdentalcare/desktop/20.png'),
    iconCards: {
      title: 'Built for your needs',
      paragraph: 'We craft custom web applications designed specifically to support and enhance your unique business operations.',
      items: [
        {
          title: 'Tailor Made',
          description: 'We combine insights, data and our deep expertise to align with your vision, creating an entirely bespoke platform to suit your business and audience needs.',
          icon: { name: 'GPSIcon', width: 26 }
        },
        {
          title: 'World-class UX & Design',
          description: 'Our award-winning UX and design approach informs every concept, creative solution, key decision, and prototype to help drive your brand forward.',
          icon: { name: 'GlobeIcon', width: 26 }
        },
        {
          title: 'Robust, Secure, Flexible',
          description: 'Our core stack of preferred technologies aims for maximum flexibility, security, and performance, ensuring the end results continues to meet your needs in the long term.',
          icon: { name: 'ShieldIcon', width: 24 }
        },
        {
          title: 'Digital Partners',
          description: 'We believe in extraordinary client relationships, service and support. We’re in it for the long haul to maintain your advantage and ensure ongoing success.',
          icon: { name: 'DevicesIcon', width: 28 }
        }
      ]
    },
    contentAsideImageItems: [
      {
        title: 'Ready for scale',
        paragraph: 'As your business evolves, so will your technological requirements. We implement a practical blend of proven solutions and latest technologies to produce applications that effortlessly adapt and expand. Be relevant now, stay relevant in the future.',
        icon: { name: 'CardIcon', width: 64 },
        image: prefixed('/api/images/work/troophunter/desktop/5.png')
      },
      {
        title: 'From startups to enterprise',
        paragraph: 'We work with clients of all size, from startups poised for rapid growth or established enterprises looking to enhance their digital infrastructure. Our custom-designed and purpose-built web applications support and drive business success at every stage.',
        icon: { name: 'CardIcon', width: 64 },
        image: prefixed('/api/images/work/scheduler/mobile/2.png')
      },
      {
        title: 'Entirely bespoke',
        paragraph: 'Unique businesses demand unique solutions. From marketplaces to automation, we work with each partner to strategise, design and execute web applications that are built to spec and integrate with your existing business systems.',
        icon: { name: 'CardIcon', width: 64 },
        image: prefixed('/api/images/work/goldendao/desktop/1.png')
      }
    ],
    footerMainContent: {
      link: '/contact',
      start: 'Let’s make',
      end: 'something wonderful'
    },
    meta: {
      title: 'Web App Developers | Our Expertise — Dev8X | Dev8X: World class digital products',
      description: 'Tailored digital solutions, from concept to launch'
    },
    footerData: {
      global: {
        heading: 'I work globally',
        email: 'contact@helloabdul.com',
        buttonText: 'Hire me'
      },
      offices: [
        {
          country: 'USA',
          city: 'Orlando, Florida',
          phone: '+1 (321) 300-2393'
        },
        {
          country: 'Pakistan',
          city: 'Lahore, Punjab',
          phone: '+92 (329) 294-7777'
        }
      ],
      // careers: {
      //   heading: 'We’re Growing – Join Our Team',
      //   description: 'Let’s build the future, together.',
      //   link: '/careers',
      //   linkText: 'Explore Careers'
      // },
      copyright: {
        year: '2025',
        text: 'Privacy Policy',
        privacyLink: '/privacy'
      }
    },
    footerSocialLinks: [
      {
        title: 'LinkedIn',
        icon: { name: 'AsteriskIcon', width: 10 },
        href: 'https://www.linkedin.com/company/dev8xofficial/'
      },
      {
        title: 'Instagram',
        icon: { name: 'AsteriskIcon', width: 10 },
        href: 'https://www.instagram.com/dev8xofficial/'
      },
      {
        title: 'Facebook',
        // icon: { name: 'AsteriskIcon', width: 10 },
        href: 'https://www.facebook.com/profile.php?id=61569289660818'
      }
      // {
      //   title: 'Youtube',
      //   href: 'https://www.youtube.com/@Dev8XOfficial-s3v'
      // }
    ],
    testimonials: [
      {
        name: 'Henry Luong',
        company: 'Unios',
        bgColor: '#ffffff',
        color: '#111111',
        transformOrigin: 'center top',
        image: 'https://a-us.storyblok.com/f/1017006/1744x1612/1d5f3959f9/unios.jpeg',
        comment: 'Without a doubt, a number of projects have been won on the back of our new website and project specification toolbox built by the team at Dev8X.'
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
        comment: 'From conception through to launch, the Dev8X team has been nothing short of amazing. I wouldn’t hesitate to recommend Dev8X to any business.'
      }
    ]
  },
  {
    slug: 'real-time-apps',
    variant: 'pink',
    tagText: 'Real-Time Applications',
    heading: 'Engage users in the moment with real-time experiences',
    image: prefixed('/api/images/work/other/developer-identifying-server-issues.png'),
    iconCards: {
      title: 'Instant, seamless interaction',
      paragraph: 'We create real-time applications that enable immediate, meaningful communication. From live updates to instant messaging and collaborative tools, our real-time solutions keep users connected and engaged, effortlessly.',
      items: [
        {
          title: 'Live by design',
          description: 'We design and develop responsive real-time experiences—from collaborative tools to live dashboards—that feel immediate, fluid, and alive.',
          icon: { name: 'MagicWandIcon', width: 26 }
        },
        {
          title: 'Performance-first',
          description: 'Our engineering focus ensures real-time features are lightweight, reliable, and performant across devices, networks, and locations.',
          icon: { name: 'MonitorIcon', width: 24 }
        },
        {
          title: 'Built to scale',
          description: "Whether it's live chat, instant notifications, or multiplayer features, we build systems that scale seamlessly with your audience and demands.",
          icon: { name: 'GroupUsersIcon', width: 28 }
        },
        {
          title: 'Always in sync',
          description: 'From sockets to state management, we make sure your app stays consistent and synchronised—delivering the right information at the right time.',
          icon: { name: 'ShuffleIcon', width: 28 }
        }
      ]
    },
    contentAsideImageItems: [
      {
        title: 'Seamless, Instant Connectivity',
        paragraph: 'Create applications that provide real-time updates and instantaneous interaction. Whether you’re building live chat platforms, collaborative tools, or online gaming experiences, our approach ensures a smooth, responsive, and engaging experience for your users—every time they interact.',
        icon: { name: 'SeismometerIcon', width: 64 },
        image: prefixed('/api/images/work/troophunter/mobile/2.png')
      },
      {
        title: 'Transformative User Experiences',
        paragraph: 'We specialize in designing and developing real-time applications that push the boundaries of user interaction. From real-time notifications to live data feeds, we create dynamic systems that engage users in meaningful, real-time experiences while maintaining optimal performance and reliability.',
        icon: { name: 'SeismometerIcon', width: 64 },
        image: prefixed('/api/images/work/scheduler/mobile/11.png')
      },
      {
        title: 'Scalable Solutions for Every Need',
        paragraph: 'We build scalable architectures to support real-time data processing, ensuring that your app can grow as your user base expands. Whether handling hundreds or millions of simultaneous users, we leverage cutting-edge technologies to guarantee performance under pressure, offering seamless scalability for your real-time application needs.',
        icon: { name: 'SeismometerIcon', width: 64 },
        image: prefixed('/api/images/work/totalhealthdentalcare/desktop/5.png')
      },
      {
        title: 'Powerful Real-Time Systems',
        paragraph: 'Our expertise goes beyond simple integrations—we develop sophisticated back-end systems that allow for secure, real-time communication between users and devices. From instant messaging apps to real-time dashboards, we ensure your application remains fast, reliable, and always connected.',
        icon: { name: 'SeismometerIcon', width: 64 },
        image: prefixed('/api/images/work/honeydu/desktop/3.png')
      }
    ],
    footerMainContent: {
      link: '/contact',
      start: 'Let’s make',
      end: 'something wonderful'
    },
    meta: {
      title: 'Real-Time Systems & Application Development | Our Expertise — Dev8X | Dev8X: World class digital products',
      description: 'Engage users in the moment with real-time experiences'
    },
    footerData: {
      global: {
        heading: 'I work globally',
        email: 'contact@helloabdul.com',
        buttonText: 'Hire me'
      },
      offices: [
        {
          country: 'USA',
          city: 'Orlando, Florida',
          phone: '+1 (321) 300-2393'
        },
        {
          country: 'Pakistan',
          city: 'Lahore, Punjab',
          phone: '+92 (329) 294-7777'
        }
      ],
      // careers: {
      //   heading: 'We’re Growing – Join Our Team',
      //   description: 'Let’s build the future, together.',
      //   link: '/careers',
      //   linkText: 'Explore Careers'
      // },
      copyright: {
        year: '2025',
        text: 'Privacy Policy',
        privacyLink: '/privacy'
      }
    },
    footerSocialLinks: [
      {
        title: 'LinkedIn',
        icon: { name: 'AsteriskIcon', width: 10 },
        href: 'https://www.linkedin.com/company/dev8xofficial/'
      },
      {
        title: 'Instagram',
        icon: { name: 'AsteriskIcon', width: 10 },
        href: 'https://www.instagram.com/dev8xofficial/'
      },
      {
        title: 'Facebook',
        // icon: { name: 'AsteriskIcon', width: 10 },
        href: 'https://www.facebook.com/profile.php?id=61569289660818'
      }
      // {
      //   title: 'Youtube',
      //   href: 'https://www.youtube.com/@Dev8XOfficial-s3v'
      // }
    ],
    testimonials: [
      {
        name: 'Henry Luong',
        company: 'Unios',
        bgColor: '#ffffff',
        color: '#111111',
        transformOrigin: 'center top',
        image: 'https://a-us.storyblok.com/f/1017006/1744x1612/1d5f3959f9/unios.jpeg',
        comment: 'Without a doubt, a number of projects have been won on the back of our new website and project specification toolbox built by the team at Dev8X.'
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
        comment: 'From conception through to launch, the Dev8X team has been nothing short of amazing. I wouldn’t hesitate to recommend Dev8X to any business.'
      }
    ]
  },
  {
    slug: 'saas',
    variant: 'blue',
    tagText: 'SaaS',
    heading: 'Empower your business with scalable SaaS solutions',
    image: prefixed('/api/images/work/troophunter/desktop/2.png'),
    iconCards: {
      title: 'Seamless cloud integration',
      paragraph: "We design SaaS platforms that drive growth and efficiency. Whether you're building a new product or optimizing an existing one, we create scalable and secure solutions that align with your business goals and user needs.",
      items: [
        {
          title: 'SaaS with Substance',
          description: 'We build SaaS products that are as powerful as they are intuitive—balancing robust functionality with beautifully crafted user experiences.',
          icon: { name: 'SaaSIcon', width: 26 }
        },
        {
          title: 'Scalable Foundations',
          description: 'From MVP to enterprise-grade platforms, our architecture scales with your product. We lay the technical groundwork to support your growth trajectory.',
          icon: { name: 'PlanetRingIcon', width: 24 }
        },
        {
          title: 'Subscription & User Management',
          description: 'Design seamless onboarding, billing, and access systems tailored to the needs of your users—backed by secure, efficient infrastructure.',
          icon: { name: 'CardIcon', width: 28 }
        },
        {
          title: 'Product-Led Thinking',
          description: 'We craft experiences that drive engagement, adoption, and retention—helping you convert trial users into lifelong customers.',
          icon: { name: 'HeartIcon', width: 28 }
        }
      ]
    },
    contentAsideImageItems: [
      {
        title: 'Transform your business with SaaS',
        paragraph: 'Elevate your operations with tailored SaaS solutions that streamline workflows and boost efficiency. We design and build robust platforms that meet your specific business needs, delivering intuitive, scalable, and secure tools to enhance your digital transformation journey.',
        icon: { name: 'SaaSIcon', width: 64 },
        image: prefixed('/api/images/work/totalhealthdentalcare/desktop/14.png')
      },
      {
        title: 'Intuitive user experiences at scale',
        paragraph: 'Every successful SaaS product needs a seamless user experience. Our focus is on simplifying complex workflows, ensuring that every interaction is intuitive and easy, even as your product scales. Whether it’s for internal teams or external customers, we ensure your users stay engaged and productive.',
        icon: { name: 'SaaSIcon', width: 64 },
        image: prefixed('/api/images/work/other/react_garvan.png')
      },
      {
        title: 'Tailored for your growth',
        paragraph: 'From start-ups to enterprises, we design SaaS platforms that evolve with your business. With an agile approach and a deep understanding of industry-specific needs, we help you develop a product that grows with your users, fostering long-term success and scalability.',
        icon: { name: 'SaaSIcon', width: 64 },
        image: prefixed('/api/images/work/scheduler/mobile/2.png')
      },
      {
        title: 'End-to-end SaaS development',
        paragraph: 'We partner with you through every stage of your SaaS journey—strategy, design, development, and deployment. Whether building from scratch or refining an existing product, our team ensures every feature serves its purpose, supporting your goals and delivering exceptional user experiences.',
        icon: { name: 'SaaSIcon', width: 64 },
        image: prefixed('/api/images/work/honeydu/desktop/21.png')
      }
    ],
    footerMainContent: {
      link: '/contact',
      start: 'Let’s make',
      end: 'something wonderful'
    },
    meta: {
      title: 'SaaS Solutions Development | Our Expertise — Dev8X | Dev8X: World class digital products',
      description: 'Empower your business with scalable SaaS solutions'
    },
    footerData: {
      global: {
        heading: 'I work globally',
        email: 'contact@helloabdul.com',
        buttonText: 'Hire me'
      },
      offices: [
        {
          country: 'USA',
          city: 'Orlando, Florida',
          phone: '+1 (321) 300-2393'
        },
        {
          country: 'Pakistan',
          city: 'Lahore, Punjab',
          phone: '+92 (329) 294-7777'
        }
      ],
      // careers: {
      //   heading: 'We’re Growing – Join Our Team',
      //   description: 'Let’s build the future, together.',
      //   link: '/careers',
      //   linkText: 'Explore Careers'
      // },
      copyright: {
        year: '2025',
        text: 'Privacy Policy',
        privacyLink: '/privacy'
      }
    },
    footerSocialLinks: [
      {
        title: 'LinkedIn',
        icon: { name: 'AsteriskIcon', width: 10 },
        href: 'https://www.linkedin.com/company/dev8xofficial/'
      },
      {
        title: 'Instagram',
        icon: { name: 'AsteriskIcon', width: 10 },
        href: 'https://www.instagram.com/dev8xofficial/'
      },
      {
        title: 'Facebook',
        // icon: { name: 'AsteriskIcon', width: 10 },
        href: 'https://www.facebook.com/profile.php?id=61569289660818'
      }
      // {
      //   title: 'Youtube',
      //   href: 'https://www.youtube.com/@Dev8XOfficial-s3v'
      // }
    ],
    testimonials: [
      {
        name: 'Henry Luong',
        company: 'Unios',
        bgColor: '#ffffff',
        color: '#111111',
        transformOrigin: 'center top',
        image: 'https://a-us.storyblok.com/f/1017006/1744x1612/1d5f3959f9/unios.jpeg',
        comment: 'Without a doubt, a number of projects have been won on the back of our new website and project specification toolbox built by the team at Dev8X.'
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
        comment: 'From conception through to launch, the Dev8X team has been nothing short of amazing. I wouldn’t hesitate to recommend Dev8X to any business.'
      }
    ]
  },
  {
    slug: 'ecommerce',
    variant: 'green',
    tagText: 'eCommerce',
    heading: 'Beautiful online stores that engage and convert',
    image: prefixed('/api/images/work/other/fac.png'),
    iconCards: {
      title: 'From 1 product to 100+',
      paragraph: 'High-performing eCommerce experiences that turn visitors into loyal customers.',
      items: [
        {
          title: 'Seamless Online Retail',
          description: 'Simplified administration and automation, high-performing customer experiences and ongoing optimisation for pureplay and omni-channel retailers.',
          icon: { name: 'ShoppingBagIcon', width: 28 }
        },
        {
          title: 'Butter-smooth Checkouts',
          description: 'We apply our award-winning UX and design approach with analytical data and best-practice UX principles to convert spend and minimise abandonment.',
          icon: { name: 'ShoppingCartIcon', width: 25 }
        },
        {
          title: 'Securely Integrated',
          description: 'We can connect and configure your business systems and payment solutions to ensure data integrity throughout your entire infrastructure.',
          icon: { name: 'ShieldIcon', width: 24 }
        },
        {
          title: 'eCommerce Partners',
          description: 'We’re in this for the long haul. We’ll work in close collaboration with you to ensure extraordinary outcomes and your ongoing success over time.',
          icon: { name: 'UserIcon', width: 27 }
        }
      ]
    },
    contentAsideImageItems: [
      {
        title: 'Elevate your brand experience',
        paragraph: 'Every customer engagement forms the bigger picture of an overall brand experience. Our approach to ethical UX and conversion design draws from this philosophy, ensuring better customer experiences that last long after the final sale.',
        icon: { name: 'BasketIcon', width: 64 },
        image: prefixed('/api/images/work/other/c-bco.png')
      },
      {
        title: 'Comprehensive eCommerce functionality',
        paragraph: 'We offer a holistic suite of features designed to streamline every aspect of your online store. From product management and secure payment gateways to personalised recommendations and seamless checkout processes, we equip your eCommerce platform with all the tools to operate efficiently, adapt to market changes, and deliver an exceptional shopping experience.',
        icon: { name: 'BasketIcon', width: 64 },
        image: prefixed('/api/images/work/other/sandygray.png')
      },
      {
        title: 'Bring your products to life online',
        paragraph: 'We work hard translating your tangible and tactile product experiences to the digital medium, reaching a new customer base through visually engaging interfaces that hero your products and convert attention into sales. From 360-degree product views to augmented reality, we encourage customers to explore and interact with products in a rich, immersive way.',
        icon: { name: 'BasketIcon', width: 64 },
        image: prefixed('/api/images/work/scheduler/mobile/1.png')
      }
    ],
    footerMainContent: {
      link: '/contact',
      start: 'Let’s make',
      end: 'something wonderful'
    },
    meta: {
      title: 'eCommerce Shopify Website Development | Our Expertise — Dev8X | Dev8X: World class digital products',
      description: 'Beautiful online stores that engage and convert'
    },
    footerData: {
      global: {
        heading: 'I work globally',
        email: 'contact@helloabdul.com',
        buttonText: 'Hire me'
      },
      offices: [
        {
          country: 'USA',
          city: 'Orlando, Florida',
          phone: '+1 (321) 300-2393'
        },
        {
          country: 'Pakistan',
          city: 'Lahore, Punjab',
          phone: '+92 (329) 294-7777'
        }
      ],
      // careers: {
      //   heading: 'We’re Growing – Join Our Team',
      //   description: 'Let’s build the future, together.',
      //   link: '/careers',
      //   linkText: 'Explore Careers'
      // },
      copyright: {
        year: '2025',
        text: 'Privacy Policy',
        privacyLink: '/privacy'
      }
    },
    footerSocialLinks: [
      {
        title: 'LinkedIn',
        icon: { name: 'AsteriskIcon', width: 10 },
        href: 'https://www.linkedin.com/company/dev8xofficial/'
      },
      {
        title: 'Instagram',
        icon: { name: 'AsteriskIcon', width: 10 },
        href: 'https://www.instagram.com/dev8xofficial/'
      },
      {
        title: 'Facebook',
        // icon: { name: 'AsteriskIcon', width: 10 },
        href: 'https://www.facebook.com/profile.php?id=61569289660818'
      }
      // {
      //   title: 'Youtube',
      //   href: 'https://www.youtube.com/@Dev8XOfficial-s3v'
      // }
    ],
    testimonials: [
      {
        name: 'Henry Luong',
        company: 'Unios',
        bgColor: '#ffffff',
        color: '#111111',
        transformOrigin: 'center top',
        image: 'https://a-us.storyblok.com/f/1017006/1744x1612/1d5f3959f9/unios.jpeg',
        comment: 'Without a doubt, a number of projects have been won on the back of our new website and project specification toolbox built by the team at Dev8X.'
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
        comment: 'From conception through to launch, the Dev8X team has been nothing short of amazing. I wouldn’t hesitate to recommend Dev8X to any business.'
      }
    ]
  },
  {
    slug: 'interaction-design',
    variant: 'cyan',
    tagText: 'Interaction Design',
    heading: 'Inspire, enable, captivate',
    image: prefixed('/api/images/work/other/sussexthumb.png'),

    iconCards: {
      title: 'Human-centred interactive experiences',
      paragraph: 'Interaction Design shapes how people feel when they use a product. Blending UX strategy with front-end engineering, I craft interfaces that respond intuitively, communicate clearly, and guide users through seamless digital journeys.',
      items: [
        {
          title: 'Interaction-first thinking',
          description: 'I design and build clear interaction patterns grounded in real user behaviours—ensuring every animation, transition and feedback loop supports usability and increases task success.',
          icon: { name: 'EyeIcon', width: 26 }
        },
        {
          title: 'Accessible for everyone',
          description: 'From keyboard workflows to WCAG-compliant motion and colour systems, accessibility and performance sit at the core of every interactive component I produce.',
          icon: { name: 'SeismometerIcon', width: 24 }
        },
        {
          title: 'Data-backed decisions',
          description: 'Interaction choices are informed through analytics, usability testing and experimentation—allowing the UI to evolve into a frictionless, high-conversion experience.',
          icon: { name: 'PuzzlePieceIcon', width: 28 }
        },
        {
          title: 'Crafted for modern engineering',
          description: 'Built with React, Next.js and TypeScript, each interface is engineered for reliability, scalability, and long-term maintainability—aligned with US-standard frontend expectations.',
          icon: { name: 'MonitorIcon', width: 28 }
        }
      ]
    },

    contentAsideImageItems: [
      {
        title: 'Connect through thoughtful interactions',
        paragraph: 'With over 6 years of experience designing and shipping interactive products, I focus on creating moments that feel intuitive, purposeful and emotionally engaging. These micro-interactions help reduce cognitive load, increase clarity, and create strong brand–user relationships across applications, dashboards, eCommerce flows and onboarding journeys.',
        icon: { name: 'MapIcon', width: 64 },
        image: prefixed('/api/images/work/other/cocos.png')
      },
      {
        title: 'Digital that resonates with users',
        paragraph: 'From designing information architectures to engineering pixel-perfect UI states, every product is crafted to feel fluid, fast and meaningful. Using React-driven component systems, motion principles, and interaction guidelines, I help create high-impact experiences that US tech teams value—experiences that convert, retain and delight.',
        icon: { name: 'MapIcon', width: 64 },
        image: prefixed('/api/images/work/honeydu/desktop/2.png')
      },
      {
        title: 'Elevate your brand through intelligent UX',
        paragraph: 'Every touchpoint contributes to the broader brand experience. My approach merges ethical UX, behaviour-based interactions and conversion-focused design to create experiences that feel helpful, memorable and aligned with user intent—long after the task is complete.',
        icon: { name: 'MapIcon', width: 64 },
        image: prefixed('/api/images/work/scheduler/mobile/11.png')
      }
    ],
    footerMainContent: {
      link: '/contact',
      start: 'Let’s make',
      end: 'something wonderful'
    },
    meta: {
      title: 'User Experience Design | Our Expertise — Dev8X | Dev8X: World class digital products',
      description: 'Inspire, enable, captivate'
    },
    footerData: {
      global: {
        heading: 'I work globally',
        email: 'contact@helloabdul.com',
        buttonText: 'Hire me'
      },
      offices: [
        {
          country: 'USA',
          city: 'Orlando, Florida',
          phone: '+1 (321) 300-2393'
        },
        {
          country: 'Pakistan',
          city: 'Lahore, Punjab',
          phone: '+92 (329) 294-7777'
        }
      ],
      // careers: {
      //   heading: 'We’re Growing – Join Our Team',
      //   description: 'Let’s build the future, together.',
      //   link: '/careers',
      //   linkText: 'Explore Careers'
      // },
      copyright: {
        year: '2025',
        text: 'Privacy Policy',
        privacyLink: '/privacy'
      }
    },
    footerSocialLinks: [
      {
        title: 'LinkedIn',
        icon: { name: 'AsteriskIcon', width: 10 },
        href: 'https://www.linkedin.com/company/dev8xofficial/'
      },
      {
        title: 'Instagram',
        icon: { name: 'AsteriskIcon', width: 10 },
        href: 'https://www.instagram.com/dev8xofficial/'
      },
      {
        title: 'Facebook',
        // icon: { name: 'AsteriskIcon', width: 10 },
        href: 'https://www.facebook.com/profile.php?id=61569289660818'
      }
      // {
      //   title: 'Youtube',
      //   href: 'https://www.youtube.com/@Dev8XOfficial-s3v'
      // }
    ],
    testimonials: [
      {
        name: 'Henry Luong',
        company: 'Unios',
        bgColor: '#ffffff',
        color: '#111111',
        transformOrigin: 'center top',
        image: 'https://a-us.storyblok.com/f/1017006/1744x1612/1d5f3959f9/unios.jpeg',
        comment: 'Without a doubt, a number of projects have been won on the back of our new website and project specification toolbox built by the team at Dev8X.'
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
        comment: 'From conception through to launch, the Dev8X team has been nothing short of amazing. I wouldn’t hesitate to recommend Dev8X to any business.'
      }
    ]
  },
  {
    slug: 'user-interface-components',
    variant: 'pink',
    tagText: 'User Interface Components',
    heading: 'Next-gen UI tailored to your application',
    image: prefixed('/api/images/work/other/04-landscape.png'),

    iconCards: {
      title: 'Bespoke user interfaces built for impact',
      paragraph: 'Blending aesthetic excellence with engineering precision, I design and implement intuitive, scalable, and highly functional user interface components that bring products to life for both users and development teams.',
      items: [
        {
          title: 'Proven UI Expertise',
          description: 'Over 6+ years, I have crafted award-worthy UI systems, providing clear, reusable components that streamline development and ensure design consistency across complex applications.',
          icon: { name: 'PaintSwatchIcon', width: 28 }
        },
        {
          title: 'Data-driven dashboards',
          description: 'I build interactive dashboards that simplify complex data, enabling stakeholders to make informed decisions through visually compelling and intuitive interfaces.',
          icon: { name: 'MonitorIcon', width: 22 }
        },
        {
          title: 'Scalable Design Systems',
          description: 'I create and maintain comprehensive design systems with reusable component libraries, empowering in-house teams to deliver consistent, production-ready UIs at scale.',
          icon: { name: 'WandIcon', width: 26 }
        },
        {
          title: 'Trusted UI Partner',
          description: 'Collaboration is key. I work closely with product owners, designers, and engineers to ensure seamless handoffs, world-class outcomes, and a unified vision from concept to production.',
          icon: { name: 'HandPalmIcon', width: 26 }
        }
      ]
    },

    contentAsideImageItems: [
      {
        title: 'Engaging Reports & Dashboards',
        paragraph: 'Transform raw data into actionable insights with interactive UI components. I design dashboards and reporting tools that make data exploration intuitive, visually compelling, and tailored to meet both internal and external stakeholder needs.',
        icon: { name: 'SelectionIcon', width: 64 },
        image: prefixed('/api/images/work/other/ui.png')
      },
      {
        title: 'Intuitive product experience',
        paragraph: 'Every interface decision is informed by a blend of research, analytics, and UX best practices. I focus on creating UI workflows that are both highly usable and aligned with business goals, ensuring users achieve their objectives effortlessly.',
        icon: { name: 'SelectionIcon', width: 64 },
        image: prefixed('/api/images/work/other/pentanetui.png')
      },
      {
        title: 'Human-centered interfaces',
        paragraph: 'From eCommerce platforms to complex SaaS tools, I design interfaces that respond to real user behaviors. Each component is optimized for performance, accessibility, and delight, ensuring products feel natural, approachable, and future-ready.',
        icon: { name: 'SelectionIcon', width: 64 },
        image: prefixed('/api/images/work/totalhealthdentalcare/desktop/26.png')
      },
      {
        title: 'Your UI Design Partner',
        paragraph: 'Collaboration drives excellence. I partner with product teams to build scalable, intuitive, and visually cohesive interfaces. With a strong focus on component architecture, accessibility, and micro-interactions, every UI is crafted to elevate both brand and user experience.',
        icon: { name: 'SelectionIcon', width: 64 },
        image: prefixed('/api/images/work/scheduler/mobile/2.png')
      }
    ],
    footerMainContent: {
      link: '/contact',
      start: 'Let’s make',
      end: 'something wonderful'
    },
    meta: {
      title: 'User Interface Design | Our Expertise — Dev8X | Dev8X: World class digital products',
      description: 'Next-gen UI tailored to your application'
    },
    footerData: {
      global: {
        heading: 'I work globally',
        email: 'contact@helloabdul.com',
        buttonText: 'Hire me'
      },
      offices: [
        {
          country: 'USA',
          city: 'Orlando, Florida',
          phone: '+1 (321) 300-2393'
        },
        {
          country: 'Pakistan',
          city: 'Lahore, Punjab',
          phone: '+92 (329) 294-7777'
        }
      ],
      // careers: {
      //   heading: 'We’re Growing – Join Our Team',
      //   description: 'Let’s build the future, together.',
      //   link: '/careers',
      //   linkText: 'Explore Careers'
      // },
      copyright: {
        year: '2025',
        text: 'Privacy Policy',
        privacyLink: '/privacy'
      }
    },
    footerSocialLinks: [
      {
        title: 'LinkedIn',
        icon: { name: 'AsteriskIcon', width: 10 },
        href: 'https://www.linkedin.com/company/dev8xofficial/'
      },
      {
        title: 'Instagram',
        icon: { name: 'AsteriskIcon', width: 10 },
        href: 'https://www.instagram.com/dev8xofficial/'
      },
      {
        title: 'Facebook',
        // icon: { name: 'AsteriskIcon', width: 10 },
        href: 'https://www.facebook.com/profile.php?id=61569289660818'
      }
      // {
      //   title: 'Youtube',
      //   href: 'https://www.youtube.com/@Dev8XOfficial-s3v'
      // }
    ],
    testimonials: [
      {
        name: 'Henry Luong',
        company: 'Unios',
        bgColor: '#ffffff',
        color: '#111111',
        transformOrigin: 'center top',
        image: 'https://a-us.storyblok.com/f/1017006/1744x1612/1d5f3959f9/unios.jpeg',
        comment: 'Without a doubt, a number of projects have been won on the back of our new website and project specification toolbox built by the team at Dev8X.'
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
        comment: 'From conception through to launch, the Dev8X team has been nothing short of amazing. I wouldn’t hesitate to recommend Dev8X to any business.'
      }
    ]
  },
  {
    slug: 'design-systems',
    variant: 'green',
    tagText: 'Design Systems',
    heading: 'Scalable Design Solutions',
    image: prefixed('/api/images/work/other/design-systems_dev-effort.png'),
    iconCards: {
      title: 'Boost your product development',
      paragraph: 'We build robust design systems that empower product teams to move quicker. Develop your own collection of reusable components and patterns to ensure a cohesive and consistent design across your entire digital ecosystem.',
      items: [
        {
          title: 'Bases Covered',
          description: 'Our bespoke component libraries combine aesthetics, usability, accessibility and your unique brand style across all your sites and devices.',
          icon: { name: 'UserIcon', width: 26 }
        },
        {
          title: 'A Tailored Approach',
          description: "We recognise that every product and project is different. We'll work with you to determine the best approach to align to your product roadmap.",
          icon: { name: 'SparklerIcon', width: 24 }
        },
        {
          title: 'Comprehensive & Consistent',
          description: 'Our team will supply detailed and annotated documentation, covering appropriate use of your design tokens and patterns according to current best practice.',
          icon: { name: 'PaintSwatchIcon', width: 28 }
        },
        {
          title: 'Award Winning Design',
          description: 'Leverage our award-winning design approach to offer a world-class look & feel across your organisation’s entire online presence or digital product.',
          icon: { name: 'ShieldIcon', width: 28 }
        }
      ]
    },
    contentAsideImageItems: [
      {
        title: 'An on-brand design language',
        paragraph: 'Develop your own design language, built around your brand. With a bespoke component library of modular UI elements and interface design patterns, you can offer your audience a consistent visual and interactive experience no matter where they are in your digital ecosystem. Foster brand trust and encourage flow by removing unnecessary barriers to getting visitors where they need to go.',
        icon: { name: 'PlanetRingIcon', width: 64 },
        image: prefixed('/api/images/work/other/design-systems_branded.png')
      },
      {
        title: 'Simplify your design & development efforts',
        paragraph: 'Free up your teams to focus on solving more complex problems. With a wealth of design resources on hand, your design, development and content teams can create and replication components & patterns quickly and at scale, saving hours on re-thinking ideas, re-doing work, and repairing accidental inconsistencies.',
        icon: { name: 'PlanetRingIcon', width: 64 },
        image: prefixed('/api/images/work/other/design-systems_dev-effort.png')
      },
      {
        title: 'Style that lasts',
        paragraph: 'As part of your design system, we can deliver a comprehensive style guide covering best-practice use of the resources in your component library and pattern library, including the rationale behind design decisions particular to your brand. The aim is to create a style that lasts, no matter whose hands are on the tools or where they are in the world.',
        icon: { name: 'PlanetRingIcon', width: 64 },
        image: prefixed('/api/images/work/other/design-systems_style-guide.png')
      },
      {
        title: 'Made for humans, with Dev8X',
        paragraph: 'Behind every best-in-class product is a collaborative agency–client partnership. Everything we craft is entirely bespoke, as unique as the story you tell. With an in-house team of strategists, designers, developers and project managers, we can offer diverse perspectives, seamless end results, and a truly collaborative design and delivery process.',
        icon: { name: 'PlanetRingIcon', width: 64 },
        image: prefixed('/api/images/work/other/design-systems_fourby-humans.png')
      }
    ],
    footerMainContent: {
      link: '/contact',
      start: 'Let’s make',
      end: 'something wonderful'
    },
    meta: {
      title: 'Design Systems | Our Expertise — Dev8X | Dev8X: World class digital products',
      description: 'Scalable Design Solutions'
    },
    footerData: {
      global: {
        heading: 'I work globally',
        email: 'contact@helloabdul.com',
        buttonText: 'Hire me'
      },
      offices: [
        {
          country: 'USA',
          city: 'Orlando, Florida',
          phone: '+1 (321) 300-2393'
        },
        {
          country: 'Pakistan',
          city: 'Lahore, Punjab',
          phone: '+92 (329) 294-7777'
        }
      ],
      // careers: {
      //   heading: 'We’re Growing – Join Our Team',
      //   description: 'Let’s build the future, together.',
      //   link: '/careers',
      //   linkText: 'Explore Careers'
      // },
      copyright: {
        year: '2025',
        text: 'Privacy Policy',
        privacyLink: '/privacy'
      }
    },
    footerSocialLinks: [
      {
        title: 'LinkedIn',
        icon: { name: 'AsteriskIcon', width: 10 },
        href: 'https://www.linkedin.com/company/dev8xofficial/'
      },
      {
        title: 'Instagram',
        icon: { name: 'AsteriskIcon', width: 10 },
        href: 'https://www.instagram.com/dev8xofficial/'
      },
      {
        title: 'Facebook',
        // icon: { name: 'AsteriskIcon', width: 10 },
        href: 'https://www.facebook.com/profile.php?id=61569289660818'
      }
      // {
      //   title: 'Youtube',
      //   href: 'https://www.youtube.com/@Dev8XOfficial-s3v'
      // }
    ],
    testimonials: [
      {
        name: 'Henry Luong',
        company: 'Unios',
        bgColor: '#ffffff',
        color: '#111111',
        transformOrigin: 'center top',
        image: 'https://a-us.storyblok.com/f/1017006/1744x1612/1d5f3959f9/unios.jpeg',
        comment: 'Without a doubt, a number of projects have been won on the back of our new website and project specification toolbox built by the team at Dev8X.'
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
        comment: 'From conception through to launch, the Dev8X team has been nothing short of amazing. I wouldn’t hesitate to recommend Dev8X to any business.'
      }
    ]
  },
  {
    slug: 'animations',
    variant: 'blue',
    tagText: 'Animations',
    heading: 'Bring your interfaces to life with motion',
    image: prefixed('/api/images/work/other/tourismprototype.png'),
    iconCards: {
      title: 'Interactive, meaningful motion',
      paragraph: 'Animations are more than eye candy—they guide attention, provide feedback, and make digital experiences feel alive. With over 6 years of crafting motion in UI, I focus on purposeful, performance-friendly animations that enhance usability and delight users.',
      items: [
        {
          title: 'Micro-interactions',
          description: 'Tiny animations—like hover effects, button transitions, or input validations—give instant feedback and make interfaces feel responsive and intuitive.',
          icon: { name: 'SparkleIcon', width: 26 }
        },
        {
          title: 'Page & Layout Transitions',
          description: 'Smooth transitions between views reduce cognitive load, help users understand hierarchy, and make complex flows feel seamless.',
          icon: { name: 'SwapIcon', width: 24 }
        },
        {
          title: 'Guided Attention',
          description: 'Motion can direct users’ eyes to important content or call-to-action buttons without breaking focus or becoming annoying—perfect for dashboards, forms, and eCommerce flows.',
          icon: { name: 'ArrowTrendingIcon', width: 28 }
        },
        {
          title: 'Performance-first Animations',
          description: 'Built with React, Framer Motion, or CSS transitions, I ensure animations are smooth, GPU-accelerated, and don’t compromise page load or interactivity—because nobody likes a jittery UI.',
          icon: { name: 'CpuChipIcon', width: 28 }
        }
      ]
    },
    contentAsideImageItems: [
      {
        title: 'Micro-interactions that feel alive',
        paragraph: 'Small, deliberate animations make a big difference. From subtle hover states on buttons to animated toggles in settings panels, micro-interactions communicate system status and delight users without distracting from core functionality.',
        icon: { name: 'MagicWandIcon', width: 64 },
        image: prefixed('/api/images/work/other/studyplanner.png')
      },
      {
        title: 'Smooth layout and route transitions',
        paragraph: 'Animating layout changes or route transitions helps users maintain context. For example, when opening a modal or switching tabs, smooth transitions reduce cognitive load and create a polished experience.',
        icon: { name: 'MagicWandIcon', width: 64 },
        image: prefixed('/api/images/work/other/pentanetui.png')
      },
      {
        title: 'Storytelling with motion',
        paragraph: 'Animations can emphasize brand personality and highlight key product flows. Think onboarding sequences, progress indicators, or subtle background motion that reinforces your visual language.',
        icon: { name: 'MagicWandIcon', width: 64 },
        image: prefixed('/api/images/work/other/talk-n-walk.png')
      },
      {
        title: 'Accessibility and performance',
        paragraph: 'Motion should never hinder accessibility. I follow best practices like respecting reduced-motion preferences, keeping animation durations readable, and optimizing for mobile and low-power devices.',
        icon: { name: 'MagicWandIcon', width: 64 },
        image: prefixed('/api/images/work/totalhealthdentalcare/desktop/2.png')
      }
    ],
    footerMainContent: {
      link: '/contact',
      start: 'Let’s make',
      end: 'something wonderful'
    },
    meta: {
      title: 'Prototyping | Our Expertise — Dev8X | Dev8X: World class digital products',
      description: 'Turn your ideas into digital prototypes'
    },
    footerData: {
      global: {
        heading: 'I work globally',
        email: 'contact@helloabdul.com',
        buttonText: 'Hire me'
      },
      offices: [
        {
          country: 'USA',
          city: 'Orlando, Florida',
          phone: '+1 (321) 300-2393'
        },
        {
          country: 'Pakistan',
          city: 'Lahore, Punjab',
          phone: '+92 (329) 294-7777'
        }
      ],
      // careers: {
      //   heading: 'We’re Growing – Join Our Team',
      //   description: 'Let’s build the future, together.',
      //   link: '/careers',
      //   linkText: 'Explore Careers'
      // },
      copyright: {
        year: '2025',
        text: 'Privacy Policy',
        privacyLink: '/privacy'
      }
    },
    footerSocialLinks: [
      {
        title: 'LinkedIn',
        icon: { name: 'AsteriskIcon', width: 10 },
        href: 'https://www.linkedin.com/company/dev8xofficial/'
      },
      {
        title: 'Instagram',
        icon: { name: 'AsteriskIcon', width: 10 },
        href: 'https://www.instagram.com/dev8xofficial/'
      },
      {
        title: 'Facebook',
        // icon: { name: 'AsteriskIcon', width: 10 },
        href: 'https://www.facebook.com/profile.php?id=61569289660818'
      }
      // {
      //   title: 'Youtube',
      //   href: 'https://www.youtube.com/@Dev8XOfficial-s3v'
      // }
    ],
    testimonials: [
      {
        name: 'Henry Luong',
        company: 'Unios',
        bgColor: '#ffffff',
        color: '#111111',
        transformOrigin: 'center top',
        image: 'https://a-us.storyblok.com/f/1017006/1744x1612/1d5f3959f9/unios.jpeg',
        comment: 'Without a doubt, a number of projects have been won on the back of our new website and project specification toolbox built by the team at Dev8X.'
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
        comment: 'From conception through to launch, the Dev8X team has been nothing short of amazing. I wouldn’t hesitate to recommend Dev8X to any business.'
      }
    ]
  },
  {
    slug: 'pixel-perfect-layouts',
    variant: 'purple',
    tagText: 'Pixel-Perfect Layouts',
    heading: 'Transform concepts into flawless interfaces',
    image: prefixed('/api/images/work/other/tourismprototype.png'),

    iconCards: {
      title: 'Precision-driven design and development',
      paragraph: 'Deliver interfaces that are pixel-accurate, fully responsive, and seamless across devices. With over 6 years of experience in frontend engineering and design, I ensure your products look and behave exactly as envisioned.',
      items: [
        {
          title: 'High-Fidelity Interfaces',
          description: 'From sketches and wireframes to polished UI, I translate every detail into fully responsive, interactive designs that adhere strictly to brand guidelines and design specifications.',
          icon: { name: 'GPSIcon', width: 26 }
        },
        {
          title: 'Responsive & Adaptive',
          description: 'Every layout is optimized for multiple screen sizes and devices. I focus on flexible grids, fluid spacing, and scalable typography to ensure a flawless experience across mobile, tablet, and desktop.',
          icon: { name: 'FrameIcon', width: 24 }
        },
        {
          title: 'Design-to-Code Precision',
          description: 'Using React, Next.js, and modern frontend practices, I implement layouts exactly as designed. Every component is pixel-perfect, accessible, and performance-optimized for modern US tech standards.',
          icon: { name: 'TargetIcon', width: 28 }
        },
        {
          title: 'Collaborative Delivery',
          description: 'I work closely with design and product teams to ensure your vision translates into a living product. From concept validation to production-ready layouts, every step is collaborative, transparent, and high-quality.',
          icon: { name: 'HandPalmIcon', width: 28 }
        }
      ]
    },

    contentAsideImageItems: [
      {
        title: 'Detailed mockups & interactive layouts',
        paragraph: 'Bring your ideas to life with precise, high-fidelity mockups. I create interactive layouts that showcase core functionality, flow, and design details, empowering teams and stakeholders to review concepts confidently.',
        icon: { name: 'MagicWandIcon', width: 64 },
        image: prefixed('/api/images/work/other/studyplanner.png')
      },
      {
        title: 'Cross-functional alignment',
        paragraph: 'Pixel-perfect prototypes unify multidisciplinary product teams. Stakeholders, developers, and designers all have a single source of truth, reducing ambiguity and ensuring a shared understanding of the final product.',
        icon: { name: 'MagicWandIcon', width: 64 },
        image: prefixed('/api/images/work/other/pentanetui.png')
      },
      {
        title: 'User-centric validation',
        paragraph: 'Test interfaces with real users before final development. Validate layouts, interaction flows, and micro-interactions to ensure the product is intuitive, accessible, and highly usable.',
        icon: { name: 'MagicWandIcon', width: 64 },
        image: prefixed('/api/images/work/other/talk-n-walk.png')
      },
      {
        title: 'Your Pixel-Perfect Partner',
        paragraph: 'From initial mockups to production-ready code, I collaborate with teams to deliver flawless interfaces. Every layout is meticulously crafted to balance aesthetics, usability, and frontend performance for US tech standards.',
        icon: { name: 'MagicWandIcon', width: 64 },
        image: prefixed('/api/images/work/totalhealthdentalcare/desktop/2.png')
      }
    ],

    footerMainContent: {
      link: '/contact',
      start: 'Let’s make',
      end: 'something wonderful'
    },

    meta: {
      title: 'Pixel-Perfect Layouts | Our Expertise — Abdul | Frontend & UI Excellence',
      description: 'Transform concepts into flawless, responsive, and interactive interfaces'
    },

    footerData: {
      global: {
        heading: 'I work globally',
        email: 'contact@helloabdul.com',
        buttonText: 'Hire me'
      },
      offices: [
        {
          country: 'USA',
          city: 'Orlando, Florida',
          phone: '+1 (321) 300-2393'
        },
        {
          country: 'Pakistan',
          city: 'Lahore, Punjab',
          phone: '+92 (329) 294-7777'
        }
      ],
      copyright: {
        year: '2025',
        text: 'Privacy Policy',
        privacyLink: '/privacy'
      }
    },

    footerSocialLinks: [
      {
        title: 'LinkedIn',
        icon: { name: 'AsteriskIcon', width: 10 },
        href: 'https://www.linkedin.com/company/dev8xofficial/'
      },
      {
        title: 'Instagram',
        icon: { name: 'AsteriskIcon', width: 10 },
        href: 'https://www.instagram.com/dev8xofficial/'
      },
      {
        title: 'Facebook',
        href: 'https://www.facebook.com/profile.php?id=61569289660818'
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
        comment: 'Abdul delivered pixel-perfect layouts that matched the design exactly and translated seamlessly into React components. The precision and attention to detail are outstanding.'
      },
      {
        name: 'Paula McCarville',
        company: 'Curtin University',
        bgColor: '#4C21E2',
        color: '#F0EBFF',
        transformOrigin: 'center top',
        image: 'https://a-us.storyblok.com/f/1017006/1744x1612/4c0927054c/curtin-open-day.jpg',
        comment: 'Working with Abdul ensured our design vision was implemented perfectly in the final product. Every layout and interaction matched our expectations.'
      },
      {
        name: 'Steph Jojart',
        company: 'Schrole',
        bgColor: '#1665A3',
        color: '#E8F5FF',
        transformOrigin: 'top center',
        image: 'https://a-us.storyblok.com/f/1017006/3488x3224/f6a5e2a115/schrole-1744px-x-1612px.jpg',
        comment: 'From mockups to production-ready code, Abdul’s pixel-perfect approach made development effortless and resulted in highly polished interfaces.'
      }
    ]
  },

  {
    slug: 'react-js',
    variant: 'purple',
    tagText: 'React.js',
    heading: 'Build dynamic web applications with React.js',
    image: prefixed('/api/images/work/totalhealthdentalcare/desktop/20.png'),
    iconCards: {
      title: 'Modern, efficient, and scalable',
      paragraph: 'Harness the power of React.js to create fast, interactive, and scalable web applications. From component-based architecture to seamless state management, React ensures your app performs efficiently and delivers a smooth user experience.',
      items: [
        {
          title: 'Modern Foundations',
          description: 'We build fast, scalable applications using React.js—an open-source JavaScript library designed for creating rich, interactive UIs that adapt to your product needs.',
          icon: { name: 'TargetIcon', width: 26 }
        },
        {
          title: 'Component-first Thinking',
          description: 'React’s modular architecture enables us to design reusable, isolated components that scale with your application and support long-term maintainability.',
          icon: { name: 'GPSIcon', width: 24 }
        },
        {
          title: 'Performance at Scale',
          description: 'Optimised rendering, dynamic routing, and seamless state management ensure high performance even in data-heavy or real-time environments.',
          icon: { name: 'FrameIcon', width: 28 }
        },
        {
          title: 'Built for Integration Design',
          description: 'We craft React.js frontends that work effortlessly with APIs, headless CMSs, and custom backends—adapting to your existing infrastructure with ease.',
          icon: { name: 'HandPalmIcon', width: 28 }
        },
        {
          title: 'Your Development Partner',
          description: 'From architecture to handover, we collaborate closely with your team to create future-ready React applications backed by our expert support and guidance.',
          icon: { name: 'HandshakeIcon', width: 28 }
        }
      ]
    },
    contentAsideImageItems: [
      {
        title: 'Dynamic user experiences',
        paragraph: 'Build fast, dynamic, and highly interactive user interfaces with React.js. Our approach combines the power of reusable components with seamless state management, ensuring smooth and engaging digital experiences that scale effortlessly.',
        icon: { name: 'ReactjsIcon', width: 64 },
        image: prefixed('/api/images/work/other/react_garvan.png')
      },
      {
        title: 'Scalable web applications',
        paragraph: 'Harness the full potential of React to build scalable, high-performance web applications. Whether it’s a single-page app (SPA) or a complex enterprise solution, our React development expertise ensures your app will scale as your user base grows, without sacrificing performance.',
        icon: { name: 'ReactjsIcon', width: 64 },
        image: prefixed('/api/images/work/scheduler/mobile/11.png')
      },
      {
        title: 'Seamless state management',
        paragraph: 'Leverage modern tools like Redux, Context API, and React Query for robust state management across your application. Our approach ensures that your app remains responsive and consistent, no matter how dynamic the data or interactions may be.',
        icon: { name: 'ReactjsIcon', width: 64 },
        image: prefixed('/api/images/work/troophunter/mobile/2.png')
      },
      {
        title: 'Component-based architecture',
        paragraph: 'With React’s component-based structure, we help you break down complex user interfaces into modular, reusable components. This simplifies both development and maintenance, allowing your teams to deliver faster and more efficiently.',
        icon: { name: 'ReactjsIcon', width: 64 },
        image: prefixed('/api/images/work/honeydu/desktop/12.png')
      },
      {
        title: 'Your React Partner',
        paragraph: 'Behind every world-class React application is a collaborative agency-client partnership. We work alongside your team to create bespoke solutions, tailored to your business needs, using React as the backbone for modern, interactive user interfaces.',
        icon: { name: 'ReactjsIcon', width: 64 },
        image: prefixed('/api/images/work/totalhealthdentalcare/desktop/14.png')
      }
    ],
    footerMainContent: {
      link: '/contact',
      start: 'Let’s make',
      end: 'something wonderful'
    },
    meta: {
      title: 'React Developers | Our Expertise — Dev8X | Dev8X: World class digital products',
      description: 'React development specialists'
    },
    footerData: {
      global: {
        heading: 'I work globally',
        email: 'contact@helloabdul.com',
        buttonText: 'Hire me'
      },
      offices: [
        {
          country: 'USA',
          city: 'Orlando, Florida',
          phone: '+1 (321) 300-2393'
        },
        {
          country: 'Pakistan',
          city: 'Lahore, Punjab',
          phone: '+92 (329) 294-7777'
        }
      ],
      // careers: {
      //   heading: 'We’re Growing – Join Our Team',
      //   description: 'Let’s build the future, together.',
      //   link: '/careers',
      //   linkText: 'Explore Careers'
      // },
      copyright: {
        year: '2025',
        text: 'Privacy Policy',
        privacyLink: '/privacy'
      }
    },
    footerSocialLinks: [
      {
        title: 'LinkedIn',
        icon: { name: 'AsteriskIcon', width: 10 },
        href: 'https://www.linkedin.com/company/dev8xofficial/'
      },
      {
        title: 'Instagram',
        icon: { name: 'AsteriskIcon', width: 10 },
        href: 'https://www.instagram.com/dev8xofficial/'
      },
      {
        title: 'Facebook',
        // icon: { name: 'AsteriskIcon', width: 10 },
        href: 'https://www.facebook.com/profile.php?id=61569289660818'
      }
      // {
      //   title: 'Youtube',
      //   href: 'https://www.youtube.com/@Dev8XOfficial-s3v'
      // }
    ],
    testimonials: [
      {
        name: 'Henry Luong',
        company: 'Unios',
        bgColor: '#ffffff',
        color: '#111111',
        transformOrigin: 'center top',
        image: 'https://a-us.storyblok.com/f/1017006/1744x1612/1d5f3959f9/unios.jpeg',
        comment: 'Without a doubt, a number of projects have been won on the back of our new website and project specification toolbox built by the team at Dev8X.'
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
        comment: 'From conception through to launch, the Dev8X team has been nothing short of amazing. I wouldn’t hesitate to recommend Dev8X to any business.'
      }
    ]
  },
  {
    slug: 'next-js',
    variant: 'purple',
    tagText: 'Next.js',
    heading: 'Building fast, scalable, and dynamic web applications',
    image: prefixed('/api/images/work/totalhealthdentalcare/desktop/23.png'),
    iconCards: {
      title: 'Next.js for seamless performance',
      paragraph: 'Harness the power of Next.js to build optimized, lightning-fast web applications. With server-side rendering, static site generation, and API routes, we help teams create high-performing websites that scale effortlessly across devices.',
      items: [
        {
          title: 'Production-ready by design',
          description: 'Build fast, scalable, and secure applications with Next.js—designed from the ground up to perform across every device and connection.',
          icon: { name: 'ShieldIcon', width: 26 }
        },
        {
          title: 'Framework Flexibility',
          description: 'Whether it’s static site generation, server-side rendering or API integration, we’ll harness Next.js features to suit your product’s unique technical requirements.',
          icon: { name: 'NextjsIcon', width: 24 }
        },
        {
          title: 'Blazing Performance',
          description: 'Optimised for speed and SEO, our Next.js solutions take advantage of modern front-end architecture to deliver exceptional load times and smooth interactions.',
          icon: { name: 'LightningIcon', width: 28 }
        },
        {
          title: 'Scalable Foundations',
          description: 'From MVPs to enterprise platforms, we use Next.js as a robust foundation to grow with your needs, making future enhancements faster and easier.',
          icon: { name: 'PuzzlePieceIcon', width: 28 }
        }
      ]
    },
    contentAsideImageItems: [
      {
        title: 'Dynamic & Scalable Web Applications',
        paragraph: 'Leverage the power of Next.js to build fast, scalable, and dynamic web applications. From static sites to complex applications, Next.js enables seamless routing, fast rendering, and enhanced SEO capabilities, allowing you to create an optimized digital experience.',
        icon: { name: 'NextjsIcon', width: 64 },
        image: prefixed('/api/images/work/scheduler/mobile/11.png')
      },
      {
        title: 'Powerful API Routes & Flexibility',
        paragraph: 'Streamline your backend by integrating API routes directly into your Next.js application. Whether you need to fetch data or integrate with third-party services, Next.js makes it easy to handle server-side logic seamlessly, with no extra overhead.',
        icon: { name: 'NextjsIcon', width: 64 },
        image: prefixed('/api/images/work/troophunter/mobile/2.png')
      },
      {
        title: 'Optimized Performance',
        paragraph: 'Next.js provides automatic server-side rendering (SSR) and static site generation (SSG), ensuring your applications load fast and perform well across all devices. We take full advantage of these features to deliver an unparalleled user experience with minimal latency.',
        icon: { name: 'NextjsIcon', width: 64 },
        image: prefixed('/api/images/work/honeydu/desktop/6.png')
      },
      {
        title: 'Seamless User Experiences',
        paragraph: "With Next.js, we can create user-centric experiences that blend dynamic content with static elements, allowing for seamless transitions, real-time updates, and an overall smooth performance. Whether you're building an e-commerce site, blog, or complex SaaS application, Next.js scales effortlessly.",
        icon: { name: 'NextjsIcon', width: 64 },
        image: prefixed('/api/images/work/other/react_garvan.png')
      },
      {
        title: 'Collaborative Development',
        paragraph: 'Building with Next.js requires collaboration at every stage. Our team works closely with you to ensure that every aspect of your project, from component libraries to deployment, is well-aligned with your product roadmap and business goals. With an experienced in-house team of strategists, developers, and designers, we deliver high-quality Next.js solutions that are both efficient and scalable.',
        icon: { name: 'NextjsIcon', width: 64 },
        image: prefixed('/api/images/work/totalhealthdentalcare/desktop/14.png')
      }
    ],
    footerMainContent: {
      link: '/contact',
      start: 'Let’s make',
      end: 'something wonderful'
    },
    meta: {
      title: 'Next Developers | Our Expertise — Dev8X | Dev8X: World class digital products',
      description: 'Next development specialists'
    },
    footerData: {
      global: {
        heading: 'I work globally',
        email: 'contact@helloabdul.com',
        buttonText: 'Hire me'
      },
      offices: [
        {
          country: 'USA',
          city: 'Orlando, Florida',
          phone: '+1 (321) 300-2393'
        },
        {
          country: 'Pakistan',
          city: 'Lahore, Punjab',
          phone: '+92 (329) 294-7777'
        }
      ],
      // careers: {
      //   heading: 'We’re Growing – Join Our Team',
      //   description: 'Let’s build the future, together.',
      //   link: '/careers',
      //   linkText: 'Explore Careers'
      // },
      copyright: {
        year: '2025',
        text: 'Privacy Policy',
        privacyLink: '/privacy'
      }
    },
    footerSocialLinks: [
      {
        title: 'LinkedIn',
        icon: { name: 'AsteriskIcon', width: 10 },
        href: 'https://www.linkedin.com/company/dev8xofficial/'
      },
      {
        title: 'Instagram',
        icon: { name: 'AsteriskIcon', width: 10 },
        href: 'https://www.instagram.com/dev8xofficial/'
      },
      {
        title: 'Facebook',
        // icon: { name: 'AsteriskIcon', width: 10 },
        href: 'https://www.facebook.com/profile.php?id=61569289660818'
      }
      // {
      //   title: 'Youtube',
      //   href: 'https://www.youtube.com/@Dev8XOfficial-s3v'
      // }
    ],
    testimonials: [
      {
        name: 'Henry Luong',
        company: 'Unios',
        bgColor: '#ffffff',
        color: '#111111',
        transformOrigin: 'center top',
        image: 'https://a-us.storyblok.com/f/1017006/1744x1612/1d5f3959f9/unios.jpeg',
        comment: 'Without a doubt, a number of projects have been won on the back of our new website and project specification toolbox built by the team at Dev8X.'
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
        comment: 'From conception through to launch, the Dev8X team has been nothing short of amazing. I wouldn’t hesitate to recommend Dev8X to any business.'
      }
    ]
  },
  {
    slug: 'typescript',
    variant: 'yellow',
    tagText: 'TypeScript',
    heading: 'Strongly typed, scalable applications with TypeScript',
    image: prefixed('/api/images/work/other/macbook-node.png'),

    iconCards: {
      title: 'Build reliable, maintainable code',
      paragraph: 'Leverage TypeScript to write safer, scalable, and maintainable applications. From frontend React/Next.js apps to backend Node.js services, TypeScript ensures type safety, better collaboration, and fewer runtime errors.',
      items: [
        {
          title: 'Type-Safe Development',
          description: 'Catch errors at compile-time rather than runtime. TypeScript’s static typing reduces bugs, improves code readability, and helps teams maintain complex applications efficiently.',
          icon: { name: 'LightningIcon', width: 26 }
        },
        {
          title: 'Scalable Frontend Apps',
          description: 'Build modern, scalable frontend applications with React and Next.js using TypeScript. Strong typing improves component reuse, prop validation, and developer confidence for large-scale projects.',
          icon: { name: 'PointerIcon', width: 24 }
        },
        {
          title: 'Backend Reliability',
          description: 'Implement Node.js APIs and server-side services using TypeScript to enhance maintainability, enforce contracts, and reduce runtime errors in production.',
          icon: { name: 'SeismometerIcon', width: 28 }
        },
        {
          title: 'Best Practices & Patterns',
          description: 'Leverage TypeScript’s advanced features like generics, enums, union types, interfaces, and utility types to enforce consistent coding standards, scalable architecture, and clean code patterns.',
          icon: { name: 'PuzzlePieceIcon', width: 28 }
        }
      ]
    },

    contentAsideImageItems: [
      {
        title: 'Static Typing for Robust Applications',
        paragraph: 'Use TypeScript to define explicit types for variables, functions, and components. This ensures predictable behavior, improves developer productivity, and minimizes bugs in both frontend and backend projects.',
        icon: { name: 'NodejsIcon', width: 64 },
        image: prefixed('/api/images/work/scheduler/mobile/2.png')
      },
      {
        title: 'React + TypeScript for Frontend Excellence',
        paragraph: 'Combine TypeScript with React to build strongly typed components, props, and state. Improve maintainability in large codebases, catch errors early, and enable better IDE support for developers.',
        icon: { name: 'NodejsIcon', width: 64 },
        image: prefixed('/api/images/work/totalhealthdentalcare/desktop/5.png')
      },
      {
        title: 'Node.js + TypeScript for Backend Reliability',
        paragraph: 'Use TypeScript on Node.js to define API contracts, interfaces, and type-safe services. This ensures backend logic is robust, scalable, and easier to maintain across multiple developers and services.',
        icon: { name: 'NodejsIcon', width: 64 },
        image: prefixed('/api/images/work/troophunter/desktop/8.png')
      },
      {
        title: 'Advanced TypeScript Patterns',
        paragraph: 'Implement generics, type guards, discriminated unions, and utility types to design reusable, maintainable, and scalable solutions. Apply design patterns such as repository, singleton, and service patterns with TypeScript to ensure code quality and maintainability.',
        icon: { name: 'NodejsIcon', width: 64 },
        image: prefixed('/api/images/work/honeydu/desktop/23.png')
      }
    ],

    footerMainContent: {
      link: '/contact',
      start: 'Let’s make',
      end: 'something wonderful'
    },

    meta: {
      title: 'TypeScript Developers | Our Expertise — Dev8X | Dev8X: World class digital products',
      description: 'Strongly typed, scalable applications with TypeScript'
    },
    footerData: {
      global: {
        heading: 'I work globally',
        email: 'contact@helloabdul.com',
        buttonText: 'Hire me'
      },
      offices: [
        {
          country: 'USA',
          city: 'Orlando, Florida',
          phone: '+1 (321) 300-2393'
        },
        {
          country: 'Pakistan',
          city: 'Lahore, Punjab',
          phone: '+92 (329) 294-7777'
        }
      ],
      // careers: {
      //   heading: 'We’re Growing – Join Our Team',
      //   description: 'Let’s build the future, together.',
      //   link: '/careers',
      //   linkText: 'Explore Careers'
      // },
      copyright: {
        year: '2025',
        text: 'Privacy Policy',
        privacyLink: '/privacy'
      }
    },
    footerSocialLinks: [
      {
        title: 'LinkedIn',
        icon: { name: 'AsteriskIcon', width: 10 },
        href: 'https://www.linkedin.com/company/dev8xofficial/'
      },
      {
        title: 'Instagram',
        icon: { name: 'AsteriskIcon', width: 10 },
        href: 'https://www.instagram.com/dev8xofficial/'
      },
      {
        title: 'Facebook',
        // icon: { name: 'AsteriskIcon', width: 10 },
        href: 'https://www.facebook.com/profile.php?id=61569289660818'
      }
      // {
      //   title: 'Youtube',
      //   href: 'https://www.youtube.com/@Dev8XOfficial-s3v'
      // }
    ],
    testimonials: [
      {
        name: 'Henry Luong',
        company: 'Unios',
        bgColor: '#ffffff',
        color: '#111111',
        transformOrigin: 'center top',
        image: 'https://a-us.storyblok.com/f/1017006/1744x1612/1d5f3959f9/unios.jpeg',
        comment: 'Without a doubt, a number of projects have been won on the back of our new website and project specification toolbox built by the team at Dev8X.'
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
        comment: 'From conception through to launch, the Dev8X team has been nothing short of amazing. I wouldn’t hesitate to recommend Dev8X to any business.'
      }
    ]
  },
  {
    slug: 'state-management',
    variant: 'blue',
    tagText: 'State Management',
    heading: 'Efficient and scalable state management for modern applications',
    image: prefixed('/api/images/work/other/ansible-ci-cd.png'),

    iconCards: {
      title: 'Control application state with precision',
      paragraph: 'Leverage state management solutions to keep your frontend and backend applications predictable, maintainable, and scalable. Whether using Redux, Zustand, Jotai, or React Context, proper state management improves developer efficiency, reduces bugs, and enhances user experience.',
      items: [
        {
          title: 'Global State Control',
          description: 'Manage application-wide state efficiently with libraries like Redux or Zustand, ensuring predictable updates, easy debugging, and maintainable code for large-scale applications.',
          icon: { name: 'MagicWandIcon', width: 26 }
        },
        {
          title: 'Local & Derived State',
          description: 'Handle component-level state and computed values effectively using React Context, Jotai, or Zustand atoms. Keep local and derived state synchronized for performance and readability.',
          icon: { name: 'PuzzlePieceIcon', width: 24 }
        },
        {
          title: 'Type-Safe State',
          description: 'Combine TypeScript with your state management solution to define interfaces, types, and payloads. This prevents runtime errors, enforces consistency, and improves developer confidence in complex workflows.',
          icon: { name: 'TargetIcon', width: 28 }
        },
        {
          title: 'Best Practices & Patterns',
          description: 'Follow patterns like normalized state, feature-based slices, and middleware for asynchronous workflows. Optimize for scalability, modularity, and maintainability in enterprise-level applications.',
          icon: { name: 'PaintSwatchIcon', width: 28 }
        }
      ]
    },

    contentAsideImageItems: [
      {
        title: 'Predictable Application State',
        paragraph: 'Implement centralized or modular state stores to maintain predictable, traceable, and debuggable application state. This reduces side effects and makes your app easier to maintain across teams.',
        icon: { name: 'InfinityIcon', width: 64 },
        image: prefixed('/api/images/work/other/ansible-automation.png')
      },
      {
        title: 'Frontend State Management',
        paragraph: 'Use Redux, Zustand, or Jotai for robust frontend state management. Proper state handling allows real-time UI updates, efficient caching, and seamless interaction between components in React or Next.js applications.',
        icon: { name: 'InfinityIcon', width: 64 },
        image: prefixed('/api/images/work/other/ansible-ci-cd.png')
      },
      {
        title: 'Backend-Integrated State',
        paragraph: 'Synchronize frontend state with backend APIs and real-time services. Using state management patterns alongside Node.js or GraphQL allows your app to reflect live updates and maintain consistent data across clients.',
        icon: { name: 'InfinityIcon', width: 64 },
        image: prefixed('/api/images/work/other/team-developers-doing-brainstorming.png')
      },
      {
        title: 'Optimized Async Workflows',
        paragraph: 'Handle asynchronous actions efficiently with middleware or atom-based approaches. Fetching, caching, and updating data becomes predictable, reducing unnecessary re-renders and improving UX.',
        icon: { name: 'InfinityIcon', width: 64 },
        image: prefixed('/api/images/work/totalhealthdentalcare/desktop/2.png')
      },
      {
        title: 'Your State Management Partner',
        paragraph: 'We guide organizations in implementing robust, scalable, and maintainable state solutions. From small projects to enterprise applications, we provide strategies, architecture patterns, and best practices to make your apps faster, safer, and easier to maintain.',
        icon: { name: 'InfinityIcon', width: 64 },
        image: prefixed('/api/images/work/honeydu/desktop/23.png')
      }
    ],

    footerMainContent: {
      link: '/contact',
      start: 'Let’s make',
      end: 'something wonderful'
    },

    meta: {
      title: 'State Management Experts | Our Expertise — Dev8X | Dev8X: World class digital products',
      description: 'Efficient and scalable state management for modern applications'
    },

    footerData: {
      global: {
        heading: 'I work globally',
        email: 'contact@helloabdul.com',
        buttonText: 'Hire me'
      },
      offices: [
        {
          country: 'USA',
          city: 'Orlando, Florida',
          phone: '+1 (321) 300-2393'
        },
        {
          country: 'Pakistan',
          city: 'Lahore, Punjab',
          phone: '+92 (329) 294-7777'
        }
      ],
      // careers: {
      //   heading: 'We’re Growing – Join Our Team',
      //   description: 'Let’s build the future, together.',
      //   link: '/careers',
      //   linkText: 'Explore Careers'
      // },
      copyright: {
        year: '2025',
        text: 'Privacy Policy',
        privacyLink: '/privacy'
      }
    },
    footerSocialLinks: [
      {
        title: 'LinkedIn',
        icon: { name: 'AsteriskIcon', width: 10 },
        href: 'https://www.linkedin.com/company/helloabdul/'
      },
      {
        title: 'Instagram',
        icon: { name: 'AsteriskIcon', width: 10 },
        href: 'https://www.instagram.com/dev8xofficial/'
      },
      {
        title: 'Facebook',
        // icon: { name: 'AsteriskIcon', width: 10 },
        href: 'https://www.facebook.com/profile.php?id=61569289660818'
      }
      // {
      //   title: 'Youtube',
      //   href: 'https://www.youtube.com/@Dev8XOfficial-s3v'
      // }
    ],
    testimonials: [
      {
        name: 'Henry Luong',
        company: 'Unios',
        bgColor: '#ffffff',
        color: '#111111',
        transformOrigin: 'center top',
        image: 'https://a-us.storyblok.com/f/1017006/1744x1612/1d5f3959f9/unios.jpeg',
        comment: 'Without a doubt, a number of projects have been won on the back of our new website and project specification toolbox built by the team at Dev8X.'
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
        comment: 'From conception through to launch, the Dev8X team has been nothing short of amazing. I wouldn’t hesitate to recommend Dev8X to any business.'
      }
    ]
  },
  {
    slug: 'ssr-ssg',
    variant: 'blue',
    tagText: 'SSR & SSG',
    heading: 'Optimized rendering with Server-Side & Static Site Generation',
    image: prefixed('/api/images/work/other/developer-identifying-server-issues.png'),

    iconCards: {
      title: 'Fast, SEO-friendly web applications',
      paragraph: 'Leverage SSR and SSG to deliver blazing-fast, SEO-optimized web applications. We help you architect solutions using Next.js or similar frameworks to improve page load speed, enhance search engine visibility, and provide seamless user experiences.',
      items: [
        {
          title: 'Server-Side Rendering (SSR)',
          description: 'Render dynamic pages on the server per request for fast initial load, personalized content, and improved SEO. Ideal for dashboards, e-commerce, and content-heavy applications.',
          icon: { name: 'MagicWandIcon', width: 26 }
        },
        {
          title: 'Static Site Generation (SSG)',
          description: 'Generate HTML at build time for ultra-fast delivery. Perfect for blogs, marketing sites, and documentation. Combine with incremental static regeneration (ISR) for freshness without sacrificing speed.',
          icon: { name: 'PuzzlePieceIcon', width: 24 }
        },
        {
          title: 'Hybrid Rendering Strategies',
          description: 'Combine SSR, SSG, and client-side rendering (CSR) to maximize performance, SEO, and dynamic functionality. Tailor the approach based on page type, data needs, and traffic patterns.',
          icon: { name: 'TargetIcon', width: 28 }
        },
        {
          title: 'Best Practices & Performance',
          description: 'Optimize SSR/SSG pipelines with caching, image optimization, code-splitting, and lazy loading. Use TypeScript for type-safe API calls and ensure your app scales efficiently with traffic.',
          icon: { name: 'PaintSwatchIcon', width: 28 }
        }
      ]
    },

    contentAsideImageItems: [
      {
        title: 'Blazing-Fast Initial Loads',
        paragraph: 'With SSR, pages render on the server for every request, reducing the time to first paint and improving the perception of speed. Ideal for high-traffic applications targeting US audiences who expect instant responsiveness.',
        icon: { name: 'WebServersIcon', width: 64 },
        image: prefixed('/api/images/work/troophunter/mobile/2.png')
      },
      {
        title: 'SEO-Optimized Content',
        paragraph: 'SSG provides pre-rendered HTML pages that search engines can crawl easily, improving SEO and driving organic traffic. Combine with structured data and meta tags to maximize visibility.',
        icon: { name: 'WebServersIcon', width: 64 },
        image: prefixed('/api/images/work/other/proxmox-virtualization.png')
      },
      {
        title: 'Incremental Static Regeneration (ISR)',
        paragraph: 'Update static pages without rebuilding the entire site. ISR allows hybrid approaches, keeping content fresh while maintaining the speed benefits of static generation.',
        icon: { name: 'WebServersIcon', width: 64 },
        image: prefixed('/api/images/work/other/ansible-automation.png')
      },
      {
        title: 'Dynamic & Interactive Experiences',
        paragraph: 'Combine SSR/SSG with client-side React hydration to provide fully interactive UIs. State management libraries like Redux, Zustand, or Jotai can sync server and client states seamlessly.',
        icon: { name: 'WebServersIcon', width: 64 },
        image: prefixed('/api/images/work/other/proxmox-virtualization-graphes.png')
      },
      {
        title: 'Scalable & Maintainable Architecture',
        paragraph: 'Structure your projects to separate API routes, server-rendered pages, and static pages. Use TypeScript for strong typing, modular components, and consistent developer experience across teams.',
        icon: { name: 'WebServersIcon', width: 64 },
        image: prefixed('/api/images/work/other/developer-identifying-server-issues.png')
      },
      {
        title: 'Your SSR & SSG Partner',
        paragraph: 'From setup to optimization, we guide you in implementing SSR and SSG solutions tailored to your business needs. Our team ensures fast, reliable, SEO-friendly web applications that scale with traffic and deliver seamless user experiences.',
        icon: { name: 'WebServersIcon', width: 64 },
        image: prefixed('/api/images/work/other/team-developers-doing-brainstorming.png')
      }
    ],

    footerMainContent: {
      link: '/contact',
      start: 'Let’s make',
      end: 'something wonderful'
    },

    meta: {
      title: 'SSR & SSG Experts | Our Expertise — Dev8X | Dev8X: World class digital products',
      description: 'Optimized rendering with Server-Side & Static Site Generation'
    },
    footerData: {
      global: {
        heading: 'I work globally',
        email: 'contact@helloabdul.com',
        buttonText: 'Hire me'
      },
      offices: [
        {
          country: 'USA',
          city: 'Orlando, Florida',
          phone: '+1 (321) 300-2393'
        },
        {
          country: 'Pakistan',
          city: 'Lahore, Punjab',
          phone: '+92 (329) 294-7777'
        }
      ],
      // careers: {
      //   heading: 'We’re Growing – Join Our Team',
      //   description: 'Let’s build the future, together.',
      //   link: '/careers',
      //   linkText: 'Explore Careers'
      // },
      copyright: {
        year: '2025',
        text: 'Privacy Policy',
        privacyLink: '/privacy'
      }
    },
    footerSocialLinks: [
      {
        title: 'LinkedIn',
        icon: { name: 'AsteriskIcon', width: 10 },
        href: 'https://www.linkedin.com/company/dev8xofficial/'
      },
      {
        title: 'Instagram',
        icon: { name: 'AsteriskIcon', width: 10 },
        href: 'https://www.instagram.com/dev8xofficial/'
      },
      {
        title: 'Facebook',
        // icon: { name: 'AsteriskIcon', width: 10 },
        href: 'https://www.facebook.com/profile.php?id=61569289660818'
      }
      // {
      //   title: 'Youtube',
      //   href: 'https://www.youtube.com/@Dev8XOfficial-s3v'
      // }
    ],
    testimonials: [
      {
        name: 'Henry Luong',
        company: 'Unios',
        bgColor: '#ffffff',
        color: '#111111',
        transformOrigin: 'center top',
        image: 'https://a-us.storyblok.com/f/1017006/1744x1612/1d5f3959f9/unios.jpeg',
        comment: 'Without a doubt, a number of projects have been won on the back of our new website and project specification toolbox built by the team at Dev8X.'
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
        comment: 'From conception through to launch, the Dev8X team has been nothing short of amazing. I wouldn’t hesitate to recommend Dev8X to any business.'
      }
    ]
  },

  {
    slug: 'node-js-express-js',
    variant: 'blue',
    tagText: 'Node.js / Express.js',
    heading: 'Building powerful, scalable backends',
    image: prefixed('/api/images/work/other/scalable-backends.png'),
    iconCards: {
      title: 'Efficient, reliable systems',
      paragraph: 'We design and build backend architectures that scale with your business needs. Our solutions are engineered for performance, reliability, and ease of integration, ensuring your data flows seamlessly through your applications.',
      items: [
        {
          title: 'Robust architecture',
          description: 'We design and build secure, scalable backend systems that power digital experiences with reliability and precision, no matter the complexity.',
          icon: { name: 'PlanetRingIcon', width: 26 }
        },
        {
          title: 'API-first thinking',
          description: 'Whether it’s RESTful or GraphQL, our backend services are designed with integration in mind—supporting seamless connectivity across devices and platforms.',
          icon: { name: 'GlobeIcon', width: 24 }
        },
        {
          title: 'Performance & security',
          description: 'From caching strategies to role-based access and encryption, we ensure your backend performs under pressure while keeping your data protected.',
          icon: { name: 'ShieldIcon', width: 28 }
        },
        {
          title: 'Built to scale',
          description: 'As your product grows, so does your backend. We develop future-proof systems that evolve with your user base, business needs and technical demands.',
          icon: { name: 'GraphAnalysisIcon', width: 28 }
        }
      ]
    },
    contentAsideImageItems: [
      {
        title: 'Robust & Scalable Architectures',
        paragraph: 'We build backend systems that scale with your business, supporting high performance and reliability. From database management to server-side logic, we ensure your infrastructure is robust, flexible, and able to handle growth seamlessly.',
        icon: { name: 'BackendIcon', width: 64 },
        image: prefixed('/api/images/work/totalhealthdentalcare/desktop/5.png')
      },
      {
        title: 'Streamline Data Flow',
        paragraph: 'Transform complex data processes into smooth, efficient workflows. Our backend solutions integrate various data sources, ensuring your systems communicate effectively, reducing friction and enabling timely insights for better decision-making.',
        icon: { name: 'BackendIcon', width: 64 },
        image: prefixed('/api/images/work/other/ui.png')
      },
      {
        title: 'Seamless Integrations',
        paragraph: "We specialize in building custom backend solutions that integrate effortlessly with third-party services, APIs, and platforms. Whether it's payment gateways, CRM systems, or cloud services, we ensure your application connects smoothly and securely with the tools that power your business.",
        icon: { name: 'BackendIcon', width: 64 },
        image: prefixed('/api/images/work/troophunter/mobile/2.png')
      },
      {
        title: 'Your Backend Development Partner',
        paragraph: 'Behind every powerful backend system is a collaborative agency–client partnership. Our team of strategists, developers, and project managers work together to understand your unique needs and deliver tailored backend solutions that drive long-term success. We’re committed to helping you build a system that supports your entire business ecosystem.',
        icon: { name: 'BackendIcon', width: 64 },
        image: prefixed('/api/images/work/honeydu/desktop/23.png')
      }
    ],
    footerMainContent: {
      link: '/contact',
      start: 'Let’s make',
      end: 'something wonderful'
    },
    meta: {
      title: 'Backend Developers | Our Expertise — Dev8X | Dev8X: World class digital products',
      description: 'Building powerful, scalable backends'
    },
    footerData: {
      global: {
        heading: 'I work globally',
        email: 'contact@helloabdul.com',
        buttonText: 'Hire me'
      },
      offices: [
        {
          country: 'USA',
          city: 'Orlando, Florida',
          phone: '+1 (321) 300-2393'
        },
        {
          country: 'Pakistan',
          city: 'Lahore, Punjab',
          phone: '+92 (329) 294-7777'
        }
      ],
      // careers: {
      //   heading: 'We’re Growing – Join Our Team',
      //   description: 'Let’s build the future, together.',
      //   link: '/careers',
      //   linkText: 'Explore Careers'
      // },
      copyright: {
        year: '2025',
        text: 'Privacy Policy',
        privacyLink: '/privacy'
      }
    },
    footerSocialLinks: [
      {
        title: 'LinkedIn',
        icon: { name: 'AsteriskIcon', width: 10 },
        href: 'https://www.linkedin.com/company/dev8xofficial/'
      },
      {
        title: 'Instagram',
        icon: { name: 'AsteriskIcon', width: 10 },
        href: 'https://www.instagram.com/dev8xofficial/'
      },
      {
        title: 'Facebook',
        // icon: { name: 'AsteriskIcon', width: 10 },
        href: 'https://www.facebook.com/profile.php?id=61569289660818'
      }
      // {
      //   title: 'Youtube',
      //   href: 'https://www.youtube.com/@Dev8XOfficial-s3v'
      // }
    ],
    testimonials: [
      {
        name: 'Henry Luong',
        company: 'Unios',
        bgColor: '#ffffff',
        color: '#111111',
        transformOrigin: 'center top',
        image: 'https://a-us.storyblok.com/f/1017006/1744x1612/1d5f3959f9/unios.jpeg',
        comment: 'Without a doubt, a number of projects have been won on the back of our new website and project specification toolbox built by the team at Dev8X.'
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
        comment: 'From conception through to launch, the Dev8X team has been nothing short of amazing. I wouldn’t hesitate to recommend Dev8X to any business.'
      }
    ]
  },
  {
    slug: 'api-integration',
    variant: 'purple',
    tagText: 'API Integration',
    heading: 'Seamless API integration for powerful applications',
    image: prefixed('/api/images/work/other/ansible-ci-cd.png'),

    iconCards: {
      title: 'Connect systems efficiently',
      paragraph: 'Integrate internal and third-party APIs to build connected, scalable, and robust applications. From REST and GraphQL to microservices and event-driven architectures, we ensure smooth data flow and reliable communication between services.',
      items: [
        {
          title: 'REST & GraphQL APIs',
          description: 'Design and implement scalable REST or GraphQL APIs for seamless frontend-backend communication. Ensure predictable responses, caching strategies, and proper versioning to support evolving applications.',
          icon: { name: 'EyeIcon', width: 28 }
        },
        {
          title: 'Third-party integrations',
          description: 'Integrate external services such as payment gateways, analytics, authentication providers, or cloud platforms. We handle authentication, error handling, and data synchronization for reliable operation.',
          icon: { name: 'SparklerIcon', width: 24 }
        },
        {
          title: 'Real-time & event-driven APIs',
          description: 'Leverage WebSockets, server-sent events, and message queues for real-time applications. Build dynamic dashboards, chat systems, notifications, and live data streams with low-latency performance.',
          icon: { name: 'DevicesIcon', width: 28 }
        },
        {
          title: 'Secure & maintainable APIs',
          description: 'Apply authentication, authorization, rate-limiting, and logging to protect your services. Follow industry best practices for maintainable and scalable API design across teams and projects.',
          icon: { name: 'PieChartIcon', width: 28 }
        }
      ]
    },

    contentAsideImageItems: [
      {
        title: 'Reliable Backend Connections',
        paragraph: 'Establish strong backend systems that connect with multiple APIs efficiently. Build modular services to maintain flexibility, allowing teams to extend functionality without impacting core operations.',
        icon: { name: 'DataIcon', width: 64 },
        image: prefixed('/api/images/work/other/ansible-automation.png')
      },
      {
        title: 'Frontend Integration Excellence',
        paragraph: 'Integrate APIs seamlessly into frontend frameworks such as React, Next.js, or Vue. Manage state effectively with Redux, Zustand, or Jotai to reflect live updates, caching, and error handling for improved UX.',
        icon: { name: 'DataIcon', width: 64 },
        image: prefixed('/api/images/work/other/ansible-ci-cd.png')
      },
      {
        title: 'End-to-End API Strategies',
        paragraph: 'From design and documentation to testing and monitoring, we provide end-to-end API solutions. Ensure compatibility, security, and performance across multiple services for scalable and reliable applications.',
        icon: { name: 'DataIcon', width: 64 },
        image: prefixed('/api/images/work/other/team-developers-doing-brainstorming.png')
      }
    ],

    footerMainContent: {
      link: '/contact',
      start: 'Let’s make',
      end: 'something wonderful'
    },

    meta: {
      title: 'API Integration Experts | Our Expertise — Dev8X | Dev8X: World class digital products',
      description: 'Seamless API integration for powerful applications'
    },
    footerData: {
      global: {
        heading: 'We work globally',
        email: 'contact@helloabdul.com',
        buttonText: 'Submit a brief'
      },
      offices: [
        {
          country: 'USA',
          city: 'Orlando, Florida',
          phone: '+1 (321) 300-2393'
        },
        {
          country: 'Pakistan',
          city: 'Lahore, Punjab',
          phone: '+92 (329) 294-7777'
        }
      ],
      careers: {
        heading: 'We’re Growing – Join Our Team',
        description: 'Let’s build the future, together.',
        link: '/careers',
        linkText: 'Explore Careers'
      },
      copyright: {
        year: '2025',
        text: 'Privacy Policy',
        privacyLink: '/privacy'
      }
    },
    footerSocialLinks: [
      {
        title: 'LinkedIn',
        icon: { name: 'AsteriskIcon', width: 10 },
        href: 'https://www.linkedin.com/company/dev8xofficial/'
      },
      {
        title: 'Instagram',
        icon: { name: 'AsteriskIcon', width: 10 },
        href: 'https://www.instagram.com/dev8xofficial/'
      },
      {
        title: 'Facebook',
        // icon: { name: 'AsteriskIcon', width: 10 },
        href: 'https://www.facebook.com/profile.php?id=61569289660818'
      }
      // {
      //   title: 'Youtube',
      //   href: 'https://www.youtube.com/@Dev8XOfficial-s3v'
      // }
    ],
    testimonials: [
      {
        name: 'Henry Luong',
        company: 'Unios',
        bgColor: '#ffffff',
        color: '#111111',
        transformOrigin: 'center top',
        image: 'https://a-us.storyblok.com/f/1017006/1744x1612/1d5f3959f9/unios.jpeg',
        comment: 'Without a doubt, a number of projects have been won on the back of our new website and project specification toolbox built by the team at Dev8X.'
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
        comment: 'From conception through to launch, the Dev8X team has been nothing short of amazing. I wouldn’t hesitate to recommend Dev8X to any business.'
      }
    ]
  },
  {
    slug: 'graphql-rest',
    variant: 'yellow',
    tagText: 'GraphQL / REST',
    heading: 'Build efficient, scalable APIs with GraphQL & REST',
    image: prefixed('/api/images/work/other/macbook-node.png'),

    iconCards: {
      title: 'Modern API solutions',
      paragraph: 'Design and implement robust GraphQL and REST APIs for scalable applications. From dynamic queries and schema design to caching strategies and versioning, we ensure your APIs are reliable, secure, and future-proof.',
      items: [
        {
          title: 'REST API Excellence',
          description: 'Implement RESTful APIs following best practices, including proper resource naming, status codes, versioning, and error handling to ensure maintainable and reliable backend services.',
          icon: { name: 'BackendIcon', width: 26 }
        },
        {
          title: 'GraphQL Mastery',
          description: 'Create flexible GraphQL APIs with well-structured schemas, resolvers, and data loaders. Optimize queries, prevent over-fetching, and ensure secure access through proper authentication and authorization.',
          icon: { name: 'VoltageIcon', width: 24 }
        },
        {
          title: 'Realtime & Subscription APIs',
          description: 'Implement WebSocket or GraphQL subscription endpoints to handle live updates, notifications, and real-time data streams for modern web and mobile applications.',
          icon: { name: 'PuzzlePieceIcon', width: 28 }
        },
        {
          title: 'API Security & Monitoring',
          description: 'Apply OAuth, JWT, API keys, and rate limiting to protect your endpoints. Monitor API performance, error rates, and usage to ensure reliability and scalability.',
          icon: { name: 'ShieldIcon', width: 28 }
        },
        {
          title: 'Integration & Scalability',
          description: 'Design APIs that integrate seamlessly with frontend applications, microservices, and third-party platforms. Ensure your services scale effortlessly as your business grows.',
          icon: { name: 'WebServersIcon', width: 28 }
        }
      ]
    },

    contentAsideImageItems: [
      {
        title: 'Scalable REST APIs',
        paragraph: 'Develop REST APIs optimized for speed, scalability, and maintainability. Use proper routing, middleware, and validation to ensure clean and predictable API behavior for your applications.',
        icon: { name: 'NestjsIcon', width: 64 },
        image: prefixed('/api/images/work/totalhealthdentalcare/desktop/5.png')
      },
      {
        title: 'Flexible GraphQL Endpoints',
        paragraph: 'Design GraphQL schemas to give frontend teams the flexibility to query exactly what they need. Reduce payload sizes, improve performance, and enhance developer experience with strongly-typed queries and reusable resolvers.',
        icon: { name: 'NestjsIcon', width: 64 },
        image: prefixed('/api/images/work/troophunter/desktop/8.png')
      },
      {
        title: 'Real-time APIs & Subscriptions',
        paragraph: 'Implement live data pipelines with WebSocket or GraphQL subscriptions, enabling dynamic dashboards, notifications, and collaborative applications that update in real-time.',
        icon: { name: 'NestjsIcon', width: 64 },
        image: prefixed('/api/images/work/scheduler/mobile/2.png')
      },
      {
        title: 'Your API Strategy Partner',
        paragraph: 'We partner with clients to define the best API strategy for their business, ensuring seamless integration, maintainability, and long-term scalability. From design to deployment, we deliver APIs that empower both developers and end-users.',
        icon: { name: 'NestjsIcon', width: 64 },
        image: prefixed('/api/images/work/honeydu/desktop/23.png')
      }
    ],

    footerMainContent: {
      link: '/contact',
      start: 'Let’s make',
      end: 'something wonderful'
    },

    meta: {
      title: 'GraphQL & REST Experts | Our Expertise — Dev8X | Dev8X: World class digital products',
      description: 'Build efficient, scalable APIs with GraphQL & REST'
    },
    footerData: {
      global: {
        heading: 'We work globally',
        email: 'contact@helloabdul.com',
        buttonText: 'Submit a brief'
      },
      offices: [
        {
          country: 'USA',
          city: 'Orlando, Florida',
          phone: '+1 (321) 300-2393'
        },
        {
          country: 'Pakistan',
          city: 'Lahore, Punjab',
          phone: '+92 (329) 294-7777'
        }
      ],
      careers: {
        heading: 'We’re Growing – Join Our Team',
        description: 'Let’s build the future, together.',
        link: '/careers',
        linkText: 'Explore Careers'
      },
      copyright: {
        year: '2025',
        text: 'Privacy Policy',
        privacyLink: '/privacy'
      }
    },
    footerSocialLinks: [
      {
        title: 'LinkedIn',
        icon: { name: 'AsteriskIcon', width: 10 },
        href: 'https://www.linkedin.com/company/dev8xofficial/'
      },
      {
        title: 'Instagram',
        icon: { name: 'AsteriskIcon', width: 10 },
        href: 'https://www.instagram.com/dev8xofficial/'
      },
      {
        title: 'Facebook',
        // icon: { name: 'AsteriskIcon', width: 10 },
        href: 'https://www.facebook.com/profile.php?id=61569289660818'
      }
      // {
      //   title: 'Youtube',
      //   href: 'https://www.youtube.com/@Dev8XOfficial-s3v'
      // }
    ],
    testimonials: [
      {
        name: 'Henry Luong',
        company: 'Unios',
        bgColor: '#ffffff',
        color: '#111111',
        transformOrigin: 'center top',
        image: 'https://a-us.storyblok.com/f/1017006/1744x1612/1d5f3959f9/unios.jpeg',
        comment: 'Without a doubt, a number of projects have been won on the back of our new website and project specification toolbox built by the team at Dev8X.'
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
        comment: 'From conception through to launch, the Dev8X team has been nothing short of amazing. I wouldn’t hesitate to recommend Dev8X to any business.'
      }
    ]
  },
  {
    slug: 'postgresql',
    variant: 'yellow',
    tagText: 'PostgreSQL',
    heading: 'Powerful, reliable data management with PostgreSQL',
    image: prefixed('/api/images/work/totalhealthdentalcare/desktop/2.png'),
    iconCards: {
      title: 'Robust data handling',
      paragraph: 'Leverage the advanced capabilities of PostgreSQL to manage and store your data with precision. With strong consistency, scalability, and extensibility, PostgreSQL ensures your data is always at its best.',
      items: [
        {
          title: 'Scalable & Secure',
          description: "Whether you're handling thousands or millions of records, we structure PostgreSQL databases for performance, integrity, and long-term scalability—backed by proven security standards.",
          icon: { name: 'ShieldIcon', width: 26 }
        },
        {
          title: 'Tailored Architecture',
          description: 'We design schema and relationships aligned to your product’s unique logic, enabling fast queries, clean data, and simplified application development.',
          icon: { name: 'PuzzlePieceIcon', width: 24 }
        },
        {
          title: 'Migration & Optimisation',
          description: 'From legacy system migrations to performance tuning, we modernise and refine your database infrastructure to keep things running smoothly under pressure.',
          icon: { name: 'ShuffleIcon', width: 28 }
        },
        {
          title: 'Reliable Partner',
          description: 'Our team works closely with yours—from initial setup to ongoing maintenance—to ensure PostgreSQL becomes a powerful and resilient backbone of your digital product.',
          icon: { name: 'HandshakeIcon', width: 28 }
        }
      ]
    },
    contentAsideImageItems: [
      {
        title: 'Optimized Database Solutions',
        paragraph: 'Transform your data into a powerful, scalable resource with PostgreSQL. We specialize in setting up and optimizing PostgreSQL databases that ensure high performance, reliability, and security for your applications, regardless of scale.',
        icon: { name: 'PostgresqlIcon', width: 64 },
        image: prefixed('/api/images/work/scheduler/mobile/2.png')
      },
      {
        title: 'Scalable Data Management',
        paragraph: 'As your business grows, so do your data needs. We design PostgreSQL database architectures that scale with your operations, enabling your team to manage complex datasets with ease, while maintaining lightning-fast access times.',
        icon: { name: 'PostgresqlIcon', width: 64 },
        image: prefixed('/api/images/work/totalhealthdentalcare/desktop/5.png')
      },
      {
        title: 'Custom Queries & Optimizations',
        paragraph: 'Our team excels at creating custom queries, building efficient data models, and optimizing database performance to meet your unique business requirements. From complex joins to stored procedures, we ensure your database works efficiently.',
        icon: { name: 'PostgresqlIcon', width: 64 },
        image: prefixed('/api/images/work/troophunter/desktop/14.png')
      },
      {
        title: 'Seamless Integration',
        paragraph: 'Whether you’re integrating PostgreSQL with your existing tech stack or building a new application, we provide seamless database integration that enhances functionality and simplifies your operations. We ensure your PostgreSQL solution works effortlessly with your environment.',
        icon: { name: 'PostgresqlIcon', width: 64 },
        image: prefixed('/api/images/work/other/payload_search2.png')
      },
      {
        title: 'Your PostgreSQL Experts',
        paragraph: 'Leverage our expertise to unlock the full potential of PostgreSQL for your business. With years of experience in building robust, high-performance database solutions, we help you craft a digital infrastructure that empowers your business to thrive.',
        icon: { name: 'PostgresqlIcon', width: 64 },
        image: prefixed('/api/images/work/honeydu/desktop/23.png')
      }
    ],
    footerMainContent: {
      link: '/contact',
      start: 'Let’s make',
      end: 'something wonderful'
    },
    meta: {
      title: 'PostgreSQL Specialists | Our Expertise — Dev8X | Dev8X: World class digital products',
      description: 'Powerful, reliable data management with PostgreSQL'
    },
    footerData: {
      global: {
        heading: 'I work globally',
        email: 'contact@helloabdul.com',
        buttonText: 'Hire me'
      },
      offices: [
        {
          country: 'USA',
          city: 'Orlando, Florida',
          phone: '+1 (321) 300-2393'
        },
        {
          country: 'Pakistan',
          city: 'Lahore, Punjab',
          phone: '+92 (329) 294-7777'
        }
      ],
      // careers: {
      //   heading: 'We’re Growing – Join Our Team',
      //   description: 'Let’s build the future, together.',
      //   link: '/careers',
      //   linkText: 'Explore Careers'
      // },
      copyright: {
        year: '2025',
        text: 'Privacy Policy',
        privacyLink: '/privacy'
      }
    },
    footerSocialLinks: [
      {
        title: 'LinkedIn',
        icon: { name: 'AsteriskIcon', width: 10 },
        href: 'https://www.linkedin.com/company/dev8xofficial/'
      },
      {
        title: 'Instagram',
        icon: { name: 'AsteriskIcon', width: 10 },
        href: 'https://www.instagram.com/dev8xofficial/'
      },
      {
        title: 'Facebook',
        // icon: { name: 'AsteriskIcon', width: 10 },
        href: 'https://www.facebook.com/profile.php?id=61569289660818'
      }
      // {
      //   title: 'Youtube',
      //   href: 'https://www.youtube.com/@Dev8XOfficial-s3v'
      // }
    ],
    testimonials: [
      {
        name: 'Henry Luong',
        company: 'Unios',
        bgColor: '#ffffff',
        color: '#111111',
        transformOrigin: 'center top',
        image: 'https://a-us.storyblok.com/f/1017006/1744x1612/1d5f3959f9/unios.jpeg',
        comment: 'Without a doubt, a number of projects have been won on the back of our new website and project specification toolbox built by the team at Dev8X.'
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
        comment: 'From conception through to launch, the Dev8X team has been nothing short of amazing. I wouldn’t hesitate to recommend Dev8X to any business.'
      }
    ]
  },
  {
    slug: 'orm-sequelize-prisma',
    variant: 'cyan',
    tagText: 'ORM (Sequelize/Prisma)',
    heading: 'Efficient data management with Sequelize ORM',
    image: prefixed('/api/images/work/other/ui.png'),
    iconCards: {
      title: 'Seamless database interactions',
      paragraph: 'Leverage the power of Sequelize to streamline database operations. With its robust set of features, it simplifies complex queries, models, and migrations, ensuring smooth data flow within your application.',
      items: [
        {
          title: 'Robust Data Architecture',
          description: 'We design and implement structured, scalable ORM solutions using tools like Sequelize and Prisma—ensuring your data flows smoothly and stays in sync across systems.',
          icon: { name: 'DataIcon', width: 26 }
        },
        {
          title: 'Tailored to Your Stack',
          description: 'Whether you’re building with SQL or NoSQL, microservices or monoliths, we align ORM configurations with your tech stack and business needs for maximum flexibility and performance.',
          icon: { name: 'PuzzlePieceIcon', width: 24 }
        },
        {
          title: 'Consistent & Maintainable Code',
          description: 'Create cleaner, more maintainable backend logic with type-safe models, migration tracking, and reusable query logic—improving developer experience and reducing bugs.',
          icon: { name: 'EditIcon', width: 28 }
        },
        {
          title: 'Built for Growth',
          description: 'From MVPs to large-scale applications, our ORM setups are built to evolve. We help teams future-proof their data layer to keep up with growing complexity and changing requirements.',
          icon: { name: 'GraphAnalysisIcon', width: 28 }
        }
      ]
    },
    contentAsideImageItems: [
      {
        title: 'Efficient Data Management',
        paragraph: "Unlock the power of streamlined data management with advanced ORM frameworks like Sequelize and Prisma. Our expertise helps you design and implement seamless database interactions that are both intuitive and high-performance, whether you're building a single application or scaling to enterprise-level systems.",
        icon: { name: 'SequelizeIcon', width: 64 },
        image: prefixed('/api/images/work/totalhealthdentalcare/desktop/5.png')
      },
      {
        title: 'Powerful Querying & Relationships',
        paragraph: 'Leverage the full potential of relational databases by building complex queries and managing relationships effortlessly. With tools like Sequelize and Prisma, we enable you to express even the most intricate data relationships in clean, readable, and efficient code, simplifying your workflows and speeding up development.',
        icon: { name: 'SequelizeIcon', width: 64 },
        image: prefixed('/api/images/work/troophunter/desktop/14.png')
      },
      {
        title: 'Optimized for Performance',
        paragraph: "We focus on creating highly efficient and optimized database queries to ensure your applications perform at their best. Whether you're managing simple CRUD operations or complex aggregations, we help you optimize for speed, reduce latency, and maintain robust data integrity.",
        icon: { name: 'SequelizeIcon', width: 64 },
        image: prefixed('/api/images/work/honeydu/desktop/21.png')
      },
      {
        title: 'Your ORM Experts',
        paragraph: 'With our deep experience in Sequelize and Prisma, we help you unlock the full potential of ORM systems. Our team crafts tailored solutions to ensure your data models are scalable, maintainable, and easy to work with, empowering your developers to focus on delivering value instead of wrestling with database queries.',
        icon: { name: 'SequelizeIcon', width: 64 },
        image: prefixed('/api/images/work/honeydu/desktop/23.png')
      }
    ],
    footerMainContent: {
      link: '/contact',
      start: 'Let’s make',
      end: 'something wonderful'
    },
    meta: {
      title: 'ORM (Sequelize/Prisma) Specialists | Our Expertise — Dev8X | Dev8X: World class digital products',
      description: 'Efficient data management with Sequelize ORM'
    },
    footerData: {
      global: {
        heading: 'I work globally',
        email: 'contact@helloabdul.com',
        buttonText: 'Hire me'
      },
      offices: [
        {
          country: 'USA',
          city: 'Orlando, Florida',
          phone: '+1 (321) 300-2393'
        },
        {
          country: 'Pakistan',
          city: 'Lahore, Punjab',
          phone: '+92 (329) 294-7777'
        }
      ],
      // careers: {
      //   heading: 'We’re Growing – Join Our Team',
      //   description: 'Let’s build the future, together.',
      //   link: '/careers',
      //   linkText: 'Explore Careers'
      // },
      copyright: {
        year: '2025',
        text: 'Privacy Policy',
        privacyLink: '/privacy'
      }
    },
    footerSocialLinks: [
      {
        title: 'LinkedIn',
        icon: { name: 'AsteriskIcon', width: 10 },
        href: 'https://www.linkedin.com/company/dev8xofficial/'
      },
      {
        title: 'Instagram',
        icon: { name: 'AsteriskIcon', width: 10 },
        href: 'https://www.instagram.com/dev8xofficial/'
      },
      {
        title: 'Facebook',
        // icon: { name: 'AsteriskIcon', width: 10 },
        href: 'https://www.facebook.com/profile.php?id=61569289660818'
      }
      // {
      //   title: 'Youtube',
      //   href: 'https://www.youtube.com/@Dev8XOfficial-s3v'
      // }
    ],
    testimonials: [
      {
        name: 'Henry Luong',
        company: 'Unios',
        bgColor: '#ffffff',
        color: '#111111',
        transformOrigin: 'center top',
        image: 'https://a-us.storyblok.com/f/1017006/1744x1612/1d5f3959f9/unios.jpeg',
        comment: 'Without a doubt, a number of projects have been won on the back of our new website and project specification toolbox built by the team at Dev8X.'
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
        comment: 'From conception through to launch, the Dev8X team has been nothing short of amazing. I wouldn’t hesitate to recommend Dev8X to any business.'
      }
    ]
  },

  {
    slug: 'docker',
    variant: 'blue',
    tagText: 'Docker',
    heading: 'Streamline your development with Docker',
    image: prefixed('/api/images/work/other/docker-containerization.png'),
    iconCards: {
      title: 'Effortless containerization',
      paragraph: 'Docker enables fast, consistent, and scalable application deployment. We empower your development teams to package and deploy apps with ease, ensuring a seamless experience across environments.',
      items: [
        {
          title: 'Simplified Containerization',
          description: 'Streamline your development and deployment workflows by leveraging Docker’s containerization technology. We’ll help you create isolated environments that are consistent and reproducible across different stages of development.',
          icon: { name: 'DockerIcon', width: 26 }
        },
        {
          title: 'Efficient Scaling',
          description: "Whether you're scaling up or scaling down, Docker enables seamless management of containers to ensure your application runs smoothly in any environment—local, staging, or production.",
          icon: { name: 'FourDotIcon', width: 24 }
        },
        {
          title: 'CI/CD Integration',
          description: 'Docker integrates effortlessly with CI/CD pipelines, automating your deployments for faster, more reliable releases. From local development to production, Docker ensures consistency and reduces deployment risk.',
          icon: { name: 'InfinityIcon', width: 28 }
        },
        {
          title: 'Cloud-Ready',
          description: 'Docker containers are the foundation for building scalable cloud applications. We’ll assist in setting up your containers to run efficiently on cloud platforms like AWS, GCP, or Azure, ensuring you make the most of your cloud infrastructure.',
          icon: { name: 'SaaSIcon', width: 28 }
        }
      ]
    },
    contentAsideImageItems: [
      {
        title: 'Effortless Containerization',
        paragraph: 'Simplify your application deployment by containerizing your environments with Docker. We streamline your development and deployment processes, ensuring a consistent experience across all platforms, from development to production.',
        icon: { name: 'DockerIcon', width: 64 },
        image: prefixed('/api/images/work/other/ansible-ci-cd.png')
      },
      {
        title: 'Scalable, Reusable Solutions',
        paragraph: 'With Docker, you can scale your applications effortlessly and reuse components across projects. We help you create modular and highly portable solutions that work anywhere, ensuring you maximize efficiency and minimize redundant efforts.',
        icon: { name: 'DockerIcon', width: 64 },
        image: prefixed('/api/images/work/totalhealthdentalcare/desktop/2.png')
      },
      {
        title: 'Optimize Development Workflows',
        paragraph: 'Improve collaboration and streamline workflows with Docker’s containerized environments. By isolating dependencies and minimizing configuration discrepancies, we empower your teams to work faster and more reliably across different stages of the product lifecycle.',
        icon: { name: 'DockerIcon', width: 64 },
        image: prefixed('/api/images/work/troophunter/desktop/23.png')
      },
      {
        title: 'Your Docker Expert Partner',
        paragraph: "Transform your development and deployment processes with our expertise in Docker. Whether you’re just getting started or optimizing your existing containers, we’ll guide you through building scalable, efficient, and reliable containerized solutions. Let us help you take full advantage of Docker's capabilities to enhance your operations and product delivery.",
        icon: { name: 'DockerIcon', width: 64 },
        image: prefixed('/api/images/work/honeydu/desktop/23.png')
      }
    ],
    footerMainContent: {
      link: '/contact',
      start: 'Let’s make',
      end: 'something wonderful'
    },
    meta: {
      title: 'Docker Specialists | Our Expertise — Dev8X | Dev8X: World class digital products',
      description: 'Streamline your development with Docker'
    },
    footerData: {
      global: {
        heading: 'I work globally',
        email: 'contact@helloabdul.com',
        buttonText: 'Hire me'
      },
      offices: [
        {
          country: 'USA',
          city: 'Orlando, Florida',
          phone: '+1 (321) 300-2393'
        },
        {
          country: 'Pakistan',
          city: 'Lahore, Punjab',
          phone: '+92 (329) 294-7777'
        }
      ],
      // careers: {
      //   heading: 'We’re Growing – Join Our Team',
      //   description: 'Let’s build the future, together.',
      //   link: '/careers',
      //   linkText: 'Explore Careers'
      // },
      copyright: {
        year: '2025',
        text: 'Privacy Policy',
        privacyLink: '/privacy'
      }
    },
    footerSocialLinks: [
      {
        title: 'LinkedIn',
        icon: { name: 'AsteriskIcon', width: 10 },
        href: 'https://www.linkedin.com/company/dev8xofficial/'
      },
      {
        title: 'Instagram',
        icon: { name: 'AsteriskIcon', width: 10 },
        href: 'https://www.instagram.com/dev8xofficial/'
      },
      {
        title: 'Facebook',
        // icon: { name: 'AsteriskIcon', width: 10 },
        href: 'https://www.facebook.com/profile.php?id=61569289660818'
      }
      // {
      //   title: 'Youtube',
      //   href: 'https://www.youtube.com/@Dev8XOfficial-s3v'
      // }
    ],
    testimonials: [
      {
        name: 'Henry Luong',
        company: 'Unios',
        bgColor: '#ffffff',
        color: '#111111',
        transformOrigin: 'center top',
        image: 'https://a-us.storyblok.com/f/1017006/1744x1612/1d5f3959f9/unios.jpeg',
        comment: 'Without a doubt, a number of projects have been won on the back of our new website and project specification toolbox built by the team at Dev8X.'
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
        comment: 'From conception through to launch, the Dev8X team has been nothing short of amazing. I wouldn’t hesitate to recommend Dev8X to any business.'
      }
    ]
  },
  {
    slug: 'virtualization',
    variant: 'blue',
    tagText: 'Virtualization',
    heading: 'Empowering seamless digital transformation through virtualization',
    image: prefixed('/api/images/work/other/proxmox-virtualization-ubuntu.png'),
    iconCards: {
      title: 'Virtualization made simple',
      paragraph: 'Harness the power of virtual environments to optimize infrastructure, improve scalability, and drive efficiency. Our approach helps you streamline operations while reducing complexity and cost.',
      items: [
        {
          title: 'Optimised Infrastructure',
          description: 'We design and implement virtualized environments that streamline your IT infrastructure, making it more efficient, scalable, and cost-effective.',
          icon: { name: 'VirtualMachinesIcon', width: 26 }
        },
        {
          title: 'Seamless Integration',
          description: 'From on-premises solutions to cloud-based deployments, we ensure smooth integration with your existing systems, enabling flexibility and scalability.',
          icon: { name: 'PuzzlePieceIcon', width: 24 }
        },
        {
          title: 'Cloud Solutions',
          description: 'Empower your organization with cloud-based virtualization, allowing you to scale resources on demand, optimise workloads, and reduce operational costs.',
          icon: { name: 'SaaSIcon', width: 28 }
        },
        {
          title: 'Performance and Reliability',
          description: 'Our solutions ensure high performance and reliability, minimising downtime while maximizing efficiency across your virtualized infrastructure.',
          icon: { name: 'VoltageIcon', width: 28 }
        }
      ]
    },
    contentAsideImageItems: [
      {
        title: 'Transform your infrastructure',
        paragraph: 'Leverage virtualization technology to optimize and scale your IT environment. Our approach helps streamline resource management, maximize hardware utilization, and simplify the deployment of virtual machines, ensuring your infrastructure is agile, efficient, and future-ready.',
        icon: { name: 'VirtualMachinesIcon', width: 64 },
        image: prefixed('/api/images/work/other/proxmox-virtualization.png')
      },
      {
        title: 'Streamline your operations',
        paragraph: 'Integrate virtualization into your workflow to simplify system administration and improve the efficiency of your IT operations. With streamlined management tools and automated processes, we help you reduce complexity, enhance security, and scale your infrastructure with ease.',
        icon: { name: 'VirtualMachinesIcon', width: 64 },
        image: prefixed('/api/images/work/other/ansible-ci-cd.png')
      },
      {
        title: 'Virtualize with flexibility',
        paragraph: "Whether you're looking to optimize server workloads, run multiple environments on a single host, or enhance your disaster recovery capabilities, we design custom solutions that bring flexibility and scalability to your business. Virtualization allows you to consolidate resources while maintaining the performance your applications demand.",
        icon: { name: 'VirtualMachinesIcon', width: 64 },
        image: prefixed('/api/images/work/other/proxmox-virtualization-graphes.png')
      },
      {
        title: 'Your virtualization partner',
        paragraph: 'At the heart of every successful virtualization project is a strong, collaborative partnership. Our in-house team of engineers and IT specialists work closely with you to design and implement solutions that align with your unique requirements. Together, we’ll create a virtualized environment that supports your organization’s growth and technological ambitions.',
        icon: { name: 'VirtualMachinesIcon', width: 64 },
        image: prefixed('/api/images/work/honeydu/desktop/23.png')
      }
    ],
    footerMainContent: {
      link: '/contact',
      start: 'Let’s make',
      end: 'something wonderful'
    },
    meta: {
      title: 'Virtualization Specialists | Our Expertise — Dev8X | Dev8X: World class digital products',
      description: 'Empowering seamless digital transformation through virtualization'
    },
    footerData: {
      global: {
        heading: 'I work globally',
        email: 'contact@helloabdul.com',
        buttonText: 'Hire me'
      },
      offices: [
        {
          country: 'USA',
          city: 'Orlando, Florida',
          phone: '+1 (321) 300-2393'
        },
        {
          country: 'Pakistan',
          city: 'Lahore, Punjab',
          phone: '+92 (329) 294-7777'
        }
      ],
      // careers: {
      //   heading: 'We’re Growing – Join Our Team',
      //   description: 'Let’s build the future, together.',
      //   link: '/careers',
      //   linkText: 'Explore Careers'
      // },
      copyright: {
        year: '2025',
        text: 'Privacy Policy',
        privacyLink: '/privacy'
      }
    },
    footerSocialLinks: [
      {
        title: 'LinkedIn',
        icon: { name: 'AsteriskIcon', width: 10 },
        href: 'https://www.linkedin.com/company/dev8xofficial/'
      },
      {
        title: 'Instagram',
        icon: { name: 'AsteriskIcon', width: 10 },
        href: 'https://www.instagram.com/dev8xofficial/'
      },
      {
        title: 'Facebook',
        // icon: { name: 'AsteriskIcon', width: 10 },
        href: 'https://www.facebook.com/profile.php?id=61569289660818'
      }
      // {
      //   title: 'Youtube',
      //   href: 'https://www.youtube.com/@Dev8XOfficial-s3v'
      // }
    ],
    testimonials: [
      {
        name: 'Henry Luong',
        company: 'Unios',
        bgColor: '#ffffff',
        color: '#111111',
        transformOrigin: 'center top',
        image: 'https://a-us.storyblok.com/f/1017006/1744x1612/1d5f3959f9/unios.jpeg',
        comment: 'Without a doubt, a number of projects have been won on the back of our new website and project specification toolbox built by the team at Dev8X.'
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
        comment: 'From conception through to launch, the Dev8X team has been nothing short of amazing. I wouldn’t hesitate to recommend Dev8X to any business.'
      }
    ]
  },
  {
    slug: 'ansible-web-servers',
    variant: 'blue',
    tagText: 'Ansible & Web Servers',
    heading: 'Seamless Automation, Effortless Management',
    image: prefixed('/api/images/work/other/ansible-automation.png'),
    iconCards: {
      title: 'Simplify Infrastructure Operations',
      paragraph: 'We specialize in automating and managing your infrastructure with Ansible. From configuration management to application deployment, our solutions help streamline your workflows, reduce manual intervention, and improve system consistency.',
      items: [
        {
          title: 'Effortless Automation',
          description: 'Streamline your infrastructure management with Ansible, automating server configurations and deployment processes for consistency and reliability at scale.',
          icon: { name: 'AnsibleIcon', width: 26 }
        },
        {
          title: 'Optimised for Scalability',
          description: "Whether you're managing a handful of servers or a complex, multi-tier environment, we ensure your web server setup is optimised for performance, security, and scalability.",
          icon: { name: 'MonitorIcon', width: 24 }
        },
        {
          title: 'Seamless Integrations',
          description: 'Integrate your web servers with existing tools and services seamlessly. Our Ansible-based solutions simplify integration, from databases to cloud platforms, to ensure your environment functions smoothly.',
          icon: { name: 'PuzzlePieceIcon', width: 28 }
        },
        {
          title: 'Secure and Reliable',
          description: 'Our solutions focus on securing your web servers, automating patches and updates, and ensuring that best practices are always followed for a bulletproof deployment pipeline.',
          icon: { name: 'ShieldIcon', width: 28 }
        }
      ]
    },
    contentAsideImageItems: [
      {
        title: 'Automate Infrastructure with Ansible',
        paragraph: "Leverage the power of Ansible to automate your infrastructure and streamline server management. With efficient playbooks and modules, we ensure your environments are consistent, repeatable, and scalable, saving you time and reducing human error. Whether you're deploying web servers, databases, or complex multi-tier applications, Ansible makes it easy to manage and configure at scale.",
        icon: { name: 'AnsibleIcon', width: 64 },
        image: prefixed('/api/images/work/other/ansible-ci-cd.png')
      },
      {
        title: 'Scalable Web Server Management',
        paragraph: "Optimise and scale your web servers with streamlined configuration management. We implement industry best practices for configuring and maintaining web servers, ensuring high availability, load balancing, and secure deployment. From Nginx to Apache, we tailor configurations to meet your application's specific needs, ensuring maximum performance and reliability.",
        icon: { name: 'AnsibleIcon', width: 64 },
        image: prefixed('/api/images/work/other/proxmox-virtualization.png')
      },
      {
        title: 'Seamless Deployment & Orchestration',
        paragraph: 'From automated deployment to orchestration across multiple environments, Ansible integrates seamlessly into your CI/CD pipeline. We help you automate every stage of your development lifecycle, from testing and staging to production. With Ansible’s simple yet powerful playbooks, you can deploy, configure, and manage your web servers with minimal effort and maximum efficiency.',
        icon: { name: 'AnsibleIcon', width: 64 },
        image: prefixed('/api/images/work/other/ansible-automation.png')
      },
      {
        title: 'Secure, Reliable, and Efficient',
        paragraph: 'Security and reliability are at the core of our approach. With Ansible, we implement robust security measures across your web servers, including automated patch management, firewall configuration, and secure communications. Our solutions ensure your infrastructure is protected and your web servers remain highly available, resilient, and efficient.',
        icon: { name: 'AnsibleIcon', width: 64 },
        image: prefixed('/api/images/work/other/proxmox-virtualization-graphes.png')
      },
      {
        title: 'Your Infrastructure, Our Expertise',
        paragraph: 'Leverage our deep expertise in Ansible and web server management to optimise your infrastructure and deployment strategies. Our team works closely with you to understand your specific requirements, tailoring solutions that scale with your business. We guide you through every step, from initial configuration to ongoing management, ensuring that your infrastructure evolves smoothly and efficiently as your business grows.',
        icon: { name: 'AnsibleIcon', width: 64 },
        image: prefixed('/api/images/work/other/developer-identifying-server-issues.png')
      }
    ],
    footerMainContent: {
      link: '/contact',
      start: 'Let’s make',
      end: 'something wonderful'
    },
    meta: {
      title: 'Ansible & Web Servers Specialists | Our Expertise — Dev8X | Dev8X: World class digital products',
      description: 'Seamless Automation, Effortless Management'
    },
    footerData: {
      global: {
        heading: 'I work globally',
        email: 'contact@helloabdul.com',
        buttonText: 'Hire me'
      },
      offices: [
        {
          country: 'USA',
          city: 'Orlando, Florida',
          phone: '+1 (321) 300-2393'
        },
        {
          country: 'Pakistan',
          city: 'Lahore, Punjab',
          phone: '+92 (329) 294-7777'
        }
      ],
      // careers: {
      //   heading: 'We’re Growing – Join Our Team',
      //   description: 'Let’s build the future, together.',
      //   link: '/careers',
      //   linkText: 'Explore Careers'
      // },
      copyright: {
        year: '2025',
        text: 'Privacy Policy',
        privacyLink: '/privacy'
      }
    },
    footerSocialLinks: [
      {
        title: 'LinkedIn',
        icon: { name: 'AsteriskIcon', width: 10 },
        href: 'https://www.linkedin.com/company/dev8xofficial/'
      },
      {
        title: 'Instagram',
        icon: { name: 'AsteriskIcon', width: 10 },
        href: 'https://www.instagram.com/dev8xofficial/'
      },
      {
        title: 'Facebook',
        // icon: { name: 'AsteriskIcon', width: 10 },
        href: 'https://www.facebook.com/profile.php?id=61569289660818'
      }
      // {
      //   title: 'Youtube',
      //   href: 'https://www.youtube.com/@Dev8XOfficial-s3v'
      // }
    ],
    testimonials: [
      {
        name: 'Henry Luong',
        company: 'Unios',
        bgColor: '#ffffff',
        color: '#111111',
        transformOrigin: 'center top',
        image: 'https://a-us.storyblok.com/f/1017006/1744x1612/1d5f3959f9/unios.jpeg',
        comment: 'Without a doubt, a number of projects have been won on the back of our new website and project specification toolbox built by the team at Dev8X.'
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
        comment: 'From conception through to launch, the Dev8X team has been nothing short of amazing. I wouldn’t hesitate to recommend Dev8X to any business.'
      }
    ]
  },
  {
    slug: 'aws-vercel-digitalocean',
    variant: 'blue',
    tagText: 'AWS, Vercel, DigitalOcean',
    heading: 'Empowering scalable cloud solutions',
    image: prefixed('/api/images/work/other/developer-identifying-server-issues.png'),
    iconCards: {
      title: 'Cloud infrastructure at its finest',
      paragraph: 'Build reliable, secure, and scalable cloud infrastructures that grow with your business. Our AWS expertise ensures your cloud services are optimized for speed, security, and efficiency.',
      items: [
        {
          title: 'Scalable Cloud Solutions',
          description: 'Whether you’re using AWS, Vercel, or DigitalOcean, we help you leverage the cloud’s power to scale your applications with ease, ensuring flexibility and performance as your business grows.',
          icon: { name: 'PlanetRingIcon', width: 26 }
        },
        {
          title: 'Seamless Deployments',
          description: 'Experience lightning-fast deployments with Vercel’s serverless platform, or streamline your infrastructure with AWS and DigitalOcean’s simple, developer-friendly tools, allowing you to go from code to production effortlessly.',
          icon: { name: 'LightningIcon', width: 24 }
        },
        {
          title: 'Global Reach & Performance',
          description: 'With AWS’s global network, Vercel’s edge optimization, and DigitalOcean’s distributed infrastructure, your applications deliver fast, reliable performance to users around the world, with minimal latency and maximum uptime.',
          icon: { name: 'GlobeIcon', width: 28 }
        },
        {
          title: 'Tailored Infrastructure',
          description: 'We design cloud architectures tailored to your specific needs. From highly scalable AWS environments to DigitalOcean’s simplified droplets and Vercel’s optimized serverless setups, we provide solutions that fit your product roadmap and business objectives.',
          icon: { name: 'PuzzlePieceIcon', width: 28 }
        },
        {
          title: 'Cost-Effective & Secure',
          description: 'We ensure that your cloud infrastructure is not only cost-efficient but also secure. AWS offers robust security features, Vercel provides automated scaling, and DigitalOcean’s streamlined approach minimizes operational overhead while maximizing value.',
          icon: { name: 'ShieldIcon', width: 28 }
        }
      ]
    },
    contentAsideImageItems: [
      {
        title: 'Scalable, Secure, and Cost-Efficient Infrastructure',
        paragraph: "Whether you're running a small application or managing complex enterprise systems, we help you leverage the best of cloud infrastructure. From AWS’s powerful cloud services and Vercel’s high-performance platform to DigitalOcean’s reliable and affordable hosting solutions, we provide the tools to build, scale, and secure your digital products.",
        icon: { name: 'WebServersIcon', width: 64 },
        image: prefixed('/api/images/work/troophunter/mobile/2.png')
      },
      {
        title: 'Optimized for Performance & Speed',
        paragraph: 'Speed is essential in today’s digital landscape. Vercel’s global CDN ensures lightning-fast delivery of your content worldwide, while AWS offers flexible services that scale with your business. DigitalOcean provides cost-effective, high-performance hosting that ensures your website or application delivers fast load times for users around the globe.',
        icon: { name: 'WebServersIcon', width: 64 },
        image: prefixed('/api/images/work/other/proxmox-virtualization.png')
      },
      {
        title: 'Comprehensive Cloud Services',
        paragraph: 'AWS delivers a wide range of services, from computing power and storage to machine learning and databases, ensuring you have everything you need to build a flexible and scalable infrastructure. Vercel focuses on seamless deployment and integration, optimizing your developer experience with automated workflows. DigitalOcean offers simplicity and reliability, giving you straightforward cloud hosting that lets you focus on your product, not your infrastructure.',
        icon: { name: 'WebServersIcon', width: 64 },
        image: prefixed('/api/images/work/other/ansible-automation.png')
      },
      {
        title: 'Security and Reliability Built-In',
        paragraph: 'Security is a priority, and each platform provides best-in-class security features. AWS’s robust security tools help safeguard your data, Vercel’s platform is optimized for secure deployments, and DigitalOcean ensures that your cloud environment remains protected with top-notch security measures. With our expertise in these platforms, we ensure your cloud infrastructure is secure, reliable, and compliant.',
        icon: { name: 'WebServersIcon', width: 64 },
        image: prefixed('/api/images/work/other/proxmox-virtualization-graphes.png')
      },
      {
        title: 'Streamlined Development & Deployment',
        paragraph: 'Develop, deploy, and scale faster with the help of AWS, Vercel, and DigitalOcean. Vercel’s integration with frameworks like Next.js and its seamless deployment features help streamline your development process. AWS provides the flexibility to manage any infrastructure requirement with ease, while DigitalOcean’s intuitive dashboard and cost-effective solutions make it simple to launch and manage applications.',
        icon: { name: 'WebServersIcon', width: 64 },
        image: prefixed('/api/images/work/other/developer-identifying-server-issues.png')
      },
      {
        title: 'Expert Guidance & Support',
        paragraph: 'With years of experience across AWS, Vercel, and DigitalOcean, our team is equipped to guide you through every stage of your cloud journey. Whether you need to scale your infrastructure, optimize performance, or implement secure solutions, we offer proactive support and ensure that your cloud environment is always running at its best.',
        icon: { name: 'WebServersIcon', width: 64 },
        image: prefixed('/api/images/work/other/team-developers-doing-brainstorming.png')
      }
    ],
    footerMainContent: {
      link: '/contact',
      start: 'Let’s make',
      end: 'something wonderful'
    },
    meta: {
      title: 'AWS, Vercel, DigitalOcean Specialists | Our Expertise — Dev8X | Dev8X: World class digital products',
      description: 'Empowering scalable cloud solutions'
    },
    footerData: {
      global: {
        heading: 'I work globally',
        email: 'contact@helloabdul.com',
        buttonText: 'Hire me'
      },
      offices: [
        {
          country: 'USA',
          city: 'Orlando, Florida',
          phone: '+1 (321) 300-2393'
        },
        {
          country: 'Pakistan',
          city: 'Lahore, Punjab',
          phone: '+92 (329) 294-7777'
        }
      ],
      // careers: {
      //   heading: 'We’re Growing – Join Our Team',
      //   description: 'Let’s build the future, together.',
      //   link: '/careers',
      //   linkText: 'Explore Careers'
      // },
      copyright: {
        year: '2025',
        text: 'Privacy Policy',
        privacyLink: '/privacy'
      }
    },
    footerSocialLinks: [
      {
        title: 'LinkedIn',
        icon: { name: 'AsteriskIcon', width: 10 },
        href: 'https://www.linkedin.com/company/dev8xofficial/'
      },
      {
        title: 'Instagram',
        icon: { name: 'AsteriskIcon', width: 10 },
        href: 'https://www.instagram.com/dev8xofficial/'
      },
      {
        title: 'Facebook',
        // icon: { name: 'AsteriskIcon', width: 10 },
        href: 'https://www.facebook.com/profile.php?id=61569289660818'
      }
      // {
      //   title: 'Youtube',
      //   href: 'https://www.youtube.com/@Dev8XOfficial-s3v'
      // }
    ],
    testimonials: [
      {
        name: 'Henry Luong',
        company: 'Unios',
        bgColor: '#ffffff',
        color: '#111111',
        transformOrigin: 'center top',
        image: 'https://a-us.storyblok.com/f/1017006/1744x1612/1d5f3959f9/unios.jpeg',
        comment: 'Without a doubt, a number of projects have been won on the back of our new website and project specification toolbox built by the team at Dev8X.'
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
        comment: 'From conception through to launch, the Dev8X team has been nothing short of amazing. I wouldn’t hesitate to recommend Dev8X to any business.'
      }
    ]
  },
  {
    slug: 'ci-cd',
    variant: 'blue',
    tagText: 'CI/CD',
    heading: 'Streamlined delivery with continuous integration and deployment',
    image: prefixed('/api/images/work/other/ansible-ci-cd.png'),
    iconCards: {
      title: 'Automation that empowers',
      paragraph: 'Leverage the power of CI/CD to automate your development pipeline, ensuring fast, consistent, and reliable software delivery. Our approach optimizes the workflow, from code commit to deployment, for seamless updates and faster time-to-market.',
      items: [
        {
          title: 'Seamless Automation',
          description: 'Automate every step of your development pipeline with robust CI/CD processes, reducing manual intervention and accelerating time to delivery.',
          icon: { name: 'MagicWandIcon', width: 26 }
        },
        {
          title: 'Continuous Integration',
          description: 'Integrate code changes frequently and automatically, ensuring every feature works together smoothly with early detection of issues for more reliable releases.',
          icon: { name: 'PuzzlePieceIcon', width: 24 }
        },
        {
          title: 'Continuous Deployment',
          description: 'Streamline your delivery process by deploying code to production as soon as it passes automated tests, ensuring your application is always up-to-date.',
          icon: { name: 'TargetIcon', width: 28 }
        },
        {
          title: 'Tailored Solutions',
          description: 'Every organization is unique, and so is every CI/CD pipeline. We work closely with you to develop solutions that meet your specific needs, from version control to deployment strategies.',
          icon: { name: 'PaintSwatchIcon', width: 28 }
        }
      ]
    },
    contentAsideImageItems: [
      {
        title: 'Seamless Integration & Deployment',
        paragraph: 'Transform your development pipeline into a fluid and efficient process. With our CI/CD expertise, we streamline the integration of code, automate testing, and deploy with confidence. We help you establish a continuous flow from development to production, ensuring faster time to market with higher quality.',
        icon: { name: 'InfinityIcon', width: 64 },
        image: prefixed('/api/images/work/other/ansible-automation.png')
      },
      {
        title: 'Automated Pipelines for Continuous Success',
        paragraph: 'Take the guesswork out of deployment. By automating your workflows, we ensure that each code change is tested, validated, and deployed seamlessly. Whether you’re handling a monolithic application or microservices, our CI/CD pipelines are built to suit your needs and scale with your growth.',
        icon: { name: 'InfinityIcon', width: 64 },
        image: prefixed('/api/images/work/other/ansible-ci-cd.png')
      },
      {
        title: 'Collaborative Development for Faster Delivery',
        paragraph: 'Integrating your development, testing, and operations teams into a unified workflow is key to delivering quality products. We design and implement CI/CD pipelines that foster collaboration, enabling teams to iterate quickly while maintaining high standards across every stage of development.',
        icon: { name: 'InfinityIcon', width: 64 },
        image: prefixed('/api/images/work/other/team-developers-doing-brainstorming.png')
      },
      {
        title: 'Ensure Quality at Every Stage',
        paragraph: 'Quality assurance is integral to our CI/CD approach. With automated testing and continuous integration, we ensure that each change is thoroughly tested before it reaches production. Our process catches errors early, giving you confidence that your code is always in top shape.',
        icon: { name: 'InfinityIcon', width: 64 },
        image: prefixed('/api/images/work/totalhealthdentalcare/desktop/2.png')
      },
      {
        title: 'Your CI/CD Partner',
        paragraph: 'Behind every efficient CI/CD pipeline is a collaborative partnership. From setup to maintenance, our in-house team of DevOps engineers, developers, and project managers will work with you to create a pipeline tailored to your needs. Together, we ensure faster releases, higher quality, and a streamlined development process.',
        icon: { name: 'InfinityIcon', width: 64 },
        image: prefixed('/api/images/work/honeydu/desktop/23.png')
      }
    ],
    footerMainContent: {
      link: '/contact',
      start: 'Let’s make',
      end: 'something wonderful'
    },
    meta: {
      title: 'CI/CD Specialists | Our Expertise — Dev8X | Dev8X: World class digital products',
      description: 'Streamlined delivery with continuous integration and deployment'
    },
    footerData: {
      global: {
        heading: 'I work globally',
        email: 'contact@helloabdul.com',
        buttonText: 'Hire me'
      },
      offices: [
        {
          country: 'USA',
          city: 'Orlando, Florida',
          phone: '+1 (321) 300-2393'
        },
        {
          country: 'Pakistan',
          city: 'Lahore, Punjab',
          phone: '+92 (329) 294-7777'
        }
      ],
      // careers: {
      //   heading: 'We’re Growing – Join Our Team',
      //   description: 'Let’s build the future, together.',
      //   link: '/careers',
      //   linkText: 'Explore Careers'
      // },
      copyright: {
        year: '2025',
        text: 'Privacy Policy',
        privacyLink: '/privacy'
      }
    },
    footerSocialLinks: [
      {
        title: 'LinkedIn',
        icon: { name: 'AsteriskIcon', width: 10 },
        href: 'https://www.linkedin.com/company/helloabdul/'
      },
      {
        title: 'Instagram',
        icon: { name: 'AsteriskIcon', width: 10 },
        href: 'https://www.instagram.com/dev8xofficial/'
      },
      {
        title: 'Facebook',
        // icon: { name: 'AsteriskIcon', width: 10 },
        href: 'https://www.facebook.com/profile.php?id=61569289660818'
      }
      // {
      //   title: 'Youtube',
      //   href: 'https://www.youtube.com/@Dev8XOfficial-s3v'
      // }
    ],
    testimonials: [
      {
        name: 'Henry Luong',
        company: 'Unios',
        bgColor: '#ffffff',
        color: '#111111',
        transformOrigin: 'center top',
        image: 'https://a-us.storyblok.com/f/1017006/1744x1612/1d5f3959f9/unios.jpeg',
        comment: 'Without a doubt, a number of projects have been won on the back of our new website and project specification toolbox built by the team at Dev8X.'
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
        comment: 'From conception through to launch, the Dev8X team has been nothing short of amazing. I wouldn’t hesitate to recommend Dev8X to any business.'
      }
    ]
  }
];

export default EXPERTISES;
