<template>
	<div class="h-screen w-screen flex items-center justify-center">
		<div
			class="w-[960px] h-[calc(100%-120px)] flex border border-gray-200 bg-white rounded-lg"
		>
			<div class="w-[380px] flex overflow-y-scroll">
				<Sidebar class="flex-1" />
			</div>
			<div class="w-full">
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
}
</script>
