<template>
	<div class="flex gap-2">
		<div class="flex flex-col mb-10">
			<h1 class="text-2xl font-semibold">Специалисты</h1>
			<span v-if="item" class="text-sm opacity-65"> ID: {{ item.id }} </span>
		</div>
		<button
			type="button"
			class="btn btn-square ml-auto"
			@click="$router.push('/admin/dashboard/specialists/add')"
		>
			<Icon name="Plus" :size="14" />
		</button>
		<button class="btn btn-primary" @click="onSave" :disabled="saveLoading">
			<span
				class="loading loading-spinner text-primary"
				v-show="saveLoading"
			></span>

			Сохранить
		</button>
		<AlertDialog>
			<AlertDialogTrigger class="btn btn-error">
				<span
					class="loading loading-spinner text-primary"
					v-show="saveLoading"
				></span>

				Удалить
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Вы точно хотите удалить?</AlertDialogTitle>
					<AlertDialogDescription>
						Запись будет удален безвозвратно
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel class="hover:bg-gray-100"
						>Отмена</AlertDialogCancel
					>
					<AlertDialogAction @click="onDelete" class="text-white"
						>Продолжить</AlertDialogAction
					>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	</div>

	<div v-if="loading && item === null" class="flex justify-center">
		<span class="loading loading-spinner text-primary"></span>
	</div>

	<div v-if="!loading && item !== null" class="grid grid-cols-2 gap-4">
		<SpecialistForm :data="item" @save="onSave" ref="form" />
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
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

export default {
	components: {
		AlertDialog,
		AlertDialogAction,
		AlertDialogCancel,
		AlertDialogContent,
		AlertDialogDescription,
		AlertDialogFooter,
		AlertDialogHeader,
		AlertDialogTitle,
		AlertDialogTrigger,
		SpecialistForm,
	},
	data: () => ({
		specialistService: new SpecialistService(),
		loading: true,
		item: null,
		saveLoading: false,
	}),
	async created() {
		await this.getItem()
	},
	methods: {
		async getItem() {
			this.item = await this.specialistService.getById(this.$route.params.id)
			this.loading = false
		},
		async onSave() {
			const data = await this.$refs.form.getData()
			if (data) {
				this.saveLoading = true
				const { payload, id } = data
				await this.specialistService.updateById(id, payload)
				await this.getItem()
				this.saveLoading = false
			}
		},
		async onDelete() {
			await this.specialistService.deleteById(this.item.id)
			this.$router.push('/admin/dashboard/specialists')
		},
	},
}
</script>
