<template>
	<div class="flex flex-col gap-4">
		<div class="grid grid-cols-2 gap-4">
			<div class="relative">
				<img
					class="w-full h-[250px] object-cover"
					:src="$file(item.photo)"
					v-if="item.photo"
				/>
				<div
					v-else
					class="w-full h-[250px] flex flex-col items-center justify-center bg-gray-100 rounded-lg"
				>
					<Icon name="Image" :size="20" class="opacity-65" />
				</div>

				<button
					class="btn btn-square btn-error btn-soft btn-sm absolute right-3 top-3"
					v-if="item.photo"
					@click="item.photo = ''"
				>
					<Icon name="Trash" :size="16" />
				</button>
			</div>

			<div class="relative">
				<video-player
					v-if="item.video"
					:src="$file(item.video)"
					:loop="false"
					:volume="1"
					:controls="true"
					aspectRatio="16:9"
					class="min-h-[250px]"
				/>
				<div
					v-else
					class="w-full h-[250px] flex flex-col items-center justify-center bg-gray-100 rounded-lg"
				>
					<Icon name="Video" :size="20" class="opacity-65" />
				</div>

				<button
					class="btn btn-square btn-error btn-soft btn-sm absolute right-3 top-3"
					v-if="item.video"
					@click="item.video = ''"
				>
					<Icon name="Trash" :size="16" />
				</button>
			</div>
		</div>

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

			<label class="label">Дата рождения</label>
			<MaterializeDatepicker v-model="item.birth_year" :onlyBefore="true">
				<input
					placeholder="Выбрать дату"
					class="input pika-single w-full text-base"
					:value="
						item.birth_year ? $dayjs(item.birth_year).format('DD/MM/YYYY') : ''
					"
					required
					readonly
				/>
			</MaterializeDatepicker>

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

			<label class="label">Стоимость сессии</label>
			<input
				class="input border"
				v-model="item.price"
				v-maska="'###########'"
				required
			/>

			<label class="label">Опыт работы в годах</label>
			<input
				class="input border"
				v-model="item.experience_years"
				v-maska
				data-maska="0.99"
				data-maska-tokens="0:\d:multiple|9:\d:optional"
				required
			/>

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
			<div class="flex gap-2">
				<input class="input border" :value="professionSelected" readonly />
				<DropdownMenu>
					<DropdownMenuTrigger class="btn btn-sm h-full btn-secondary">
						Выбрать
						<Icon name="ChevronDown" :size="14" />
					</DropdownMenuTrigger>
					<DropdownMenuContent class="bg-white" side="bottom" align="end">
						<DropdownMenuItem
							v-for="(value, index) in professionList"
							:key="index"
							class="flex items-center justify-between"
							@click="pushProfession(value.value)"
						>
							{{ value.name }}
							<Icon
								name="Check"
								:size="14"
								v-if="item.profession.includes(value.value)"
							/>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			<label class="label">Образование</label>
			<input class="input border" v-model="item.education" required />

			<label class="label">Сессии было</label>
			<input class="input border" v-model="item.sessions" required />

			<!-- <label class="label">Религия</label>
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
				</Select> -->

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

			<label class="label">Сообщение визитка</label>
			<textarea
				class="textarea w-full"
				v-model="item.message"
				placeholder="Bio"
			></textarea>

			<label class="label">Методы лечения</label>
			<div class="flex justify-between gap-2">
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
						class="btn btn-sm h-[40px] btn-secondary self-start ml-auto"
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
</template>

<style lang="scss" scoped>
.input {
	width: 100%;
	font-size: 14px;
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
import { SpecialistSchema } from '../../validators/specialist'
import MaterializeDatepicker from '@/components/Pickers/MaterializeDatepicker.vue'

export default {
	props: ['data'],
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
		MaterializeDatepicker,
	},
	data: () => ({
		specialistService: new SpecialistService(),
		item: {
			first_name: '',
			methods: [],
			experience_route: [],
			experience_years: '',
			photo: '',
			video: '',
			gender: '',
			birth_year: '',
			price: '',
			message: '',
			education: '',
			profession: [],
			sessions: '',
			religion: null,
			experience_ethnic_group: '',
		},
		gender,
		profession,
		route,
		religion,
		ethnic,
	}),
	created() {
		if (this.data) {
			this.item = this.data
		}
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
		professionSelected() {
			return this.item.profession
				.map(el => this.profession(el).getProfessionByValue.name)
				.join(', ')
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
			return this.item.methods
				.map(el => this.methodStore.getMethod(el)?.name ?? '')
				.filter(el => el.length !== 0)
		},
	},
	methods: {
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
		pushProfession(value) {
			if (this.item.profession.includes(value)) {
				const index = this.item.profession.findIndex(el => el === value)
				this.item.profession.splice(index, 1)
			} else {
				this.item.profession.push(value)
			}
		},
		async onChangeFile(event, path) {
			const file = event.target.files[0]
			const filename = await upload(file)
			this.item[path] = filename
		},

		async getData() {
			const valid = await SpecialistSchema(this.item)
			if (!valid) return

			const id = this.item.id
			const payload = this.item
			delete payload.id

			return {
				id,
				payload,
			}
			// this.$emit('save', {
			// 	id,
			// 	payload: payload,
			// })
		},
	},
}
</script>
