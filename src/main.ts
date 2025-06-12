import { createApp } from 'vue'
import './styles/index.css'
import './styles/styles.scss'
import 'notivue/notification.css'
import 'notivue/animations.css'
import 'vidstack/bundle'
import 'video.js/dist/video-js.css'
import App from './App.vue'
import router from './routes'
import { createPinia } from 'pinia'
import { push, createNotivue } from 'notivue'
import VueVideoPlayer from '@videojs-player/vue'
import file from './utils/file'
import currency from './utils/currency'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
dayjs.locale('ru')
import { Icon } from './components/Icon'
import { vMaska } from 'maska/vue'

const notivue = createNotivue({
	position: 'bottom-right',
	limit: 4,
	enqueue: true,
	avoidDuplicates: true,
	notifications: {
		global: {
			duration: 3000,
		},
	},
})
const pinia = createPinia()
const app = createApp(App)

app.config.globalProperties.$toast = push
app.config.globalProperties.$file = file
app.config.globalProperties.$currency = currency
app.config.globalProperties.$dayjs = dayjs

app.directive('maska', vMaska)
app.component('Icon', Icon)
app.use(VueVideoPlayer)
app.use(notivue)
app.use(pinia)
app.use(router)
app.mount('#app')
