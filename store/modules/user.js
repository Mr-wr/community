import user from '@/common/api/apiFun/user'
export default {
  namespaced: true,
  state: {
    userInfo: {
      avatar: '',
      accessRecords: [],
    },
    userArticle: null,
    userStatus: {
      // 是否显示文章类型
      isShowType: false,
      // 发表内容选择的标签类型
      releaseType: null,
      // 用户选择的文章内容
      articleData: null,
      // 用户选择的评论内容
      selectComments: null,
      // 用户选择的回复内容
      selectReply: null,
      // 用户选择公开或者隐藏
      single_type: { single_type_id: 1, single_type_name: '公开' },
      // @的用户信息
      selectUser: null,
      // 加载的评论
      commentData: null,
      // 发布时选择的node节点
      node: null,
      // 发布时插入的位置
      endIndex: 1,
      releaseSelectUser: false,
      isAT: false,
    },
  },
  mutations: {
    SET_USER_INFO(state, userInfo) {
      state.userInfo = userInfo
    },

    SET_USER_NODE(state, node) {
      state.userStatus.node = node
    },
    SET_USER_ENDINDEX(state, endIndex) {
      state.userStatus.endIndex = endIndex
    },
    SET_USER_AT(state, isAT) {
      state.userStatus.isAT = isAT
    },
    SET_USER_RELEASE_SELECT_USER(state, releaseSelectUser) {
      state.userStatus.releaseSelectUser = releaseSelectUser
    },

    SET_USER_STATUS_RELEASE_TYPE(state, releaseType) {
      state.userStatus.releaseType = releaseType
    },
    SET_USER_ARTICLE(state, articleData) {
      state.userStatus.articleData = articleData
    },
    SET_USER_IS_SHOW_TYPE(state, isShowType) {
      state.userStatus.isShowType = isShowType
    },
    SET_USER_SINGLE_TYPE(state, single_type) {
      state.userStatus.single_type = single_type
    },
    SET_USER_SELECT_USER(state, selectUser) {
      state.userStatus.selectUser = selectUser
    },
    SET_USER_SELECT_COMMENTS(state, selectComments) {
      state.userStatus.selectComments = selectComments
    },
    SET_USER_SELECT_REPLY(state, selectReply) {
      state.userStatus.selectReply = selectReply
    },
    SET_USER_COMMENTS_DATA(state, commentData) {
      state.userStatus.commentData = commentData
    },
  },
  actions: {
    // get user info
    getInfo({ commit }) {
      return new Promise((resolve, reject) => {
        user
          .getUserInfo()
          .then(info => {
            if (info.code != 200) return
            resolve(info.data)
            uni.setStorageSync('userInfo', info.data.info)
            commit('SET_USER_INFO', info.data.info)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
  },
  getters: {
    isuserInfo: state => state.userInfo,
    isuserStatus: state => state.userStatus,
  },
}
