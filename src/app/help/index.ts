export default {
	routes: [
		{
			path: '/help',
			component: () => import('./pages/index.vue'),
			name: 'help',
		},
	],
}
