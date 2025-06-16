<template>
	<Dialog v-model:open="open">
		<DialogTrigger>
			<slot />
		</DialogTrigger>
		<DialogContent
			class="bg-white w-fit p-0 rounded-xl overflow-hidden min-w-sm"
			hideClose="true"
		>
			<div class="grid grid-cols-2">
				<span class="pl-2 text-sm whitespace-nowrap flex items-center">
					Выберите время (по МСК):
				</span>
				<div>
					<smooth-picker :data="options" @onChange="handleChange" />
				</div>
			</div>
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
	data: () => ({
		open: false,
		value: '10:00',
		options: [
			{
				list: [
					{ value: '09:00' },
					{ value: '10:00' },
					{ value: '11:00' },
					{ value: '12:00' },
					{ value: '13:00' },
					{ value: '14:00' },
					{ value: '15:00' },
					{ value: '16:00' },
					{ value: '17:00' },
					{ value: '18:00' },
					{ value: '19:00' },
					{ value: '20:00' },
					{ value: '21:00' },
					{ value: '22:00' },
					{ value: '23:00' },
					// { value: '09' },
					// { value: '10' },
					// { value: '11' },
					// { value: '12' },
					// { value: '13' },
					// { value: '14' },
					// { value: '15' },
					// { value: '16' },
					// { value: '17' },
					// { value: '18' },
					// { value: '19' },
					// { value: '20' },
					// { value: '21' },
					// { value: '22' },
					// { value: '23' },
				],
				currentIndex: 1,
			},
			// {
			// 	list: [
			// 		{ value: '00' },
			// 		{ value: '30' },
			// 		// { value: '00' },
			// 		// { value: '05' },
			// 		// { value: '10' },
			// 		// { value: '15' },
			// 		// { value: '20' },
			// 		// { value: '25' },
			// 		// { value: '30' },
			// 		// { value: '35' },
			// 		// { value: '40' },
			// 		// { value: '45' },
			// 		// { value: '50' },
			// 		// { value: '55' },
			// 	],
			// 	currentIndex: 3,
			// },
		],
	}),
	computed: {},
	methods: {
		onChange() {
			this.$emit('update:modelValue', this.value)
			this.open = false
		},
		handleChange(groupIndex, itemIndex) {
			this.options[groupIndex].currentIndex = itemIndex
			const selectedHourIndex = this.options[0].currentIndex
			// const selectedMinuteIndex = this.options[1].currentIndex

			const hours = this.options[0].list[selectedHourIndex].value
			// const minutes = this.options[1].list[selectedMinuteIndex].value
			// this.value = `${hours}:${minutes}`
			// this.value = `${hours}:00`
			this.value = hours
		},
	},
}
</script>
