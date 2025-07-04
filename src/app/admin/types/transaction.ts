export type TransactionCreateType = {
	total: number
	message: string
	specialist_id: string
	customer_id: string
}

export type TransactionFilterType = {
	status: string
	search: string
}
