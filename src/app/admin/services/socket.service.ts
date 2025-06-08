import { io } from 'socket.io-client'
import Cookies from 'js-cookie'

let socket = null

const init = () => {
	socket = io(import.meta.env.VITE_APP_HOME_URL, {
		extraHeaders: {
			token: Cookies.get('token') || '',
		},
	})
}

export { init, socket }
