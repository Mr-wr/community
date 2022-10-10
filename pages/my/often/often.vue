<template>
  <div class="often">
    <view class="flex-col page">
      <view class="flex-col group">
        <view class="flex-col section">
          <view class="flex-row justify-between search">
            <view @tap.stop="geTo('/pages/my/often/oftenDetail/oftenDetail')" class="flex-row space-x-13 group_2">
              <image
                class="image"
                src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/617759e4e4f145001133fc3d/632804bc929db90011565618/16635757222807135216.png"
              />
              <text class="font_1 text">想找你找的人</text>
            </view>
            <view class="flex-col items-center text-wrapper"><text class="font_1" @tap="back">取消</text></view>
          </view>
        </view>
        <view class="flex-col group_3">
          <view class="flex-row justify-between group_4">
            <text class="font_2 text_2">经常访问</text>
            <text class="font_1 text_3" @click="to('/pages/my/frequentVisits/frequentVisits')">全部 &gt;</text>
          </view>
          <!-- 图像 -->
          <view class="flex-row equal-division_2">
            <view v-for="(item, index) in accessRecords" :key="index" class="flex-col space-y-21 equal-division-item_2">
              <image class="image_2" :src="item.user_info.avatar[0]" />
              <view style="max-width: 200rpx; white-space: nowrap; overflow: hidden; text-overflow: ellipsis" class="font_3">{{
                item.user_info.name
              }}</view>
            </view>
          </view>
          <text class="font_2 text_4">为你推荐</text>
          <view v-if="recommend.length > 0" class="my-recommend">
            <RecommendList @gz="gz" :itemData="item" v-for="(item, index) in recommend" :key="index"></RecommendList>
          </view>
        </view>
      </view>
    </view>
  </div>
</template>

<script>
import RecommendList from '@/components/RecommendList'
export default {
  name: 'often',
  components: { RecommendList },
  props: {},
  data() {
    return {
      accessRecords: [],
      recommend: [],
    }
  },
  created() {
    console.log(this.isuserInfo)
  },
  computed: {},
  methods: {
    async getAccessRecords() {
      await this.$api.user
        .getAccessRecords({
          type: this.type,
        })
        .then(res => {
          if (res.code != 200) return
          this.accessRecords = res.data
        })
        .catch(err => {
          console.log('log - getAccessRecords - err', err)
        })
    },
    /** 网络获取为你推荐
     * @description:
     * @author: qi-you
     * @return {*}
     */
    async recommendUser() {
      await this.$api.user
        .recommendUser()
        .then(res => {
          if (res.code != 200) return
          this.recommend = res.data
        })
        .catch(err => {
          console.log('log - recommendUser - err', err)
        })
    },
    to(path) {
      console.log(path)
      uni.navigateTo({
        url: path,
      })
    },
    back() {
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
    async gz() {
      await this.recommendUser()
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {},
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  async onShow() {
    await this.getAccessRecords()
    await this.recommendUser()
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

<style scoped>
.page {
  background-color: #ffffff;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
}
.group {
  height: 1522rpx;
  overflow-y: auto;
}
.section {
  padding-bottom: 16rpx;
  background-color: #fafafa;
  margin-top: 16rpx;
  border-bottom: 2rpx solid #ccc;
}
.search {
  margin: 0 30rpx;
  padding: 8rpx 11rpx;
  border-radius: 20rpx;
  background: #e3e3e3;
  background-repeat: no-repeat;
}
.space-x-13 > view:not(:first-child),
.space-x-13 > text:not(:first-child),
.space-x-13 > image:not(:first-child) {
  margin-left: 13rpx;
}
.group_2 {
  margin: 7rpx 0;
}
.image {
  flex-shrink: 0;
  width: 27rpx;
  height: 27rpx;
}
.font_1 {
  font-size: 24rpx;
  /* font-family: .PingFang-SC-Light; */
  line-height: 22rpx;
  font-weight: 300;
  color: #999999;
}
.text {
  margin-bottom: 3rpx;
}
.text-wrapper {
  padding: 9rpx 0 10rpx;
  border-radius: 10rpx;
  background: #ffffff;
  width: 86rpx;
  height: 41rpx;
}
.group_3 {
  margin: 38rpx 0 -62rpx;
}
.group_4 {
  padding: 0 31rpx;
}
.font_2 {
  font-size: 28rpx;
  /* font-family: .PingFang-SC-Light; */
  line-height: 26rpx;
  font-weight: 300;
  color: #333333;
}
.text_2 {
  margin-bottom: 4rpx;
}
.text_3 {
  margin-top: 8rpx;
  line-height: 22.5rpx;
}
/* .space-x-5 > view:not(:first-child),
.space-x-5 > text:not(:first-child),
.space-x-5 > image:not(:first-child) {
  margin-left: 5rpx;
} */
.equal-division_2 {
  padding: 0 9rpx 4rpx;
}
.equal-division {
  margin-top: 16rpx;
  padding: 0 9rpx;
}
.space-y-21 > view:not(:first-child),
.space-y-21 > text:not(:first-child),
.space-y-21 > image:not(:first-child) {
  margin-top: 21rpx;
}
.equal-division-item_2 {
  padding: 25rpx 0;
  padding-left: 30rpx;
}
.image_2 {
  width: 112rpx;
  height: 112rpx;
  border-radius: 50%;
}
.text_4 {
  margin-left: 32rpx;
  margin-top: 24rpx;
  align-self: flex-start;
}
.space-y-34 > view:not(:first-child),
.space-y-34 > text:not(:first-child),
.space-y-34 > image:not(:first-child) {
  margin-top: 34rpx;
}
.group_5 {
  margin-top: 34rpx;
  padding: 0 30rpx;
}
.view {
  margin-top: 32rpx;
}
.image_3 {
  width: 116rpx;
  height: 116rpx;
}
.space-y-10 > view:not(:first-child),
.space-y-10 > text:not(:first-child),
.space-y-10 > image:not(:first-child) {
  margin-top: 10rpx;
}
.group_6 {
  margin: 8rpx 0 6rpx 21rpx;
}
.font_3 {
  font-size: 28rpx;
  /* font-family: .PingFang-SC-Medium; */
  line-height: 26rpx;
  color: #333333;
}
.text_5 {
  align-self: flex-start;
}
.space-x-12 > view:not(:first-child),
.space-x-12 > text:not(:first-child),
.space-x-12 > image:not(:first-child) {
  margin-left: 12rpx;
}
.text-wrapper_2 {
  padding-top: 12rpx;
  background-color: #f2f2f2;
  border-radius: 11rpx;
  height: 34rpx;
}
.font_4 {
  font-size: 22rpx;
  /* font-family: .PingFang-SC-Light; */
  line-height: 20.5rpx;
  font-weight: 300;
  color: #333333;
}
.text_7 {
  margin-left: 8rpx;
  margin-right: 6rpx;
}
.text-wrapper_3 {
  padding: 6rpx 0 8rpx;
  background-color: #f2f2f2;
  border-radius: 11rpx;
  height: 34rpx;
}
.text_6 {
  margin-left: 10rpx;
  margin-right: 3rpx;
}
.font_5 {
  font-size: 24rpx;
  /* font-family: .PingFang-SC-Light; */
  line-height: 22rpx;
  font-weight: 300;
  color: #666666;
}
.text_8 {
  margin-left: 16rpx;
  align-self: flex-start;
  line-height: 22.5rpx;
}
.section_2 {
  align-self: center;
  padding: 8rpx 14rpx 11rpx;
  border-radius: 30rpx;
  height: 44rpx;
  border: solid 1rpx #999999;
}
.image_4 {
  margin: 2rpx 0 5rpx;
  flex-shrink: 0;
  width: 22rpx;
  height: 15rpx;
}
.group_7 {
  margin: 8rpx 0 6rpx 21rpx;
}
.text_9 {
  align-self: flex-start;
}
.text_11 {
  margin-left: 8rpx;
  margin-right: 6rpx;
}
.text_10 {
  margin-left: 10rpx;
  margin-right: 3rpx;
}
.text_12 {
  margin-left: 16rpx;
  align-self: flex-start;
  line-height: 22.5rpx;
}
.section_3 {
  align-self: center;
  padding: 8rpx 14rpx 11rpx;
  border-radius: 30rpx;
  height: 44rpx;
  border: solid 1rpx #ff5904;
}
.image_5 {
  flex-shrink: 0;
  width: 22rpx;
  height: 22rpx;
}
.font_6 {
  font-size: 24rpx;
  /* font-family: .PingFang-SC-Light; */
  line-height: 22rpx;
  font-weight: 300;
  color: #ff5904;
}
.group_8 {
  margin: 8rpx 0 6rpx 21rpx;
}
.font_7 {
  font-size: 28rpx;
  /* font-family: .PingFang-SC-Medium; */
  line-height: 26rpx;
  color: #ff5904;
}
.image_6 {
  margin: 4rpx 0 2rpx 10rpx;
  width: 75rpx;
  height: 19rpx;
}
.text_14 {
  margin-left: 8rpx;
  margin-right: 6rpx;
}
.text_13 {
  margin-left: 10rpx;
  margin-right: 3rpx;
}
.text_15 {
  margin-left: 16rpx;
  align-self: flex-start;
  line-height: 22.5rpx;
}
.text_16 {
  align-self: flex-start;
}
.section_4 {
  align-self: center;
  padding: 8rpx 14rpx 10rpx;
  border-radius: 30rpx;
  height: 44rpx;
  border: solid 1rpx #ff5904;
}
.text_17 {
  align-self: flex-start;
}
.group_9 {
  margin: 8rpx 0 6rpx 21rpx;
}
.text_18 {
  align-self: flex-start;
}
.text_20 {
  margin-left: 8rpx;
  margin-right: 6rpx;
}
.text_19 {
  margin-left: 10rpx;
  margin-right: 3rpx;
}
.text_21 {
  margin-left: 16rpx;
  align-self: flex-start;
  line-height: 22.5rpx;
}
.group_10 {
  margin: 8rpx 0 6rpx 21rpx;
}
.text_22 {
  align-self: flex-start;
}
.text_24 {
  margin-left: 8rpx;
  margin-right: 6rpx;
}
.text_23 {
  margin-left: 10rpx;
  margin-right: 3rpx;
}
.text_25 {
  margin-left: 16rpx;
  align-self: flex-start;
  line-height: 22.5rpx;
}
.space-y-12 > view:not(:first-child),
.space-y-12 > text:not(:first-child),
.space-y-12 > image:not(:first-child) {
  margin-top: 12rpx;
}
.group_11 {
  margin-left: 21rpx;
  margin-top: 8rpx;
  width: 144rpx;
}
.text_26 {
  align-self: flex-start;
}
.section_6 {
  background-color: #f2f2f2;
  border-radius: 11rpx;
  height: 34rpx;
}
.text-wrapper_4 {
  margin-left: 12rpx;
  padding-top: 6rpx;
  align-self: center;
  background-color: #f2f2f2;
  border-radius: 11rpx 11rpx 0 0;
  height: 26rpx;
}
.text_27 {
  margin-left: 10rpx;
  margin-right: 3rpx;
}
.space-x-23 > view:not(:first-child),
.space-x-23 > text:not(:first-child),
.space-x-23 > image:not(:first-child) {
  margin-left: 23rpx;
}
.section_5 {
  margin-top: 36rpx;
  padding: 8rpx 14rpx 0 24rpx;
  border-radius: 30rpx 30rpx 0 0;
  height: 32rpx;
  border: solid 1rpx #ff5904;
}
.section_7 {
  flex-shrink: 0;
  background-color: #ff5904;
  border-radius: 10rpx 10rpx 0 0;
  width: 2rpx;
  height: 20rpx;
}
.my-recommend {
  padding: 20rpx;
}
</style>
