import { useQuestionsStore } from '../store/questions.store'
import { http } from '@/plugins/axios'

export class QuestionsService {
	private store = useQuestionsStore()

	async fetchQuestions() {
		try {
			const response = await http.get('bids/questions')
			this.store.setQuestions(response.data)
		} catch (err) {
			console.log(err)
		}
	}
}
