<template>
	<div class="w-full h-full flex flex-col">
		<div
			v-if="loading && data === null"
			class="flex flex-1 items-center justify-center"
		>
			<span class="loading loading-spinner text-primary"></span>
		</div>
		<div
			v-if="loading === null && data === null"
			class="flex items-center justify-center flex-1 text-center text-sm flex-col px-5 leading-none gap-2"
		>
			<Icon
				name="MessageSquare"
				fill="#0082ce"
				:size="44"
				class="text-primary"
			/>
			<span class="opacity-65">Выберите диалог что бы написать</span>
		</div>
		<div
			v-if="loading === false && data !== null"
			class="flex flex-col h-full min-h-0 overflow-hidden"
		>
			<div class="h-[73px] flex items-center border-b-[1px]">
				<div class="text-sm flex flex-row gap-2 items-center px-4 w-full">
					<div
						class="min-w-12 h-12 rounded-full uppercase flex items-center justify-center bg-gray-100 border text-md font-semibold group-hover:bg-white"
					>
						{{ Array.from(data.customer.username)[0] }}
					</div>
					<div class="flex flex-col w-[calc(100%-52px)] gap-0.5">
						<div class="flex justify-between">
							<span class="font-medium">
								{{ data.customer.first_name }}
								{{ data.customer.last_name }}
							</span>
						</div>

						<a
							:href="`https://t.me/${data.customer.username}`"
							class="text-primary"
						>
							@{{ data.customer.username }}
						</a>
					</div>
					<button class="btn btn-sm btn-primary" @click="onOpenInvoice">
						Выставить счет
					</button>
				</div>
			</div>
			<div id="messages" class="flex-1 flex flex-col overflow-y-auto p-4">
				<template v-for="(item, index) in data.chat" :key="index">
					<div
						class="chat w-fit max-w-3/4"
						:class="[
							item.from === 'customer' ? 'chat-start' : 'chat-end ml-auto',
							index === data.chat.length - 1 ? 'last_message' : '',
						]"
					>
						<div class="chat-header">
							<template v-if="item.from === 'customer'">
								{{ data.customer.first_name }} {{ data.customer.last_name }}
							</template>
							<template v-if="'transaction' in item">
								Выставлен счет на оплату
							</template>
							<time class="text-xs opacity-50">
								{{ $dayjs(item.date).format('DD/MM/YYYY HH:mm') }}
							</time>
						</div>
						<div
							class="chat-bubble text-sm w-fit"
							:class="['transaction' in item && 'bg-primary']"
						>
							<template v-if="item.attachments.length > 0">
								<template v-for="val in item.attachments" :key="val">
									<div class="col-span-2">
										<a
											class=""
											v-if="getFileType(val) === 'photo'"
											:href="$file(val)"
										>
											<img :src="$file(val)" alt="" class="rounded-lg" />
										</a>

										<a
											v-else
											:href="$file(val)"
											class="border flex items-center gap-2 text-sm btn btn-primary btn-sm px-7"
										>
											<Icon name="File" :size="16" class="min-w-[16px]" />
											{{ val }}
										</a>
									</div>
								</template>
							</template>
							<span
								v-if="!item?.transaction"
								class="block"
								:class="[item.attachments.length > 0 ? 'mt-2' : '']"
							>
								{{ item.message }}
							</span>
							<div
								v-if="item?.transaction && item.transaction.specialist"
								class="flex flex-col text-white"
							>
								<p
									class="mb-1 whitespace-normal text-wrap whitespace-normal break-words"
								>
									ID: {{ item.transaction.id }} <br /><br />
									{{ item.transaction.message }}
								</p>
								<div class="flex flex-col gap-1 whitespace-nowrap">
									<div class="grid grid-cols-2 gap-2">
										<span>Специалист:</span>
										<router-link
											:to="`/admin/dashboard/specialists/${item.transaction.specialist.id}`"
											class="text-white underline"
										>
											{{ item.transaction.specialist.first_name }}
											{{ item.transaction.specialist.last_name }}
										</router-link>
									</div>
									<div class="grid grid-cols-2 gap-2">
										<span>Сумма:</span>
										<span>
											{{ $currency(item.transaction.total) }}
										</span>
									</div>
									<div class="grid grid-cols-2 gap-2">
										<span>Статус:</span>
										<span>
											{{
												status(item.transaction.status).getStatusByValue.name
											}}
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</template>
			</div>
			<div class="bg-white w-full border-t-[1px] relative">
				<div
					class="flex gap-2 absolute bottom-full p-2 bg-white/50 backdrop-blur-sm w-full"
					v-if="form.attachments.length > 0"
				>
					<div
						v-for="item in form.attachments"
						:key="item"
						class="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center group relative bg-white border"
					>
						<img
							v-if="getFileType(item) === 'photo'"
							:src="$file(item)"
							class="w-full h-full object-cover"
							alt=""
						/>
						<Icon v-else name="FileCheck" :size="16" />

						<div
							class="w-full h-full bg-white/60 absolute top-0 left-0 flex items-center justify-center opacity-0 duration-300 group-hover:opacity-100 cursor-pointer"
							@click="clearAttachments"
						>
							<Icon name="Trash" :size="16" class="text-red-400" />
						</div>
					</div>
				</div>
				<div class="flex relative">
					<input
						type="text"
						class="input focus:outline-none bg-gray-100 rounded-none w-full h-[50px] pr-15"
						placeholder="Ваше сообщение"
						v-model="form.message"
						@keyup.enter="onSubmit"
					/>
					<div
						class="flex gap-3 absolute right-2 top-1/2 -translate-y-1/2 z-10"
					>
						<input
							type="file"
							ref="file"
							class="hidden"
							@change="onChangeFile"
						/>
						<button
							class="btn border-none bg-white btn-square"
							@click="openFileChange"
						>
							<Icon name="Paperclip" :size="16" />
						</button>
						<button class="btn btn-primary btn-square" @click="onSubmit">
							<Icon
								name="SendHorizontal"
								fill="#ffffff"
								:strokeWidth="0"
								:size="16"
							/>
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<InvoiceDialog ref="invoiceDialog" @update="onInvoiceUpdate" />
</template>

<script>
import dayjs from 'dayjs'
import upload from '../../services/upload.service'
import { emitUp } from '@/utils/emitUp'
import InvoiceDialog from '../Transactions/InvoiceDialog.vue'
import { status } from '@/utils/transaction'
import { ChatService } from '../../services/chat.service'

export default {
	props: ['data', 'loading'],
	components: {
		InvoiceDialog,
	},
	data: () => ({
		chatService: new ChatService(),
		status,
		form: {
			customer: null,
			message: '',
			attachments: [],
			from: 'admin',
		},
	}),
	created() {
		this.setCustomer()
	},
	updated() {
		this.setCustomer()
	},
	methods: {
		setCustomer() {
			if (this.data !== null && 'customer' in this.data) {
				this.form.customer = this.data.customer.id
			}
		},
		getFileType(filename) {
			const photoExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp']
			const documentExtensions = [
				'.pdf',
				'.doc',
				'.docx',
				'.xls',
				'.xlsx',
				'.ppt',
				'.pptx',
				'.txt',
				'.rtf',
			]

			const ext = filename.toLowerCase().split('.').pop()
			if (!ext) return 'unknown'

			if (photoExtensions.includes(`.${ext}`)) return 'photo'
			if (documentExtensions.includes(`.${ext}`)) return 'document'
			return 'unknown'
		},
		openFileChange() {
			this.$refs.file.click()
		},
		async onChangeFile(event) {
			const filename = await upload(event.target.files[0])
			this.form.attachments = [filename]
		},
		clearAttachments() {
			this.form.attachments = []
		},
		async onSubmit() {
			if (this.form.message.trim().length === 0) return
			const result = await emitUp(this, 'onAdminMessage', this.form)
			this.form.message = ''
			this.form.attachments = []
		},
		onOpenInvoice() {
			this.$refs.invoiceDialog.openAction(true, {
				customer: this.data.customer,
			})
		},
		async onInvoiceUpdate() {
			// this.$props.loading = true
			// const room = await this.chatService.getByCustomer(
			// 	this.$props.data.customer.id
			// )
			// console.log(room)

			// this.$props.data = room
			// this.$props.loading = false
			window.open(
				`/admin/dashboard/chats?customer=${this.data.customer.id}`,
				'_self'
			)
		},
	},
}
</script>
