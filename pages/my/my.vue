<template>
  <div class="my">
    <view class="page">
      <view class="flex-col header-wrapper">
        <view style="padding-top: 20rpx" class="flex-col user-header-wrapper">
          <view class="flex-row justify-between user-header-info-wrapper" style="margin-bottom: 44rpx">
            <view @tap.stop="geTo('/pages/my/myEdit/myEdit')" class="flex-row wz-center">
              <image class="user-image" :src="isuserInfo.avatar[0]" />
              <view class="flex-col user-text-wrapper">
                <view style="max-width: 300rpx; white-space: nowrap; overflow: hidden; text-overflow: ellipsis" class="user-name">{{
                  isuserInfo.name
                }}</view>
                <view style="max-width: 300rpx; white-space: nowrap; overflow: hidden; text-overflow: ellipsis" class="user-desc"
                  >简介:{{ isuserInfo.introduction }}</view
                >
                <view class="" style="display: flex; align-items: center">
                  <view style="max-width: 300rpx; white-space: nowrap; overflow: hidden; text-overflow: ellipsis" class="user-desc"
                    >{{ address.slice(0, 8) + '.....' + address.slice(35, 42) }}
                  </view>
                  <image
                    src="../../static/my/copyback.png"
                    style="width: 25rpx; height: 25rpx; margin-left: 25rpx"
                    mode=""
                    @click.stop="copyaddress"
                  >
                  </image>
                </view>
              </view>
            </view>

            <image
              v-if="false"
              class="vip-image"
              src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/617759e4e4f145001133fc3d/632804bc929db90011565618/16635755372931259400.png"
            />
          </view>
          <view class="flex-row space-x-30 equal-division">
            <view
              @tap.stop="geTo('/pages/my/myDetail/myDetail?user_id=' + isuserInfo.user_id)"
              class="flex-col items-center space-y-28 equal-division-item"
            >
              <text class="font_1">{{ isuserInfo.single_text_count }}</text>
              <text class="font_2 text">已发布</text>
            </view>
            <view @tap="to('/pages/my/frequentVisits/frequentVisits?type=1')" class="flex-col items-center space-y-28 equal-division-item">
              <text class="font_1">{{ isuserInfo.focus_on_num }}</text>
              <text class="font_2 text">关注</text>
            </view>
            <view @tap="to('/pages/my/frequentVisits/frequentVisits?type=2')" class="flex-col items-center space-y-28 equal-division-item">
              <text class="font_1">{{ isuserInfo.fans }}</text>
              <text class="font_2 text">粉丝</text>
            </view>
          </view>
        </view>
        <view style="position: absolute; right: 0; padding-top: 100rpx" class="flex-row justify-end user-header-info-wrapper">
          <!-- <image @tap="sao" class="scanning" src="@/static/my/sao.png" /> -->
          <image @tap="geTo('/pages/my/often/often')" class="add-user" src="@/static/my/addUser.png" />
        </view>
      </view>
      <view class="flex-col group">
        <view class="section_5"></view>
        <view class="flex-col space-y-34 section">
          <view class="flex-col space-y-41">
            <!-- item  -->
            <view class="grid">
              <!-- // todo 参数绑定 -->
              <view v-for="(item, index) in itemList" :key="index" @tap="to(item.path)" class="flex-col items-center space-y-19 grid-item">
                <image class="image" :src="item.imgUrl" />
                <view class="font_3" style="font-weight: bold">{{ item.name }}</view>
              </view>
            </view>
            <!-- 经常访问 -->
            <view class="flex-col space-y-16 section_2">
              <view class="flex-row justify-between group_2">
                <text class="font_3 text_2">经常访问</text>
                <text class="font_4 text_3" v-if="accessRecords.length > 1" @tap="to('/pages/my/frequentVisits/frequentVisits')">
                  全部 &gt;</text
                >
              </view>
              <view class="flex-row space-x-5 equal-division_2">
                <view
                  @tap.stop="clickFrequent(item)"
                  v-for="(item, index) in accessRecords"
                  :key="index"
                  class="flex-col space-y-21 equal-division-item_2"
                >
                  <image class="image_2" :src="item.user_info.avatar[0]" />
                  <view style="max-width: 122rpx; white-space: nowrap; overflow: hidden; text-overflow: ellipsis" class="font_3">{{
                    item.user_info.name
                  }}</view>
                </view>
              </view>
            </view>
            <!-- 为我推荐 -->
            <view class="flex-col user-header-info-wrapper" style="background-color: #fff">
              <text class="font_3 text_4">为你推荐</text>
              <!-- // todo 参数绑定 -->
              <RecommendList
                @clickHeader="clickHeader(item)"
                @gz="gz"
                class="recommend-list"
                v-for="(item, index) in recommend"
                :itemData="item"
                :key="index"
              ></RecommendList>
            </view>
          </view>
        </view>
      </view>
    </view>
  </div>
</template>

<script>
import RecommendList from '../../components/RecommendList'
import { mapGetters } from 'vuex'
export default {
  name: 'my',
  components: {
    RecommendList,
  },
  props: {},
  data() {
    return {
      itemList: [
        {
          path: '/pages/my/myImage/myImage',
          name: '相册',
          imgUrl: '../../static/my/icon/imgicon.png',
        },
        {
          path: '/pages/my/collection/collection',
          name: '收藏',
          imgUrl: '../../static/my/icon/saveicon.png',
        },
        {
          path: '/pages/my/release/release',
          name: '发布内容',
          imgUrl: '../../static/my/icon/fbicon.png',
        },
        {
          path: '/pages/my/vote/vote',
          name: '投票',
          imgUrl: '../../static/my/tp.png',
        },
        {
          path: '/pages/my/signIn/signIn',
          name: '每日签到',
          imgUrl: '../../static/my/icon/imgicon.png',
        },
        {
          path: '/pages/my/history/history',
          name: '浏览记录',
          imgUrl: '../../static/my/icon/sddsa.png',
        },
        {
          path: '/pages/my/about/about',
          name: '关于我们',
          imgUrl: '../../static/my/icon/peopleicon.png',
        },
        {
          path: '/pages/my/contactMe/contactMe',
          name: '联系我们',
          imgUrl: '../../static/my/icon/qqwwe.png',
        },
      ],
      type: 1,
      accessRecords: [],
      recommend: [],
      userInfo: {},
      address: uni.getStorageSync('walletaddress'),
    }
  },
  computed: {
    ...mapGetters('user', ['isuserInfo']),
  },
  async created() {
    await this.$store
      .dispatch('user/getInfo')
      .then(res => {
        // console.log('log - this.$store.dispatch - res', res)
      })
      .catch(err => {
        console.log('log - this.$store.dispatch - err', err)
      })
  },
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
    async gz() {
      this.recommend = []
      await this.recommendUser()
    },
    // 点击经常访问头像
    clickFrequent(item) {
      // console.log('log - clickFrequent - item', item)
      this.geTo('/pages/my/myDetail/myDetail?user_id=' + item.user_info.user_id)
    },
    // 扫码
    sao() {
      console.log('log - 扫码')
      uni.scanCode({
        success: function (res) {
          console.log('条码类型：' + res.scanType)
          console.log('条码内容：' + res.result)
        },
      })
    },
    itemClick(path) {
      console.log('log - itemClick - path', path)
    },
    to(path) {
      console.log(path)
      uni.navigateTo({
        url: path,
      })
    },
    async getAccessRecords() {
      await this.$api.user
        .getAccessRecords({
          type: this.type,
        })
        .then(res => {
          if (res.code != 200) return
          this.accessRecords = res.data
        })
        .catch(err => {
          console.log('log - getAccessRecords - err', err)
        })
    },
    /** 网络获取为你推荐
     * @description:
     * @author: qi-you
     * @return {*}
     */
    async recommendUser() {
      await this.$api.user
        .recommendUser()
        .then(res => {
          if (res.code != 200) return
          this.recommend = res.data
        })
        .catch(err => {
          console.log('log - recommendUser - err', err)
        })
    },
    copyaddress() {
      uni.setClipboardData({
        data: this.address,
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
    if (Object.keys(this.isuserInfo).length <= 0) {
      await this.$store.dispatch('user/getInfo')
    }
    await this.getAccessRecords()
    await this.recommendUser()
    await this.$store
      .dispatch('user/getInfo')
      .then(res => {
        // console.log('log - this.$store.dispatch - res', res)
      })
      .catch(err => {
        console.log('log - this.$store.dispatch - err', err)
      })
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
.page {
  background-color: #fafafa;
  width: 100%;
  height: 100vh;
}

.header-wrapper {
  padding: 10rpx 0 36rpx;
  background-image: linear-gradient(90.8deg, #ff9a31 0.7%, #ff6a1d 99.4%);
  box-shadow: 0px 3rpx 6rpx #91919129;
  position: relative;
}

.scanning {
  width: 40rpx;
  height: 40rpx;
  margin-right: 38rpx;
}

.add-user {
  width: 44rpx;
  height: 40rpx;
}

.user-header-wrapper {
  // margin-top: 36rpx;
}

.user-image {
  flex-shrink: 0;
  width: 130rpx;
  height: 130rpx;
  margin-right: 16rpx;
  margin-top: 40rpx;
  border-radius: 50%;
}

.user-text-wrapper {
  margin-top: -100rpx;
  flex-shrink: 0;
  align-self: center;
  height: 30rpx;
  // width: 316rpx;
}

.user-name {
  align-self: flex-start;
  color: #ffffff;
  font-size: 32rpx;
  // font-family: .PingFang-SC-Regular;
  // line-height: 30rpx;
  // margin-bottom: 10rpx;
  font-weight: 500;
}

.user-desc {
  color: #ffffff;
  line-height: 29rpx;
  margin: 8rpx 0;
  font-size: 24rpx;
}

.vip-image {
  align-self: center;
  width: 126rpx;
  height: 33rpx;
}

.space-x-30 > view:not(:first-child),
.space-x-30 > text:not(:first-child),
.space-x-30 > image:not(:first-child) {
  margin-left: 30rpx;
}

.equal-division {
  padding: 0 28rpx;
}

.space-y-28 > view:not(:first-child),
.space-y-28 > text:not(:first-child),
.space-y-28 > image:not(:first-child) {
  margin-top: 28rpx;
}

.equal-division-item {
  flex: 1 1 230rpx;
  padding: 10rpx 0;
}

.font_1 {
  font-size: 36rpx;
  // font-family: .PingFang-SC-Medium;
  line-height: 26rpx;
  color: #ffffff;
}

.font_2 {
  font-size: 28rpx;
  // font-family: .PingFang-SC-Light;
  line-height: 26rpx;
  font-weight: 300;
  color: #ffffff;
}

.text {
  line-height: 25.5rpx;
}

.group {
  padding: 1060rpx 0 7rpx;
  position: relative;
}

.section_5 {
  background-color: #ffffff;
  height: 77rpx;
}

.space-y-34 > view:not(:first-child),
.space-y-34 > text:not(:first-child),
.space-y-34 > image:not(:first-child) {
  margin-top: 34rpx;
}

.section {
  padding-top: 33rpx;
  background-color: #ffffff;
  // box-shadow: 0px 3rpx 6rpx #91919129;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: absolute;
}

.space-y-41 > view:not(:first-child),
.space-y-41 > text:not(:first-child),
.space-y-41 > image:not(:first-child) {
  margin-top: 41rpx;
}

.grid {
  padding: 0 28rpx;
  height: 305.5rpx;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  row-gap: 47rpx;
}

.space-y-19 > view:not(:first-child),
.space-y-19 > text:not(:first-child),
.space-y-19 > image:not(:first-child) {
  margin-top: 19rpx;
}

.grid-item {
  padding-top: 4rpx;
}

.image {
  width: 80rpx;
  height: 80rpx;
}

.font_3 {
  font-size: 28rpx;
  // font-family: .PingFang-SC-Light;
  line-height: 34rpx;
  font-weight: 300;
  color: #333333;
  text-align: center;
}

.space-y-16 > view:not(:first-child),
.space-y-16 > text:not(:first-child),
.space-y-16 > image:not(:first-child) {
  margin-top: 16rpx;
}

.section_2 {
  padding-top: 32rpx;
  background-color: #f5f5f5;
}

.group_2 {
  padding: 0 31rpx;
}

.text_2 {
  margin-bottom: 4rpx;
}

.font_4 {
  font-size: 24rpx;
  // font-family: .PingFang-SC-Light;
  line-height: 22.5rpx;
  font-weight: 300;
  color: #999999;
}

.text_3 {
  margin-top: 8rpx;
}

// .space-x-5 > view:not(:first-child),
// .space-x-5 > text:not(:first-child),
// .space-x-5 > image:not(:first-child) {
//   margin-left: 5rpx;
// }
.equal-division_2 {
  padding: 0 20rpx;
  // padding: 0 9rpx 4rpx;
  // padding-left: 30rpx;
}

.space-y-21 > view:not(:first-child),
.space-y-21 > text:not(:first-child),
.space-y-21 > image:not(:first-child) {
  margin-top: 21rpx;
}

.equal-division-item_2 {
  // flex: 1 1 146rpx;
  padding: 11rpx 0;
  margin-right: 36rpx;
}

.image_2 {
  width: 112rpx;
  height: 112rpx;
  border-radius: 50%;
}

.text_4 {
  align-self: flex-start;
  margin-bottom: 18rpx;
}

.my-tj-user {
  margin-bottom: 34rpx;
}

.my-tj-user:last-of-type {
  margin-bottom: 106rpx;
}

.group_3 {
  margin-top: 18rpx;
}

.image_3 {
  width: 116rpx;
  height: 116rpx;
}

.space-y-10 > view:not(:first-child),
.space-y-10 > text:not(:first-child),
.space-y-10 > image:not(:first-child) {
  margin-top: 10rpx;
}

.group_4 {
  margin: 8rpx 0 6rpx 20rpx;
}

.font_5 {
  font-size: 28rpx;
  // font-family: .PingFang-SC-Medium;
  line-height: 26rpx;
  color: #333333;
}

.text_5 {
  align-self: flex-start;
}

.space-x-12 > view:not(:first-child),
.space-x-12 > text:not(:first-child),
.space-x-12 > image:not(:first-child) {
  margin-left: 12rpx;
}

.text-wrapper {
  // padding-top: 12rpx;
  background-color: #f2f2f2;
  border-radius: 11rpx;
  height: 30rpx;
}

.font_6 {
  font-size: 22rpx;
  // font-family: .PingFang-SC-Light;
  line-height: 20.5rpx;
  font-weight: 300;
  color: #333333;
}

.text_8 {
  margin-left: 8rpx;
  margin-right: 6rpx;
  line-height: 30rpx;
}

.text-wrapper_2 {
  padding: 6rpx 0 8rpx;
  background-color: #f2f2f2;
  border-radius: 11rpx;
  height: 34rpx;
}

.text_7 {
  margin-left: 10rpx;
  margin-right: 3rpx;
}

.font_7 {
  font-size: 24rpx;
  // font-family: .PingFang-SC-Light;
  line-height: 22.5rpx;
  font-weight: 300;
  color: #666666;
}

.text_9 {
  margin-left: 15rpx;
  align-self: flex-start;
}

.space-x-13 > view:not(:first-child),
.space-x-13 > text:not(:first-child),
.space-x-13 > image:not(:first-child) {
  margin-left: 13rpx;
}

.section_3 {
  padding: 8rpx 14rpx 11rpx;
  align-self: center;
  border-radius: 30rpx;
  height: 44rpx;
  border: solid 1rpx #999999;
}

.image_4 {
  // margin: 2rpx 0 5rpx;
  flex-shrink: 0;
  width: 22rpx;
  height: 22rpx;
}

.text_6 {
  line-height: 22rpx;
}

.group_5 {
  margin-top: 34rpx;
}

.group_6 {
  margin: 8rpx 0 6rpx 20rpx;
}

.text_10 {
  color: #ff5904;
}

.image_5 {
  margin: 4rpx 0 2rpx 10rpx;
  width: 75rpx;
  height: 19rpx;
}

.text_12 {
  margin-left: 15rpx;
  align-self: flex-start;
}

.section_4 {
  padding: 9rpx 14rpx 10rpx;
  align-self: center;
  border-radius: 30rpx;
  height: 44rpx;
  border: solid 1rpx #ff5904;
}

.image_6 {
  flex-shrink: 0;
  width: 22rpx;
  height: 22rpx;
}

.text_11 {
  color: #ff5904;
  line-height: 22rpx;
}

.space-x-20 > view:not(:first-child),
.space-x-20 > text:not(:first-child),
.space-x-20 > image:not(:first-child) {
  margin-left: 20rpx;
}

.user-header-info-wrapper {
  padding: 0 30rpx;
}

.text_13 {
  margin-top: 8rpx;
}

.recommend-list:first-of-type {
  margin-top: 20rpx;
}

// 因为tabbar所以
.recommend-list:last-of-type {
  margin-bottom: 106rpx;
}
</style>
