<template>
	<Dialog v-model:open="open">
		<DialogTrigger>
			<slot />
		</DialogTrigger>
		<DialogContent
			class="bg-white w-fit p-0 rounded-xl overflow-hidden min-w-sm"
			hideClose="true"
		>
			<smooth-picker :data="options" @onChange="handleChange" />
			<button
				class="btn btn-primary w-full rounded-tr-none rounded-tl-none"
				@click="onChange"
			>
				Выбрать
			</button>
		</DialogContent>
	</Dialog>
</template>

<script>
import dayjs from 'dayjs'
import 'dayjs/locale/ru' // чтобы dayjs работал с русскими локалями (если надо)
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { SmoothPicker } from 'vue-smooth-picker'
import 'vue-smooth-picker/style.css'

export default {
	props: ['modelValue'],
	components: {
		SmoothPicker,
		Dialog,
		DialogContent,
		DialogDescription,
		DialogFooter,
		DialogHeader,
		DialogTitle,
		DialogTrigger,
	},
	data() {
		const today = dayjs()

		const monthNames = [
			'Январь',
			'Февраль',
			'Март',
			'Апрель',
			'Май',
			'Июнь',
			'Июль',
			'Август',
			'Сентябрь',
			'Октябрь',
			'Ноябрь',
			'Декабрь',
		]

		const years = Array.from({ length: 5 }, (_, i) => today.year() + i)
		const monthIndex = today.month() // 0-11
		const daysInMonth = today.daysInMonth()
		const dayIndex = today.date() - 1

		return {
			open: false,
			value: '',
			monthNames,
			options: [
				{
					list: years.map(y => ({ value: y.toString() })),
					currentIndex: 0,
				},
				{
					list: monthNames.map((name, idx) => ({
						value: name,
						monthNumber: idx + 1,
					})),
					currentIndex: monthIndex,
				},
				{
					list: Array.from({ length: daysInMonth }, (_, i) => ({
						value: (i + 1).toString().padStart(2, '0'),
					})),
					currentIndex: dayIndex,
				},
			],
		}
	},
	methods: {
		handleChange(groupIndex, itemIndex) {
			this.options[groupIndex].currentIndex = itemIndex

			// Обновляем количество дней при изменении года или месяца
			if (groupIndex === 0 || groupIndex === 1) {
				const year = parseInt(
					this.options[0].list[this.options[0].currentIndex].value
				)
				const monthNumber =
					this.options[1].list[this.options[1].currentIndex].monthNumber
				const daysInMonth = dayjs(`${year}-${monthNumber}-01`).daysInMonth()

				this.options[2].list = Array.from({ length: daysInMonth }, (_, i) => ({
					value: (i + 1).toString().padStart(2, '0'),
				}))

				if (this.options[2].currentIndex >= daysInMonth) {
					this.options[2].currentIndex = daysInMonth - 1
				}
			}

			const year = this.options[0].list[this.options[0].currentIndex].value
			const monthNumber =
				this.options[1].list[this.options[1].currentIndex].monthNumber
			const day = this.options[2].list[this.options[2].currentIndex].value

			const selectedDate = dayjs(`${year}-${monthNumber}-${day}`)

			if (selectedDate.isBefore(dayjs(), 'day')) {
				this.resetToToday()
			} else {
				this.value = selectedDate.format('YYYY-MM-DD')
			}
		},
		onChange() {
			this.$emit('update:modelValue', this.value)
			this.open = false
		},
		resetToToday() {
			const today = dayjs()

			this.options[0].currentIndex = 0
			this.options[1].currentIndex = today.month()
			this.options[2].list = Array.from(
				{ length: today.daysInMonth() },
				(_, i) => ({
					value: (i + 1).toString().padStart(2, '0'),
				})
			)
			this.options[2].currentIndex = today.date() - 1

			this.value = today.format('YYYY-MM-DD')
		},
	},
	mounted() {
		this.resetToToday()
	},
}
</script>
