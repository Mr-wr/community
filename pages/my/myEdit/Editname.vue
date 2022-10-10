<template>
	<view class="editname-container">
		<view class="editname-top">
			<view class="" @click.stop="publicBack">
				<uni-icons type="back" size="25"></uni-icons>
			</view>
			<view class="head-title">
				更改名字
			</view>
			<view class="sava-btn" @click.stop="savename">
				保存
			</view>
		</view>
		<view class="editname-content">
			<view class="editname-input">
				<input type="text" v-model="name" :placeholder="isuserInfo.name">
			</view>
			<view class="editname-tips">
				好名字可以让你的朋友更容易记住你。
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: ''
			}
		},
		created() {
			console.log(this.isuserInfo);
		},
		methods: {
			savename() {
				this.$api.user.editPersonalInfo({
					name: this.name
				}).then(res => {
					if (res.code == 200) {
						uni.showToast({
							icon: 'success',
							title: '修改成功'
						})
						setTimeout(() => {
							this.publicBack()
						}, 1000)
					} else {
						uni.showToast({
							icon: 'error',
							title: res.msg
						})
						setTimeout(() => {
							this.publicBack()
						}, 1000)
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.editname-container {
		width: 750rpx;

		.editname-top {
			width: 100%;
			display: flex;
			margin: 0 auto;
			justify-content: space-between;
			padding: 0 20rpx;
			align-items: center;
			margin-bottom: 20rpx;
			border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);

			.head-title {
				height: 50rpx;
				font-size: 36rpx;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #333333;

			}

			.sava-btn {
				background-image: linear-gradient(to right, #FF6A1D, #FF9830);
				width: 160rpx;
				height: 70rpx;
				line-height: 70rpx;
				text-align: center;
				font-size: 28rpx;
				font-family: PingFang SC-Medium, PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
				border-radius: 25rpx;
			}
		}

		.editname-content {
			width: 95%;
			margin: 0 auto;

			.editname-input {
				width: 100%;
				height: 60rpx;
				padding-bottom: 60rpx;
				border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
			}

			.editname-tips {

				font-size: 24rpx;
				font-family: PingFang SC-Light, PingFang SC;
				font-weight: 300;
				color: #333333;

			}
		}
	}
</style>
