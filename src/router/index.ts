/**
 * @author xiaoping
 * @email edwardhjp@gmail.com
 * @create date 2018-05-04 11:22:01
 * @modify date 2018-05-04 11:22:01
 * @desc [路由]
 */

import Vue from 'vue'
import Router, { RouteConfig, RouterOptions } from 'vue-router'

const _import = (file: string) => () => import('@/views/' + file + '.vue').then(m => m.default)
Vue.use(Router)

export const routes: RouteConfig[] = [
  { path: '/', component: _import('index/index') },
  { path: '*', component: _import('notFound/index') }
]

export default new Router({
  mode: 'hash',
  routes
})
