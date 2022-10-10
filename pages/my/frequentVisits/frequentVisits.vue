<template>
  <div class="frequentVisits">
    <Title title=""></Title>
    <RecommendList
      @clickHeader="clickHeader(item)"
      :itemData="item"
      class="recommend-list"
      v-for="(item, index) in accessRecords"
      :key="index"
    >
    </RecommendList>
  </div>
</template>

<script>
import RecommendList from '@/components/RecommendList'

export default {
  name: 'frequentVisits',
  components: {
    RecommendList,
  },
  props: {},
  data() {
    return {
      accessRecords: [],
      type: '',
    }
  },
  computed: {},
  methods: {
    /** 点击用户头像
     * @description:
     * @author: qi-you
     * @return {*}
     */
    clickHeader(item) {
      console.log('log - clickHeader - item', item)

      this.geTo('/pages/my/myDetail/myDetail?user_id=' + item.user_info.user_id)
    },
    async getAccessRecords() {
      await this.$api.user
        .getAccessRecords({
          type: 2,
        })
        .then(res => {
          if (res.code != 200) return
          this.accessRecords = res.data
          console.log('log - this.$api.user.getAccessRecords - res', res)
        })
        .catch(err => {
          console.log('log - getAccessRecords - err', err)
        })
    },
    async getgzuser() {
      await this.$api.user
        .getFocusOnList({
          type: this.type,
          page: 1,
        })
        .then(res => {
          if (res.code != 200) return
          this.accessRecords = res.data
          console.log('log - this.$api.user.getFocusOnList - res', res)
        })
        .catch(err => {
          console.log('log - getFocusOnList - err', err)
        })
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad(option) {
    this.type = option.type
    console.log(this.type)
  },
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {
    if (this.type) {
      this.getgzuser()
    } else {
      this.getAccessRecords()
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

<style scoped>
.recommend-list {
  padding: 0 30rpx;
  margin-top: 30rpx;
}
</style>
