<template>
	<div class="min-h-screen flex items-center justify-center">
		<div class="card w-96 bg-base-100 card-md shadow-sm">
			<div class="card-body">
				<h2 class="card-title">Войти</h2>
				<form @submit.prevent="onSubmit" class="flex flex-col gap-4">
					<label class="input w-full">
						<Mail class="size-4 opacity-65" />
						<input
							type="email"
							placeholder="mail@site.com"
							required
							v-model="form.email"
							class="border"
						/>
					</label>
					<label class="input w-full">
						<LockKeyhole class="size-4 opacity-65" />
						<input
							:type="!passwordShow ? 'password' : 'text'"
							placeholder="********"
							required
							v-model="form.password"
							class="border"
						/>
						<Icon
							:name="!passwordShow ? 'Eye' : 'EyeOff'"
							class="cursor-pointer"
							:size="20"
							@click="passwordShow = !passwordShow"
						/>
					</label>
					<button class="btn btn-primary" :disabled="loading">
						<span
							class="loading loading-spinner loading-sm"
							v-if="loading"
						></span>

						<template v-else> Войти </template>
					</button>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
import { Mail, LockKeyhole, Eye, EyeOff } from 'lucide-vue-next'
import { AuthService } from '../../services/auth.service'
export default {
	components: {
		Mail,
		LockKeyhole,
		Eye,
		EyeOff,
	},
	data: () => ({
		authService: new AuthService(),
		form: {
			email: '',
			password: '',
		},
		passwordShow: false,
		loading: false,
	}),
	methods: {
		async onSubmit() {
			this.loading = true
			const response = await this.authService.SignIn(this.form)
			this.loading = false
		},
	},
}
</script>
