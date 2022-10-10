<template>
  <div class="Card flex-row">
    <!-- // todo 数据绑定 -->
    <div class="img-wrapper">
      <img
        src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/617759e4e4f145001133fc3d/632804bc929db90011565618/16635782084305474081.png"
        alt=""
      />
    </div>
    <!--  -->
    <div class="text-wrapper">
      <div class="title">@区块链那些事</div>
      <div class="text">不管是数字货币还是传统金融市 场投资，私募投资都是一种</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    list: {
      type: Array,
      default() {
        return []
      },
    },
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
