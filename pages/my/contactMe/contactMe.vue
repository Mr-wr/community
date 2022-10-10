<template>
  <div class="contactMe">
    <Title title="联系我们"> </Title>
    <div v-html="isappInfo.contactMe" class="p-wrapper">
      <p>联系电话：0577-1152144</p>
      <p>站务管理：a@524145.com</p>
      <p>商务合作：nsdho@5452.com</p>
      <p>申请专栏：ffgsd523</p>
      <p>媒体合作：1365454</p>
      <p>加入翻译：545413465</p>
      <p>BTC捐赠地址：3241asfasfas4f5a4f56as4f65a4fas6 5f4as65</p>
      <p>BTM捐赠地址：3241asfasfas4f5a4f56as4f65a4fas6 5f4as65</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'contactMe',
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: { ...mapGetters('appInfo', ['isappInfo']) },
  methods: {},
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {},
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  async onShow() {
    if (this.isappInfo.contactMe.length <= 0) {
      await this.$store.dispatch('appInfo/getContactMe')
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
.p-wrapper {
  margin: 30rpx 0 0 20rpx;
  p {
    font-size: 28rpx;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 500;
    color: #333333;
    margin-bottom: 40rpx;
  }
}
</style>
