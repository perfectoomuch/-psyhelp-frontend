import { defineStore } from 'pinia'
import { useUserStore } from './user.store'

export const useTelegramStore = defineStore('telegram', {
	state: () =>
		({
			utils: null,
			webapp: null,
			webview: null,
		} as any),
	actions: {
		async setInstance() {
			const instance = (window as any).Telegram

			this.utils = instance.Utils
			this.webapp = instance.WebApp
			this.webview = instance.WebView

			const userStore = useUserStore()

			if (Object.entries(this.webapp.initDataUnsafe).length > 0) {
				const user = await userStore.getUser({
					chat_id: this.webapp.initDataUnsafe.user.id,
					username: this.webapp.initDataUnsafe.user.username,
				})
			}
		},
	},
})
