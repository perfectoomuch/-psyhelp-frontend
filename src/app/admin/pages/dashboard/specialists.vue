<template>
	<div class="flex">
		<div class="flex items-center gap-2 mb-10">
			<h1 class="text-2xl font-semibold">Специалисты</h1>
		</div>

		<form @submit.prevent="onSearch" class="flex gap-2 ml-auto">
			<button
				type="button"
				class="btn btn-square mr-2"
				@click="$router.push('/admin/dashboard/specialists/add')"
			>
				<Icon name="Plus" :size="14" />
			</button>

			<label class="input border">
				<Icon name="Search" :size="16" />
				<input
					v-model="search.text"
					type="text"
					class="grow"
					placeholder="id, email, имя, фамилия"
				/>
			</label>
			<button type="submit" class="btn">Поиск</button>
		</form>
	</div>

	<div v-if="loading" class="flex justify-center">
		<span class="loading loading-spinner text-primary"></span>
	</div>

	<div
		role="alert"
		class="alert"
		v-if="!loading && specialistsMap.length === 0"
	>
		<Info class="min-size-4 text-primary" />
		<span>На данный момент нет специалистов. Добавьте специалиста</span>
	</div>

	<template v-if="!loading && specialistsMap.length > 0">
		<div class="overflow-x-auto">
			<table class="table table-sm">
				<thead>
					<tr>
						<th class="font-medium">Имя</th>
						<th class="font-medium">Возраст</th>
						<th class="font-medium">Опыт</th>
						<th class="font-medium">Цена</th>
						<th class="font-medium">Сессии было</th>
						<th class="font-medium">Действие</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item, index) in specialistsMap" :key="index">
						<td>
							<span class="whitespace-nowrap text-primary cursor-pointer">
								{{ item.first_name }}
							</span>
						</td>
						<td>
							{{ item.age }}
						</td>
						<td>
							{{ item.experience_years }}
						</td>
						<td>
							{{ $currency(item.price) }}
						</td>
						<td>
							{{ item.sessions }}
						</td>
						<td>
							<button
								class="btn btn-sm w-full"
								@click="$router.push(`/admin/dashboard/specialists/${item.id}`)"
							>
								Открыть
							</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</template>
</template>

<script>
import { SpecialistService } from '../../services/specialist.service'
export default {
	data: () => ({
		specialistService: new SpecialistService(),
		loading: true,
		specialists: [],
		search: {
			text: '',
			used: false,
			result: [],
		},
	}),
	async created() {
		await this.getAll()
	},
	computed: {
		specialistsMap() {
			if (this.search.used) {
				return this.search.result
			}
			return this.specialists
		},
	},
	methods: {
		async getAll() {
			this.specialists = await this.specialistService.getAll()
			this.loading = false
		},
		async onSearch() {
			if (this.search.text.trim().length === 0) {
				this.search.result = []
				this.search.used = false

				return
			}
			this.search.result = await this.specialistService.getBySearch(
				this.search.text
			)
			this.search.used = true
		},
	},
}
</script>
