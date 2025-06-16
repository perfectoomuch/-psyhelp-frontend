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

	<Tabs class="w-full" v-model="tab" v-if="!loading && reviews !== null">
		<TabsList class="bg-gray-200/80 mb-5">
			<TabsTrigger value="moderation">
				На модерации ({{ reviews.moderation.length }})
			</TabsTrigger>
			<TabsTrigger value="approved">
				Опубликовано ({{ reviews.approved.length }})
			</TabsTrigger>
			<TabsTrigger value="failed">
				Провален ({{ reviews.failed.length }})
			</TabsTrigger>
		</TabsList>
		<TabsContent value="moderation">
			<Table :data="reviews.moderation" @update="getAll" />
		</TabsContent>
		<TabsContent value="approved">
			<Table :data="reviews.approved" @update="getAll" />
		</TabsContent>
		<TabsContent value="failed">
			<Table :data="reviews.failed" @update="getAll" />
		</TabsContent>
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
	},
	data: () => ({
		reviewService: new ReviewService(),
		loading: true,
		reviews: null,
		tab: 'moderation',
	}),
	created() {
		this.getAll()
	},
	methods: {
		async getAll() {
			const response = await this.reviewService.getAll()
			if (response) {
				this.reviews = response
				this.loading = false
			}
		},
	},
}
</script>
