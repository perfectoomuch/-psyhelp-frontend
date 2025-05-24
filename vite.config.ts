import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { ngrok } from 'vite-plugin-ngrok'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd())

	return {
		plugins: [
			vue(),
			tailwindcss(),
			ngrok({
				authtoken: env.VITE_APP_NGROK_TOKEN,
				domain: env.VITE_APP_NGROK_SUBDOMAIN, // добавляем субдомен
			}),
		],
		resolve: {
			alias: {
				'@': path.resolve(__dirname, './src'),
			},
		},
		server: {
			proxy: {
				'/api': env.VITE_APP_HOME_URL,
			},
		},
	}
})
