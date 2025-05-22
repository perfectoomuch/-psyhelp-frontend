<script setup lang="ts">
import { Navigation } from '@/components/Navigation'
</script>

<template>
	<div id="router" class="p-3 px-4">
		<RouterView></RouterView>
	</div>
	<Navigation />
</template>
