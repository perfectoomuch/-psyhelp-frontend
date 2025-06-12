export type ChatMessageType = {
	message: string
	attachments: string[]
	from: string
}

export type ChatType = {
	chat: ChatMessageType[]
}
