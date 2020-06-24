// import Vue from 'vue'
// import App from './App.vue'
// import vuetify from './plugins/vuetify';
// import VueRouter from 'vue-router'
//
//
// Vue.config.productionTip = false
//
// new Vue({
//   vuetify,
//   render: h => h(App)
// }).$mount('#app')
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router'
import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(require('vue-cookies'))
// es2015 module
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

// set default config
Vue.$cookies.config('7d')

// set global cookie
Vue.$cookies.set('theme','default');
Vue.$cookies.set('hover-time','1s');



Vue.config.productionTip = false
Vue.use(router)
Vue.use(VueRouter)

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBvq0zBoCt1a14pp8hGfYf9HRPM81DEx4k',
    libraries: 'places', // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)

    //// If you want to set the version, you can do so:
    // v: '3.26',
  },

  //// If you intend to programmatically custom event listener code
  //// (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
  //// instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
  //// you might need to turn this on.
  // autobindAllEvents: false,

  //// If you want to manually install components, e.g.
  //// import {GmapMarker} from 'vue2-google-maps/src/components/marker'
  //// Vue.component('GmapMarker', GmapMarker)
  //// then disable the following:
  // installComponents: true,
})

new Vue({
  el:'#app',
  router,
  vuetify,
  render:h=>h(App)
})
