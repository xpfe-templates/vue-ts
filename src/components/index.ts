/**
 * @author xiaoping
 * @email edwardhjp@gmail.com
 * @create date 2018-05-03 02:59:32
 * @modify date 2018-05-03 02:59:32
 * @desc [全局组件]
 */

import Vue from 'vue'

const components: any[] = []

components.forEach(component => {
  Vue.component(component.name, component)
})
