<template>
	<Dialog v-model:open="open">
		<DialogContent class="bg-white top-10 translate-y-0">
			<div
				class="flex flex-col items-center justify-center gap-4 text-center"
				v-if="showSuccessAlert"
			>
				<Check />
				<div class="flex flex-col gap-2">
					<h3 class="text-lg font-semibold">Вы записались</h3>
					<p>Вам в скором времени напишет менеджер для утверждения даты</p>
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

						<Popover>
							<PopoverTrigger>
								<input
									type="text"
									class="input pika-single w-full text-base"
									placeholder="Выбрать дату"
									:value="
										form.date ? $dayjs(form.date).format('DD/MM/YYYY') : ''
									"
									required
									readonly
								/>
							</PopoverTrigger>
							<PopoverContent
								class="w-auto p-0 bg-white shadow-sm border border-gray-100"
							>
								<Calendar
									v-model="form.date"
									initial-focus
									class="calendar"
									:isDateDisabled="dateDisabled"
									locale="ru"
								/>
							</PopoverContent>
						</Popover>

						<p class="label" v-if="showTakeDateError">Выберите желаемую дату</p>
					</fieldset>
					<fieldset class="fieldset">
						<legend class="fieldset-legend text-sm">Желаемое время</legend>

						<input
							type="text"
							class="input pika-single w-full text-base"
							placeholder="Напишите время"
							v-model="form.time"
							v-maska
							data-maska="##:##"
							required
						/>

						<p class="label">Укажите по мск времени</p>
					</fieldset>

					<button class="btn btn-md btn-primary mt-4" :disabled="loading">
						<span
							v-if="loading"
							class="loading loading-sm loading-spinner"
						></span>
						<template v-else> Записаться </template>
					</button>
				</form>
			</template>
		</DialogContent>
	</Dialog>

	<dialog id="booking" class="modal model-sm">
		<div class="modal-box">
			<template v-if="!showSuccessAlert">
				<h3 class="text-lg font-semibold mb-4">Записаться к специалисту</h3>
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
						<!-- <calendar-date
							class="cally bg-base-100 border border-base-300 w-full rounded-box"
							:min="$dayjs().format('YYYY-MM-DD')"
							@change="onChangedDate"
						>
							<svg
								aria-label="Previous"
								class="fill-current size-4"
								slot="previous"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
							>
								<path
									fill="currentColor"
									d="M15.75 19.5 8.25 12l7.5-7.5"
								></path>
							</svg>
							<svg
								aria-label="Next"
								class="fill-current size-4"
								slot="next"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
							>
								<path fill="currentColor" d="m8.25 4.5 7.5 7.5-7.5 7.5"></path>
							</svg>
							<calendar-month></calendar-month>
						</calendar-date> -->

						<Popover>
							<PopoverTrigger as-child>
								<input
									type="text"
									class="input pika-single w-full text-base"
									placeholder="Выбрать дату"
									required
									ref="myDatepicker"
								/>
							</PopoverTrigger>
							<PopoverContent class="w-auto p-0">
								<Calendar v-model="form.date" initial-focus />
							</PopoverContent>
						</Popover>

						<p class="label" v-if="showTakeDateError">Выберите желаемую дату</p>
					</fieldset>

					<button class="btn btn-md btn-primary mt-4" :disabled="loading">
						<span
							v-if="loading"
							class="loading loading-sm loading-spinner"
						></span>
						<template v-else> Записаться </template>
					</button>
				</form>
			</template>
		</div>
		<form method="dialog" class="modal-backdrop">
			<button>close</button>
		</form>
	</dialog>
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
import { today } from '@internationalized/date'

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

				setTimeout(() => {
					this.form.date = null
					this.form.time = ''

					this.loading = false
					this.specialist = {
						id: '',
						name: '',
					}
					this.open = false

					this.showSuccessAlert = false
				}, 2500)
			}
		},
		openModal({ specialist_id, name }) {
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
		dateDisabled(date) {
			return this.$dayjs(date).isBefore(this.$dayjs().startOf('day'))
		},
	},
}
</script>
