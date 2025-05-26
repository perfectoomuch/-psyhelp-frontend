export default {
	routes: [
		{
			path: '/admin',
			component: () => import('./pages/index.vue'),
			name: 'admin',
			children: [
				{
					path: '/admin/auth',
					component: () => import('./pages/auth/index.vue'),
					meta: {
						authPage: true,
					},
				},
				{
					path: '/admin/dashboard',
					component: () => import('./pages/dashboard/layout.vue'),
					meta: {
						requireAuth: true,
					},
					children: [
						{
							path: '/admin/dashboard/',
							component: () => import('./pages/dashboard/home.vue'),
							name: 'adminHome',
						},
						{
							path: '/admin/dashboard/customers',
							component: () => import('./pages/dashboard/users.vue'),
							name: 'adminCustomers',
						},
					],
				},
			],
		},
	],
}
