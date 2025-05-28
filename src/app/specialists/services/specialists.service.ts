import type { QuestionFormItem } from '@/app/home/types/question'
import { useSpecialistsStore } from '../store/specialists.store'
import { http } from '@/plugins/axios'

export class SpecialistsService {
	private store = useSpecialistsStore()

	async fetchSpecialists() {
		try {
			const response = await http.get('specialists')
			this.store.setSpecialists(response.data)
		} catch (err) {
			console.log(err)
		}
	}

	async fetchSpecialistsByFilter(data: QuestionFormItem[]) {
		try {
			const response = await http.post('specialists/filter-by-bid', data)
			this.store.setSpecialists(response.data)
		} catch (err) {
			console.log(err)
		}
	}
}
