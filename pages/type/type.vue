<template>
  <div class="type">
    <Title title="">
      <image slot="left-icon" src="@/static/common/back.png" mode="" @click="back" />
      <div @tap.stop="clickqx" class="right-btn" slot="right">取消</div>
    </Title>
    <div v-if="titleType.length > 0" class="type-wrapper">
      <div @click.stop="clickType(item)" v-for="(item, index) in titleType" :key="index" class="type-item-name">
        {{ item.single_type_name }}
      </div>
    </div>
    <div v-else class="type-wrapper">
      <div @click.stop="clickType(item)" v-for="(item, index) in isappInfo.titleType" :key="index" class="type-item-name">
        #{{ item.single_type_name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'type',
  components: {},
  props: {},
  data() {
    return {
      titleType: [],
    }
  },
  computed: {},
  methods: {
    back() {
      this.$store.commit('user/SET_USER_STATUS_RELEASE_TYPE', null)
      this.$store.commit('user/SET_USER_IS_SHOW_TYPE', false)
      this.publicBack()
    },
    clickType(typeObj) {
      if (this.titleType.length > 0) {
        this.$store.commit('user/SET_USER_SINGLE_TYPE', typeObj)
      } else {
        this.$store.commit('user/SET_USER_STATUS_RELEASE_TYPE', typeObj)
        this.$store.commit('user/SET_USER_IS_SHOW_TYPE', true)
        this.$store.commit('user/SET_USER_RELEASE_SELECT_USER', false)
      }
      this.publicBack()
    },
    clickqx() {
      this.$store.commit('user/SET_USER_STATUS_RELEASE_TYPE', null)
      this.$store.commit('user/SET_USER_IS_SHOW_TYPE', false)
      this.publicBack()
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad(e) {
    if (e.titleType) {
      this.titleType = JSON.parse(e.titleType)
    }
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

<style scoped lang="scss">
.right-btn {
  width: 124rpx;
  height: 60rpx;
  border-radius: 10rpx;
  font-size: 28rpx;
  font-family: PingFang SC-Light, PingFang SC;
  font-weight: 300;
  color: #ffffff;
  text-align: center;
  line-height: 60rpx;
  background-color: #a4adb3;
}
.type {
  .type-wrapper {
    padding: 0 30rpx;
    .type-item-name {
      border-bottom: 1rpx solid #eee;
      padding: 30rpx 0;
      font-size: 28rpx;
      font-family: PingFang SC-Medium, PingFang SC;
      font-weight: 500;
      color: #333333;
    }
  }
}
</style>
