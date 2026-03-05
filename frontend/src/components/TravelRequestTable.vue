<script setup lang="ts">
import { computed } from 'vue'
import { updateTravelRequestStatus, type TravelRequest } from '../api'

const props = defineProps<{
  items: TravelRequest[]
  loading?: boolean
  isAdmin?: boolean
}>()

const emit = defineEmits<{
  (e: 'refresh'): void
  (e: 'feedback', payload: { type: 'success' | 'error'; message: string }): void
}>()

const hasItems = computed(() => props.items && props.items.length > 0)

async function changeStatus(item: TravelRequest, status: string) {
  try {
    await updateTravelRequestStatus(item.id, status)
    emit('feedback', { type: 'success', message: 'Status atualizado com sucesso.' })
    emit('refresh')
  } catch (error) {
    emit('feedback', {
      type: 'error',
      message: (error as Error).message || 'Não foi possível atualizar o status.',
    })
  }
}

function canApprove(item: TravelRequest): boolean {
  return props.isAdmin && item.status === 'solicitado'
}

function canCancel(item: TravelRequest): boolean {
  return props.isAdmin && item.status === 'solicitado'
}
</script>

<template>
  <div class="bg-white rounded-2xl p-5 md:px-6 border border-gray-200 shadow-[0_10px_20px_-12px_rgba(15,23,42,0.15)]">
    <div class="flex justify-between items-center mb-3">
      <h2 class="m-0 text-[1.05rem] font-semibold text-gray-900">Pedidos de viagem</h2>
    </div>

    <div v-if="loading" class="flex items-center gap-2 py-3 text-gray-600 text-[0.9rem]">
      <div class="w-4 h-4 rounded-full border-2 border-gray-300 border-t-blue-600 animate-spin"></div>
      <span>Carregando pedidos...</span>
    </div>

    <div v-else class="overflow-x-auto">
      <table class="w-full border-collapse text-[0.85rem]">
        <thead>
          <tr>
            <th class="p-2.5 px-2 text-left font-semibold text-gray-600 bg-gray-50 border-b border-gray-200">ID</th>
            <th class="p-2.5 px-2 text-left font-semibold text-gray-600 bg-gray-50 border-b border-gray-200">Solicitante</th>
            <th class="p-2.5 px-2 text-left font-semibold text-gray-600 bg-gray-50 border-b border-gray-200">Destino</th>
            <th class="p-2.5 px-2 text-left font-semibold text-gray-600 bg-gray-50 border-b border-gray-200">Ida</th>
            <th class="p-2.5 px-2 text-left font-semibold text-gray-600 bg-gray-50 border-b border-gray-200">Volta</th>
            <th class="p-2.5 px-2 text-left font-semibold text-gray-600 bg-gray-50 border-b border-gray-200">Status</th>
            <th v-if="isAdmin" class="p-2.5 px-2 text-left font-semibold text-gray-600 bg-gray-50 border-b border-gray-200">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="!hasItems">
            <td colspan="7" class="text-center text-gray-500 py-4 px-2">
              Nenhum pedido encontrado para os filtros atuais.
            </td>
          </tr>
          <tr v-for="item in items" :key="item.id" class="even:bg-gray-50">
            <td class="p-2.5 px-2 border-b border-gray-200">#{{ item.id }}</td>
            <td class="p-2.5 px-2 border-b border-gray-200">{{ item.requester_name }}</td>
            <td class="p-2.5 px-2 border-b border-gray-200">{{ item.destination }}</td>
            <td class="p-2.5 px-2 border-b border-gray-200">{{ item.departure_date }}</td>
            <td class="p-2.5 px-2 border-b border-gray-200">{{ item.return_date }}</td>
            <td class="p-2.5 px-2 border-b border-gray-200">
              <span class="py-1 px-2.5 rounded-full text-xs font-medium" :class="{
                'bg-blue-50 text-blue-700': item.status === 'solicitado',
                'bg-green-50 text-green-800': item.status === 'aprovado',
                'bg-red-50 text-red-700': item.status === 'cancelado'
              }">
                {{ item.status }}
              </span>
            </td>
            <td v-if="isAdmin" class="p-2.5 px-2 border-b border-gray-200">
              <div class="flex gap-1.5">
                <button
                  v-if="canApprove(item)"
                  type="button"
                  class="rounded-full border-none py-1 px-3 text-xs font-medium cursor-pointer transition-all hover:opacity-95 active:translate-y-px bg-green-500 text-white"
                  @click="changeStatus(item, 'aprovado')"
                >
                  Aprovar
                </button>
                <button
                  v-if="canCancel(item)"
                  type="button"
                  class="rounded-full border-none py-1 px-3 text-xs font-medium cursor-pointer transition-all hover:opacity-95 active:translate-y-px bg-red-500 text-white"
                  @click="changeStatus(item, 'cancelado')"
                >
                  Cancelar
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

