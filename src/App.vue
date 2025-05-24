<template>
	<template v-if="userStore.$state.loading">
		<div class="w-screen h-screen flex items-center justify-center">
			<span class="loading loading-spinner text-primary"></span>
		</div>
	</template>
	<template v-else>
		<AppLayout v-if="userStore.$state.user.filled" />

		<Intro v-if="!userStore.$state.user.filled" />
		<Toast />
	</template>
</template>

<script>
import AppLayout from './app/layout.vue'
import { Toast } from './components/Toast'
import { Intro } from './components/Intro'
import { useTelegramStore } from './stores/telegram.store'
import { useUserStore } from './stores/user.store'

export default {
	components: {
		AppLayout,
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
	},
}
</script>
