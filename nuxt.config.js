const { CI_PAGES_URL } = process.env
const base = (CI_PAGES_URL && new URL(CI_PAGES_URL).pathname) || ''

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'houloger.com',
    htmlAttrs: {
      lang: 'fr',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  /**
   * Gitlab
   */
  router: {
    base,
  },
  generate: {
    dir: 'public',
  },

  /*
   ** Custom page transition
   */
  pageTransition: {
    name: 'balayage',
    mode: 'out-in',
  },

  /* Global Var */
  env: {
    equipements: {
      chambres: {
        label: 'Chambres',
        icon: 'bed',
      },
      chauffage_clim: {
        label: 'Chauffage / Clim',
        icon: 'thermometer-half',
      },
      cuisine_jardin: {
        label: 'Cuisine de jardin',
        icon: 'hot-tub',
      },
      jacuzzi: {
        label: 'Jacuzzi',
        icon: 'spa',
      },
      jardin: {
        label: 'Jardin',
        icon: 'chair',
      },
      lave_linge_seche_linge: {
        label: 'Lave linge / Sèche linge',
        icon: 'tshirt',
      },
      nb_personne: {
        label: 'Nombre de personne idéal',
        icon: 'user-friends',
      },
      pergola: {
        label: 'Pergola',
        icon: 'chair',
      },
      plaque_electrique_four: {
        label: 'Plaque / Four',
        icon: 'cookie',
      },
      piscine: {
        label: 'Piscine',
        icon: 'swimming-pool',
      },
      sdb: {
        label: 'Salle de bain',
        icon: 'bath',
      },
      terrasse: {
        label: 'Terrasse',
        icon: 'chair',
      },
      tv_internet: {
        label: 'TV / Internet',
        icon: 'tv',
      },
      veranda: {
        label: 'Véranda',
        icon: 'chair',
      },
      wc: {
        label: 'Toilettes / WC',
        icon: 'toilet',
      },
      wifi: {
        label: 'WIFI',
        icon: 'wifi',
      },
    },
  },

  /*
   ** Global CSS
   */
  css: [
    '~/node_modules/animate.css/animate.min.css',
    '~/assets/scss/vars/_vars.scss',
    '~/assets/scss/vars/_mixin.scss',
    '~/assets/scss/animation.scss',
    '~/assets/global.scss',
  ],
  styleRessources: {
    scss: ['./assets/scss/vars/_vars.scss', './assets/scss/vars/_mixin.scss'],
  },
  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ['~/plugins/filters.js'],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: ['@nuxtjs/fontawesome', 'nuxt-gsap-module', '@nuxtjs/device'],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    [
      // https://go.nuxtjs.dev/bootstrap
      'bootstrap-vue/nuxt',
      {
        icons: true,
      },
    ],
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
  ],
  fontawesome: {
    component: 'fa',
    icons: {
      solid: true,
      brands: true,
    },
  },
  gsap: {
    extraPlugins: {
      motionPath: true,
    },
  },
  axios: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extend(config) {
      config.module.rules.push({
        test: /\.(glsl|vs|fs|vert|frag)$/,
        exclude: /node_modules/,
        use: ['raw-loader'],
      })
    },
    standalone: true,
  },
  transpile: ['three'],
}
