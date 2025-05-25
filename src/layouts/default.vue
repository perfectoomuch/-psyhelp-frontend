<template>
	<div id="routerClient" class="p-3 px-4">
		<keep-alive>
			<RouterView></RouterView>
		</keep-alive>
	</div>
	<Navigation :name="$route.name" />
</template>

<script>
import { Navigation } from '../components/Navigation'

export default {
	components: {
		Navigation,
	},
	created() {},
}
</script>
