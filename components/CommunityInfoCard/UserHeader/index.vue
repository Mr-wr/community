<template>
  <div class="UserHeader">
    <view class="flex-col space-y-20 group_2">
      <view class="flex-row justify-between" style="align-items: center">
        <view class="flex-row">
          <image
            @tap.stop="geTo('/pages/my/myDetail/myDetail?user_id=' + user_id)"
            class="image"
            :src="avatar instanceof Array ? avatar[0] : avatar"
          />
          <!-- // todo 绑定数据判断是或否vip -->
          <view class="flex-col items-start space-y-16 group_3">
            <text style="font-size: 32rpx; font-weight: 500; color: #000" class="font_1" :class="{ text: false }">{{ name }}</text>
            <text style="margin-top: 3rpx" class="font_2">{{ time.substring(5, 16) }}</text>
          </view>
          <!-- vip图标 -->
          <image v-if="false" class="image_3" src="" />
        </view>
        <!-- 判断是显示关注还是显示还是都显示 -->
        <image @tap.stop="open" v-if="iShowX" class="image_2" src="@/static/common/close.png" />
        <IsFootprint @gz="gz" v-if="iShowFollow" :isfootprint="isfootprint" :user_id="user_id"></IsFootprint>
      </view>
    </view>
    <MyMask ref="mack"></MyMask>
  </div>
</template>

<script>
import MyMask from '@/components/MyMask/MyMask.vue'
import IsFootprint from '@/components/IsFootprint/index.vue'
export default {
  name: 'UserHeader',
  components: {
    MyMask,
    IsFootprint,
  },
  props: {
    user_id: {
      type: Number,
      default: 0,
    },
    // 是否显示关注了
    iShowFollow: true,
    // 是否关注了
    isfootprint: {
      type: Number,
      default: null,
    },
    // 是否显示x文件
    iShowX: {
      type: Boolean,
      default: false,
    },
    avatar: '',
    name: '',
    time: '',
  },
  data() {
    return {
      show: false,
      follow: this.isfollow,
      ShowFollow: this.iShowFollow,
      textContent: this.text,
      testText:
        '私募投资不管是数字货币卡上的纠纷投资还是传统金融市场投资私募投资不管是数字货币投资还是传统金融市场投资不管是数字货币投资还是传统金融市场投资私募投资不管是数字货币投资还是传统金融市场投资，私募投资不管是数字货币投资还是传统金融市场投资，私募投资',
    }
  },
  created() {
    // console.log('log - header - avatar', this.avatar)
  },
  computed: {},
  methods: {
    test() {
      console.log('sdafsafsdaf')
    },
    gz() {
      this.$emit('gz')
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
.img-wrapper {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  .img-box {
    flex: 1 1 300rpx;
    padding: 5rpx;
    img {
      height: 100%;
      width: 100%;
    }
  }
  .my-image {
    // margin: 10rpx auto 0;
    border-radius: 20rpx;
    // width: 690rpx;
    // height: 337rpx;
  }
}
.UserHeader {
  background: #fff;
  overflow: hidden;
}
.slh {
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.space-y-20 > view:not(:first-child),
.space-y-20 > text:not(:first-child),
.space-y-20 > image:not(:first-child) {
  margin-top: 20rpx;
}
.group_2 {
  position: relative;
  padding: 0 28rpx 0rpx 30rpx;
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
  font-size: 28rpx;
  font-family: PingFang-SC-Medium;
  // line-height: 26rpx;
  font-weight: 500;
  color: #333333;
}
.text {
  color: #ff5904;
}
.font_2 {
  font-size: 24rpx;
  font-family: PingFang-SC-Light;
  font-weight: 300;
  color: #999999;
}
.image_3 {
  margin-left: 6rpx;
  margin-top: 18rpx;
  width: 75rpx;
  height: 25rpx;
}
.image_2 {
  position: absolute;
  top: 0rpx;
  right: 15rpx;
  width: 48rpx;
  height: 48rpx;
  z-index: 1;
}
.space-y-7 > view:not(:first-child),
.space-y-7 > text:not(:first-child),
.space-y-7 > image:not(:first-child) {
  margin-top: 7rpx;
}

.font_3 {
  width: 100%;
  font-size: 28rpx;
  line-height: 45rpx;
  color: #333333;
  /* font-family: PingFang SC-Medium, PingFang SC; */
  font-weight: 500;
}
.space-x-13 > view:not(:first-child),
.space-x-13 > text:not(:first-child),
.space-x-13 > image:not(:first-child) {
  margin-left: 13rpx;
}
.section_3 {
  margin-right: 50rpx;
  padding: 8rpx 14rpx 11rpx;
  align-self: center;
  border-radius: 30rpx;
  line-height: 44rpx;
  height: 44rpx;
  border: solid 1rpx #999999;
}
.image_4 {
  /* // margin: 2rpx 0 5rpx; */
  flex-shrink: 0;
  width: 22rpx;
  height: 22rpx;
}
.font_4 {
  font-size: 24rpx;
  /* // font-family: .PingFang-SC-Light; */
  line-height: 22.5rpx;
  font-weight: 300;
  color: #999999;
}
.text_6 {
  /* line-height: 22rpx; */
}
.section_4 {
  padding: 9rpx 14rpx 10rpx;
  align-self: center;
  border-radius: 30rpx;
  height: 44rpx;
  border: solid 1rpx #ff5904;
}
.text_11 {
  color: #ff5904;
  line-height: 22rpx;
}
</style>
