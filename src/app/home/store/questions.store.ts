import { defineStore } from 'pinia'
import type {
	QuestionsStoreInterface,
	QuestionInterface,
} from '../types/question'

export const useQuestionsStore = defineStore('questions', {
	state: () =>
		({
			questions: [],
			filters: [],
			formQuestions: [],
			loading: true,
		} as QuestionsStoreInterface),
	actions: {
		setFormData(questions: QuestionInterface[], filters: QuestionInterface[]) {
			this.setQuestions(questions)
			this.setFilters(filters)
			this.loading = false
		},
		setQuestions(data: QuestionInterface[]) {
			this.questions = data
		},
		setFilters(data: QuestionInterface[]) {
			this.filters = data
		},
	},
})
