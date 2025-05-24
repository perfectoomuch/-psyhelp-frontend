import { defineStore } from 'pinia'
import type {
	SpecialistItemType,
	SpecialistStoreType,
} from '../types/specialist'

export const useSpecialistsStore = defineStore('specialists', {
	state: () => ({ specialists: [], loading: true } as SpecialistStoreType),
	actions: {
		setSpecialists(data: SpecialistItemType[]) {
			this.specialists = data
			this.loading = false
		},
	},
})
