<template>
	<div class="overflow-x-auto">
		<table class="table table-sm">
			<thead>
				<tr>
					<th class="font-medium">Дата</th>
					<th class="font-medium">Имя</th>
					<th class="font-medium">Рейтинг</th>
					<th class="font-medium">Специалист</th>
					<th class="font-medium">Статус</th>
					<th class="font-medium">Действие</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(item, index) in data" :key="index">
					<td>
						{{ $dayjs(item.created_at).format('DD-MM-YYYY HH:mm:ss') }} <br />
						<span class="text-xs opacity-55">{{ item.id }}</span>
					</td>
					<td>
						{{ item.name }}
					</td>
					<td>
						<star-rating
							v-model:rating="item.stars"
							:star-size="18"
							:show-rating="false"
							:read-only="true"
						/>
					</td>
					<td>
						<Popover>
							<PopoverTrigger as-child>
								<span class="whitespace-nowrap text-primary cursor-pointer">
									{{ item.specialist?.first_name }}
									{{ item.specialist?.last_name }}
								</span>
							</PopoverTrigger>
							<PopoverContent class="w-80">
								<div class="grid gap-4">
									<div class="space-y-2">
										<h4 class="text-sm font-medium leading-none">
											ID: {{ item.specialist.id }}
										</h4>
										<p class="text-sm text-muted-foreground">
											Информация о специалисте
										</p>
									</div>
									<div class="grid gap-2">
										<img
											:src="$file(item.specialist.photo)"
											alt=""
											class="w-[90px] h-[90px] rounded-lg mb-2 object-cover"
											v-if="item.specialist.photo"
										/>
										<div class="grid grid-cols-3 items-center gap-4 text-sm">
											<span>Профессия</span>
											<span class="col-span-2">
												{{ getProfession(item.specialist.profession) }}
											</span>
											<span>Цена</span>
											<span class="col-span-2">
												{{ $currency(item.specialist.price) }}
											</span>
										</div>
									</div>
									<router-link
										:to="`/admin/dashboard/specialists/${item.specialist.id}`"
										class="btn w-full btn-primary"
									>
										Открыть профиль
									</router-link>
								</div>
							</PopoverContent>
						</Popover>
					</td>
					<td>
						<DropdownMenu>
							<DropdownMenuTrigger>
								<span class="whitespace-nowrap flex items-center gap-2">
									{{ status(item.status).getStatusByValue.name }}
									<Icon name="ChevronDown" :size="14" />
								</span>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuLabel class="text-sm">
									Изменить статус
								</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem
									v-for="(status, j) in statusList"
									:key="j"
									class="hover:bg-gray-100"
									@click="updateReviewStatus(item.id, status.value)"
								>
									{{ status.name }}
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</td>
					<td>
						<div class="flex gap-2">
							<Popover>
								<PopoverTrigger
									class="btn btn-square btn-sm btn-error btn-soft"
								>
									<Icon name="Trash" :size="16" />
								</PopoverTrigger>
								<PopoverContent>
									<p class="text-sm mb-4">Вы точно хотите удалить?</p>
									<button
										class="btn btn-sm btn-error w-full"
										@click="deleteById(item.id)"
									>
										Да, удалить
									</button>
								</PopoverContent>
							</Popover>
							<button
								class="btn btn-square btn-sm btn-primary"
								@click="onOpen(item)"
							>
								<Icon name="ExternalLink" :size="16" />
							</button>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>

	<Dialog v-model:open="dialog">
		<DialogContent class="w-sm">
			<form
				@submit.prevent="updateById"
				class="flex flex-col gap-4"
				v-if="review !== null"
			>
				<div class="flex flex-col gap-2">
					<label class="label">Имя</label>
					<input
						class="input border w-full"
						placeholder="Имя пользователя"
						v-model="review.name"
						required
					/>
				</div>
				<div class="flex flex-col gap-2">
					<label class="label">Рейтинг</label>
					<star-rating
						v-model:rating="review.stars"
						:star-size="22"
						:show-rating="false"
					/>
				</div>
				<div class="flex flex-col gap-2">
					<label class="label">Отзыв</label>
					<textarea
						class="textarea border min-h-[150px] w-full"
						placeholder="Текст отзыва"
						v-model="review.review"
						required
					></textarea>
				</div>
				<div class="flex flex-col gap-2">
					<label class="label">Специалист</label>
					<div class="flex gap-2">
						<input
							class="input border w-full"
							placeholder="Ваше имя"
							:value="`${review.customer.first_name} ${review.customer.last_name}`"
							disabled
							readonly
						/>
						<router-link
							:to="`/admin/dashboard/specialists/${review.specialist.id}`"
							class="btn btn-primary"
						>
							Открыть
						</router-link>
					</div>
				</div>
				<div class="flex flex-col gap-2">
					<label class="label">Статус</label>
					<div class="flex gap-2">
						<input
							class="input border w-full"
							placeholder="Ваше имя"
							:value="status(review.status).getStatusByValue.name"
							disabled
							readonly
						/>

						<DropdownMenu>
							<DropdownMenuTrigger class="btn btn-primary">
								Выбрать
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuLabel class="text-sm">
									Изменить статус
								</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem
									v-for="(status, j) in statusList"
									:key="j"
									class="hover:bg-gray-100"
									@click="setReviewStatus(review.id, status.value)"
								>
									{{ status.name }}
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
				<div class="flex flex-col gap-2">
					<label class="label">Дата</label>
					<MaterializeDatepicker v-model="review.date" :allPeriod="true">
						<input
							class="input border w-full"
							placeholder="Дата отзыва"
							:value="$dayjs(review.date).format('DD MMM YYYY')"
							readonly
						/>
					</MaterializeDatepicker>
				</div>
				<div class="flex flex-col gap-2">
					<label class="label">Время</label>
					<input
						class="input border w-full"
						placeholder="Время отзыва"
						v-model="time"
						v-maska="'##:##'"
					/>
				</div>
				<button
					class="btn btn-primary w-full btn-soft"
					type="submit"
					:disabled="reviewSaving"
				>
					<span
						v-if="reviewSaving"
						class="loading loading-sm loading-spinner"
					></span>
					<template v-else> Сохранить </template>
				</button>
			</form>
		</DialogContent>
	</Dialog>
</template>

<script>
import StarRating from 'vue-star-rating'
import { profession } from '@/utils/specialist'
import { status } from '@/utils/reviews'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { ReviewService } from '../../services/review.service'
import MaterializeDatepicker from '@/components/Pickers/MaterializeDatepicker.vue'

export default {
	props: ['data'],
	components: {
		StarRating,
		Popover,
		PopoverContent,
		PopoverTrigger,
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuItem,
		DropdownMenuLabel,
		DropdownMenuSeparator,
		DropdownMenuTrigger,
		Dialog,
		DialogContent,
		DialogDescription,
		DialogFooter,
		DialogHeader,
		DialogTitle,
		DialogTrigger,
		MaterializeDatepicker,
	},
	data: () => ({
		reviewService: new ReviewService(),
		status,
		profession,
		dialog: false,
		review: null,
		reviewSaving: false,
		time: '',
	}),
	computed: {
		statusList() {
			return this.status().list
		},
	},
	methods: {
		getProfession(array) {
			return this.profession(array)
				.getProfessionByValue.map(el => el.name)
				.join(', ')
		},
		onOpen(item) {
			this.review = item
			this.dialog = true

			const reviewDateTime = this.$dayjs(this.review.date)
				.format('YYYY-MM-DD HH:mm')
				.split(' ')
			const date = reviewDateTime[0]
			const time = reviewDateTime[1]

			this.review.date = this.$dayjs(date).toDate()
			this.time = time
		},
		setReviewStatus(id, status) {
			this.review.status = status
		},
		async updateById() {
			const id = this.review.id

			const date = this.$dayjs(this.review.date).format('YYYY-MM-DD')
			const time = this.time

			const reviewDate = this.$dayjs(`${date} ${time}`).toDate()

			const payload = {
				name: this.review.name,
				stars: this.review.stars,
				review: this.review.review,
				status: this.review.status,
				date: reviewDate,
			}

			const response = await this.reviewService.updateById(id, payload)
			if (response) {
				this.$emit('update')
			}
		},
		async updateReviewStatus(id, status) {
			const payload = {
				status,
			}
			const response = await this.reviewService.updateById(id, payload)
			if (response) {
				this.$emit('update')
			}
		},
		async deleteById(id) {
			const response = await this.reviewService.deleteById(id)
			if (response) {
				this.$emit('update')
			}
		},
	},
}
</script>
