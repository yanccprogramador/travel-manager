<script setup lang="ts">
import { computed, inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { AuthState } from './main'
import NotificationBell from './components/NotificationBell.vue'

const auth = inject<AuthState>('auth')
const route = useRoute()
const router = useRouter()

const isAuthenticated = computed(() => !!auth?.token)

function logout() {
  localStorage.removeItem('access_token')
  localStorage.removeItem('user')
  if (!auth) return
  auth.token = null
  auth.user = null
  router.push({ name: 'login' })
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-100 text-gray-900">
    <header class="flex items-center justify-between py-3 px-6 bg-white border-b border-gray-200 sticky top-0 z-10">
      <div class="flex items-center">
        <span class="font-semibold text-[1.1rem]">Gestão de Viagens Corporativas</span>
      </div>
      <div class="flex items-center gap-3" v-if="isAuthenticated">
        <NotificationBell v-if="auth?.user" />
        <span class="text-[0.9rem] text-gray-600" v-if="auth?.user">
          {{ auth.user.name }} ({{ auth.user.role }})
        </span>
        <button type="button" class="rounded-full border border-gray-300 py-1.5 px-3.5 text-[0.85rem] bg-white text-gray-700 cursor-pointer transition-colors hover:bg-gray-100 hover:border-gray-400" @click="logout">
          Sair
        </button>
      </div>
    </header>

    <main class="flex-1 p-6">
      <router-view :key="route.fullPath" />
    </main>
  </div>
</template>
