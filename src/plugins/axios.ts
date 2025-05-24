import axios from 'axios'

const http = axios.create({
	// baseURL: import.meta.env.VITE_APP_AXIOS_URL,
	baseURL: `https://${import.meta.env.VITE_APP_NGROK_SUBDOMAIN}/api/`,
})

export { http }
