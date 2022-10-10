//
<template>
  <div class="community">
    <view class="header" ref="title">
      <view class="flex-col">
        <view class="flex-col space-y-3 group_2">
          <view class="flex-row justify-between">
            <image @tap="geTo('/pages/my/release/release')" class="image" src="@/static/community/pat.png" />
            <view class="flex-row space-x-54 group_3">
              <text @tap="clickTab(2)" style="position: relative" class="font_1 text" :class="{ 'orgain-bottom text_2': iSelect == 2 }">
                关注
              </text>
              <text @tap="clickTab(1)" style="position: relative" class="font_1 text" :class="{ 'orgain-bottom text_2': iSelect == 1 }">
                推荐
              </text>
            </view>
            <image @tap.stop="geTo('/pages/my/signIn/signIn')" class="image_2" src="@/static/community/qd.png" />
          </view>
        </view>
      </view>
      <block v-if="iSelect == 1">
        <!-- <scroll-view scroll-x="true"> -->
        <view class="title-header-wrapper">
          <view
            @tap.stop="clickTitle(index)"
            :style="titleSelect == index ? 'color: #000' : ''"
            class="title-item"
            v-for="(item, index) in isappInfo.titleType"
            :key="index"
          >
            {{ item.single_type_name }}
          </view>
        </view>
        <!-- </scroll-view> -->
      </block>
    </view>
    <div v-if="testShowDate">
      <CommunityInfoCard
        ref="shareblock"
        class="my-communityCard"
        v-for="(item, index) in testShowDate"
        :iShowX="iSelect == 1"
        :key="index"
        :iShowFollow="iSelect == 1"
        :singleData="item"
        @sub="sub"
        @openScroll="isScroll = true"
        @noScroll="isScroll = false"
        @gz="gz"
        @refresh="init(), getSingleText()"
      >
      </CommunityInfoCard>
    </div>
    <div class="test" v-if="commit" style="position: absolute; top: 0; left: 0; right: 0; bottom: 0" @click.stop="clickkb"></div>
    <!-- 评论弹出框 -->
    <CommentsInput v-if="commit" :iscommit="commit" @sumbit="sumbit"></CommentsInput>
    <!-- <div v-show="commit" class="comments">
      <div class="top">
        <div class="face-img"><img src="@/static/common/face.png" alt="" /></div>
        <div class="zf"><img src="@/static/common/@who.png" alt="" /></div>
      </div>
      <div class="bottom">
        <input class="my-input" @blur="inputBlur" v-model="valComments" type="text" :focus="commit" />
        <div class="sumbit" @tap.stop="ClickComment">发送</div>
      </div>
    </div> -->
    <!-- <view class="mask" v-if="isScroll" @click.stop="showmask">
		</view> -->
  </div>
</template>

<script>
import CommunityInfoCard from '@/components/CommunityInfoCard/index.vue'
import CommentsInput from '@/components/CommentsInput/index.vue'
import cryptojs from 'crypto-js'
import moment from 'moment'
export default {
  name: 'community',
  components: {
    CommunityInfoCard,
    CommentsInput,
  },
  props: {},
  data() {
    return {
      commit: false,
      valComments: '',
      Clicksingle_id: 0,
      // 2 关注，1推荐
      iSelect: 1,
      titleList: [
        '发现',
        '快讯',
        '区块链',
        '项目',
        'NFT',
        '元宇宙',
        //  '专栏', '项目', '视频'
      ],
      titleSelect: 0,
      page: 1,
      // 文章数据
      testShowDate: [],
      isScroll: false,
    }
  },

  async created() {
    const datetime = moment().format('YYYYMMDD')
    const sign = cryptojs
      .MD5('0x435f051101e0c1e8bf023f0dd6e3955e33131552' + '.' + datetime)
      // .MD5(uni.getStorageSync('walletaddress') + '.' + datetime)
      .toString()
      .substring(0, 10) // md5加密，取前10位
    // console.log('0x435f051101e0c1e8bf023f0dd6e3955e33131552', sign)
    console.log(uni.getStorageSync('walletaddress'), sign)
    await this.register(sign)
    await this.getSingleText()
    await this.$store.dispatch('appInfo/getSingleType')
  },
  mounted() {},
  computed: {},
  methods: {
    /** 用户点击发送
     * @description:
     * @author: qi-you
     * @return {*}
     */
    sumbit(val) {
      console.log('log - sumbit - val', val)
      if (val.length > 0) {
        this.$api.article
          .comment({
            single_id: this.isuserStatus.articleData.single_text_id,
            type: 1,
            information: val,
            file_address: [],
          })
          .then(async res => {
            if (res.code != 200) return
            uni.showTabBar()
            this.commit = false
            let tmp = this.isuserStatus.articleData
            this.testShowDate.forEach(item => {
              if (item.single_text_id == tmp.single_text_id) {
                item.type_comments++
              }
            })
            this.$store.commit('user/SET_USER_ARTICLE', null)
            console.log('log - this.$api.article.comment - res', res)
          })
          .catch(err => {
            uni.showTabBar()
            console.log('log - this.$api.article.comment - err', err)
          })
      } else {
        this.commit = false
        uni.showTabBar()
      }
      console.log('log - sumbit - val', val)
    },

    /** 网络获取文章类型
     * @description:
     * @author: qi-you
     * @return {*}
     */
    async getSingleType() {
      await this.$api.article
        .getSingleType()
        .then(res => {
          if (res.code != 200) return
          this.titleList = res.data
          this.$store.commit('appInfo/SET_APP_TITLE_TYPE', res.data)
        })
        .catch(err => {})
    },
    async register(sign) {
      await this.$api.user
        .login({
          address: '0x435f051101e0c1e8bf023f0dd6e3955e33131552',
          // address: uni.getStorageSync('walletaddress'),
          sign: sign,
        })
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
    /** 点击滑动的title
     * @description:
     * @author: qi-you
     * @param {*} index
     * @return {*}
     */
    async clickTitle(index) {
      this.titleSelect = index
      this.init()
      await this.getSingleText()
    },

    /** 关注、推荐点击触发
     * @description:
     * @author: qi-you
     * @param {*} i
     * @return {*}
     */
    clickTab(i) {
      this.iSelect = i
      this.init()
      this.getSingleText()
    },
    /** 输入框离开事件触发
     * @description:
     * @author: qi-you
     * @return {*}
     */
    inputBlur() {
      if (this.valComments.length <= 0) {
        this.commit = false
        uni.showTabBar()
      }
    },
    /** 评论组件中传来的点击事件
     * @description:
     * @author: qi-you
     * @return {*}
     */
    sub(e) {
      this.Clicksingle_id = e
      this.commit = true
      uni.hideTabBar()
    },
    /** 初始化数据
     * @description:
     * @author: qi-you
     * @return {*}
     */
    init() {
      this.testShowDate = []
      this.page = 1
    },
    // 网络数据-获取首页分类文章
    async getSingleText() {
      await this.$api.home
        .getSingleText({
          type_id: this.titleSelect,
          page: this.page,
          recom: this.iSelect,
          search_text: '',
        })
        .then(result => {
          if (result.code != 200) return
          this.page++
          this.testShowDate.push(...result.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    // todo 点击关注后滚轮滚到之前的位置
    /** 点击了关注
     * @description:
     * @author: qi-you
     * @return {*}
     */
    async gz(item) {
      console.log('log - gz - item', item)
      let { user_id } = item
      this.testShowDate.forEach(obj => {
        if (obj.user_id == user_id) {
          if (obj.user_info.is_footprint == 1) {
            obj.user_info.is_footprint = 2
          } else {
            obj.user_info.is_footprint = 1
          }
        }
      })
      // this.init()
      // await this.getSingleText()
    },
    showmask() {
      this.isScroll = false
      this.$refs.shareblock.forEach((item, index) => {
        item.iShowMask = false
      })
    },
    /** 点击发送
     * @description:
     * @author: qi-you
     * @return {*}
     */
    ClickComment() {
      this.Clicksingle_id
      console.log('log - ClickComment - this.Clicksingle_id', this.Clicksingle_id)
      this.$api.article
        .comment({
          single_id: this.Clicksingle_id,
          type: 1,
          information: this.valComments,
          file_address: [],
        })
        .then(res => {
          if (res.code != 200) return
          this.commit = false
          this.init()
          this.getSingleText()
          uni.showTabBar()
          this.valComments = ''
          console.log('log - this.$api.article.comment - res', res)
        })
        .catch(err => {
          console.log('log - this.$api.article.comment - err', err)
        })
    },
  },

  watch: {},

  // 页面周期函数--监听页面加载
  async onLoad() {
    this.init()
    await this.getSingleText()
    if (this.isappInfo.titleType.length <= 0) {
      console.log(this.isappInfo.titleType.length)
      await this.$store.dispatch('appInfo/getSingleType')
    }
  },
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  async onShow() {
    // this.init()
    // await this.getSingleText()
    // if (this.isappInfo.titleType.length <= 0) {
    //   console.log(this.isappInfo.titleType.length)
    //   await this.$store.dispatch('appInfo/getSingleType')
    // }
  },
  // 页面周期函数--监听页面隐藏
  onHide() {},
  // 页面周期函数--监听页面卸载
  onUnload() {},
  // 页面处理函数--监听用户下拉动作
  async onPullDownRefresh() {
    console.log('监听用户下拉动作')
    this.init()
    await this.getSingleText()
    if (this.isappInfo.titleType.length <= 0) {
      console.log(this.isappInfo.titleType.length)
      await this.$store.dispatch('appInfo/getSingleType')
    }
    uni.stopPullDownRefresh()
  },
  // 页面处理函数--监听用户上拉触底
  onReachBottom() {
    console.log('log - onReachBottom - this.titleSelect', this.titleSelect)

    this.getSingleText()
  },
  // 页面处理函数--监听页面滚动(not-nvue)
  // onPageScroll(event) {},
  // 页面处理函数--用户点击右上角分享
  // onShareAppMessage(options) {},
}
</script>

<style scoped lang="scss">
.community {
  /* height: 100vh; */
  position: relative;
  background-color: #eee;
}

.mask {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  max-height: 100vh;
  z-index: 999;
}

.my-communityCard {
  background-color: #fff;
  margin-bottom: 20rpx;
}

.my-communityCard:nth-last-child(1) {
  padding-bottom: 106rpx;
}

.my-scroll {
  overflow: hidden;
}

.my-scroll::-webkit-scrollbar {
  display: none;
  width: 0 !important;
  height: 0 !important;
  -webkit-appearance: none;
  background: transparent;
}

.comments {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 25rpx;
  background-color: #f5f5f5;
  z-index: 2;

  .top {
    display: flex;

    .face-img,
    .zf {
      width: 48rpx;
      height: 48rpx;
      // margin-top: 25rpx;
      margin-bottom: 23rpx;
    }

    .zf {
      margin-left: 36rpx;
    }
  }

  .bottom {
    display: flex;
    color: #fff;

    .my-input {
      width: 533rpx;
      height: 70rpx;
      padding-left: 20rpx;
      background-color: #fff;
      margin-right: 34rpx;
      font-size: 33rpx;
      font-family: PingFang SC;
      font-weight: 300;
      border-radius: 10rpx;
      color: #333;
    }

    .sumbit {
      width: 124rpx;
      height: 70rpx;
      background: #fe8e1b;
      border-radius: 10rpx;
      text-align: center;
      line-height: 70rpx;
      font-size: 28rpx;
      font-family: PingFang SC;
      font-weight: 300;
      color: #ffffff;
    }
  }

  img {
    height: 100%;
    width: 100%;
  }
}

.header {
  position: sticky;
  top: 0;
  z-index: 2;
  padding: 22rpx 0;
  background-color: #fafafa;
  border-bottom: 1rpx solid rgba(0, 0, 0, 0.05);
}

.title-header-wrapper {
  display: flex;
  margin-top: 16rpx;
  height: 70rpx;
  justify-content: space-around;
  // align-items: center;
  background: #fafafa;
}

.title-header-wrapper .title-item {
  margin-top: 20rpx;
  // margin-right: 60rpx;
  font-size: 32rpx;
  font-family: PingFang SC-Medium, PingFang SC;
  font-weight: bolder;
  color: #999999;
}

.title-header-wrapper .title-item:first-of-type {
  // margin-left: 30rpx;
}

.space-y-3 > view:not(:first-child),
.space-y-3 > text:not(:first-child),
.space-y-3 > image:not(:first-child) {
  margin-top: 3rpx;
}

.group_2 {
  margin: 0 28rpx;
}

.image {
  width: 52rpx;
  height: 52rpx;
}

.space-x-54 > view:not(:first-child),
.space-x-54 > text:not(:first-child),
.space-x-54 > image:not(:first-child) {
  margin-left: 54rpx;
}

.group_3 {
  margin: 8rpx 0 10rpx;
}

.font_1 {
  font-size: 36rpx;
  /* font-family: .PingFang-SC-Regular; */
  line-height: 34rpx;
}

.text {
  color: #999999;
  line-height: 33rpx;
}

.text_2 {
  color: #333333;
  font-weight: bolder;
  line-height: 33rpx;
}

.image_2 {
  margin: -2rpx 0;
  width: 52rpx;
  height: 52rpx;
}

.image_3 {
  margin-right: 246rpx;
  align-self: flex-end;
  border-radius: 30rpx;
  width: 72rpx;
  height: 4rpx;
}

.orgain-bottom::after {
  display: block;
  position: absolute;
  content: '';
  width: 100%;
  height: 6rpx;
  background: #ff5904;
  border-radius: 6rpx;
  bottom: -20rpx;
}

.no-scroll {
  height: 100vh;
  overflow: hidden;
}
</style>
