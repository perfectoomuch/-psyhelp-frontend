import { createMemoryHistory, createRouter } from 'vue-router'
import home from '@/app/home'
import specialists from '@/app/specialists'
import help from '@/app/help'

const routes = [...home.routes, ...specialists.routes, ...help.routes]

const router = createRouter({
	history: createMemoryHistory(),
	routes,
})

router.beforeEach((to, from, next) => {
	next()
})

export default router
