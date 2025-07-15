import { ExpertiseContent } from '@repo/components';

const PROCESS: ExpertiseContent[] = [
  {
    slug: '',
    variant: 'blue',
    tagText: 'Our Process',
    heading: 'A thoughtful process for building impactful digital experiences',
    image: '/api/images/our-process/1.png',
    iconCards: {
      title: 'Remarkable digital experiences',
      paragraph: "We focus on what we do best: For more than 6 years, we've been imagining, crafting, and launching inspiring work on the web.",
      items: [
        {
          title: 'Discovery Phase',
          description: 'Discovery Phase blends strategy, research, and data analysis to deeply understand your business, users, and goals — shaping a clear plan for structure, functionality, and user experience.',
          icon: { name: 'VoltageIcon', width: 18 }
        },
        {
          title: 'Content and SEO',
          description: 'We craft content that aligns with your brand voice and user needs, while our SEO audits and strategies ensure your site ranks high on search engines — from launch to ongoing growth.',
          icon: { name: 'BackendIcon', width: 28 }
        },
        {
          title: 'Creative and User Interface (UI)',
          description: 'We design engaging, user-friendly interfaces through high-fidelity wireframes, brand-aligned UI, and interactive prototypes — ensuring a seamless and visually compelling user experience.',
          icon: { name: 'PaintSwatchIcon', width: 22 }
        },
        {
          title: 'Website Development',
          description: 'Our developers bring your site to life with clean code, responsive design, CMS setup, third-party integrations, and rigorous testing — ensuring fast performance, cross-device compatibility, and a smooth user experience.',
          icon: { name: 'GlobeIcon', width: 26 }
        },
        {
          title: 'Website Launch',
          description: 'As launch nears, we ensure everything runs smoothly with final SEO checks, analytics setup, client training, and two weeks of post-launch bug support setting you up for success from day one.',
          icon: { name: 'GraphAnalysisIcon', width: 26 }
        },
        {
          title: 'Website Maintenance',
          description: 'Website maintenance includes CMS updates, security checks, and backups — keeping your site safe, smooth, and ready for anything.',
          icon: { name: 'ShieldIcon', width: 26 }
        },
        {
          title: 'Website Evaluation and Improvement',
          description: 'Website is never truly finished — we review performance at 3 and 6 months post-launch, analyze conversions, boost SEO with link building, and plan ongoing improvements to keep your site growing and evolving.',
          icon: { name: 'ShuffleIcon', width: 26 }
        }
      ]
    },
    contentAsideImageItems: [
      {
        title: 'Discovery Phase',
        paragraph: '<strong>Research & Analysis</strong> – We assess business needs, conduct competitor and user research, review analytics, and evaluate conversions using tools like Google Analytics, Crazy Egg, and FullStory.<br /> <strong>User Experience Planning</strong> – We create user personas, review site goals, map user journeys, and develop sitemaps and low-fidelity wireframes to shape the structure and flow.<br /> <strong>Technical Requirements</strong> – We define key functionality and document everything in a clear technical specification to guide the website build.',
        icon: { name: 'PointerIcon', width: 64 },
        image: '/api/images/our-process/2.png'
      },
      {
        title: 'Content and SEO',
        paragraph: '<strong>Content review</strong> – We assess messaging, tone, and media balance to ensure your content tells a clear brand story.<br /> <strong>Content plan creation</strong> – We collaborate with clients or stakeholders to write and structure effective content that supports design and brand goals.<br /> <strong>SEO audit and strategy</strong> – Using tools like SEMRush and Google Webmasters, we audit current rankings and create a launch and long-term SEO plan covering site audits, content, and link building.',
        icon: { name: 'PointerIcon', width: 64 },
        image: '/api/images/our-process/3.png'
      },
      {
        title: 'Creative and User Interface (UI)',
        paragraph: '<strong>High fidelity wireframes</strong> – We build detailed layouts with fonts, buttons, and spacing to visualize structure before applying visuals.<br /> <strong>UX and UI design</strong> – We apply brand guidelines and optimize user journeys using visuals, animations, and intuitive design.<br /> <strong>Prototypes and mockups</strong> – With clickable prototypes and animated previews, we refine interactions and collaborate closely with clients for feedback.',
        icon: { name: 'PointerIcon', width: 64 },
        image: '/api/images/our-process/4.png'
      },
      {
        title: 'Website Development',
        paragraph: '<strong>Version control & hosting</strong> – We use GitHub for collaboration and Google Cloud with Nginx for fast, secure hosting.<br /> <strong>CMS, database & integrations</strong> – We set up WordPress or Laravel, create custom fields, and integrate plugins or CRMs like HubSpot and Salesforce.<br /> <strong>Testing & optimisation</strong> – We optimise code, ensure responsive design, test across devices, and complete two feedback rounds before launch.',
        icon: { name: 'PointerIcon', width: 64 },
        image: '/api/images/our-process/5.png'
      },
      {
        title: 'Website Launch',
        paragraph: '<strong>Final SEO and tracking</strong> – We run audits and install tools like Google Analytics and Audience Tracker for performance insights.<br /> <strong>Client training</strong> – We provide hands-on CMS training and a user-friendly manual for easy content updates.<br /> <strong>Post-launch support</strong> – Includes two weeks of free bug tracking to ensure a smooth transition.',
        icon: { name: 'PointerIcon', width: 64 },
        image: '/api/images/our-process/6.png'
      },
      {
        title: 'Website Maintenance',
        paragraph: '<strong>CMS & plugin updates</strong> – Regular updates keep your site secure and prevent vulnerabilities.<br /> <strong>Security checks</strong> – We run routine scans using tools like Securi to detect and block threats.<br /> <strong>Backups</strong> – Local backups are created to safely restore your site if needed.<br /> <strong>Bug reporting</strong> – Clients can report issues through our bug tracker for quick resolution.',
        icon: { name: 'PointerIcon', width: 64 },
        image: '/api/images/our-process/7.png'
      },
      {
        title: 'Website Evaluation and Improvement',
        paragraph: '<strong>Performance analysis</strong> – We review site behavior using tools like FullStory and LookBack.<br /> <strong>Conversion review</strong> – We assess key actions and optimize underperforming areas.<br /> <strong>Link building</strong> – Ongoing SEO is supported through blog content and outreach strategies.',
        icon: { name: 'ShuffleIcon', width: 64 },
        image: '/api/images/our-process/8.png'
      }
    ],

    footerMainContent: {
      link: '/contact',
      start: 'Let’s make',
      end: 'something wonderful'
    },
    meta: {
      title: 'Our Process — Dev8X | Dev8X: World class digital products',
      description: 'A thoughtful process for building impactful digital experiences'
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
  }
];

export default PROCESS;
