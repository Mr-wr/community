<template>
  <div class="Mask">
    <uni-popup ref="popup" type="bottom">
      <slot name="def">
        <view class="popup-wrapper">
          <view class="item" @click.stop="collect">收藏{{ singleid }}</view>
          <view @tap.stop="clickNoLike" class="item">不感兴趣</view>
          <view @tap.stop="clickNoLook" class="item">不看此博主</view>
          <view @tap="geTo('/pages/complaint/complaint?user_id=' + user_id)" class="item">投诉</view>
          <view class="item">
            <view @tap="close" class="btn">取消</view>
          </view>
        </view>
      </slot>
    </uni-popup>
  </div>
</template>

<script>
export default {
  props: {
    user_id: 0,
    singleid: {
      type: String,
    },
  },
  data() {
    return {}
  },
  computed: {},
  methods: {
    open(type) {
      // 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
      this.$refs.popup.open(type)
    },
    close() {
      this.$refs.popup.close()
    },
    /** 点击不感兴趣
     * @description:
     * @author: qi-you
     * @return {*}
     */
    clickNoLike() {
      this.$emit('clickNoLike')
    },
    /** 点击不看此博主
     * @description:
     * @author: qi-you
     * @return {*}
     */
    clickNoLook() {
      this.$emit('clickNoLook')
    },
    collect() {
      this.$api.article
        .setCollectArticle({ single_id: this.user_id, type: 1 })
        .then(res => {
          if (res.code != 200) return
          this.close()
          console.log(res)
        })
        .catch(err => {
          this.close()
        })
    },
  },
  watch: {},

  // 组件周期函数--监听组件挂载完毕
  mounted() {},
  // 组件周期函数--监听组件数据更新之前
  beforeUpdate() {},
  // 组件周期函数--监听组件数据更新之后
  updated() {},
  // 组件周期函数--监听组件激活(显示)
  activated() {},
  // 组件周期函数--监听组件停用(隐藏)
  deactivated() {},
  // 组件周期函数--监听组件销毁之前
  beforeDestroy() {},
}
</script>

<style scoped lang="scss">
.Mask {
  ::v-deep .uni-popup {
    z-index: 999;
  }

  .popup-wrapper {
    // padding: 25rpx 30rpx;
    background: #fff;

    .item {
      padding: 25rpx;
      border-bottom: 1px solid #eee;
      font-size: 28rpx;
      font-family: PingFang SC-Medium, PingFang SC;
      font-weight: 500;
      color: #333333;

      .btn {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 10rpx;
        height: 77rpx;
        background: #e3e3e3;
        font-size: 28rpx;
        font-family: PingFang SC-Medium, PingFang SC;
        font-weight: 500;
        color: #999999;
      }
    }
  }
}
</style>
