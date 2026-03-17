import { OffersContent } from '@repo/components';
import { prefixed } from '../../utils/helpers';
import { COPYRIGHT_YEAR } from '../constants';

const OFFERS: OffersContent[] = [
  {
    slug: 'tech-founders',
    variant: 'blue',
    tagText: 'For Tech Founders',
    heading: 'AI-ready talent. \n Starting at $600/month.',
    paragraph: 'Get vetted React, Next.js, and full-stack developers — or plug-in mini-squads — guided by senior tech leads.<br /><br />  Kick off in <b>7 days</b> with <span><b>U.S. timezone overlap</b></span>, <span><b>transparent reporting</b></span>, and <span><b>true startup velocity</b></span>.',
    image: prefixed('/api/images/work/totalhealthdentalcare/mobile/1.png'),
    iconCards: {
      title: 'Start Small. Scale Fast.',
      paragraph: 'Begin with one developer, scale to a squad — no new contracts, no hassle. Every engagement is managed for quality, speed, and control.',
      items: [
        {
          title: 'Vetted Talent',
          description: 'If it’s not the right fit, we’ll assign a vetted replacement developer within 5 business days — no downtime, no disruption.',
          icon: { name: 'CreditCardIcon', size: 24 }
        },
        // {
        //   title: 'Full Code Ownership',
        //   description: 'You retain 100% ownership of code, repos, and docs — we accelerate your build and uphold enterprise-grade standards.',
        //   icon: { name: 'BackendIcon', size: 24 }
        // },
        // {
        //   title: 'Technical Supervision',
        //   description: 'Every developer is backed by a senior tech lead who ensures code quality, scalable architecture, and consistent best practices.',
        //   icon: { name: 'AIBrainIcon', size: 24 }
        // },
        // {
        //   title: 'Transparent Reporting',
        //   description: 'Stay in control with weekly sprint summaries, live Git access, and real-time task tracking in Jira or ClickUp.',
        //   icon: { name: 'SeismometerIcon', size: 24 }
        // },
        // {
        //   title: 'Quick Onboarding',
        //   description: 'Be operational within 7 days. We handle tool setup, environment prep and assets so you focus on delivering business outcomes.',
        //   icon: { name: 'VoltageIcon', size: 24 }
        // },
        {
          title: 'US Time-zone Overlap',
          description: 'Collaborate effortlessly with guaranteed 4-hour overlap with U.S. Eastern Time — ideal for daily stand-ups and sprint reviews.',
          icon: { name: 'PlanetRingIcon', size: 24 }
        },
        {
          title: 'Flexible Payments',
          description: 'Pay bi-weekly for agility or pre-pay 3 months to unlock instant savings — align spend with your growth rhythm.',
          icon: { name: 'CreditCardIcon', size: 24 }
        },
        {
          title: 'Scalable Engagement',
          description: 'Begin with one developer and expand to a full squad anytime — no change in vendor or workflow needed.',
          icon: { name: 'ScaleIcon', size: 24 }
        }
      ]
    },
    contentAsideImageItems: [
      {
        title: 'Transparent Reporting',
        paragraph: 'Stay in control with weekly sprint summaries, live Git access, and real-time task tracking in Jira or ClickUp — giving you full visibility into progress and priorities. No surprises, no hidden work — everything is documented, traceable, and transparently reported.',
        icon: { name: 'PointerIcon', size: 64 },
        image: prefixed('/api/images/work/scheduler/mobile/2.png')
      },
      {
        title: 'US Time-zone Overlap',
        paragraph: 'Collaborate effortlessly with guaranteed 4-hour overlap with U.S. Eastern Time — ideal for daily stand-ups and sprint reviews. This ensures faster decisions, fewer blockers, and smooth communication without delays, making remote collaboration feel truly in-house.',
        icon: { name: 'PointerIcon', size: 64 },
        image: prefixed('/api/images/work/troophunter/mobile/1.png')
      },
      {
        title: 'Flexible Payments',
        paragraph: 'Pay bi-weekly for agility or pre-pay 3 months to unlock instant savings — align spend with your growth rhythm. Choose the billing model that works for your cash-flow planning, without long-term lock-ins or surprise fees.',
        icon: { name: 'PointerIcon', size: 64 },
        image: prefixed('/api/images/work/totalhealthdentalcare/desktop/26.png')
      },
      {
        title: 'Scalable Engagement',
        paragraph: 'Begin with one developer and expand to a full squad anytime — no change in vendor or workflow needed. Scale at your own pace based on roadmap, traction, and funding milestones, without any operational disruption.',
        icon: { name: 'PointerIcon', size: 64 },
        image: prefixed('/api/images/work/goldendao/desktop/14.png')
      },
      {
        title: 'Transparent Reporting',
        paragraph: 'Stay in control with weekly sprint summaries, live Git access, and real-time task tracking in Jira or ClickUp. You’ll always know progress, blockers, and next steps at a glance.',
        icon: { name: 'PointerIcon', size: 64 },
        image: prefixed('/api/images/work/honeydu/desktop/2.png')
      }
    ],
    footerMainContent: {
      link: '/contact',
      start: 'Ready to ',
      end: 'get started?'
    },
    meta: {
      title: 'Tech Founders Services | Empower Your Startup Vision — Dev8X | Dev8X: World-class digital products',
      description: 'Tech Founders Services | Empower Your Startup Vision — Dev8X | Dev8X: World-class digital products'
    },
    footerData: {
      global: {
        heading: 'We work globally',
        email: 'contact@dev8x.com',
        buttonText: 'Submit a brief'
      },
      offices: [
        {
          country: 'Pakistan (HQ)',
          city: 'Lahore, Punjab',
          phone: '+92 (329) 294-7777'
        },
        {
          country: 'USA (Remote)',
          city: 'San Francisco, CA',
          phone: '+1 (321) 300-2393'
        }
      ],
      // careers: {
      //   heading: 'We're Growing – Join Our Team',
      //   description: 'Let's build the future, together.',
      //   link: '/careers',
      //   linkText: 'Explore Careers'
      // },
      copyright: {
        year: COPYRIGHT_YEAR,
        text: 'Privacy Policy',
        privacyLink: '/privacy'
      }
    },
    footerSocialLinks: [
      {
        title: 'LinkedIn',
        icon: { name: 'AsteriskIcon', size: 10 },
        href: 'https://www.linkedin.com/company/dev8xofficial/'
      },
      {
        title: 'Instagram',
        icon: { name: 'AsteriskIcon', size: 10 },
        href: 'https://www.instagram.com/dev8xofficial/'
      },
      {
        title: 'Facebook',
        // icon: { name: 'AsteriskIcon', size: 10 },
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
        package: 'Developers'
      },
      {
        id: '2',
        heading: 'Mid-Level Developer',
        price: '$900',
        description: 'Reliable v1.0 builds & scaling features',
        features: ['3–5 yrs experience', 'API + CI/CD', 'Weekly sprint sync', 'Code ownership mindset'],
        categories: ['React', 'NextJS', 'NodeJS', 'Full Stack', 'API Integration', 'Clean Code', 'Unit Tests', 'Agile', 'Reliable Delivery', 'Remote First Team'],
        buttonText: 'Hire Mid',
        package: 'Developers'
      },
      {
        id: '3',
        heading: 'Senior Developer',
        price: '$1,500',
        description: 'System design & tech leadership',
        features: ['5–8 yrs experience', 'Lead architecture', 'Optimize delivery', 'Mentor developers'],
        categories: ['Tech Lead', 'Architecture', 'System Design', 'Performance', 'Mentorship', 'Cloud Ready', 'Scalable Apps', 'Team Leadership'],
        buttonText: 'Hire Senior',
        package: 'Developers'
      },
      {
        id: '4',
        heading: 'MVP Squad',
        price: '$4,500',
        description: '2 Devs + QA + PM',
        features: ['4-hr US overlap', 'Agile sprint cycles', 'QA-led testing', 'Fixed-scope launch'],
        categories: ['MVP Launch', 'Startup Sprint', 'Agile PM', 'QA Included', 'US Overlap', 'Build Fast', 'Validated MVPs'],
        buttonText: 'Book a Squad Discovery Call',
        package: 'Mini Squads'
      },
      {
        id: '5',
        heading: 'Growth Squad',
        price: '$5,500',
        description: '2 Devs + Designer + QA + PM',
        features: ['CI/CD setup', 'Weekly design sync', 'UX-led upgrades', 'PM-owned delivery'],
        categories: ['Growth Engineering', 'UX Design', 'CI/CD', 'Feature Scaling', 'PM Ownership', 'Figma To Code', 'Outcome Driven'],
        buttonText: 'Start Growth Squad',
        package: 'Mini Squads'
      },
      {
        id: '6',
        heading: 'Pro Squad',
        price: '$7,000',
        description: '3 Devs + QA + PM + Senior Lead',
        features: ['DevOps support', 'Weekly tech roadmap', 'Senior-led reviews', 'End-to-end delivery'],
        categories: ['DevOps', 'High Velocity', 'Scalable Architecture', 'Senior Leader', 'Expert Team', 'End-To-End Ownership', 'Cloud Ready'],
        buttonText: 'Start Pro Squad',
        package: 'Mini Squads'
      }
    ],
    primaryPlansItems: ['Tech lead supervision', 'Transparent time tracking', '4-hour U.S. overlap', 'Cancel anytime'],
    secondaryPlansItems: ['Dedicated Slack Channel for Communication', 'Weekly Progress & Team Sync Meetings', 'Complete Project Transparency via ClickUp or Jira', 'Flexible Month-to-Month Commitment'],
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
          icon: { name: 'RefreshIcon', size: 24 }
        },
        {
          title: 'Full Asset Ownership',
          description: 'You own all websites, listings systems, brand files, and integrations — built on open, scalable tech.',
          icon: { name: 'BackendIcon', size: 24 }
        },
        {
          title: 'Conversion-Focused Build',
          description: 'Every page, form, and lead flow is designed for higher inquiries, more showings, and faster deals.',
          icon: { name: 'AIBrainIcon', size: 24 }
        },
        {
          title: 'Transparent Reporting',
          description: 'Track leads, traffic, and engagement with weekly reports and access to dashboards and analytics.',
          icon: { name: 'SeismometerIcon', size: 24 }
        }
      ]
    },
    contentAsideImageItems: [
      {
        title: 'Built for Real Estate Velocity',
        paragraph: 'From listing updates to booking calendars, every component is designed to move prospects from browsing to booking — fast.',
        icon: { name: 'HomeIcon', size: 64 },
        image: prefixed('/api/images/work/scheduler/mobile/2.png')
      },
      {
        title: 'Optimized for Local Search',
        paragraph: 'Each deliverable strengthens your visibility in local buyer and seller searches — a critical driver of organic leads.',
        icon: { name: 'MapPinIcon', size: 64 },
        image: prefixed('/api/images/work/honeydu/desktop/10.png')
      },
      {
        title: 'Automation-Ready Systems',
        paragraph: 'Leads flow from forms to CRM, email, or SMS without manual work — freeing your team to close more deals.',
        icon: { name: 'BotIcon', size: 64 },
        image: prefixed('/api/images/work/totalhealthdentalcare/desktop/26.png')
      }
    ],
    footerMainContent: {
      link: '/contact',
      start: 'Ready to ',
      end: 'get started?'
    },
    meta: {
      title: 'Real Estate Development Services | Build Your Real Estate Platform — Dev8X | Dev8X: World-class digital products',
      description: 'Real Estate Development Services | Build Your Real Estate Platform — Dev8X | Dev8X: World-class digital products'
    },

    footerData: {
      global: {
        heading: 'We work globally',
        email: 'contact@dev8x.com',
        buttonText: 'Submit a brief'
      },
      offices: [
        {
          country: 'Pakistan (HQ)',
          city: 'Lahore, Punjab',
          phone: '+92 (329) 294-7777'
        },
        {
          country: 'USA (Remote)',
          city: 'San Francisco, CA',
          phone: '+1 (321) 300-2393'
        }
      ], // careers: {
      //   heading: 'We're Growing – Join Our Team',
      //   description: 'Let's build the future, together.',
      //   link: '/careers',
      //   linkText: 'Explore Careers'
      // },
      copyright: {
        year: COPYRIGHT_YEAR,
        text: 'Privacy Policy',
        privacyLink: '/privacy'
      }
    },
    footerSocialLinks: [
      {
        title: 'LinkedIn',
        icon: { name: 'AsteriskIcon', size: 10 },
        href: 'https://www.linkedin.com/company/dev8xofficial/'
      },
      {
        title: 'Instagram',
        icon: { name: 'AsteriskIcon', size: 10 },
        href: 'https://www.instagram.com/dev8xofficial/'
      },
      {
        title: 'Facebook',
        // icon: { name: 'AsteriskIcon', size: 10 },
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
        description: 'Our engineering team operates from Pakistan with U.S.-aligned hours and b written communication.'
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
        price: '$500',
        description: 'Responsive, high-conversion site for listings and agents',
        features: ['Property pages', 'Agent profiles', 'Testimonials', 'Contact forms'],
        categories: ['Website', 'Branding', 'SEO', 'Lead Capture', 'Fast Delivery', 'Responsive'],
        buttonText: 'Launch My Website',
        package: 'Website & Portal'
      },
      {
        id: '2',
        heading: 'Property Dashboard',
        price: '$280',
        description: 'Track listings, leads, and conversion performance',
        features: ['Charts & KPIs', 'Leads data', 'Traffic insights', 'Revenue trends'],
        categories: ['Analytics', 'Dashboard', 'Insights', 'Growth', 'Data'],
        buttonText: 'Install Analytics',
        package: 'Website & Portal'
      },
      {
        id: '3',
        heading: 'Hosting & Security Setup',
        price: '$200',
        description: 'Domain, SSL, and cloud deployment with backups',
        features: ['Domain setup', 'SSL config', 'Cloud hosting', 'Speed optimization'],
        categories: ['Hosting', 'Security', 'Cloud', 'Performance', 'Reliability'],
        buttonText: 'Set Up Hosting',
        package: 'Website & Portal'
      },
      {
        id: '4',
        heading: 'Listings Automation',
        price: '$450',
        description: 'Dynamic property listings synced from CMS or Sheets',
        features: ['Auto-updating listings', 'CMS integration', 'Filters & search', 'Map view'],
        categories: ['Automation', 'Listings', 'CMS', 'Dynamic', 'Real Estate', 'Efficiency'],
        buttonText: 'Automate My Listings',
        package: 'Automation & Lead Capture'
      },
      {
        id: '5',
        heading: 'Smart Lead Form + CRM',
        price: '$300',
        description: 'Capture and sync leads into your CRM instantly',
        features: ['Custom forms', 'CRM integration', 'Auto-responses', 'Notifications'],
        categories: ['Leads', 'CRM', 'Automation', 'Email', 'Conversion'],
        buttonText: 'Install Lead Capture',
        package: 'Automation & Lead Capture'
      },
      {
        id: '6',
        heading: 'Online Booking System',
        price: '$350',
        description: 'Let buyers schedule viewings or calls online',
        features: ['Calendar sync', 'Agent availability', 'Reminders', 'Integrations'],
        categories: ['Booking', 'Calendar', 'Automation', 'Scheduling', 'Lead Flow'],
        buttonText: 'Activate Booking',
        package: 'Automation & Lead Capture'
      },
      {
        id: '7',
        heading: 'Email & SMS Automation',
        price: '$250',
        description: 'Auto follow-ups for inquiries and cold leads',
        features: ['SMS & email triggers', 'Templates', 'Follow-up rules', 'CRM sync'],
        categories: ['Automation', 'SMS', 'Email', 'Retention', 'Leads'],
        buttonText: 'Activate Automation',
        package: 'Automation & Lead Capture'
      },
      {
        id: '8',
        heading: 'Property Inquiry Chatbot',
        price: '$400',
        description: '24/7 AI chatbot for property leads via WhatsApp & web.',
        features: ['AI + predefined responses', 'Multi-language support', 'CRM / database storage', 'Simple dashboard for agents', 'WhatsApp & web widget'],
        categories: ['Automation', 'Lead Capture', 'AI', 'CRM', 'Property Inquiries'],
        buttonText: 'Activate Chatbot',
        package: 'Automation & Lead Capture'
      },
      {
        id: '9',
        heading: 'Google Business & SEO',
        price: '$300',
        description: 'Rank higher for “Homes in [City]” searches',
        features: ['Local SEO', 'Google Business setup', 'On-page fixes', 'Keyword insights'],
        categories: ['SEO', 'Visibility', 'Local', 'Google', 'Ranking'],
        buttonText: 'Boost My SEO',
        package: 'Marketing'
      },
      {
        id: '10',
        heading: 'Google Reviews Widget',
        price: '$120',
        description: 'Showcase live client reviews for trust & SEO',
        features: ['Live reviews', 'Auto-update', 'SEO boost', 'Easy embed'],
        categories: ['Reviews', 'Trust', 'Social Proof', 'SEO', 'Credibility'],
        buttonText: 'Add Review Widget',
        package: 'Marketing'
      },
      {
        id: '11',
        heading: 'Speed Optimization',
        price: '$200',
        description: 'Faster load times for better conversion & SEO',
        features: ['Lighthouse fixes', 'Caching', 'Image compression', 'Performance tuning'],
        categories: ['Speed', 'Performance', 'SEO', 'Optimization'],
        buttonText: 'Optimize Speed',
        package: 'Performance'
      },
      {
        id: '12',
        heading: 'Monthly Support Plan',
        price: '$250/mo',
        description: 'Ongoing maintenance, backups, and uptime checks',
        features: ['24/7 monitoring', 'Monthly updates', 'Daily backups', 'Security audits'],
        categories: ['Support', 'Maintenance', 'Security', 'Monitoring', 'DevOps'],
        buttonText: 'Start Monthly Plan',
        package: 'Performance'
      },
      {
        id: '13',
        heading: '360° Virtual Tours',
        price: '$550',
        description: 'Interactive property galleries and walkthroughs',
        features: ['3D viewer', 'Image gallery', 'Video embeds', 'Mobile ready'],
        categories: ['Media', 'Virtual Tour', 'Gallery', 'Showcase', 'Modern UX'],
        buttonText: 'Add Virtual Tours',
        package: 'Media & Showcase'
      }
    ],
    primaryPlansItems: ['Dedicated Communication Channel via Slack or Email', 'Weekly Progress Updates & Revision Cycles', 'Full Project Visibility with Live Access to Assets', 'Flexible Payment Plans - Pay Per Project or Monthly'],
    secondaryPlansItems: [''],
    video: prefixed(`/videos/header/header.mp4`)
  },
  {
    slug: 'dentists',
    variant: 'cyan',
    tagText: 'For Dental Clinics',
    heading: 'Dental-ready digital systems. Starting at $80/project.',
    paragraph: 'Launch modern websites, online booking, and patient automation — built fast with clean design, secure backend, and SEO visibility.<br /><br /> Kick off in <span><b>3 days</b></span> with <span><b>effortless communication</b></span> and <span><b>transparent delivery</b></span>.',
    image: prefixed('/api/images/work/totalhealthdentalcare/mobile/1.png'),
    iconCards: {
      title: 'Start Simple. Grow Smart.',
      paragraph: 'Begin with one service — add more anytime. Each deliverable is managed end-to-end for speed, clarity, and reliable patient-focused outcomes.',
      items: [
        {
          title: 'Fast Delivery',
          description: 'Most projects go live in 1–3 days — rapid setup with zero disruption to your practice operations.',
          icon: { name: 'RefreshIcon', size: 24 }
        },
        {
          title: '100% Ownership',
          description: 'You receive full ownership of your website, data, content, and integrations — no lock-ins, no hidden terms.',
          icon: { name: 'BackendIcon', size: 24 }
        },
        {
          title: 'Technical Oversight',
          description: 'Every project is supervised by senior engineers ensuring security, reliability, and long-term scalability.',
          icon: { name: 'AIBrainIcon', size: 24 }
        },
        {
          title: 'Transparent Tracking',
          description: 'See every update in real time with progress logs, weekly summaries, and easy communication channels.',
          icon: { name: 'SeismometerIcon', size: 24 }
        }
      ]
    },
    contentAsideImageItems: [
      {
        title: 'Modern Dental Websites',
        paragraph: 'We craft clean, mobile-first websites that highlight treatments, doctors, reviews, and location — built to convert visitors into booked appointments.',
        icon: { name: 'PointerIcon', size: 64 },
        image: prefixed('/api/images/work/scheduler/mobile/2.png')
      },
      {
        title: 'Online Booking Systems',
        paragraph: 'Give patients an easy way to book 24/7. Automated reminders reduce no-shows and streamline daily operations.',
        icon: { name: 'PointerIcon', size: 64 },
        image: prefixed('/api/images/work/troophunter/mobile/1.png')
      },
      {
        title: 'Rapid Setup & Launch',
        paragraph: 'Share basic clinic details and we handle setup, configuration, deployment, and testing — most clinics go live in under 72 hours.',
        icon: { name: 'PointerIcon', size: 64 },
        image: prefixed('/api/images/work/totalhealthdentalcare/desktop/26.png')
      },
      {
        title: 'Full Security & Control',
        paragraph: 'All files, domains, SSL, and patient-related systems remain fully yours. We ensure safe, compliant, high-uptime infrastructure.',
        icon: { name: 'PointerIcon', size: 64 },
        image: prefixed('/api/images/work/goldendao/desktop/14.png')
      }
    ],
    footerMainContent: {
      link: '/contact',
      start: 'Ready to ',
      end: 'get started?'
    },
    meta: {
      title: 'Dental Marketing & Automation Services | Dev8X | Build Your Dental Brand Fast',
      description: 'Dental Marketing & Automation Services | Dev8X | Build Your Dental Brand Fast'
    },
    footerData: {
      global: {
        heading: 'We work globally',
        email: 'contact@dev8x.com',
        buttonText: 'Submit a brief'
      },
      offices: [
        {
          country: 'Pakistan (HQ)',
          city: 'Lahore, Punjab',
          phone: '+92 (329) 294-7777'
        },
        {
          country: 'USA (Remote)',
          city: 'San Francisco, CA',
          phone: '+1 (321) 300-2393'
        }
      ], // careers: {
      //   heading: 'We're Growing – Join Our Team',
      //   description: 'Let's build the future, together.',
      //   link: '/careers',
      //   linkText: 'Explore Careers'
      // },
      copyright: {
        year: COPYRIGHT_YEAR,
        text: 'Privacy Policy',
        privacyLink: '/privacy'
      }
    },
    footerSocialLinks: [
      {
        title: 'LinkedIn',
        icon: { name: 'AsteriskIcon', size: 10 },
        href: 'https://www.linkedin.com/company/dev8xofficial/'
      },
      {
        title: 'Instagram',
        icon: { name: 'AsteriskIcon', size: 10 },
        href: 'https://www.instagram.com/dev8xofficial/'
      },
      {
        title: 'Facebook',
        // icon: { name: 'AsteriskIcon', size: 10 },
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
        description: 'Our engineers operate from Pakistan with b written English and daily U.S. time-zone overlap.'
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
        price: '$400',
        description: 'Responsive site to showcase services & doctors with SEO-ready structure.',
        features: ['Doctor profiles', 'Service overview', 'SEO-ready structure', 'Appointment CTA'],
        categories: ['Website', 'Branding', 'SEO', 'Responsive Design', 'Conversion Focused', 'Patient Growth', 'Modern UI'],
        buttonText: 'Build My Website',
        package: 'Website & Portal'
      },
      {
        id: '2',
        heading: 'AI Chatbot Lead Capture',
        price: '$300',
        description: 'Automate appointment requests and follow-ups 24/7.',
        features: ['AI-driven chat', 'CRM integration', 'WhatsApp & web', 'Multi-language support'],
        categories: ['Automation', 'Lead Capture', 'CRM', 'AI', 'Patient Experience', 'Conversion', 'Time Saver'],
        buttonText: 'Activate AI Chatbot',
        package: 'Automation & Lead Capture'
      },
      {
        id: '3',
        heading: 'SMS & Email Reminders',
        price: '$300',
        description: 'Automated reminders to reduce no-shows and improve retention.',
        features: ['SMS notifications', 'Email reminders', 'Custom templates', 'No-show reduction'],
        categories: ['Automation', 'SMS', 'Email', 'Reminders', 'Patient Retention'],
        buttonText: 'Set Up Reminders',
        package: 'Automation & Lead Capture'
      },
      {
        id: '4',
        heading: 'Patient Portal',
        price: '$500',
        description: 'Secure login for patients to manage bookings, history, and invoices.',
        features: ['View appointments', 'Treatment history', 'Invoices', 'Secure login'],
        categories: ['Patient Portal', 'Dashboard', 'Security', 'Clinic Systems', 'Retention', 'Modern UX'],
        buttonText: 'Launch Patient Portal',
        package: 'Website & Portal'
      },
      {
        id: '5',
        heading: 'Google Reviews Widget',
        price: '$120',
        description: 'Show live patient reviews to build trust and credibility.',
        features: ['Live feed', 'Auto-update', 'Trust badges', 'Easy embed'],
        categories: ['Social Proof', 'Reviews', 'Credibility', 'Patient Trust', 'SEO', 'Conversion'],
        buttonText: 'Add Review Widget',
        package: 'Marketing & Branding'
      },
      {
        id: '6',
        heading: 'Smart Appointment Form',
        price: '$200',
        description: 'Capture leads automatically and sync with CRM.',
        features: ['Form validation', 'Email/SMS notifications', 'Calendar sync', 'CRM-ready'],
        categories: ['Lead Capture', 'Automation', 'Booking', 'CRM', 'Conversion'],
        buttonText: 'Install Smart Form',
        package: 'Website & Portal'
      },
      {
        id: '7',
        heading: 'Clinic Branding Kit',
        price: '$200',
        description: 'Refresh logo, colors, and typography for web & social.',
        features: ['Logo refinement', 'Color palette', 'Typography', 'Social templates'],
        categories: ['Branding', 'Visual Identity', 'Marketing', 'Patient Trust', 'Modern Design'],
        buttonText: 'Create Branding Kit',
        package: 'Marketing & Branding'
      },
      {
        id: '8',
        heading: 'Click-to-Call / WhatsApp',
        price: '$100',
        description: 'Enable patients to call or message instantly from your site.',
        features: ['Floating button', 'WhatsApp API', 'Click tracking', 'Custom styling'],
        categories: ['Leads', 'Conversion', 'Contact', 'WhatsApp', 'Patient Engagement'],
        buttonText: 'Add Quick Contact',
        package: 'Engagement & Contact'
      },
      {
        id: '9',
        heading: 'Smile Gallery Showcase',
        price: '$200',
        description: 'Highlight patient transformations to build trust.',
        features: ['Before & after images', 'SEO captions', 'Instagram-ready', 'Lightbox gallery'],
        categories: ['Portfolio', 'Social Proof', 'Trust', 'Visual Marketing', 'Patient Confidence'],
        buttonText: 'Upload Smile Gallery',
        package: 'Marketing & Branding'
      },
      {
        id: '10',
        heading: 'Local Ads Campaign',
        price: '$300',
        description: 'Target nearby patients with Google & social ads.',
        features: ['Audience targeting', 'Ad setup', 'Pixel tracking', 'Performance reports'],
        categories: ['Advertising', 'Local Leads', 'Patient Growth', 'Google Ads', 'Conversion'],
        buttonText: 'Launch Ads Campaign',
        package: 'Marketing & Branding'
      },
      {
        id: '11',
        heading: 'Speed Optimization',
        price: '$200',
        description: 'Boost site speed, UX, and SEO rankings.',
        features: ['CDN setup', 'Image optimization', 'Performance tuning', 'Core Web Vitals fix'],
        categories: ['Performance', 'SEO', 'Optimization', 'UX', 'Conversion'],
        buttonText: 'Optimize Website Speed',
        package: 'Performance'
      },
      {
        id: '12',
        heading: 'Monthly Support Plan',
        price: '$250',
        description: 'Reliable hosting, backups, security checks, and ongoing support.',
        features: ['24/7 monitoring', 'Security checks', 'Performance reports', 'Priority support'],
        categories: ['Hosting', 'Maintenance', 'Security', 'Support', 'Reliability', 'Performance'],
        buttonText: 'Start Monthly Support',
        package: 'Performance'
      }
    ],
    primaryPlansItems: ['Direct Communication via WhatsApp, Email, or Slack', 'Weekly Progress Reports & Quick Updates', 'Complete Transparency with Live Project Access', 'Flexible Engagement - Start Small, Scale as Needed'],
    secondaryPlansItems: [''],
    video: prefixed(`/videos/header/header.mp4`)
  }
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
  //         icon: { name: 'VoltageIcon', size: 24 }
  //       },
  //       {
  //         title: 'Full Stack',
  //         description: 'An entire product delivered in-house, from initial strategy to the end result. This means we everything we do is fit for purpose, produced to the highest quality.',
  //         icon: { name: 'BackendIcon', size: 24 }
  //       },
  //       {
  //         title: 'Technology Neutral',
  //         description: 'The best technology is the one that works. We continually listen and observe, so we can recommend the optimal solution for your business problem.',
  //         icon: { name: 'MonitorIcon', size: 24 }
  //       },
  //       {
  //         title: 'Integrated',
  //         description: 'We put your website at the heart of your digital ecosystem, providing secure API integrations and automated solutions across your business systems',
  //         icon: { name: 'PieChartIcon', size: 24 }
  //       }
  //     ]
  //   },
  //   contentAsideImageItems: [
  //     {
  //       title: 'Elevate your brand',
  //       paragraph: 'We blend innovative design, cutting-edge technology, and strategic content to deliver websites that are visually appealing and highly functional. Harness the power of deeply engaging digital experiences to take your brand to the next level.',
  //       icon: { name: 'PointerIcon', size: 64 }
  //     },
  //     {
  //       title: 'Human experiences',
  //       paragraph: 'Offer an immersive user experience that captures the essence of your brand and resonates with your target audience. From intuitive navigation to immersive storytelling, every website is meticulously crafted to command attention and leave a lasting impression.',
  //       icon: { name: 'PointerIcon', size: 64 }
  //     },
  //     {
  //       title: 'Robust, Secure, Flexible',
  //       paragraph: 'Every website we build is backed by secure and performant infrastructure, tailored to the needs of the organisation. This ensures that your digital presence can scale with demand and offer flexibility to meet the needs of your business over time.',
  //       icon: { name: 'PointerIcon', size: 64 }
  //     },
  //     {
  //       title: 'Rewarding partnerships',
  //       paragraph: 'Behind every best-in-class website is a collaborative agency–client partnership. We work in close collaboration with you to ensure outcomes that offer extraordinary experiences while delivering results. Awards are nice, but your success means so much more.',
  //       icon: { name: 'PointerIcon', size: 64 }
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
  //       year: '2026',
  //       text: 'Privacy'
  //     },
  //     button: {
  //       text: 'Submit a brief'
  //     }
  //   },
  //   footerSocialLinks: [
  //     {
  //       title: 'LinkedIn',
  //       icon: { name: 'AsteriskIcon', size: 10 },
  //       href: 'https://www.linkedin.com/company/dev8x/'
  //     },
  //     {
  //       title: 'Instagram',
  //       icon: { name: 'AsteriskIcon', size: 10 },
  //       href: 'https://www.instagram.com/dev8xofficial/'
  //     },
  //     {
  //       title: 'Facebook',
  //       // icon: { name: 'AsteriskIcon', size: 10 },
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
];

export default OFFERS;
