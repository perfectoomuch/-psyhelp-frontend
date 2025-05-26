<template>
	<div class="flex justify-between">
		<h1 class="text-2xl font-semibold mb-10">Все пользователи</h1>
		<form @submit.prevent="onSearch" class="flex gap-2">
			<label class="input border">
				<Icon name="Search" :size="16" />
				<input
					v-model="search.text"
					type="text"
					class="grow"
					placeholder="id, email, username"
				/>
			</label>
			<button class="btn">Поиск</button>
		</form>
	</div>

	<div v-if="loading" class="flex justify-center">
		<span class="loading loading-spinner text-primary"></span>
	</div>

	<div role="alert" class="alert" v-if="!loading && customersMap.length === 0">
		<Info class="min-size-4 text-primary" />
		<span>На данный момент нет пользователей. Вернитесь позже</span>
	</div>

	<template v-if="!loading && customersMap.length > 0">
		<div class="overflow-x-auto">
			<table class="table table-sm">
				<thead>
					<tr>
						<th class="font-medium">ID</th>
						<th class="font-medium">Chat ID</th>
						<th class="font-medium">Логин</th>
						<th class="font-medium">Email</th>
						<th class="font-medium">Имя и фамилия</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item, index) in customersMap" :key="index">
						<td>
							{{ item.id }}
						</td>
						<td>
							{{ item.chat_id }}
						</td>
						<td>
							<a class="text-primary" :href="`https://t.me/${item.username}`">
								@{{ item.username }}
							</a>
						</td>
						<td>
							<a
								v-if="item.email"
								class="text-primary"
								:href="`mailto:${item.email}`"
							>
								{{ item.email }}
							</a>
							<span v-else>—</span>
						</td>
						<td>
							{{ item.first_name }}
							{{ item.last_name }}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</template>
</template>

<script>
import { CustomerService } from '../../services/customer.service'
export default {
	data: () => ({
		customerService: new CustomerService(),
		loading: true,
		customers: [],
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
		customersMap() {
			if (this.search.used) {
				return this.search.result
			}
			return this.customers
		},
	},
	methods: {
		async getAll() {
			this.customers = await this.customerService.getAll()
			this.loading = false
		},
		async onSearch() {
			if (this.search.text.trim().length === 0) {
				this.search.result = []
				this.search.used = false

				return
			}
			this.search.result = await this.customerService.getBySearch(
				this.search.text
			)
			console.log(this.search.result)

			this.search.used = true
		},
	},
}
</script>
