<template>
  <div class="Card flex-row" @tap.stop="geTo('/pages/contentDetail/contentDetail?single_id=' + singledata.single_text_id)">
    <!-- // todo 数据绑定 -->
    <div class="img-wrapper">
      <img v-if="singledata.media.length > 0" :src="singledata.media[0]" alt="" />
      <img v-else :src="singledata.user_info.avatar[0]" alt="" />
    </div>
    <!--  -->
    <div class="text-wrapper">
      <div class="title" style="color: #5b7b9e">@{{ singledata.user_info ? singledata.user_info.name : singledata.name }}</div>
      <!-- <div class="text">{{ singledata.single_text_content }}</div> -->
      <div class="text" v-html="singledata.single_text_content"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    singledata: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  created() {
    console.log('log - singledata', this.singledata)
  },
  data() {
    return {}
  },
  computed: {},
  methods: {},
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
.Card {
  width: 100%;
  padding: 24rpx 30rpx;
  overflow: hidden;
  background: #fff;
}

.Card > div {
  width: 240rpx;
  height: 154rpx;
  margin-right: 42rpx;
  /* 240px
154px */
}

.Card > div > img {
  width: 100%;
  height: 100%;
}

.Card {
  .text-wrapper {
    flex: 1;

    .title {
      font-size: 32rpx;
      font-family: PingFang SC-Medium, PingFang SC;
      font-weight: 500;
      color: #333333;
      margin-bottom: 16rpx;
    }

    .text {
      font-size: 28rpx;
      font-family: PingFang SC-Medium, PingFang SC;
      font-weight: 500;
      color: #333333;
      display: -webkit-box;
      overflow: hidden;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}
</style>
