<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { fetchNotifications, markNotificationAsRead, type NotificationItem } from '../api'

const notifications = ref<NotificationItem[]>([])
const loading = ref(false)
const showDropdown = ref(false)

const unreadCount = ref(0)
let intervalId: ReturnType<typeof setInterval> | null = null

async function loadNotifications() {
  if (loading.value) return
  loading.value = true

  try {
    const data = await fetchNotifications()
    notifications.value = data
    unreadCount.value = data.filter((n) => !n.read_at).length
  } catch (error) {
    console.error('Failed to load notifications:', error)
  } finally {
    loading.value = false
  }
}

function toggleDropdown() {
  showDropdown.value = !showDropdown.value
  if (showDropdown.value) {
    loadNotifications()
  }
}

async function handleMarkAsRead(notif: NotificationItem) {
  if (notif.read_at) return

  try {
    await markNotificationAsRead(notif.id)
    notif.read_at = new Date().toISOString()
    unreadCount.value = Math.max(0, unreadCount.value - 1)
  } catch (error) {
    console.error('Failed to mark notification as read:', error)
  }
}

onMounted(() => {
  loadNotifications()
  intervalId = setInterval(loadNotifications, 30000)
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>

<template>
  <div class="relative inline-block">
    <button class="bg-transparent border-none cursor-pointer p-2 flex items-center justify-center rounded-full transition-colors duration-200 text-gray-600 hover:bg-gray-100 hover:text-gray-900 relative" @click="toggleDropdown">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
        />
      </svg>
      <span v-if="unreadCount > 0" class="absolute top-0 right-0 bg-red-500 text-white text-[0.65rem] font-bold py-[0.15rem] px-[0.35rem] rounded-full transform translate-x-[15%] translate-y-[-15%] border-2 border-white">{{ unreadCount }}</span>
    </button>

    <div v-if="showDropdown" class="absolute top-full right-0 mt-2 w-[320px] bg-white rounded-lg shadow-lg border border-gray-200 z-50 overflow-hidden max-h-[400px] flex flex-col">
      <div class="p-3 px-4 border-b border-gray-200 bg-gray-50">
        <h3 class="m-0 text-[0.95rem] font-semibold text-gray-900">Notificações</h3>
      </div>
      
      <div v-if="loading && notifications.length === 0" class="p-4 text-[0.85rem] text-gray-500 text-center py-8">
        <span class="inline-block w-4 h-4 border-2 border-gray-100 border-l-blue-600 rounded-full animate-spin align-middle mr-2"></span> Carregando...
      </div>
      
      <div v-else-if="notifications.length === 0" class="p-4 text-[0.85rem] text-gray-500 text-center py-8">
        Nenhuma nova notificação
      </div>
      
      <ul v-else class="list-none m-0 p-0 overflow-y-auto">
        <li
          v-for="notif in notifications"
          :key="notif.id"
          class="p-3 px-4 border-b border-gray-50 cursor-pointer transition-colors duration-150 hover:bg-gray-50"
          :class="notif.read_at ? '' : 'bg-blue-50 hover:bg-blue-100'"
          @click="handleMarkAsRead(notif)"
        >
          <p class="m-0 mb-1 text-[0.85rem] text-gray-700 leading-[1.3]">{{ notif.data.message }}</p>
          <small class="text-[0.75rem] text-gray-400">{{ new Date(notif.created_at).toLocaleString('pt-BR') }}</small>
        </li>
      </ul>
    </div>
  </div>
</template>
