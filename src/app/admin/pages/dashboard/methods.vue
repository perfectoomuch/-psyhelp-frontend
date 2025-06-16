<template>
	<div class="flex justify-between">
		<div class="flex items-center gap-2 mb-10">
			<h1 class="text-2xl font-semibold">Методы лечения</h1>
		</div>

		<AlertDialog>
			<AlertDialogTrigger class="btn btn-primary">
				<Icon name="Plus" :size="14" />
				Добавить
			</AlertDialogTrigger>
			<AlertDialogContent class="w-sm">
				<AlertDialogHeader>
					<AlertDialogTitle>Добавить метод</AlertDialogTitle>
				</AlertDialogHeader>
				<div class="flex flex-col">
					<input
						class="input border w-full"
						v-model="form.name"
						placeholder="Метод"
						required
					/>
				</div>
				<AlertDialogFooter>
					<AlertDialogCancel class="hover:bg-gray-100">
						Отмена
					</AlertDialogCancel>
					<AlertDialogAction @click="onCreate" class="text-white">
						Добавить
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	</div>

	<div v-if="loading" class="flex justify-center">
		<span class="loading loading-spinner text-primary"></span>
	</div>

	<div role="alert" class="alert" v-if="!loading && methods.length === 0">
		<Icon name="Info" class="min-size-4 text-primary" />
		<span>На данный момент нет методов. Добавьте метод</span>
	</div>

	<template v-if="!loading && methods.length > 0">
		<div class="overflow-x-auto">
			<table class="table table-sm">
				<thead>
					<tr>
						<th class="font-medium">ID</th>
						<th class="font-medium">Метод</th>
						<th class="font-medium">Действие</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item, index) in methods" :key="index">
						<td>
							<span class="whitespace-nowrap">
								{{ item.id }}
							</span>
						</td>
						<td>
							{{ item.name }}
						</td>
						<td>
							<div class="flex gap-2">
								<AlertDialog>
									<AlertDialogTrigger class="btn btn-sm btn-square btn-primary">
										<Icon name="Pencil" :size="14" />
									</AlertDialogTrigger>
									<AlertDialogContent class="w-sm">
										<AlertDialogHeader>
											<AlertDialogTitle>Редактировать метод</AlertDialogTitle>
										</AlertDialogHeader>
										<div class="flex flex-col">
											<input
												class="input border w-full"
												v-model="item.name"
												required
											/>
										</div>
										<AlertDialogFooter>
											<AlertDialogCancel class="hover:bg-gray-100">
												Отмена
											</AlertDialogCancel>
											<AlertDialogAction
												@click="onUpdate(index)"
												class="text-white"
											>
												Сохранить
											</AlertDialogAction>
										</AlertDialogFooter>
									</AlertDialogContent>
								</AlertDialog>
								<Popover>
									<PopoverTrigger
										class="btn btn-sm btn-square btn-error btn-soft"
									>
										<Icon name="Trash" :size="14" />
									</PopoverTrigger>
									<PopoverContent>
										<p class="text-sm mb-4">
											Вы точно хотите удалить данного метода?
										</p>
										<button
											class="btn btn-sm btn-error w-full"
											@click="onDelete(item.id)"
										>
											Да, удалить
										</button>
									</PopoverContent>
								</Popover>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</template>
</template>

<script>
import { MethodService } from '../../services/method.service'
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
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'

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
		Popover,
		PopoverContent,
		PopoverTrigger,
	},
	data: () => ({
		methodService: new MethodService(),
		loading: true,
		methods: [],
		form: {
			name: '',
		},
	}),
	created() {
		this.getAll()
	},
	methods: {
		async getAll() {
			const data = await this.methodService.getAll()
			if (data) {
				this.methods = data
				this.loading = false
			}
		},
		async onUpdate(index) {
			const method = this.methods[index]
			const id = method.id
			const payload = { ...method }
			delete payload.id
			delete payload.created_at
			delete payload.updated_at

			const data = await this.methodService.update(id, payload)
			if (data) {
				await this.getAll()
			}
		},
		async onCreate() {
			if (this.form.name.trim().length == 0) {
				this.$toast.info('Заполните название лечении')
				return
			}

			const data = await this.methodService.create(this.form)
			if (data) {
				await this.getAll()
			}
		},
		async onDelete(id) {
			await this.methodService.delete(id)
			await this.getAll()
		},
	},
}
</script>
