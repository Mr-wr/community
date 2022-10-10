<template>
  <div class="CommentsInput">
    <!-- 评论弹出框 -->
    <div class="comments">
      <div v-if="iShowIcon" class="top">
        <!-- <div class="face-img"><img src="@/static/common/face.png" alt="" /></div> -->
        <div @tap.stop="geToUserSearch" class="zf"><img src="@/static/common/@who.png" alt="" /></div>
        <div class="zf" @tap.stop="clickType"><img src="@/static/common/type.png" alt="" /></div>
      </div>
      <div class="bottom" v-if="iShowInput">
        <input class="my-input" @blur="inputBlur" v-model="valComments" type="text" :focus="commit" />
        <div class="sumbit" @tap.stop="sumbit">发送</div>
      </div>
    </div>
  </div>
</template>

<script>
import uniTableVue from '../../uni_modules/uni-table/components/uni-table/uni-table.vue'
export default {
  name: 'CommentsInput',
  props: {
    iscommit: {
      type: Boolean,
      default: '',
    },
    iShowInput: {
      type: Boolean,
      default: true,
    },
    iShowIcon: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      commit: this.iscommit,
      valComments: '',
      isClick: false,
    }
  },
  created() {},
  computed: {},
  methods: {
    /** 点击了@用户
     * @description:
     * @author: qi-you
     * @return {*}
     */
    geToUserSearch() {
      if (this.isuserStatus.isAT) {
        this.geTo('/pages/searchUser/searchUser')
      } else {
        uni.showToast({
          icon: 'error',
          title: '请先输入内容',
          duration: 2000,
        })
      }
    },
    /** 点击发送
     * @description:
     * @author: qi-you
     * @return {*}
     */
    sumbit() {
      this.commit = false
      this.$emit('sumbit', this.valComments)
      this.valComments = ''
    },
    /** 输入框离开事件触发
     * @description:
     * @author: qi-you
     * @return {*}
     */
    inputBlur() {
      if (this.valComments.length <= 0 && this.isClick) {
        this.$emit('sumbit', this.valComments)
      }
    },
    /** 点击了#号
     * @description:
     * @author: qi-you
     * @return {*}
     */
    clickType() {
      this.isClick = true
      if (this.isuserStatus.isAT) {
        this.geTo('/pages/type/type')
      } else {
        uni.showToast({
          icon: 'error',
          title: '请先输入内容',
          duration: 2000,
        })
      }
    },
  },
  watch: {
    commit() {
      this.valComments = ''
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
.comments {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 25rpx;
  background-color: #f5f5f5;
  z-index: 1;
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
</style>
