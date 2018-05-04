/**
 * @author xiaoping
 * @email edwardhjp@gmail.com
 * @create date 2018-05-04 01:41:08
 * @modify date 2018-05-04 01:41:08
 * @desc [状态]
*/

import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app
  }
})

export default store
