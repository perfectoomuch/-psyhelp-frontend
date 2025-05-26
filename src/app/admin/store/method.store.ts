import { defineStore } from 'pinia'

type StateType = {
	methods: MethodType[]
}

type MethodType = {
	email: string
	id: string
}

export const useMethodStore = defineStore('methods', {
	state: () =>
		({
			methods: [],
		} as StateType),
	actions: {
		setMethods(data: MethodType[]) {
			this.methods = data
		},
		getMethods(ids: string[]) {
			return this.methods.filter(el => ids.includes(el.id))
		},
		getMethod(id: string) {
			return this.methods.find(el => el.id === id)
		},
	},
})
