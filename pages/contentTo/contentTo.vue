<template>
  <div class="contentTo">
    <Title title="内容转发">
      <image slot="left-icon" src="@/static/common/back.png" mode="" @click="back" />
      <div @tap.stop="clickZf" class="release-btn" slot="right">转发</div></Title
    >
    <!-- // todo 限制最长 -->
    <div class="content-wrapper">
      <div
        class="editor"
        ref="divRef"
        tabindex="-1"
        contenteditable
        placeholder="你想说什么"
        @keyup="handkeKeyUp"
        @keydown="handleKeyDown"
      ></div>
      <Card class="card" :singledata="singledata"></Card>
      <!-- <div class="my-select">
        谁可以看
        <uni-data-select v-model="value" :localdata="range" :clear="false"></uni-data-select>
      </div> -->
    </div>
    <div class="myinput">
      <CommentsInput v-if="commit" :iscommit="commit" :iShowInput="false"></CommentsInput>

      <div @tap.stop="clickGk" class="gk">
        <image
          v-show="isuserStatus.single_type.single_type_id <= 1"
          style="width: 19rpx; height: 25rpx"
          src="@/static/common/suo.png"
          mode=""
        />
        <image
          v-show="isuserStatus.single_type.single_type_id > 1"
          style="width: 19rpx; height: 25rpx"
          src="@/static/common/gsuo.png"
          mode=""
        />
        <div style="font-size: 24rpx; margin-left: 10rpx; margin-bottom: 3rpx">{{ isuserStatus.single_type.single_type_name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CommentsInput from '@/components/CommentsInput/index.vue'
import Card from '../my/history/components/Card/Card.vue'
export default {
  name: 'contentTo',
  components: { Card, CommentsInput },
  props: {},
  data() {
    return {
      value: 1,
      commit: true,
      range: [
        { single_type_id: 3, single_type_name: '仅自己可见' },
        { single_type_id: 1, single_type_name: '公开' },
        { single_type_id: 2, single_type_name: '仅关注的人可见' },
      ],
      mvalue: '',
      singledata: '',
      ifrist: true,
    }
  },
  computed: {},
  methods: {
    // 点击返回键
    back() {
      this.init()
      this.publicBack()
    },
    /** 点击公开
     * @description:
     * @author: qi-you
     * @return {*}
     */
    clickGk() {
      this.geTo('/pages/type/type?titleType=' + JSON.stringify(this.range))
    },
    /** 网络发布图片、说说
     * @description:
     * @author: qi-you
     * @return {*}
     */
    async postSingleText() {
      await this.$api.article
        .postSingleText({
          type_id: 1,
          state: this.value,
          content: this.mvalue,
          single_forward_id: this.singledata.single_text_id,
          file_address: [],
        })
        .then(res => {
          if (res.code != 200) return
          this.publicBack()
        })
        .catch(err => {})
    },
    /** 点击了转发
     * @description:
     * @author: qi-you
     * @return {*}
     */
    clickZf() {
      this.postSingleText()
    },
    // --------------------------------------输入框事件方法
    // a初始化
    init() {
      // 设置公开或者私密
      this.$store.commit('user/SET_USER_SINGLE_TYPE', this.range[1])
      // 清空选择的标签类型
      this.$store.commit('user/SET_USER_STATUS_RELEASE_TYPE', null)
      // 设置标签类型
      this.$store.commit('user/SET_USER_IS_SHOW_TYPE', false)
      this.$store.commit('user/SET_USER_NODE', null)
      this.$store.commit('user/SET_USER_ENDINDEX', 1)
      this.$store.commit('user/SET_USER_RELEASE_SELECT_USER', false)
      this.$store.commit('user/SET_USER_SELECT_USER', null)
      this.$store.commit('user/SET_USER_AT', false)
      this.ifrist = true
    },
    test() {
      console.log('log - test -  this.ifrist', this.ifrist)
      if (this.ifrist && !this.getRangeNode()) {
        this.$refs.divRef.focus()
        this.$store.commit('user/SET_USER_NODE', this.getRangeNode())
        this.$store.commit('user/SET_USER_ENDINDEX', this.getCursorIndex())
      }
      this.replaceAtUser(this.isuserStatus.releaseSelectUser ? this.isuserStatus.selectUser.user_info : this.isuserStatus.releaseType)
      this.ifrist = false
      this.mvalue = this.$refs.divRef.innerHTML
    },
    replaceString(raw, replacer) {
      return raw.replace(/@([^@\s]*)$/, replacer)
    },
    // 获取光标位置
    getCursorIndex() {
      const selection = window.getSelection()
      console.log('log - getCursorIndex - selection.focusOffset1', this.ifrist ? selection.focusOffset + 1 : selection.focusOffset)
      // return selection.focusOffset // 选择开始处 focusNode 的偏移量
      return this.ifrist ? selection.focusOffset + 1 : selection.focusOffset // 选择开始处 focusNode 的偏移量
    },
    // 获取节点
    getRangeNode() {
      const selection = window.getSelection()
      // console.log('log - getRangeNode - this.$refs.divRef.innerHTML', this.$refs.divRef.innerHTML)
      return selection.focusNode // 选择的结束节点
    },
    /** 插入@标签
     * @description:
     * @author: qi-you
     * @param {*} user
     * @return {*}
     */
    replaceAtUser(user) {
      const node = this.isuserStatus.node
      console.log('log - replaceAtUser - node', node)
      if (node && user) {
        const content = node.textContent || ''
        const endIndex = this.isuserStatus.endIndex
        const preSlice = this.replaceString(content.slice(0, endIndex), '')
        console.log('log - replaceAtUser - preSlice', preSlice)
        const restSlice = content.slice(endIndex)
        // const parentNode = node
        const parentNode = node.parentNode
        console.log('log - replaceAtUser - node', node)
        console.log('log - replaceAtUser - parentNode', parentNode)
        const nextNode = node.nextSibling
        console.log('log - replaceAtUser - node.nextSibling', node.nextSibling)
        const previousTextNode = new Text(preSlice)
        console.log('log - replaceAtUser - previousTextNode', previousTextNode)
        const nextTextNode = new Text('\u200b' + restSlice) // 添加 0 宽字符
        const atButton = this.createAtButton(user)
        parentNode.removeChild(node)
        // this.ifrist && node.nextSibling ? '' : parentNode.removeChild(node)
        // 插在文本框中
        if (this.ifrist) {
          console.log('ifrist添加')
          this.$refs.divRef.appendChild(previousTextNode)
          this.$refs.divRef.appendChild(atButton)
          this.$refs.divRef.appendChild(nextTextNode)
        } else {
          if (nextNode) {
            console.log('插入')
            this.$refs.divRef.insertBefore(previousTextNode, nextNode)
            this.$refs.divRef.insertBefore(atButton, nextNode)
            this.$refs.divRef.insertBefore(nextTextNode, nextNode)
          } else {
            console.log('添加')
            this.$refs.divRef.appendChild(previousTextNode)
            this.$refs.divRef.appendChild(atButton)
            this.$refs.divRef.appendChild(nextTextNode)
          }
        }

        // if (nextNode) {
        //   console.log('插入')
        //   parentNode.insertBefore(previousTextNode, nextNode)
        //   parentNode.insertBefore(atButton, nextNode)
        //   parentNode.insertBefore(nextTextNode, nextNode)
        // } else {
        //   console.log('添加')
        //   parentNode.appendChild(previousTextNode)
        //   parentNode.appendChild(atButton)
        //   parentNode.appendChild(nextTextNode)
        // }
        // 重置光标的位置
        const range = new Range()
        const selection = window.getSelection()
        range.setStart(nextTextNode, 0)
        range.setEnd(nextTextNode, 0)
        selection.removeAllRanges()
        selection.addRange(range)
      }
    },
    // 创建标签
    createAtButton(user) {
      console.log('log - createAtButton - user', user)
      const btn = document.createElement('span')
      btn.style.display = 'inline-block'
      btn.dataset.user = JSON.stringify(user)
      console.log('log - createAtButton - user', JSON.stringify(user))
      btn.className = 'at-button'
      btn.contentEditable = 'false'
      btn.textContent = `${user.single_type_name ? '#' + user.single_type_name : '@' + user.name}`
      btn.style.color = '#4371A2'
      const wrapper = document.createElement('span')
      wrapper.style.display = 'inline-block'
      wrapper.contentEditable = 'false'
      const spaceElem = document.createElement('span')
      spaceElem.style.whiteSpace = 'pre'
      spaceElem.textContent = '\u200b'
      spaceElem.contentEditable = 'false'
      const clonedSpaceElem = spaceElem.cloneNode(true)
      wrapper.appendChild(spaceElem)
      wrapper.appendChild(btn)
      wrapper.appendChild(clonedSpaceElem)
      return wrapper
    },
    // 键盘抬起事件
    handkeKeyUp() {
      this.$store.commit('user/SET_USER_NODE', this.getRangeNode())
      this.$store.commit('user/SET_USER_ENDINDEX', this.getCursorIndex())
      this.mvalue = this.$refs.divRef.innerHTML
      if (!this.$refs.divRef.innerHTML) {
        this.$store.commit('user/SET_USER_AT', false)
      } else {
        this.$store.commit('user/SET_USER_AT', true)
      }
    },
    // 键盘按下事件
    handleKeyDown(e) {
      if (this.showDialog) {
        if (e.code === 'ArrowUp' || e.code === 'ArrowDown' || e.code === 'Enter') {
          // 阻止默认行为
          e.preventDefault()
        }
      }
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad(e) {
    this.singledata = JSON.parse(e.data)
  },
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {
    if (this.isuserStatus.isShowType || this.isuserStatus.releaseSelectUser) {
      this.test()
    }
  },
  // 页面周期函数--监听页面隐藏
  onHide() {
    if (this.isuserStatus.isShowType || this.isuserStatus.releaseSelectUser) {
      this.$store.commit('user/SET_USER_NODE', this.getRangeNode())
      this.$store.commit('user/SET_USER_ENDINDEX', this.getCursorIndex())
    }
  },
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
.contentTo {
  overflow: hidden;
  min-height: 100vh;
}
.content-wrapper {
  width: 100%;
  .card {
    box-shadow: 0px 3px 6px 1px rgba(145, 145, 145, 0.16);
  }
}
.release-btn {
  width: 124rpx;
  height: 60rpx;
  border-radius: 10rpx 10rpx 10rpx 10rpx;
  background: #fe8e1b;
  font-size: 28rpx;
  font-family: PingFang SC-Light, PingFang SC;
  font-weight: 300;
  color: #ffffff;
  text-align: center;
  line-height: 60rpx;
  .content-wrapper {
    width: 100%;
  }
}
.my-select {
  display: flex;
  padding: 20rpx;
  justify-content: space-between;
  align-items: center;
  // margin-top: -70rpx;
  // width: 100rpx;
  border: 1px solid #eee;
  ::v-deep .uni-popper__arrow {
    left: 47%;
  }
  ::v-deep .uni-select {
    // width: 50rpx;
    // border-left: 0rpx;
    border: 0rpx;
    border-radius: 0;
    text-align: center;
  }
  ::v-deep .uni-icons {
    margin-left: -10rpx;
  }
}
.myinput {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  ::v-deep .comments {
    // position: relative;
    padding: 0;
  }
  ::v-deep .top {
    display: flex;
    align-items: center;
    height: 80rpx;
  }
  ::v-deep .face-img {
    margin-left: 36rpx;
    margin-bottom: 0 !important;
  }
  ::v-deep .zf {
    margin-bottom: 0 !important;
  }

  .gk {
    position: absolute;
    min-width: 112rpx;
    padding: 0 5rpx;
    right: 36rpx;
    bottom: 10rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #999;
    height: 50rpx;
    background: #f5f5f5;
    border-radius: 30px 30px 30px 30px;
    opacity: 1;
    border: 1px solid #999999;
    z-index: 2;
  }
}
.editor {
  margin: 0 auto;
  background: #fff;
  // border: 1px solid blue;
  border-radius: 5px;
  text-align: left;
  overflow: auto;
  line-height: 30px;
  &:focus {
    outline: none;
  }
  position: relative;
  width: 95%;
  height: 250rpx;
  padding: 20rpx;
  font-weight: 500;
  font-size: 28rpx;
  font-weight: 400;
  color: #333333;
  box-sizing: border-box;
  &:empty:before {
    content: attr(placeholder);
    color: #bbb;
  }
  -webkit-user-select: text;
}
</style>
