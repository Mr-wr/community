<template>
  <div class="myImage">
    <Title class="title" title="我的相册"> </Title>
    <!-- // todo 绑定数据 -->
    <div class="img-header-wrapper flex-row">
      <div class="img-text img-public">
        <div class="img-number">{{ totalImgs }}</div>
        <p>相册</p>
      </div>
      <!-- <div class="fabulous img-public">
        <div class="img-number fabulous-number">399</div>
        <p>赞</p>
      </div> -->
    </div>
    <!-- // todo 绑定数据 -->
    <div class="card" v-for="(item, index) in imgArray" :key="index">
      <p>{{ index }}</p>
      <div class="img-list-wrapper flex-row justify-between">
        <div v-for="(url, index) in item" :key="index" class="item-img">
          <img :src="url" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'myImage',
  components: {},
  props: {},
  data() {
    return {
      imgArray: {},
      page: 1,
    }
  },
  computed: {
    totalImgs() {
      let total = 0
      for (let item in this.imgArray) {
        total += this.imgArray[item].length
      }
      return total
    },
  },
  methods: {
    /** 网络获取图片
     * @description:
     * @author: qi-you
     * @return {*}
     */
    async getPhotoAlbum() {
      await this.$api.user
        .getPhotoAlbum({ page: this.page })
        .then(res => {
          if (res.code != 200) return
          this.imgArray = res.data
          console.log('log - awaitthis.$api.user.getPhotoAlbum - res', res)
        })
        .catch(err => {
          console.log('log - awaitthis.$api.user.getPhotoAlbum - err', err)
        })
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  async onLoad() {
    await this.getPhotoAlbum()
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
.myImage {
  height: 100%;
  .title {
    background: #fff !important;
  }
  .title-right {
    // font-size: 24rpx;
    // font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
  }
  .img-header-wrapper {
    background: #fafafa;
  }
  .img-public {
    position: relative;
    // justify-content: space-between;
    flex: 1;
    // align-content: center;
    text-align: center;
    .img-number {
      margin-top: 38rpx;
      font-size: 38rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
    }
    p {
      margin-bottom: 40rpx;
      font-size: 24rpx;
      font-family: PingFang SC-Light, PingFang SC;
      font-weight: 300;
      color: #999999;
    }
  }
  .fabulous::after {
    display: block;
    content: '';
    position: absolute;
    top: 50%;
    left: 0rpx;
    transform: translateY(-50%);
    width: 0px;
    height: 120rpx;
    opacity: 0.1;
    border-left: 1rpx solid #000000;
  }
  .card {
    padding: 30rpx;
    > p {
      // font-size: 24rpx;
      // font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
    }
    .img-list-wrapper {
      height: 100%;
      flex-wrap: wrap;
      .item-img {
        width: 222rpx;
        height: 125rpx;
        margin-bottom: 12rpx;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
