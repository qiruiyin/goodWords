import 'assets/js/lib-flexible-master/build/flexible_css.debug.js'
import 'assets/js/lib-flexible-master/build/flexible.debug.js'

import Vue from 'vue'
import App from './App'
import router from './router/router'

// require('lib/weui/src/style/weui.less')
import 'assets/css/common.scss'

const app = new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app')
