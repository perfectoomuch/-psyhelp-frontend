<template>
	<Header
		title="Все специалисты"
		description="Полный каталог всех психологов"
	/>

	<div class="grid grid-cols-2 gap-2 mb-4" v-if="filterFormShow">
		<Select
			v-for="(item, index) in questionsStore.filters"
			:key="index"
			v-model="afterFilterForm[index].answer"
			@update:modelValue="onChangeFilter"
		>
			<SelectTrigger class="bg-white border-none shadow-md w-full">
				<SelectValue :placeholder="item.question" />
			</SelectTrigger>
			<SelectContent class="bg-white border-gray-200 max-h-[400px]">
				<SelectLabel>{{ item.question }}</SelectLabel>
				<SelectItem
					v-for="(variant, j) in item.variants"
					:key="j"
					:value="variant"
				>
					{{ variant }}
				</SelectItem>
			</SelectContent>
		</Select>
	</div>

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

import { useQuestionsStore } from '@/app/home/store/questions.store'
import { QuestionsService } from '../../home/services/questions.service'

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'

export default {
	components: {
		Header,
		SpecialistsLoop,
		X,
		Info,
		Booking,
		Select,
		SelectContent,
		SelectGroup,
		SelectItem,
		SelectLabel,
		SelectTrigger,
		SelectValue,
	},
	data: () => ({
		specialistsService: new SpecialistsService(),
		bidService: new BidService(),
		questionsService: new QuestionsService(),
		afterFilterForm: [],
		filterFormShow: false,
	}),
	async created() {
		await this.questionsService.fetchQuestions()
		await Promise.all(
			this.questionsStore.filters.map(el => {
				this.afterFilterForm.push({
					local_id: el.id,
					question: el.question,
					answer: '',
					field: el.field,
				})
			})
		)

		if (this.specialistsStore.specialists.length === 0) {
			await this.specialistsService.fetchSpecialists()
		}

		this.filterFormShow = true
	},
	computed: {
		specialistsStore() {
			return useSpecialistsStore()
		},
		userStore() {
			return useUserStore()
		},
		questionsStore() {
			return useQuestionsStore()
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
		async onChangeFilter() {
			const payload = this.afterFilterForm.map(el => {
				if (Array.isArray(el.answer)) return el
				if (typeof el.answer === 'string') {
					return {
						...el,
						answer: el.answer.length > 0 ? [el.answer] : [''],
					}
				}
				return el
			})

			await this.specialistsService.fetchSpecialistsByFilter(payload)
			window.scrollTo({ top: 0, behavior: 'auto' })
		},
	},
}
</script>
