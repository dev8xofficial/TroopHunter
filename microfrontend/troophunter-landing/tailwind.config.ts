import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  plugins: [require('@mertasan/tailwindcss-variables')],
  dark: 'class',
  theme: {
    variables: {
      '.aspect-x-1452': {
        aspect: {
          x: 1452
        }
      },
      '.aspect-x-710': {
        aspect: {
          x: 710
        }
      },
      '.aspect-y-890': {
        aspect: {
          y: 890
        }
      },
      '.aspect-y-1250': {
        aspect: {
          y: 1250
        }
      }
    },
    darkVariables: {
      '.aspect-x-1452': {
        aspect: {
          x: 1452
        }
      },
      '.aspect-x-710': {
        aspect: {
          x: 710
        }
      },
      '.aspect-y-890': {
        aspect: {
          y: 890
        }
      },
      '.aspect-y-1250': {
        aspect: {
          y: 1250
        }
      }
    },
    extend: {
      colors: {
        transparent: 'transparent',
        charcoal: {
          100: '#4F545C', // Divider
          200: '#40444B', // Home Table Background, Input Background
          300: '#36393F', // Primary Background
          400: '#32353B', // Home Table Row Hovered Background
          500: '#2F3136', // Secondary Background, Sidebars, Secondary Navbar, Banners
          600: '#282b30', // Home Table Row Saved Hovered Background
          700: '#202225' // Tertiary Background, Input Border, Navbar
        },
        'input-text': '#DCDDDE', // Input Text
        'home-table-row-saved': '#7289DA', // Home Table Row Saved Background
        'button-background': '#7289DA', // Button Background
        'button-hover': '#677BC4', // Button Hover
        'primary-text': '#FFFFFF', // Primary Text
        'secondary-text': '#B9BBBE', // Secondary Text
        'link-text': '#00AFF4', // Link Text
        'highlighted-text': '#F04747', // Highlighted Text
        'mention-text': '#7289DA' // Mention Text
      },
      fontSize: {
        xxs: '0.6rem'
      },
      width: {
        26: '6.76rem'
      }
    }
  }
};
export default config;
