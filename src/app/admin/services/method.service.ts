import { http } from '@/plugins/axios'
import { push } from 'notivue'
import type { MethodType } from '../types/method'

export class MethodService {
	async getAll() {
		try {
			const response = await http.get('admin/methods')
			return response.data
		} catch (err) {
			console.log(err)
			push.error('Непредвиденная ошибка')
			return []
		}
	}

	async create(data: MethodType) {
		try {
			const response = await http.post('admin/methods', data)
			push.success('Метод создан')
			return response.data
		} catch (err) {
			console.log(err)
			push.error('Непредвиденная ошибка')
		}
	}

	async update(id: string, data: MethodType) {
		try {
			const response = await http.post(`admin/methods/update/${id}`, data)
			push.success('Метод обновлен')
			return response.data
		} catch (err) {
			console.log(err)
			push.error('Непредвиденная ошибка')
		}
	}

	async delete(id: string) {
		try {
			const response = await http.post(`admin/methods/delete/${id}`)
			push.success('Метод удален')
			return response.data
		} catch (err) {
			console.log(err)
			push.error('Непредвиденная ошибка')
		}
	}
}
