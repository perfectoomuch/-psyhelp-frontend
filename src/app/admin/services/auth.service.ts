import { useAdminStore } from '../store/user.store'
import type { AuthType } from '../types/auth'
import { http, changeToken } from '@/plugins/axios'
import axios from 'axios'
import { push } from 'notivue'
import Cookies from 'js-cookie'
import router from '@/routes'
import { init, socket } from './socket.service'
import { BidService } from './bid.service'

export class AuthService {
	private store = useAdminStore()
	private bidService = new BidService()

	async GetUser(): Promise<boolean> {
		const sessionToken = Cookies.get('token')
		if (!sessionToken) {
			return false
		}

		try {
			const response = await http.get('auth/me')
			this.store.setUser(response.data)
			await this.bidService.getAll()
			await init()
			return true
		} catch (err) {
			console.log(err)
			return false
		}
	}

	async SignIn(data: AuthType): Promise<boolean> {
		try {
			const response = await http.post('auth/sign-in', data)
			await changeToken(response.data.sessionToken)
			await this.GetUser()
			window.open('/admin/dashboard', '_self')
			return true
		} catch (err) {
			if (axios.isAxiosError(err)) {
				if (err.response?.status === 404) {
					push.error('Пользователь не найден')
				} else if (err.response?.status === 401) {
					push.error('Неправильный пароль')
				} else {
					push.error('Неизвестная ошибка')
				}
			} else {
				push.error('Неизвестная ошибка')
			}

			return false
		}
	}

	async Logout() {
		try {
			const response = await http.get('auth/logout')
			Cookies.remove('token')
			window.open('/admin', '_self')
			return true
		} catch (err) {
			console.log(err)
			return false
		}
	}
}
