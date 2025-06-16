import { http } from '@/plugins/axios'
import { push } from 'notivue'
import { useMethodStore } from '../store/method.store'

export class BidService {
	private methodStore = useMethodStore()

	async getAll() {
		try {
			const response = await http.get('admin/bids')
			this.methodStore.setMethods(response.data.methods)
			return response.data.bids
		} catch (err) {
			console.log(err)
			push.error('Непредвиденная ошибка')
			return []
		}
	}

	async getById(id: string) {
		try {
			const response = await http.get(`admin/bids/${id}`)
			return response.data
		} catch (err) {
			console.log(err)
			push.error('Такой заявки не существует')
		}
	}

	async updateStatusById(id: string, status: string) {
		try {
			const response = await http.post('admin/bids/status', {
				id,
				status,
			})

			return response.data
		} catch (err) {
			console.log(err)
			push.error('Ошибка при обновлении статуса')
		}
	}

	async getBySearch(search: string) {
		try {
			const response = await http.post('admin/bids/search', {
				search,
			})
			return response.data
		} catch (err) {
			console.log(err)
			push.error('Ошибка при поиске')
		}
	}
}
