<template>
  <div class="complaint">
    <Title class="title" title="投诉"> </Title>
    <view class="flex-col page">
      <view class="flex-col space-y-20 group">
        <view class="flex-col items-center text-wrapper">
          <text class="text">您的投诉将在24消失内受理，请尽量提交详细的投诉说明</text>
        </view>
        <view class="flex-col group_2">
          <view class="flex-col space-y-30">
            <text class="font_1 text_2">请选择你想要投诉的类型</text>
            <view class="flex-col">
              <view class="flex-row space-x-20">
                <!-- // todo 绑定数据 -->
                <view
                  @tap.stop="clickitem(item.complaint_option_id)"
                  v-for="(item, index) in complaintData"
                  :key="index"
                  class="flex-col items-center text-wrapper_3"
                >
                  <text :class="['font_3', item.complaint_option_id == complaintindex ? 'font_2' : '']">{{
                    item.complaint_option_content
                  }}</text>
                </view>
              </view>
            </view>
          </view>
          <view class="flex-col space-y-30 group_3">
            <text class="font_1 text_3">请选择你想要投诉的类型</text>
            <view class="flex-col">
              <view class="flex-row space-x-20">
                <!-- 绑定数据 -->
                <view
                  @tap.stop="sonindex = item.complaint_option_id"
                  v-for="(item, index) in sonData"
                  :key="index"
                  class="flex-col items-center text-wrapper_3"
                >
                  <text :class="['font_3', item.complaint_option_id == sonindex ? 'font_2' : '']">{{ item.complaint_option_content }}</text>
                </view>
              </view>
            </view>
          </view>
          <view @tap.stop="clickSubmit" class="flex-col items-end button"><text class="font_3 text_4">提交</text></view>
        </view>
      </view>
    </view>
  </div>
</template>

<script>
export default {
  name: 'complaint',
  components: {},
  props: {},
  data() {
    return {
      complaintData: [],
      complaintindex: 1,
      sonData: [],
      sonindex: 1,
      user_id: 0,
    }
  },
  computed: {},
  methods: {
    /** 网络获类型
     * @description:
     * @author: qi-you
     * @return {*}
     */
    async getComplaintOption(id) {
      await this.$api.article
        .getComplaintOption({ option_id: id })
        .then(res => {
          if (res.code != 200) return
          if (id == 0) {
            this.complaintData = res.data
          } else {
            this.sonData = res.data
            this.complaintindex = id
          }
          console.log('log - this.$api.getComplaintOption - res', res)
        })
        .catch(err => {
          console.log('log - this.$api.getComplaintOption - err', err)
        })
    },
    clickitem(id) {
      this.getComplaintOption(id)
    },
    /** 点击提交
     * @description:
     * @author: qi-you
     * @return {*}
     */
    clickSubmit() {
      this.$api.article
        .setComplaintArticle({ single_id: this.user_id, option_id: this.complaintindex, info_id: this.sonindex })
        .then(res => {
          if (res.code != 200) return
          this.publicBack()
          console.log('log - this.$api.article.setComplaintArticle - res', res)
        })
        .catch(err => {
          console.log('log - clickSubmit - err', err)
        })
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  async onLoad(e) {
    this.user_id = e.user_id
    await this.getComplaintOption(0)
    await this.getComplaintOption(1)
  },
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

<style scoped>
.title {
  background-color: #fafafa;
}
.page {
  background-color: #ffffff;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
}
.space-y-20 > view:not(:first-child),
.space-y-20 > text:not(:first-child),
.space-y-20 > image:not(:first-child) {
  margin-top: 20rpx;
}
.group {
  padding-bottom: 632rpx;
  overflow-y: auto;
}
.text-wrapper {
  padding: 14rpx 0;
  background-color: #fbedde;
}
.text {
  color: #fe8e1b;
  font-size: 24rpx;
  /* font-family: .PingFang-SC-Light; */
  font-weight: 300;
  line-height: 23rpx;
}
.group_2 {
  padding-left: 30rpx;
  padding-right: 29rpx;
}
.space-y-30 > view:not(:first-child),
.space-y-30 > text:not(:first-child),
.space-y-30 > image:not(:first-child) {
  margin-top: 30rpx;
}
.font_1 {
  font-size: 24rpx;
  /* font-family: .PingFang-SC-Medium; */
  line-height: 22rpx;
  color: #999999;
}
.text_2 {
  align-self: flex-start;
}

.space-x-20 {
  flex-wrap: wrap;
}

.font_2 {
  font-size: 28rpx;
  /* font-family: .PingFang-SC-Medium; */
  line-height: 26rpx;
  color: #ff5904 !important;
}
.text-wrapper_3 {
  flex: 1 1 200rpx;
  margin-bottom: 20rpx;
  margin-right: 20rpx;
  padding: 21rpx 0 22rpx;
  background-color: #f2f2f2;
  border-radius: 10rpx;
  height: 70rpx;
}
.font_3 {
  font-size: 28rpx;
  /* font-family: .PingFang-SC-Medium; */
  line-height: 26rpx;
  color: #999999;
}

.text-wrapper_4 {
  flex: 1 1 216rpx;
  padding: 22rpx 0;
  background-color: #f2f2f2;
  border-radius: 10rpx;
  height: 70rpx;
}
.group_3 {
  margin-top: 80rpx;
}
.text_3 {
  align-self: flex-start;
}
.text-wrapper_5 {
  padding: 22rpx 0 23rpx;
  flex: 1 1 216rpx;
  background-color: #f2f2f2;
  border-radius: 10rpx;
  height: 70rpx;
}
.text-wrapper_6 {
  padding: 21rpx 0 22rpx;
  flex: 1 1 216rpx;
  background-color: #ececec;
  border-radius: 10rpx;
  height: 70rpx;
}
.button {
  margin-top: 72rpx;
  padding: 26rpx 0;
  border-radius: 20rpx;
  background-image: url('../../static/common/button.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.text_4 {
  margin-right: 300rpx;
  color: #ffffff;
}
</style>
