<template>
  <div class="Forward">
    <view v-if="iShowForward" class="flex-row space-x-13 section_3" :class="{ section_4: isfollow }">
      <!-- 判断是否已关注 -->
      <image v-if="isfollow" class="image_4" src="@/static/my/add.png" />
      <image v-else class="image_4" src="@/static/my/gou.png" />
      <text class="font_4 text_6" :class="{ text_11: isfollow }">关注</text>
    </view>
  </div>
</template>

<script>
export default {
  name: 'Forward',
  props: {},
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

<style scoped></style>
