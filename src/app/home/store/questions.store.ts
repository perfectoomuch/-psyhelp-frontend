import { defineStore } from 'pinia'
import type {
	QuestionsStoreInterface,
	QuestionInterface,
} from '../types/question'

export const useQuestionsStore = defineStore('questions', {
	state: () => ({ questions: [], loading: true } as QuestionsStoreInterface),
	actions: {
		updateQuestions(data: QuestionInterface[]) {
			this.questions = data
			this.loading = false
		},
	},
})
