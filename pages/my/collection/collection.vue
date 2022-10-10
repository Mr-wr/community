<template>
  <div class="collection">
    <Title style="z-index: 2" title="收藏"></Title>
    <div class="my-communityCard" v-for="(item, index) in testShowDate" :key="index">
      <!-- <image @tap.stop="open(item.single_text_id)" class="myimage_2" src="@/static/common/close.png" /> -->
      <CommunityInfoCard ref="shareblock" :iShowX="false" :iShowFollow="true" :singleData="item" @sub="sub" @gz="gz"> </CommunityInfoCard>
    </div>
    <!-- 评论弹出框 -->
    <div v-show="commit" class="comments">
      <div class="top">
        <div class="face-img"><img src="@/static/common/face.png" alt="" /></div>
        <div class="zf"><img src="@/static/common/@who.png" alt="" /></div>
      </div>
      <div class="bottom">
        <input class="my-input" @blur="inputBlur" v-model="valComments" type="text" :focus="commit" />
        <div class="sumbit" @tap.stop="ClickComment">发送</div>
      </div>
    </div>
  </div>
</template>
<script>
import CommunityInfoCard from '@/components/CommunityInfoCard/index.vue'
export default {
  name: 'community',
  components: {
    CommunityInfoCard,
  },
  props: {},
  data() {
    return {
      commit: false,
      valComments: '',
      Clicksingle_id: 0,
      // 2 关注，1推荐
      iSelect: 2,
      titleList: [
        '发现',
        '快讯',
        '区块链',
        '项目',
        'NFT',
        '元宇宙',
        //  '专栏', '项目', '视频'
      ],
      titleSelect: 0,
      page: 1,
      // 文章数据
      testShowDate: [],
      isScroll: false,
    }
  },

  async created() {},
  mounted() {},
  computed: {},
  methods: {
    async getCollectArticle() {
      await this.$api.user
        .getCollectArticle()
        .then(res => {
          if (res.code != 200) return
          this.testShowDate = res.data
          console.log('log - this.$api.user.getCollectArticle - res', res)
        })
        .catch(err => {
          console.log('log - this.$api.user.getCollectArticle - err', err)
        })
    },
    /** 输入框离开事件触发
     * @description:
     * @author: qi-you
     * @return {*}
     */
    inputBlur() {
      if (this.valComments.length <= 0) {
        this.commit = false
        uni.showTabBar()
      }
    },
    /** 评论组件中传来的点击事件
     * @description:
     * @author: qi-you
     * @return {*}
     */
    sub(e) {
      this.Clicksingle_id = e
      this.commit = true
      uni.hideTabBar()
    },
    /** 初始化数据
     * @description:
     * @author: qi-you
     * @return {*}
     */
    init() {
      this.testShowDate = []
      this.page = 1
    },
    // todo 点击关注后滚轮滚到之前的位置
    /** 点击了关注
     * @description:
     * @author: qi-you
     * @return {*}
     */
    async gz() {
      this.init()
      await this.getCollectArticle()
    },
    showmask() {
      this.isScroll = false
      this.$refs.shareblock.forEach((item, index) => {
        item.iShowMask = false
      })
    },
    /** 点击发送
     * @description:
     * @author: qi-you
     * @return {*}
     */
    ClickComment() {
      this.Clicksingle_id
      console.log('log - ClickComment - this.Clicksingle_id', this.Clicksingle_id)
      this.$api.article
        .comment({
          single_id: this.Clicksingle_id,
          type: 1,
          information: this.valComments,
          file_address: [],
        })
        .then(res => {
          if (res.code != 200) return
          this.commit = false
          this.init()
          this.getCollectArticle()
          uni.showTabBar()
          this.valComments = ''
          console.log('log - this.$api.article.comment - res', res)
        })
        .catch(err => {
          console.log('log - this.$api.article.comment - err', err)
        })
    },
    /** 点击x关闭
     * @description:
     * @author: qi-you
     * @return {*}
     */
    open(id) {
      this.$api.article
        .setCollectArticle({ single_id: id, type: 2 })
        .then(res => {
          if (res.code != 200) return
          this.getCollectArticle()
          console.log(res)
        })
        .catch(err => {
          this.getCollectArticle()
        })
    },
  },

  watch: {},

  // 页面周期函数--监听页面加载
  async onLoad() {},
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  async onShow() {
    this.init()
    await this.getCollectArticle()
  },
  // 页面周期函数--监听页面隐藏
  onHide() {},
  // 页面周期函数--监听页面卸载
  onUnload() {},
  // 页面处理函数--监听用户下拉动作
  // onPullDownRefresh() { uni.stopPullDownRefresh(); },
  // 页面处理函数--监听用户上拉触底
  onReachBottom() {
    this.getCollectArticle()
  },
  // 页面处理函数--监听页面滚动(not-nvue)
  // onPageScroll(event) {},
  // 页面处理函数--用户点击右上角分享
  // onShareAppMessage(options) {},
}
</script>

<style scoped lang="scss">
.myimage_2 {
  position: absolute;
  top: 10rpx;
  right: 15rpx;
  width: 48rpx;
  height: 48rpx;
  z-index: 1;
}
.community {
  /* height: 100vh; */
  position: relative;
}

.mask {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  max-height: 100vh;
  z-index: 999;
}
.my-communityCard {
  position: relative;
}
.my-communityCard:nth-last-child(2) {
  padding-bottom: 106rpx;
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

.header {
  position: sticky;
  top: 0;
  z-index: 2;
  padding: 22rpx 0;
  background-color: #fafafa;
  border-bottom: 1px solid #eee;
}

.title-header-wrapper {
  display: flex;
  margin-top: 16rpx;
  height: 100%;
  background: #fafafa;
}

.title-header-wrapper .title-item {
  margin-right: 60rpx;
  font-size: 28rpx;
  font-family: PingFang SC-Medium, PingFang SC;
  font-weight: bolder;
  color: #999999;
}

.title-header-wrapper .title-item:first-of-type {
  margin-left: 30rpx;
}

.space-y-3 > view:not(:first-child),
.space-y-3 > text:not(:first-child),
.space-y-3 > image:not(:first-child) {
  margin-top: 3rpx;
}

.group_2 {
  margin: 0 28rpx;
}

.image {
  width: 52rpx;
  height: 52rpx;
}

.space-x-54 > view:not(:first-child),
.space-x-54 > text:not(:first-child),
.space-x-54 > image:not(:first-child) {
  margin-left: 54rpx;
}

.group_3 {
  margin: 8rpx 0 10rpx;
}

.font_1 {
  font-size: 36rpx;
  /* font-family: .PingFang-SC-Regular; */
  line-height: 34rpx;
}

.text {
  color: #999999;
  line-height: 33rpx;
}

.text_2 {
  color: #333333;
  font-weight: bolder;
  line-height: 33rpx;
}

.image_2 {
  margin: 3rpx 0;
  width: 39rpx;
  height: 46rpx;
}

.image_3 {
  margin-right: 246rpx;
  align-self: flex-end;
  border-radius: 30rpx;
  width: 72rpx;
  height: 4rpx;
}

.orgain-bottom::after {
  display: block;
  position: absolute;
  content: '';
  width: 100%;
  height: 6rpx;
  background: #ff5904;
  border-radius: 6rpx;
  bottom: -20rpx;
}

.no-scroll {
  height: 100vh;
  overflow: hidden;
}
</style>
