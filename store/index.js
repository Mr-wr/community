import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import appInfo from './modules/appInfo'
// 引入vuex-persistedstate插件
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: { user, appInfo },
  // 默认存储在localStorage
  // plugins: [createPersistedState()],
  // 设置存储在sessionStorage
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
})
