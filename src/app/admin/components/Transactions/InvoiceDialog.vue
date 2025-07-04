<template>
	<Dialog v-model:open="open">
		<DialogContent class="w-sm">
			<DialogHeader>
				<DialogTitle>Выставить счет</DialogTitle>
				<DialogDescription v-if="customer">
					Клиент: {{ customer.username }}
				</DialogDescription>
			</DialogHeader>

			<form @submit.prevent="onSubmit" class="flex flex-col gap-4">
				<div class="flex flex-col gap-1">
					<label class="label">Специалист</label>

					<Popover v-model:open="popover">
						<PopoverTrigger class="w-full">
							<input
								class="input border w-full"
								:value="getSelectedSpecialist"
								required
								readonly
							/>
						</PopoverTrigger>
						<PopoverContent
							class="w-[var(--reka-popper-anchor-width)] overflow-y-auto max-h-[400px]"
						>
							<div class="relative">
								<input
									class="input input-sm border w-full mb-4 pr-10"
									v-model="search.text"
									placeholder="Поиск специалиста"
									v-debounce:500ms="onSearch"
								/>
								<div
									class="absolute right-3 top-2 z-1 flex items-center"
									v-if="loading"
								>
									<span class="loading loading-spinner text-primary w-4"></span>
								</div>
							</div>

							<div class="flex flex-col text-sm">
								<template v-if="specialistsMap.length > 0">
									<div
										class="flex items-center gap-2 py-1"
										v-for="(item, index) in specialistsMap"
										:key="index"
									>
										<img
											class="w-full h-auto object-cover max-w-10 max-h-10 rounded-full border"
											:src="$file(item.photo)"
										/>
										<span>
											{{ item?.first_name }}
											{{ item?.last_name }}
										</span>

										<button
											class="btn btn-sm btn-circle ml-auto"
											@click="onChangeSpecialist(item)"
										>
											<Icon name="Plus" class="w-4 h-4" />
										</button>
									</div>
								</template>
								<template v-else>
									<div class="h-4">Нет данных.</div>
								</template>
							</div>
						</PopoverContent>
					</Popover>
				</div>

				<div class="flex flex-col gap-1">
					<label class="label">Итоговая сумма</label>
					<input
						class="input border w-full"
						v-model="form.total"
						v-maska="'###########'"
						required
					/>
				</div>

				<div class="flex flex-col gap-1">
					<label class="label">Текст сообщении</label>
					<textarea
						class="textarea w-full border w-full"
						v-model="form.message"
						placeholder="Сообщение"
					></textarea>
				</div>

				<button class="btn btn-primary">Выставить счет</button>
			</form>
		</DialogContent>
	</Dialog>
</template>

<script>
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import vueDebounce from 'vue-debounce'

import { SpecialistService } from '../../services/specialist.service'
import { TransactionService } from '../../services/transaction.service'

export default {
	components: {
		Dialog,
		DialogContent,
		DialogDescription,
		DialogFooter,
		DialogHeader,
		DialogTitle,
		DialogTrigger,
		Popover,
		PopoverContent,
		PopoverTrigger,
	},
	directives: {
		debounce: vueDebounce({ lock: true }),
	},
	data: () => ({
		specialistService: new SpecialistService(),
		transactionService: new TransactionService(),
		open: false,
		popover: false,
		form: {
			specialist_id: '',
			customer_id: '',
			total: '',
			message: '',
		},
		customer: null,
		specialist: null,

		loading: false,
		specialists: [],
		search: {
			text: '',
			used: false,
			result: [],
		},
	}),
	computed: {
		specialistsMap() {
			if (this.search.used) {
				return this.search.result
			}
			return this.specialists
		},
		getSelectedSpecialist() {
			if (this.specialist) {
				return this.specialist.first_name + ' ' + this.specialist.last_name
			}
			return ''
		},
	},
	methods: {
		openAction(status, payload) {
			if (payload) {
				const { customer, specialist } = payload

				if (customer) {
					this.customer = customer
					this.form.customer_id = this.customer.id
				}

				if (specialist) {
					this.specialist = specialist
					this.form.specialist_id = this.specialist.id
					this.form.total = this.specialist.price
				}
			}

			this.open = status
		},
		async onSearch() {
			if (this.search.text.trim().length === 0) {
				this.search.result = []
				this.search.used = false

				return
			}
			this.loading = true
			this.search.result = await this.specialistService.getBySearch(
				this.search.text
			)
			this.search.used = true
			this.loading = false
		},
		async onSubmit() {
			const payload = {
				...this.form,
				total: Number(parseInt(this.form.total)),
			}
			const response = await this.transactionService.create(payload)
			if (response?.message === 'success') {
				this.$toast.success('Выставлен счет на оплату')
				this.$emit('update')
				this.reset()
			}
		},
		reset() {
			this.popover = false
			this.open = false
			this.form = {
				specialist_id: '',
				customer_id: '',
				total: '',
				message: '',
			}
			this.customer = null
			this.specialist = null
			this.search = {
				text: '',
				used: false,
				result: [],
			}
			this.specialists = []
		},
		onChangeSpecialist(specialist) {
			this.specialist = specialist
			this.form.specialist_id = this.specialist.id
			this.form.total = this.specialist.price
			this.popover = false
		},
	},
}
</script>
