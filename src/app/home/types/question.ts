export type QuestionInterface = {
	id: number
	field: string
	question: string
	select: string
	variants: string[]
}

export type QuestionsStoreInterface = {
	questions: QuestionInterface[]
	loading: boolean
}

export type QuestionFormItem = {
	local_id: number
	question: string
	answer: string[]
	field: string
}
