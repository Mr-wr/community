<template>
	<view class="vote-container">
		<view class="vote-head">
			<view class="vote-head-block">
				<view class="" style="position: absolute;left: 20rpx;" @click.stop="publicBack">
					<uni-icons type="back" size="25" color="#fff"></uni-icons>
				</view>
				<view class="vote-head-title">
					<view class="vote-head-title-text">
						IOD项目{{banker.banker_name}}投票
					</view>
					<view class="vote-head-title-tips">
						距投票结束还有
					</view>
				</view>
			</view>
			<view class="vote-head-time">
				<u-count-down :time="getnowtime(type == 1?banker.banker_start_time:banker.banker_end_time)"
					format="DD:HH:mm:ss" autoStart millisecond @change="onChange">
					<view class="time">
						<view class="" style="display: flex;justify-content: space-around;">
							<daytime v-for="p in timetype" :key="p"
								:time="p == '天'?timeData.days:p == '时'?timeData.hours:p=='分'?timeData.minutes:p=='秒'?timeData.seconds:'' "
								:timetype="p">
							</daytime>
						</view>
					</view>
				</u-count-down>

			</view>
		</view>
		<view class="project-block">
			<scroll-view class="proview" scroll-x="true">
				<ProjectBlock v-for="p in beforerankarr" :key="p.ido_project_id" style="padding: 0 18rpx;"
					:projectmsg="p">
				</ProjectBlock>
			</scroll-view>
		</view>
		<view class="vote-rank">
			<view class="rank-title">
				本期投票：
			</view>
			<VoteRank v-for="(p,i) in rankarr" :id="i+1" :key="p.ido_project_id" :voterankmsg="p"></VoteRank>
		</view>
		<view class="vote-bottom" @click.stop="showmore">
			<image src="@/static/my/showmore.png" mode="widthFix" style="width: 200rpx;"></image>
		</view>
	</view>
</template>1

<script>
	import daytime from '../../../components/daytime.vue'
	import ProjectBlock from '../../../components/projectblock.vue'
	import VoteRank from '../../../components/voterank.vue'
	export default {
		data() {
			return {
				timetype: ['天', '时', '分', '秒'],
				timeData: {},
				banker: {},
				type: '',
				rankarr: [],
				beforerankarr: [],
				id: 1
			}
		},
		components: {
			daytime,
			ProjectBlock,
			VoteRank
		},
		computed: {
			getnowtime() {
				return function(time) {
					if (time) {
						let date = Date.parse(new Date());
						let typetime = (time * 1000) - date
						return typetime
					}
				}
			},
		},
		async created() {
			await this.gettime()
			await this.getprojectmsg(1)
			await this.getprojectmsg(2)
		},
		methods: {
			onChange(e) {
				this.timeData = e
			},
			showmore() {
				uni.navigateTo({
					url: '/pages/my/vote/votelist'
				})
			},
			async gettime() {
				await this.$api.user.getBanker().then(res => {
					console.log(res);
					if (res.data.type == 3) {
						uni.showToast({
							icon: 'error',
							title: '抱歉，暂时无投票数据'
						})
						setTimeout(() => {
							this.publicBack()
						}, 1000)
					} else {
						this.banker = res.data.banker
						this.type = res.data.type
					}
				})
			},

			async getprojectmsg(type) {
				await this.$api.user.getProject(type).then(res => {
					if (res.code == 200) {
						if (type == 1) {
							this.rankarr = res.data
							console.log(this.rankarr);
						} else {
							this.beforerankarr = res.data
							console.log(this.beforerankarr);
						}
					}
				})
			}

		}
	}
</script>

<style scoped lang="scss">
	.vote-container {
		height: 100vh;

		.vote-head {
			width: 750rpx;
			height: 446rpx;
			background: url('@/static/my/voteback.png');
			border-radius: 0rpx 0rpx 0rpx 0rpx;

			.vote-head-block {
				display: flex;
				justify-content: center;

				.vote-head-title {
					padding: 2% 0;
					display: flex;
					flex-direction: column;


					.vote-head-title-text {
						height: 60rpx;
						font-size: 32rpx;
						font-family: PingFang SC-Regular, PingFang SC;
						font-weight: 400;
						color: #FFFFFF;
					}

					.vote-head-title-tips {
						height: 32rpx;
						font-size: 24rpx;
						font-family: PingFang SC-Light, PingFang SC;
						font-weight: 300;
						color: #FFFFFF;
						line-height: 0rpx;
						text-align: center;
						padding: 30rpx 0;
					}
				}
			}
		}

		.vote-head-time {
			width: 650rpx;
			height: 150rpx;
			margin: 0 auto;
		}

		.project-block {
			width: 690rpx;
			margin: 0 auto;
			height: 275rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 3rpx 6rpx 1rpx rgba(145, 145, 145, 0.16);
			border-radius: 10rpx 10rpx 10rpx 10rpx;
			opacity: 1;
			position: relative;
			top: -70rpx;
			display: flex;
			justify-content: space-around;
			align-items: center;

			.proview {
				width: 100%;

				height: 300rpx;

				::v-deep .uni-scroll-view-content {
					display: flex;
					align-items: center;
				}
			}
		}

		.vote-rank {
			.rank-title {
				height: 32rpx;
				font-size: 24rpx;
				font-family: PingFang SC-Light, PingFang SC;
				font-weight: 300;
				color: #666666;
				margin-left: 30rpx;
			}
		}

		.vote-bottom {
			width: 100%;
			position: relative;
			bottom: -30rpx;
			display: flex;
			justify-content: center;
		}
	}
</style>
