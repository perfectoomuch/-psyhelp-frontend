import { createApp } from 'vue'
import './styles/index.css'
import 'notivue/notification.css'
import 'notivue/animations.css'
import App from './App.vue'
import router from './routes'
import { createPinia } from 'pinia'
import { push, createNotivue } from 'notivue'

const notivue = createNotivue({
	position: 'bottom-right',
})
const pinia = createPinia()
const app = createApp(App)

app.config.globalProperties.$toast = push

app.use(notivue)
app.use(pinia)
app.use(router)
app.mount('#app')
