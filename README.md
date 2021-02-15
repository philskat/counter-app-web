[![CI](https://github.com/philskat/counter-app-web/workflows/CI/badge.svg?branch=main)](https://github.com/philskat/counter-app-web/actions?query=workflow%3ACI)
[![License](https://img.shields.io/github/license/philskat/counter-app-web)](https://github.com/philskat/counter-app-web/blob/main/LICENSE)
[![Netlify](https://img.shields.io/netlify/e8ef3c6e-3ed1-49b5-8d02-cfcb70081f0f)](https://counter-app.dd-dns.de)

# Counter App Web

This is a web-version of my own [counter-app](https://github.com/philskat/counter-app).
It should be using PWA technology to be installed on every device.

The app is available under
[counter-app.dd-dns.de](https://counter-app.dd-dns.de).

## Usage

Listed are the commands configured in the `package.json`.

### `npm run build`

Used to build the web app into the dist folder. For production build
set `NODE_ENV` to `production`.

### `npm run dev`

Used to start the app with [`webpack-dev-server`](https://github.com/webpack/webpack-dev-server).
Used when developing the app for live reloads.

### `npm run lint`

Used to lint the code with [`eslint`](https://github.com/eslint/eslint).

### `npm run format`

Used to format the code with [`prettier`](https://github.com/prettier/prettier).
