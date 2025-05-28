import { useQuestionsStore } from '../store/questions.store'
import { http } from '@/plugins/axios'

export class QuestionsService {
	private store = useQuestionsStore()

	async fetchQuestions() {
		try {
			const questions = await http.get('bids/questions')
			const filters = await http.get('bids/filters')
			this.store.setFormData(questions.data, filters.data)
		} catch (err) {
			console.log(err)
		}
	}
}
