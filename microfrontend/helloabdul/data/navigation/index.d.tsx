import { HeaderSubmenuContent } from '@repo/components';

const SubmenuData = [
  {
    heading: 'What We Do',
    list: [
      {
        title: 'Websites',
        iconName: 'PointerIcon',
        color: 'cyan',
        href: '/expertise/websites'
      },
      {
        title: 'Web Apps',
        iconName: 'CardIcon',
        color: 'pink',
        href: '/expertise/web-applications'
      },
      {
        title: 'Mobile Apps',
        iconName: 'MobileIcon',
        color: 'blue',
        href: '/expertise/mobile-apps'
      },
      {
        title: 'SaaS',
        iconName: 'SaaSIcon',
        color: 'green',
        href: '/expertise/saas'
      },
      {
        title: 'eCommerce',
        iconName: 'BasketIcon',
        color: 'green',
        href: '/expertise/ecommerce'
      },
      {
        title: 'Data Vis',
        iconName: 'DataIcon',
        color: 'purple',
        href: '/expertise/data-visualisation'
      },
      {
        title: 'Real-Time Apps',
        iconName: 'SeismometerIcon',
        color: 'blue',
        href: '/expertise/real-time-apps'
      }
    ].filter((item) => !['/expertise/data-visualisation', '/expertise/mobile-apps'].includes(item.href))
  },
  {
    heading: 'Backend & Databases',
    list: [
      {
        title: 'Backend',
        iconName: 'BackendIcon',
        color: 'cyan',
        href: '/expertise/backend'
      },
      {
        title: 'Real-Time Apps',
        iconName: 'SeismometerIcon',
        color: 'blue',
        href: '/expertise/real-time-apps'
      },
      {
        title: 'SaaS',
        iconName: 'SaaSIcon',
        color: 'green',
        href: '/expertise/saas'
      },
      {
        title: 'PostgreSQL',
        iconName: 'PostgresqlIcon',
        color: 'purple',
        href: '/expertise/postgresql'
      },
      {
        title: 'ORM (Sequelize, Prisma)',
        iconName: 'SequelizeIcon',
        color: 'pink',
        href: '/expertise/orm-sequelize-prisma'
      }
    ]
  },

  /* {
    heading: 'Design & UX',
    list: [
      {
        title: 'User Research',
        iconName: 'MyspaceIcon',
        color: 'purple',
        href: '/expertise/user-research-validation'
      },
      {
        title: 'UX Design',
        iconName: 'MapIcon',
        color: 'cyan',
        href: '/expertise/user-experience-design'
      },
      {
        title: 'UI Design',
        iconName: 'SelectionIcon',
        color: 'pink',
        href: '/expertise/user-interface-design'
      },
      {
        title: 'Prototyping',
        iconName: 'MagicWandIcon',
        color: 'blue',
        href: '/expertise/prototyping'
      },
      {
        title: 'Design Systems',
        iconName: 'PlanetRingIcon',
        color: 'purple',
        href: '/expertise/design-systems'
      }
    ]
  },*/

  {
    heading: 'Technology',
    list: [
      {
        title: 'React.js',
        iconName: 'ReactjsIcon',
        color: 'purple',
        href: '/expertise/react-js'
      },
      {
        title: 'Next.js',
        iconName: 'NextjsIcon',
        color: 'cyan',
        href: '/expertise/next-js'
      },
      {
        title: 'Node.js',
        iconName: 'NodejsIcon',
        color: 'blue',
        href: '/expertise/node-js'
      },
      {
        title: 'Express.js / Nest.js',
        iconName: 'NextjsIcon',
        color: 'pink',
        href: '/expertise/express-nest'
      },
      {
        title: 'Supabase',
        iconName: 'SupabaseIcon',
        color: 'green',
        href: '/expertise/supabase'
      }
    ]
  },
  {
    heading: 'DevOps & Cloud',
    list: [
      {
        title: 'Docker',
        iconName: 'DockerIcon',
        color: 'purple',
        href: '/expertise/docker'
      },
      {
        title: 'Virtualization',
        iconName: 'VirtualMachinesIcon',
        color: 'blue',
        href: '/expertise/virtualization'
      },
      {
        title: 'Ansible & Web Servers',
        iconName: 'AnsibleIcon',
        color: 'cyan',
        href: '/expertise/ansible-web-servers'
      },
      {
        title: 'AWS, Vercel, DigitalOcean',
        iconName: 'WebServersIcon',
        color: 'pink',
        href: '/expertise/aws-vercel-digitalocean'
      },
      {
        title: 'CI/CD',
        iconName: 'InfinityIcon',
        color: 'green',
        href: '/expertise/ci-cd'
      }
    ]
  },
  ...(false
    ? [
        {
          heading: 'Work With Us',
          list: [
            {
              title: 'Careers',
              iconName: 'RightArrowIcon',
              color: 'cyan',
              href: '/careers',
              rotateIcon: true
            },
            {
              title: 'Internships',
              iconName: 'PlanetRingIcon',
              color: 'purple',
              href: '/internships'
            },
            {
              title: 'Our Process',
              iconName: 'DataIcon',
              color: 'blue',
              href: '/our-process'
            },
            {
              title: 'Plans & Pricing',
              iconName: 'SaaSIcon',
              color: 'green',
              href: '/plans-and-pricing'
            }
          ].filter((item) => !['/careers', '/internships', '/plans-and-pricing'].includes(item.href))
        }
      ]
    : [])
] as HeaderSubmenuContent;

export default SubmenuData;
