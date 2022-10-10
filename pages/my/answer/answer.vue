<template>
	<div class="answer">
		<Title title="答题"></Title>
		<div class="answer-content" v-if="showanser">
			<div class="content-wrapper">
				<p>答题时间：{{sign_in_time}}秒</p>
				<p>{{answermsg.sign_in_title}}</p>
				<div class="option">
					<div class="item" v-for="(p,i) in answermsg.sign_in_content" :key="i" @click.stop="chooseanswer(p)">
						{{p}}
					</div>

				</div>
			</div>
		</div>
		<div v-else style="display: flex;justify-content: center;align-items: center;height: 50vh;">
			<view class="" style="font-size: 60rpx;">
				今日已答题
			</view>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'answer',
		components: {},
		props: {},
		async created() {
			await this.$api.user.getSignInTopic().then(res => {
				console.log(res);
				if (res.code == 200) {
					this.showanser = true;
					this.answermsg = res.data
					this.sign_in_time = res.data.sign_in_time
					this.timeout = setInterval(() => {
						this.sign_in_time--
					}, 1000)
				} else {
					this.showanser = false;
				}
			})
		},

		data() {
			return {
				answermsg: {},
				timeout: '',
				sign_in_time: '',
				showanser: ''
			}
		},
		computed: {},
		methods: {
			chooseanswer(p) {
				console.log(p);
				this.$api.user.submitTheAnswer(this.answermsg.sign_in_id, p).then(res => {
					console.log(res);
					if (p != res.data.content) {
						uni.showToast({
							icon: 'error',
							title: '回答错误'
						})
						setTimeout(() => {
							uni.redirectTo({
								url: '/pages/my/signIn/signIn'
							})
						}, 1000)
					} else {
						uni.showToast({
							icon: 'success',
							title: '回答正确'
						})
						setTimeout(() => {
							uni.redirectTo({
								url: '/pages/my/signIn/signIn'
							})
						}, 1000)
					}

				})
			}
		},
		watch: {
			sign_in_time: function(newval, oldval) {
				if (newval == 0) {
					clearInterval(this.timeout)
					uni.showToast({
						icon: 'error',
						title: '时间到！'
					})
				}
			}
		},

		// 页面周期函数--监听页面加载
		onLoad() {},
		// 页面周期函数--监听页面初次渲染完成
		onReady() {},
		// 页面周期函数--监听页面显示(not-nvue)
		onShow() {},
		// 页面周期函数--监听页面隐藏
		onHide() {},
		// 页面周期函数--监听页面卸载
		onUnload() {},
		// 页面处理函数--监听用户下拉动作
		// onPullDownRefresh() { uni.stopPullDownRefresh(); },
		// 页面处理函数--监听用户上拉触底
		// onReachBottom() {},
		// 页面处理函数--监听页面滚动(not-nvue)
		// onPageScroll(event) {},
		// 页面处理函数--用户点击右上角分享
		// onShareAppMessage(options) {},
	}
</script>

<style scoped lang="scss">
	.answer-content {
		padding: 30rpx;

		.content-wrapper {
			padding: 20rpx;
			padding-bottom: 75rpx;
			background: rgba($color: #eee, $alpha: 0.48);
			border-radius: 10rpx 10rpx 10rpx 10rpx;

			p {
				margin-bottom: 36rpx;
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
			}

			.option {
				.item {
					padding: 23rpx 0 22rpx 30rpx;
					margin-bottom: 20rpx;
					height: 90rpx;
					background: #f67172;
					border-radius: 20rpx;
					color: #fff;
					box-sizing: border-box;
				}
			}
		}
	}
</style>
