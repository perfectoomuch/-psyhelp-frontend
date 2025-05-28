<template>
	<Header
		title="Подобрать психолога"
		description="Ответьте на следующие вопросы и мы подберем Вам психолога"
	/>

	<template v-if="filterFormShow">
		<div v-if="tab === 'result'" class="flex flex-col gap-2 mb-4">
			<div
				class="h-[48px] card w-full bg-base-100 rounded-lg flex items-center flex-row px-4 font-semibold shadow-sm"
				@click="filterFormToggle = !filterFormToggle"
			>
				<ListFilter class="size-4 mr-2" />
				<span>Параметры фильтра</span>
				<ChevronDown
					class="size-4 ml-auto duration-300"
					:class="filterFormToggle && 'rotate-180'"
				/>
			</div>

			<div class="grid grid-cols-2 gap-2">
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
		</div>

		<div class="flex-col gap-2" :class="tabResultClass">
			<template v-for="(item, index) in questionsStore.questions" :key="index">
				<div
					:id="`card-${index}`"
					class="card w-full bg-base-100 card-sm shadow-sm rounded-xl"
				>
					<div class="card-body">
						<h2 class="card-title">{{ item.question }}</h2>
						<div class="grid grid-cols-1 gap-2">
							<div v-for="(variant, j) in item.variants" :key="j">
								<label
									:for="`checkbox-${index}-${j}`"
									class="flex items-center gap-2 py-3 px-2 border border-gray-200 rounded-lg cursor-pointer"
								>
									<template v-if="item.select === 'multiple'">
										<input
											type="checkbox"
											:id="`checkbox-${index}-${j}`"
											v-model="preFilterForm[index].answer"
											:value="variant"
											class="checkbox checkbox-xs checkbox-primary"
										/>
									</template>
									<template v-if="item.select === 'single'">
										<input
											type="radio"
											:id="`checkbox-${index}-${j}`"
											v-model="preFilterForm[index].answer"
											:value="variant"
											class="radio radio-xs radio-primary"
										/>
									</template>

									<p class="text-sm">{{ variant }}</p>
								</label>
							</div>
						</div>
					</div>
				</div>
			</template>
			<button
				class="btn btn-lg w-full text-sm uppercase tracking-wide btn-primary"
				@click="onFilter"
			>
				Подобрать психолога
			</button>
		</div>
		<template v-if="tab === 'result'">
			<SpecialistsLoop
				:specialists="specialistsStore.specialists"
				:loading="specialistsStore.loading"
			/>
		</template>
	</template>
</template>

<script>
import { defineComponent } from 'vue'
import { ListFilter, ChevronDown } from 'lucide-vue-next'

import { Header } from '../../../components/Header'
import { BidService } from '../../specialists/services/bid.service'

import { FilterSpecialistsService } from '../services/specialists.service'
import { useQuestionsStore } from '../store/questions.store'
import { useUserStore } from '../../../stores/user.store'
import { useFilterSpecialistsStore } from '../store/specialists.store'
import SpecialistsLoop from '../../specialists/components/SpecialistsLoop.vue'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'

export default defineComponent({
	name: 'HomePage',
	components: {
		Header,
		ListFilter,
		ChevronDown,
		SpecialistsLoop,
		Select,
		SelectContent,
		SelectGroup,
		SelectItem,
		SelectLabel,
		SelectTrigger,
		SelectValue,
	},
	data: () => ({
		preFilterForm: [],
		afterFilterForm: [],
		preFilterFormPayload: [],
		filterFormShow: false,
		specialistsService: new FilterSpecialistsService(),
		bidService: new BidService(),
		tab: 'form',
		filterFormToggle: false,
	}),
	async created() {
		await Promise.all(
			this.questionsStore.questions.map(el => {
				this.preFilterForm.push({
					local_id: el.id,
					question: el.question,
					answer: [],
					field: el.field,
				})
			})
		)
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
		this.filterFormShow = true

		this.preFilterForm = [
			{
				local_id: 1000,
				question: 'Что вы чувствуете?',
				answer: ['Тревога, стресс'],
				field: '',
			},
			{
				local_id: 1001,
				question: 'Какие у вас проблемы?',
				answer: ['Прокрастинация, перфекционизм'],
				field: '',
			},
			{
				local_id: 1002,
				question: 'Что с вами произошло?',
				answer: 'Семейные или партнерские конфликты',
				field: '',
			},
			{
				local_id: 1003,
				question: 'Предпочтения по полу специалиста',
				answer: 'Неважно',
				field: 'gender',
			},
			{
				local_id: 1004,
				question: 'Возраст психолога',
				answer: 'Неважно',
				field: 'age',
			},
			{
				local_id: 1005,
				question: 'Опыт работы',
				answer: 'Неважно',
				field: 'experience_years',
			},
			{
				local_id: 1007,
				question: 'Бюджет на сессию',
				answer: 'От 5000 до 10000 ₽',
				field: 'price',
			},
			{
				local_id: 1008,
				question: 'Опыт работы с этническими группами',
				answer: 'Неважно',
				field: 'experience_ethnic_group',
			},
		]
	},
	computed: {
		questionsStore() {
			return useQuestionsStore()
		},
		specialistsStore() {
			return useFilterSpecialistsStore()
		},
		userStore() {
			return useUserStore()
		},
		tabResultClass() {
			if (this.tab === 'result') {
				if (this.filterFormToggle) return 'flex'
				if (!this.filterFormToggle) return 'hidden'
			} else {
				return 'flex'
			}
		},
	},
	methods: {
		async onFilter() {
			const emptyFieldIndex = this.preFilterForm.findIndex(
				el => el.answer.length === 0
			)

			const emptyField = this.preFilterForm[emptyFieldIndex]

			if (emptyFieldIndex > -1) {
				if (emptyField.select === 'multiple') {
					this.$toast.error('Выберите хотя бы одну')
				} else {
					this.$toast.error('Выберите параметр')
				}

				document.querySelector(`#card-${emptyFieldIndex}`).scrollIntoView({
					behavior: 'smooth',
				})
			} else {
				const payload = this.preFilterForm.map(el => {
					if (Array.isArray(el.answer)) return el
					if (typeof el.answer === 'string') {
						return {
							...el,
							answer: [el.answer],
						}
					}
					return el
				})
				this.filterFormPayload = payload

				await this.specialistsService.fetchSpecialistsByFilter(payload)
				this.tab = 'result'
				window.scrollTo({ top: 0, behavior: 'auto' })

				this.afterFilterForm.map(el => {
					const parent = this.preFilterForm.find(
						subEl => subEl.local_id === el.local_id
					)
					if (parent) {
						const index = this.afterFilterForm.findIndex(
							subEl => subEl.local_id === el.local_id
						)
						this.afterFilterForm[index].answer = parent.answer
					}
				})
			}
		},
		async onBooking(data) {
			const payload = {
				...data,
				form: this.filterFormPayload,
				chat_id: this.userStore.user.chat_id,
			}

			const result = await this.bidService.createBid(payload)
			return result
		},
		async onChangeFilter() {
			const payloadPreFilter = this.preFilterForm.map(el => {
				if (Array.isArray(el.answer)) return el
				if (typeof el.answer === 'string') {
					return {
						...el,
						answer: [el.answer],
					}
				}
				return el
			})
			const preFilterDeleteDuplicates = payloadPreFilter.filter(
				el =>
					!this.afterFilterForm.some(subEl => subEl.local_id === el.local_id)
			)

			const mergeFilter = [
				...preFilterDeleteDuplicates,
				...this.afterFilterForm,
			]

			const payload = mergeFilter.map(el => {
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
			this.tab = 'result'
			window.scrollTo({ top: 0, behavior: 'auto' })
		},
	},
})
</script>
