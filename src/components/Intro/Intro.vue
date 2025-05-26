<template>
	<div
		id="intro"
		class="fixed top-0 left-0 w-full h-full z-[999] bg-white flex flex-col p-4"
		v-if="showState"
	>
		<swiper
			:slides-per-view="1"
			:space-between="0"
			:modules="modules"
			:navigation="{
				nextEl: '.nextEl',
				prevEl: '.prevEl',
			}"
			class="flex-1 w-full h-full"
			@slideChange="onSlideChange"
			:onSwiper="onSwiper"
		>
			<swiper-slide class="" v-for="(item, index) in slides" :key="index">
				<div
					class="flex flex-col items-center text-center h-full px-5 relative"
				>
					<div class="h-1/2 flex items-center justify-center">
						<img :src="`/res/${item.image}`" alt="" class="max-w-[180px]" />
					</div>

					<div class="flex flex-col gap-4 h-1/2">
						<h1 class="font-semibold text-2xl">{{ item.title }}</h1>
						<p class="opacity-65">{{ item.description }}</p>
					</div>
				</div>
			</swiper-slide>
			<swiper-slide class="overflow-y-scroll">
				<div class="flex flex-col items-center text-center h-full relative">
					<div class="h-1/2 flex gap-4 flex-col items-center justify-center">
						<img src="/res/telegram.png" alt="" class="max-w-[80px]" />
						<h1 class="font-semibold text-2xl">Давайте начнем</h1>
					</div>

					<form
						@submit.prevent="onSubmit"
						class="flex flex-col h-full px-5 text-left w-full"
					>
						<fieldset class="fieldset">
							<legend class="fieldset-legend text-sm">Ваше имя</legend>
							<input
								type="text"
								class="input w-full text-base"
								placeholder="Введите имя"
								required
								v-model="form.first_name"
							/>
							<!-- <p class="label">Обязательно</p> -->
						</fieldset>
						<fieldset class="fieldset">
							<legend class="fieldset-legend text-sm">Ваше фамилия</legend>
							<input
								type="text"
								class="input w-full text-base"
								placeholder="Введите фамилия"
								required
								v-model="form.last_name"
							/>
							<!-- <p class="label">Обязательно</p> -->
						</fieldset>
						<fieldset class="fieldset">
							<legend class="fieldset-legend text-sm">Email</legend>
							<input
								type="email"
								class="input w-full text-base"
								placeholder="Введите почту"
								required
								v-model="form.email"
							/>
							<!-- <p class="label">Обязательно</p> -->
						</fieldset>
						<button
							class="btn w-full btn-primary mt-4"
							type="submit"
							:disabled="formLoading"
						>
							<span
								class="loading loading-sm loading-spinner"
								v-show="formLoading"
							></span>
							<template v-if="!formLoading"> Начать </template>
						</button>
					</form>
				</div>
			</swiper-slide>
		</swiper>

		<div class="flex gap-2">
			<button
				class="btn btn-ghost btn-primary"
				v-show="activeIndex !== slides.length"
				@click="onSkip"
			>
				Пропустить
			</button>

			<button
				:class="activeIndex !== slides.length && 'btn-square'"
				class="btn ml-auto prevEl"
			>
				<ChevronLeft class="size-4" />
				<template v-if="activeIndex === slides.length"> Назад </template>
			</button>
			<button
				v-show="activeIndex !== slides.length"
				class="btn btn-primary nextEl"
			>
				Дальше
				<ChevronRight class="size-4" />
			</button>
		</div>
	</div>
</template>

<script>
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { useUserStore } from '../../stores/user.store'

export default {
	components: {
		Swiper,
		SwiperSlide,
		ChevronLeft,
		ChevronRight,
	},
	data: () => ({
		swiperInstance: null,
		modules: [Navigation],
		activeIndex: 0,
		showState: true,
		slides: [
			{
				title: 'Найдите своего психолога',
				description:
					'Выбирайте специалиста по опыту, методике, стоимости или отзывам — мы поможем подобрать лучшего именно для вас.',
				image: 'messenger.png',
			},
			{
				title: 'Удобная онлайн-запись',
				description:
					'Записывайтесь на сессии в пару кликов — в удобное время, без звонков и ожиданий.',
				image: 'calendar.png',
			},
			{
				title: 'Подбор специалиста',
				description:
					'Не знаете, с кем начать? Пройдите короткий тест, и мы подберём подходящего психолога под ваш запрос.',
				image: 'tips.png',
			},
		],
		form: {
			email: '',
			first_name: '',
			last_name: '',
		},
		formLoading: false,
		userStore: useUserStore(),
	}),
	// computed: {
	// 	userStore() {
	// 		return useUserStore()
	// 	},
	// },
	methods: {
		onSwiper(swiper) {
			this.swiperInstance = swiper
		},
		onSlideChange(event) {
			this.activeIndex = event.activeIndex
		},
		closeIntro() {
			this.showState = false
		},
		onSkip() {
			this.swiperInstance.slideTo(3)
		},
		async onSubmit() {
			this.formLoading = true
			const result = await this.userStore.updateUser(this.form)
			if (result) {
				window.open('/', '_self')
			}
		},
	},
}
</script>
