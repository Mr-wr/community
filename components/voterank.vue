<template>
	<view class="rank-block">
		<view class="rank-no">
			{{id}}
		</view>
		<view class="rank-block-left">
			<view class="rank-user-msg">
				<view class="">
					<image
						:src="voterankmsg.ido_project_logo == ''?'http://community.nnmm666.com/storage/formal/avatar/20220921/9e21cac2a9935b731bce2e96b655dcd4.png':voterankmsg.ido_project_logo"
						mode="widthFix" class="userheadimg"></image>
				</view>
				<view class="user-msg">
					<view class="">
						{{voterankmsg.ido_project_name}}
					</view>
					<view class="" style="display: flex;align-items: center;">
						<view class="" style="width: 40rpx;">
							<image src="../static/my/hot.png" style="width: 100%;" mode="widthFix">
							</image>
						</view>
						<view class="" style="position: relative;bottom: 6rpx;">
							{{voterankmsg.ido_project_total_votes}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="rank-block-right" @click.stop="tovote(voterankmsg.ido_project_id)">
			立即投票
		</view>
	</view>
</template>

<script>
	export default {
		name: "voterank",
		props: {
			voterankmsg: {
				type: Object
			},
			id: {
				type: String
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
	.rank-block {
		width: 750rpx;
		height: 140rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 3rpx 6rpx 1rpx rgba(145, 145, 145, 0.16);
		border-radius: 0rpx 0rpx 0rpx 0rpx;
		opacity: 1;
		margin-top: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;

		.rank-no {
			font-size: 38rpx;
			font-family: PingFang SC-Regular, PingFang SC;
			font-weight: 400;
			color: #3A82F7;
			flex: 0.1;
			text-align: center;
			margin-right: 25rpx;
		}


		.rank-block-left {
			display: flex;
			align-items: center;
			flex: 0.6;


			.rank-user-msg {
				display: flex;

				.userheadimg {
					margin-right: 20rpx;
					width: 90rpx;
					border-radius: 50%;
				}

				.user-msg {
					display: flex;
					flex-direction: column;
				}
			}
		}

		.rank-block-right {
			width: 180rpx;
			height: 70rpx;
			background: linear-gradient(180deg, #4897FE 0%, #3A82F7 100%);
			border-radius: 10rpx 10rpx 10rpx 10rpx;
			text-align: center;
			line-height: 70rpx;
			font-size: 24rpx;
			font-family: PingFang SC-Medium, PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
			flex: 0.2;
		}
	}
</style>
