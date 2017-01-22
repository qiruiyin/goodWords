// import 'assets/js/lib-flexible-master/build/flexible_css.debug.js'
import 'assets/js/lib-flexible-master/build/flexible.debug.js'

import Vue from 'vue'
import App from './App'
import router from './router/router'
import VueResource from 'vue-resource'

// require('lib/weui/src/style/weui.less')
import 'assets/css/common.scss'

Vue.use(VueResource) 
//Vue.http.options.root = 'http://wechat.hanzisiwei.com/haozizai'
Vue.http.options.root = 'http://106.14.64.252:8080/haozizai'
Vue.http.options.emulateJSON = true;

const app = new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app')
