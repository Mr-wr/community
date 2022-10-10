<script>
	export default {
		onLaunch: function() {
			console.warn('当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！')
			// console.log('App Launch')
			this.$web3.init()
			this.$web3
				.connect_purse()
				.then(res => {
					if (res) {
						uni.setStorageSync('walletaddress', res)
						console.log('walletaddress', res)
					} else {
						uni.showToast({
							title: '连接钱包失败',
							icon: 'error',
							duration: 2000,
						})
						// uni.removeStorageSync('token')
					}
				})
				.catch(res => {
					uni.showToast({
						title: '连接钱包失败',
						icon: 'error',
						duration: 2000,
					})
					console.log('sadfsdkafsadklfsadkljfsadk', res)
					// uni.removeStorageSync('token')
				})
		},
		onShow: function() {
			console.log('App Show')
			if (window.ethereum) {
				ethereum.on('accountsChanged', accounts => {
					//一旦切换账号这里就会执行
					console.log(accounts)
					uni.clearStorageSync()
					uni.setStorageSync('walletaddress', accounts[0])
					uni.reLaunch({
						url: '/pages/community/community',
					})
					// window.location.reload();
				})
			}
		},
		onHide: function() {
			console.log('App Hide')
		},
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import '@/uni_modules/uview-ui/index.scss';
	@import '@/uni_modules/uni-scss/index.scss';
	/* #ifndef APP-NVUE */
	@import '@/static/customicons.css';
	// 设置整个项目的背景色
	@import './common/uni.css';
	@import './common/iconfont.css';
	@import './common/common.css';

	.page {
		background-color: #fff;
		max-width: 1440rpx;
		overflow-x: hidden;
	}

	/* #endif */
	.example-info {
		font-size: 14px;
		color: #333;
		padding: 10px;
	}
</style>
