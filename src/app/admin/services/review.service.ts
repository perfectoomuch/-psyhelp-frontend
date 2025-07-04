import { http } from '@/plugins/axios'
import { push } from 'notivue'
import type {
	PaginationType,
	ReviewFilterType,
	ReviewSaveType,
} from '../types/review'

export class ReviewService {
	async getAll(filters: ReviewFilterType, pagination: PaginationType) {
		try {
			const response = await http.post('admin/reviews', filters, {
				params: pagination,
			})
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
