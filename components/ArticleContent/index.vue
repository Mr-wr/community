<template>
  <div class="ArticleContent">
    <div class="my-content-wrapper">
      <view @tap.stop="clickContent" class="flex-col items-start space-y-7">
        <!-- // todo 判断是否要显示全部 -->
        <p v-html="textContent" class="font_3" style="font-weight: 500; font-size: 30rpx; line-height: 46rpx">
          <!-- {{ isContentAll && textContent.length > 120 ? textContent.substring(0, 120) + '...' : textContent }} -->
          <span v-if="isContentAll && textContent.length > 120" @tap="clickContent" style="color: #5b7b9e"> 全文 </span>
        </p>
        <!-- 从新写过渲染图片规则-仿照微博 -->
        <div v-if="imgUrlAry.length > 0" class="img-wrapper">
          <div :style="imgUrlAry.length == 4 ? 'width: 240rpx' : ''" v-for="(item, index) in imgUrlAry" :key="index" class="img-box">
            <img class="my-image" :src="item" @tap.stop="clickImg(item)" />
          </div>
        </div>
        <!-- <div v-if="imgUrlAry.length > 0" class="img-wrapper">
          <div :style="imgUrlAry.length == 1 ? 'width:444rpx' : ''" v-for="(item, index) in imgUrlAry" :key="index" class="img-box">
            <img class="my-image" :src="item" alt="" />
          </div>
        </div> -->
      </view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArticleContent',
  props: {
    itemData: {
      type: Object,
      default() {
        return {}
      },
    },
    // 是否显示全文按钮
    isContentAll: {
      type: Boolean,
      default: true,
    },
    // 是否可以全文点击
    isContent: {
      type: Boolean,
      default: true,
    },
    imgUrlAry: {
      type: Array,
      default() {
        return []
      },
    },
    textContent: {
      type: String,
      default: '',
    },
  },
  data() {
    return {}
  },
  computed: {},
  methods: {
    /** 点击了内容
     * @description:
     * @author: qi-you
     * @return {*}
     */
    clickContent() {
      // this.geTo('/pages/contentDetail/contentDetail?single_id=' + this.itemData.single_text_id)
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
.my-content-wrapper {
  padding: 20rpx;
}
// .img-wrapper {
//   display: flex;
//   justify-content: space-evenly;
//   flex-wrap: wrap;
//   margin-top: 10rpx;
//   .img-box {
//     flex: 1 1 300rpx;
//     padding: 5rpx;
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
</style>
