<template>
  <view class="editname-container">
    <view class="editname-top">
      <view class="" @click.stop="publicBack">
        <uni-icons type="back" size="25"></uni-icons>
      </view>
      <view class="head-title"> 个性签名 </view>
      <view class="sava-btn" @click.stop="saveeditsignature"> 完成 </view>
    </view>
    <view class="editname-content">
      <view class="editname-input">
        <textarea
          v-model="textmsg"
          style="
            position: relative;
            width: 95%;
            height: 500rpx;
            line-height: 60rpx;
            padding: 20rpx;
            font-family: PingFang SC-Regular, PingFang SC;
            font-weight: 500;
            color: #333333;
          "
          :placeholder="textmsg"
          maxlength="-1"
          placeholder-style="font-size: 28rpx;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 500;
				color: #999999;"
        >
        </textarea>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      textmsg: '',
    }
  },
  created() {
    if (this.isuserInfo) {
      this.textmsg = this.isuserInfo.introduction
    }
  },
  methods: {
    saveeditsignature() {
      this.$api.user
        .editPersonalInfo({
          introduction: this.textmsg,
        })
        .then(res => {
          if (res.code == 200) {
            uni.showToast({
              icon: 'success',
              title: '修改成功',
            })
            setTimeout(() => {
              this.publicBack()
            }, 1000)
          } else {
            uni.showToast({
              icon: 'error',
              title: res.msg,
            })
            setTimeout(() => {
              this.publicBack()
            }, 1000)
          }
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.editname-container {
  width: 750rpx;

  .editname-top {
    width: 100%;
    display: flex;
    margin: 0 auto;
    justify-content: space-between;
    padding: 0 20rpx;
    align-items: center;
    margin-bottom: 20rpx;
    border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);

    .head-title {
      height: 50rpx;
      font-size: 36rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
    }

    .sava-btn {
      background-image: linear-gradient(to right, #ff6a1d, #ff9830);
      width: 160rpx;
      height: 70rpx;
      line-height: 70rpx;
      text-align: center;
      font-size: 28rpx;
      font-family: PingFang SC-Medium, PingFang SC;
      font-weight: 500;
      color: #ffffff;
      border-radius: 25rpx;
    }
  }

  .editname-content {
    width: 95%;
    margin: 0 auto;

    .editname-input {
      width: 100%;
      height: 60rpx;
      padding-bottom: 60rpx;
    }
  }
}
</style>
