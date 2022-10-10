<template>
  <div class="searchDetail">
    <view class="flex-col group top-search">
      <!-- 搜索 -->
      <view class="flex-col">
        <view class="flex-col section">
          <view class="flex-row items-center justify-between section_2">
            <image class="image" src="@/static/search/search.png" />
            <!-- <div
              @tap.stop="clickInput"
              style="font-size: 28rpx; font-family: .PingFang SC-Medium, PingFang SC; font-weight: 500; color: #333333"
              class="group_2"
            >
              NFT链游
            </div> -->
            <input @blur="inputBlur" @tap.stop="commit = true" placeholder="NFT链游" v-model="search_text" class="group_2" />

            <view @tap="clickSearch" class="flex-col items-center text-wrapper">
              <text style="color: #000" class="font_1 text_2">{{ search_text.length > 0 ? '搜索' : '取消' }}</text>
            </view>
          </view>
        </view>
        <!-- 历史记录 -->
        <view v-if="searchLog.length > 0" class="flex-col space-y-60 section_3">
          <view class="flex-col">
            <view v-for="item in 4" :key="item" class="flex-row my-hiy">
              <image class="image_2" src="@/static/my/myDetail/searchhiy.png" />
              <text class="font_2 text_3">区块链最新快讯</text>
            </view>
          </view>
          <text class="font_2 text_5">清空历史搜索记录</text>
        </view>
        <!-- 最近热搜 -->
        <view class="flex-col space-y-18 my-group_2">
          <view class="flex-row">
            <image class="my-image_2" src="@/static/search/hot.png" />
            <text class="my-font_1 my-text_2">最近热搜</text>
          </view>
          <view class="hot-wrapper">
            <view @tap.stop="clickHot(item.search_log_content)" v-for="(item, index) in hotSearchLog" :key="index" class="hot-text">{{
              item.search_log_content
            }}</view>
          </view>
        </view>
      </view>
    </view>
    <Card class="card" :singledata="item" v-for="(item, index) in searchData" :key="index"></Card>
    <!-- 评论弹出框 -->
    <!-- <div v-show="commit" class="comments">
      <div class="bottom">
        <input class="my-input" @blur="inputBlur" v-model="valComments" type="text" :focus="commit" />
        <div class="sumbit" @tap.stop="">搜索</div>
      </div>
    </div> -->
  </div>
</template>

<script>
import Card from 'pages/my/history/components/Card/Card.vue'
export default {
  name: 'searchDetail',
  components: {
    Card,
  },
  props: {},
  data() {
    return {
      hotSearchLog: [],
      searchLog: [],
      commit: false,
      valComments: '',
      search_text: '',
      page: 1,
      searchData: [],
      hostContext: '', // 用户热门消息
    }
  },
  computed: {},
  methods: {
    // 网络数据-获取首页分类文章
    async getSingleText() {
      await this.$api.home
        .getSingleText({
          type_id: 1,
          page: this.page,
          recom: 1,
          search_text: this.search_text,
        })
        .then(result => {
          if (result.code != 200) return
          console.log(result)
          if (result.data.length == 0) {
            uni.showToast({
              icon: 'error',
              title: '暂无搜索内容！',
              duration: 2000,
            })
          }
          this.page++
          this.searchData.push(...result.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    /** 输入框离开事件触发
     * @description:
     * @author: qi-you
     * @return {*}
     */
    inputBlur() {
      if (this.search_text.length <= 0) {
        this.commit = false
      }
    },
    /** 点击
     * @description:
     * @author: qi-you
     * @return {*}
     */
    clickInput() {
      this.commit = true
    },
    /** 点击搜索按钮
     * @description:
     * @author: qi-you
     * @return {*}
     */
    clickSearch() {
      if (this.commit) {
        this.page = 1
        this.searchData = []
        this.getSingleText()
      } else {
        this.publicBack()
      }
    },
    /** 点击热搜关键词
     * @description:
     * @author: qi-you
     * @param {*} v
     * @return {*}
     */
    async clickHot(v) {
      this.search_text = v
      this.searchData = []
      this.commit = true
      await this.clickSearch()
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad(e) {
    console.log('log - onLoad - e', e)
    this.hotSearchLog = JSON.parse(e.hotSearchLog)
    if (e.hostContext) {
      this.hostContext = e.hostContext
      this.search_text = this.hostContext
    }
  },
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {
    if (this.hostContext) {
      this.commit = true
      this.clickSearch()
    }
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
.searchDetail {
  max-width: 750rpx;

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
      color: #999;
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

.my-text_2 {
  margin: 9rpx 0 6rpx 7rpx;
  // line-height: 51rpx;
  font-size: 24rpx;
  font-family: PingFang SC-Light, PingFang SC;
  font-weight: 300;
  color: #333333;
}

.my-font_1 {
  font-size: 24rpx;
  font-family: PingFang-SC-Light;
  font-weight: 300;

  color: #333333;
}

.my-image_2 {
  opacity: 0.8;
  width: 37rpx;
  height: 37rpx;
}

.group {
  // overflow-y: auto;
}

.top-search {
  padding-top: 20rpx;
}

.section {
  padding-bottom: 17rpx;
  background-color: #fafafa;
}

.section_2 {
  margin: 0 30rpx;
  padding: 8rpx 12rpx;
  background-color: #e3e3e3;
  border-radius: 20rpx;
}

.group_2 {
  flex: 1;
  margin: 4rpx 0;
  padding: 0 5rpx;
  // border: 1rpx solid red;
}

.image {
  flex-shrink: 0;
  width: 33rpx;
  height: 33rpx;
  margin-right: 10rpx;
}

.text {
  margin: 4rpx 0 4rpx 14rpx;
  color: #333333;
  font-size: 28rpx;
  /* font-family: .PingFang-SC-Medium; */
  line-height: 26rpx;
}

.text-wrapper {
  // padding: 9rpx 0 10rpx;
  background-color: #ffffff;
  border-radius: 10rpx;
  width: 86rpx;
  height: 48rpx;
  line-height: 48rpx;
}

.font_1 {
  font-size: 24rpx;
  /* font-family: .PingFang-SC-Light; */
  // line-height: 22.5rpx;
  font-weight: 300;
}

.text_2 {
  color: #999999;

  // line-height: 51rpx;
}

.space-y-60 > view:not(:first-child),
.space-y-60 > text:not(:first-child),
.space-y-60 > image:not(:first-child) {
  margin-top: 60rpx;
}

.section_3 {
  padding: 25rpx 27rpx 32rpx;
  background-color: #fafafa;
  box-shadow: 0px 3rpx 6rpx #91919129;
  position: relative;
}

.my-hiy {
  padding: 25rpx 0;
  border-bottom: 2rpx solid #ccc;
}

.image_2 {
  width: 37rpx;
  height: 37rpx;
}

.font_2 {
  font-size: 28rpx;
  /* font-family: PingFang-SC-Light; */
  line-height: 26rpx;
  font-weight: 300;
  color: #333333;
}

.text_3 {
  width: 260rpx;
  margin: 6rpx 0 4rpx 14rpx;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.text_4 {
  margin: 6rpx 0 4rpx 14rpx;
}

.text_5 {
  align-self: center;
}

.group_3 {
  padding: 20rpx 24rpx 0;
}

.image_3 {
  opacity: 0.8;
  width: 37rpx;
  height: 37rpx;
}

.text_6 {
  margin: 9rpx 0 6rpx 7rpx;
  color: #333333;
  line-height: 22rpx;
}

.group_4 {
  padding: 0 6rpx;
}

.view {
  margin-top: 32rpx;
}

.font_3 {
  font-size: 24rpx;
  /* font-family: .PingFang-SC-Medium; */
  line-height: 22.5rpx;
  color: #999999;
}

.text_7 {
  margin-right: 110rpx;
}

.group_5 {
  margin-top: 27rpx;
  padding: 0 8rpx;
}

.text_8 {
  margin-right: 96rpx;
}

.view_2 {
  margin-top: 22rpx;
}

.text_9 {
  margin-right: 218rpx;
}

.my-group_2 {
  padding: 30rpx 24rpx 26rpx;
  box-shadow: 0px 3px 6px 1px rgba(145, 145, 145, 0.16);
}

.card {
  margin-bottom: 20rpx;
  box-shadow: 0px 3px 6px 1px rgba(145, 145, 145, 0.16);
}
</style>
