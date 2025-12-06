import { HeaderSubmenuContent } from '@repo/components';

const SubmenuData = [
  {
    heading: 'What We Do',
    list: [
      {
        title: 'Websites',
        iconName: 'MonitorIcon',
        color: 'cyan',
        href: '/expertise/websites'
      },
      {
        title: 'Web Apps',
        iconName: 'ResponsiveIcon',
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
        color: 'blue',
        href: '/expertise/saas'
      },
      {
        title: 'eCommerce',
        iconName: 'ShoppingCartIcon',
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
        iconName: 'LightningIcon',
        color: 'purple',
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
        color: 'purple',
        href: '/expertise/node-js-express-js'
      },
      {
        title: 'API Integration',
        iconName: 'RestApiIcon',
        color: 'cyan',
        href: '/expertise/api-integration'
      },
      {
        title: 'GraphQL / REST',
        iconName: 'GraphQL',
        color: 'pink',
        href: '/expertise/graphql-rest'
      },
      {
        title: 'PostgreSQL',
        iconName: 'PostgresqlIcon',
        color: 'blue',
        href: '/expertise/postgresql'
      },
      {
        title: 'ORM (Sequelize, Prisma)',
        iconName: 'SequelizeIcon',
        color: 'green',
        href: '/expertise/orm-sequelize-prisma'
      }
    ]
  },
  {
    heading: 'Design & UX',
    list: [
      {
        title: 'Interaction Design',
        iconName: 'PointerCursorIcon',
        color: 'purple',
        href: '/expertise/interaction-design'
      },
      {
        title: 'UI Components',
        iconName: 'PuzzlePieceIcon',
        color: 'cyan',
        href: '/expertise/user-interface-components'
      },
      {
        title: 'Design Systems',
        iconName: 'PaintSwatchIcon',
        color: 'pink',
        href: '/expertise/design-systems'
      },
      {
        title: 'Animations',
        iconName: 'GsapIcon',
        color: 'blue',
        href: '/expertise/animations'
      },
      {
        title: 'Pixel-perfect Layouts',
        iconName: 'FrameIcon',
        color: 'green',
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
        color: 'blue',
        href: '/expertise/docker'
      },
      {
        title: 'Virtualization',
        iconName: 'VirtualMachinesIcon',
        color: 'pink',
        href: '/expertise/virtualization'
      },
      {
        title: 'Ansible & Web Servers',
        iconName: 'AnsibleIcon',
        color: 'purple',
        href: '/expertise/ansible-web-servers'
      },
      {
        title: 'AWS, Vercel, DigitalOcean',
        iconName: 'AwsIcon',
        color: 'yellow',
        href: '/expertise/aws-vercel-digitalocean'
      },
      {
        title: 'CI/CD',
        iconName: 'InfinityIcon',
        color: 'cyan',
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
        color: 'blue',
        href: '/expertise/react-js'
      },
      {
        title: 'Next.js',
        iconName: 'NextjsIcon',
        color: 'pink',
        href: '/expertise/next-js'
      },
      {
        title: 'TypeScript',
        iconName: 'TypeScript',
        color: 'purple',
        href: '/expertise/typescript'
      },
      {
        title: 'State Management',
        iconName: 'ReduxIcon',
        color: 'yellow',
        href: '/expertise/state-management'
      },
      {
        title: 'SSR & SSG',
        iconName: 'WebServersIcon',
        color: 'cyan',
        href: '/expertise/ssr-ssg'
      }
    ]
  },
  {
    heading: 'Platform Engineering',
    list: [
      {
        title: 'Microservices',
        iconName: 'MonoRepoArchitectureIcon',
        color: 'cyan',
        href: '/expertise/microservices'
      },
      {
        title: 'Containerization',
        iconName: 'DataIcon',
        color: 'pink',
        href: '/expertise/containerization'
      },
      {
        title: 'Kubernetes',
        iconName: 'KubernetesIcon',
        color: 'blue',
        href: '/expertise/kubernetes'
      },
      {
        title: 'Terraform',
        iconName: 'TerraformIcon',
        color: 'green',
        href: '/expertise/terraform'
      },
      {
        title: 'TurboRepo',
        iconName: 'TubroRepoIcon',
        color: 'purple',
        href: '/expertise/turbo-repo'
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
