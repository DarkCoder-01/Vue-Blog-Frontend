import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("token"),
    userInfo: JSON.parse(sessionStorage.getItem("userInfo")),
    loginState: false,
  },
  mutations: {
    CHANGE_LOGIN_STATE: (state, loginState) => {
      state.loginState = loginState
    },
    SET_TOKEN: (state, token) => {
      state.token = token
      localStorage.setItem("token", token)
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
      sessionStorage.setItem("userInfo", JSON.stringify(userInfo))
    },
    REMOVE_INFO: (state) => {
      state.token = ''
      localStorage.setItem("token", '')
      state.userInfo = {}
      sessionStorage.setItem("userInfo", JSON.stringify({}))
    },
  },
  actions: {
  },
  getters: {
    getUser: state => {
      return state.userInfo
    },
    getToken: state => {
      return state.token
    },
    getLoginState: state => {
      return state.loginState
    }
  },
  modules: {
  }
})
