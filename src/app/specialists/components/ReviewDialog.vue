<template>
	<Dialog v-model:open="open">
		<DialogContent
			class="bg-white top-10 translate-y-0 grid-rows-[auto_minmax(0,1fr)_auto] max-h-[85dvh]"
		>
			<DialogHeader>
				<DialogTitle>Отзывы</DialogTitle>
			</DialogHeader>

			<Tabs class="w-full" v-model="tab">
				<TabsList class="w-full bg-gray-200/80 mb-5">
					<TabsTrigger value="create"> Оставить отзыв </TabsTrigger>
					<TabsTrigger value="reviews"> Отзывы </TabsTrigger>
				</TabsList>
				<TabsContent value="create">
					<div
						class="flex flex-col items-center justify-center gap-4 text-center"
						v-if="showSuccessAlert"
					>
						<Check />
						<div class="flex flex-col items-center justify-center gap-2">
							<h3 class="text-lg font-semibold">Отзыв отправлен</h3>
							<p class="mb-10">
								Ваш отзыв находится на модерации, спасибо что поделились мнением
							</p>

							<button class="btn btn-soft btn-primary" @click="onCloseAlert">
								Понятно
							</button>
						</div>
					</div>
					<form v-else @submit.prevent="onSubmit" class="flex flex-col gap-4">
						<div class="flex flex-col gap-2">
							<label class="label">Имя</label>
							<input
								class="input border w-full"
								placeholder="Ваше имя"
								v-model="form.name"
								required
							/>
						</div>
						<div class="flex items-center gap-2">
							<label class="label">Ваш рейтинг:</label>
							<star-rating
								v-model:rating="form.stars"
								:star-size="18"
								:show-rating="false"
							/>
						</div>
						<div class="flex flex-col gap-2">
							<label class="label">Отзыв</label>

							<textarea
								class="textarea min-h-[150px] w-full"
								placeholder="Ваш отзыв"
								v-model="form.review"
								required
							></textarea>
						</div>

						<button
							class="btn btn-primary w-full"
							type="submit"
							:disabled="loading"
						>
							<span
								v-if="loading"
								class="loading loading-sm loading-spinner"
							></span>
							<template v-else> Отправить </template>
						</button>
					</form>
				</TabsContent>
				<TabsContent value="reviews" class="overflow-y-auto">
					<div role="alert" class="alert" v-if="reviews.length === 0">
						<Icon name="Info" class="min-size-4 text-primary" />
						<span>На данный момент нет отзывов. Вернитесь позже</span>
					</div>
					<div class="flex flex-col gap-4" v-if="reviews.length > 0">
						<div
							class="flex flex-col bg-gray-100 rounded-lg p-4"
							v-for="(item, index) in reviews"
							:key="index"
						>
							<span class="text-lg uppercase mb-2">{{ item.name }}</span>
							<div class="flex items-center gap-2">
								<span class="opacity-65">Дата:</span>
								{{
									item?.date
										? $dayjs(item.date).format('D MMM YYYY, HH:mm')
										: $dayjs(item.created_at).format('DD MMM YYYY, HH:mm')
								}}
							</div>
							<div class="flex items-center gap-2">
								<span class="opacity-65">Оценка:</span>
								<star-rating
									v-model:rating="item.stars"
									:star-size="18"
									:show-rating="false"
									:read-only="true"
								/>
							</div>
							<p>
								<span class="opacity-65">Отзыв:</span>
								{{ item.review }}
							</p>
						</div>
					</div>
				</TabsContent>
			</Tabs>
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import StarRating from 'vue-star-rating'
import { ReviewsService } from '../services/review.service'
import Check from '@/components/Animation/Check.vue'

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
		Check,
	},
	data: () => ({
		reviewService: new ReviewsService(),
		open: false,
		tab: 'create',
		reviews: [],
		showSuccessAlert: false,
		loading: false,
		form: {
			name: '',
			stars: 5,
			review: '',
			specialist: '',
		},
	}),
	methods: {
		openModal(data) {
			const { reviews, tab, specialist } = data
			if (!specialist) {
				this.$toast.error('Специалист не найден')
				return
			}
			this.form.specialist = specialist
			if (reviews) {
				this.reviews = reviews
			}
			if (tab) {
				this.tab = tab
			}
			this.open = true
		},
		async onSubmit() {
			this.loading = true
			const response = await this.reviewService.create(this.form)
			this.showSuccessAlert = response
			this.loading = false
		},
		onCloseAlert() {
			this.form = {
				name: '',
				stars: 5,
				review: '',
			}
			this.showSuccessAlert = false
		},
	},
}
</script>
