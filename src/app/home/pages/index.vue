<template>
	<Header
		title="Подобрать психолога"
		description="Ответьте на следующие вопросы и мы подберем Вам психолога"
	/>

	<div class="flex justify-center" v-if="questionsStore.loading">
		<span class="loading loading-spinner text-primary"></span>
	</div>

	<template v-if="filterFormShow">
		<div
			v-if="tab === 'result'"
			class="h-[48px] card w-full bg-base-100 rounded-lg flex items-center flex-row px-4 mb-4 font-semibold shadow-sm"
			@click="filterFormToggle = !filterFormToggle"
		>
			<ListFilter class="size-4 mr-2" />
			<span>Параметры фильтра</span>
			<ChevronDown
				class="size-4 ml-auto duration-300"
				:class="filterFormToggle && 'rotate-180'"
			/>
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
											v-model="filterForm[index].answer"
											:value="variant"
											class="checkbox checkbox-xs checkbox-primary"
										/>
									</template>
									<template v-if="item.select === 'single'">
										<input
											type="radio"
											:id="`checkbox-${index}-${j}`"
											v-model="filterForm[index].answer"
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

<script lang="ts">
import { defineComponent } from 'vue'
import { ListFilter, ChevronDown } from 'lucide-vue-next'

import { Header } from '../../../components/Header'
import { QuestionsService } from '../services/questions.service'
import { BidService } from '../../specialists/services/bid.service'

import { FilterSpecialistsService } from '../services/specialists.service'
import { useQuestionsStore } from '../store/questions.store'
import { useUserStore } from '../../../stores/user.store'
import { QuestionFormItem, QuestionInterface } from '../types/question'
import { animate } from 'animejs'
import { useFilterSpecialistsStore } from '../store/specialists.store'
import SpecialistsLoop from '../../specialists/components/SpecialistsLoop.vue'

export default defineComponent({
	name: 'HomePage',
	components: {
		Header,
		ListFilter,
		ChevronDown,
		SpecialistsLoop,
	},
	data: () => ({
		filterForm: [] as QuestionFormItem[],
		filterFormPayload: [] as QuestionFormItem[],
		filterFormShow: false as boolean,
		questionsService: new QuestionsService(),
		specialistsService: new FilterSpecialistsService(),
		bidService: new BidService(),
		tab: 'form',
		filterFormToggle: false,
	}),
	async created() {
		await this.questionsService.fetchQuestions()
		await Promise.all(
			this.questionsStore.questions.map((el: QuestionInterface) => {
				this.filterForm.push({
					local_id: el.id,
					question: el.question,
					answer: [],
					field: el.field,
				})
			})
		)
		this.filterFormShow = true

		this.filterForm = [
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
				local_id: 1006,
				question: 'Когда нужна консультация?',
				answer: 'Неважно',
				field: '',
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
			{
				local_id: 1009,
				question: 'Религиозная направленность',
				answer: 'Неважно',
				field: 'religion',
			},
			{
				local_id: 1010,
				question: 'Для кого',
				answer: 'Для себя',
				field: 'experience_route',
			},
			{
				local_id: 1011,
				question: 'Методы терапии',
				answer: ['Арт-терапия'],
				field: 'method',
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
			const emptyFieldIndex = this.filterForm.findIndex(
				(el: QuestionFormItem) => el.answer.length === 0
			)

			const emptyField = this.filterForm[emptyFieldIndex]

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
				const payload = this.filterForm.map((el: QuestionFormItem) => {
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
			}
		},
		async onBooking(data: any) {
			const payload = {
				...data,
				form: this.filterFormPayload,
				chat_id: this.userStore.user.chat_id,
			}

			const result = await this.bidService.createBid(payload)
			return result
		},
	},
})
</script>
