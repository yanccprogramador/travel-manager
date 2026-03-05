<script setup lang="ts">
import { computed, inject, onMounted, ref } from 'vue'
import { fetchTravelRequests, type TravelRequest, type TravelRequestFilters } from '../api'
import TravelRequestForm from '../components/TravelRequestForm.vue'
import TravelRequestTable from '../components/TravelRequestTable.vue'
import type { AuthState } from '../main'

const auth = inject<AuthState>('auth')

const filters = ref<TravelRequestFilters>({
  status: '',
  destination: '',
  from_date: '',
  to_date: '',
})

const items = ref<TravelRequest[]>([])
const loading = ref<boolean>(false)
const feedback = ref<{ type: '' | 'success' | 'error'; message: string }>({
  type: '',
  message: '',
})

const isAdmin = computed(() => auth?.user?.role === 'admin')

async function loadRequests() {
  loading.value = true
  feedback.value = { type: '', message: '' }
  try {
    items.value = await fetchTravelRequests(filters.value)
  } catch (error) {
    feedback.value = {
      type: 'error',
      message: (error as Error).message || 'Não foi possível carregar os pedidos.',
    }
  } finally {
    loading.value = false
  }
}

function handleFeedback(payload: { type: 'success' | 'error'; message: string }) {
  feedback.value = payload
}

function clearFilters() {
  filters.value = {
    status: '',
    destination: '',
    from_date: '',
    to_date: '',
  }
  loadRequests()
}

onMounted(() => {
  loadRequests()
})
</script>

<template>
  <div class="flex flex-col gap-5">
    <section class="grid grid-cols-1 lg:grid-cols-[1.6fr_1.1fr] gap-5">
      <TravelRequestForm @created="loadRequests" />

      <div class="bg-white p-5 px-6 rounded-2xl shadow-[0_10px_25px_-10px_rgba(15,23,42,0.15)] border border-gray-200">
        <h2 class="m-0 mb-4 text-[1.1rem] font-semibold">Filtros</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <label class="flex flex-col gap-1 text-[0.85rem]">
            <span class="text-gray-600">Status</span>
            <select v-model="filters.status" class="px-3 py-2 border border-gray-300 rounded-lg text-[0.9rem] outline-none transition-all focus:border-blue-600 focus:ring-1 focus:ring-blue-600/20 bg-white">
              <option value="">Todos</option>
              <option value="solicitado">Solicitado</option>
              <option value="aprovado">Aprovado</option>
              <option value="cancelado">Cancelado</option>
            </select>
          </label>

          <label class="flex flex-col gap-1 text-[0.85rem]">
            <span class="text-gray-600">Destino</span>
            <input
              v-model="filters.destination"
              type="text"
              placeholder="Pesquisar por destino"
              class="px-3 py-2 border border-gray-300 rounded-lg text-[0.9rem] outline-none transition-all focus:border-blue-600 focus:ring-1 focus:ring-blue-600/20"
            />
          </label>

          <label class="flex flex-col gap-1 text-[0.85rem]">
            <span class="text-gray-600">Ida a partir de</span>
            <input v-model="filters.from_date" type="date" class="px-3 py-2 border border-gray-300 rounded-lg text-[0.9rem] outline-none transition-all focus:border-blue-600 focus:ring-1 focus:ring-blue-600/20" />
          </label>

          <label class="flex flex-col gap-1 text-[0.85rem]">
            <span class="text-gray-600">Volta até</span>
            <input v-model="filters.to_date" type="date" class="px-3 py-2 border border-gray-300 rounded-lg text-[0.9rem] outline-none transition-all focus:border-blue-600 focus:ring-1 focus:ring-blue-600/20" />
          </label>
        </div>

        <div class="mt-4 flex justify-end gap-2">
          <button type="button" class="bg-white border text-gray-700 border-gray-300 hover:opacity-95 active:translate-y-px rounded-full px-4 py-[0.45rem] text-[0.85rem] font-medium transition-all" @click="clearFilters">
            Limpar
          </button>
          <button type="button" class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:opacity-95 active:translate-y-px rounded-full px-4 py-[0.45rem] border-none text-[0.85rem] font-medium transition-all" @click="loadRequests">
            Aplicar filtros
          </button>
        </div>
      </div>
    </section>

    <section class="flex flex-col gap-2">
      <TravelRequestTable
        :items="items"
        :loading="loading"
        :is-admin="isAdmin"
        @refresh="loadRequests"
        @feedback="handleFeedback"
      />

      <p v-if="feedback.message" class="text-[0.85rem]" :class="feedback.type === 'error' ? 'text-red-700' : 'text-green-700'">
        {{ feedback.message }}
      </p>
    </section>
  </div>
</template>

