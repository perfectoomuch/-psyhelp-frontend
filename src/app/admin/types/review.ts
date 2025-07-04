export type ReviewSaveType = {
	name: string
	stars: number
	review: string
	status: string
}

export type ReviewFilterType = {
	status: string
}

export type PaginationType = {
	limit: number
	page: number
}
