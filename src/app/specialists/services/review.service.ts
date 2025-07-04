import { http } from '@/plugins/axios'
import type { ReviewCreateType } from '../types/reviews'
import { useUserStore } from '@/stores/user.store'
import { push } from 'notivue'
import type { PaginationType, ReviewFilterType } from '@/app/admin/types/review'

export class ReviewsService {
	private userStore = useUserStore()

	async create(data: ReviewCreateType) {
		try {
			const payload = {
				...data,
				customer: this.userStore.user.id,
			}
			const response = await http.post('reviews', payload)
			return true
		} catch (err) {
			console.log(err)
			push.error('Ошибка при отправке')
			return false
		}
	}

	async getBySpecialist(specialist: string, pagination: PaginationType) {
		try {
			const response = await http.get(`reviews/${specialist}`, {
				params: pagination,
			})
			return response.data
		} catch (err) {
			console.log(err)
			push.error('Ошибка при получении отзывов')
			return false
		}
	}
}
