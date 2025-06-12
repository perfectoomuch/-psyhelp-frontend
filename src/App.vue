<template>
	<template v-if="isAdmin">
		<AdminLayout />
	</template>
	<template v-else>
		<template v-if="userStore.$state.loading">
			<div class="w-screen h-screen flex items-center justify-center">
				<span class="loading loading-spinner text-primary"></span>
			</div>
		</template>
		<template
			v-if="!userStore.$state.loading && userStore.$state.user !== null"
		>
			<DefaultLayout key="" />
			<!-- <Intro v-if="!userStore.$state.user?.filled" /> -->
		</template>
	</template>

	<Toast />
</template>

<script>
import DefaultLayout from './layouts/default.vue'
import AdminLayout from './layouts/admin.vue'
import { Toast } from './components/Toast'
import { Intro } from './components/Intro'
import { useTelegramStore } from './stores/telegram.store'
import { useUserStore } from './stores/user.store'

export default {
	components: {
		DefaultLayout,
		AdminLayout,
		Toast,
		Intro,
	},
	async created() {
		const telegramStore = useTelegramStore()
		const userStore = useUserStore()
		telegramStore.setInstance()

		if (import.meta.env.DEV) {
			await userStore.getUser({
				email: 'mail@mail.com',
				chat_id: 652674468,
				username: 'exetmo',
				first_name: 'test',
				last_name: 'test',
				created_at: '2025-05-25T19:43:05.084Z',
				updated_at: '2025-05-25T19:43:23.948Z',
				__v: 0,
				id: '683372c926daf44a92b1f6b4',
			})
		}
	},
	computed: {
		telegramStore() {
			return useTelegramStore()
		},
		userStore() {
			return useUserStore()
		},
		isAdmin() {
			return this.$route.path.includes('admin')
		},
	},
}
</script>
