<template>
  <div class="CommunityInfoCard">
    <view class="flex-col space-y-12 section">
      <view class="flex-col">
        <!-- 头部 -->
        <view style="border-bottom: 0.5px solid #eee" class="flex-col space-y-20 group_2">
          <!-- <view class="flex-col space-y-20 group_2"> -->
          <view class="flex-row justify-between" style="align-items: center">
            <view class="flex-row">
              <image
                v-if="singleData.user_info"
                @tap.stop="geTo('/pages/my/myDetail/myDetail?user_id=' + singleData.user_info.user_id)"
                class="image"
                :src="singleData.user_info.avatar instanceof Array ? singleData.user_info.avatar[0] : singleData.user_info.avatar"
              />
              <!-- // todo 绑定数据判断是或否vip -->
              <view class="flex-col items-start space-y-16 group_3">
                <view
                  v-if="singleData.user_info"
                  style="max-width: 200rpx; white-space: nowrap; overflow: hidden; text-overflow: ellipsis"
                  class="font_1"
                  :class="{ text: false }"
                  >{{ singleData.user_info.name }}
                </view>
                <text style="margin-top: 0px" class="font_2">{{ singleData.update_at.substring(5, 16) }}</text>
              </view>
              <!-- vip图标 -->
              <image v-if="false" class="image_3" src="" />
            </view>
            <!-- 判断是显示关注还是显示还是都显示 -->
            <!-- <image @tap.stop="open" v-if="iShowX" class="myimage_2" src="@/static/common/close.png" /> -->
            <IsFootprint
              class="my-follow"
              v-if="iShowFollow"
              :isfootprint="singleData.user_info.is_footprint"
              :user_id="singleData.user_id"
              @gz="gz"
            >
            </IsFootprint>

            <!-- 是否关注 -->
          </view>
        </view>
      </view>
      <div class="my-content-wrapper">
        <view
          @tap="geTo('/pages/contentDetail/contentDetail?single_id=' + singleData.single_text_id)"
          class="flex-col items-start space-y-7"
          style="overflow: hidden; overflow-x: hidden"
        >
          <!-- // todo 判断是否要显示全部 -->
          <div
            :style="singleData.media.length <= 0 ? 'margin-top: 20rpx;margin-bottom: 10rpx;' : 'margin-top: 20rpx;'"
            v-html="singleData.single_text_content"
            class="font_3"
          >
            <!-- {{
              isContentAll && singleData.single_text_content.length > 120
                ? singleData.single_text_content.substring(0, 120) + '...'
                : singleData.single_text_content
            }} -->
            <span
              v-if="isContentAll && singleData.single_text_content.replace(/<[^>]+>/g, '').length > 120"
              @tap="geTo('/pages/contentDetail/contentDetail?single_id=' + singleData.single_text_id)"
              style="color: #5b7b9e"
            >
              全文
            </span>
          </div>
          <!-- <div v-if="singleData.media.length > 0" class="img-wrapper">
						<div v-for="(item, index) in singleData.media" :key="index" class="img-box">
							<image v-if="singleData.media.length < 2"
								:style="singleData.media.length == 1 ? 'width:444rpx;' : ''" class="my-image"
								:src="item" alt="" mode="widthFix" lazy-load="true"></image>
							<img v-else :style="singleData.media.length == 1 ? 'width:444rpx;' : ''" class="my-image"
								:src="item" alt="" mode="" />
						</div>
					</div> -->
          <!-- 从新写过渲染图片规则-仿照微博 -->
          <div v-if="singleData.media.length > 0" class="img-wrapper">
            <div
              :style="singleData.media.length == 4 ? 'width: 240rpx' : ''"
              v-for="(item, index) in singleData.media"
              :key="index"
              class="img-box"
            >
              <img class="my-image" :src="item" @tap.stop="clickImg(item)" />
            </div>
          </div>
        </view>
      </div>
      <!-- 判断是或否要转发内容 -->
      <slot name="forward" v-if="iShowForward">
        <view
          @tap.stop="geTo('/pages/contentDetail/contentDetail?single_id=' + single_text_forward_id.single_text_id)"
          style="maring-top: 0"
          class="flex-col space-y-15 section_2"
        >
          <view class="group_4" style="width: 100%">
            <span class="font_3">
              <span v-if="single_text_forward_id.user_info" style="margin-right: 10rpx; color: #5b7b9e"
                >@{{ single_text_forward_id.user_info.name }}:</span
              >
              <!-- // todo 判断是否要显示全部 -->
              <div style="display: inline" v-html="single_text_forward_id.single_text_content">
                <!-- {{
                  single_text_forward_id.single_text_content.length > 133
                    ? single_text_forward_id.single_text_content.substring(0, 113) + '...'
                    : single_text_forward_id.single_text_content
                }} -->
                <span
                  @tap.stop="geTo('/pages/contentDetail/contentDetail?single_id=' + singleData.single_text_forward_id.single_text_id)"
                  v-if="single_text_forward_id.single_text_content.length > 133"
                  class="font_4"
                >
                  全文
                </span>
              </div>
            </span>
          </view>
          <image
            :style="singleData.media.length == 1 ? 'width:444rpx' : ''"
            v-if="single_text_forward_id.media.length > 0"
            class="image_4"
            :src="single_text_forward_id.media[0]"
            mode="widthFix"
          />
        </view>
      </slot>
      <!-- 转发评论点赞 -->
      <view class="flex-row justify-between equal-division">
        <view @tap.stop="forwarding" class="flex-row">
          <div v-show="iShowMask" class="forward">
            <div class="pad35">
              <div class="icon">
                <img src="@/static/my/forward.png" alt="" />
              </div>
              <div style="width: 100%" @tap.stop="clickForw">转发</div>
            </div>
            <div class="pad35 copy">
              <div class="icon">
                <img src="@/static/my/copy.png" alt="" />
              </div>
              <div style="width: 100%" @click.stop="copylink">复制链接</div>
            </div>
          </div>
          <image class="image_5" src="@/static/my/myDetail/zf.png" />
          <text style="margin-left:6rpx" class="font_5 text_2">{{ singleData.type_forward }}</text>
        </view>
        <view class="flex-row">
          <image @tap.stop="clickComments" class="image_5" src="@/static/my/myDetail/comments.png" />
          <text style="margin-left:6rpx" class="font_5 text_3">{{ singleData.type_comments }}</text>
        </view>
        <!-- 是否点赞 1=是,2=否 -->
        <view @tap.stop="clickLike(singleData.single_text_id)" class="flex-row" style="margin-right: -20rpx">
          <image v-if="isLike" class="image_5" src="@/static/my/myDetail/zan.png" />
          <image v-else class="image_5" src="@/static/common/fabulous.png" />
          <text style="position: relative; top: 2rpx;margin-left:6rpx" :class="[isLike ? 'font_6' : '', 'font_5 text_3']">{{
            singleData.type_likes
          }}</text>
        </view>
        <div @tap.stop="open" style="height: 46rpx" class="comment-x">
          <image style="position: relative; width: 40rpx; height: 40rpx" src="@/static/common/x1.png" mode="" />
        </div>
      </view>
    </view>
    <!-- 遮罩层 -->
    <!-- <div v-show="iShowMask" scroll="no" @tap.stop="zzc" class="mask"></div> -->
    <MyMask :user_id="this.singleData.single_text_id" @clickNoLook="clickNoLook" @clickNoLike="clickNoLike" ref="mack"></MyMask>
  </div>
</template>

<script>
import UserHeader from './UserHeader/index.vue'
import MyMask from '@/components/MyMask/MyMask.vue'
import IsFootprint from '@/components/IsFootprint/index.vue'
export default {
  name: 'CommunityInfoCard',
  props: {
    singleData: {
      type: Object,
      default() {
        return {}
      },
    },
    iShowFollow: {
      type: Boolean,
      default: true,
    },
    // 是否要显示头部的x
    iShowX: {
      type: Boolean,
      default: false,
    },
    // 是否要显示全部
    isContentAll: {
      type: Boolean,
      default: true,
    },
    // 是否要显示头部
    iShowHeader: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    UserHeader,
    IsFootprint,
    MyMask,
  },
  data() {
    return {
      iShowForward: false,
      single_text_forward_id: {},
      commit: false,
      userInfo: null,
      val: '',
      iShowMask: false,
      isLike: this.singleData.is_like == 1,
      mesg:
        '：Oasis Network上撒大窟窿机房，上课了放假撒看来九分，零四a首个DEX的TVL24小时内达到1亿美元；YuzuSwap是第一家在OasisNetwork上运营的去中心化交易所，自1月11日推出以来，该交易所快速得到了使用，突显出对去中心化金融协议的需求上',
    }
  },
  computed: {},
  created() {
    if (Object.keys(this.singleData.single_text_forward_id).length > 0) {
      this.single_text_forward_id = this.singleData.single_text_forward_id
      this.iShowForward = true
    }
    // setTimeout(() => {
    //   this.userInfo = this.singleData.user_info
    // }, 1000)
    // console.log('log - CommunityInfoCard - this.singleData', this.singleData)
  },
  methods: {
    /** 点击转发按钮
     * @description:
     * @author: qi-you
     * @return {*}
     */
    forwarding() {
      this.iShowMask = !this.iShowMask
      this.$emit('openScroll')
    },
    /** 点击弹出的转发按钮
     * @description:
     * @author: qi-you
     * @return {*}
     */
    clickForw() {
      this.iShowMask = false
      // 为什么要改
      let tmp = this.singleData
      tmp.single_text_content = this.delHtmlTag(tmp.single_text_content)
      this.geTo('/pages/contentTo/contentTo?data=' + JSON.stringify(tmp))
      this.$emit('noScroll')
    },

    //去掉所有的html标记
    delHtmlTag(str) {
      return str.replace(/<[^>]+>/g, '')
    },
    /** 点击评论
     * @description:
     * @author: qi-you
     * @return {*}
     */
    clickComments() {
      this.$emit('sub', this.singleData.single_text_id)
      this.$store.commit('user/SET_USER_ARTICLE', this.singleData)
    },
    open() {
      this.$refs.mack.open('bottom')
    },
    /** 网络请求点赞/取消赞
     * @description:
     * @author: qi-you
     * @param {*} single_text_id
     * @return {*}
     */
    clickLike(single_id) {
      // 自己手动判断状态时点赞还是取消
      let type = 1
      if (this.isLike) {
        type = 2
      }
      this.$api.article
        .like({
          single_id,
          type,
        })
        .then(res => {
          if (res.code != 200) return
          if (this.isLike) {
            this.singleData.type_likes--
          } else {
            this.singleData.type_likes++
          }
          this.isLike = !this.isLike

          console.log('log - clickLike - res', res)
        })
        .catch(err => {})
    },
    /** 点击关注
     * @description:
     * @author: qi-you
     * @return {*}
     */
    gz() {
      this.$emit('gz', this.singleData)
    },
    /** 点击遮罩层
     * @description:
     * @author: qi-you
     * @return {*}
     */
    zzc() {
      this.iShowMask = false
      this.$emit('noScroll')
    },
    /** 点击不感兴趣
     * @description:
     * @author: qi-you
     * @return {*}
     */
    clickNoLike() {
      this.$api.article
        .shieldArticle({
          single_id: this.singleData.single_text_id,
        })
        .then(res => {
          if (res.code != 200) return
          this.$refs.mack.close('bottom')
          this.$emit('refresh')
          console.log('log - this.$api.article.clickNoLike - res', res)
        })
        .catch(err => {
          console.log('log - this.$api.article.clickNoLike - err', err)
        })
    },
    /** 点击不看此博主
     * @description:
     * @author: qi-you
     * @return {*}
     */
    clickNoLook() {
      this.$api.user
        .shieldUser({
          user_id: this.singleData.user_id,
        })
        .then(res => {
          if (res.code != 200) return
          this.$refs.mack.close('bottom')
          this.$emit('refresh')
          console.log('log - this.$api.article.clickNoLike - res', res)
        })
        .catch(err => {
          console.log('log - this.$api.article.clickNoLike - err', err)
        })
    },
    copylink() {
      uni.setClipboardData({
        data: this.singleData.link,
        success: () => {
          this.iShowMask = false
        },
      })
    },
  },
  watch: {
    singleData(val) {
      console.log('log - watch - val', val)
    },
  },

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
.my-content-wrapper {
  padding: 0 20rpx 20rpx;
}

.comment-x {
  position: relative;
  top: 4rpx;
  // &::after {
  //   display: block;
  //   content: '';
  //   height: 40rpx;
  //   position: absolute;
  //   top: 0;
  //   left: -40rpx;

  //   border-left: 1px solid #e8e9e9;
  // }
}

// .img-wrapper {
//   display: flex;
//   justify-content: space-evenly;
//   flex-wrap: wrap;
//   margin-top: 10rpx;

//   .img-box {
//     flex: 1 1 300rpx;
//     padding: 5rpx;

//     image {
//       height: 100%;
//       width: 100%;
//     }

//     img {
//       height: 100%;
//       width: 100%;
//     }
//   }

//   .my-image {
//     // margin: 10rpx auto 0;
//     border-radius: 20rpx;
//     // width: 690rpx;
//     // height: 337rpx;
//   }
// }
.img-wrapper {
  max-width: 100%;
  margin-top: 10rpx;
  // padding-bottom: 100%;
  overflow: hidden;
  // height: 200rpx;
  .img-box {
    display: inline-block;
    width: 224rpx;
    height: 200rpx;
    margin-right: 10rpx;
    overflow: hidden;
    border: 1rpx solid #eee;
    border-radius: 20rpx;
    image {
      height: 100%;
      width: 100%;
    }

    img {
      background-size: cover;
      background-repeat: no-repeat;
      background-position: 50%;
      // position: absolute;
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }

  .my-image {
    // margin: 10rpx auto 0;

    // width: 690rpx;
    // height: 337rpx;
  }
}

.CommunityInfoCard {
  margin-bottom: 6rpx;
  // box-shadow: 0px 3px 6px 1px rgba(145, 145, 145, 0.16);
}

/* .space-y-12 > view:not(:first-child),
.space-y-12 > text:not(:first-child),
.space-y-12 > image:not(:first-child) {
  margin-top: 12rpx;
} */
.section {
  padding: 30rpx 0 0rpx;
  background-color: #ffffff;
  box-shadow: 0px 3rpx 6rpx #91919129;
}

.space-y-20 > view:not(:first-child),
.space-y-20 > text:not(:first-child),
.space-y-20 > image:not(:first-child) {
  margin-top: 20rpx;
}

.group_2 {
  position: relative;
  padding: 0 28rpx 18rpx 30rpx;
}

.image {
  border-radius: 50%;
  width: 85rpx;
  height: 85rpx;
}

.space-y-16 > view:not(:first-child),
.space-y-16 > text:not(:first-child),
.space-y-16 > image:not(:first-child) {
  margin-top: 16rpx;
}

.group_3 {
  margin-left: 24rpx;
  align-self: center;
}

.font_1 {
  font-size: 32rpx;
  font-family: PingFang-SC-Medium;
  // line-height: 26rpx;
  color: #333333;
  font-weight: 500;
  // font-size: 32rpx;
  // line-height: 44rpx;
  // color: #333333;
  // margin-left: 10rpx;
  // font-weight: 500;
  margin-bottom: 10rpx;
  position: relative;
}

.text {
  color: #ff5904;
}

.font_2 {
  font-size: 24rpx;
  font-family: PingFang-SC-Light;
  line-height: 17.5rpx;
  font-weight: 300;
  color: #999999;
}

.image_3 {
  margin-left: 6rpx;
  margin-top: 18rpx;
  width: 75rpx;
  height: 19rpx;
}

.image_2 {
  width: 22rpx;
  height: 17rpx;
}

.space-y-7 > view:not(:first-child),
.space-y-7 > text:not(:first-child),
.space-y-7 > image:not(:first-child) {
  margin-top: 7rpx;
}

.font_3 {
  font-size: 32rpx;
  // font-family: PingFang-SC-Medium;

  line-height: 44rpx;
  color: #333333;
  margin-left: 10rpx;
  font-weight: 500;
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
}

.space-y-15 > view:not(:first-child),
.space-y-15 > text:not(:first-child),
.space-y-15 > image:not(:first-child) {
  margin-top: 15rpx;
}

.section_2 {
  padding: 22rpx 30rpx 24rpx;
  background-color: #f5f5f5;
}

.group_4 {
  line-height: 34rpx;
}

.font_4 {
  font-size: 28rpx;
  font-family: PingFang-SC-Medium;
  line-height: 34rpx;
  color: #5b7b9e;
}

.image_4 {
  border-radius: 20rpx;
  width: 444rpx;
  // height: 337rpx;
}

.equal-division {
  position: relative;
  justify-content: space-around;
  align-items: center;
  align-self: center;
  width: 100%;
  height: 70rpx;
  background-color: #fafafa;
  border-top: 1rpx solid #eee;
}

.space-x-12 > view:not(:first-child),
.space-x-12 > text:not(:first-child),
.space-x-12 > image:not(:first-child) {
  margin-left: 12rpx;
}

.space-x-12 {
  margin-top: 10rpx;
}

.image_5 {
  flex-shrink: 0;
  width: 35rpx;
  height: 35rpx;
}

.font_5 {
  font-size: 28rpx;
  font-family: PingFang-SC-Light;
  line-height: 20rpx;
  font-weight: 300;
  color: #666666;
}

.font_51 {
  color: #666666;
}

.text_2 {
  align-self: center;
}

.text_3 {
  align-self: center;
}

.font_6 {
  color: #ff5904;
}

.text_4 {
  align-self: center;
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

.forward {
  position: absolute;
  top: -20rpx;
  left: 50rpx;
  transform: translateY(-100%);
  width: 670rpx;
  background: #fff;
  border-radius: 10rpx;
  z-index: 1000;

  &::after {
    display: block;
    position: absolute;
    bottom: 10rpx;
    transform: translateY(100%);
    left: 60rpx;
    content: '';
    border: 30rpx solid transparent;
    border-top: 30rpx solid #fff;
  }

  .pad35 {
    padding-top: 20rpx;
    padding-left: 21rpx;
    padding-bottom: 20rpx;
    display: flex;

    .icon {
      width: 30rpx;
      height: 30rpx;
      margin-right: 10rpx;
    }

    img {
      width: 100%;
      height: 100%;
    }

    // background: red;
    &:first-child {
      border-bottom: 1px solid #eee;
      padding-bottom: 10rpx;
    }
  }
}

.myimage_2 {
  position: absolute;
  top: -16rpx;
  right: 15rpx;
  width: 48rpx;
  height: 48rpx;
  z-index: 1;
}
</style>
