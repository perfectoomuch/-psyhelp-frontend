<template>
	<dialog id="booking" class="modal model-sm">
		<div class="modal-box">
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
						<calendar-date
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
						</calendar-date>

						<!-- <input
						type="text"
						class="input pika-single w-full text-base"
						placeholder="Выбрать дату"
						required
						ref="myDatepicker"
					/> -->

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
import {
	DrawerContent,
	DrawerOverlay,
	DrawerPortal,
	DrawerRoot,
	DrawerTrigger,
} from 'vaul-vue'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { vMaska } from 'maska/vue'
import Pikaday from 'pikaday'
import 'cally'
import { inject } from 'vue'
import { emitUp } from '@/utils/emitUp'
import { Check } from '../Animation'

export default {
	directives: { maska: vMaska },
	components: {
		DrawerContent,
		DrawerOverlay,
		DrawerPortal,
		DrawerRoot,
		DrawerTrigger,
		Popover,
		PopoverButton,
		PopoverPanel,
		Check,
	},
	data: () => ({
		form: {
			date: '',
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
				date: this.form.date,
				specialist_id: this.specialist.id,
			})
			console.log(result)

			if (result) {
				this.showSuccessAlert = true
			}
		},
		openModal({ specialist_id, name }) {
			this.specialist.name = name
			this.specialist.id = specialist_id
			const modal = document.getElementById('booking')
			if (modal) modal.showModal()
		},
	},
}
</script>
