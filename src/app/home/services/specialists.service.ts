import { useSpecialistsStore } from '../store/specialists.store'
import { http } from '@/plugins/axios'
import type { QuestionFormItem } from '../types/question'

export class SpecialistsService {
	private store = useSpecialistsStore()

	async fetchSpecialistsByFilter(data: QuestionFormItem) {
		try {
			const response = await http.post('specialists/filter-by-bid', data)
			this.store.updateSpecialists(response.data)
		} catch (err) {
			console.log(err)
		}
	}
}
