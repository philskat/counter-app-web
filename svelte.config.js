/* eslint-disable */
const sveltePreprocess = require('svelte-preprocess');

const production = !process.env.ROLLUP_WATCH;

module.exports = {
  preprocess: sveltePreprocess({
    souremap: !production,
  }),
  compilerOptions: {
    dev: !production,
  },
};
