import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useThemeStore } from './views/stores/themeStore'

const app = createApp(App)

app.use(createPinia())
app.use(router)

const themeStore = useThemeStore()
themeStore.initializeTheme()

app.mount('#app')
