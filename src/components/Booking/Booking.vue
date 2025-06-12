<template>
	<Dialog v-model:open="open">
		<DialogContent class="bg-white top-10 translate-y-0">
			<div
				class="flex flex-col items-center justify-center gap-4 text-center"
				v-if="showSuccessAlert"
			>
				<Check />
				<div class="flex flex-col items-center justify-center gap-2">
					<h3 class="text-lg font-semibold">Вы записались</h3>
					<p class="mb-10">
						Вам в скором времени напишет менеджер для утверждения даты
					</p>

					<button class="btn btn-soft btn-primary" @click="onClose">
						Понятно
					</button>
				</div>
			</div>

			<template v-if="!showSuccessAlert">
				<DialogHeader>
					<DialogTitle class="text-lg font-semibold">
						Записаться к специалисту
					</DialogTitle>
				</DialogHeader>

				<form
					@submit.prevent="onSubmit"
					class="flex flex-col h-full text-left w-full"
				>
					<fieldset class="fieldset">
						<legend class="fieldset-legend text-sm">Специалист</legend>
						<input
							type="text"
							class="input w-full text-base"
							placeholder="Специалист"
							required
							readonly
							disabled
							:value="specialist.name"
						/>
					</fieldset>
					<fieldset class="fieldset">
						<legend class="fieldset-legend text-sm">Желаемая дата</legend>

						<MaterializeDatepicker v-model="form.date">
							<input
								type="text"
								class="input pika-single w-full text-base"
								placeholder="Выбрать дату"
								:value="
									form.date ? $dayjs(form.date).format('DD MMMM, YYYY') : ''
								"
								required
								readonly
							/>
						</MaterializeDatepicker>

						<p class="label" v-if="showTakeDateError">Выберите желаемую дату</p>
					</fieldset>
					<fieldset class="fieldset">
						<legend class="fieldset-legend text-sm">Желаемое время</legend>
						<MaterializeTimepicker v-model="form.time">
							<input
								type="text"
								class="input w-full text-base"
								placeholder="Выбрать время"
								v-model="form.time"
								required
								readonly
							/>
						</MaterializeTimepicker>

						<p class="label">Укажите по мск времени</p>
					</fieldset>

					<button class="btn btn-md btn-primary mt-4" :disabled="loading">
						<span
							v-if="loading"
							class="loading loading-sm loading-spinner"
						></span>
						<template v-else> Отправить заявку </template>
					</button>
				</form>
			</template>
		</DialogContent>
	</Dialog>
</template>

<script>
import 'cally'
import { emitUp } from '@/utils/emitUp'
import { Check } from '../Animation'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import MaterializeDatepicker from '../Pickers/MaterializeDatepicker.vue'
import MaterializeTimepicker from '../Pickers/MaterializeTimepicker.vue'

export default {
	components: {
		Popover,
		PopoverContent,
		PopoverTrigger,
		Calendar,
		Check,
		Dialog,
		DialogContent,
		DialogDescription,
		DialogFooter,
		DialogHeader,
		DialogTitle,
		DialogTrigger,
		MaterializeDatepicker,
		MaterializeTimepicker,
	},
	data: () => ({
		open: false,
		form: {
			date: null,
			time: '',
		},
		loading: false,
		specialist: {
			id: '',
			name: '',
		},
		showTakeDateError: false,
		showSuccessAlert: false,
	}),
	mounted() {},
	watch: {},
	methods: {
		onChangedDate(event) {
			this.form.date = event.target.value
			this.showTakeDateError = false
		},
		onClose() {
			this.open = false
		},
		async onSubmit() {
			if (this.form.date.length === 0) {
				this.showTakeDateError = true
				return
			}
			this.loading = true

			const result = await emitUp(this, 'onBooking', {
				date: `${this.form.date} ${this.form.time}`,
				specialist_id: this.specialist.id,
			})

			if (result) {
				this.showSuccessAlert = true
			}
		},
		openModal({ specialist_id, name }) {
			this.showTakeDateError = false
			this.showSuccessAlert = false
			this.form.date = null
			this.form.time = ''
			this.loading = false
			this.specialist = {
				id: '',
				name: '',
			}
			this.specialist.name = name
			this.specialist.id = specialist_id
			this.open = true
		},
	},
}
</script>
