import { createApp } from 'vue'
import './styles/index.css'
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

const notivue = createNotivue({
	position: 'bottom-right',
})
const pinia = createPinia()
const app = createApp(App)

app.config.globalProperties.$toast = push
app.config.globalProperties.$file = file
app.config.globalProperties.$currency = currency
app.config.globalProperties.$dayjs = dayjs

app.use(VueVideoPlayer)
app.use(notivue)
app.use(pinia)
app.use(router)
app.mount('#app')
