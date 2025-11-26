import { OffersContent } from '@repo/components';
import { prefixed } from '../../utils/helpers';

const AUGMENTATION: OffersContent[] = [
  {
    slug: '',
    variant: 'yellow',
    tagText: 'For Tech Founders',
    heading: 'LANUCH YOUR MVP \n WITHIN 3 MONTHS',
    paragraph: 'Get vetted React, Next.js, and full-stack developers — or plug-in mini-squads — guided by senior tech leads.<br /><br />  Kick off in <b>7 days</b> with <span><b>U.S. timezone overlap</b></span>, <span><b>transparent reporting</b></span>, and <span><b>true startup velocity</b></span>.',
    heroButtons: [
      {
        label: 'See Pricing',
        href: prefixed('/pricing/tech-founders'),
        target: '_blank'
      },
      {
        label: 'Schedule a Call',
        modalType: 'schedulecall'
      }
    ],
    image: prefixed('/api/images/services/services-for-growth-stage-startups/1.png'),
    iconCards: {
      title: 'Start Small. Scale Fast.',
      paragraph: 'Begin with one developer, scale to a squad — no new contracts, no hassle. Every engagement is managed for quality, speed, and control.',
      items: [
        {
          title: 'Vetted Talent',
          description: 'If it’s not the right fit, we’ll assign a vetted replacement developer within 5 business days — no downtime, no disruption.',
          icon: { name: 'CreditCardIcon', width: 26 }
        },
        // {
        //   title: 'Full Code Ownership',
        //   description: 'You retain 100% ownership of code, repos, and docs — we accelerate your build and uphold enterprise-grade standards.',
        //   icon: { name: 'BackendIcon', width: 26 }
        // },
        // {
        //   title: 'Technical Supervision',
        //   description: 'Every developer is backed by a senior tech lead who ensures code quality, scalable architecture, and consistent best practices.',
        //   icon: { name: 'AIBrainIcon', width: 26 }
        // },
        // {
        //   title: 'Transparent Reporting',
        //   description: 'Stay in control with weekly sprint summaries, live Git access, and real-time task tracking in Jira or ClickUp.',
        //   icon: { name: 'SeismometerIcon', width: 22 }
        // },
        // {
        //   title: 'Quick Onboarding',
        //   description: 'Be operational within 7 days. We handle tool setup, environment prep and assets so you focus on delivering business outcomes.',
        //   icon: { name: 'VoltageIcon', width: 18 }
        // },
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
        title: 'Transparent Reporting',
        paragraph: 'Stay in control with weekly sprint summaries, live Git access, and real-time task tracking in Jira or ClickUp — giving you full visibility into progress and priorities. No surprises, no hidden work — everything is documented, traceable, and transparently reported.',
        icon: { name: 'PointerIcon', width: 64 },
        image: prefixed('/api/images/work/scheduler/mobile/2.png')
      },
      {
        title: 'US Time-zone Overlap',
        paragraph: 'Collaborate effortlessly with guaranteed 4-hour overlap with U.S. Eastern Time — ideal for daily stand-ups and sprint reviews. This ensures faster decisions, fewer blockers, and smooth communication without delays, making remote collaboration feel truly in-house.',
        icon: { name: 'PointerIcon', width: 64 },
        image: prefixed('/api/images/work/troophunter/mobile/1.png')
      },
      {
        title: 'Flexible Payments',
        paragraph: 'Pay bi-weekly for agility or pre-pay 3 months to unlock instant savings — align spend with your growth rhythm. Choose the billing model that works for your cash-flow planning, without long-term lock-ins or surprise fees.',
        icon: { name: 'PointerIcon', width: 64 },
        image: prefixed('/api/images/work/totalhealthdentalcare/desktop/26.png')
      },
      {
        title: 'Scalable Engagement',
        paragraph: 'Begin with one developer and expand to a full squad anytime — no change in vendor or workflow needed. Scale at your own pace based on roadmap, traction, and funding milestones, without any operational disruption.',
        icon: { name: 'PointerIcon', width: 64 },
        image: prefixed('/api/images/work/goldendao/desktop/14.png')
      },
      {
        title: 'Transparent Reporting',
        paragraph: 'Stay in control with weekly sprint summaries, live Git access, and real-time task tracking in Jira or ClickUp. You’ll always know progress, blockers, and next steps at a glance.',
        icon: { name: 'PointerIcon', width: 64 },
        image: prefixed('/api/images/work/honeydu/desktop/2.png')
      }
    ],
    whyDev8XContent: {
      heading: 'Why Dev8X',
      para1: 'We believe that meaningful design starts with empathy. Every product we create is centered around improving real lives—helping people achieve more with less friction.',
      para2: 'By combining strategy, creativity, and technology, we unlock opportunities, transform businesses, and make experiences that truly matter. As an independent team, our agility and passion shape every project into something exceptional.',
      image: 'https://a-us.storyblok.com/f/1017006/1200x1400/dc71890964/humaanpeople.jpg/m/450x548/filters:quality(80)',
      stats: [
        { title: '100%', span: ['In-house ', '& ', 'independent'] },
        { title: '6+', span: ['Years ', 'crafting ', 'digital ', 'experiences'] },
        { title: '20+', span: ['Digital ', 'solutions ', 'launched ', 'worldwide'] }
      ]
    },
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
    capabilitiesHeading: "Our capabilities are centred around our ability to deliver world-class websites and apps. We're 100% in-house and work end-to-end, ensuring each project is delivered to the highest standard.",
    capabilities: [
      {
        heading: 'Strategy & UX',
        items: ['Digital Strategy', 'User Research', 'User Journey Mapping', 'Information Architecture', 'Wireframing']
      },
      {
        heading: 'Design',
        items: ['Interaction Design', 'User Interface Design', 'Design Systems', 'Prototyping & Animation', 'Accessibility']
      },
      {
        heading: 'Development',
        items: ['Websites', 'eCommerce', 'Web Applications', 'Mobile Apps (iOS & Android)', 'Platform Integrations']
      },
      {
        heading: 'Technology',
        items: ['React.js', 'Next.js', 'Node.js', 'Express.js / Nest.js', 'Supabase']
      },
      {
        heading: 'Backend & Databases',
        items: ['Backend', 'Real-Time Apps', 'SaaS', 'PostgreSQL', 'ORM (Sequelize, Prisma)']
      },
      {
        heading: 'DevOps & Cloud',
        items: ['Docker', 'Virtualization', 'Ansible & Web Servers', 'AWS, Vercel, DigitalOcean', 'CI/CD']
      },
      {
        heading: 'Optimisation',
        items: ['Website / App Review', 'Performance Optimisation', 'Conversion Optimisation', 'A/B Testing', 'Ongoing Enhancements']
      },
      {
        heading: 'Support',
        items: ['Project Management', 'Website Hosting', 'Website Maintenance', 'Performance & Security', '3rd Party Integrations']
      }
    ],
    video: prefixed(`/videos/header/header.mp4`)
  },
  {
    slug: 'real-estate',
    variant: 'green',
    tagText: 'For Tech Founders',
    heading: 'Scale Up Faster With team Augmentation Services',
    paragraph: 'Work with a long-term tech partner that will help you build an MVP to gain traction from early adopters and raise money from investors.',
    image: prefixed('/api/images/work/totalhealthdentalcare/mobile/1.png'),
    iconCards: {
      title: 'Meet Your Future A-Players',
      paragraph: `We'll carefully select each team member based on the requirements and skills you need. Discover our talents and the role they can play in your team.

`,
      items: [
        {
          title: 'Senior developer',
          description: 'An orchestrator of the team who decides on the product’s architecture and tech stack. Reviews the code and supervises the tech team to make sure that the scope is delivered properly.',
          icon: { name: 'RefreshIcon', width: 28 }
        },
        {
          title: 'Middle developer',
          description: 'Main driving force of the team. They develop and deploy features, marrying tech and design parts.',
          icon: { name: 'BackendIcon', width: 26 }
        },
        {
          title: 'UX/UI designer',
          description: 'Works on making your product lovable at first sight. Creates interface designs and delivers the best user experience in line with the user journey.',
          icon: { name: 'AIBrainIcon', width: 26 }
        },
        {
          title: 'QA specialist',
          description: 'Goes over the code and locates bugs and glitches. Has the final say on whether or not the product is ready for deployment.',
          icon: { name: 'SeismometerIcon', width: 22 }
        },
        {
          title: 'Product manager',
          description: 'Guides and shapes the development of the product in the direction you define. Keeps teams on track, ensuring that the development runs on schedule.',
          icon: { name: 'SeismometerIcon', width: 22 }
        }
      ]
    },
    contentAsideImageItems: [
      {
        title: 'Schedule a call',
        paragraph: 'Complete the form and pick the best time. Ask us for an NDA if required, and we are happy to provide one.',
        icon: { name: 'HomeIcon', width: 26 },
        image: prefixed('/api/images/work/scheduler/mobile/2.png')
      },
      {
        title: 'Tell us what you’re building',
        paragraph: 'Give us an idea of what you are building and what specific skills you need. In a few days, we’ll roll out a team composition that perfectly matches your needs.',
        icon: { name: 'MapPinIcon', width: 24 },
        image: prefixed('/api/images/work/honeydu/desktop/10.png')
      },
      {
        title: 'Review the team and start',
        paragraph: 'Once you approve the team and sign a contract, we can start building your product together with no-risk.',
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
        name: 'David Letourneau',
        company: 'COO at LiveArt',
        bgColor: '#ffffff',
        color: '#111111',
        transformOrigin: 'center top',
        image: prefixed('/api/images/work/scheduler/mobile/7.png'),
        comment: 'We were excited to have a partner with strong coding skills who compiled everything according to the tech specifications.'
      },
      {
        name: 'Kenny R. Lienhard',
        company: 'CTO, Medignition Inc',
        bgColor: '#4C21E2',
        color: '#F0EBFF',
        transformOrigin: 'center top',
        image: prefixed('/api/images/work/honeydu/desktop/24.png'),
        comment: 'Their team had an ease of communication, but the most impressive thing about them is each member`s integrity and work ethic.'
      }
    ],
    faqs: [
      {
        title: '1. What are IT staff augmentation services?',
        description: 'The IT staff augmentation model means hiring outsourced specialists as an additional workforce on a temporary or permanent basis. By utilizing this model, you can easily fill a talent gap to complete tasks or take on roles that may be beyond the capabilities of your current staff. Interested in a team extension? Upsilon boasts an extensive talent pool that can perfectly fit your software development needs.  '
      },
      {
        title: '2. When do I need team augmentation services?',
        description: `
Here are the signs when team augmentation services can be the best fit for your startup:

Your in-house team lacks specialized skills and expertise, and you want quickly fill this “void”;
You develop and release within a tight schedule: with team augmentation, you can ramp up your technical capacity while chasing stringent deadlines;
You want to free your company from the hassle of searching and recruiting vetted development talent;
You want to retain 100% control over the project.
Does all of this describe your current needs on the project? We are ready to help.`
      },
      {
        title: '3. What is the difference between IT staff augmentation and managed services?',
        description:
          'Under a staff augmentation model, you maintain direct and complete control over all processes. When tapping into a managed services model, your tech partner assumes external control of your non-core systems, managing all aspects of their functioning. A managed team operates independently of your in-house team, with an outsourced Project Manager overseeing daily operations and workflows.Which method works best for a startup?If you work under deadline pressure and need to fill specific gaps “here and now,” - you should consider staff augmentation as the number one choice. This model provides maximum flexibility and cost-effectiveness.The managed services option can be more efficient if you want to outsource the project from start to finish. You will have a dedicated team that takes full responsibility for the project. Since this makes your IT outsourcing costs predictable, you can save money over the long term.Both models are viable alternatives to an in-house team, but which model to choose depends on your project type and size.Want to enhance the development efficiency of your ongoing project? Augment your team with talent from Upsilon.'
      },
      {
        title: '4. How will my team interact with your augmented staff?',
        description:
          'Leveraging our years of expertise in IT staff augmentation, we established a vetted approach to collaboration between external and internal teams. Being Agile and SCRUM adopters, we employ Jira to track work assignments, team progress & defects, and handle issues. Setting KPIs with accompanying deadlines ensures efficient cooperation across time zones. At the same time, regular standups, weekly meetings, and sprint reviews keep both sides up-to-date and allow them to adjust processes painlessly.Looking for developers who will be as committed as your in-house team members? You can hire them right now at Upsilon.'
      },
      {
        title: '5. How much do IT staff augmentation services cost?',
        description: 'When you opt for an IT staff augmentation model, each specialist has a specific hourly rate, and you pay for the number of hours worked. Upsilon is ready to provide you with skilled experts at affordable prices. Visit the “Pricing” page to get an idea of our specialists’ rates.'
      }
      // {
      //   title: '6. How do you ensure quality and reliability?',
      //   description: 'We use tested templates, clean code, speed checks, responsive design, and QA reviews on every project.'
      // },
      // {
      //   title: '7. Where is your team based?',
      //   description: 'Our engineering team operates from Pakistan with U.S.-aligned hours and b written communication.'
      // },
      // {
      //   title: '8. What’s your pricing and payment model?',
      //   description: 'Flat-rate pricing per service. Pay via Stripe, Wise, or bank transfer. Discounts available for bundles.'
      // },
      // {
      //   title: '9. Do you handle NDAs and ownership?',
      //   description: 'Yes. You retain full ownership of all assets, domains, content, and code — with optional NDA protection.'
      // },
      // {
      //   title: '10. How do you compare to typical marketing agencies?',
      //   description: 'We deliver faster, cost less, and focus on real estate–specific assets built for immediate lead conversion.'
      // }
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
    capabilitiesHeading: '50+ Full-Stack and Niche Experts on Standby',
    capabilities: [
      {
        heading: 'Product management',
        items: [
          { name: 'Jira', image: 'https://cdn.prod.website-files.com/633438ac0ff91a5041d3188b/6372789076682a8f287807a6_jira.webp' },
          { name: 'Slack', image: 'https://cdn.prod.website-files.com/633438ac0ff91a5041d3188b/6372789176682a27a67807ae_slack.webp' },
          { name: 'Miro', image: 'https://cdn.prod.website-files.com/633438ac0ff91a5041d3188b/6372789127848f8dcf3eeabd_miro.webp' }
        ]
      },
      {
        heading: 'UX/UI design',
        items: [
          { name: 'Figma', image: 'https://cdn.prod.website-files.com/633438ac0ff91a5041d3188b/6372789152be206081bac0bc_figma.webp' },
          { name: 'Adobe Photoshop', image: 'https://cdn.prod.website-files.com/633438ac0ff91a5041d3188b/63727890b27f6382b9a1cd89_adobe-photoshop.webp' }
        ]
      },
      {
        heading: 'Development',
        items: [
          { name: 'Python (FastAPI, Django)', image: 'https://cdn.prod.website-files.com/633438ac0ff91a5041d3188b/637278915e54a8355b3e1d52_python.webp' },
          { name: 'TypeScript (Node.js, React, React Native)', image: 'https://cdn.prod.website-files.com/633438ac0ff91a5041d3188b/63727893c290aa5ea60b6420_typescript.webp' }
        ]
      },
      {
        heading: 'DevOps',
        items: [
          { name: 'Terraform', image: 'https://cdn.prod.website-files.com/633438ac0ff91a5041d3188b/63727893840a291e120162d3_terraform.webp' },
          { name: 'Docker', image: 'https://cdn.prod.website-files.com/633438ac0ff91a5041d3188b/637278908332ff18aa459ce4_docker.webp' },
          { name: 'Kubernetes', image: 'https://cdn.prod.website-files.com/633438ac0ff91a5041d3188b/637278911e566587192317f2_kubernetes.webp' }
        ]
      },
      {
        heading: 'QA',
        items: [
          { name: 'Appium', image: 'https://cdn.prod.website-files.com/633438ac0ff91a5041d3188b/637278912ebc62e9c1c78a16_appium.webp' },
          { name: 'Detox', image: 'https://cdn.prod.website-files.com/633438ac0ff91a5041d3188b/63727891fb38dbd31dc72743_detox.webp' },
          { name: 'Selenium', image: 'https://cdn.prod.website-files.com/633438ac0ff91a5041d3188b/63727891633738a3d723a8bf_selenium.webp' }
        ]
      },
      {
        heading: 'AI & Machine Learning',
        items: [
          { name: 'TensorFlow', image: 'https://cdn.prod.website-files.com/633438ac0ff91a5041d3188b/637278939601cf4af694d79f_tensor-flow.webp' },
          { name: 'Keras', image: 'https://cdn.prod.website-files.com/633438ac0ff91a5041d3188b/63727891633738df2523a8ba_keras.webp' },
          { name: 'PyTorch', image: 'https://cdn.prod.website-files.com/633438ac0ff91a5041d3188b/63727891d4d17683bbc11982_py-torch.webp' }
        ]
      }
    ],
    video: prefixed(`/videos/header/header.mp4`)
  }
];

export default AUGMENTATION;
