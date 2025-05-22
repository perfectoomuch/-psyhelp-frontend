export type SpecialistItemType = {
	first_name: string
	last_name: string
	methods: string[]
	experience_route: string[]
	experience_years: number
	photo: string
	video: string
	gender: string
	price: number
	message: string
	education: string
	profession: string
	sessions: number
	religion: number
	experience_ethnic_group: string
	age: number
	id: string
}

export type SpecialistStoreType = {
	specialists: SpecialistItemType[]
	loading: boolean
}
