import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import axios from './util/axios'
import 'element-ui/lib/theme-chalk/index.css';
import * as VueGoogleMaps from 'vue2-google-maps'



Vue.use(ElementUI)
Vue.config.productionTip = false

// replace src with dist if you have Babel issues
import GmapCluster from 'vue2-google-maps/dist/components/cluster' 
Vue.component('GmapCluster', GmapCluster)

Vue.prototype.axios = axios
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDEdSqEw49mW7gGoJYMfdk078L2Ykg2UmY', 
    libraries: 'places'
  }
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')