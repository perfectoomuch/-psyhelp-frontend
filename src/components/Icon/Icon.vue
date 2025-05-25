<script setup lang="ts">
import { computed } from 'vue'
import * as icons from 'lucide-vue-next'

const props = defineProps({
	name: {
		type: String,
		required: true,
	},
	size: Number,
	color: String,
	strokeWidth: Number,
	defaultClass: String,
	fill: String,
})

const icon = computed(() => icons[props.name])
</script>

<template>
	<component
		:is="icon"
		:size="size"
		:color="color"
		:stroke-width="strokeWidth ? strokeWidth : 2"
		:default-class="defaultClass"
		:fill="fill ? fill : 'rgba(0,0,0,0)'"
	/>
</template>
