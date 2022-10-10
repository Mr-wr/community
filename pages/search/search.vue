<template>
  <div class="search">
    <view class="flex-col page">
      <view class="flex-col group">
        <view @tap="clickSearch" class="flex-col section seach-top">
          <view class="flex-row justify-center space-x-11 section_2">
            <image class="image" src="@/static/search/search.png" />
            <text style="font-size: 28rpx" class="font_1 text">大家都在搜：链游_DEFI、主链_钱包</text>
          </view>
        </view>
        <!-- <scroll-view scroll-x="true"> -->
        <view class="title-header-wrapper">
          <view
            @tap.stop="clickTitle(index)"
            :style="titleSelect == index ? 'color: #000;' : ''"
            class="title-item"
            v-for="(item, index) in isappInfo.titleType"
            :key="index"
          >
            {{ item.single_type_name }}
          </view>
        </view>
        <!-- </scroll-view> -->
        <!-- 最近热搜 -->
        <view class="flex-col space-y-18 group_2">
          <view class="flex-row">
            <image class="image_2" src="@/static/search/hot.png" />
            <text class="font_1 text_2">最近热搜</text>
          </view>
          <view class="hot-wrapper">
            <view @tap.stop="clickHot(item.search_log_content)" v-for="(item, index) in hotSearchLog" :key="index" class="hot-text">
              {{ item.search_log_content }}
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="" style="margin: 0rpx auto 20rpx; background: #fff; padding: 20rpx">
      <image :src="advertiseImg" style="width: 690rpx; height: 189rpx"></image>
    </view>

    <!-- // todo  -->
    <CommunityInfoCard
      class="my-communityCard"
      v-for="(item, index) in testShowDate"
      :iShowX="true"
      :key="index"
      :iShowFollow="true"
      :singleData="item"
      @sub="sub"
      @gz="gz"
      @refresh="init(), getSingleText()"
    >
    </CommunityInfoCard>
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
  name: 'search',
  components: {
    CommunityInfoCard,
  },
  props: {},
  data() {
    return {
      commit: false,
      titleSelect: 0,
      titleList: ['发现', '快讯', '区块链', '项目', 'NFT', '元宇宙'],
      testShowDate: [],
      hotSearchLog: [],
      page: 1,
      valComments: '',
      advertiseImg: '',
      Clicksingle_id: 0,
    }
  },
  computed: {},
  methods: {
    /** 用户点击热门
     * @description:
     * @author: qi-you
     * @return {*}
     */
    clickHot(item) {
      this.geTo('/pages/search/searchDetail/searchDetail?hotSearchLog=' + JSON.stringify(this.hotSearchLog) + '&hostContext=' + item)
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
          this.getSingleText()
          uni.showTabBar()
          this.valComments = ''
          console.log('log - this.$api.article.comment - res', res)
        })
        .catch(err => {
          console.log('log - this.$api.article.comment - err', err)
        })
    },
    async getSearchLog() {
      await this.$api.article
        .getSearchLog()
        .then(res => {
          if (res.code != 200) return
          this.hotSearchLog = res.data
        })
        .catch(err => {
          console.log('log - awaitthis.$api.article.getSearchLog - err', err)
        })
    },
    /** 点击了搜索框
     * @description:
     * @author: qi-you
     * @return {*}
     */
    clickSearch() {
      this.geTo('/pages/search/searchDetail/searchDetail?hotSearchLog=' + JSON.stringify(this.hotSearchLog))
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
    // todo 点击关注后滚轮滚到之前的位置
    /** 点击了关注
     * @description:
     * @author: qi-you
     * @return {*}
     */
    async gz(item) {
      let { user_id } = item
      this.testShowDate.forEach(obj => {
        if (obj.user_id == user_id) {
          if (obj.user_info.is_footprint == 1) {
            obj.user_info.is_footprint = 2
          } else {
            obj.user_info.is_footprint = 1
          }
        }
      })
    },
    // 网络数据-获取首页分类文章
    async getSingleText() {
      await this.$api.home
        .getSingleText({
          type_id: this.titleSelect,
          page: this.page,
          recom: 1,
          search_text: '',
        })
        .then(result => {
          if (result.code != 200) return
          this.page++
          this.testShowDate.push(...result.data)
        })
        .catch(err => {
          console.log(err)
        })
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
    /** 点击滑动的title
     * @description:
     * @author: qi-you
     * @param {*} index
     * @return {*}
     */
    async clickTitle(index) {
      this.titleSelect = index
      this.init()
      await this.getSingleText()
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {},
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  async onShow() {
    if (this.isappInfo.titleType.length <= 0) {
      await this.$store.dispatch('appInfo/getSingleType')
    }
    await this.getSearchLog()
    this.getSingleText()
    await this.$api.article
      .getAdvertise()
      .then(res => {
        if (res.code != 200) return
        this.advertiseImg = res.data.image
        console.log('log - .getAdvertise - res', res)
      })
      .catch(err => {
        console.log('log - .getAdvertise - err', err)
      })
  },
  // 页面周期函数--监听页面隐藏
  onHide() {},
  // 页面周期函数--监听页面卸载
  onUnload() {},
  // 页面处理函数--监听用户下拉动作
  async onPullDownRefresh() {
    this.page = 1
    this.testShowDate = []
    if (this.isappInfo.titleType.length <= 0) {
      await this.$store.dispatch('appInfo/getSingleType')
    }
    await this.getSearchLog()
    this.getSingleText()
    await this.$api.article
      .getAdvertise()
      .then(res => {
        if (res.code != 200) return
        this.advertiseImg = res.data.image
        console.log('log - .getAdvertise - res', res)
      })
      .catch(err => {
        console.log('log - .getAdvertise - err', err)
      })
    uni.stopPullDownRefresh()
  },
  // 页面处理函数--监听用户上拉触底
  onReachBottom() {
    this.getSingleText()
  },
  // 页面处理函数--监听页面滚动(not-nvue)
  // onPageScroll(event) {},
  // 页面处理函数--用户点击右上角分享
  // onShareAppMessage(options) {},
}
</script>

<style scoped lang="scss">
.search {
  background-color: #eee;
}
.hot-wrapper {
  display: flex;
  flex-wrap: wrap;
  position: relative;
  padding-left: 8rpx;

  &::after {
    display: block;
    content: '';
    position: absolute;
    top: 20rpx;
    left: 50%;
    width: 0;
    height: 80%;
    border-left: 1px solid #eee;
  }
  // border: 1rpx solid red;
  .hot-text {
    margin-top: 16rpx;
    width: 250rpx;
    // height: 33rpx;
    height: 46rpx;
    font-size: 28rpx;
    font-family: PingFang SC-Medium, PingFang SC;
    font-weight: 500;
    color: #000;
    // border: 1rpx solid red;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    &:nth-of-type(2n-1) {
      margin-right: 163rpx;
    }
    &:nth-of-type(2n) {
      padding-left: 10rpx;
    }
  }
}

.title-header-wrapper {
  display: flex;
  height: 70rpx;
  background: #fafafa;
  justify-content: space-around;
  border-bottom: 1rpx solid rgba(0, 0, 0, 0.05);
}

.title-header-wrapper .title-item {
  // margin-top: 20rpx;
  padding-top: 6rpx;
  // margin-right: 60rpx;
  font-size: 32rpx;
  font-family: PingFang SC-Medium, PingFang SC;
  font-weight: bolder;
  color: #999999;
}

.title-header-wrapper .title-item:first-of-type {
  // margin-left: 30rpx;
}

.page {
  background-color: #ffffff;
  width: 100%;
  /* overflow-y: auto;
  overflow-x: hidden; */
}

.group {
  /* overflow-y: auto; */
}

.section {
  padding-bottom: 15rpx;
  /* background-color: #fafafa; */
}

.seach-top {
  height: 88rpx;
  display: flex;
  align-items: center;
  // border-bottom: 2rpx solid #ccc;
}

.space-x-11 > view:not(:first-child),
.space-x-11 > text:not(:first-child),
.space-x-11 > image:not(:first-child) {
  margin-left: 11rpx;
}

.section_2 {
  margin-left: 8rpx;
  // margin-right: 28rpx;
  margin-top: 15rpx;
  height: 80%;
  padding: 15rpx 133rpx 13rpx;
  background-color: #e3e3e3;
  border-radius: 20rpx;
}

.image {
  // margin-bottom: 2rpx;
  width: 30rpx;
  height: 30rpx;
}

.font_1 {
  font-size: 24rpx;
  font-family: PingFang-SC-Light;
  font-weight: 300;
  color: #999999;
}

.text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 29rpx;
  width: 381rpx;
}

.space-y-18 > view:not(:first-child),
.space-y-18 > text:not(:first-child),
.space-y-18 > image:not(:first-child) {
  margin-top: 18rpx;
}

.group_2 {
  padding: 30rpx 24rpx 26rpx;
}

.image_2 {
  opacity: 0.8;
  width: 37rpx;
  height: 37rpx;
}

.text_2 {
  margin: 9rpx 0 6rpx 7rpx;
  line-height: 22rpx;
}

.group_3 {
  padding-left: 6rpx;
}

.font_2 {
  font-size: 24rpx;
  font-family: PingFang-SC-Medium;
  line-height: 22.5rpx;
  color: #333333;
}

.text_3 {
  align-self: center;
}

.group_4 {
  padding-top: 16rpx;
  width: 318.5rpx;
}

.group_5 {
  padding-bottom: 12rpx;
  width: 318.5rpx;
}

.group_6 {
  margin-top: 10rpx;
  padding: 0 2rpx;
}

.text_4 {
  margin-top: 5rpx;
}

.group_7 {
  margin-right: 100rpx;
  padding-top: 5rpx;
}

.space-x-89 > view:not(:first-child),
.space-x-89 > text:not(:first-child),
.space-x-89 > image:not(:first-child) {
  margin-left: 89rpx;
}

.group_8 {
  margin-top: 4rpx;
}

.text_5 {
  align-self: center;
}

.group_9 {
  padding-bottom: 16rpx;
  flex: 1 1 auto;
}

.group_10 {
  padding-top: 20rpx;
}

.group_11 {
  margin-top: 6rpx;
  padding-top: 16rpx;
}

.image_3 {
  border-radius: 20rpx;
  width: 690rpx;
  height: 189rpx;
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
.my-communityCard {
  background-color: #fff;
  margin-bottom: 20rpx;
}
.my-communityCard:nth-last-child(1) {
  padding-bottom: 106rpx;
}
</style>
