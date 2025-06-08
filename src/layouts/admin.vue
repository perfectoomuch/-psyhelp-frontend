<template>
	<div id="routerAdmin" v-if="methodStore.methods.length > 0">
		<RouterView></RouterView>
	</div>
</template>

<script>
import { BidService } from '@/app/admin/services/bid.service'
import { useMethodStore } from '@/app/admin/store/method.store'

export default {
	components: {},
	data: () => ({
		bidService: new BidService(),
	}),
	async created() {
		await this.bidService.getAll()
	},
	computed: {
		methodStore() {
			return useMethodStore()
		},
	},
}
</script>
