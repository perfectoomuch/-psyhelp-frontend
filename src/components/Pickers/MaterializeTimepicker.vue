<template>
	<Dialog v-model:open="open">
		<DialogTrigger>
			<slot />
		</DialogTrigger>
		<DialogContent
			class="bg-white w-fit p-0 rounded-xl overflow-hidden"
			hideClose="true"
		>
			<time-picker
				class="time-picker"
				v-model="value"
				:automatic="true"
				@change="onChange"
				color="#0082ce"
			/>
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
import { TimePicker } from 'vue-material-time-picker'
import 'vue-material-time-picker/dist/style.css'
export default {
	props: ['modelValue'],
	components: {
		TimePicker,
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
		value: '',
		// date: new Date().toISOString().substring(0, 10),
	}),
	watch: {
		// open(val) {
		// 	if (val) {
		// 		this.init()
		// 	}
		// },
	},
	methods: {
		onChange() {
			this.$emit('update:modelValue', this.value)
			this.open = false
		},
		init() {
			this.$nextTick(() => {
				let els = document.querySelectorAll('.date-picker-header > .button')
				let btns = [...els]
				btns.map((el, index) => {
					console.log(el)

					if (index === 0) {
						el.innerHTML =
							'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left-icon lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>'
					} else if (index === 1) {
						el.innerHTML =
							'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right-icon lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>'
					}
				})
			})
		},
	},
}
</script>
