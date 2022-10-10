<template>
  <div class="myDetail">
    <Title title=""> </Title>
    <view class="flex-col page">
      <view class="flex-col group">
        <view class="flex-col section" v-if="userInfo">
          <view class="flex-col group_2">
            <view class="flex-col space-y-36">
              <view class="flex-row justify-between group_3">
                <view class="flex-row space-x-22">
                  <!-- // todo 用户头像 -->
                  <image class="image" :src="userInfo.avatar instanceof Array ? userInfo.avatar[0] : userInfo.avatar" />
                  <view class="flex-col space-y-26 group_4">
                    <view style="" class="flex-row">
                      <text
                        style="
                          max-width: 400rpx;
                          white-space: nowrap;
                          overflow: hidden;
                          text-overflow: ellipsis;
                          font-size: 32rpx;
                          font-family: PingFang-SC-Medium;
                          color: #333333;
                          font-weight: 500;
                        "
                        class="text"
                        >{{ userInfo.name }}
                      </text>
                      <!-- vip图标 -->
                      <image
                        v-if="false"
                        class="image_2"
                        src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/617759e4e4f145001133fc3d/632804bc929db90011565618/16635750532272232518.png"
                      />
                    </view>
                    <view class="flex-row space-x-14">
                      <image class="image_4" src="@/static/common/label.png" />
                      <text
                        style="max-width: 400rpx; white-space: nowrap; overflow: hidden; text-overflow: ellipsis"
                        class="font_1 text_3"
                        >{{ userInfo.introduction }}</text
                      >
                    </view>
                  </view>
                </view>
                <IsFootprint @gz="gz" :user_id="user_id" :isfootprint="userInfo.is_footprint"></IsFootprint>
              </view>
              <view class="flex-row space-x-30 equal-division">
                <view class="flex-col items-center space-y-28 equal-division-item">
                  <text class="font_2">{{ userInfo.dynamic }}</text>
                  <text class="font_3">转赞评</text>
                </view>
                <view class="flex-col items-center space-y-28 equal-division-item">
                  <text class="font_2">{{ userInfo.focus_on_num }}</text>
                  <text class="font_3">关注</text>
                </view>
                <view class="flex-col items-center space-y-28 equal-division-item">
                  <text class="font_2">{{ userInfo.fans }}</text>
                  <text class="font_3">粉丝</text>
                </view>
              </view>
            </view>
          </view>
        </view>
        <!-- 主要内容 -->

        <!-- <div v-if="single_text[0].user_info"> -->
        <CommunityInfoCard
          ref="shareblock"
          class="my-communityCard"
          v-for="(item, index) in single_text"
          :key="index"
          :iShowFollow="false"
          :singleData="item"
          @sub="sub"
          @refresh="init(), getSingleText()"
        >
        </CommunityInfoCard>
        <!-- </div> -->
      </view>
    </view>
    <div
      class="test"
      v-if="commit"
      style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgb(2, 3, 3, 0.3)"
      @click.stop="clickkb"
    ></div>
    <CommentsInput v-if="commit" :iscommit="commit" @sumbit="sumbit"></CommentsInput>
    <!-- 下面的评论 -->
    <view v-if="!commit" class="flex-col section_3">
      <view class="flex-row space-x-64 section_4">
        <view class="flex-row group_5">
          <image class="image_5" src="@/static/my/myDetail/mesg.png" />
          <text class="text_4">私信</text>
        </view>
        <div v-if="userInfo" @tap.stop="clickGz" class="button">{{ userInfo.is_footprint == 1 ? '已关注' : '未关注' }}</div>
      </view>
    </view>
  </div>
</template>

<script>
import CommunityInfoCard from '@/components/CommunityInfoCard/index.vue'
import CommentsInput from '@/components/CommentsInput/index.vue'
import Comments from '@/components/Comments/index.vue'
import ArticleContent from '@/components/ArticleContent/index.vue'
import UserHeader from '@/components/CommunityInfoCard/UserHeader/index.vue'
import IsFootprint from '@/components/IsFootprint/index.vue'
export default {
  name: 'myDetail',
  components: { CommunityInfoCard, UserHeader, IsFootprint, ArticleContent, Comments, CommentsInput },
  props: {},
  data() {
    return {
      user_id: '',
      userInfo: null,
      single_text: [],
      page: 1,
      commit: false,
      single_text_id: 0,
    }
  },
  computed: {},
  created() {},
  methods: {
    /** 网络获取
     * @description:
     * @author: qi-you
     * @return {*}
     */
    async getUserSingleText() {
      await this.$api.user
        .getUserSingleText({ user_id: this.user_id, page: this.page })
        .then(res => {
          this.page++
          let tmp = res.data.single_text
          for (let index = 0; index < tmp.length; index++) {
            const element = tmp[index]
            element.user_info = res.data.user_info
          }
          this.single_text.push(...tmp)
        })
        .catch(err => {})
    },
    /** 评论组件中传来的点击事件
     * @description:
     * @author: qi-you
     * @return {*}
     */
    sub(single_text_id) {
      this.single_text_id = single_text_id
      this.commit = true
    },
    /** 用户点击发送
     * @description:
     * @author: qi-you
     * @return {*}
     */
    sumbit(val) {
      if (val.length > 0) {
        this.$api.article
          .comment({
            single_id: this.single_text_id,
            type: 1,
            information: val,
            file_address: [],
          })
          .then(async res => {
            if (res.code != 200) return
            this.commit = false
            window.location.reload()
            console.log('log - this.$api.article.comment - res', res)
          })
          .catch(err => {
            console.log('log - this.$api.article.comment - err', err)
          })
      } else {
        this.commit = false
      }
      console.log('log - sumbit - val', val)
    },
    /** 网络获取用户信息
     * @description:
     * @author: qi-you
     * @return {*}
     */
    async loadUserInfo() {
      await this.$api.user
        .loadUserInfo({ user_id: this.user_id })
        .then(res => {
          if (res.code != 200) return
          this.userInfo = res.data
          this.$store.commit('user/SET_USER_SELECT_USER', this.userInfo)
          console.log('log - loadUserInfo - this.userInfo', this.userInfo)
        })
        .catch(err => {})
    },
    /** 点击了关注
     * @description:
     * @author: qi-you
     * @return {*}
     */
    async gz() {
      console.log('log - gz - gz')
      await this.loadUserInfo()
    },
    clickGz() {
      this.operateFootprint(this.user_id, this.userInfo.is_footprint == 1 ? 2 : 1)
        .then(res => {
          if (res.code != 200) return
          this.loadUserInfo()
        })
        .catch(err => {
          console.log('IsFootprint catch', err)
        })
    },
    zf(e) {
      this.geTo('/pages/contentTo/contentTo?data=' + JSON.stringify(e))
    },
    /** 点击内容
     * @description:
     * @author: qi-you
     * @return {*}
     */
    clickContent() {},
  },
  watch: {},

  // 页面周期函数--监听页面加载
  async onLoad(e) {
    this.user_id = e.user_id - 0
    await this.loadUserInfo()
    await this.getUserSingleText()

    this.$store.commit('user/SET_USER_ARTICLE', this.single_text)
  },
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  async onShow() {},
  // 页面周期函数--监听页面隐藏
  onHide() {},
  // 页面周期函数--监听页面卸载
  onUnload() {},
  // 页面处理函数--监听用户下拉动作
  // onPullDownRefresh() { uni.stopPullDownRefresh(); },
  onReachBottom() {
    // 页面处理函数--监听用户上拉触底

    console.log('log - onReachBottom - 户上拉触底')
  },
  // 页面处理函数--监听页面滚动(not-nvue)
  // onPageScroll(event) {},
  // 页面处理函数--用户点击右上角分享
  // onShareAppMessage(options) {},
}
</script>

<style scoped>
.my-communityCard {
  margin-bottom: 20rpx;
}
.my-comments {
  display: flex;
  justify-content: center;
  border-bottom: 1rpx solid #eee;
}
.content-wrapper {
  padding-top: 30rpx;

  background-color: #fff;
}
.content-wrapper:last-of-type {
  padding-bottom: 108rpx;
}
.myDetail {
  position: relative;
  padding-bottom: 98rpx;
  min-height: 100vh;
}
.my-right-search {
  width: 52rpx;
  height: 52rpx;
}
.page {
  /* padding-bottom: 197rpx; */
  background-color: #eeeeee;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
}
.group {
  overflow-y: auto;
}
.section {
  background-color: #ffffff;
  border-bottom: 1rpx solid #eee;
  box-shadow: 0px 3rpx 6rpx #91919129;
}
.group_2 {
  padding: 30rpx 0 40rpx;
}
.space-y-36 > view:not(:first-child),
.space-y-36 > text:not(:first-child),
.space-y-36 > image:not(:first-child) {
  margin-top: 36rpx;
}
.group_3 {
  padding: 0 30rpx;
  align-items: center;
}
.space-x-22 > view:not(:first-child),
.space-x-22 > text:not(:first-child),
.space-x-22 > image:not(:first-child) {
  margin-left: 22rpx;
}
.image {
  width: 110rpx;
  height: 110rpx;
  border-radius: 50%;
}
.space-y-26 > view:not(:first-child),
.space-y-26 > text:not(:first-child),
.space-y-26 > image:not(:first-child) {
  margin-top: 26rpx;
}
.group_4 {
  align-self: center;
}
.text {
  /* color: #ff5904; */
  font-size: 32rpx;
  font-family: PingFang-SC-Regular;
  /* line-height: 29.5rpx; */
}
.image_2 {
  margin: 6rpx 0 5rpx 20rpx;
  flex-shrink: 0;
  width: 75rpx;
  height: 19rpx;
}
.space-x-14 > view:not(:first-child),
.space-x-14 > text:not(:first-child),
.space-x-14 > image:not(:first-child) {
  margin-left: 14rpx;
}
.image_4 {
  width: 26rpx;
  height: 26rpx;
}
.font_1 {
  /* font-size: 32rpx; */
  font-family: PingFang-SC-Medium;
  line-height: 26rpx;
  color: #333333;
  /* font-weight: 500; */
  margin-bottom: 10rpx;
  position: relative;
}
.text_3 {
  margin-top: 5rpx;
  color: #999999;
}
.space-x-13 > view:not(:first-child),
.space-x-13 > text:not(:first-child),
.space-x-13 > image:not(:first-child) {
  margin-left: 13rpx;
}
.section_2 {
  padding: 10rpx 14rpx 10rpx 16rpx;
  align-self: center;
  border-radius: 30rpx;
  border: 1rpx solid #ff5904;
  height: 44rpx;
}
.image_3 {
  flex-shrink: 0;
  width: 22rpx;
  height: 22rpx;
}
.text_2 {
  color: #ff5904;
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
.font_2 {
  font-size: 36rpx;
  font-family: PingFang-SC-Medium;
  line-height: 26rpx;
  color: #333333;
}
.font_3 {
  font-size: 32rpx;

  line-height: 44rpx;
  color: #333333;
  margin-left: 10rpx;
  font-weight: 500;
  /* display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical; */
}

.section_3 {
  width: 100%;
  background-color: #ffffff;
  box-shadow: 0px 3rpx 6rpx #91919129;
  position: fixed;
  height: 98rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1rpx solid #eee;
  bottom: 0;
}
.space-x-64 > view:not(:first-child),
.space-x-64 > text:not(:first-child),
.space-x-64 > image:not(:first-child) {
  margin-left: 64rpx;
}
.section_4 {
  padding: 14rpx 30rpx 12rpx;
  background-color: #ffffff;
}
.group_5 {
  margin: 7rpx 0 9rpx;
  margin-top: 12rpx;

  flex-shrink: 0;
}
.image_5 {
  flex-shrink: 0;
  width: 40rpx;
  height: 40rpx;
}
.text_4 {
  margin: 6rpx 0 8rpx 12rpx;
  color: #333333;
  font-size: 28rpx;
  font-family: PingFang-SC-Medium;
  line-height: 26rpx;
}
.button {
  /* flex: 1 1 auto; */
  width: 518rpx;
  height: 62rpx;
  margin-left: 65rpx;
  border-radius: 10rpx;
  text-align: center;
  line-height: 62rpx;
  color: #fff;
  font-size: 28rpx;
  background-color: #ff5904;
}
.mysection_4 {
  padding: 9rpx 14rpx 10rpx;
  align-self: center;
  border-radius: 30rpx;
  height: 44rpx;
  border: solid 1rpx #ff5904;
}
.myimage_4 {
  /* // margin: 2rpx 0 5rpx; */
  flex-shrink: 0;
  width: 22rpx;
  height: 22rpx;
}
.myfont_4 {
  font-size: 24rpx;
  /* // font-family: .PingFang-SC-Light; */
  line-height: 22.5rpx;
  font-weight: 300;
  color: #999999;
}
.mytext_11 {
  color: #ff5904;
  line-height: 22rpx;
}
</style>
