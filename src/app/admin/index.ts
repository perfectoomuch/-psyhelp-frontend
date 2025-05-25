export default {
	routes: [
		{
			path: '/admin',
			component: () => import('./pages/index.vue'),
			name: 'admin',
		},
	],
}
