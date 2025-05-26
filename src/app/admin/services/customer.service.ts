import { http } from '@/plugins/axios'
import { push } from 'notivue'

export class CustomerService {
	async getAll() {
		try {
			const response = await http.get('admin/customers')
			return response.data
		} catch (err) {
			console.log(err)
			push.error('Непредвиденная ошибка')
			return []
		}
	}

	async getById(id: string) {
		try {
			const response = await http.get(`admin/customers/${id}`)
			return response.data
		} catch (err) {
			console.log(err)
			push.error('Такой заявки не существует')
		}
	}

	async getBySearch(search: string) {
		try {
			const response = await http.post('admin/customers/search', {
				search,
			})
			return response.data
		} catch (err) {
			console.log(err)
			push.error('Ошибка при поиске')
		}
	}
}
