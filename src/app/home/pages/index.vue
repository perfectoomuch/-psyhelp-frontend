<template v-if="filterFormShow">
	<Header
		:title="header.title"
		:description="header.description"
		:backButtonText="tab === 'result' ? 'Заполнить заново' : ''"
		@back="onBackToQuestions"
	/>

	<div class="flex-col gap-2" :class="tabResultClass">
		<swiper
			:slides-per-view="1"
			:space-between="10"
			:modules="modules"
			:navigation="{
				prevEl: '.prevEl',
			}"
			class="flex-1 w-full h-full"
			@slideChange="onSlideChange"
			:onSwiper="onSwiper"
			:allowTouchMove="false"
			:autoHeight="true"
		>
			<swiper-slide
				v-for="(item, index) in questionsStore.questions"
				:key="index"
			>
				<div :id="`card-${index}`" class="w-full">
					<div class="grid grid-cols-1 gap-2 pb-1">
						<template v-for="(variant, j) in item.variants" :key="j">
							<label
								:for="`checkbox-${index}-${j}`"
								class="flex items-center gap-2 py-3 px-2 border border-gray-200 rounded-lg cursor-pointer bg-base-100 shadow-sm"
							>
								<template v-if="item.select === 'multiple'">
									<input
										type="checkbox"
										:id="`checkbox-${index}-${j}`"
										v-model="preFilterForm[index].answer"
										:value="variant"
										class="checkbox checkbox-xs checkbox-primary"
										@change="onChangeAnswer(index)"
									/>
								</template>
								<template v-if="item.select === 'single'">
									<input
										type="radio"
										:id="`checkbox-${index}-${j}`"
										v-model="preFilterForm[index].answer"
										:value="variant"
										class="radio radio-xs radio-primary"
										@change="onChangeAnswer(index)"
									/>
								</template>

								<p class="text-sm">{{ variant }}</p>
							</label>
						</template>
						<label
							v-if="item.enter_variant"
							:for="`checkbox-${index}-enter`"
							class="flex items-center gap-2 py-3 px-2 border border-gray-200 rounded-lg cursor-pointer bg-base-100 shadow-sm"
						>
							<input
								type="checkbox"
								:id="`checkbox-${index}-enter`"
								@change="onEnterVariant(index)"
								:value="preFilterForm[index].enter_variant_state"
								class="checkbox checkbox-xs checkbox-primary"
							/>

							<p class="text-sm">Ввести свой вариант</p>
						</label>
						<input
							v-if="preFilterForm[index].enter_variant"
							:disabled="!preFilterForm[index].enter_variant_state"
							v-model="preFilterForm[index].custom_answer"
							type="text"
							placeholder="Ввести"
							class="input w-full bg-white rounded-lg focus:outline-none focus:ring-0 border border-gray-200 shadow-sm h-[46px]"
							:class="[preFilterForm[index].enter_variant_state ? '' : '']"
						/>
					</div>
				</div>
			</swiper-slide>
		</swiper>
		<div class="flex gap-2 justify-end mt-2">
			<button class="btn prevEl">Назад</button>
			<button
				v-if="activeIndex === questionsStore.questions.length - 1"
				class="btn btn-primary"
				@click="onFilter"
			>
				Подобрать психолога
			</button>
			<button v-else class="btn btn-primary nextEl" @click="onNextSwiper">
				Вперед
			</button>
		</div>
	</div>
	<template v-if="tab === 'result'">
		<SpecialistsLoop
			:specialists="specialistsStore.specialists"
			:loading="specialistsStore.loading"
		/>
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
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

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
		Swiper,
		SwiperSlide,
	},
	data: () => ({
		swiperInstance: null,
		modules: [Navigation],
		activeIndex: 0,
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
		this.getPreFilterForm()
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
		header() {
			if (this.tab === 'form') {
				const current = this.questionsStore.questions[this.activeIndex]
				return {
					title: current.question,
					description: current.description,
				}
			} else {
				return {
					title: 'Специалисты по вашим критериям',
					description:
						'На основе ваших ответов мы нашли психологов, которые наиболее соответствуют вашему запросу',
				}
			}
		},
	},
	methods: {
		onSwiper(swiper) {
			this.swiperInstance = swiper
		},
		onSlideChange(event) {
			this.activeIndex = event.activeIndex
		},
		async getPreFilterForm() {
			this.preFilterForm = []
			await Promise.all(
				this.questionsStore.questions.map(el => {
					this.preFilterForm.push({
						local_id: el.id,
						question: el.question,
						answer: [],
						field: el.field,
						enter_variant: el.enter_variant,
						enter_variant_state: false,
						custom_answer: '',
					})
				})
			)
		},
		async onFilter() {
			const payload = this.preFilterForm.map(el => {
				const answer = Array.isArray(el.answer)
					? [...el.answer, el.custom_answer]
					: [el.answer]

				return {
					...el,
					answer: answer.filter(el => el.length > 0),
				}
			})
			this.filterFormPayload = payload
			await this.specialistsService.fetchSpecialistsByFilter(payload)
			this.tab = 'result'
			window.scrollTo({ top: 0, behavior: 'auto' })
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
		onChangeAnswer(index) {
			// this.preFilterForm[index].enter_variant_state = false
		},
		onEnterVariant(index) {
			this.preFilterForm[index].enter_variant_state =
				!this.preFilterForm[index].enter_variant_state
			this.preFilterForm[index].custom_answer = ''
		},
		onNextSwiper() {
			const answer = this.preFilterForm[this.activeIndex].answer
			const customAnswer = this.preFilterForm[this.activeIndex].custom_answer
			const enableEnterVariant =
				this.preFilterForm[this.activeIndex].enter_variant
			if (enableEnterVariant) {
				const answerBool =
					customAnswer.length === 0 && answer.length === 0 ? false : true

				if (!answerBool) {
					this.$toast.error('Выберите хотя бы 1 вариант или введите свой')
					return
				}
			} else {
				if (answer.length === 0) {
					this.$toast.error('Выберите хотя бы 1 вариант')
					return
				}
			}
			this.swiperInstance.slideNext()
		},
		async onBackToQuestions() {
			await this.getPreFilterForm()
			this.swiperInstance.slideTo(0)
			this.tab = 'form'
		},
	},
})
</script>
