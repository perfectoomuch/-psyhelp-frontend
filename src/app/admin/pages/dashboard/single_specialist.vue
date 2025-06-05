<template>
	<div class="flex justify-between">
		<div class="flex flex-col mb-10">
			<h1 class="text-2xl font-semibold">Специалисты</h1>
			<span v-if="item" class="text-sm opacity-65"> ID: {{ item.id }} </span>
		</div>
		<button class="btn" @click="onSave" :disabled="saveLoading">
			<span
				class="loading loading-spinner text-primary"
				v-show="saveLoading"
			></span>

			Сохранить
		</button>
	</div>

	<div v-if="loading && item === null" class="flex justify-center">
		<span class="loading loading-spinner text-primary"></span>
	</div>

	<div v-if="!loading && item !== null" class="grid grid-cols-2 gap-4">
		<div class="grid grid-cols-2 gap-4">
			<img
				class="w-full h-full object-cover"
				:src="$file(item.photo)"
				v-if="item.photo"
			/>

			<video-player
				v-if="item.video"
				:src="$file(item.video)"
				:loop="false"
				:volume="1"
				:controls="true"
				aspectRatio="16:9"
				class="min-h-full"
			/>

			<div class="col-span-2 flex flex-col gap-4">
				<fieldset
					class="fieldset bg-base-200 border-base-300 rounded-box border p-4"
				>
					<legend class="fieldset-legend">Медиа</legend>

					<label class="label">Фотография профиля</label>
					<input
						class="file-input file-input-ghost file-input-sm border border-white bg-white overflow-hidden w-full"
						type="file"
						accept="image/*"
						@change="e => onChangeFile(e, 'photo')"
					/>
					<label class="label">Видео-визитка</label>
					<input
						class="file-input file-input-ghost file-input-sm border border-white bg-white overflow-hidden w-full"
						type="file"
						@change="e => onChangeFile(e, 'video')"
					/>
				</fieldset>
			</div>
		</div>
		<div class="flex flex-col gap-4">
			<fieldset
				class="fieldset bg-base-200 border-base-300 rounded-box border p-4 -mt-[17px]"
			>
				<legend class="fieldset-legend">Персональные данные</legend>

				<label class="label">Имя</label>
				<input class="input border" v-model="item.first_name" required />
				<label class="label">Фамилия</label>
				<input class="input border" v-model="item.last_name" required />

				<label class="label">Год рождения</label>
				<input class="input border" v-model="item.birth_year" required />

				<label class="label">Почта</label>
				<input class="input border" v-model="item.email" required />

				<label class="label">Гендер</label>
				<Select v-model="item.gender">
					<SelectTrigger class="bg-white border-none shadow-none w-full">
						<SelectValue placeholder="Выбрать" />
					</SelectTrigger>
					<SelectContent class="bg-white border-gray-200 max-h-[400px]">
						<SelectItem
							v-for="(item, index) in genderList"
							:key="index"
							:value="item.value"
						>
							{{ item.name }}
						</SelectItem>
					</SelectContent>
				</Select>
			</fieldset>
			<fieldset
				class="fieldset bg-base-200 border-base-300 rounded-box border p-4 -mt-[17px]"
			>
				<legend class="fieldset-legend">Проф. профиль</legend>

				<label class="label">Направлении</label>
				<div class="flex gap-2">
					<input class="input border" :value="routeSelected" readonly />
					<DropdownMenu>
						<DropdownMenuTrigger class="btn btn-sm h-full btn-secondary">
							Выбрать
							<Icon name="ChevronDown" :size="14" />
						</DropdownMenuTrigger>
						<DropdownMenuContent class="bg-white" side="bottom" align="end">
							<DropdownMenuItem
								v-for="(value, index) in routeList"
								:key="index"
								class="flex items-center justify-between"
								@click="pushRoute(value.value)"
							>
								{{ value.name }}
								<Icon
									name="Check"
									:size="14"
									v-if="item.experience_route.includes(value.value)"
								/>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>

				<label class="label">Профессия</label>
				<Select v-model="item.profession">
					<SelectTrigger class="bg-white border-none shadow-none w-full">
						<SelectValue placeholder="Выбрать" />
					</SelectTrigger>
					<SelectContent class="bg-white border-gray-200 max-h-[400px]">
						<SelectItem
							v-for="(item, index) in professionList"
							:key="index"
							:value="item.value"
						>
							{{ item.name }}
						</SelectItem>
					</SelectContent>
				</Select>

				<label class="label">Религия</label>
				<Select v-model="item.religion">
					<SelectTrigger class="bg-white border-none shadow-none w-full">
						<SelectValue placeholder="Выбрать" />
					</SelectTrigger>
					<SelectContent class="bg-white border-gray-200 max-h-[400px]">
						<SelectItem
							v-for="(item, index) in religionList"
							:key="index"
							:value="item.value"
						>
							{{ item.name }}
						</SelectItem>
					</SelectContent>
				</Select>

				<label class="label">Есть ли опыт с этническими группами</label>
				<Select v-model="item.experience_ethnic_group">
					<SelectTrigger class="bg-white border-none shadow-none w-full">
						<SelectValue placeholder="Выбрать" />
					</SelectTrigger>
					<SelectContent class="bg-white border-gray-200 max-h-[400px]">
						<SelectItem
							v-for="(item, index) in ethnicList"
							:key="index"
							:value="item.value"
						>
							{{ item.name }}
						</SelectItem>
					</SelectContent>
				</Select>

				<label class="label">Методы лечения</label>
				<div class="flex gap-2">
					<div class="flex flex-col">
						<span
							v-for="(value, index) in methodsSelected"
							:key="index"
							class="max-w-full block truncate"
						>
							{{ value }}
						</span>
					</div>
					<DropdownMenu>
						<DropdownMenuTrigger
							class="btn btn-sm h-[40px] btn-secondary self-start"
						>
							Выбрать
							<Icon name="ChevronDown" :size="14" />
						</DropdownMenuTrigger>
						<DropdownMenuContent class="bg-white" side="bottom" align="end">
							<DropdownMenuItem
								v-for="(value, index) in methods"
								:key="index"
								class="flex items-center justify-between"
								@click="pushMethod(value.id)"
							>
								{{ value.name }}
								<Icon
									name="Check"
									:size="14"
									v-if="item.methods.includes(value.id)"
								/>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</fieldset>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.input {
	width: 100%;
}
</style>

<script>
import { SpecialistService } from '../../services/specialist.service'
import { gender, profession, route, religion, ethnic } from '@/utils/specialist'
import upload from '../../services/upload.service'
import { useMethodStore } from '../../store/method.store'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default {
	components: {
		Select,
		SelectContent,
		SelectGroup,
		SelectItem,
		SelectLabel,
		SelectTrigger,
		SelectValue,
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuItem,
		DropdownMenuLabel,
		DropdownMenuSeparator,
		DropdownMenuTrigger,
	},
	data: () => ({
		specialistService: new SpecialistService(),
		loading: true,
		item: null,
		gender,
		profession,
		route,
		religion,
		ethnic,
		saveLoading: false,
	}),
	async created() {
		await this.getItem()
	},
	computed: {
		genderList() {
			return this.gender().list
		},
		routeList() {
			return this.route().list
		},
		routeSelected() {
			return this.item.experience_route
				.map(el => this.route(el).getRouteByValue.name)
				.join(', ')
		},
		professionList() {
			return this.profession().list
		},
		religionList() {
			return this.religion().list
		},
		ethnicList() {
			return this.ethnic().list
		},
		methodStore() {
			return useMethodStore()
		},
		methods() {
			return this.methodStore.methods
		},
		methodsSelected() {
			return this.item.methods.map(el => this.methodStore.getMethod(el).name)
		},
	},
	methods: {
		async getItem() {
			this.item = await this.specialistService.getById(this.$route.params.id)
			this.loading = false
		},
		pushRoute(value) {
			if (this.item.experience_route.includes(value)) {
				const index = this.item.experience_route.findIndex(el => el === value)
				this.item.experience_route.splice(index, 1)
			} else {
				this.item.experience_route.push(value)
			}
		},
		pushMethod(value) {
			if (this.item.methods.includes(value)) {
				const index = this.item.methods.findIndex(el => el === value)
				this.item.methods.splice(index, 1)
			} else {
				this.item.methods.push(value)
			}
		},
		async onChangeFile(event, path) {
			const file = event.target.files[0]
			const filename = await upload(file)
			this.item[path] = filename
		},
		async onSave() {
			this.saveLoading = true
			const id = this.item.id
			const payload = this.item
			delete payload.id

			await this.specialistService.updateById(id, payload)
			await this.getItem()
			this.saveLoading = false
		},
	},
}
</script>
