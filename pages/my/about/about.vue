<template>
  <div class="about">
    <Title class="title" title="关于我们"> </Title>
    <!-- // todo 无法修改v-html的样式 -->
    <div v-html="isappInfo.about" class="about-wrapper"></div>
    <!-- <view class="flex-col page">
      <view class="flex-col space-y-56 group">
        <view class="flex-col space-y-26">
          <text class="font_1 text">平台介绍</text>
          <view class="flex-col space-y-7">
            <text class="font_2">本平台是领先的区块链信息服务商，以价值投资为导向，</text>
            <text class="font_2 text_2">为区块链创新者服务。</text>
            <text class="font_2">我们以论坛启锚远征，让资讯为瞭望景观，聚集区块链</text>
            <text class="font_2">技术和应用弄潮儿。目前已发展成集资讯内容、线下活</text>
            <text class="font_2">动、培训、孵化器、投资和区块链技术落地应用于一体</text>
            <text class="font_2">的生态体平台。全网覆盖用户超100万人，遍及中国大</text>
            <text class="font_2 text_3">陆、韩国，日本，美国，香港等国家和地区。</text>
          </view>
          <text class="font_1 text_4">我们的成长历程</text>
        </view>
        <view class="flex-col space-y-30">
          <view class="flex-col group_2">
            <text class="font_2">本平台是领先的区块链信息服务商，以价值投资为导向，</text>
            <text class="font_2 text_5">为区块链创新者服务。</text>
            <text class="font_2 text_6">我们以论坛启锚远征，让资讯为瞭望景观，聚集区块链</text>
            <text class="font_2 text_7">技术和应用弄潮儿。目前已发展成集资讯内容、线下活</text>
            <text class="font_2 text_8">动、培训、孵化器、投资和区块链技术落地应用于一体</text>
            <text class="font_2 text_9">的生态体平台。全网覆盖用户超100万人，遍及中国大</text>
            <text class="font_1 text_11">我们的团队介绍</text>
            <text class="font_2 text_10">陆、韩国，日本，美国，香港等国家和地区。</text>
          </view>
          <view class="flex-col items-start space-y-7">
            <text class="font_2">李宗乘 合伙人，CFO</text>
            <text class="font_2">浙江工商大学硕士</text>
            <text class="font_2 text_12">曾担任浙江国贸集团</text>
          </view>
        </view>
      </view>
    </view> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'about',
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {
    ...mapGetters('appInfo', ['isappInfo']),
  },
  methods: {},
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {},
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  async onShow() {
    if (this.isappInfo.about.length <= 0) {
      await this.$store.dispatch('appInfo/getAbout')
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

<style lang="scss" scoped>
.about-wrapper {
  padding: 30rpx;
}
</style>
