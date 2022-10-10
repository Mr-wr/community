<template>
  <div class="RecommendList" v-if="itemData">
    <view class="flex-col user-header-info-wrapper">
      <!-- // todo 参数绑定 -->
      <view @tap.stop="clickHeader" class="flex-row justify-between my-tj-user" style="align-items: center">
        <view class="flex-row" style="align-items: center">
          <image
            style="border-radius: 50%"
            class="image_3"
            :src="itemData.user_info.avatar instanceof Array ? itemData.user_info.avatar[0] : itemData.user_info.avatar"
          />
          <view class="flex-col space-y-10 group_4">
            <view style="overflow: hidden; margin-top: -35rpx">
              <!-- // todo 参数绑定 是显示vip样式 -->
              <view class="font_5 text_5 CT" :class="{ text_10: false }">{{
                itemData.user_info.name ? itemData.user_info.name : itemData.name
              }}</view>
              <!-- vip图标 -->
              <image v-if="false" class="image_5" src="" />
            </view>

            <view v-if="iShowIsFootprint" class="flex-row space-x-12" style="margin-top: -0rpx">
              <view class="flex-col text-wrapper"
                ><text class="font_6 text_8">粉丝数：{{ itemData.user_info.fans }}</text></view
              >
              <!-- <view class="flex-col text-wrapper_2"
                ><text class="font_6 text_7" :key="index" v-for="(item, index) in itemData.user_info.labels_tag">{{ item }}</text></view
              > -->
            </view>
            <view
              v-if="iShowIsFootprint"
              style="
                margin-bottom: -40rpx;
                overflow: hidden;
                font-size: 24rpx;
                max-width: 200rpx;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                margin-left: 0rpx;
              "
              class="font_7 text_9"
              >{{ itemData.user_info.introduction }}</view
            >
          </view>
        </view>
        <!-- // todo 绑定是否关注 -->
        <!-- <view class="flex-row space-x-13 section_3" :class="{ section_4: true }">
          <image v-if="false" class="image_4" src="@/static/my/gou.png" />
          <image v-else class="image_4" src="@/static/my/add.png" />
          <text class="font_4 text_6" :class="{ text_11: true }">关注</text>
        </view> -->
        <IsFootprint
          v-if="iShowIsFootprint"
          @gz="gz"
          :isfootprint="itemData.user_info.is_footprint"
          :user_id="itemData.user_info.user_id"
        ></IsFootprint>
      </view>
    </view>
  </div>
</template>

<script>
import IsFootprint from '@/components/IsFootprint/index.vue'
export default {
  name: 'RecommendList',
  components: { IsFootprint },
  props: {
    itemData: {
      type: Object,
      default() {
        return {
          visits_user_id: 10,
          user_info: {
            user_id: 10,
            avatar: ['http://community.nnmm666.com/storage/formal/avatar/20220921/9e21cac2a9935b731bce2e96b655dcd4.png'],
            name: '',
            level: 0,
            status: 1,
            introduction: '',
            fans: 1,
          },
        }
      },
    },
    iShowIsFootprint: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {}
  },
  created() {
    // console.log('log - onShow - this.itemData.user_info.user_ida', this.itemData.user_info.user_id)
    // console.log('log - onShow - this.itemData', this.itemData)
  },
  computed: {
    clickHeader() {
      this.$store.commit('user/SET_USER_SELECT_USER', this.itemData)
      this.$emit('clickHeader')
    },
  },
  methods: {
    gz(e) {
      this.$emit('gz')
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {},
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {},
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
.page {
  background-color: #fafafa;
  width: 100%;
}
.header-wrapper {
  padding: 106rpx 0 36rpx;
  background-image: linear-gradient(90.8deg, #ff9a31 0.7%, #ff6a1d 99.4%);
  box-shadow: 0px 3rpx 6rpx #91919129;
  position: relative;
}
.scanning {
  width: 46rpx;
  height: 46rpx;
  margin-right: 38rpx;
}
.add-user {
  width: 50rpx;
  height: 46rpx;
}
.user-header-wrapper {
  margin-top: 36rpx;
}
.user-image {
  flex-shrink: 0;
  width: 110rpx;
  height: 110rpx;
  margin-right: 16rpx;
}
.wz-center {
}
.user-text-wrapper {
  margin-top: -52rpx;
  flex-shrink: 0;
  align-self: center;
  height: 30rpx;
  // width: 316rpx;
}
.user-name {
  align-self: flex-start;
  color: #ffffff;
  font-size: 32rpx;
  // font-family: .PingFang-SC-Regular;
  line-height: 30rpx;
}
.user-desc {
  color: #ffffff;
  line-height: 29rpx;
  margin-top: 18rpx;
  font-size: 24rpx;
}
.vip-image {
  align-self: center;
  width: 126rpx;
  height: 33rpx;
}
.space-x-30 > view:not(:first-child),
.space-x-30 > text:not(:first-child),
.space-x-30 > image:not(:first-child) {
  margin-left: 30rpx;
}
.equal-division {
  padding: 0 28rpx;
}
.space-y-28 > view:not(:first-child),
.space-y-28 > text:not(:first-child),
.space-y-28 > image:not(:first-child) {
  margin-top: 28rpx;
}
.equal-division-item {
  flex: 1 1 230rpx;
  padding: 10rpx 0;
}
.font_1 {
  font-size: 36rpx;
  // font-family: .PingFang-SC-Medium;
  line-height: 26rpx;
  color: #ffffff;
}
.font_2 {
  font-size: 28rpx;
  // font-family: .PingFang-SC-Light;
  line-height: 26rpx;
  font-weight: 300;
  color: #ffffff;
}
.text {
  line-height: 25.5rpx;
}
.group {
  padding: 1060rpx 0 7rpx;
  position: relative;
}
.section_5 {
  background-color: #ffffff;
  height: 77rpx;
}
.space-y-34 > view:not(:first-child),
.space-y-34 > text:not(:first-child),
.space-y-34 > image:not(:first-child) {
  margin-top: 34rpx;
}
.section {
  padding-top: 33rpx;
  background-color: #ffffff;
  // box-shadow: 0px 3rpx 6rpx #91919129;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: absolute;
}
.space-y-41 > view:not(:first-child),
.space-y-41 > text:not(:first-child),
.space-y-41 > image:not(:first-child) {
  margin-top: 41rpx;
}
.grid {
  padding: 0 28rpx;
  height: 305.5rpx;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  row-gap: 47rpx;
}
.space-y-19 > view:not(:first-child),
.space-y-19 > text:not(:first-child),
.space-y-19 > image:not(:first-child) {
  margin-top: 19rpx;
}
.grid-item {
  padding-top: 4rpx;
}
.image {
  width: 80rpx;
  height: 80rpx;
}
.font_3 {
  font-size: 28rpx;
  // font-family: .PingFang-SC-Light;
  line-height: 26rpx;
  font-weight: 300;
  color: #333333;
}
.space-y-16 > view:not(:first-child),
.space-y-16 > text:not(:first-child),
.space-y-16 > image:not(:first-child) {
  margin-top: 16rpx;
}
.section_2 {
  padding-top: 32rpx;
  background-color: #f5f5f5;
}
.group_2 {
  padding: 0 31rpx;
}
.text_2 {
  margin-bottom: 4rpx;
}
.font_4 {
  font-size: 24rpx;
  // font-family: .PingFang-SC-Light;
  line-height: 22.5rpx;
  font-weight: 300;
  color: #999999;
}
.text_3 {
  margin-top: 8rpx;
}
.space-x-5 > view:not(:first-child),
.space-x-5 > text:not(:first-child),
.space-x-5 > image:not(:first-child) {
  margin-left: 5rpx;
}
.equal-division_2 {
  padding: 0 9rpx 4rpx;
}
.space-y-21 > view:not(:first-child),
.space-y-21 > text:not(:first-child),
.space-y-21 > image:not(:first-child) {
  margin-top: 21rpx;
}
.equal-division-item_2 {
  flex: 1 1 146rpx;
  padding: 11rpx 0;
}
.image_2 {
  width: 112rpx;
  height: 112rpx;
}
.text_4 {
  align-self: flex-start;
  margin-bottom: 18rpx;
}
.my-tj-user {
  margin-bottom: 34rpx;
}

.group_3 {
  margin-top: 18rpx;
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
.group_4 {
  margin: 8rpx 0 6rpx 20rpx;
}
.font_5 {
  font-size: 28rpx;
  max-width: 240rpx;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  // font-family: .PingFang-SC-Medium;
  // line-height: 26rpx;
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
.text-wrapper {
  // padding-top: 12rpx;
  background-color: #f2f2f2;
  border-radius: 11rpx;
  // height: 40rpx;
  // padding: 8rpx;
}
.font_6 {
  font-size: 24rpx;
  // font-family: .PingFang-SC-Light;
  font-weight: 300;
  color: #333333;
}
.text_8 {
  margin-left: 8rpx;
  margin-right: 6rpx;
}
.text-wrapper_2 {
  padding: 6rpx 0 8rpx;
  background-color: #f2f2f2;
  border-radius: 11rpx;
  height: 34rpx;
}
.text_7 {
  margin-left: 10rpx;
  margin-right: 3rpx;
}
.font_7 {
  font-size: 24rpx;
  // font-family: .PingFang-SC-Light;
  // line-height: 22.5rpx;
  font-weight: 300;
  color: #666666;
}
.text_9 {
  margin-left: 15rpx;
  align-self: flex-start;
}
.space-x-13 > view:not(:first-child),
.space-x-13 > text:not(:first-child),
.space-x-13 > image:not(:first-child) {
  margin-left: 13rpx;
}
.section_3 {
  padding: 8rpx 14rpx 11rpx;
  align-self: center;
  border-radius: 30rpx;
  height: 44rpx;
  border: solid 1rpx #999999;
}
.image_4 {
  // margin: 2rpx 0 5rpx;
  flex-shrink: 0;
  width: 22rpx;
  height: 22rpx;
}
.text_6 {
  line-height: 22rpx;
}
.group_5 {
  margin-top: 34rpx;
}
.group_6 {
  margin: 8rpx 0 6rpx 20rpx;
}
.text_10 {
  color: #ff5904;
}
.image_5 {
  margin: 4rpx 0 2rpx 10rpx;
  width: 75rpx;
  height: 19rpx;
}
.text_12 {
  margin-left: 15rpx;
  align-self: flex-start;
}
.section_4 {
  padding: 9rpx 14rpx 10rpx;
  align-self: center;
  border-radius: 30rpx;
  height: 44rpx;
  border: solid 1rpx #ff5904;
}
.image_6 {
  flex-shrink: 0;
  width: 22rpx;
  height: 22rpx;
}
.text_11 {
  color: #ff5904;
  line-height: 22rpx;
}
.space-x-20 > view:not(:first-child),
.space-x-20 > text:not(:first-child),
.space-x-20 > image:not(:first-child) {
  margin-left: 20rpx;
}
.user-header-info-wrapper {
  // padding: 0 30rpx;
}
.text_13 {
  margin-top: 8rpx;
}
</style>
