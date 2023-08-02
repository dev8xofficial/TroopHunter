// tailwind.config.js

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./index.html', './src/**/*.{html,js,ts,jsx,tsx}'],
  plugins: [require('daisyui')],
  darkMode: 'class',
  theme: {
    extend: {
      fontSize: {
        xxs: '0.6rem',
      },
      width: {
        '26': '6.76rem',
      }
    },
  },
  // daisyUI config (optional - here are the default values)
  daisyui: {
    themes: false, // true: all themes | false: only light + dark | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: 'dark', // name of one of the included themes for dark mode
    styled: false, // include daisyUI colors and design decisions for all components
  },
};
