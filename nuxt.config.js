import colors from 'vuetify/es5/util/colors'

const dev = process.env.NODE_ENV !== 'production'

export default {
  dev,
  devtools: dev,
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s - Arutoria',
    title: 'Arutoria',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no',
      },
      {
        hid: 'description',
        name: 'description',
        content: '也许这就是人生吧？',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['@/assets/index.scss'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    {
      src: '~/plugins/alert.js',
      mode: 'client',
      ssr: false,
    },
    {
      src: '~/plugins/dialog.js',
      mode: 'client',
      ssr: false,
    },
    {
      src: '~/plugins/api.js',
    },
    {
      src: '~/plugins/loading.js',
      mode: 'client',
      ssr: false,
    },
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios'
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
          // saber 阿尔托莉雅
          saber: '#22469a',
          // 灰之魔女 伊蕾娜
          elaina: '#f1e8eb',
        },
        light: {
          // saber 阿尔托莉雅
          saber: '#22469a',
          // 灰之魔女 伊蕾娜
          elaina: '#f1e8eb',
        },
      },
    },
    // https://vuetifyjs.com/zh-Hans/features/breakpoints/
    breakpoint: {
      mobileBreakpoint: 1264,
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
}
