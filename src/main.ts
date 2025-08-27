import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'

import App from './App.vue'
import { initI18n } from './composables/ i18n'
import './styles/main.css'
import 'uno.css'

const app = createApp(App)

// 初始化国际化
initI18n(app)

const router = createRouter({
  routes,
  history: createWebHistory(import.meta.env.BASE_URL),
})
const pinia = createPinia()
app.use(pinia)
app.use(router)
app.mount('#app')
