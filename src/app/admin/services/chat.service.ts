import { http } from '@/plugins/axios'
import type { ChatMessageType, ChatType } from '../types/chat'

export class ChatService {
	async getAll() {
		try {
			const response = await http.get('admin/chats')
			return response.data
		} catch (err) {
			console.log(err)
		}
	}

	async getByCustomer(id: string) {
		try {
			const response = await http.get(`admin/chats/${id}`)
			return response.data
		} catch (err) {
			console.log(err)
		}
	}

	async sendMessage(customer: string, message: ChatMessageType) {
		try {
			const response = await http.post(`admin/chats/${customer}`, message)
			console.log(response.data)
			return response.data
		} catch (err) {
			console.log(err)
		}
	}
}
