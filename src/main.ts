/**
 * @author xiaoping
 * @email edwardhjp@gmail.com
 * @create date 2018-05-03 02:14:12
 * @modify date 2018-05-03 02:14:12
 * @desc [入口文件]
*/

import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import '@/components' // 引入全局组件
import 'normalize.css/normalize.css' // normalize.css
import 'xp-reset.css' // reset.css
import '@/assets/css/app.css' // 全局样式
import '@/registerServiceWorker' // service-worker.js
import * as filters from '@/utils/filters' // 全局过滤器

// 注册全局filters
Object.keys(filters).forEach(key => {
  let theFilter = (<any>filters)[key]
  Vue.filter(key, theFilter)
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
