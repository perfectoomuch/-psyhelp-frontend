<template>
	<div class="card card-sm bg-base-100 shadow-sm">
		<figure class="relative">
			<img class="w-full h-[200px] object-cover" :src="$file('avatar.jpg')" />
			<button
				v-if="item.video"
				class="btn btn-circle btn-sm absolute top-2 right-2 border border-black/10"
				@click="$emit('video', item.video)"
			>
				<Video class="size-4 text-primary" fill="#0082ce" />
			</button>
		</figure>
		<div class="card-body">
			<h2 class="card-title">
				{{ item.first_name }}
				{{ item.last_name }}
			</h2>
			<p>
				{{ item.message }}
			</p>
			<div class="w-full flex flex-wrap gap-1">
				<div class="badge badge-sm">{{ item.education }}</div>
				<div class="badge badge-sm">{{ getProfession }}</div>
				<div class="badge badge-accent badge-sm">
					Направлении: {{ getRouteText }}
				</div>
				<div class="badge badge-accent badge-sm">
					Сессии было: {{ item.sessions }}
				</div>
			</div>

			<div class="card-actions items-center justify-between">
				<span class="text-lg font-semibold">
					{{ $currency(item.price) }}
					<em class="text-xs font-normal">/ за сессию</em>
				</span>
				<button class="btn btn-sm btn-primary" @click="openBooking">
					Записаться
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import { Play, Video } from 'lucide-vue-next'
export default {
	props: ['item'],
	components: {
		Play,
		Video,
	},
	computed: {
		getProfession() {
			switch (this.item.profession) {
				case 'psychologist':
					return 'Психолог'
				case 'psychotherapist':
					return 'Психотерапевт'
				case 'coach':
					return 'Коуч'
				default:
					break
			}
		},
		getRouteText() {
			return this.item.experience_route.map(el => this.getRoute(el)).join(', ')
		},
	},
	methods: {
		getRoute(val) {
			switch (val) {
				case 'adult':
					return 'взрослые'
				case 'child':
					return 'дети'
				case 'couple':
					return 'пары'
				case 'supervision':
					return 'супервизия'
				default:
					break
			}
		},
		openBooking() {
			this.$emit('request', {
				specialist_id: this.item.id,
				name: `${this.item.first_name} ${this.item.last_name}`,
			})
		},
	},
}
</script>
