<template>
  <div class="Comments">
    <!-- 转发评论点赞 -->
    <view class="flex-row justify-between equal-division">
      <view @tap.stop="forwarding" class="flex-row space-x-12" style="align-items: center">
        <div v-show="iShowMask" class="forward">
          <div class="pad35 forward-text">
            <div class="icon">
              <img src="@/static/my/forward.png" alt="" />
            </div>
            <div style="width: 100%" @tap="$emit('zf')">转发</div>
          </div>
          <div @tap.stop="copylink" class="pad35 copy">
            <div class="icon">
              <img src="@/static/my/copy.png" alt="" />
            </div>
            <div style="width: 100%">复制链接</div>
          </div>
        </div>
        <image class="image_5" src="@/static/my/myDetail/zf.png" />
        <text class="font_5 text_2">{{ type_forward }}</text>
      </view>
      <view class="flex-row space-x-12">
        <image @tap.stop="clickComments" class="image_5" src="@/static/my/myDetail/comments.png" />
        <text class="font_5 text_3">{{ type_comments }}</text>
      </view>
      <view @tap.stop="clickLike" class="flex-row space-x-12">
        <image v-if="isLike" class="image_5" src="@/static/my/myDetail/zan.png" />
        <image v-else class="image_5" src="@/static/common/fabulous.png" />
        <text :class="[isLike ? 'font_6' : '', 'text_4']">{{ type_likes }}</text>
      </view>
    </view>
    <!-- 遮罩层 -->
    <!-- <div v-show="iShowMask" @tap.stop="iShowMask = false" class="mask"></div> -->
  </div>
</template>

<script>
export default {
  name: 'Comments',
  props: {
    type_forward: {
      type: Number,
      default: 0,
    },
    type_comments: {
      type: Number,
      default: 0,
    },
    type_likes: {
      type: Number,
      default: 0,
    },
    single_text_id: {
      type: Number,
      default: 0,
    },
    is_like: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      iShowMask: false,
      isLike: this.is_like == 1,
    }
  },
  computed: {},
  methods: {
    copylink() {
      uni.setClipboardData({
        data: this.singleData.link,
        success: () => {
          this.iShowMask = false
        },
      })
    },
    /** 点击转发按钮
     * @description:
     * @author: qi-you
     * @return {*}
     */
    forwarding() {
      this.iShowMask = !this.iShowMask
    },
    /** 点击评论
     * @description:
     * @author: qi-you
     * @return {*}
     */
    clickComments() {
      this.$emit('sub', this.single_text_id)
    },
    /** 网络请求点赞/取消赞
     * @description:
     * @author: qi-you
     * @param {*} single_text_id
     * @return {*}
     */
    clickLike() {
      // 自己手动判断状态时点赞还是取消
      let type = 1
      if (this.isLike) {
        type = 2
      }
      this.$api.article
        .like({
          single_id: this.single_text_id,
          type,
        })
        .then(res => {
          if (res.code != 200) return
          if (this.isLike) {
            this.type_likes--
          } else {
            this.type_likes++
          }
          this.isLike = !this.isLike

          console.log('log - clickLike - res', res)
        })
        .catch(err => {})
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
.mask {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 999;
}
.equal-division {
  position: relative;
  align-self: center;
  width: 556.5rpx;
}
.space-x-12 > view:not(:first-child),
.space-x-12 > text:not(:first-child),
.space-x-12 > image:not(:first-child) {
  margin-left: 12rpx;
}
.image_5 {
  flex-shrink: 0;
  width: 44rpx;
  height: 44rpx;
}
.font_6 {
  color: #ff5904;
}
.font_5 {
  font-size: 28rpx;
  font-family: PingFang-SC-Light;
  line-height: 20rpx;
  font-weight: 300;
  color: #666666;
}
.space-x-12 > view:not(:first-child),
.space-x-12 > text:not(:first-child),
.space-x-12 > image:not(:first-child) {
  margin-left: 12rpx;
}
.text_3 {
  align-self: center;
}
.text_4 {
  align-self: center;
}
.forward {
  position: absolute;
  top: -20rpx;
  left: -50rpx;
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
</style>
