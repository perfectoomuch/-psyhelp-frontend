import { defineStore } from 'pinia'

type StateType = {
	user: UserType | null
	authed: boolean | null
}

type UserType = {
	email: string
}

export const useAdminStore = defineStore('users', {
	state: () =>
		({
			user: null,
			authed: null,
		} as StateType),
	actions: {
		setUser(user: UserType) {
			this.user = user
			this.authed = true
		},
	},
})
