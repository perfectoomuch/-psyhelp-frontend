<template>
	<div class="flex justify-center" v-if="loading">
		<span class="loading loading-spinner text-primary"></span>
	</div>

	<div role="alert" class="alert" v-if="!loading && specialists.length === 0">
		<Info class="min-size-4 text-primary" />
		<span>На данный момент нет специалистов. Вернитесь позже</span>
	</div>

	<div class="grid grid-cols-1 gap-4" v-if="!loading && specialists.length > 0">
		<SpecialistCard
			v-for="(item, index) in specialists"
			:key="index"
			:item="item"
			@video="onOpenVideo"
			@request="onOpenBooking"
		/>
	</div>

	<dialog id="video" class="modal h-full">
		<div class="modal-box p-0 relative">
			<video-player
				:src="videoSource"
				:controls="false"
				:loop="false"
				:volume="1"
				aspectRatio="9:16"
				@mounted="onPlayerReady"
			/>
			<button
				class="btn btn-circle btn-sm absolute top-2 right-2 border border-black/10"
				@click="onCloseVideo"
			>
				<X class="size-4 text-primary" />
			</button>
		</div>
	</dialog>

	<Booking ref="booking" />
</template>

<script>
import { X, Info } from 'lucide-vue-next'
import SpecialistCard from './SpecialistCard.vue'
import { Booking } from '../../../components/Booking'
export default {
	props: ['specialists', 'loading'],
	components: {
		SpecialistCard,
		X,
		Info,
		Booking,
	},
	data: () => ({
		videoSource: '',
		player: null,
	}),
	methods: {
		onOpenVideo(filename) {
			this.videoSource = this.$file(filename)
			const modal = document.getElementById('video')
			if (modal) modal.showModal()
			if (this.player) {
				this.player.play()
			}
		},
		onPlayerReady(instance) {
			this.player = instance.player
		},
		onCloseVideo() {
			if (this.player) {
				this.player.pause()
			}
			const modal = document.getElementById('video')
			if (modal) modal.close()
		},
		onOpenBooking(data) {
			this.$refs.booking.openModal(data)
		},
	},
}
</script>
