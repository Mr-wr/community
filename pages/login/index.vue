<template>
  <view class="container">
    <Title title="登入"><view class="" slot="left-icon"> </view></Title>
    <view class="body">
      <view class="qbdz">手机号 :</view>
      <view class="u-input"><u--input placeholder="请输入钱包地址" border="surround" v-model="phone"></u--input></view>
      <view class="qbdz">密码 :</view>
      <view class="u-input"><u--input placeholder="请输入邀请码" border="surround" v-model="password"></u--input></view>
      <view class="login" @click="register">登入</view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      phone: '13999999991',
      password: '123456', // 邀请码
      value3: '', // 交易密码
      value4: '', // 确认交易密码
      sign: '', // 签名
    }
  },
  async created() {},
  methods: {
    async register() {
      await this.$api.user
        .login({ phone: this.phone, password: this.password })
        .then(async res => {
          if (res.code != 200) return
          uni.setStorageSync('token', res.data.token)
          await this.$store
            .dispatch('user/getInfo')
            .then(res => {
              // console.log('log - this.$store.dispatch - res', res)
            })
            .catch(err => {
              console.log('log - this.$store.dispatch - err', err)
            })
          uni.switchTab({
            url: '/pages/community/community',
          })
        })
        .catch(err => {})
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  width: 750rpx;
  height: 1624rpx;

  .header1 {
    width: 750rpx;
    height: 176rpx;
    background: linear-gradient(180deg, #cfe2eb 0%, #ecf4f7 100%);

    .gg {
      width: 750rpx;
      height: 88rpx;
      line-height: 88rpx;
      font-size: 36rpx;
      font-weight: 500;
      color: #475e6c;
      padding-top: 88rpx;
      text-align: center;
    }
  }
}

.body {
  width: 630rpx;
  height: 806rpx;
  margin: 88rpx 60rpx;
  display: flex;
  flex-direction: column;

  .qbdz {
    font-size: 30rpx;
    font-family: Segoe UI-Bold, Segoe UI;
    font-weight: 500;
    color: #475e6c;
    margin-bottom: 16rpx;
    margin-top: 30rpx;
  }

  .login {
    height: 88rpx;
    line-height: 88rpx;
    font-size: 30rpx;
    font-weight: 500;
    margin-bottom: 16rpx;
    color: #fff;
    margin-top: 60rpx;
    background: #475e6c;
    border-radius: 10rpx 10rpx 10rpx 10rpx;
    opacity: 1;
    text-align: center;
  }

  .u-input {
    background: #f1f1f1;
    border-radius: 10rpx 10rpx 10rpx 10rpx;
    opacity: 1;
  }
}
</style>
