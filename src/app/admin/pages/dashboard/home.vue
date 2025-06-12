<template>
	<div class="flex justify-between">
		<h1 class="text-2xl font-semibold mb-10">Все заявки</h1>
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

	<div role="alert" class="alert" v-if="!loading && bidsMap.length === 0">
		<Info class="min-size-4 text-primary" />
		<span>На данный момент нет заявок. Вернитесь позже</span>
	</div>

	<template v-if="!loading && bidsMap.length > 0">
		<div class="overflow-x-auto">
			<table class="table table-sm">
				<thead>
					<tr>
						<th class="font-medium">Создано</th>
						<th class="font-medium">Клиент</th>
						<th class="font-medium">Специалист</th>
						<th class="font-medium">Желаемая дата</th>
						<th class="font-medium">Статус</th>
						<th class="font-medium">Детали заявки</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item, index) in bidsMap" :key="index">
						<td>
							{{ $dayjs(item.created_at).format('DD-MM-YYYY HH:mm:ss') }} <br />
							<span class="text-xs opacity-55">{{ item.id }}</span>
						</td>
						<td>
							<Popover>
								<PopoverTrigger as-child>
									<span class="whitespace-nowrap text-primary cursor-pointer">
										{{ item.customer.first_name }}
									</span>
								</PopoverTrigger>
								<PopoverContent class="w-80">
									<div class="grid gap-4">
										<div class="space-y-2">
											<h4 class="text-sm font-medium leading-none">
												ID: {{ item.customer.id }}
											</h4>
											<p class="text-sm text-muted-foreground">
												Информация о клиенте
											</p>
										</div>
										<div class="grid gap-2">
											<div class="grid grid-cols-3 items-center gap-4 text-xs">
												<span>Email</span>
												<span class="col-span-2">
													{{ item.customer.email }}
												</span>
												<template v-if="item.customer.username">
													<span>Username</span>
													<span class="col-span-2 text-primary">
														<a :href="`https://t.me/${item.customer.username}`">
															@{{ item.customer.username }}
														</a>
													</span>
												</template>

												<span>Chat ID</span>
												<span class="col-span-2">
													{{ item.customer.chat_id }}
												</span>
											</div>
										</div>
										<button class="btn w-full btn-primary">
											Отправить сообщение
										</button>
									</div>
								</PopoverContent>
							</Popover>
						</td>
						<td>
							<Popover>
								<PopoverTrigger as-child>
									<span class="whitespace-nowrap text-primary cursor-pointer">
										{{ item.specialist.first_name }}
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
										<button class="btn w-full btn-primary">
											Открыть профиль
										</button>
									</div>
								</PopoverContent>
							</Popover>
						</td>
						<td>
							{{ item.date }}
						</td>
						<td>
							<DropdownMenu>
								<DropdownMenuTrigger>
									<span class="whitespace-nowrap flex items-center gap-2">
										{{ getStatus(item.status) }}
										<Icon name="ChevronDown" :size="14" />
									</span>
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DropdownMenuLabel class="text-sm">
										Изменить статус
									</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuItem
										v-for="(status, j) in getStatusList"
										:key="j"
										class="hover:bg-gray-100"
										@click="updateBidStatusById(item.id, status.value)"
									>
										{{ status.name }}
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</td>
						<td>
							<button class="btn btn-sm w-full" @click="openBid(item.id)">
								Открыть
							</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</template>

	<Sheet v-model:open="drawerOpen">
		<SheetContent class="overflow-y-scroll flex flex-col">
			<template v-if="drawerLoading">
				<div class="flex items-center justify-center flex-1">
					<span class="loading loading-spinner text-primary"></span>
				</div>
			</template>
			<template v-if="!drawerLoading && currentBid !== null">
				<SheetHeader>
					<SheetTitle class="leading-none">
						ID: {{ currentBid.id }}
					</SheetTitle>
					<SheetDescription>Заявка на сессию</SheetDescription>
				</SheetHeader>

				<div class="px-4 pb-4 flex flex-col gap-4 w-full">
					<fieldset
						class="fieldset bg-base-200 border-base-300 rounded-box border p-4"
					>
						<legend class="fieldset-legend">Детали заявки</legend>

						<label class="label">Создано</label>
						<input
							class="input border"
							:value="
								$dayjs(currentBid.created_at).format('DD-MM-YYYY HH:mm:ss')
							"
							readonly
						/>
						<label class="label">Желаемая дата на сессию (по мск)</label>
						<input class="input border" :value="currentBid.date" readonly />

						<label class="label">Статус</label>
						<div class="relative">
							<input
								class="input border"
								:value="getStatus(currentBid.status)"
								readonly
							/>
							<DropdownMenu>
								<DropdownMenuTrigger
									class="btn btn-sm btn-square absolute top-1/2 right-2"
									style="transform: translateY(-50%) !important"
								>
									<Icon name="ChevronDown" :size="16" />
								</DropdownMenuTrigger>
								<DropdownMenuContent side="bottom" align="end">
									<DropdownMenuLabel class="text-sm">
										Изменить статус
									</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuItem
										v-for="(status, j) in getStatusList"
										:key="j"
										class="hover:bg-gray-100"
										@click="updateBidStatusById(currentBid.id, status.value)"
									>
										{{ status.name }}
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>

						<button class="btn btn-accent">Выставить счет на оплату</button>
					</fieldset>

					<fieldset
						class="fieldset bg-base-200 border-base-300 rounded-box border p-4"
					>
						<legend class="fieldset-legend">Клиент</legend>

						<label class="label">Имя</label>
						<input
							class="input border"
							:value="currentBid.customer.first_name"
							readonly
						/>
						<label class="label">Фамилия</label>
						<input
							class="input border"
							:value="currentBid.customer.last_name"
							readonly
						/>
						<label class="label">Email</label>
						<input class="input border" :value="currentBid.customer.email" />

						<label class="label">Telegram username</label>
						<input class="input border" :value="currentBid.customer.username" />

						<router-link
							:to="`/admin/dashboard/chats?customer=${currentBid.customer.id}`"
							class="btn w-full btn-primary"
						>
							Написать сообщение
						</router-link>
					</fieldset>

					<fieldset
						class="fieldset bg-base-200 border-base-300 rounded-box border p-4"
						v-if="currentBid.body.length > 0"
					>
						<legend class="fieldset-legend">Опрос</legend>

						<template v-for="(item, index) in currentBid.body" :key="index">
							<label class="label">{{ item.question }}</label>
							<template v-if="item.answer.length <= 2">
								<input
									class="input border"
									:value="item.answer.join(', ')"
									readonly
								/>
							</template>
							<template v-else>
								<textarea
									class="textarea w-full"
									:value="item.answer.join('\n')"
									placeholder="Bio"
								></textarea>
							</template>
						</template>
					</fieldset>

					<fieldset
						class="fieldset bg-base-200 border-base-300 rounded-box border p-4"
					>
						<legend class="fieldset-legend">Специалист</legend>

						<img
							:src="$file(currentBid.specialist.photo)"
							alt=""
							class="w-[100px] h-[100px] object-cover rounded-lg mb-2"
							v-if="currentBid.specialist.photo"
						/>

						<label class="label">Имя</label>
						<input
							class="input border"
							:value="currentBid.specialist.first_name"
							readonly
						/>

						<label class="label">Цена</label>
						<input
							class="input border"
							:value="$currency(currentBid.specialist.price)"
						/>

						<label class="label">Сессии было</label>
						<input
							class="input border"
							:value="currentBid.specialist.sessions"
						/>

						<router-link
							:to="`/admin/dashboard/specialists/${currentBid.specialist.id}`"
							class="btn w-full btn-primary"
						>
							Открыть
						</router-link>
					</fieldset>
				</div>
			</template>
		</SheetContent>
	</Sheet>
</template>

<script>
import { BidService } from '../../services/bid.service'
import { useMethodStore } from '../../store/method.store'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { getRoute, profession } from '@/utils/specialist.ts'
import { getStatus, getStatusList } from '@/utils/status'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'

export default {
	components: {
		Popover,
		PopoverContent,
		PopoverTrigger,
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuItem,
		DropdownMenuLabel,
		DropdownMenuSeparator,
		DropdownMenuTrigger,
		Sheet,
		SheetContent,
		SheetDescription,
		SheetHeader,
		SheetTitle,
		SheetTrigger,
	},
	data: () => ({
		bidService: new BidService(),
		loading: true,
		bids: [],
		search: {
			text: '',
			used: false,
			result: '',
		},
		currentBid: null,
		drawerOpen: false,
		drawerLoading: true,
		profession,
		getRoute,
		getStatus,
		getStatusList,
	}),
	async created() {
		await this.getAll()
	},
	computed: {
		methodStore() {
			return useMethodStore()
		},
		bidsMap() {
			if (this.search.used) {
				return this.search.result
			}
			return this.bids
		},
	},
	methods: {
		getProfession(array) {
			return this.profession(array)
				.getProfessionByValue.map(el => el.name)
				.join(', ')
		},
		async getAll() {
			this.bids = await this.bidService.getAll()
			this.loading = false
		},
		async updateBidStatusById(id, status) {
			await this.bidService.updateStatusById(id, status)
			await this.getAll()

			if (id === this.currentBid?.id) {
				await this.openBid(id)
			}
		},
		async openBid(id) {
			this.drawerOpen = true
			this.drawerLoading = true
			this.currentBid = await this.bidService.getById(id)
			this.drawerLoading = false
		},
		async onSearch() {
			if (this.search.text.trim().length === 0) {
				this.search.result = []
				this.search.used = false

				return
			}
			this.search.result = await this.bidService.getBySearch(this.search.text)
			this.search.used = true
		},
	},
}
</script>
