<template>
  <div class="myEdit">
    <Title title="个人信息"></Title>
    <div class="user-wrapper">
      <div class="item">
        <p>头像</p>
        <view style="display: flex; align-items: center" @click.stop="showcamera">
          <div class="user-header">
            <img :src="isuserInfo.avatar" alt="" />
          </div>
          <view class="">
            <uni-icons style="color: #999" type="forward" size="25"></uni-icons>
          </view>
        </view>
      </div>
      <div class="item">
        <p>名字</p>
        <view style="display: flex; align-items: center" @click.stop="toPage('Editname')">
          <div class="user-name">
            {{ nameValue }}
          </div>
          <view class="">
            <uni-icons type="forward" style="color: #999" size="25"></uni-icons>
          </view>
        </view>
      </div>
      <div class="item">
        <p>个性签名</p>
        <view style="display: flex; align-items: center" @click.stop="toPage('editsignature')">
          <div class="user-info">
            {{ userInfo }}
          </div>
          <view class="">
            <uni-icons type="forward" style="color: #999" size="25"></uni-icons>
          </view>
        </view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'myEdit',
  components: {},
  props: {},
  data() {
    return {
      iShowInput: false,
      iShowInput1: false,
      nameValue: '',
      userInfo: '',
    }
  },
  created() {
    if (this.isuserInfo) {
      this.userInfo = this.isuserInfo.introduction
      this.nameValue = this.isuserInfo.name
    }
    console.log(123)
  },
  computed: {},
  methods: {
    toPage(p) {
      console.log(p)
      uni.navigateTo({
        url: `/pages/my/myEdit/${p}`,
      })
    },
    showcamera() {
      uni.chooseImage({
        count: 1, //默认9
        sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album'], //从相册选择
        success: res => {
          console.log(res.tempFiles[0].path)
          this.uploadFilePromise1(res.tempFiles[0].path).then(res => {
            console.log(res)
            this.$api.user
              .editPersonalInfo({
                avatar: res,
              })
              .then(res => {
                console.log(res)
                this.getuserinfo()
              })
          })
        },
      })
    },
    uploadFilePromise1(url) {
      console.log(uni.getStorageInfoSync('token'))
      return new Promise((resolve, reject) => {
        let a = uni.uploadFile({
          url: 'http://community.nnmm666.com/api/common/uploadPicture', //oss域名自己设
          filePath: url,
          name: 'file',
          formData: {
            type: 'single_text',
            file: url,
          },
          header: {
            token: uni.getStorageSync('token'),
          },
          success: res => {
            setTimeout(() => {
              resolve(JSON.parse(res.data).data)
            }, 1000)
          },
        })
      })
    },
    async getuserinfo() {
      await this.$store
        .dispatch('user/getInfo')
        .then(res => {
          console.log('log - this.$store.dispatch - res', res)
        })
        .catch(err => {
          console.log('log - this.$store.dispatch - err', err)
        })
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {},
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  async onShow() {
    await this.getuserinfo()
    if (this.isuserInfo) {
      this.userInfo = this.isuserInfo.introduction
      this.nameValue = this.isuserInfo.name
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
.user-wrapper {
  padding: 20rpx;

  .item {
    display: flex;
    justify-content: space-between;
    align-content: center;
    align-items: center;
    margin-bottom: 50rpx;
    padding-bottom: 10rpx;
    border-bottom: 1rpx dotted #ececec;

    &:first-child {
      margin-bottom: 35rpx;
    }

    p {
      font-size: 36rpx;
      font-family: PingFang SC;
      font-weight: 400;
      color: #999999;
    }

    .user-header {
      width: 80rpx;
      height: 80rpx;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }

    .user-name {
      width: 451rpx;
      font-size: 36rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #333333;
      text-align: end;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .user-info {
      width: 451rpx;
      font-size: 36rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #333333;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: right;
    }

    .my-input {
      width: 451rpx;
      font-size: 36rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #333333;
      text-align: end;
    }
  }
}
</style>
