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
	<Navigation :name="$route.name" />
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
	}),
	async created() {
		await this.questionsService.fetchQuestions()
	},
	computed: {
		questionsStore() {
			return useQuestionsStore()
		},
	},
}
</script>
