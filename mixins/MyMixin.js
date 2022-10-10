import { hideLoading, showLoading } from '../utils/loading'
import { mapGetters } from 'vuex'
export default {
  methods: {
    /** 点击空白处
     * @description:
     * @author: qi-you
     * @return {*}
     */
    clickkb() {
      this.commit = false
      uni.showTabBar()
    },
    /** 预览图片
     * @description:
     * @author: qi-you
     * @param {*} url url地址
     * @return {*}
     */
    clickImg(url) {
      uni.previewImage({
        urls: [url],
        longPressActions: {
          itemList: ['发送给朋友', '保存图片', '收藏'],
          success: function (data) {
            console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片')
          },
          fail: function (err) {
            console.log(err.errMsg)
          },
        },
      })
    },
    publicBack() {
      const pages = getCurrentPages() // eslint-disable-line
      // 有可返回的页面则直接返回，uni.navigateBack  默认返回失败之后会自动刷新页面 ，无法继续返回
      if (pages.length > 1) {
        uni.navigateBack(1)
        return
      }
      // vue router 可以返回uni.navigateBack失败的页面 但是会重新加载
      const a = this.$router.go(-1)
      // router.go失败之后则重定向到首页
      if (a == undefined) {
        uni.reLaunch({
          url: '/pages/index/index',
        })
      }
    },
    geTo(path) {
      uni.navigateTo({
        url: path,
      })
    },
    /** 关注/取关
     * @description:
     * @author: qi-you
     * @param {*} user_id
     * @param {*} type 1=关注,2=取关
     * @return {*}
     */
    async operateFootprint(user_id, type) {
      return new Promise((resolve, reject) => {
        this.$api.user
          .operateFootprint({ user_id, type })
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
            showLoading({
              icon: 'error',
              message: err.message,
            })
            setTimeout(() => {
              hideLoading()
            }, 1000)
          })
      })
    },
    /** 点赞/取消
     * @description:
     * @author: qi-you
     * @param {*} single_id 短文id
     * @param {*} type 1=点赞,2=取消点赞
     * @return {*}
     */
    async like(single_id, type) {
      return new Promise((resolve, reject) => {
        this.$api.article
          .like({ single_id, type })
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
            showLoading({
              icon: 'error',
              message: err.message,
            })
            setTimeout(() => {
              hideLoading()
            }, 1000)
          })
      })
    },
    /** 评论/回复 点赞|删除
     * @description:reply_id:评论|回复 id,type:1=点赞,2=取消,single_id:文章id
     * @author: qi-you
     */
    commentReplyLike({ single_id, type, reply_id }) {
      return new Promise((resolve, reject) => {
        this.$api.article
          .commentReplyLike({ single_id, type, reply_id })
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
            showLoading({
              icon: 'error',
              message: err.message,
            })
            setTimeout(() => {
              hideLoading()
            }, 1000)
          })
      })
    },
  },
  computed: {
    ...mapGetters('user', ['isuserInfo', 'isuserStatus']),
    ...mapGetters('appInfo', ['isappInfo']),
  },
}
