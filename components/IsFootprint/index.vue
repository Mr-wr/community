<template>
	<div class="IsFootprint" v-if="isuserInfo.user_id != user_id">
		<view @tap.stop="gz" class="flex-row space-x-13 section_2" :class="{ mysection_4: isgz }">
			<!-- 判断是否已关注 -->
			<!-- <image v-if="isgz" class="myimage_4" src="@/static/my/add.png" />
      <image v-else class="myimage_4" src="@/static/my/gou.png" />
      <text class="myfont_4" :class="{ mytext_11: isgz }">{{ isgz ? '关注' : '已关注' }}</text> -->
			<image v-if="isgz" style="width: 114rpx; height: 48rpx" src="../../static/common/gzbtn.png"></image>
			<image v-else style="width: 138rpx; height: 48rpx" src="../../static/common/ygzbtn.png"></image>
		</view>
	</div>
</template>

<script>
	export default {
		name: 'IsFootprint',
		props: {
			user_id: {
				type: Number,
				default: 0,
			},
			isfootprint: {
				type: Number,
				default: 2,
			},
		},
		data() {
			return {
				isgz: this.isfootprint == 2,
			}
		},
		created() {
			// this.user_id
			// console.log('log - created - this.user_id', this.user_id)
		},
		computed: {},
		methods: {
			gz() {
				this.operateFootprint(this.user_id, this.isgz ? 1 : 2)
					.then(result => {
						this.$emit('gz')
						this.isgz = !this.isgz
					})
					.catch(err => {
						console.log('IsFootprint catch', err)
					})
			},
		},
		watch: {
			isfootprint(val) {
				this.isgz = val == 2
				console.log('log - isfootprint - val', val)
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

<style scoped>
	.IsFootprint {
		margin-top: -20rpx;
	}

	.section_2 {
		padding: 10rpx 14rpx 10rpx 16rpx;
		align-self: center;
		border-radius: 30rpx;
		/* border: 1rpx solid #eee; */
		height: 44rpx;
		/* margin-right: 40rpx; */
	}

	.mysection_4 {
		padding: 9rpx 14rpx 10rpx;
		align-self: center;
		border-radius: 30rpx;
		/* border: solid 1rpx #ff5904; */
	}

	.myimage_4 {
		/* // margin: 2rpx 0 5rpx; */
		flex-shrink: 0;
		width: 22rpx;
		height: 22rpx;
		margin-right: 10rpx;
	}

	.myfont_4 {
		font-size: 28rpx;
		/* // font-family: .PingFang-SC-Light; */
		line-height: 22.5rpx;
		font-weight: 300;
		color: #999999;
	}

	.mytext_11 {
		/* color: #ff5904; */
		line-height: 22rpx;
		font-size: 28rpx;
	}
</style>
