<template>
	<div class="signIn">
		<view class="flex-col page">
			<view class="back" @click="publicBack"><img src="@/static/my/signIn/fh1.png" mode="" /></view>
			<view class="flex-col group">
				<view class="section_2"></view>
				<image class="image" src="@/static/my/signIn/header1.png" />
				<view class="flex-col items-start image-wrapper">
					<image class="image_2" src="@/static/my/signIn/header2.png" />
				</view>
				<view class="flex-row justify-between section">
					<view class="flex-col items-start group_3">
						<!-- <view class="section_4"></view> -->
						<view class="group_4">
							<text class="text_4">￥</text>
							<text class="text_3">{{ signinmsg.total_income }}</text>
							<!-- <view class="btn">提取</view> -->
						</view>
						<text class="font_1 text_2">累计收益</text>
					</view>
					<view class="flex-col items-end group_2">
						<view class="flex-col items-center section_3">
							<view class="flex-col section_6">
								<view class="section_5"></view>
							</view>
						</view>
						<text class="text">签到</text>
					</view>
				</view>
			</view>
			<view class="flex-col space-y-20 group_5">
				<view class="flex-col section_7">
					<view class="flex-row justify-between group_6">
						<text class="font_2 text_5">已连续签到{{ signinmsg.sign_in_num }}天</text>
						<text class="text_6">连签{{ signinmsg.sign_in_num }}/30</text>
					</view>
					<!-- 签到界面 -->
					<view class="flex-row space-x-9 group_7">
						<view :class="
                signinmsg.sign_in_num >= p ? 'flex-col items-center space-y-44 section_8' : 'flex-col items-center space-y-44 section_11'
              " v-for="p in 7" :key="p">
							<image class="image_3"
								:src="signinmsg.sign_in_num >= p ? '../../../static/my/signIn/issignIn.png' : '../../../static/my/signIn/nosignIn.png'" />
							<text class="font_3">{{ p }}天</text>
						</view>
					</view>
					<view v-if="signinmsg.is_sign_in == 2" @tap="geTo('/pages/my/answer/answer')"
						class="flex-col items-center button">
						<text class="font_1">签到领取</text>
					</view>
					<view v-else class="flex-col items-center button">
						<text class="font_1">已签到</text>
					</view>
				</view>
				<view class="flex-col items-start section_12">
					<text class="font_2">规则：</text>
					<view class="" v-html="signinmsg.sign_in_rules"> </view>
					<!-- <text class="font_5 text_7">每日签到随机获得金币</text>
					<text class="font_5 text_8">连续七天签到可获得金币礼包</text>
					<text class="font_5 text_9">签到后过程中中断后需要中心计算天数</text> -->
				</view>
				<view class="flex-col section_13">
					<text class="font_2 text_10">说明：</text>
					<view class="" v-html="signinmsg.sign_in_illustrate"> </view>
					<!-- <text class="font_6 text_11">1.关于答题</text>
					<view class="flex-col items-start space-y-7 group_8">
						<text class="font_7">每日答题可用学习区块链只是，并且能获取高额的算</text>
						<text class="font_7">力奖励。</text>
					</view>
					<text class="font_6 text_12">2.进入答题</text>
					<view class="flex-col items-start space-y-7 group_9">
						<text class="font_7">每日总共克领取1此奖励，次日0点重置，若已领取当</text>
						<text class="font_7 text_13">日所有奖励，则当日无法在进行作答，每日0点系统会</text>
						<text class="font_7">种置答题卡为1张。</text>
					</view>
					<text class="font_6 text_14">3.答题</text>
					<text class="font_7 text_15">题目分为判断题，单选题和多选题。用户需在每套题</text>
					<text class="font_7 text_16">倒计时结束前提交回答，若超市未提交，则视为本题</text> -->
				</view>
			</view>
		</view>
	</div>
</template>

<script>
	export default {
		name: 'signIn',
		components: {},
		props: {},
		data() {
			return {
				signinmsg: {},
			}
		},
		async created() {
			await this.$api.user.getSignInInfo().then(res => {
				console.log(res.data)
				if (res.code == 200) {
					this.signinmsg = res.data
				}
			})
		},

		computed: {},
		methods: {},
		watch: {},

		// 页面周期函数--监听页面加载
		onLoad() {},
		// 页面周期函数--监听页面初次渲染完成
		onReady() {},
		// 页面周期函数--监听页面显示(not-nvue)
		async onShow() {
			await this.$api.user.getSignInInfo().then(res => {
				console.log(res.data)
				if (res.code == 200) {
					this.signinmsg = res.data
				}
			})
		},
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

<style scoped>
	.page {
		background-color: #fafafa;
		height: 100%;
		width: 100%;
		overflow-y: auto;
		overflow-x: hidden;
	}

	.back {
		position: absolute;
		margin-top: 26rpx;
		margin-left: 30rpx;
		z-index: 1;
	}

	.back img {
		width: 36rpx;
		height: 36rpx;
	}

	.btn {
		margin-top: 24rpx;
		width: 144rpx;
		height: 47rpx;
		background: #fff;
		text-align: center;
		line-height: 47rpx;
		border-radius: 10rpx;
		font-size: 28rpx;
		font-family: PingFang SC-Regular, PingFang SC;
		font-weight: 400;
		color: #ff6409;
	}

	.group {
		margin-top: -320rpx;
		padding: 320rpx 0 572rpx;
		overflow-x: hidden;
		position: relative;
	}

	.section_2 {
		background-color: #fafafa;
		height: 176rpx;
	}

	.image {
		width: 750rpx;
		height: 400rpx;
		position: absolute;
		left: 0;
		right: 0;
		bottom: 259.5rpx;
	}

	.image-wrapper {
		padding: 106rpx 0 271rpx;
		background-image: linear-gradient(273.2deg, #fe8e19 2.4%, #ff5b05 97.4%);
		position: absolute;
		left: 0;
		right: 0;
		top: 319.5rpx;
	}

	.image_2 {
		margin-left: -58rpx;
		opacity: 0.34;
		width: 262rpx;
		height: 178rpx;
	}

	.section {
		padding: 426rpx 204rpx 350rpx;
		background-image: url('https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/617759e4e4f145001133fc3d/632804bc929db90011565618/16635782116770413454.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		position: absolute;
		left: -174.5rpx;
		right: -210.5rpx;
		top: 0;
	}

	.group_3 {
		margin-top: 60rpx;
		width: 194rpx;
		position: relative;
	}

	.section_4 {
		opacity: 0.15;
		background-image: linear-gradient(90deg, #ff7b12 0%, #ffa250 100%);
		border-radius: 10rpx;
		width: 100rpx;
		height: 183rpx;
	}

	.group_4 {
		line-height: 35rpx;
		position: absolute;
		right: 70rpx;
		top: 65.5rpx;
	}

	.text_4 {
		color: #ffffff;
		font-size: 28rpx;
		font-family: PingFang-SC-Regular;
		line-height: 20rpx;
	}

	.text_3 {
		color: #ffffff;
		font-size: 48rpx;
		font-family: PingFang-SC-Regular;
		line-height: 35rpx;
	}

	.font_1 {
		font-size: 28rpx;
		font-family: PingFang-SC-Medium;
		line-height: 26rpx;
		color: #ffffff;
	}

	.text_2 {
		width: 114rpx;
		position: absolute;
		top: 3.5rpx;
		left: 50%;
		transform: translateX(-50%);
	}

	.group_2 {
		margin-right: 34rpx;
		width: 383.5rpx;
		height: 292rpx;
		position: relative;
	}

	.section_3 {
		padding-top: 108rpx;
		background-image: url('https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/617759e4e4f145001133fc3d/632804bc929db90011565618/16635782117633624465.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		width: 330rpx;
	}

	.section_6 {
		opacity: 0.14;
		background-image: linear-gradient(90deg, #ff7b12 0%, #ffa250 100%);
		border-radius: 10rpx;
		width: 100rpx;
	}

	.section_5 {
		margin-right: 2rpx;
		background-image: linear-gradient(90deg, #ff7b12 0%, #ffa250 100%);
		border-radius: 10rpx;
		height: 183rpx;
	}

	.text {
		color: #ffffff;
		font-size: 36rpx;
		font-family: PingFang-SC-Regular;
		line-height: 32.5rpx;
		position: absolute;
		left: 0;
		top: 8.5rpx;
	}

	.group_5 {
		margin-top: -380rpx;
		padding: 0 30rpx;
		position: relative;
	}

	.space-y-20>view:not(:first-child),
	.space-y-20>text:not(:first-child),
	.space-y-20>image:not(:first-child) {
		margin-top: 20rpx;
	}

	.section_7 {
		padding: 31rpx 24rpx 36rpx;
		background-color: #ffffff;
		border-radius: 10rpx;
		box-shadow: 0px 3rpx 6rpx #91919129;
	}

	.group_6 {
		padding: 0 3rpx;
	}

	.font_2 {
		font-size: 32rpx;
		font-family: PingFang-SC-Regular;
		line-height: 29.5rpx;
		color: #333333;
	}

	.text_5 {
		margin-bottom: 2rpx;
	}

	.text_6 {
		margin-top: 10rpx;
		color: #999999;
		font-size: 24rpx;
		font-family: PingFang-SC-Regular;
		line-height: 22.5rpx;
	}

	.group_7 {
		margin-top: 30rpx;
	}

	.space-x-9>view:not(:first-child),
	.space-x-9>text:not(:first-child),
	.space-x-9>image:not(:first-child) {
		margin-left: 9rpx;
	}

	.section_8 {
		flex: 1 1 84rpx;
		padding: 16rpx 0 28rpx;
		background-image: linear-gradient(180deg, #f7f7f7 0%, #f6f6f6 100%);
		border-radius: 10rpx;
		height: 172rpx;
	}

	.image_3 {
		width: 69rpx;
		height: 69rpx;
	}

	.font_3 {
		font-size: 19rpx;
		font-family: PingFang-SC-Regular;
		line-height: 16rpx;
		color: #999999;
	}

	.space-y-44>view:not(:first-child),
	.space-y-44>text:not(:first-child),
	.space-y-44>image:not(:first-child) {
		margin-top: 44rpx;
	}

	.section_10 {
		padding: 16rpx 0 28rpx;
		flex: 1 1 84rpx;
		border-radius: 10rpx;
		background-image: url('https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/617759e4e4f145001133fc3d/632804bc929db90011565618/16635904144110092713.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		height: 172rpx;
	}

	.image_4 {
		width: 70rpx;
		height: 70rpx;
	}

	.font_4 {
		font-size: 19rpx;
		font-family: PingFang-SC-Regular;
		line-height: 16rpx;
		color: #fe8e1b;
	}

	.section_11 {
		flex: 1 1 84rpx;
		padding: 16rpx 0 28rpx;
		background-image: linear-gradient(180deg, #fdf8d6 0%, #fdf9da 100%);
		border-radius: 10rpx;
		height: 172rpx;
	}

	.space-y-42>view:not(:first-child),
	.space-y-42>text:not(:first-child),
	.space-y-42>image:not(:first-child) {
		margin-top: 42rpx;
	}

	.button {
		margin-top: 36rpx;
		padding: 26rpx 0;
		align-self: center;
		border-radius: 20rpx;
		background-image: url('@/static/my/signIn/btnbgc.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		width: 520rpx;
	}

	.section_12 {
		padding: 32rpx 25rpx;
		background-color: #ffffff;
		box-shadow: 0px 3rpx 6rpx #91919129;
	}

	.font_5 {
		font-size: 28rpx;
		font-family: PingFang-SC-Light;
		line-height: 26rpx;
		font-weight: 300;
		color: #333333;
	}

	.text_7 {
		margin-top: 34rpx;
	}

	.text_8 {
		margin-top: 26rpx;
	}

	.text_9 {
		margin-top: 26rpx;
	}

	.section_13 {
		padding-left: 24rpx;
		padding-top: 31rpx;
		background-color: #ffffff;
		box-shadow: 0px 3rpx 6rpx #91919129;
	}

	.text_10 {
		align-self: flex-start;
	}

	.font_6 {
		font-size: 28rpx;
		font-family: PingFang-SC-Medium;
		line-height: 26rpx;
		color: #333333;
	}

	.text_11 {
		margin-top: 34rpx;
		align-self: flex-start;
	}

	.group_8 {
		margin-top: 23rpx;
	}

	.font_7 {
		font-size: 28rpx;
		font-family: PingFang-SC-Light;
		line-height: 34rpx;
		font-weight: 300;
		color: #333333;
	}

	.text_12 {
		margin-top: 32rpx;
		align-self: flex-start;
	}

	.group_9 {
		margin-top: 23rpx;
	}

	.space-y-7>view:not(:first-child),
	.space-y-7>text:not(:first-child),
	.space-y-7>image:not(:first-child) {
		margin-top: 7rpx;
	}

	.text_13 {
		margin-left: 4rpx;
	}

	.text_14 {
		margin-top: 31rpx;
		align-self: flex-start;
	}

	.text_15 {
		margin-top: 23rpx;
	}

	.text_16 {
		margin-top: 7rpx;
		line-height: 6rpx;
	}
</style>
