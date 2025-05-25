import axios from 'axios'
import Cookies from 'js-cookie'

const http = axios.create({
	baseURL: import.meta.env.VITE_APP_AXIOS_URL,
	// baseURL: `https://${import.meta.env.VITE_APP_NGROK_SUBDOMAIN}/api/`,
})

const token = Cookies.get('session_token')
if (token) {
	http.defaults.headers.session_token = token
}

const changeToken = async (newToken: string) => {
	await Cookies.set('session_token', newToken, { expires: 1 })
	http.defaults.headers.token = await newToken
}

export { http, changeToken }
