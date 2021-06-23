/* eslint-disable */
import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
import css from 'rollup-plugin-css-only';
import { generateSW } from 'rollup-plugin-workbox';
import del from 'rollup-plugin-delete';

const production = !process.env.ROLLUP_WATCH;

function serve() {
  let server;

  function toExit() {
    if (server) server.kill(0);
  }

  return {
    writeBundle() {
      if (server) return;
      server = require('child_process').spawn(
        'npm',
        ['run', 'start', '--', '--dev'],
        {
          stdio: ['ignore', 'inherit', 'inherit'],
          shell: true,
        }
      );

      process.on('SIGTERM', toExit);
      process.on('exit', toExit);
    },
  };
}

export default {
  input: 'src/index.ts',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'public/build/bundle.js',
  },
  plugins: [
    svelte({
      compilerOptions: {
        dev: !production,
      },
      preprocess: sveltePreprocess({
        sourceMap: !production,
        postcss: true,
      }),
    }),
    css({ output: 'bundle.css' }),
    resolve({
      browser: true,
      dedupe: ['svelte'],
    }),
    commonjs(),
    typescript({
      sourceMap: !production,
      inlineSources: !production,
    }),
    !production && serve(),
    !production && livereload('public'),
    production && terser(),
    production &&
      generateSW({
        swDest: 'public/sw.js',
        globDirectory: 'public',
        globPatterns: ['*.{webmanifest,html}'],
        skipWaiting: true,
        clientsClaim: true,
        mode: production ? 'production' : 'development',
        runtimeCaching: [
          {
            urlPattern: /\.(js|html|css)$/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'sites',
            },
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images',
            },
          },
        ],
      }),
    del({ targets: ['public/build/*', 'public/{sw,workbox}*.{js,map}'] }),
  ],
  watch: {
    clearScreen: false,
  },
};
