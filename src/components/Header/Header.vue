<script setup lang="ts">
const props = defineProps({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
	},
	backButtonText: {
		type: String,
		default: '',
	},
})
</script>

<template>
	<div class="flex flex-col gap-1 mb-8">
		<a
			v-if="backButtonText"
			href="javascript:void(0)"
			class="text-primary text-sm font-semibold flex items-center gap-2 mb-2"
			@click="$emit('back')"
		>
			<Icon name="MoveLeft" :size="14" />
			{{ backButtonText }}
		</a>
		<h1 class="text-2xl text-black font-medium">{{ props.title }}</h1>
		<p class="text-sm" v-if="props.description">
			{{ props.description }}
		</p>
	</div>
</template>
