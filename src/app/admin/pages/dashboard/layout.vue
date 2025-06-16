<template>
	<div class="h-screen w-screen flex items-center justify-center">
		<div
			class="w-[1160px] h-[calc(100%-120px)] flex border border-gray-200 bg-white rounded-lg"
		>
			<div
				class="flex overflow-y-scroll"
				:class="[isMinimal ? 'w-[78px]' : 'w-[380px]']"
			>
				<Sidebar class="flex-1" @logout="onLogout" />
			</div>
			<div
				class="w-full"
				:class="[isMinimal ? '' : 'p-6', !isChat ? 'overflow-y-scroll' : '']"
			>
				<template v-if="methodStore.methods.length > 0">
					<routerView></routerView>
				</template>
			</div>
		</div>
	</div>
</template>

<script>
import { useMethodStore } from '@/app/admin/store/method.store'
import Sidebar from '../../components/Sidebar.vue'
import { AuthService } from '../../services/auth.service'

export default {
	components: {
		Sidebar,
	},
	data: () => ({
		authService: new AuthService(),
	}),
	computed: {
		isMinimal() {
			if (this.$route.name === 'adminChats') return true
			return false
		},
		isChat() {
			if (this.$route.name === 'adminChats') return true
			return false
		},
		methodStore() {
			return useMethodStore()
		},
	},
	methods: {
		async onLogout() {
			await this.authService.Logout()
		},
	},
}
</script>
