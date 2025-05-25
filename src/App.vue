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
		<template v-else>
			<DefaultLayout v-if="userStore.$state.user.filled" />
			<Intro v-if="!userStore.$state.user.filled" />
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
	created() {
		const telegramStore = useTelegramStore()
		const userStore = useUserStore()
		telegramStore.setInstance()
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
