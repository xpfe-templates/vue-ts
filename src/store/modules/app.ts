import { MutationTree, ActionTree, GetterTree } from 'vuex'
// import request from '@/api/request'
// import urls from '@/api/urls'

interface State {
  name: string
}

let state: State = {
  name: 'xiaoping'
}
const mutations: MutationTree<any> = {
  'SET_NAME'(state, data) {
    state.name = data
  }
}
const actions: ActionTree<any, any> = {
  SetName({ commit }, params) {
    commit('SET_NAME', params.name)
  }
}
const getters: GetterTree<any, any> = {
  name: state => state.name
}

export default {
  state,
  mutations,
  actions,
  getters
}
