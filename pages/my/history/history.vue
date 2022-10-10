<template>
  <div class="history">
    <Title title="浏览记录"></Title>
    <!-- // todo 数据绑定 -->
    <Card class="card" :singledata="item" v-for="(item, index) in singledata" :key="index"></Card>
  </div>
</template>

<script>
import Card from './components/Card/Card.vue'
export default {
  name: 'history',
  components: { Card },
  props: {},
  data() {
    return {
      page: 1,
      singledata: [],
    }
  },
  computed: {},
  created() {
    this.getFootprintArticle(this.page)
  },
  methods: {
    /** 网络获取浏览记录
     * @description:
     * @author: qi-you
     * @return {*}
     */
    getFootprintArticle(page) {
      this.$api.user
        .getFootprintArticle({ page })
        .then(res => {
          if (res.code != 200) return
          this.singledata.push(...res.data)
          this.page++
          console.log('log - this.$api.user.getFootprintArticle - res', res)
        })
        .catch(err => {
          console.log('log - getFootprintArticle - err', err)
        })
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
  onReachBottom() {
    console.log('监听用户上拉触底')
    this.getFootprintArticle(this.page)
  },
  // 页面处理函数--监听页面滚动(not-nvue)
  // onPageScroll(event) {},
  // 页面处理函数--用户点击右上角分享
  // onShareAppMessage(options) {},
}
</script>

<style scoped lang="scss">
.history {
  height: 100%;
  background: #eeeeee;
  overflow: hidden;
  .card {
    margin-bottom: 20rpx;
  }
}
</style>
