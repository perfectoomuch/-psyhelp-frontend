<template>
	<div class="card card-sm bg-base-100 shadow-sm">
		<figure class="relative">
			<img
				class="w-full h-auto aspect-3/4 object-cover"
				:src="$file(item.photo)"
			/>
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
			</h2>
			<p>
				{{ item.message }}
			</p>
			<p v-if="item.education">
				<span class="text-[16px] text-normal">🎓&nbsp;</span>
				<span class="border-b text-accent">Образование:</span>
				{{ item.education }}
			</p>
			<p v-if="route">
				<span class="text-[16px] text-normal">🔀&nbsp;</span>
				<span class="border-b text-accent">Направлении:</span>
				{{ route }}
			</p>
			<p v-if="item.sessions">
				<span class="text-[16px] text-normal">📞&nbsp;</span>
				<span class="border-b text-accent">Проведено консультаций:</span>
				{{ item.sessions }}
			</p>

			<transition
				enter-active-class="transition ease-out duration-300"
				enter-from-class="opacity-0 scale-95"
				enter-to-class="opacity-100 scale-100"
				leave-active-class="transition ease-in duration-200"
				leave-from-class="opacity-100 scale-100"
				leave-to-class="opacity-0 scale-95"
			>
				<div v-if="more" class="flex flex-col" style="gap: calc(0.25rem * 2)">
					<p v-if="item.profession">
						<span class="text-[16px] text-normal">💼&nbsp;</span>
						<span class="border-b text-accent">Профессия:</span>
						{{ profession }}
					</p>
					<p v-if="item.age">
						<span class="text-[16px] text-normal">📅&nbsp;</span>
						<span class="border-b text-accent">Возраст:</span>
						{{ item.age }}
					</p>
					<p v-if="item.experience_years">
						<span class="text-[16px] text-normal">🏆&nbsp;</span>
						<span class="border-b text-accent">Опыт работы (в годах):</span>
						{{ item.experience_years }}
					</p>
				</div>
			</transition>

			<div class="card-actions items-center justify-between relative z-10">
				<span class="text-lg font-semibold">
					{{ $currency(item.price) }}
					<em class="text-xs font-normal">/ за сессию</em>
				</span>
				<div class="flex gap-2">
					<button
						class="btn btn-sm btn-primary btn-soft btn-square"
						@click="more = !more"
					>
						<Icon name="List" :size="18" />
					</button>
					<button class="btn btn-sm btn-primary" @click="openBooking">
						Записаться
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { Play, Video } from 'lucide-vue-next'
import {
	route as routeObj,
	profession as professionObj,
} from '@/utils/specialist.ts'
export default {
	props: ['item'],
	components: {
		Play,
		Video,
	},
	data: () => ({
		more: false,
	}),
	computed: {
		route() {
			const result = routeObj(this.item.experience_route).getRouteByValue
			return result.map(el => el.name).join(', ')
		},
		profession() {
			const result = professionObj(this.item.profession).getProfessionByValue
			return result.map(el => el.name).join(', ')
		},
	},
	methods: {
		openBooking() {
			this.$emit('request', {
				specialist_id: this.item.id,
				name: this.item.first_name,
			})
		},

		openMore() {},
	},
}
</script>
