import VuetifyLoaderPlugin from 'vuetify-loader/lib/plugin'
import pkg from './package'

// log env variables
console.log(`MQTT port = ${process.env.mqttPort}`);
console.log(`Host ip = ${process.env.ip}`);
console.log(`External port = ${process.env.port}`);
console.log(`Hostname domain = ${process.env.hostname}`);


export default {
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
      { name: 'apple-mobile-web-app-capable', content:'yes'},
      { name: 'mobile-web-app-capable', content: 'yes'},
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black-transulent'}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ]
  },
  env:{

    ip: process.env.ip,
    port: process.env.port,
    mqttPort: process.env.mqttPort,
    hostname: process.env.hostname
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    '~/assets/style/app.scss',
    '~/assets/style/grid.scss',
    'leaflet/dist/leaflet.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/mqtt.js',
    {
      src: "~/plugins/leaflet",
      ssr: false
    }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/pwa',
  ],

  manifest: {
    name: 'D.A.V.E',
    short_name: 'Dave',
    description: 'Digital Assets Validated by an Ecosystem',
    theme_color: 'rgba(208,2,27,1)',
    start_url: '/mobile',
    display: "fullscreen",
  },


  /*
  ** Build configuration
  */
  build: {

    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {

    }
  }
}
