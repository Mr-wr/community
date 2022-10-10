<template>
	<view class="list-container">
		<Title ref="title" title="投票"></Title>
		<VoteRank v-if="rankarr.length>0" v-for="(p,i) in rankarr" :id="i+1" :key="p.ido_project_id" :voterankmsg="p">
		</VoteRank>
		<view class="" style="display: flex;justify-content: center;align-items: center;" v-else>
			<view class="">
				没有投票项目
			</view>
		</view>
	</view>
</template>

<script>
	import VoteRank from '../../../components/voterank.vue'
	export default {
		data() {
			return {
				rankarr: []
			}
		},
		components: {
			VoteRank
		},
		async created() {
			await this.getprojectmsg(3)
		},
		methods: {
			async getprojectmsg(type) {
				await this.$api.user.getProject(type).then(res => {
					if (res.code == 200) {
						this.rankarr = res.data
					}
				})
			}
		}
	}
</script>

<style>

</style>
