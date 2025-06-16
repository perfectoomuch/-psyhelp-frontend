import { http } from '@/plugins/axios'
import { push } from 'notivue'
import type { ReviewSaveType } from '../types/review'

export class ReviewService {
	async getAll() {
		try {
			const response = await http.get('admin/reviews')
			return response.data
		} catch (err) {
			console.log(err)
			push.error('Ошибка при получении')
		}
	}

	async updateById(id: string, data: Partial<ReviewSaveType>) {
		try {
			const response = await http.post(`admin/reviews/${id}`, data)
			push.success('Отзыв обновлен')
			return true
		} catch (err) {
			console.log(err)
			push.error('Ошибка при сохранении')
			return false
		}
	}

	async deleteById(id: string) {
		try {
			const response = await http.post(`admin/reviews/delete/${id}`)
			push.success('Отзыв удален')
			return true
		} catch (err) {
			console.log(err)
			push.error('Ошибка при удалении')
			return false
		}
	}
}
