import { createWebHistory, createRouter } from 'vue-router'
import home from '@/app/home'
import specialists from '@/app/specialists'
import help from '@/app/help'
import admin from '@/app/admin'

const routes = [
	...home.routes,
	...specialists.routes,
	...help.routes,
	...admin.routes,
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

router.beforeEach((to, from, next) => {
	next()
})

export default router
