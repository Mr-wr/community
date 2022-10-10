<template>
	<view class="votelog-block">
		<view class="votelog-content">
			<view class="project-name">
				<view class="">
					项目名称 :
				</view>
				<view class="" style="margin-left: 10rpx;">
					{{logmsg.ido_project_name}}
				</view>
			</view>
			<view class="project-time">
				<view class="">
					项目时间 :
				</view>
				<view class="" style="margin-left: 10rpx;">
					{{logmsg.ido_project_release_time}}
				</view>
			</view>
			<view class="project-msg">
				{{logmsg.ido_project_introduce}}
			</view>
		</view>
		<view class="vote-msg">
			<view class="vote-cai">
				<view class="">
					<image src="../static/my/cai.png" mode="widthFix" class="caiimg"></image>
				</view>
				<view class="">
					{{logmsg.ido_project_ido_project}}
				</view>
			</view>
			<view class="vote-zan">
				<view class="">
					<image src="../static/my/zan.png" mode="widthFix" class="zanimg"></image>
				</view>
				<view class="">
					{{logmsg.ido_project_support}}
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		name: "votelog",
		props: {
			logmsg: {
				type: Object
			}
		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss" scoped>
	.votelog-block {
		width: 750rpx;
		height: 550rpx;
		background: #FFFFFF;
		box-shadow: 6rpx 3rpx 10rpx 1rpx rgba(145, 145, 145, 0.16);
		margin-top: 30rpx;

		.votelog-content {
			width: 80%;
			margin: 0 auto;

			.project-name {
				font-size: 28rpx;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #666666;
				display: flex;
			}

			.project-time {
				font-size: 28rpx;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #666666;
				display: flex;
				margin: 10rpx 0;
			}

			.project-msg {
				height: 320rpx;
				background: #F7F9F9;
				border-radius: 10rpx 10rpx 10rpx 10rpx;
				opacity: 1;
				border: 1rpx solid #707070;
				font-size: 28rpx;
				font-family: PingFang SC-Light, PingFang SC;
				font-weight: 300;
				color: #333333;
				padding-left: 15rpx;
				margin: 15rpx 0;
			}
		}

		.vote-msg {
			display: flex;
			justify-content: space-around;

			.vote-zan {
				display: flex;
				align-items: center;
			}

			.vote-cai {
				display: flex;
				align-items: center;
			}
		}

		.zanimg {
			width: 45rpx;
		}

		.caiimg {
			width: 50rpx;
		}

	}
</style>
