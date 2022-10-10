<template>
	<view click="votelog-container">
		<Title title=""></Title>
		<votelogo v-for="(p,i) in votelogarr" :key="i" :logmsg="p">
		</votelogo>
	</view>
</template>

<script>
	import votelogo from '../../../components/votelog.vue'
	export default {
		data() {
			return {
				votelogarr: []
			}
		},
		async created() {
			await this.getvotelog()
		},

		components: {
			votelogo
		},
		methods: {
			async getvotelog() {
				this.votelogarr = []
				await this.$api.user.getVoteLog().then(res => {
					console.log(res);
					if (res.code == 200) {
						res.data.map((p, i) => {
							this.votelogarr.push(p)
						})
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.votelog-container {
		background-color: #707070;

		.back {
			width: 750rpx;
			background: #FFFFFF;
			display: flex;
			align-items: center;
		}


	}
</style>
