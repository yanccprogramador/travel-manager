import { createApp, reactive } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

export interface AuthUser {
  id: number
  name: string
  email: string
  role: string
}

export interface AuthState {
  user: AuthUser | null
  token: string | null
}

const authState: AuthState = reactive({
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null,
  token: localStorage.getItem('access_token'),
})

const app = createApp(App)

app.provide('auth', authState)
app.use(router)
app.mount('#app')

