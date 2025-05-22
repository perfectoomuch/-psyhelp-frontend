<script setup lang="ts">
const props = defineProps({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
	},
})
</script>

<template>
	<div class="flex flex-col gap-1 mb-8">
		<h1 class="text-2xl text-black font-medium">{{ props.title }}</h1>
		<p class="text-sm" v-if="props.description">
			{{ props.description }}
		</p>
	</div>
</template>
