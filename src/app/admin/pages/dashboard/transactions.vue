<template>
	<div class="flex">
		<div class="flex gap-2 mb-10">
			<h1 class="text-2xl font-semibold">Платежи</h1>
		</div>

		<div class="flex gap-2 ml-auto">
			<div class="flex items-center" v-if="filtering">
				<span class="loading loading-spinner text-primary w-4 h-4"></span>
			</div>
			<Select v-model="filter.status" @update:modelValue="onSearch">
				<SelectTrigger class="min-h-[40px]">
					<SelectValue placeholder="Статус" />
				</SelectTrigger>
				<SelectContent>
					<template v-for="(item, index) in status().list" :key="index">
						<SelectItem :value="item.value">
							{{ item.name }}
						</SelectItem>
					</template>
				</SelectContent>
			</Select>
			<label class="input border">
				<Icon name="Search" :size="16" />
				<input
					v-model="filter.search"
					type="text"
					class="grow"
					placeholder="Поиск по id"
					v-debounce:500ms="onSearch"
				/>
			</label>
		</div>
	</div>

	<div v-if="loading" class="flex justify-center">
		<span class="loading loading-spinner text-primary"></span>
	</div>

	<div role="alert" class="alert" v-if="!loading && transactions === null">
		<Icon name="Info" class="min-size-4 text-primary" />
		<span>На данный момент нет отзывов. Вернитесь позже</span>
	</div>

	<template v-if="!loading && transactions !== null">
		<Table :data="transactions" />
		<Pagination
			v-slot="{ page }"
			v-model:page="pagination.page"
			:items-per-page="pagination.itemsPerPage"
			:total="pagination.total"
			:default-page="pagination.page"
			@update:page="handlePageChange"
			v-if="pagination.total > pagination.itemsPerPage"
		>
			<PaginationContent v-slot="{ items }">
				<PaginationPrevious class="hover:bg-gray-200" />

				<template v-for="(item, index) in items" :key="index">
					<PaginationItem
						v-if="item.type === 'page'"
						:value="item.value"
						:is-active="item.value === page"
						class="hover:bg-gray-200"
					>
						{{ item.value }}
					</PaginationItem>
				</template>

				<PaginationEllipsis :index="4" />

				<PaginationNext class="hover:bg-gray-200" />
			</PaginationContent>
		</Pagination>
	</template>
</template>

<script>
import { TransactionService } from '../../services/transaction.service'
import Table from '../../components/Transactions/Table.vue'
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination'
import { status } from '@/utils/transaction'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import vueDebounce from 'vue-debounce'

export default {
	components: {
		Table,
		Pagination,
		PaginationContent,
		PaginationEllipsis,
		PaginationItem,
		PaginationNext,
		PaginationPrevious,
		Select,
		SelectContent,
		SelectGroup,
		SelectItem,
		SelectLabel,
		SelectTrigger,
		SelectValue,
	},
	directives: {
		debounce: vueDebounce({ lock: true }),
	},
	data: () => ({
		transactionService: new TransactionService(),
		loading: true,
		filtering: false,
		transactions: null,
		status,
		filter: {
			status: '',
			search: '',
		},
		pagination: {
			page: 1,
			itemsPerPage: 30,
			total: 0,
		},
	}),
	created() {
		this.getAll()
	},
	methods: {
		async getAll() {
			const response = await this.transactionService.getAll(this.filter, {
				page: this.pagination.page,
				limit: this.pagination.itemsPerPage,
			})
			if (response) {
				const { data, total } = response
				this.transactions = data
				this.pagination.total = total
				this.loading = false
			}
		},
		async onSearch() {
			this.filtering = true
			this.getAll()
			this.filtering = false
		},
		async handlePageChange() {
			this.filtering = true
			this.getAll()
			this.filtering = false
		},
	},
}
</script>
