import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    num: 0,
    dataList: [1, 2, 3, 4, 5, 6, 7, 8],
    vmodel: ''
  },
  // 可以理解为store的计算属性
  getters: {
    getTwos: state => (it) => {
      return state.dataList.filter(item => item > it)
    }
  },
  // 更改Vuex的store中状态的唯一方法
  mutations: {
    getSum (state) {
      state.num++
    },
    getModel (state, val) {
      state.vmodel = val
    }
  },
  actions: {
    getSum (commit, a) {
      setTimeout(() => {
        commit.commit('getSum')
      }, 1000)
    },
    getModel (commit, val) {
      console.log(val)
      commit.commit('getModel', val)
    }
  }
})

export default store
