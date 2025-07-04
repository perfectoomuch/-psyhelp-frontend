<template>
	<div class="flex items-center gap-2 mb-10">
		<h1 class="text-2xl font-semibold">Отзывы</h1>
	</div>

	<div v-if="loading" class="flex justify-center">
		<span class="loading loading-spinner text-primary"></span>
	</div>

	<div role="alert" class="alert" v-if="!loading && reviews === null">
		<Icon name="Info" class="min-size-4 text-primary" />
		<span>На данный момент нет отзывов. Вернитесь позже</span>
	</div>

	<Tabs
		class="w-full"
		v-model="filter.status"
		@update:modelValue="handleTabChange"
		v-if="!loading && reviews !== null"
	>
		<TabsList class="bg-gray-200/80 mb-5">
			<TabsTrigger value="moderation">
				На модерации
				<template v-if="filter.status === 'moderation'">
					({{ pagination.total }})
				</template>
			</TabsTrigger>
			<TabsTrigger value="approved">
				Опубликовано
				<template v-if="filter.status === 'approved'">
					({{ pagination.total }})
				</template>
			</TabsTrigger>
			<TabsTrigger value="failed">
				Провален
				<template v-if="filter.status === 'failed'">
					({{ pagination.total }})
				</template>
			</TabsTrigger>
		</TabsList>
		<Table :data="reviews" @update="getAll" />

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
	</Tabs>
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import StarRating from 'vue-star-rating'
import { ReviewService } from '../../services/review.service'
import Table from '../../components/Reviews/Table.vue'
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination'

export default {
	components: {
		Dialog,
		DialogContent,
		DialogDescription,
		DialogFooter,
		DialogHeader,
		DialogTitle,
		DialogTrigger,
		Tabs,
		TabsContent,
		TabsList,
		TabsTrigger,
		StarRating,
		Table,
		Pagination,
		PaginationContent,
		PaginationEllipsis,
		PaginationItem,
		PaginationNext,
		PaginationPrevious,
	},
	data: () => ({
		reviewService: new ReviewService(),
		loading: true,
		reviews: null,
		filter: {
			status: 'approved',
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
			const response = await this.reviewService.getAll(this.filter, {
				page: this.pagination.page,
				limit: this.pagination.itemsPerPage,
			})

			if (response) {
				this.reviews = response.data
				this.pagination.total = response.total
				this.loading = false
			}
		},
		async handleTabChange() {
			this.loading = true
			this.pagination = {
				page: 1,
				itemsPerPage: 30,
				total: 0,
			}
			await this.getAll()
		},
		async handlePageChange() {
			this.loading = true
			await this.getAll()
		},
	},
}
</script>
