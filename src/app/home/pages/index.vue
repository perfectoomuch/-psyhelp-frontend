<template>
	<Header
		title="Подобрать психолога"
		description="Ответьте на следующие вопросы и мы подберем Вам психолога"
	/>

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
	</template>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ListFilter, ChevronDown } from 'lucide-vue-next'

import { Header } from '@/components/Header'
import { QuestionsService } from '../services/questions.service'
import { SpecialistsService } from '../services/specialists.service'
import { useQuestionsStore } from '../store/questions.store'
import { QuestionFormItem, QuestionInterface } from '../types/question'
import { animate } from 'animejs'
import { useSpecialistsStore } from '../store/specialists.store'

export default defineComponent({
	name: 'HomePage',
	components: {
		Header,
		ListFilter,
		ChevronDown,
	},
	data: () => ({
		filterForm: [] as QuestionFormItem[],
		filterFormShow: false as boolean,
		questionsService: new QuestionsService(),
		specialistsService: new SpecialistsService(),
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
	},
	computed: {
		questionsStore() {
			return useQuestionsStore()
		},
		specialistsStore() {
			return useSpecialistsStore()
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
				await this.specialistsService.fetchSpecialistsByFilter(payload)
				this.tab = 'result'
			}
		},
	},
})
</script>
