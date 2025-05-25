export default {
	routes: [
		{
			path: '/specialists',
			component: () => import('./pages/index.vue'),
			name: 'specialists',
		},
	],
}
