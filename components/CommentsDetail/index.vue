<template>
  <div class="CommentsDetail" v-if="commentsDate.length > 0">
    <view class="flex-col space-y-19 group">
      <!-- // todo 循环评论 -->
      <view style="margin-bottom: 20rpx" v-for="(item, index) in commentsDate" :key="index" class="flex-col space-y-20">
        <view class="flex-col section">
          <view class="flex-row space-x-14">
            <image class="image" :src="item.user_info.avatar[0]" />
            <view class="flex-col space-y-13 group_2" style="margin-top: -60rpx">
              <view class="flex-row">
                <text style="font-size: 32rpx; font-weight: 500; color: #000" class="font_1" :class="{ text_2: false }">
                  {{ item.user_info.name }}
                </text>
                <!-- vip 图标 -->
                <image v-if="false" class="image_2" src="" />
              </view>
            </view>
          </view>
          <view class="flex-col group_3" style="margin-top: -46rpx">
            <text style="font-weight: 500" class="font_2">{{ item.content }}</text>
            <!-- <text class="font_2"
                >创建原创内容，以及建立内容创作者网络和在电撒低级发上来大家离开洒家离开洒家发离开洒家发看拉萨大家啊克里斯蒂克里斯蒂安金克拉撒旦考虑撒旦记录卡吉萨大刻录机撒旦风口浪尖法撒旦吉萨大考虑艰苦撒旦分类金克拉撒旦降落速度加快了速度氨基酸</text
              > -->
            <!-- 回复评论 -->
            <div class="comments-box">
              <div class="comments-warpper" style="">
                <div class="comments-name" style="">用户22251:</div>
                <div class="comments-content" style="">嘀嘀嘀达到擦大撒打开链接富士康了解的啊色 大叔</div>
              </div>
              <div class="comments-warpper" style="">
                <div class="comments-name" style="">用户22251:</div>
                <div class="comments-content" style="">嘀嘀嘀达到擦大撒打开链接富士康了解的啊色 大叔</div>
              </div>
              <div @tap.stop="clickTotalComments(item)" class="total-comments">共{{ 1 }}条回复></div>
            </div>
            <view class="flex-row justify-between group_4">
              <text class="text_4">{{ item.time.substring(5, 16) }}</text>
              <view class="flex-row space-x-37 group_5">
                <div>
                  <image class="image_5" src="@/static/my/myDetail/zf.png" />
                </div>
                <image @tap.stop="clickComment(item)" class="image_3" src="@/static/my/myDetail/comments.png" />
                <image class="image_4" src="@/static/common/fabulous.png" />
                <div style="font-size: 28rpx; font-family: PingFang SC-Medium, PingFang SC; font-weight: 500; color: #999999">12</div>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 底部 -->
      <CommentsInput v-if="commit" :iscommit="commit" @sumbit="sumbit"></CommentsInput>
    </view>
  </div>
</template>

<script>
import CommentsInput from '@/components/CommentsInput/index.vue'
export default {
  name: 'CommentsDetail',
  props: {
    commentsDate: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      commit: false,
    }
  },

  components: { CommentsInput },
  created() {},
  computed: {},
  methods: {
    clickComment(item) {
      console.log('log - clickComment - item', item)
      this.commit = true
    },
    /** 用户点击发送
     * @description:
     * @author: qi-you
     * @return {*}
     */
    sumbit(val) {
      if (val.length > 0) {
        this.$api.article
          .comment({
            single_id: this.single_text_id,
            type: 1,
            information: val,
            file_address: [],
          })
          .then(async res => {
            if (res.code != 200) return
            this.commit = false
            window.location.reload()
            console.log('log - this.$api.article.comment - res', res)
          })
          .catch(err => {
            console.log('log - this.$api.article.comment - err', err)
          })
      } else {
        this.commit = false
      }
      console.log('log - sumbit - val', val)
    },
    clickTotalComments(item) {
      console.log('log - clickTotalComments - item', item)
      this.$store.commit('user/SET_USER_SELECT_COMMENTS', item)
      this.geTo('/pages/commentsContent/commentsContent')
    },
  },
  watch: {
    commentsDate() {
      console.log('log - created - this.commentsDate', this.commentsDate)
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
.CommentsDetail {
  .group {
    padding-top: 20rpx;
    /* overflow-y: auto; */
    .space-y-19 > view:not(:first-child),
    .space-y-19 > text:not(:first-child),
    .space-y-19 > image:not(:first-child) {
      margin-top: 19rpx;
    }
  }
  .text {
    margin-left: 34rpx;
    align-self: flex-start;
    color: #999999;
    font-size: 24rpx;
    font-family: PingFang-SC-Medium;
    line-height: 22rpx;
  }
  .space-y-20 > view:not(:first-child),
  .space-y-20 > text:not(:first-child),
  .space-y-20 > image:not(:first-child) {
    margin-top: 20rpx;
  }
  .section {
    padding: 44rpx 0 24rpx 30rpx;
    background-color: #ffffff;
    box-shadow: 0px 3rpx 6rpx #91919129;
  }
  .space-x-14 > view:not(:first-child),
  .space-x-14 > text:not(:first-child),
  .space-x-14 > image:not(:first-child) {
    margin-left: 14rpx;
  }
  .image {
    flex-shrink: 0;
    width: 93rpx;
    height: 93rpx;
    border-radius: 50%;
  }
  .space-y-13 > view:not(:first-child),
  .space-y-13 > text:not(:first-child),
  .space-y-13 > image:not(:first-child) {
    margin-top: 13rpx;
  }
  .group_2 {
    margin-right: -26rpx;
    flex: 1 1 auto;
    align-self: center;
  }
  .font_1 {
    font-size: 28rpx;
    font-family: PingFang-SC-Medium;
    line-height: 26rpx;
    color: #666666;
  }
  .image_2 {
    margin: 5rpx 0 2rpx 8rpx;
    width: 75rpx;
    height: 19rpx;
  }
  .group_3 {
    margin-right: 24rpx;
    align-self: flex-end;
    width: 590rpx;
  }
  .font_2 {
    font-size: 28rpx;
    font-family: PingFang-SC-Light;
    line-height: 34rpx;
    font-weight: 300;
    color: #333333;
  }
  .group_4 {
    margin-top: 14rpx;
  }
  .space-x-37 > view:not(:first-child),
  .space-x-37 > text:not(:first-child),
  .space-x-37 > image:not(:first-child) {
    margin-left: 37rpx;
  }
  .group_5 {
    margin-right: 6rpx;
  }
  .image_5 {
    margin-bottom: 4rpx;
    width: 40rpx;
    height: 40rpx;
  }
  .image_3 {
    width: 46rpx;
    height: 46rpx;
  }
  .image_4 {
    width: 44rpx;
    height: 44rpx;
  }
}
.comments-box {
  box-sizing: border-box;
  padding: 20rpx;
  margin-top: 21rpx;
  width: 585rpx;
  height: 188rpx;
  background: #f5f5f5;
  .comments-warpper {
    display: flex;
    margin-bottom: 12rpx;
    // align-items: center;
    .comments-name {
      width: 120rpx;
      color: #4371a2;
      font-size: 24rpx;
      font-weight: 500;
      height: 44rpx;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .comments-content {
      flex: 1;
      font-size: 24rpx;
      font-weight: 500;
      height: 44rpx;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .total-comments {
    color: #4371a2;
  }
}
</style>
