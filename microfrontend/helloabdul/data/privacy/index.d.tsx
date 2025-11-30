import { PrivacyPageContent } from '@repo/components/src/Interfaces/Privacy/Privacy';

const PageData: PrivacyPageContent = {
  meta: {
    title: 'Privacy Policy — helloabdul | helloabdul: World class digital products',
    description: 'World-class digital products, idea to execution.'
  },
  privacy: {
    heading: 'HelloAbdul Terms of Service',
    sections: [
      {
        title: '1. Terms',
        blocks: [
          {
            type: 'paragraph',
            parts: [
              {
                type: 'text',
                content: 'By accessing the website at '
              },
              {
                type: 'link',
                href: 'https://helloabdul.com/',
                label: 'https://helloabdul.com'
              },
              {
                type: 'text',
                content: ', you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trademark law.'
              }
            ]
          }
        ]
      },
      {
        title: '2. Use License',
        blocks: [
          {
            type: 'orderedList',
            items: [
              {
                parts: [
                  {
                    type: 'text',
                    content: 'Permission is granted to temporarily download one copy of the materials (information or software) on helloabdul website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license, you may not:'
                  }
                ],
                subItems: [
                  [{ type: 'text', content: 'modify or copy the materials;' }],
                  [
                    {
                      type: 'text',
                      content: 'use the materials for any commercial purpose, or for any public display (commercial or non-commercial);'
                    }
                  ],
                  [{ type: 'text', content: 'attempt to decompile or reverse engineer any software contained on helloabdul website;' }],
                  [{ type: 'text', content: 'remove any copyright or other proprietary notations from the materials; or' }],
                  [{ type: 'text', content: 'transfer the materials to another person or “mirror” the materials on any other server.' }]
                ]
              },
              {
                parts: [
                  {
                    type: 'text',
                    content: 'This license shall automatically terminate if you violate any of these restrictions and may be terminated by helloabdul at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.'
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        title: '3. Disclaimer',
        blocks: [
          {
            type: 'orderedList',
            items: [
              {
                parts: [
                  {
                    type: 'text',
                    content: 'The materials on helloabdul website are provided on an ‘as is’ basis. helloabdul makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.'
                  }
                ]
              },
              {
                parts: [
                  {
                    type: 'text',
                    content: 'Further, helloabdul does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.'
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        title: '4. Limitations',
        blocks: [
          {
            type: 'paragraph',
            parts: [
              {
                type: 'text',
                content: 'In no event shall helloabdul or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on helloabdul website, even if helloabdul or a helloabdul authorized representative has been notified orally or in writing of the possibility of such damage.'
              }
            ]
          }
        ]
      },
      {
        title: '5. Accuracy of materials',
        blocks: [
          {
            type: 'paragraph',
            parts: [
              {
                type: 'text',
                content: 'The materials appearing on helloabdul website could include technical, typographical, or photographic errors. helloabdul does not warrant that any of the materials on its website are accurate, complete or current. helloabdul may make changes to the materials contained on its website at any time without notice.'
              }
            ]
          }
        ]
      },
      {
        title: '6. Links',
        blocks: [
          {
            type: 'paragraph',
            parts: [
              {
                type: 'text',
                content: 'HelloAbdul has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by helloabdul of the site. Use of any such linked website is at the user’s own risk.'
              }
            ]
          }
        ]
      },
      {
        title: '7. Modifications',
        blocks: [
          {
            type: 'paragraph',
            parts: [
              {
                type: 'text',
                content: 'helloabdul may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.'
              }
            ]
          }
        ]
      },
      {
        title: '8. Governing Law',
        blocks: [
          {
            type: 'paragraph',
            parts: [
              {
                type: 'text',
                content: 'These terms and conditions are governed by and construed in accordance with the laws of Lahore, Pakistan, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.'
              }
            ]
          }
        ]
      }
    ]
  },
  footerMainContent: {
    link: '/contact',
    start: 'Let’s make',
    end: 'something wonderful'
  },
  footerData: {
    global: {
      heading: 'I work globally',
      email: 'contact@helloabdul.com',
      buttonText: 'Hire me'
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
      icon: { name: 'AsteriskIcon', size: 10 },
      href: 'https://www.linkedin.com/helloabdul/'
    },
    {
      title: 'Instagram',
      icon: { name: 'AsteriskIcon', size: 10 },
      href: 'https://www.instagram.com/helloabdul/'
    },
    {
      title: 'Facebook',
      // icon: { name: 'AsteriskIcon', size: 10 },
      href: 'https://www.facebook.com/profile.php?id=61569289660818'
    }
    // {
    //   title: 'Youtube',
    //   href: 'https://www.youtube.com/@helloabdulOfficial-s3v'
    // }
  ]
};

export default PageData;
