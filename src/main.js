import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // ✅ Cần có dòng này
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import './style.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

const app = createApp(App)
app.use(router) // ✅ Gắn router
app.mount('#app')
