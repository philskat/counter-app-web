/* eslint-disable */
const sveltePreprocess = require('svelte-preprocess');

const production = !process.env.ROLLUP_WATCH;

module.exports = {
  preprocess: sveltePreprocess({
    souremap: !production,
    postcss: true,
  }),
  compilerOptions: {
    dev: !production,
  },
};
