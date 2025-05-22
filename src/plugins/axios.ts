import axios from 'axios'

const http = axios.create({
	baseURL: import.meta.env.VITE_APP_AXIOS_URL,
})

export { http }
