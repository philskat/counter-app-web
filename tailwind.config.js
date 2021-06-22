/* eslint-disable */
const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['public/index.html', 'src/**/*.{ts,css,svelte}'],
  mode: 'jit',
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    colors: {
      gray: colors.gray,
      background: {
        DEFAULT: colors.gray[100],
        dark: /*colors.gray[900],*/ '#121212',
        text: colors.gray[900],
        dtext: colors.gray[50],
      },

      primary: {
        light: '#6e33f8',
        DEFAULT: '#6200ee',
        dark: '#1200c0',
        text: colors.gray[50],
      },
      secondary: {
        light: '',
        DEFAULT: '#03dac6',
        dark: '',
        text: colors.gray[900],
      },
    },
    extend: {
      minWidth: {
        16: '4rem',
        32: '4rem',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
      filter: ['dark'],
      invert: ['dark'],
    },
  },
  plugins: [],
};
