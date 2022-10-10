<template>
	<view class="project-text-block">
		<view class="project-content-block" @click.stop="tovote(projectmsg.ido_project_id)">
			<view class="project-content-tips">
				{{projectmsg.ido_project_name}}
			</view>
		</view>
		<view class="project-bottom">
			{{projectmsg.ido_project_platform}}
		</view>
	</view>
</template>

<script>
	export default {
		name: "projectblock",
		props: {
			projectmsg: {
				type: Object
			}

		},
		data() {
			return {

			};
		},
		methods: {
			tovote(p) {
				uni.navigateTo({
					url: '/pages/my/vote/votedetail?id=' + p
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.project-text-block {
		display: flex;
		flex-direction: column;
		align-items: center;

		.project-content-block {
			width: 194rpx;
			height: 118rpx;
			background: linear-gradient(180deg, #4897FE 0%, #3A82F7 100%);
			border-radius: 10rpx 10rpx 10rpx 10rpx;
			opacity: 1;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.project-content-text {
				height: 43rpx;
				font-size: 32rpx;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
			}

			.project-content-tips {
				width: 90%;
				height: 60rpx;
				font-size: 24rpx;
				font-family: PingFang SC-Light, PingFang SC;
				font-weight: 300;
				color: #FFFFFF;
				text-align: center;
			}
		}

		.project-bottom {
			height: 32rpx;
			font-size: 24rpx;
			font-family: PingFang SC-Regular, PingFang SC;
			font-weight: 400;
			color: #666666;
			margin-top: 20rpx;
		}
	}
</style>
