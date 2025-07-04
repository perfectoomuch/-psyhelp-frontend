import { http } from '@/plugins/axios'
import type {
	TransactionCreateType,
	TransactionFilterType,
} from '../types/transaction'
import { push } from 'notivue'
import type { PaginationType } from '../types/review'

export class TransactionService {
	async getAll(data: TransactionFilterType, pagination: PaginationType) {
		try {
			const response = await http.post('admin/transactions/filter', data, {
				params: pagination,
			})
			return response.data
		} catch (err) {
			console.log(err)
			push.error('Ошибка при получении данных')
		}
	}

	async create(data: TransactionCreateType) {
		try {
			const response = await http.post('admin/transactions', data)
			return response.data
		} catch (err) {
			console.log(err)
			push.error('Ошибка при создании')
		}
	}
}
