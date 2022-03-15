# houloger.com

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Modules supplementaires

### Axios - Gestion des requêtes HTTP etc.

```bash
# install
$ npm i @nuxtjs/axios

# dans nuxt.config.js
modules : [
   '@nuxtjs/axios'
],
```

### Node SASS & SASS Loader - Gestion du SCSS

```bash
# install
$ npm i --save-dev node-sass sass-loader

# example de config dans nuxt.config.js
css: ['~/assets/global.scss', '~/assets/scss/animation.scss'],
styleRessources: {
   scss: ['./assets/scss/vars/*.scss'],
},
```

### Icons Bootstrap Vue

```bash
# pour activer les icons Bootstrap (dans nuxt.config.js)
modules: [
    [
      'bootstrap-vue/nuxt',
      {
        icons: true,
      },
    ],
    ...
  ],

# example de config dans nuxt.config.js
css: ['~/assets/global.scss', '~/assets/scss/animation.scss'],
styleRessources: {
   scss: ['./assets/scss/vars/*.scss'],
},
```
