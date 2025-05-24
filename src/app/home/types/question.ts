export type QuestionInterface = {
	id: number
	field: string
	question: string
	select: string
	variants: string[]
}

export type QuestionsStoreInterface = {
	questions: QuestionInterface[]
	formQuestions: FormQuestionInterface[]
	loading: boolean
}

export type FormQuestionInterface = {
	local_id: number
	question: string
	answer: string[]
	field: string
}

export type QuestionFormItem = {
	local_id: number
	question: string
	answer: string[]
	field: string
}
