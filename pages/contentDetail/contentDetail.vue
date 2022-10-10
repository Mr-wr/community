<template>
  <div class="contentDetail">
    <Title ref="title" title="内容详情"> </Title>
    <scroll-view class="my-scroll" scroll-y="true">
      <!-- 头像 -->
      <UserHeader
        v-if="singleData.user_info"
        class="my-header"
        :time="singleData.create_at"
        :iShowFollow="true"
        :iShowX="false"
        :user_id="singleData.user_id"
        :avatar="singleData.user_info.avatar[0]"
        :name="singleData.user_info.name"
        :isfootprint="singleData.user_info.is_footprint"
        @gz="gz"
      >
      </UserHeader>
      <!-- 内容 -->
      <ArticleContent
        class="my-articleContent"
        :textContent="singleData.single_text_content"
        :isContentAll="false"
        :imgUrlAry="singleData.media"
      ></ArticleContent>
      <!-- 转发内容 -->
      <view
        v-if="single_text_forward_id && issingle_text_forward"
        @tap.stop="geTo('/pages/contentDetail/contentDetail?single_id=' + single_text_forward_id.single_text_id)"
        style="maring-top: 0"
        class="flex-col my-space-y-15 my-section_2"
      >
        <view class="my-group_4" style="width: 100%">
          <span class="my-font_3">
            <span v-if="single_text_forward_id.user_info" style="margin-right: 10rpx; color: #5b7b9e"
              >@{{ single_text_forward_id.user_info.name }}:</span
            >
            <span v-html="single_text_forward_id.single_text_content">
              <!-- {{
                single_text_forward_id.single_text_content.length > 133
                  ? single_text_forward_id.single_text_content.substring(0, 113) + '...'
                  : single_text_forward_id.single_text_content
              }} -->
              <span
                @tap.stop="geTo('/pages/contentDetail/contentDetail?single_id=' + singleData.single_text_forward_id.single_text_id)"
                v-if="single_text_forward_id.single_text_content.length > 133"
                class="my-font_4"
              >
                全文
              </span>
            </span>
          </span>
        </view>
        <image
          :style="single_text_forward_id.media.length == 1 ? 'width:444rpx' : ''"
          v-if="single_text_forward_id.media.length > 0"
          class="my-image_4"
          :src="single_text_forward_id.media[0]"
          mode="widthFix"
        />
      </view>
      <!-- end 转发内容 -->
      <!-- 评论 -->
      <view class="flex-col group">
        <text class="text">{{ commentsData.length > 0 ? '其他评论' : '暂无评论' }}</text>
        <!-- // todo 循环评论 -->

        <!-- <CommentsDetail class="my-comments" :commentsData="commentsData"></CommentsDetail> -->
        <!-- // todo 循环评论 -->
        <view style="margin-bottom: 20rpx" v-for="(item, index) in commentsData" :key="index" class="flex-col space-y-20">
          <view class="flex-col section">
            <view class="flex-row space-x-14">
              <image class="image" :src="item.user_info.avatar[0]" />
              <view class="flex-col space-y-13 group_2" style="margin-top: -60rpx">
                <view class="flex-row">
                  <text
                    style="
                      max-width: 400rpx;
                      white-space: nowrap;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      font-size: 32rpx;
                      font-weight: 500;
                      color: #000;
                    "
                    class="font_1"
                    :class="{ text_2: false }"
                  >
                    {{ item.user_info.name }}
                  </text>
                  <!-- vip 图标 -->
                  <image v-if="false" class="image_2" src="" />
                </view>
              </view>
            </view>
            <view class="flex-col group_3" style="margin-top: -46rpx">
              <text style="font-weight: 500" class="font_2">{{ item.content }}</text>
              <!-- <text class="font_2"
                >创建原创内容，以及建立内容创作者网络和在电撒低级发上来大家离开洒家离开洒家发离开洒家发看拉萨大家啊克里斯蒂克里斯蒂安金克拉撒旦考虑撒旦记录卡吉萨大刻录机撒旦风口浪尖法撒旦吉萨大考虑艰苦撒旦分类金克拉撒旦降落速度加快了速度氨基酸</text
              > -->
              <!-- 回复评论 -->
              <div class="comments-box" v-if="item.replyData.length > 0">
                <div class="comments-warpper" style="" v-for="(item, index) in item.replyData.slice(0, 2)" :key="index">
                  <div class="comments-name" style="">{{ item.user_info.name }}:</div>
                  <div class="comments-content" style="">{{ item.content }}</div>
                </div>
                <div v-if="item.reply_num > 2" @tap.stop="clickTotalComments(item)" class="total-comments">
                  共{{ item.reply_num }}条回复>
                </div>
              </div>
              <view class="flex-row justify-between group_4">
                <text class="text_4">{{ item.time.substring(5, 16) }}</text>
                <view class="flex-row space-x-37 group_5">
                  <div>
                    <image class="image_5" src="@/static/my/myDetail/zf.png" />
                  </div>
                  <image @tap.stop="clickComment(item)" class="image_3" src="@/static/my/myDetail/comments.png" />
                  <image
                    @tap.stop="clickZan(item)"
                    v-if="commitLike(item)"
                    class="image_4"
                    src="../../static/commentsContent/zan.png"
                    mode=""
                  />
                  <image v-else @tap.stop="clickZan(item)" class="image_4" src="../../static/commentsContent/nzan.png" mode="" />
                  <div
                    v-if="item.like > 0"
                    :style="item.comment_reply_forward_id == 1 ? 'color:#ff5904' : ''"
                    style="font-size: 28rpx; font-family: PingFang SC-Medium, PingFang SC; font-weight: 500; color: #999999"
                  >
                    {{ item.like > 999 ? (item.like / 1000).toFixed() + 'k' : item.like }}
                  </div>
                </view>
              </view>
            </view>
          </view>
        </view>

        <!-- 底部 -->
      </view>
    </scroll-view>
    <view v-show="!commit" ref="tabbar" class="flex-col section_3">
      <view class="flex-row space-x-30 equal-division">
        <view @tap.stop="forwarding" class="flex-row justify-center space-x-13 equal-division-item">
          <image class="image_3" src="@/static/my/myDetail/zf.png" />
          <text class="font_1 text_6">转发</text>
        </view>
        <view @tap.stop="clickComments" class="flex-row justify-center space-x-13 equal-division-item">
          <image class="image_3" src="@/static/my/myDetail/comments.png" />
          <text class="font_1 text_7">评论</text>
        </view>
        <view @tap.stop="clickLike" class="flex-row justify-center space-x-13 equal-division-item">
          <image v-if="isLike" class="image_3" src="@/static/my/myDetail/zan.png" />
          <image v-else class="image_3" src="@/static/common/fabulous.png" />
          <text class="font_1 text_8" :class="{ text_color: isLike }">赞</text>
        </view>
      </view>
    </view>
    <!-- 遮罩层 -->
    <div v-show="iShowMask" scroll="no" @tap.stop="zzc" class="">
      <div v-show="iShowMask" class="forward">
        <div class="pad35">
          <div class="icon">
            <img src="@/static/my/forward.png" alt="" />
          </div>
          <div style="width: 100%" @tap.stop="clickForw">转发</div>
        </div>
        <div class="pad35 copy">
          <div class="icon">
            <img src="@/static/my/copy.png" alt="" />
          </div>
          <div style="width: 100%">复制链接</div>
        </div>
      </div>
    </div>
    <!-- 评论弹出框 -->
    <div class="test" v-if="commit" style="position: absolute; top: 0; left: 0; right: 0; bottom: 0" @click.stop="commit = false"></div>
    <!-- 底部 -->
    <CommentsInput v-if="commit" :iscommit="commit" @sumbit="sumbit"></CommentsInput>
  </div>
</template>

<script>
import CommentsInput from '@/components/CommentsInput/index.vue'
import UserHeader from '@/components/CommunityInfoCard/UserHeader/index.vue'
import ArticleContent from '@/components/ArticleContent/index.vue'
import CommentsDetail from '../../components/CommentsDetail/index.vue'
export default {
  name: 'contentDetail',
  components: {
    UserHeader,
    ArticleContent,
    CommentsDetail,
    CommentsInput,
  },
  props: {},
  data() {
    return {
      iShowMask: false,
      commit: false,
      valComments: '',
      vheight: '',
      total: 0,
      singleData: {
        // single_text_id: 14,
        // user_id: 8,
        // single_text_content:
        //   '测试发布内容sadfsad fsadf sda fsad f撒地方萨的封建时代克拉夫艰苦撒旦附件看来撒娇发离开撒娇了反馈数据库里发是捷克洛夫金克拉金克拉撒旦看拉萨大家李开复是建立撒娇类似的经历sdlaj sdljfsadklfj slasaldj sdjf lsdjflsdj flksdjflsjlfsjd flksdj fkljsadlk asdj slkdj flsadjl fa上的辣椒粉是大家看法四点零四数据看来撒介绍了打卡机撒低级烧录卡的就是垃圾萨拉就撒辣椒粉看来撒娇发撒低级法撒旦附件老是卡就发看拉萨大家分类是。',
        // media: [
        //   'http://community.nnmm666.com/storage/formal/single_text/20220924/d92dd6d9c593112186c9305752c71552.png',
        //   'http://community.nnmm666.com/storage/formal/single_text/20220924/a592648e8e88cd243eec65c3afbf6cb4.png',
        //   'http://community.nnmm666.com/storage/formal/single_text/20220924/1c5c2559a0f2acef048985f23c293438.png',
        //   'http://community.nnmm666.com/storage/formal/single_text/20220924/dc2f11d6146e04e0eec64592d2a4e7da.png',
        // ],
        // single_type_id: 1,
        // type_forward: 0,
        // type_likes: 1,
        // type_comments: 0,
        // type_views: {},
        // privacy: 1,
        // create_at: '2022-09-24 10:55:04',
        // update_at: '2022-09-24 15:12:31',
        // is_like: 2,
        // user_info: {
        //   user_id: 8,
        //   avatar: ['http://community.nnmm666.com/storage/formal/avatar/20220921/9e21cac2a9935b731bce2e96b655dcd4.png'],
        //   name: 'asdfasd',
        //   level: 0,
        //   status: 1,
        //   is_footprint: 1,
        // },
      },
      single_id: '',
      page: 1,
      commentsDate1: [
        {
          single_id: 6,
          reply_id: '632c08397d790000d70010b3',
          user_id: 9,
          content: '测试评论',
          media: [],
          time: '2022-09-22 15:01:13',
          reply_num: 0,
          like: 0,
          user_info: {
            user_id: 9,
            avatar: ['http://community-api-local.com/storage/formal/avatar/20220921/9e21cac2a9935b731bce2e96b655dcd4.png'],
            name: '321',
            level: 0,
            status: 1,
          },
        },
        {
          single_id: 6,
          reply_id: '632c083ae949000051003603',
          user_id: 9,
          content: '测试评论',
          media: [],
          time: '2022-09-22 15:01:14',
          reply_num: 0,
          like: 0,
          user_info: {
            user_id: 9,
            avatar: ['http://community-api-local.com/storage/formal/avatar/20220921/9e21cac2a9935b731bce2e96b655dcd4.png'],
            name: '321',
            level: 0,
            status: 1,
          },
        },
        {
          single_id: 6,
          reply_id: '632c083bc94d0000f10048f4',
          user_id: 9,
          content: '测试评论',
          media: [],
          time: '2022-09-22 15:01:15',
          reply_num: 0,
          like: 0,
          user_info: {
            user_id: 9,
            avatar: ['http://community-api-local.com/storage/formal/avatar/20220921/9e21cac2a9935b731bce2e96b655dcd4.png'],
            name: '321',
            level: 0,
            status: 1,
          },
        },
        {
          single_id: 6,
          reply_id: '632c083c31700000e1001854',
          user_id: 9,
          content: '测试评论',
          media: [],
          time: '2022-09-22 15:01:16',
          reply_num: 0,
          like: 0,
          user_info: {
            user_id: 9,
            avatar: ['http://community-api-local.com/storage/formal/avatar/20220921/9e21cac2a9935b731bce2e96b655dcd4.png'],
            name: '321',
            level: 0,
            status: 1,
          },
        },
        {
          single_id: 6,
          reply_id: '632c083c7d790000d70010b4',
          user_id: 9,
          content: '测试评论',
          media: [],
          time: '2022-09-22 15:01:16',
          reply_num: 0,
          like: 0,
          user_info: {
            user_id: 9,
            avatar: ['http://community-api-local.com/storage/formal/avatar/20220921/9e21cac2a9935b731bce2e96b655dcd4.png'],
            name: '321',
            level: 0,
            status: 1,
          },
        },
        {
          single_id: 6,
          reply_id: '632c083de949000051003604',
          user_id: 9,
          content: '测试评论',
          media: [],
          time: '2022-09-22 15:01:17',
          reply_num: 0,
          like: 0,
          user_info: {
            user_id: 9,
            avatar: ['http://community-api-local.com/storage/formal/avatar/20220921/9e21cac2a9935b731bce2e96b655dcd4.png'],
            name: '321',
            level: 0,
            status: 1,
          },
        },
      ],
      commentsData: [],
      isLike: false,
      single_text_forward_id: null,
      issingle_text_forward: false,
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
  async created() {},
  mounted() {
    this.vheight = this.$refs.title.$el.offsetHeight + this.$refs.tabbar.$el.offsetHeight
    uni.getSystemInfo({
      success: res => {
        this.total = (res.windowHeight - uni.upx2px(this.vheight) - this.getClientHeight()) * 2
        console.log('log - onShow - this.total', this.total)
      },
    })
  },
  methods: {
    /** 点赞评论
     * @description:
     * @author: qi-you
     * @return {*}
     */
    clickZan(p) {
      console.log('log - clickZan - p', p)
      /** 评论/回复 点赞|删除
       * @description:reply_id:评论|回复 id,type:1=点赞,2=取消,single_id:文章id
       * @author: qi-you
       */
      // 判断时候点赞还是取消
      let replyindex = this.commentsData.findIndex(item => item.reply_id == p.reply_id)
      if (p.comment_reply_forward_id == 2) {
        this.commentReplyLike({ reply_id: p.reply_id, type: 1, single_id: p.single_id })
          .then(res => {
            if (res.code != 200) return
            this.commentsData[replyindex].like++
            this.commentsData[replyindex].comment_reply_forward_id = 1
          })
          .catch(err => {
            console.log('log - this.commentReplyLike - err', err)
          })
      } else {
        this.commentReplyLike({ reply_id: p.reply_id, type: 2, single_id: p.single_id })
          .then(res => {
            if (res.code != 200) return
            this.commentsData[replyindex].like--
            this.commentsData[replyindex].comment_reply_forward_id = 2
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
        if (this.isuserStatus.selectComments) {
          this.$api.article
            .reply({
              single_id: this.isuserStatus.articleData.single_text_id,
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
              this.$store.commit('user/SET_USER_SELECT_COMMENTS', null)
              console.log('log - this.$api.article.comment - res', res)
              await this.loadCommentReply()
            })
            .catch(err => {
              console.log('log - this.$api.article.comment - err', err)
            })
        } else {
          this.commit = false
          this.ClickComment(val)
          this.loadCommentReply()
          this.$store.commit('user/SET_USER_SELECT_COMMENTS', null)
        }
      } else {
        this.commit = false
        this.$store.commit('user/SET_USER_SELECT_COMMENTS', null)
      }
      console.log('log - sumbit - val', val)
    },
    clickTotalComments(item) {
      console.log('log - clickTotalComments - item', item)
      this.$store.commit('user/SET_USER_SELECT_COMMENTS', item)
      this.geTo('/pages/commentsContent/commentsContent?replyData=' + JSON.stringify(item))
    },
    clickComment(item) {
      console.log('log - clickComment - item', item)
      this.$store.commit('user/SET_USER_SELECT_COMMENTS', item)
      this.commit = true
    },
    /** 点击发送
     * @description:
     * @author: qi-you
     * @return {*}
     */
    ClickComment(val) {
      this.$api.article
        .comment({
          single_id: this.isuserStatus.articleData.single_text_id,
          type: 1,
          information: val,
          file_address: [],
        })
        .then(async res => {
          if (res.code != 200) return
          console.log('log - this.$api.article.comment - res', res)
        })
        .catch(err => {
          console.log('log - this.$api.article.comment - err', err)
        })
    },

    /** 点击了下面的评论
     * @description:
     * @author: qi-you
     * @return {*}
     */
    clickComments() {
      this.commit = true
    },
    /** 输入框离开事件触发
     * @description:
     * @author: qi-you
     * @return {*}
     */
    inputBlur() {
      if (this.valComments.length <= 0) {
        this.commit = false
      }
    },
    /** 点击弹出的转发按钮
     * @description:
     * @author: qi-you
     * @return {*}
     */
    clickForw() {
      this.iShowMask = false
      this.geTo('/pages/contentTo/contentTo?data=' + JSON.stringify(this.singleData))
    },
    /** 点击弹窗转发按钮
     * @description:
     * @author: qi-you
     * @return {*}
     */
    forwarding() {
      this.geTo('')
      this.iShowMask = !this.iShowMask
    },
    /** 点击遮罩层
     * @description:
     * @author: qi-you
     * @return {*}
     */
    zzc() {
      this.iShowMask = false
    },
    /** 点击赞
     * @description:
     * @author: qi-you
     * @return {*}
     */
    clickLike() {
      this.like(this.singleData.single_text_id, this.isLike == 1 ? 2 : 1)
        .then(res => {
          this.isLike = !this.isLike
        })
        .catch(err => {
          console.log(err)
        })
    },
    //获取可视区域高度【兼容】
    getClientHeight() {
      const res = uni.getSystemInfoSync()
      const system = res.platform
      if (system === 'ios') {
        return 44 + res.statusBarHeight
      } else if (system === 'android') {
        return 48 + res.statusBarHeight
      } else {
        return 0
      }
    },
    /** 网络获取单条文章内容
     * @description:网络获取单条文章内容
     * @author: qi-you
     * @return {*}
     */
    async getSingleTextInfo(single_id) {
      await this.$api.home
        .getSingleTextInfo({ single_id })
        .then(res => {
          if (res.code != 200) return
          // console.log('log - this.$api.article.getSingleTextInfo - res', res)
          this.singleData = res.data
          if (Object.keys(res.data.single_text_forward_id).length > 0) {
            this.single_text_forward_id = res.data.single_text_forward_id
            console.log('有转发内容')
            this.issingle_text_forward = true
          }
          this.$store.commit('user/SET_USER_ARTICLE', res.data)
          this.isLike = this.singleData.is_like == 1
        })
        .catch(err => {
          this.singleData = []
          console.log('getSingleTextInfo', err)
        })
    },
    /** 网络获取评论
     * @description:网络获取评论
     * @author: qi-you
     * @return {*}
     */
    async loadCommentReply() {
      await this.$api.article
        .loadCommentReply({ single_id: this.single_id, type: 1 })
        .then(async res => {
          if (res.code != 200) return
          let tmp = res.data
          // 循环赋值
          for (let index = 0; index < tmp.length; index++) {
            let iShowLoading = false
            const element = tmp[index]
            if (index == 0 || index == tmp.length - 1) {
              iShowLoading = true
            }
            element.replyData = await this.loadCommentReply1(element.single_id, element.reply_id, iShowLoading)
          }
          // console.log('log - loadCommentReply - tmp', tmp)
          this.commentsData = tmp
          // console.log('log - loadCommentReply - this.commentsData', this.commentsData)
          this.$store.commit('user/SET_USER_COMMENTS_DATA', tmp)
          // console.log('log - this.$api.article.loadCommentReply - res', res)
        })
        .catch(err => {
          console.log('log - loadCommentReply - err', err)
        })
    },
    /** 网络获取评论回复
     * @description:网络获取评论
     * @author: qi-you
     * @return {*}
     */
    async loadCommentReply1(single_id, reply_id, iShowLoading) {
      return await this.$api.article
        .loadCommentReply({ single_id, type: 2, reply_id }, iShowLoading)
        .then(res => {
          if (res.code != 200) return
          // console.log('log - this.$api.article.loadCommentReply1 - res', res)
          return res.data
        })
        .catch(err => {
          console.log('log - loadCommentReply1 - err', err)
        })
    },
    /** 点击关注
     * @description:
     * @author: qi-you
     * @return {*}
     */
    async gz() {
      await this.getSingleTextInfo(this.single_id)
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  async onLoad(e) {
    const { single_id } = e
    this.single_id = single_id
    await this.getSingleTextInfo(this.single_id)
    await this.loadCommentReply()
    console.log('log - onLoad - single_id', single_id)
  },
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  async onShow() {
    // console.log(this.onReady())
  },
  // 页面周期函数--监听页面隐藏
  onHide() {},
  // 页面周期函数--监听页面卸载
  onUnload() {},
  // 页面处理函数--监听用户下拉动作
  // onPullDownRefresh() { uni.stopPullDownRefresh(); },
  // 页面处理函数--监听用户上拉触底
  // onReachBottom() {},
  // 页面处理函数--监听页面滚动(not-nvue)
  // onPageScroll(event) {},
  // 页面处理函数--用户点击右上角分享
  // onShareAppMessage(options) {},
}
</script>

<style scoped lang="scss">
.contentDetail {
  // position: relative;
  // margin-bottom: 106rpx;
}
.my-header {
  padding-top: 20rpx;
}
.my-articleContent {
  background-color: #fff;
  // ::v-deep .my-content-wrapper {
  //   padding-top: 0 !important;
  // }
}
.contentDetail {
  position: relative;
  background-color: #eeeeee;
  // min-height: 100vh;
  overflow: hidden;
}
.contentDetail::-webkit-scrollbar {
  display: none;
  width: 0 !important;
  height: 0 !important;
  -webkit-appearance: none;
  background: transparent;
}
.my-scroll {
  overflow: hidden;
}
.my-scroll::-webkit-scrollbar {
  display: none;
  width: 0 !important;
  height: 0 !important;
  -webkit-appearance: none;
  background: transparent;
}
.user-header {
  padding-top: 30rpx;
}
.space-y-19 > view:not(:first-child),
.space-y-19 > text:not(:first-child),
.space-y-19 > image:not(:first-child) {
  margin-top: 19rpx;
}
.group {
  // padding-top: 20rpx;
  /* overflow-y: auto; */
}
.text {
  margin: 14rpx 0 14rpx 33rpx;
  align-self: flex-start;
  color: #999999;
  font-size: 24rpx;
  font-family: PingFang-SC-Medium;
}
.space-y-20 > view:not(:first-child),
.space-y-20 > text:not(:first-child),
.space-y-20 > image:not(:first-child) {
  margin-top: 20rpx;
}
.space-y-20:last-of-type {
  padding-bottom: 106rpx !important;
  margin-bottom: 0 !important;
  background-color: #fff;
}
.section {
  padding: 44rpx 0 24rpx 30rpx;
  background-color: #ffffff;
  box-shadow: 0px 3rpx 6rpx #91919129;
}
.space-x-14 > view:not(:first-child),
.space-x-14 > text:not(:first-child),
.space-x-14 > image:not(:first-child) {
  margin-left: 14rpx;
}
.image {
  flex-shrink: 0;
  width: 93rpx;
  height: 93rpx;
  border-radius: 50%;
}
.space-y-13 > view:not(:first-child),
.space-y-13 > text:not(:first-child),
.space-y-13 > image:not(:first-child) {
  margin-top: 13rpx;
}
.group_2 {
  margin-right: -26rpx;
  flex: 1 1 auto;
  align-self: center;
}
.font_1 {
  font-size: 28rpx;
  font-family: PingFang-SC-Medium;
  // line-height: 26rpx;
  color: #666666;
}
.text_2 {
  color: #ff5904;
}
.image_2 {
  margin: 5rpx 0 2rpx 8rpx;
  width: 75rpx;
  height: 19rpx;
}
.font_2 {
  font-size: 28rpx;
  font-family: PingFang-SC-Light;
  line-height: 34rpx;
  font-weight: 300;
  color: #333333;
}
.group_3 {
  margin-right: 24rpx;
  align-self: flex-end;
  width: 590rpx;
}
.text_3 {
  margin-top: 7rpx;
  align-self: flex-start;
}
.group_4 {
  margin-top: 14rpx;
}
.text_4 {
  margin-top: 20rpx;
  color: #999999;
  font-size: 24rpx;
  font-family: PingFang-SC-Light;
  font-weight: 300;
  line-height: 17.5rpx;
}
.space-x-37 > view:not(:first-child),
.space-x-37 > text:not(:first-child),
.space-x-37 > image:not(:first-child) {
  margin-left: 37rpx;
}
.group_5 {
  margin-right: 6rpx;
}
.image_5 {
  margin-bottom: 4rpx;
  width: 40rpx;
  height: 40rpx;
}
.image_3 {
  width: 46rpx;
  height: 46rpx;
}
.image_4 {
  width: 44rpx;
  height: 44rpx;
}
.section_2 {
  padding: 44rpx 0 29rpx 30rpx;
  background-color: #ffffff;
  position: relative;
}
.text_5 {
  margin-left: 14rpx;
  margin-right: -26rpx;
  flex: 1 1 auto;
}
.section_3 {
  padding: 22rpx 0 21rpx;
  /* flex-shrink: 0; */
  background-color: #ffffff;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}
.space-x-30 > view:not(:first-child),
.space-x-30 > text:not(:first-child),
.space-x-30 > image:not(:first-child) {
  margin-left: 30rpx;
}
.equal-division {
  padding: 0 29rpx;
}
.space-x-13 > view:not(:first-child),
.space-x-13 > text:not(:first-child),
.space-x-13 > image:not(:first-child) {
  margin-left: 13rpx;
}
.equal-division-item {
  flex: 1 1 230rpx;
  padding: 10rpx 36rpx;
}
.text_6 {
  align-self: center;
}
.text_7 {
  align-self: center;
}
.text_8 {
  align-self: center;
}
.text_color {
  color: #ff5904;
}

.forward {
  position: absolute;
  bottom: -28rpx;
  left: 50rpx;
  transform: translateY(-100%);
  width: 670rpx;
  background: #fff;
  border-radius: 10rpx;
  z-index: 1000;
  &::after {
    display: block;
    position: absolute;
    bottom: 10rpx;
    transform: translateY(100%);
    left: 60rpx;
    content: '';
    border: 30rpx solid transparent;
    border-top: 30rpx solid #fff;
  }
  .pad35 {
    padding-top: 20rpx;
    padding-left: 21rpx;
    padding-bottom: 20rpx;
    display: flex;
    .icon {
      width: 30rpx;
      height: 30rpx;
      margin-right: 10rpx;
    }
    img {
      width: 100%;
      height: 100%;
    }
    // background: red;
    &:first-child {
      border-bottom: 1px solid #eee;
      padding-bottom: 10rpx;
    }
  }
}
.mask {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  max-height: 100vh;
  z-index: 1;
}
.comments {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 25rpx;
  background-color: #f5f5f5;

  .top {
    display: flex;

    .face-img,
    .zf {
      width: 48rpx;
      height: 48rpx;
      // margin-top: 25rpx;
      margin-bottom: 23rpx;
    }
    .zf {
      margin-left: 36rpx;
    }
  }

  .bottom {
    display: flex;
    color: #fff;
    .my-input {
      width: 533rpx;
      height: 70rpx;
      padding-left: 20rpx;
      background-color: #fff;
      margin-right: 34rpx;
      font-size: 33rpx;
      font-family: PingFang SC;
      font-weight: 300;
      border-radius: 10rpx;
      color: #333;
    }

    .sumbit {
      width: 124rpx;
      height: 70rpx;
      background: #fe8e1b;
      border-radius: 10rpx;
      text-align: center;
      line-height: 70rpx;
      font-size: 28rpx;
      font-family: PingFang SC;
      font-weight: 300;
      color: #ffffff;
    }
  }

  img {
    height: 100%;
    width: 100%;
  }
}
.my-comments {
  margin-bottom: 20rpx;
}
.comments-box {
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
// 转发内容
.my-section_2 {
  padding: 22rpx 30rpx 24rpx;
  background-color: #f5f5f5;
}
.my-space-y-15 > view:not(:first-child),
.my-space-y-15 > text:not(:first-child),
.my-space-y-15 > image:not(:first-child) {
  margin-top: 15rpx;
}
.my-group_4 {
  line-height: 34rpx;
}
.font_3 {
  font-size: 32rpx;
  // font-family: PingFang-SC-Medium;
  line-height: 44rpx;
  color: #333333;
  margin-left: 10rpx;
  font-weight: 500;
  /* display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical; */
}
.my-font_3 {
  font-size: 32rpx;
  line-height: 44rpx;
  color: #333333;
  margin-left: 10rpx;
  font-weight: 500;
}

.my-font_4 {
  font-size: 28rpx;
  font-family: PingFang-SC-Medium;
  line-height: 34rpx;
  color: #5b7b9e;
}
.my-image_4 {
  border-radius: 20rpx;
  width: 444rpx;
  // height: 337rpx;
}
// end 转发内容
</style>
