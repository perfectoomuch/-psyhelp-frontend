<template>
	<div v-if="loading" class="flex justify-center">
		<span class="loading loading-spinner text-primary"></span>
	</div>
	<ChatLayout :chats="chats" v-else />
</template>

<script>
import ChatLayout from '../../components/Chats/Layout.vue'
import { ChatService } from '../../services/chat.service'
export default {
	components: {
		ChatLayout,
	},
	data: () => ({
		chatService: new ChatService(),
		chats: [],
		loading: true,
	}),
	created() {
		this.getAll()
	},
	methods: {
		async getAll() {
			const chats = await this.chatService.getAll()
			this.chats = chats
			this.loading = false
		},
	},
}
</script>
