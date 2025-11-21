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
        title: 'Node.js / Express.js',
        iconName: 'NodejsIcon',
        color: 'cyan',
        href: '/expertise/node-js-express-js'
      },
      {
        title: 'API Integration',
        iconName: 'SeismometerIcon',
        color: 'blue',
        href: '/expertise/api-integration'
      },
      {
        title: 'GraphQL / REST',
        iconName: 'SaaSIcon',
        color: 'green',
        href: '/expertise/graphql-rest'
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
  {
    heading: 'Design & UX',
    list: [
      {
        title: 'Interaction Design',
        iconName: 'MyspaceIcon',
        color: 'purple',
        href: '/expertise/interaction-design'
      },
      {
        title: 'UI Components',
        iconName: 'MapIcon',
        color: 'cyan',
        href: '/expertise/user-interface-components'
      },
      {
        title: 'Design Systems',
        iconName: 'SelectionIcon',
        color: 'pink',
        href: '/expertise/design-systems'
      },
      {
        title: 'Animations',
        iconName: 'MagicWandIcon',
        color: 'blue',
        href: '/expertise/animations'
      },
      {
        title: 'Pixel-perfect Layouts',
        iconName: 'PlanetRingIcon',
        color: 'purple',
        href: '/expertise/pixel-perfect-layouts'
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
  {
    heading: 'Frontend Technologies',
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
        title: 'TypeScript',
        iconName: 'NodejsIcon',
        color: 'blue',
        href: '/expertise/typescript'
      },
      {
        title: 'State Management',
        iconName: 'BackendIcon',
        color: 'pink',
        href: '/expertise/state-management'
      },
      {
        title: 'SSR & SSG',
        iconName: 'SupabaseIcon',
        color: 'green',
        href: '/expertise/ssr-ssg'
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
