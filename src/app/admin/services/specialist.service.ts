import { http } from '@/plugins/axios'
import { push } from 'notivue'
import type { SpecialistBodyType } from '../types/specialist'

export class SpecialistService {
	async getAll() {
		try {
			const response = await http.get('admin/specialists')
			return response.data
		} catch (err) {
			console.log(err)
			push.error('Непредвиденная ошибка')
			return []
		}
	}

	async getById(id: string) {
		try {
			const response = await http.get(`admin/specialists/${id}`)
			return response.data
		} catch (err) {
			console.log(err)
			push.error('Такого специалиста не существует')
		}
	}

	async getBySearch(search: string) {
		try {
			const response = await http.post('admin/specialists/search', {
				search,
			})
			return response.data
		} catch (err) {
			console.log(err)
			push.error('Ошибка при поиске')
		}
	}

	async updateById(id: string, data: Record<string, string>) {
		try {
			const response = await http.post(`admin/specialists/update/${id}`, data)
			push.success('Профиль успешно обновлен')
			return response.data
		} catch (err) {
			console.log(err)
			push.error('Ошибка при обновлении')
		}
	}

	async create(data: SpecialistBodyType) {
		try {
			const response = await http.post('admin/specialists/create', data)
			return response.data.id
		} catch (err) {
			console.log(err)
			push.error('Ошибка при создании')
		}
	}
}
