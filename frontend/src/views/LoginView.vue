<script setup lang="ts">
import { inject, ref } from 'vue'
import { useRouter } from 'vue-router'
import { login, type LoginResponse } from '../api'
import type { AuthState } from '../main'

const auth = inject<AuthState>('auth')
const router = useRouter()

const email = ref<string>('')
const password = ref<string>('')
const loading = ref<boolean>(false)
const errorMessage = ref<string>('')

async function handleSubmit() {
  loading.value = true
  errorMessage.value = ''

  try {
    const data: LoginResponse = await login(email.value, password.value)
    localStorage.setItem('access_token', data.access_token)
    localStorage.setItem('user', JSON.stringify(data.user))
    if (auth) {
      auth.token = data.access_token
      auth.user = data.user
    }
    router.push({ name: 'dashboard' })
  } catch (error) {
    errorMessage.value = (error as Error).message || 'Falha ao fazer login.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="flex items-center justify-center min-h-[calc(100vh-56px)]">
    <div class="bg-white p-8 md:px-10 rounded-2xl shadow-[0_20px_25px_-5px_rgba(15,23,42,0.08)] w-full max-w-[380px]">
      <h1 class="m-0 mb-1 text-2xl font-semibold">Login</h1>
      <p class="m-0 mb-6 text-sm text-gray-500">Acesse o painel de gestão de viagens corporativas.</p>

      <form class="flex flex-col gap-4" @submit.prevent="handleSubmit">
        <label class="flex flex-col gap-1 text-sm">
          <span class="text-gray-600">E-mail</span>
          <input
            v-model="email"
            type="email"
            required
            placeholder="seu.email@empresa.com"
            class="px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none transition-colors duration-150 focus:border-blue-600 focus:ring-1 focus:ring-blue-600/20"
          />
        </label>

        <label class="flex flex-col gap-1 text-sm">
          <span class="text-gray-600">Senha</span>
          <input
            v-model="password"
            type="password"
            required
            minlength="6"
            placeholder="Sua senha"
            class="px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none transition-colors duration-150 focus:border-blue-600 focus:ring-1 focus:ring-blue-600/20"
          />
        </label>

        <button class="mt-2 w-full rounded-full border-none py-2.5 px-4 text-[0.95rem] font-medium bg-gradient-to-r from-blue-600 to-indigo-600 text-white cursor-pointer flex items-center justify-center gap-2 transition-transform duration-50 hover:opacity-95 active:translate-y-px disabled:opacity-60 disabled:cursor-default" type="submit" :disabled="loading">
          <span v-if="!loading">Entrar</span>
          <span v-else class="w-[1.1rem] h-[1.1rem] rounded-full border-2 border-white/50 border-t-white animate-spin"></span>
        </button>

        <p v-if="errorMessage" class="mt-2 text-[0.85rem] text-red-700">
          {{ errorMessage }}
        </p>
      </form>
    </div>
  </div>
</template>

