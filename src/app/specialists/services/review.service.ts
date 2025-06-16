import { http } from '@/plugins/axios'
import type { ReviewCreateType } from '../types/reviews'
import { useUserStore } from '@/stores/user.store'
import { push } from 'notivue'

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
}
