<script setup lang="ts">
import { LifeBuoy, SlidersHorizontal, UsersRound } from 'lucide-vue-next'
import { ref } from 'vue'

const props = defineProps({
	name: {
		type: String,
		default: 'home',
	},
})

const list = ref([
	{
		icon: SlidersHorizontal,
		title: 'Подобрать',
		name: 'home',
	},
	{
		icon: UsersRound,
		title: 'Психологи',
		name: 'catalog',
	},
	{
		icon: LifeBuoy,
		title: 'Помощь',
		name: 'help',
	},
])
</script>

<template>
	<div class="dock fixed bottom-0 w-full left-0">
		<template v-for="(item, index) in list" :key="index">
			<button :class="item.name === props.name && 'dock-active text-primary'">
				<component :is="item.icon" class="size-[1.2em]" />
				<span class="dock-label">{{ item.title }}</span>
			</button>
		</template>
	</div>
</template>
