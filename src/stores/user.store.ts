import { defineStore } from 'pinia'
import { http } from '@/plugins/axios'
import { push } from 'notivue'

type SetUserType = {
	chat_id: number
	username: string
}

type UserProfileType = {
	email: string
	first_name: string
	last_name: string
}

type UpdateUserType = {
	email: string
	first_name: string
	last_name: string
}

export const useUserStore = defineStore('user', {
	state: () =>
		({
			user: null,
			loading: true,
		} as any),
	actions: {
		isFilled({ email, first_name, last_name }: UserProfileType) {
			if (!email.length) return false
			if (!first_name.length) return false
			if (!last_name.length) return false
			return true
		},
		async getUser(data: SetUserType) {
			try {
				const response = await http.get(`customers/${data.chat_id}`)
				this.user = await {
					...response.data,
					filled: this.isFilled(response.data),
				}
				this.loading = false
			} catch (err: any) {
				console.log('getUser catch', err)
				if (err.response.status === 404) {
					await this.setUser(data)
				} else {
					push.error('Непредвиденная ошибка')
				}
			}
		},
		async setUser(data: SetUserType) {
			await http.post('customers', data)
			await this.getUser(data)
			// console.log(this.user)
		},
		async updateUser(data: UpdateUserType): Promise<boolean> {
			try {
				const response = await http.post(
					`customers/update/${this.user.chat_id}`,
					data
				)
				await this.getUser(data)
				return true
			} catch (err) {
				console.log('updateUser catch', err)

				push.error('Непредвиденная ошибка')
				return false
			}
		},
	},
})
