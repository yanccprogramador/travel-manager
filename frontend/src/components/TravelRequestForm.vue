<script setup lang="ts">
import { ref, computed } from 'vue'
import { createTravelRequest, type TravelRequestPayload } from '../api'

const emit = defineEmits<{
  (e: 'created'): void
}>()

const destination = ref<string>('')
const departureDate = ref<string>('')
const returnDate = ref<string>('')
const loading = ref<boolean>(false)
const errorMessage = ref<string>('')
const successMessage = ref<string>('')

const today = computed(() => {
  const d = new Date()
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().split('T')[0]
})

async function handleSubmit() {
  loading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    const payload: TravelRequestPayload = {
      destination: destination.value,
      departure_date: departureDate.value,
      return_date: returnDate.value,
    }

    await createTravelRequest(payload)

    successMessage.value = 'Pedido de viagem criado com sucesso.'
    destination.value = ''
    departureDate.value = ''
    returnDate.value = ''

    emit('created')
  } catch (error) {
    errorMessage.value = (error as Error).message || 'Não foi possível criar o pedido.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form class="bg-white p-5 px-6 rounded-2xl shadow-[0_10px_25px_-10px_rgba(15,23,42,0.15)] border border-gray-200" @submit.prevent="handleSubmit">
    <h2 class="m-0 mb-4 text-[1.1rem] font-semibold">Novo pedido de viagem</h2>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-[0.9rem]">
      <label class="flex flex-col gap-1 text-[0.85rem]">
        <span class="text-gray-600">Destino</span>
        <input
          v-model="destination"
          type="text"
          required
          placeholder="Cidade / País"
          class="px-3 py-2 border border-gray-300 rounded-lg text-[0.9rem] outline-none transition-all focus:border-blue-600 focus:ring-1 focus:ring-blue-600/20"
        />
      </label>

      <label class="flex flex-col gap-1 text-[0.85rem]">
        <span class="text-gray-600">Data de ida</span>
        <input v-model="departureDate" type="date" :min="today" required class="px-3 py-2 border border-gray-300 rounded-lg text-[0.9rem] outline-none transition-all focus:border-blue-600 focus:ring-1 focus:ring-blue-600/20" />
      </label>

      <label class="flex flex-col gap-1 text-[0.85rem]">
        <span class="text-gray-600">Data de volta</span>
        <input v-model="returnDate" type="date" :min="departureDate || today" required class="px-3 py-2 border border-gray-300 rounded-lg text-[0.9rem] outline-none transition-all focus:border-blue-600 focus:ring-1 focus:ring-blue-600/20" />
      </label>
    </div>

    <div class="mt-4 flex justify-end">
      <button class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:opacity-95 active:translate-y-px rounded-full px-4 py-2 border-none text-[0.9rem] font-medium transition-all disabled:opacity-65 disabled:cursor-default flex items-center justify-center gap-2" type="submit" :disabled="loading">
        <span v-if="!loading">Criar pedido</span>
        <span v-else class="w-[1rem] h-[1rem] rounded-full border-2 border-white/50 border-t-white animate-spin"></span>
      </button>
    </div>

    <p v-if="errorMessage" class="mt-3 text-[0.85rem] text-red-700">
      {{ errorMessage }}
    </p>
    <p v-if="successMessage" class="mt-3 text-[0.85rem] text-green-700">
      {{ successMessage }}
    </p>
  </form>
</template>

