<template>
  <div class="draft">
    <Title class="title" title="草稿">
      <div slot="right" class="title-right">清空</div>
    </Title>
    <!-- // todo 数据绑定 -->
    <Card class="card" v-for="item in 2" :key="item"></Card>
    <div class="null" v-if="true">
      <img src="../../../static/my/draft/null.png" alt="" />
      <p>储存取消发送或发送失败的微博</p>
    </div>
  </div>
</template>

<script>
import Card from './components/Card/Card.vue'
export default {
  name: 'draft',
  components: { Card },
  props: {},
  data() {
    return {}
  },
  computed: {},
  methods: {},
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
.draft {
  position: relative;
  background: #fafafa;
  height: 100%;
  min-height: 100vh;
  .card {
    margin-bottom: 20rpx;
    box-shadow: 0px 3px 6px 1px rgba(145, 145, 145, 0.16);
  }
  .null {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 153rpx;
    height: 153rpx;
    p {
      margin-top: 10rpx;
      white-space: nowrap;
      transform: translateX(-50%);
      font-size: 24rpx;
      font-family: PingFang SC-Light, PingFang SC;
      font-weight: 300;
      color: #999999;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
