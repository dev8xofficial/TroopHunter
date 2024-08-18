// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{html,js,ts,jsx,tsx}'],
  plugins: [require('daisyui')],
  dark: 'class',
  theme: {
    extend: {
      colors: {
          transparent: 'transparent',
          'charcoal': {
              200: '#40444B', // Input Background
              700: '#36393F', // Primary Background
              800: '#2F3136', // Sidebars
              900: '#202225' // Navbar
          }
      },
      fontSize: {
        xxs: '0.6rem'
      },
      width: {
        26: '6.76rem'
      }
    }
  },
  // daisyUI config (optional - here are the default values)
  daisyui: {
    themes: false,
    darkTheme: 'dark',
    styled: false // include daisyUI colors and design decisions for all components
  }
  };
  