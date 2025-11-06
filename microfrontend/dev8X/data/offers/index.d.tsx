import { ExpertiseContent } from '@repo/components';
import { prefixed } from '../../utils/helpers';

const OFFERS: ExpertiseContent[] = [
  {
    slug: 'totalhealthdentalcare',
    variant: 'cyan',
    tagText: 'Website',
    heading: 'One Video, One Offer \n THDC, This is for You',
    image: '',
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
        icon: { name: 'PointerIcon', width: 64 }
      },
      {
        title: 'Human experiences',
        paragraph: 'Offer an immersive user experience that captures the essence of your brand and resonates with your target audience. From intuitive navigation to immersive storytelling, every website is meticulously crafted to command attention and leave a lasting impression.',
        icon: { name: 'PointerIcon', width: 64 }
      },
      {
        title: 'Robust, Secure, Flexible',
        paragraph: 'Every website we build is backed by secure and performant infrastructure, tailored to the needs of the organisation. This ensures that your digital presence can scale with demand and offer flexibility to meet the needs of your business over time.',
        icon: { name: 'PointerIcon', width: 64 }
      },
      {
        title: 'Rewarding partnerships',
        paragraph: 'Behind every best-in-class website is a collaborative agency–client partnership. We work in close collaboration with you to ensure outcomes that offer extraordinary experiences while delivering results. Awards are nice, but your success means so much more.',
        icon: { name: 'PointerIcon', width: 64 }
      }
    ],
    meta: {
      title: 'Offer — Dev8X | Dev8X: World class digital products',
      description: 'World-class digital products, idea to execution.'
    },
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
        title: 'LinkedIn',
        icon: { name: 'AsteriskIcon', width: 10 },
        href: 'https://www.linkedin.com/company/dev8x/'
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
    slug: '',
    variant: 'green',
    tagText: 'For Tech Founders',
    heading: 'AI-ready talent. \n Starting at $600/month.',
    paragraph: 'Get vetted React, Next.js, and full-stack developers — or plug-in mini-squads — guided by senior tech leads. Kick off in 7 days with U.S. timezone overlap, transparent reporting, and true startup velocity.',
    image: prefixed('/api/images/work/totalhealthdentalcare/mobile/1.png'),
    iconCards: {
      title: 'Start Small. Scale Fast.',
      paragraph: 'Begin with one developer, scale to a squad — no new contracts, no hassle. Every engagement is managed for quality, speed, and control.',
      items: [
        {
          title: 'Replacement Guarantee',
          description: 'If it’s not the right fit, we’ll assign a vetted replacement developer within 5 business days — no downtime, no disruption.',
          icon: { name: 'RefreshIcon', width: 28 }
        },
        {
          title: 'Full Code Ownership',
          description: 'You retain 100% ownership of code, repos, and docs — we accelerate your build and uphold enterprise-grade standards.',
          icon: { name: 'BackendIcon', width: 26 }
        },
        {
          title: 'Technical Supervision',
          description: 'Every developer is backed by a senior tech lead who ensures code quality, scalable architecture, and consistent best practices.',
          icon: { name: 'AIBrainIcon', width: 26 }
        },
        {
          title: 'Transparent Reporting',
          description: 'Stay in control with weekly sprint summaries, live Git access, and real-time task tracking in Jira or ClickUp.',
          icon: { name: 'SeismometerIcon', width: 22 }
        },
        {
          title: 'Quick Onboarding',
          description: 'Be operational within 7 days. We handle tool setup, environment prep and assets so you focus on delivering business outcomes.',
          icon: { name: 'VoltageIcon', width: 18 }
        },
        {
          title: 'US Time-zone Overlap',
          description: 'Collaborate effortlessly with guaranteed 4-hour overlap with U.S. Eastern Time — ideal for daily stand-ups and sprint reviews.',
          icon: { name: 'PlanetRingIcon', width: 26 }
        },
        {
          title: 'Flexible Payments',
          description: 'Pay bi-weekly for agility or pre-pay 3 months to unlock instant savings — align spend with your growth rhythm.',
          icon: { name: 'CreditCardIcon', width: 26 }
        },
        {
          title: 'Scalable Engagement',
          description: 'Begin with one developer and expand to a full squad anytime — no change in vendor or workflow needed.',
          icon: { name: 'ScaleIcon', width: 26 }
        }
      ]
    },
    contentAsideImageItems: [
      {
        title: 'Vetted Talent',
        paragraph: 'Our developers are hand-picked via rigorous multi-stage assessments to ensure top technical skill, communication clarity and reliability. Fully fluent in English and trained to work as your remote first extension of a U.S. startup team.',
        icon: { name: 'PointerIcon', width: 64 },
        image: prefixed('/api/images/work/scheduler/mobile/2.png')
      },
      {
        title: 'Technical Supervision',
        paragraph: 'Each developer is backed by senior engineers who drive code quality, architectural resilience and best practices. This mentorship ensures your codebase stays scalable, maintainable and ready for growth.',
        icon: { name: 'PointerIcon', width: 64 },
        image: prefixed('/api/images/work/troophunter/mobile/1.png')
      },
      {
        title: 'Fast Onboarding',
        paragraph: 'Skip the lengthy hiring cycle. Simply share your requirements, review pre-vetted profiles and start sprinting within a week. Our streamlined onboarding means your team ramps up with minimal delay.',
        icon: { name: 'PointerIcon', width: 64 },
        image: prefixed('/api/images/work/totalhealthdentalcare/desktop/26.png')
      },
      {
        title: 'Full Code Ownership',
        paragraph: 'We believe in full transparency and your control. You take ownership of all code, repos and documentation — with IP rights and deliverables securely transferred at each milestone.',
        icon: { name: 'PointerIcon', width: 64 },
        image: prefixed('/api/images/work/goldendao/desktop/14.png')
      }
    ],
    footerMainContent: {
      link: '/contact',
      start: 'Ready to ',
      end: 'get started?'
    },
    meta: {
      title: 'SaaS Development Services | Build Your SaaS Product — Dev8X | Dev8X: World class digital products',
      description: 'SaaS Development Services | Build Your SaaS Product — Dev8X | Dev8X: World class digital products'
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
        name: 'Sepand Hokmabadi',
        company: 'Total Health Dental Care',
        bgColor: '#ffffff',
        color: '#111111',
        transformOrigin: 'center top',
        image: prefixed('/api/images/work/scheduler/mobile/7.png'),
        comment: 'They simplified the entire process and made tech feel less overwhelming. Really happy with the results.'
      },
      {
        name: 'Devin Picciolini',
        company: 'Coral',
        bgColor: '#4C21E2',
        color: '#F0EBFF',
        transformOrigin: 'center top',
        image: prefixed('/api/images/work/honeydu/desktop/24.png'),
        comment: 'We had a vague idea — they turned it into a working solution without any stress. Great experience!'
      }
    ],
    faqs: [
      { title: '1. How fast can we kick off?', description: 'Most clients start within 5–7 days. We shortlist vetted engineers, align on goals, and integrate directly into your workflow — no hiring lag.' },
      { title: '2. Are your developers fully dedicated?', description: 'Yes. Every engineer works full-time (160 hrs/month) on your product — no multitasking or shared bandwidth.' },
      { title: '3. How do we communicate and manage work?', description: 'You’ll collaborate in Slack or Teams, track tasks in ClickUp or Jira, and review code in GitHub — full visibility, async-friendly.' },
      { title: '4. Can I manage the developer directly?', description: 'Absolutely. You get direct control, or choose optional tech lead supervision for managed oversight and quality assurance.' },
      { title: '5. What if I need to scale or pivot quickly?', description: 'You can add more developers or upgrade to a Mini Squad within 72 hours — same vetting, same standards, zero onboarding friction.' },
      { title: '6. How do you ensure code quality and reliability?', description: 'Every developer works under senior supervision, with daily code reviews, automated CI/CD pipelines, and strict documentation practices.' },
      { title: '7. Where are your developers based?', description: 'All engineers are based in Pakistan, working U.S.-aligned hours with fluent written English and clear communication standards.' },
      { title: '8. What’s your pricing and payment model?', description: 'Flexible monthly contracts — no lock-ins. Pay via Stripe, Wise, or bank transfer. Choose bi-weekly billing or quarterly prepay discounts.' },
      { title: '9. Do you handle NDAs and IP ownership?', description: 'Yes. Every engagement includes NDA, IP transfer, and confidentiality clauses — your code and IP remain fully yours.' },
      { title: '10. How do you compare to freelance platforms or agencies?', description: 'We’re not a marketplace. All engineers are pre-vetted employees, trained for consistency, velocity, and startup-grade execution.' }
    ],
    offersSlider: [
      {
        id: '1',
        heading: 'Junior Developer',
        price: '$600',
        description: 'Rapid MVP builds & early launches',
        features: ['1–2 yrs experience', 'Daily async updates', 'Senior code review', 'Fast stack fit'],
        categories: ['React', 'NextJS', 'Tailwind', 'Frontend', 'Rapid Delivery', 'Startup Friendly', 'Daily Updates', 'Outcome Driven'],
        buttonText: 'Hire Junior',
        package: 'developers'
      },
      {
        id: '2',
        heading: 'Mid-Level Developer',
        price: '$900',
        description: 'Reliable v1.0 builds & scaling features',
        features: ['3–5 yrs experience', 'API + CI/CD', 'Weekly sprint sync', 'Code ownership mindset'],
        categories: ['React', 'NextJS', 'NodeJS', 'Full Stack', 'API Integration', 'Clean Code', 'Unit Tests', 'Agile', 'Reliable Delivery', 'Remote First Team'],
        buttonText: 'Hire Mid',
        package: 'developers'
      },
      {
        id: '3',
        heading: 'Senior Developer',
        price: '$1,500',
        description: 'System design & tech leadership',
        features: ['5–8 yrs experience', 'Lead architecture', 'Optimize delivery', 'Mentor developers'],
        categories: ['Tech Lead', 'Architecture', 'System Design', 'Performance', 'Mentorship', 'Cloud Ready', 'Scalable Apps', 'Team Leadership'],
        buttonText: 'Hire Senior',
        package: 'developers'
      },
      {
        id: '4',
        heading: 'MVP Squad',
        price: '$4,500',
        description: '2 Devs + QA + PM',
        features: ['4-hr US overlap', 'Agile sprint cycles', 'QA-led testing', 'Fixed-scope launch'],
        categories: ['MVP Launch', 'Startup Sprint', 'Agile PM', 'QA Included', 'US Overlap', 'Build Fast', 'Validated MVPs'],
        buttonText: 'Book a Squad Discovery Call',
        package: 'mini-squads'
      },
      {
        id: '5',
        heading: 'Growth Squad',
        price: '$5,500',
        description: '2 Devs + Designer + QA + PM',
        features: ['CI/CD setup', 'Weekly design sync', 'UX-led upgrades', 'PM-owned delivery'],
        categories: ['Growth Engineering', 'UX Design', 'CI/CD', 'Feature Scaling', 'PM Ownership', 'Figma To Code', 'Outcome Driven'],
        buttonText: 'Start Growth Squad',
        package: 'mini-squads'
      },
      {
        id: '6',
        heading: 'Pro Squad',
        price: '$7,000',
        description: '3 Devs + QA + PM + Senior Lead',
        features: ['DevOps support', 'Weekly tech roadmap', 'Senior-led reviews', 'End-to-end delivery'],
        categories: ['DevOps', 'High Velocity', 'Scalable Architecture', 'Senior Leader', 'Expert Team', 'End-To-End Ownership', 'Cloud Ready'],
        buttonText: 'Start Pro Squad',
        package: 'mini-squads'
      }
    ],
    video: prefixed(`/videos/header/header.mp4`)
  }
];

export default OFFERS;
