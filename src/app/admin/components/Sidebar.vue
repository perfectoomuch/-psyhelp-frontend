<template>
	<div class="flex flex-col border-r border-gray-200">
		<div class="flex items-center gap-4 p-4 border-b border-gray-200">
			<div class="avatar avatar-placeholder">
				<div class="bg-neutral text-neutral-content w-10 rounded-full text-sm">
					<span>AD</span>
				</div>
			</div>
			<div class="flex flex-col gap-1" v-if="!isMinimal">
				<span class="text-sm font-medium leading-none">
					{{ store.user.email }}
				</span>
				<span class="text-xs leading-none">Администратор</span>
			</div>
		</div>
		<div class="flex flex-col gap-1 p-2 flex-1">
			<template v-for="(item, index) in items" :key="index">
				<button
					:class="[
						menuItemClass,
						$route.name.includes(item.value)
							? 'bg-primary text-white'
							: 'hover:bg-gray-100',
						isMinimal ? 'justify-center' : '',
					]"
					@click="$router.push(item.route)"
				>
					<Icon :name="item.icon" :size="18" />
					<template v-if="!isMinimal">
						{{ item.name }}
					</template>
				</button>
			</template>

			<button
				:class="[menuItemClass, isMinimal ? 'justify-center' : '']"
				class="text-red-600 hover:bg-red-400/10 mt-auto"
				@click="$emit('logout')"
			>
				<Icon name="LogOut" :size="18" />
				<template v-if="!isMinimal"> Выйти </template>
			</button>
		</div>
	</div>
</template>

<script>
import { useAdminStore } from '../store/user.store'
import { Tooltip } from '@programic/vue3-tooltip'
export default {
	components: {
		Tooltip,
	},
	data: () => ({
		items: [
			{
				name: 'Заявки',
				route: '/admin/dashboard/',
				icon: 'Rows3',
				value: 'adminHome',
			},
			{
				name: 'Пользователи',
				route: '/admin/dashboard/customers',
				icon: 'UsersRound',
				value: 'adminCustomers',
			},
			{
				name: 'Специалисты',
				route: '/admin/dashboard/specialists',
				icon: 'BriefcaseBusiness',
				value: 'adminSpecialists',
			},
			{
				name: 'Методы лечения',
				route: '/admin/dashboard/methods',
				icon: 'Rows3',
				value: 'adminMethods',
			},
			{
				name: 'Чаты',
				route: '/admin/dashboard/chats',
				icon: 'MessageSquareText',
				value: 'adminChats',
			},
			{
				name: 'Отзывы',
				route: '/admin/dashboard/reviews',
				icon: 'MessageSquareDot',
				value: 'adminReviews',
			},
			{
				name: 'Транзакции',
				route: '/admin/dashboard/transactions',
				icon: 'Landmark',
				value: 'adminTransactions',
			},
		],
	}),
	computed: {
		store() {
			return useAdminStore()
		},
		menuItemClass() {
			return 'h-[40px] flex items-center gap-2 text-sm text-left font-medium px-4 rounded-lg cursor-pointer'
		},
		isMinimal() {
			if (this.$route.name === 'adminChats') return true
			return false
		},
	},
}
</script>
