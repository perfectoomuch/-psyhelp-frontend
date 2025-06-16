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
						{
							path: '/admin/dashboard/specialists',
							component: () => import('./pages/dashboard/specialists.vue'),
							name: 'adminSpecialists',
						},
						{
							path: '/admin/dashboard/specialists/add',
							component: () =>
								import('./pages/dashboard/create_specialist.vue'),
							name: 'adminSpecialistsAdd',
						},
						{
							path: '/admin/dashboard/specialists/:id',
							component: () =>
								import('./pages/dashboard/single_specialist.vue'),
							name: 'adminSpecialistsSingle',
						},
						{
							path: '/admin/dashboard/chats',
							component: () => import('./pages/dashboard/chats.vue'),
							name: 'adminChats',
						},
						{
							path: '/admin/dashboard/reviews',
							component: () => import('./pages/dashboard/reviews.vue'),
							name: 'adminReviews',
						},
						{
							path: '/admin/dashboard/methods',
							component: () => import('./pages/dashboard/methods.vue'),
							name: 'adminMethods',
						},
						{
							path: '/admin/dashboard/transactions',
							component: () => import('./pages/dashboard/transactions.vue'),
							name: 'adminTransactions',
						},
					],
				},
			],
		},
	],
}
