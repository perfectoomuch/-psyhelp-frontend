<template>
	<Header
		title="Все психологи"
		description="Ознакомьтесь всеми психологами на нашей платформе"
	/>

	<SpecialistsLoop
		:specialists="specialistsStore.specialists"
		:loading="specialistsStore.loading"
	/>
</template>

<script>
import { Header } from '../../../components/Header'
import { X, Info } from 'lucide-vue-next'
import { Booking } from '../../../components/Booking'
import SpecialistsLoop from '../components/SpecialistsLoop.vue'
import { SpecialistsService } from '../services/specialists.service'
import { BidService } from '../services/bid.service'
import { useSpecialistsStore } from '../store/specialists.store'
import { useUserStore } from '../../../stores/user.store'
import { provide } from 'vue'

export default {
	components: {
		Header,
		SpecialistsLoop,
		X,
		Info,
		Booking,
	},
	data: () => ({
		specialistsService: new SpecialistsService(),
		bidService: new BidService(),
	}),
	async created() {
		if (this.specialistsStore.specialists.length === 0) {
			await this.specialistsService.fetchSpecialists()
		}
	},
	computed: {
		specialistsStore() {
			return useSpecialistsStore()
		},
		userStore() {
			return useUserStore()
		},
	},
	methods: {
		async onBooking(data) {
			const payload = {
				...data,
				chat_id: this.userStore.user.chat_id,
			}

			const result = await this.bidService.createBid(payload)
			return result
		},
	},
}
</script>
