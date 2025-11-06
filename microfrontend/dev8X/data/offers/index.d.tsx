import { ExpertiseContent } from '@repo/components';
import { prefixed } from '../../utils/helpers';

const OFFERS: ExpertiseContent[] = [
  // {
  //   slug: 'totalhealthdentalcare',
  //   variant: 'cyan',
  //   tagText: 'Website',
  //   heading: 'One Video, One Offer \n THDC, This is for You',
  //   image: '',
  //   iconCards: {
  //     title: 'Remarkable digital experiences',
  //     paragraph: "We focus on what we do best: For more than 6 years, we've been imagining, crafting, and launching inspiring work on the web.",
  //     items: [
  //       {
  //         title: 'Idea to Execution',
  //         description: 'An entire product delivered in-house, from initial strategy to the end result. This means everything we do is fit for purpose, produced to the highest quality.',
  //         icon: { name: 'VoltageIcon', width: 18 }
  //       },
  //       {
  //         title: 'Full Stack',
  //         description: 'An entire product delivered in-house, from initial strategy to the end result. This means we everything we do is fit for purpose, produced to the highest quality.',
  //         icon: { name: 'BackendIcon', width: 28 }
  //       },
  //       {
  //         title: 'Technology Neutral',
  //         description: 'The best technology is the one that works. We continually listen and observe, so we can recommend the optimal solution for your business problem.',
  //         icon: { name: 'MonitorIcon', width: 22 }
  //       },
  //       {
  //         title: 'Integrated',
  //         description: 'We put your website at the heart of your digital ecosystem, providing secure API integrations and automated solutions across your business systems',
  //         icon: { name: 'PieChartIcon', width: 26 }
  //       }
  //     ]
  //   },
  //   contentAsideImageItems: [
  //     {
  //       title: 'Elevate your brand',
  //       paragraph: 'We blend innovative design, cutting-edge technology, and strategic content to deliver websites that are visually appealing and highly functional. Harness the power of deeply engaging digital experiences to take your brand to the next level.',
  //       icon: { name: 'PointerIcon', width: 64 }
  //     },
  //     {
  //       title: 'Human experiences',
  //       paragraph: 'Offer an immersive user experience that captures the essence of your brand and resonates with your target audience. From intuitive navigation to immersive storytelling, every website is meticulously crafted to command attention and leave a lasting impression.',
  //       icon: { name: 'PointerIcon', width: 64 }
  //     },
  //     {
  //       title: 'Robust, Secure, Flexible',
  //       paragraph: 'Every website we build is backed by secure and performant infrastructure, tailored to the needs of the organisation. This ensures that your digital presence can scale with demand and offer flexibility to meet the needs of your business over time.',
  //       icon: { name: 'PointerIcon', width: 64 }
  //     },
  //     {
  //       title: 'Rewarding partnerships',
  //       paragraph: 'Behind every best-in-class website is a collaborative agency–client partnership. We work in close collaboration with you to ensure outcomes that offer extraordinary experiences while delivering results. Awards are nice, but your success means so much more.',
  //       icon: { name: 'PointerIcon', width: 64 }
  //     }
  //   ],
  //   meta: {
  //     title: 'Offer — Dev8X | Dev8X: World class digital products',
  //     description: 'World-class digital products, idea to execution.'
  //   },
  //   footerMainContent: {
  //     link: '/contact',
  //     start: 'Let’s make',
  //     end: 'something wonderful'
  //   },
  //   footerForm: {
  //     privacy: {
  //       year: '2025',
  //       text: 'Privacy'
  //     },
  //     button: {
  //       text: 'Submit a brief'
  //     }
  //   },
  //   footerSocialLinks: [
  //     {
  //       title: 'LinkedIn',
  //       icon: { name: 'AsteriskIcon', width: 10 },
  //       href: 'https://www.linkedin.com/company/dev8x/'
  //     },
  //     {
  //       title: 'Instagram',
  //       icon: { name: 'AsteriskIcon', width: 10 },
  //       href: 'https://www.instagram.com/dev8xofficial/'
  //     },
  //     {
  //       title: 'Facebook',
  //       // icon: { name: 'AsteriskIcon', width: 10 },
  //       href: 'https://www.facebook.com/profile.php?id=61569289660818'
  //     }
  //     // {
  //     //   title: 'Youtube',
  //     //   href: 'https://www.youtube.com/@Dev8XOfficial-s3v'
  //     // }
  //   ],
  //   testimonials: [
  //     {
  //       name: 'Henry Luong',
  //       company: 'Unios',
  //       bgColor: '#ffffff',
  //       color: '#111111',
  //       transformOrigin: 'center top',
  //       image: 'https://a-us.storyblok.com/f/1017006/1744x1612/1d5f3959f9/unios.jpeg',
  //       comment: 'Without a doubt, a number of projects have been won on the back of our new website and project specification toolbox built by the team at Dev8X.'
  //     },
  //     {
  //       name: 'Paula McCarville',
  //       company: 'Curtin University',
  //       bgColor: '#4C21E2',
  //       color: '#F0EBFF',
  //       transformOrigin: 'center top',
  //       image: 'https://a-us.storyblok.com/f/1017006/1744x1612/4c0927054c/curtin-open-day.jpg',
  //       comment: 'From the very beginning, it was evident that the team truly grasped our brief and vision, effectively translating it into a remarkable reality.'
  //     },
  //     {
  //       name: 'Steph Jojart',
  //       company: 'Schrole',
  //       bgColor: '#1665A3',
  //       color: '#E8F5FF',
  //       transformOrigin: 'top center',
  //       image: 'https://a-us.storyblok.com/f/1017006/3488x3224/f6a5e2a115/schrole-1744px-x-1612px.jpg',
  //       comment: 'From conception through to launch, the Dev8X team has been nothing short of amazing. I wouldn’t hesitate to recommend Dev8X to any business.'
  //     }
  //   ]
  // },
  {
    slug: 'tech-founders',
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
  },
  {
    slug: 'real-estate',
    variant: 'green',
    tagText: 'For Real Estate Companies',
    heading: 'High-converting digital assets. Starting at $80.',
    paragraph: 'Boost visibility, capture motivated buyers and sellers, and automate follow-ups. Launch modern property websites, dynamic listings, and lead systems — built fast with clear reporting and zero complexity.',
    image: prefixed('/api/images/work/totalhealthdentalcare/mobile/1.png'),
    iconCards: {
      title: 'Launch Fast. Convert Faster.',
      paragraph: 'Start with one essential service or stack multiple for full-funnel growth. Every deliverable is built for speed, quality, and measurable lead flow.',
      items: [
        {
          title: 'Speed-to-Market Delivery',
          description: 'Most services ship in 1–3 days — your brand, listings, SEO, and funnels go live without delays.',
          icon: { name: 'RefreshIcon', width: 28 }
        },
        {
          title: 'Full Asset Ownership',
          description: 'You own all websites, listings systems, brand files, and integrations — built on open, scalable tech.',
          icon: { name: 'BackendIcon', width: 26 }
        },
        {
          title: 'Conversion-Focused Build',
          description: 'Every page, form, and lead flow is designed for higher inquiries, more showings, and faster deals.',
          icon: { name: 'AIBrainIcon', width: 26 }
        },
        {
          title: 'Transparent Reporting',
          description: 'Track leads, traffic, and engagement with weekly reports and access to dashboards and analytics.',
          icon: { name: 'SeismometerIcon', width: 22 }
        },
        {
          title: 'Quick Onboarding',
          description: 'We collect brand assets, listings, and goals in minutes — then build while you stay focused on closings.',
          icon: { name: 'VoltageIcon', width: 18 }
        },
        {
          title: 'US Time-zone Overlap',
          description: 'Guaranteed 4-hour U.S. Eastern overlap for feedback, assets, and real-time revision cycles.',
          icon: { name: 'PlanetRingIcon', width: 26 }
        },
        {
          title: 'Flexible Payments',
          description: 'Pay per deliverable or bundle services for discounted rates — ideal for fast-moving brokerages.',
          icon: { name: 'CreditCardIcon', width: 26 }
        },
        {
          title: 'Scalable Engagement',
          description: 'Start with one service and expand to SEO, automation, analytics, or full digital management anytime.',
          icon: { name: 'ScaleIcon', width: 26 }
        }
      ]
    },
    contentAsideImageItems: [
      {
        title: 'Built for Real Estate Velocity',
        paragraph: 'From listing updates to booking calendars, every component is designed to move prospects from browsing to booking — fast.',
        icon: { name: 'HomeIcon', width: 26 },
        image: prefixed('/api/images/work/scheduler/mobile/2.png')
      },
      {
        title: 'Optimized for Local Search',
        paragraph: 'Each deliverable strengthens your visibility in local buyer and seller searches — a critical driver of organic leads.',
        icon: { name: 'MapPinIcon', width: 24 },
        image: prefixed('/api/images/work/troophunter/mobile/1.png')
      },
      {
        title: 'Automation-Ready Systems',
        paragraph: 'Leads flow from forms to CRM, email, or SMS without manual work — freeing your team to close more deals.',
        icon: { name: 'BotIcon', width: 26 },
        image: prefixed('/api/images/work/totalhealthdentalcare/desktop/26.png')
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
      {
        title: '1. How fast can we launch?',
        description: 'Most websites, listings systems, and lead tools go live within 2–3 days — built for rapid visibility and conversions.'
      },
      {
        title: '2. Do you work with small teams or solo agents?',
        description: 'Yes. Our services fit solo agents, teams, and multi-office brokerages with modular pricing and simple onboarding.'
      },
      {
        title: '3. How do revisions and communication work?',
        description: 'You’ll review progress via Slack or email with direct links, Loom videos, and clear revision cycles.'
      },
      {
        title: '4. Do you integrate with my existing CRM?',
        description: 'We support all major CRMs — Follow Up Boss, HubSpot, kvCORE, Zoho, and custom inbox automations.'
      },
      {
        title: '5. What if I need more listings or upgrades later?',
        description: 'You can add new pages, listings, SEO, or automation anytime — all structures are built for easy scaling.'
      },
      {
        title: '6. How do you ensure quality and reliability?',
        description: 'We use tested templates, clean code, speed checks, responsive design, and QA reviews on every project.'
      },
      {
        title: '7. Where is your team based?',
        description: 'Our engineering team operates from Pakistan with U.S.-aligned hours and strong written communication.'
      },
      {
        title: '8. What’s your pricing and payment model?',
        description: 'Flat-rate pricing per service. Pay via Stripe, Wise, or bank transfer. Discounts available for bundles.'
      },
      {
        title: '9. Do you handle NDAs and ownership?',
        description: 'Yes. You retain full ownership of all assets, domains, content, and code — with optional NDA protection.'
      },
      {
        title: '10. How do you compare to typical marketing agencies?',
        description: 'We deliver faster, cost less, and focus on real estate–specific assets built for immediate lead conversion.'
      }
    ],
    offersSlider: [
      {
        id: '1',
        heading: 'Modern Real Estate Website',
        price: '$400–$600',
        description: 'High-converting property brand presence',
        features: ['Responsive design', 'High-performance pages', 'Lead-focused layout', 'SEO-ready setup'],
        categories: ['Website', 'Branding', 'Fast Delivery', 'NextJS', 'High Conversion', 'Mobile Optimized'],
        buttonText: 'Launch My Website',
        package: 'services'
      },
      {
        id: '2',
        heading: 'Listings Automation System',
        price: '$350–$500',
        description: 'Dynamic listings synced to your CMS',
        features: ['Auto-updating listings', 'Google Sheets sync', 'Fast filters', 'Sharp UI'],
        categories: ['Listings', 'Automation', 'CMS', 'Data Sync', 'Full Stack', 'Property Management'],
        buttonText: 'Automate My Listings',
        package: 'services'
      },
      {
        id: '3',
        heading: 'Smart Lead Form + CRM Sync',
        price: '$200–$350',
        description: 'Instantly send leads into your CRM',
        features: ['Form validation', 'Email + CRM sync', 'Real-time alerts', 'Optimized fields'],
        categories: ['Lead Capture', 'CRM Integration', 'Automation', 'NodeJS', 'High Intent Leads'],
        buttonText: 'Install Lead Capture',
        package: 'services'
      },
      {
        id: '4',
        heading: '360° Virtual Tour Setup',
        price: '$400–$600',
        description: 'Immersive 360° tours and galleries',
        features: ['360° viewer', 'HD gallery', 'Fast loading', 'Brand-styled UI'],
        categories: ['Virtual Tours', 'ThreeJS', 'Cloudinary', 'Multimedia', 'High Engagement'],
        buttonText: 'Add Virtual Tours',
        package: 'services'
      },
      {
        id: '5',
        heading: 'Online Appointment Booking',
        price: '$250–$400',
        description: 'Calendar-based viewing scheduling',
        features: ['Google Calendar sync', 'Agent notifications', 'Auto reminders', 'Fast setup'],
        categories: ['Booking System', 'Calendar Sync', 'Automation', 'Lead Flow', 'Frictionless UX'],
        buttonText: 'Activate Booking',
        package: 'services'
      },
      {
        id: '6',
        heading: 'Local SEO + Google Business Setup',
        price: '$250–$400',
        description: 'Rank higher for “Real Estate in [City]”',
        features: ['GBP optimization', 'Keyword targeting', 'Local schema', 'Speed checks'],
        categories: ['SEO', 'Local Ranking', 'GBP', 'Visibility', 'City Targeting'],
        buttonText: 'Boost My Local SEO',
        package: 'services'
      },
      {
        id: '7',
        heading: 'Property Analytics Dashboard',
        price: '$250–$350',
        description: 'Track leads, top listings, and channels',
        features: ['Lead metrics', 'Listing analytics', 'Channel insights', 'Clean dashboard'],
        categories: ['Analytics', 'Dashboard', 'BI', 'Data Insights', 'Performance Tracking'],
        buttonText: 'Install Analytics',
        package: 'services'
      },
      {
        id: '8',
        heading: 'Email & SMS Follow-up System',
        price: '$200–$300',
        description: 'Automated follow-ups for cold leads',
        features: ['Email automation', 'SMS sequences', 'Template library', 'Lead tagging'],
        categories: ['Automation', 'Email', 'SMS', 'Lead Nurture', 'Twilio'],
        buttonText: 'Activate Follow-ups',
        package: 'services'
      },
      {
        id: '9',
        heading: 'Deployment + Hosting Setup',
        price: '$150–$250',
        description: 'Secure hosting with SSL and Cloudflare',
        features: ['SSL included', 'Cloudflare security', 'Fast CDN', 'Docker setup'],
        categories: ['Hosting', 'Security', 'Cloud', 'Deployment', 'Nginx'],
        buttonText: 'Set Up Hosting',
        package: 'services'
      },
      {
        id: '10',
        heading: 'Reviews & Social Proof Widget',
        price: '$80–$120',
        description: 'Live Google reviews embedded on site',
        features: ['Auto sync', 'Brand styling', 'Trust badges', 'Fast integration'],
        categories: ['Social Proof', 'Reviews', 'Credibility', 'Conversion Boost', 'Google API'],
        buttonText: 'Add Reviews Widget',
        package: 'services'
      },
      {
        id: '11',
        heading: 'Speed & Core Web Vitals Upgrade',
        price: '$150–$250',
        description: 'Improve rankings and conversion rates',
        features: ['LCP optimization', 'CDN tuning', 'Image compression', 'Core fixes'],
        categories: ['Performance', 'SEO', 'Page Speed', 'NextJS', 'Conversion Optimization'],
        buttonText: 'Optimize Speed',
        package: 'services'
      },
      {
        id: '12',
        heading: 'Monthly Hosting & Maintenance Plan',
        price: '$150–$300/mo',
        description: 'Ongoing hosting, updates, and backups',
        features: ['Scheduled backups', 'Security patches', 'Performance checks', 'Priority support'],
        categories: ['Maintenance', 'Hosting', 'Security', 'Long-Term Care', 'Monthly Support'],
        buttonText: 'Start Monthly Plan',
        package: 'services'
      }
    ],
    video: prefixed(`/videos/header/header.mp4`)
  },
  {
    slug: 'dentists',
    variant: 'green',
    tagText: 'For Dental Clinics',
    heading: 'Dental-ready digital systems. Starting at $80/project.',
    paragraph: 'Launch modern websites, online booking, and patient automation — built fast with clean design, secure backend, and SEO visibility. Kick off in 3 days with effortless communication and transparent delivery.',
    image: prefixed('/api/images/work/totalhealthdentalcare/mobile/1.png'),
    iconCards: {
      title: 'Start Simple. Grow Smart.',
      paragraph: 'Begin with one service — add more anytime. Each deliverable is managed end-to-end for speed, clarity, and reliable patient-focused outcomes.',
      items: [
        {
          title: 'Fast Delivery',
          description: 'Most projects go live in 1–3 days — rapid setup with zero disruption to your practice operations.',
          icon: { name: 'RefreshIcon', width: 28 }
        },
        {
          title: '100% Ownership',
          description: 'You receive full ownership of your website, data, content, and integrations — no lock-ins, no hidden terms.',
          icon: { name: 'BackendIcon', width: 26 }
        },
        {
          title: 'Technical Oversight',
          description: 'Every project is supervised by senior engineers ensuring security, reliability, and long-term scalability.',
          icon: { name: 'AIBrainIcon', width: 26 }
        },
        {
          title: 'Transparent Tracking',
          description: 'See every update in real time with progress logs, weekly summaries, and easy communication channels.',
          icon: { name: 'SeismometerIcon', width: 22 }
        },
        {
          title: 'Quick Onboarding',
          description: 'Simply share your clinic info — we set up assets, hosting, and integrations so you focus on patients.',
          icon: { name: 'VoltageIcon', width: 18 }
        },
        {
          title: 'U.S. Time-zone Overlap',
          description: 'Collaborate smoothly with daily overlap for reviews, updates, and approvals that fit your clinic hours.',
          icon: { name: 'PlanetRingIcon', width: 26 }
        },
        {
          title: 'Flexible Payments',
          description: 'Pay per project or choose monthly bundles — scale your digital footprint at your own pace.',
          icon: { name: 'CreditCardIcon', width: 26 }
        },
        {
          title: 'Scalable Engagement',
          description: 'Start with a website — expand to booking, SEO, dashboards, or automation without changing teams.',
          icon: { name: 'ScaleIcon', width: 26 }
        }
      ]
    },
    contentAsideImageItems: [
      {
        title: 'Modern Dental Websites',
        paragraph: 'We craft clean, mobile-first websites that highlight treatments, doctors, reviews, and location — built to convert visitors into booked appointments.',
        icon: { name: 'PointerIcon', width: 64 },
        image: prefixed('/api/images/work/scheduler/mobile/2.png')
      },
      {
        title: 'Online Booking Systems',
        paragraph: 'Give patients an easy way to book 24/7. Automated reminders reduce no-shows and streamline daily operations.',
        icon: { name: 'PointerIcon', width: 64 },
        image: prefixed('/api/images/work/troophunter/mobile/1.png')
      },
      {
        title: 'Rapid Setup & Launch',
        paragraph: 'Share basic clinic details and we handle setup, configuration, deployment, and testing — most clinics go live in under 72 hours.',
        icon: { name: 'PointerIcon', width: 64 },
        image: prefixed('/api/images/work/totalhealthdentalcare/desktop/26.png')
      },
      {
        title: 'Full Security & Control',
        paragraph: 'All files, domains, SSL, and patient-related systems remain fully yours. We ensure safe, compliant, high-uptime infrastructure.',
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
      {
        title: '1. How fast can we start?',
        description: 'Most clinics begin within 2–3 days. We align on deliverables, collect basic info, and immediately begin setup.'
      },
      {
        title: '2. Do you offer full implementation?',
        description: 'Yes — from design to hosting to automation. You focus on patients; we handle the entire digital workflow.'
      },
      {
        title: '3. How do we communicate and track progress?',
        description: 'We collaborate via WhatsApp, email, or Slack with simple task tracking and quick daily updates.'
      },
      {
        title: '4. Can we request custom features?',
        description: 'Absolutely — booking flows, multi-branch dashboards, patient portals, invoicing, and more can be customized.'
      },
      {
        title: '5. How quickly can we add more services?',
        description: 'Most add-ons start within 24–48 hours — website → booking → automation → dashboards as your clinic grows.'
      },
      {
        title: '6. How do you ensure data security?',
        description: 'We use secure hosting, SSL, backups, and best-practice architecture ensuring patient and clinic data stays protected.'
      },
      {
        title: '7. Where is your delivery team based?',
        description: 'Our engineers operate from Pakistan with strong written English and daily U.S. time-zone overlap.'
      },
      {
        title: '8. What is your pricing and billing model?',
        description: 'Simple per-project pricing or monthly bundles. Pay via Stripe, Wise, or bank transfer — no long-term contracts.'
      },
      {
        title: '9. Do you sign NDAs and handle ownership?',
        description: 'Yes — all work includes NDA, full rights transfer, and clear security compliance for your clinic.'
      },
      {
        title: '10. How do you compare to agencies?',
        description: 'We specialize in fast, affordable, dental-focused tech — high quality without agency overhead or delays.'
      }
    ],
    offersSlider: [
      {
        id: '1',
        heading: 'Modern Dental Website',
        price: '$450',
        description: 'Clean, mobile-first website built to convert patients',
        features: ['Responsive design', 'Treatments + doctors pages', 'Reviews + map + contact', 'Fast SEO-ready build'],
        categories: ['Website', 'Branding', 'SEO Ready', 'Modern UI', 'Fast Delivery', 'Conversion Focused'],
        buttonText: 'Build My Website',
        package: 'services'
      },
      {
        id: '2',
        heading: 'Online Booking System',
        price: '$400',
        description: 'Let patients schedule appointments 24/7',
        features: ['Booking calendar', 'Doctor availability', 'Google Calendar sync', 'Confirmation emails'],
        categories: ['Booking', 'Calendar Sync', 'Automation', 'Patient Flow', 'Clinic Efficiency', 'Low No-Shows'],
        buttonText: 'Add Booking System',
        package: 'services'
      },
      {
        id: '3',
        heading: 'SMS & Email Reminders',
        price: '$300',
        description: 'Automated reminders that reduce no-shows',
        features: ['SMS notifications', 'Email reminders', 'Custom templates', 'No-show reduction'],
        categories: ['Automation', 'SMS', 'Email', 'Reminders', 'Patient Retention'],
        buttonText: 'Activate Reminders',
        package: 'services'
      },
      {
        id: '4',
        heading: 'Patient Portal',
        price: '$500',
        description: 'Secure login for patients to manage bookings',
        features: ['View appointments', 'Treatment history', 'Invoices', 'Secure authentication'],
        categories: ['Patient Portal', 'Dashboard', 'Security', 'Clinic Systems', 'Retention', 'Modern UX'],
        buttonText: 'Launch Patient Portal',
        package: 'services'
      },
      {
        id: '5',
        heading: 'Doctor/Admin Dashboard',
        price: '$450',
        description: 'Manage appointments, patients, and reminders',
        features: ['Admin panel', 'Patient list', 'Schedule controls', 'Branch support'],
        categories: ['Admin Dashboard', 'Scheduling', 'Patient Records', 'Clinic Management', 'Automation'],
        buttonText: 'Enable Admin Panel',
        package: 'services'
      },
      {
        id: '6',
        heading: 'Local SEO & Google Business',
        price: '$300',
        description: 'Rank higher for “Dentist near me” searches',
        features: ['GBP optimization', 'Local keywords', 'On-page SEO', 'Review insights'],
        categories: ['SEO', 'Local Ranking', 'Visibility', 'Google Maps', 'Leads'],
        buttonText: 'Boost My SEO',
        package: 'services'
      },
      {
        id: '7',
        heading: 'Contact Forms + Auto Responder',
        price: '$120',
        description: 'Capture leads and respond instantly',
        features: ['Contact forms', 'Auto-reply email', 'Lead notifications', 'CRM integration'],
        categories: ['Leads', 'Forms', 'Automation', 'Email', 'Clinic Growth'],
        buttonText: 'Setup Contact System',
        package: 'services'
      },
      {
        id: '8',
        heading: 'Domain, SSL & Hosting Setup',
        price: '$200',
        description: 'Secure, fast hosting with full configuration',
        features: ['Domain setup', 'SSL certificate', 'Cloud deployment', 'Speed optimization'],
        categories: ['Hosting', 'Security', 'Cloud', 'Performance', 'Reliability'],
        buttonText: 'Setup Hosting',
        package: 'services'
      },
      {
        id: '9',
        heading: 'Clinic Analytics Dashboard',
        price: '$250',
        description: 'Track appointments, traffic, and revenue',
        features: ['Charts & insights', 'Appointments data', 'Traffic stats', 'Growth indicators'],
        categories: ['Analytics', 'Dashboard', 'Insights', 'Revenue', 'Data'],
        buttonText: 'Add Analytics',
        package: 'services'
      },
      {
        id: '10',
        heading: 'Google Reviews Widget',
        price: '$100',
        description: 'Show live reviews on your website',
        features: ['Live review feed', 'Trust boost', 'Auto-update', 'Easy embedding'],
        categories: ['Reviews', 'Trust', 'Credibility', 'Social Proof', 'SEO'],
        buttonText: 'Add Review Widget',
        package: 'services'
      },
      {
        id: '11',
        heading: 'Speed Optimization',
        price: '$200',
        description: 'Boost website speed & improve SEO ranking',
        features: ['Lighthouse fixes', 'CDN caching', 'Image optimization', 'Performance tuning'],
        categories: ['Speed', 'SEO', 'Performance', 'Optimization'],
        buttonText: 'Optimize Speed',
        package: 'services'
      },
      {
        id: '12',
        heading: 'Monthly Support Plan',
        price: '$200/mo',
        description: 'Backups, updates, uptime monitoring',
        features: ['24/7 monitoring', 'Monthly updates', 'Daily backups', 'Security checks'],
        categories: ['Support', 'Maintenance', 'Security', 'DevOps', 'Monitoring'],
        buttonText: 'Start Support Plan',
        package: 'services'
      }
    ],
    video: prefixed(`/videos/header/header.mp4`)
  }
];

export default OFFERS;
