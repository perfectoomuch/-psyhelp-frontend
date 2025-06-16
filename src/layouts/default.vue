<template>
	<div id="routerClient" class="p-3 px-4 pb-[74px]">
		<div
			class="w-screen h-screen flex items-center justify-center"
			v-if="questionsStore.loading"
		>
			<div class="flex justify-center">
				<span class="loading loading-spinner text-primary"></span>
			</div>
		</div>

		<template v-else>
			<keep-alive>
				<RouterView></RouterView>
			</keep-alive>
		</template>
	</div>
	<Navigation v-if="!isKeyboardOpen" :name="$route.name" />
</template>

<script>
import { Navigation } from '../components/Navigation'
import { QuestionsService } from '../app/home/services/questions.service'
import { useQuestionsStore } from '../app/home/store/questions.store'

export default {
	components: {
		Navigation,
	},
	data: () => ({
		questionsService: new QuestionsService(),
		isKeyboardOpen: false,
		initialHeight: 0,
	}),
	async created() {
		await this.questionsService.fetchQuestions()
	},
	computed: {
		questionsStore() {
			return useQuestionsStore()
		},
	},
	methods: {
		detectByViewport() {
			const currentHeight = window.visualViewport
				? window.visualViewport.height
				: window.innerHeight

			this.isKeyboardOpen = currentHeight < this.initialHeight - 100
		},
		onFocus() {
			this.isKeyboardOpen = true
		},
		onBlur() {
			// маленькая задержка — иногда нужно в мобилках
			setTimeout(this.detectByViewport, 100)
		},
		addListeners() {
			this.initialHeight = window.visualViewport
				? window.visualViewport.height
				: window.innerHeight

			if (window.visualViewport) {
				window.visualViewport.addEventListener('resize', this.detectByViewport)
			} else {
				window.addEventListener('resize', this.detectByViewport)
			}

			document
				.querySelectorAll('input, textarea, [contenteditable=true]')
				.forEach(el => {
					el.addEventListener('focus', this.onFocus)
					el.addEventListener('blur', this.onBlur)
				})
		},
		removeListeners() {
			if (window.visualViewport) {
				window.visualViewport.removeEventListener(
					'resize',
					this.detectByViewport
				)
			} else {
				window.removeEventListener('resize', this.detectByViewport)
			}

			document
				.querySelectorAll('input, textarea, [contenteditable=true]')
				.forEach(el => {
					el.removeEventListener('focus', this.onFocus)
					el.removeEventListener('blur', this.onBlur)
				})
		},
	},
	mounted() {
		this.addListeners()
	},
	beforeUnmount() {
		this.removeListeners()
	},
}
</script>
