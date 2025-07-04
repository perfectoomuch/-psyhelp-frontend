<template>
	<div class="flex w-full h-full">
		<Sidebar
			:dialogs="dialogs"
			class="min-w-[340px] max-w-[340px] border-r-[1px]"
			@room="onChangeRoom"
		/>
		<Room class="w-full" :data="room.data" :loading="room.loading" />
	</div>
</template>

<script>
import Sidebar from './Sidebar.vue'
import Room from './Room.vue'
import { ChatService } from '../../services/chat.service'
import { socket } from '../../services/socket.service'

export default {
	props: ['chats'],
	components: {
		Sidebar,
		Room,
	},
	data: () => ({
		chatService: new ChatService(),
		dialogs: [],
		room: {
			loading: null,
			data: null,
		},
	}),
	async created() {
		this.dialogs = this.chats

		if (this.$route.query?.customer) {
			const customerId = this.$route.query.customer

			const index = this.dialogs.findIndex(el => el.customer.id === customerId)
			if (index > -1) {
				await this.onChangeRoom(this.$route.query?.customer)
			} else {
				this.$toast.info('Чат с пользователем не найден')
			}
		}
	},
	mounted() {
		socket.on('message', async data => {
			this.updateDialog(data.id, data.message)
			await this.updateRoom(data.customer_id)
		})
	},
	computed: {},
	methods: {
		async onChangeRoom(customerId, isNewChat = true) {
			if (isNewChat) {
				this.room.loading = true
			}
			const room = await this.chatService.getByCustomer(customerId)
			this.room.data = room
			this.room.loading = false

			this.$nextTick(() => {
				if (isNewChat) {
					const messagesEl = document.getElementById('messages')
					messagesEl.scrollTo(0, messagesEl.scrollHeight)
				} else {
					document.querySelector('.last_message').scrollIntoView({
						behavior: 'smooth',
					})
				}
			})
		},
		async onAdminMessage(message) {
			const customerId = message.customer
			const payload = message
			delete payload.customer

			const response = await this.chatService.sendMessage(customerId, payload)
			const dialogIndex = this.chats.findIndex(el => el.id === response.id)
			this.dialogs[dialogIndex].last = response.last

			if (response.id === this.room.data?.id) {
				this.room.data = response

				this.$nextTick(() => {
					document.querySelector('.last_message').scrollIntoView({
						behavior: 'smooth',
					})
				})
			}
		},
		updateDialog(id, last) {
			const dialogIndex = this.dialogs.findIndex(el => el.id === id)
			if (dialogIndex > -1) {
				this.dialogs[dialogIndex].last = last
			}
		},
		async updateRoom(customer_id) {
			if (customer_id === this.room.data?.customer.id) {
				await this.onChangeRoom(customer_id, false)
			}
		},
	},
}
</script>
