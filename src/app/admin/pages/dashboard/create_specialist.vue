<template>
	<div class="flex justify-between">
		<div class="flex flex-col mb-10">
			<h1 class="text-2xl font-semibold">Добавить специалиста</h1>
		</div>
		<button class="btn" @click="onSave" :disabled="loading">
			<span
				class="loading loading-spinner text-primary w-4 opacity-50"
				v-show="loading"
			></span>

			Добавить
		</button>
	</div>

	<div v-if="loading && item === null" class="flex justify-center">
		<span class="loading loading-spinner text-primary"></span>
	</div>

	<div v-if="!loading && item !== null" class="grid grid-cols-2 gap-4">
		<SpecialistForm ref="form" />
	</div>
</template>

<style lang="scss" scoped>
.input {
	width: 100%;
}
</style>

<script>
import { SpecialistService } from '../../services/specialist.service'
import SpecialistForm from '../../components/Specialist/Form.vue'

export default {
	components: {
		SpecialistForm,
	},
	data: () => ({
		specialistService: new SpecialistService(),
		loading: false,
		saveLoading: false,
	}),
	computed: {},
	methods: {
		async onSave() {
			const data = await this.$refs.form.getData()
			if (data) {
				const { payload, id } = data
				this.loading = true
				const resultId = await this.specialistService.create(payload)
				if (resultId) {
					this.$router.push(`/admin/dashboard/specialists/${resultId}`)
				}
			}
		},
	},
}
</script>
