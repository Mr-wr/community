import user from '@/common/api/apiFun/user'
import article from '@/common/api/apiFun/article'
export default {
  namespaced: true,
  state: {
    appInfo: {
      about: '',
      contactMe: '',
      titleType: [],
      hotSearchLog: [],
    },
  },
  mutations: {
    SET_APP_ABOUT_INFO(state, about) {
      state.appInfo.about = about
    },
    SET_APP_CONTACT_ME(state, contactMe) {
      state.appInfo.contactMe = contactMe
    },
    SET_APP_TITLE_TYPE(state, titleType) {
      state.appInfo.titleType = titleType
    },
  },
  actions: {
    // get user info
    getAbout({ commit }) {
      return new Promise((resolve, reject) => {
        user
          .aboutUs()
          .then(info => {
            if (info.code != 200) return
            resolve(info.data)
            commit('SET_APP_ABOUT_INFO', info.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    getContactMe({ commit }) {
      return new Promise((resolve, reject) => {
        user
          .contactUs()
          .then(info => {
            if (info.code != 200) return
            resolve(info.data)
            commit('SET_APP_CONTACT_ME', info.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    getSingleType({ commit }) {
      return new Promise((resolve, reject) => {
        article
          .getSingleType()
          .then(res => {
            if (res.code != 200) return
            resolve(res)
            commit('SET_APP_TITLE_TYPE', res.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
  },
  getters: {
    isappInfo: state => state.appInfo,
  },
}
