/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    // './node_modules/flowbite/**/*.js',
    // './public/**/*.html',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      colors: {
        'indian-khaki': {
          50: '#FCFBF9',
          100: '#F9F7F3',
          200: '#F1EBE2',
          300: '#E8DFD0',
          400: '#D6C6AC',
          500: '#C5AE89',
          600: '#B19D7B',
          700: '#766852',
          800: '#594E3E',
          900: '#3B3429',
        },
      },
      fontFamily: {
        Roboto: ['Roboto', 'sans-serif'],
        Oswald: ['Oswald', 'sans-serif'],
      },
    },
    listStyleType: {
      none: 'none',
      disc: 'disc',
      decimal: 'decimal',
      square: 'square',
      roman: 'upper-roman',
    },
  },
  plugins: [
    // require('flowbite/plugin')
  ],
};

// https://colorgen.dev/
