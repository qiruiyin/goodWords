import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  // 用户个人信息
  userInfo: {
    userName: '',
    token: ''
  }
}

const mutations = {
  getUserInfo (state) {
    return state.userInfo.userName
  },
  setUserInfo (state, userInfo) {
    Object.assign(state.userInfo, userInfo)
  }
}

const store = new Vuex.Store({
  state,
  mutations
})

export default store