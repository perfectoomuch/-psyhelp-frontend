import { createMemoryHistory, createRouter } from 'vue-router'
import home from '@/app/home'

const routes = [...home.routes]

const router = createRouter({
	history: createMemoryHistory(),
	routes,
})

router.beforeEach((to, from, next) => {
	next()
})

export default router
