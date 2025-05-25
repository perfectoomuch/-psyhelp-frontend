import { createWebHistory, createRouter } from 'vue-router'
import home from '@/app/home'
import specialists from '@/app/specialists'
import help from '@/app/help'
import admin from '@/app/admin'
import Cookies from 'js-cookie'
import { useAdminStore } from '@/app/admin/store/user.store'
import { AuthService } from '@/app/admin/services/auth.service'

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

router.beforeEach(async (to, from, next) => {
	window.scroll(0, 0)
	const authService = new AuthService()

	let authed: boolean | null = false
	const store = useAdminStore()
	authed = store.authed
	if (!authed) {
		authed = await authService.GetUser()
	}

	if (to.name === 'admin') next('/admin/auth')
	if (!authed && to?.meta?.requireAuth) next('/admin/auth')
	if (authed && to?.meta?.authPage) next('/admin/dashboard')

	next()
})

export default router
