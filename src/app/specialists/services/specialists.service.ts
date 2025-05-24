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
}
