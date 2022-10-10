<template>
	<view class="vote-head-time-block">
		<view class="vote-head-time-top"></view>
		<view class="vote-head-time-content">
			<view class="vote-head-time-content-day">
				{{time}}
			</view>
			<view class="vote-head-time-content-day-text">
				{{timetype}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "daytime",
		props: {
			time: {
				type: Number,
				default: 0
			},
			timetype: {
				type: String,
				default: ''
			}
		},
		data() {
			return {

			};
		}
	}
</script>

<style scoped lang="scss">
	.vote-head-time-block {
		display: flex;
		flex-direction: column;

		.vote-head-time-top {
			width: 130rpx;
			height: 10rpx;
			background: #FBFBFB;
			box-shadow: 0rpx 3rpx 6rpx 1rpx rgba(0, 0, 0, 0.16);
			border-radius: 10rpx 10rpx 10rpx 10rpx;
			opacity: 1;
		}

		.vote-head-time-content {
			width: 120rpx;
			height: 132rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 3rpx 6rpx 1rpx rgba(0, 0, 0, 0.16);
			border-radius: 10rpx 10rpx 10rpx 10rpx;
			opacity: 1;
			text-align: center;
			display: flex;
			flex-direction: column;
			align-items: center;
			margin: 0 auto;
			position: relative;
			top: -10rpx;

			.vote-head-time-content-day {
				width: 47rpx;
				font-size: 40rpx;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #4390FB;
				line-height: 39rpx;
				margin: 20rpx 0;
			}

			.vote-head-time-content-day-text {
				width: 47rpx;
				font-size: 25rpx;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #4390FB;
				line-height: 39rpx;
			}
		}
	}
</style>
