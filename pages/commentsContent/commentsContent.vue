<template>
  <div class="commentsContent" v-if="replyData">
    <Title title="回复">
      <image slot="left-icon" src="@/static/common/ref.png" @click.stop="refresh" mode="" />
      <image @tap.stop="clickX" slot="right" style="width: 44rpx; height: 44rpx" src="@/static/common/x.png" mode="" />
    </Title>
    <div class="comments-box">
      <div class="header-image-wrapper" v-if="replyData.user_info">
        <image
          style="width: 85rpx; height: 85rpx; border-radius: 50%"
          :src="replyData.user_info.avatar instanceof Array ? replyData.user_info.avatar[0] : replyData.user_info.avatar"
        />
      </div>
      <!-- 可以封装组件 -->
      <div class="comments-content-wrapper">
        <div class="user-name" v-if="replyData.user_info">{{ replyData.user_info.name }}</div>
        <div class="comments-content-text">{{ replyData.content }}</div>
        <!-- 评论底部 -->
        <div class="comments-bottom">
          <div class="time">{{ replyData.time.substring(5, 16) }}</div>
          <div class="bottom-right">
            <div class="zf item">
              <image src="@/static/commentsContent/zf.png"></image>
            </div>
            <div @tap.stop="clickComment(replyData)" class="mesg item">
              <image src="@/static/commentsContent/comment.png"></image>
            </div>
            <div class="zan item">
              <image
                @tap.stop="clickZan(replyData)"
                v-if="replyData.comment_reply_forward_id == 1"
                src="@/static/my/myDetail/zan.png"
              ></image>
              <image @tap.stop="clickZan(replyData, false)" v-else src="@/static/commentsContent/nzan.png"></image>
            </div>
            <div v-if="replyData.like > 0" :style="replyData.comment_reply_forward_id == 1 ? 'color:#ff5904' : ''" class="zan-number">
              {{ replyData.like > 999 ? (replyData.like / 1000).toFixed() + 'k' : replyData.like }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="other-comments-box">
      <div class="hot-wrapper">
        <div class="image-box">
          <image src="@/static/commentsContent/hot.png" mode="" />
        </div>
      </div>
      <!-- 评论组件 -->
      <div v-for="(item, index) in isuserStatus.selectComments.replyData" :key="index" class="comments-box">
        <div class="header-image-wrapper">
          <!-- 头像 -->
          <image
            v-if="isuserStatus.selectComments.user_info"
            style="width: 85rpx; height: 85rpx; border-radius: 50%"
            :src="item.user_info.avatar instanceof Array ? item.user_info.avatar[0] : item.user_info.avatar"
          />
        </div>
        <!-- 可以封装组件 -->
        <div class="comments-content-wrapper">
          <div v-if="isuserStatus.selectComments.user_info" class="user-name">{{ item.user_info.name }}</div>
          <div class="comments-content-text">{{ item.content }}</div>
          <!-- 回复评论 -->
          <div class="my-comments-box" v-if="item.replyData && item.replyData.length > 0">
            <div class="comments-warpper" style="" v-for="(item, index) in item.replyData.slice(0, 2)" :key="index">
              <div v-if="isuserStatus.selectComments.user_info" class="comments-name" style="">{{ item.user_info.name }}:</div>
              <div class="comments-content" style="">{{ item.content }}</div>
            </div>
            <div v-if="item.replyData.length > 2" @tap.stop="clickTotalComments(item)" class="total-comments">
              共{{ item.replyData.length }}条回复>
            </div>
          </div>
          <!-- 评论底部 -->
          <div class="comments-bottom">
            <div class="time">{{ item.time.substring(5, 16) }}</div>
            <div class="bottom-right">
              <div class="zf item">
                <image src="@/static/commentsContent/zf.png"></image>
              </div>
              <div @tap.stop="clickComment(item, true)" class="mesg item">
                <image src="@/static/commentsContent/comment.png"></image>
              </div>
              <div class="zan item">
                <image
                  @tap.stop="clickZan(item, true)"
                  v-if="commitLike(item)"
                  class="image_4"
                  src="@/static/commentsContent/zan.png"
                  mode=""
                />
                <image v-else @tap.stop="clickZan(item, true)" class="image_4" src="@/static/commentsContent/nzan.png" mode="" />
                <!-- <image src="@/static/my/myDetail/zan.png"></image> -->
              </div>
              <div v-if="item.like > 0" :style="item.comment_reply_forward_id == 1 ? 'color:#ff5904' : ''" class="zan-number">
                {{ item.like > 999 ? (item.like / 1000).toFixed() + 'k' : item.like }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="test"
      v-if="commit"
      style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgb(2, 3, 3, 0.3)"
      @click.stop="clickkb"
    ></div>
    <CommentsInput :iShowIcon="false" v-if="commit" :iscommit="commit" @sumbit="sumbit"></CommentsInput>
  </div>
</template>

<script>
import CommentsInput from '@/components/CommentsInput/index.vue'
export default {
  name: 'commentsContent',
  components: {
    CommentsInput,
  },
  props: {},
  data() {
    return {
      commit: false,
      reply_id: null,
      selectComments: null,
      replyUserInfo: null,
      replyData: null,
    }
  },
  computed: {
    commitLike() {
      return function (item) {
        if (item.comment_reply_forward_id == 1) {
          return true
        } else {
          return false
        }
      }
    },
  },
  // 页面周期函数--监听页面加载
  async onLoad(e) {
    this.replyData = JSON.parse(e.replyData)
    // console.log('log - onLoad - JSON.parse(e)', JSON.parse(e.replyData))
    // this.reply_id = e.reply_id
  },
  // todo 利用传过来的数据进行显示主回复数据，下面的回复数据，通过网络获取数据，不从vuex中获取数据显示
  async created() {
    console.log('log - onLoad - this.reply_id', this.reply_id)
    console.log('调用created')

    console.log('log - created - this.selectComments', this.selectComments)
  },
  methods: {
    /** 网络重新获取回复的数据
     * @description:
     * @author: qi-you
     * @return {*}
     */
    async init() {
      let selectComments = this.replyData
      for (let index = 0; index < selectComments.replyData.length; index++) {
        const element = selectComments.replyData[index]
        let iShowLoading = false
        if (index == 0 || index == selectComments.length - 1) {
          iShowLoading = true
        }
        let tmpObj = await this.loadCommentReply1(element.single_id, element.reply_id, iShowLoading)
        element.replyData = tmpObj
      }
      this.$store.commit('user/SET_USER_SELECT_COMMENTS', null)
      this.$store.commit('user/SET_USER_SELECT_COMMENTS', selectComments)
      console.log('log - init - selectComments', selectComments)
    },
    /** 用户点击评论显示输入框
     * @description:
     * @author: qi-you
     * @param {*} item
     * @return {*}
     */
    clickComment(item, isReply = false) {
      console.log('log - clickComment - item', item)
      isReply && this.$store.commit('user/SET_USER_SELECT_REPLY', item)
      this.commit = true
    },
    /** 点击更多的评论
     * @description:
     * @author: qi-you
     * @param {*} item
     * @return {*}
     */
    clickTotalComments(item) {
      console.log('log - clickTotalComments - item', item)
      this.geTo('/pages/commentsContent/commentsContent?replyData=' + JSON.stringify(item))
      this.$store.commit('user/SET_USER_SELECT_COMMENTS', item)
    },
    /** 点击点赞
     * @description:
     * @author: qi-you
     * @param {*} p 传过来的值
     * @param {*} isReply 判断是否是下面的回复
     * @return {*}
     */
    clickZan(p, isReply = false) {
      console.log('log - clickZan - p', p)
      /** 评论/回复 点赞|删除
       * @description:reply_id:评论|回复 id,type:1=点赞,2=取消,single_id:文章id
       * @author: qi-you
       */
      // 判断时候点赞还是取消
      if (p.comment_reply_forward_id == 2) {
        this.commentReplyLike({
          reply_id: p.reply_id,
          type: 1,
          single_id: p.single_id,
        })
          .then(res => {
            if (res.code != 200) return
            let tmpObj = this.isuserStatus.selectComments
            // 判断是上面的回复还是下面的回复
            if (isReply) {
              // 如果是下面的回复
              let replyindex = tmpObj.replyData.findIndex(item => p.reply_id == item.reply_id)
              tmpObj.replyData[replyindex].comment_reply_forward_id = 1
              tmpObj.replyData[replyindex].like++
            } else {
              tmpObj.comment_reply_forward_id = 1
              tmpObj.like++
            }
            this.$store.commit('user/SET_USER_SELECT_COMMENTS', tmpObj)
          })
          .catch(err => {
            console.log('log - this.commentReplyLike - err', err)
          })
      } else {
        this.commentReplyLike({
          reply_id: p.reply_id,
          type: 2,
          single_id: p.single_id,
        })
          .then(res => {
            if (res.code != 200) return
            let tmpObj = this.isuserStatus.selectComments
            // 判断是上面的回复还是下面的回复
            if (isReply) {
              // 如果是下面的回复
              let replyindex = tmpObj.replyData.findIndex(item => p.reply_id == item.reply_id)
              tmpObj.replyData[replyindex].comment_reply_forward_id = 2
              tmpObj.replyData[replyindex].like--
            } else {
              tmpObj.like--
              tmpObj.comment_reply_forward_id = 2
            }
            this.$store.commit('user/SET_USER_SELECT_COMMENTS', tmpObj)
          })
          .catch(err => {
            console.log('log - this.commentReplyLike - err', err)
          })
      }
    },
    /** 用户点击发送
     * @description:
     * @author: qi-you
     * @return {*}
     */
    sumbit(val) {
      if (val.length > 0) {
        // 如果有值就是选择了回复
        if (this.isuserStatus.selectReply) {
          this.$api.article
            .reply({
              single_id: this.isuserStatus.selectReply.single_id,
              reply_id: '',
              file_address: [],
              comment_id: this.isuserStatus.selectReply.reply_id,
              type: 1,
              information: val,
              user_id: this.isuserStatus.selectReply.user_id,
            })
            .then(async res => {
              if (res.code != 200) return
              this.commit = false
              this.$store.commit('user/SET_USER_SELECT_REPLY', null)
              // console.log('log - this.$api.article.comment - res', res)
              await this.init()
              // let tmp = await this.loadCommentReply1(this.isuserStatus.selectReply.single_id, this.isuserStatus.selectReply.reply_id)
              // console.log('log - sumbit - tmp', tmp)
            })
            .catch(err => {
              console.log('log - this.$api.article.comment - err', err)
            })
        } else {
          this.$api.article
            .reply({
              single_id: this.isuserStatus.selectComments.single_id,
              reply_id: '',
              file_address: [],
              comment_id: this.isuserStatus.selectComments.reply_id,
              type: 1,
              information: val,
              user_id: this.isuserStatus.selectComments.user_id,
            })
            .then(async res => {
              if (res.code != 200) return
              this.commit = false
              // this.$store.commit('user/SET_USER_SELECT_REPLY', null)
              // console.log('log - this.$api.article.comment - res', res)
              await this.init()
              // let tmp = await this.loadCommentReply1(this.isuserStatus.selectReply.single_id, this.isuserStatus.selectReply.reply_id)
              // console.log('log - sumbit - tmp', tmp)
            })
            .catch(err => {
              console.log('log - this.$api.article.comment - err', err)
            })
        }
      } else {
        this.commit = false
        this.$store.commit('user/SET_USER_SELECT_REPLY', null)
      }
      console.log('log - sumbit - val', val)
    },
    /** 网络获取评论回复
     * @description:网络获取评论
     * @author: qi-you
     * @return {*}
     */
    async loadCommentReply1(single_id, reply_id, iShowLoading) {
      return await this.$api.article
        .loadCommentReply(
          {
            single_id,
            type: 2,
            reply_id,
          },
          iShowLoading
        )
        .then(res => {
          if (res.code != 200) return
          // console.log('log - this.$api.article.loadCommentReply1 - res', res)
          return res.data
        })
        .catch(err => {
          console.log('log - loadCommentReply1 - err', err)
        })
    },
    /** 用户点击x
     * @description:
     * @author: qi-you
     * @return {*}
     */
    clickX() {
      this.publicBack()
      // this.$store.commit('user/SET_USER_SELECT_COMMENTS', null)
    },
    refresh() {
      window.location.reload()
    },
  },
  watch: {},
  async onShow() {
    await this.init()
    // this.selectComments是选择回复下面的回复数据，而不是回复本身的数据
    // this.selectComments = await this.loadCommentReply1(this.isuserStatus.selectComments.single_id, this.reply_id)
    // console.log('log - onShow - this.selectComments', this.selectComments)
  },
  // 组件周期函数--监听组件挂载完毕
  mounted() {},
  // 组件周期函数--监听组件数据更新之前
  beforeUpdate() {},
  // 组件周期函数--监听组件数据更新之后
  updated() {},
  // 组件周期函数--监听组件激活(显示)
  activated() {},
  // 组件周期函数--监听组件停用(隐藏)
  deactivated() {
    console.log('log - 组件周期函数监听组件停用(隐藏)--')
  },
  // 组件周期函数--监听组件销毁之前
  beforeDestroy() {},
}
</script>

<style scoped lang="scss">
.commentsContent {
  background-color: #eee;
  padding-bottom: 124rpx;
  min-height: 100vh;
}

.comments-box {
  padding: 30rpx 30rpx 17rpx 30rpx;
  display: flex;
  background-color: #fff;
  box-shadow: 0px 3px 6px 1px rgba(145, 145, 145, 0.16);
  border-bottom: 1px solid #eee;

  .header-image-wrapper {
    width: 85rpx;
    height: 85rpx;
  }

  .comments-content-wrapper {
    margin-left: 21rpx;

    .user-name {
      width: 500rpx;
      font-size: 24rpx;
      font-family: PingFang SC-Medium, PingFang SC;
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      // border: 1rpx solid black;
    }

    .user-name-vip {
      color: #ff5904;
    }

    .comments-content-text {
      margin-top: 10rpx;
      font-size: 28rpx;
      font-family: PingFang SC-Medium, PingFang SC;
      font-weight: 500;
      color: #333333;
      line-height: 40rpx;
    }
  }

  .comments-bottom {
    // width: 100%;
    display: flex;
    justify-content: space-between;

    .time {
      width: 186rpx;
      margin-top: 21rpx;
      font-size: 24rpx;
      font-family: PingFang SC-Medium, PingFang SC;
      overflow: hidden;
      // font-weight: 500;
      color: #999999;
    }

    .bottom-right {
      display: flex;
      // justify-content: space-around;
      align-items: end;
      margin-left: 171rpx;
      flex: 1;

      .item {
        margin-right: 33rpx;

        image {
          width: 100%;
          height: 100%;
        }
      }

      .zf {
        width: 37rpx;
        height: 37rpx;
      }

      .mesg {
        width: 43rpx;
        height: 43rpx;
        position: relative;
        top: 4rpx;
      }

      .zan {
        width: 41rpx;
        height: 41rpx;
        margin-right: 10rpx;
      }

      .zan-number {
        font-size: 28rpx;
        font-family: '.PingFang SC-Medium, PingFang SC';
        font-weight: 500;
        color: #999999;
        position: relative;
        top: 4rpx;
        // line-height: 40px;
      }
    }
  }
}

.other-comments-box {
  margin-top: 20rpx;
  background-color: #fff;

  .hot-wrapper {
    position: relative;

    .image-box {
      width: 30rpx;
      height: 39rpx;
      position: relative;
      right: 56rpx;
      top: 0;
      bottom: 0;

      image {
        height: 100%;
        width: 100%;
      }
    }
  }
}

.my-comments-box {
  box-sizing: border-box;
  padding: 20rpx;
  margin-top: 21rpx;
  width: 585rpx;
  // height: 188rpx;
  background: #f5f5f5;

  .comments-warpper {
    display: flex;
    margin-bottom: 12rpx;

    &:last-of-type {
      margin-bottom: 0;
    }

    // align-items: center;
    .comments-name {
      max-width: 120rpx;
      color: #4371a2;
      font-size: 24rpx;
      font-weight: 500;
      height: 44rpx;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .comments-content {
      flex: 1;
      font-size: 24rpx;
      font-weight: 500;
      height: 44rpx;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .total-comments {
    color: #4371a2;
  }
}
</style>
