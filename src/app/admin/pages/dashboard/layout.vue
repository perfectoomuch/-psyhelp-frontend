<template>
	<div class="h-screen w-screen flex items-center justify-center">
		<div
			class="w-[1160px] h-[calc(100%-120px)] flex border border-gray-200 bg-white rounded-lg"
		>
			<div
				class="flex overflow-y-scroll"
				:class="[isMinimal ? 'w-[78px]' : 'w-[380px]']"
			>
				<Sidebar class="flex-1" />
			</div>
			<div
				class="w-full"
				:class="[isMinimal ? '' : 'p-6', !isChat ? 'overflow-y-scroll' : '']"
			>
				<routerView></routerView>
			</div>
		</div>
	</div>
</template>

<script>
import Sidebar from '../../components/Sidebar.vue'

export default {
	components: {
		Sidebar,
	},
	computed: {
		isMinimal() {
			if (this.$route.name === 'adminChats') return true
			return false
		},
		isChat() {
			if (this.$route.name === 'adminChats') return true
			return false
		},
	},
}
</script>
