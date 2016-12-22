import 'assets/js/lib-flexible-master/build/flexible_css.debug.js'
import 'assets/js/lib-flexible-master/build/flexible.debug.js'

import Vue from 'vue'
import App from './App'
import router from './router/router'

require('assets/css/base.scss')

const app = new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app')
