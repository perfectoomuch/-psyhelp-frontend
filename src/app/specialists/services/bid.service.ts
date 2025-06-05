import { http } from '@/plugins/axios'
import type { BidCreateType } from '../types/specialist'

export class BidService {
	async createBid(data: BidCreateType) {
		try {
			const response = await http.post('bids', data)
			return true
		} catch (err) {
			console.log(err)
			return false
		}
	}
}
