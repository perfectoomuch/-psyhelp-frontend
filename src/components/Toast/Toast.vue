<template>
	<Notivue v-slot="item" class="-translate-y-10 z-[9999999]">
		<Notification :item="item" :theme="theme">
			<NotificationProgress :item="item" />
		</Notification>
	</Notivue>
</template>

<script>
import {
	Notivue,
	Notification,
	NotificationProgress,
	pastelTheme,
} from 'notivue'
export default {
	components: {
		Notivue,
		Notification,
		NotificationProgress,
	},
	data: () => ({
		theme: pastelTheme,
	}),
}
</script>
