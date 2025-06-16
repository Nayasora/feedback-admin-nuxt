<script setup lang="ts">
import { columns } from '~/components/reviews/components/columns'
import DataTable from '~/components/reviews/components/DataTable.vue'
import type { Review } from '~/components/reviews/data/schema'
import { Button } from '~/components/ui/button'

// Reactive data
const reviews = ref<Review[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

// Fetch reviews from API
const fetchReviews = async () => {
  try {
    loading.value = true
    error.value = null
    const data = await $fetch<Review[]>('/api/reviews')
    reviews.value = data
  } catch (err) {
    console.error('Failed to fetch reviews:', err)
    error.value = 'Пікірлерды жүктеу мүмкін болмады. Қайталап көріңіз.'
  } finally {
    loading.value = false
  }
}

// Fetch reviews on component mount
onMounted(() => {
  fetchReviews()
})

// Set page meta
definePageMeta({
  title: 'Пікірлер'
})
</script>

<template>
  <div class="w-full flex flex-col items-stretch gap-4">
    <div class="flex flex-wrap items-end justify-between gap-2">
      <div>
        <h2 class="text-2xl font-bold tracking-tight">
          Пікірлер
        </h2>
        <p class="text-muted-foreground">
          Тұтынушылардың Пікірлерын басқару және талдау
        </p>
      </div>
      <div class="flex gap-2">
        <Button @click="fetchReviews" :disabled="loading">
          <Icon name="i-radix-icons-reload" :class="{ 'animate-spin': loading }" class="mr-2 h-4 w-4" />
          Жаңарту
        </Button>
      </div>
    </div>

    <!-- Error state -->
    <div v-if="error" class="rounded-md border border-red-200 bg-red-50 p-4">
      <div class="flex">
        <Icon name="i-radix-icons-exclamation-triangle" class="h-5 w-5 text-red-400" />
        <div class="ml-3">
          <h3 class="text-sm font-medium text-red-800">Қате</h3>
          <p class="mt-1 text-sm text-red-700">{{ error }}</p>
        </div>
      </div>
    </div>

    <!-- Data table -->
    <DataTable
        :data="reviews"
        :columns="columns"
        :loading="loading"
    />
  </div>
</template>