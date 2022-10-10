<template>
	<div class="Title">
		<div class="left-icon">
			<slot name="left-icon">
				<image src="@/static/common/back.png" mode="" @click="back" />
			</slot>
		</div>
		<div class="content-title">{{ title }}</div>
		<div class="right">
			<slot name="right"></slot>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Title',
		props: {
			title: {
				type: String,
				default: '我是标题',
			},
		},
		data() {
			return {}
		},
		computed: {},
		methods: {
			back() {
				const pages = getCurrentPages() // eslint-disable-line
				// 有可返回的页面则直接返回，uni.navigateBack  默认返回失败之后会自动刷新页面 ，无法继续返回
				if (pages.length > 1) {
					uni.navigateBack(1)
					return
				}
				// vue router 可以返回uni.navigateBack失败的页面 但是会重新加载
				const a = this.$router.go(-1)
				// router.go失败之后则重定向到首页
				if (a == undefined) {
					uni.reLaunch({
						url: '/pages/index/index',
					})
				}
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

<style lang="scss" scoped>
	.Title {
		position: sticky;
		top: 0;
		z-index: 1;
		width: 100%;
		height: 100rpx;
		display: flex;
		align-items: center;
		background: #fafafa;
		border-bottom: 1rpx solid #ccc;

		.test {
			position: absolute;
			top: 130rpx;
			width: 100%;
			// width: 750rpx;
			height: 88rpx;
			background: linear-gradient(#ffffff, #f5f5f5);
		}

		.left-icon {
			position: absolute;
			left: 30rpx;
			width: 52rpx;
			height: 52rpx;

			image {
				height: 100%;
				width: 100%;
			}
		}

		.content-title {
			flex: 1;
			text-align: center;
			font-size: 36rpx;
			font-family: Segoe UI-Bold, Segoe UI;
			font-weight: 500;
			color: #475e6c;
		}

		.right {
			position: absolute;
			right: 19rpx;
		}
	}
</style>
