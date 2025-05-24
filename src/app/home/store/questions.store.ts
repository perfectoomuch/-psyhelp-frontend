import { defineStore } from 'pinia'
import type {
	QuestionsStoreInterface,
	QuestionInterface,
} from '../types/question'

export const useQuestionsStore = defineStore('questions', {
	state: () =>
		({
			questions: [],
			formQuestions: [],
			loading: true,
		} as QuestionsStoreInterface),
	actions: {
		setQuestions(data: QuestionInterface[]) {
			this.questions = data
			this.loading = false
		},
	},
})
