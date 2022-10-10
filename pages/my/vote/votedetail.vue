<template>
	<view class="votedetail-container">
		<view class="back">
			<view class="back-icon" @click.stop="back">
				<uni-icons type="back" size="25"></uni-icons>
			</view>
			<view class="votelogbtn">
				<image src="../../../static/my/votelogbtn.png" mode="widthFix" class="votelogimg"
					@click.stop="tovotelog"></image>
			</view>
		</view>
		<view class="project-detail">
			<view class="project-detail-title">
				项目介绍
			</view>
			<view class="project-detail-content">
				{{projectmsg.ido_project_introduce}}
			</view>
			<view class="project-detail-msg">
				<view class="token-total">
					<view class="">
						Token总数:
					</view>
					<view class="">
						{{projectmsg.ido_project_token_num}}
					</view>
				</view>
				<view class="token-ys">
					<view class="">
						预售代币
					</view>
					<view class="">
						{{projectmsg.ido_project_sale}}
					</view>
				</view>
				<view class="project-type">
					<view class="">
						项目类型
					</view>
					<view class="">
						{{projectmsg.ido_project_type}}
					</view>
				</view>
				<view class="hl">
					<view class="">
						汇率
					</view>
					<view class="">
						{{projectmsg.ido_project_rate}}
					</view>
				</view>
			</view>
			<view class="check-green">

				<u-line-progress
					:percentage="((projectmsg.ido_project_support/projectmsg.ido_project_total_votes) * 100).toFixed(2)"
					show-percent="true" activeColor="#4897FE" height="30">
				</u-line-progress>
				<view class="" style="margin-left: 30rpx;">
					<checkbox-group @change="greencheck">
						<label>
							<checkbox value="cb" :disabled="projectmsg.is_vote == 1?true:false"
								:checked="greenstatus" />
						</label>
					</checkbox-group>
				</view>
			</view>
			<view class="check-disgreen">
				<u-line-progress
					:percentage="((projectmsg.ido_project_ido_project/projectmsg.ido_project_total_votes) * 100).toFixed(2)"
					activeColor="#4897FE" height="30">
				</u-line-progress>
				<view class="" style="margin-left: 30rpx;">
					<checkbox-group @change="disgreencheck">
						<label>
							<checkbox value="cb" :disabled="projectmsg.is_vote == 1?true:false"
								:checked="disgreenstatus" />
						</label>
					</checkbox-group>
				</view>
			</view>
			<view v-if="projectmsg.is_vote == 2" class="vote-btn" @click="submitAVote">
				立即投票
			</view>
			<view v-else class="vote-btn-active">
				已投票
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				greenstatus: false,
				disgreenstatus: false,
				projectid: '',
				projectmsg: {},
				votestatus: ''
			}
		},
		onLoad(option) {
			this.projectid = option.id;
			console.log(this.projectid);
		},
		async created() {
			await this.getProjectInfo()
		},
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
					uni.switchTab({
						url: '/pages/my/my'
					})
				}
			},
			greencheck(e) {
				this.greenstatus = true
				this.disgreenstatus = false
				this.votestatus = 1

			},
			disgreencheck(e) {
				this.greenstatus = false
				this.disgreenstatus = true
				this.votestatus = 2
			},
			tovotelog() {
				uni.navigateTo({
					url: '/pages/my/vote/votelog'
				})
			},
			async getProjectInfo() {
				await this.$api.user.getProjectInfo(this.projectid).then(res => {
					console.log(res);
					if (res.code == 200) {
						this.projectmsg = res.data

					}
				})
			},
			async submitAVote() {
				console.log(this.projectid, this.votestatus);
				await this.$api.user.submitAVote(this.projectid, this.votestatus).then(res => {
					console.log(res);
					if (res.code == 200) {
						uni.showToast({
							icon: 'success',
							title: '投票成功'
						})
						setTimeout(() => {
							this.getProjectInfo()
						}, 1000)
					} else {
						uni.showToast({
							icon: 'error',
							title: '投票失败'
						})
						setTimeout(() => {
							this.getProjectInfo()
						}, 1000)
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.votedetail-container {
		width: 750rpx;
		background: #FFFFFF;

		.back {
			margin: 0 10rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 30rpx;

			.votelogimg {
				width: 160rpx;
				margin-top: 10rpx;
			}
		}

		.project-detail {
			margin: 0 10rpx;

			.project-detail-title {
				height: 43rpx;
				font-size: 32rpx;
				margin-left: 20rpx;
				font-family: PingFang SC-Light, PingFang SC;
				font-weight: 300;
				color: #333333;
				margin-bottom: 30rpx;

			}

			.project-detail-content {
				font-size: 20rpx;
				margin: 0 20rpx;
				font-family: PingFang SC-Light, PingFang SC;
				font-weight: 300;
				color: #333333;
				//首行缩进
				text-indent: 2em;
				margin-bottom: 30rpx;
			}

			.project-detail-msg {
				font-size: 32rpx;
				font-family: PingFang SC-Light, PingFang SC;
				font-weight: 300;
				color: #333333;
				margin: 0 20rpx;


				.token-total {
					display: flex;
					justify-content: space-between;
				}

				.token-ys {
					display: flex;
					justify-content: space-between;
				}

				.project-type {
					display: flex;
					justify-content: space-between;
				}

				.hl {
					display: flex;
					justify-content: space-between;
				}
			}

			.project-detail-msg>view {
				margin: 30rpx 0;
				border-bottom: 1rpx solid #f7f7f7;
			}

			.check-green {
				margin: 30rpx;
				display: flex;
				align-items: center;
			}

			.check-disgreen {
				margin: 0 30rpx;
				display: flex;
				align-items: center;
			}

			.vote-btn {
				width: 200rpx;
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;
				border-radius: 10rpx;
				background-color: #418DFA;
				font-size: 28rpx;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				margin: 120rpx auto;
			}

			.vote-btn-active {
				width: 200rpx;
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;
				border-radius: 10rpx;
				background-color: #e1e1e1;
				font-size: 28rpx;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				margin: 120rpx auto;
			}
		}

	}
</style>
