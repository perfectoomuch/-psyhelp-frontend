import { defineStore } from 'pinia'
import type {
	SpecialistItemType,
	SpecialistStoreType,
} from '@/app/specialists/types/specialist'

export const useFilterSpecialistsStore = defineStore('filterSpecialists', {
	state: () => ({ specialists: [], loading: true } as SpecialistStoreType),
	actions: {
		updateSpecialists(data: SpecialistItemType[]) {
			this.specialists = data
			this.loading = false
		},
	},
})
