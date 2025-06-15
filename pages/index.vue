<script setup lang="ts">
import NumberFlow from '@number-flow/vue'
import { Activity, CreditCard, DollarSign, Users, BarChart, TrendingUp, TrendingDown } from 'lucide-vue-next'
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import DateRangePicker from "~/components/common/DateRangePicker.vue"
import Overview from "~/components/dashboard/Overview.vue"
import { Avatar, AvatarFallback } from "~/components/ui/avatar"
import * as XLSX from 'xlsx';

const exportToExcel = () => {
  // Создаем рабочую книгу
  const workbook = XLSX.utils.book_new();

  // Данные для общей статистики
  const statsData = [
    ['Пікірлер статистикасы', ''],
    ['Жалпы пікірлер саны', analytics.value?.totalReviews || 0],
    ['Орташа рейтинг', analytics.value?.averageRating || 0],
    ['Жағымды пікірлер', analytics.value?.sentimentCounts.positive || 0],
    ['Бейтарап пікірлер', analytics.value?.sentimentCounts.neutral || 0],
    ['Жағымсыз пікірлер', analytics.value?.sentimentCounts.negative || 0],
  ];

  // Данные для последних отзывов
  const reviewsData = [
    ['Пайдаланушы', 'Пікір мәтіні', 'Рейтинг', 'Тоналдылық', 'Күні']
  ];

  dataRecentReviews.value.forEach(review => {
    reviewsData.push([
      review.userName || '',
      review.text,
      review.rating.toString(),
      review.sentiment === 'positive' ? 'Жағымды' :
          review.sentiment === 'neutral' ? 'Бейтарап' : 'Жағымсыз',
    ]);
  });

  // Создаем листы
  const statsSheet = XLSX.utils.aoa_to_sheet(statsData);
  const reviewsSheet = XLSX.utils.aoa_to_sheet(reviewsData);

// Парақтарды кітапқа қосу
  XLSX.utils.book_append_sheet(workbook, reviewsSheet, 'Соңғы пікірлер');
  XLSX.utils.book_append_sheet(workbook, statsSheet, 'Статистика');

// Файлды жүктеу
  const date = new Date().toISOString().split('T')[0];
  XLSX.writeFile(workbook, `Пікірлер_аналитикасы_${date}.xlsx`);
};

definePageMeta({
  middleware: 'auth'
})

interface Review {
  id: string
  userId: string
  productId: string
  rating: number
  text: string
  sentiment: 'positive' | 'neutral' | 'negative'
  createdAt: Date
  updatedAt?: Date
  userName?: string
  price?: string
}

interface AnalyticsData {
  totalReviews: number
  averageRating: number
  sentimentCounts: {
    positive: number
    neutral: number
    negative: number
  }
  sentimentPercentages: {
    positive: number
    neutral: number
    negative: number
  }
}

const dataCard = ref({
  totalRevenue: 0,
  totalRevenueDesc: 0,
  subscriptions: 0,
  subscriptionsDesc: 0,
  sales: 0,
  salesDesc: 0,
  activeNow: 0,
  activeNowDesc: 0,
})

const dataRecentReviews = ref<Review[]>([])
const analytics = ref<AnalyticsData | null>(null)
const loading = ref(true)
const activeTab = ref('analytics')

const fetchReviews = async () => {
  try {
    dataRecentReviews.value = await $fetch<Review[]>('/api/reviews')

    // Пайдаланушы аттары мен бағаларды мысал ретінде қосамыз
    // Нақты қолданбада бұл API-дан келуі керек
    dataRecentReviews.value = dataRecentReviews.value.map(review => ({
      ...review,
      userName: `Пайдаланушы ${review.user.username}`,
      price: `$${(Math.random() * 100).toFixed(2)}`
    }))
  } catch (error) {
    console.error('Пікірлерді жүктеу кезінде қате:', error)
  }
}

const fetchAnalytics = async () => {
  try {
    analytics.value = await $fetch<AnalyticsData>('/api/reviews/analytics')
  } catch (error) {
    console.error('Аналитиканы жүктеу кезінде қате:', error)
  } finally {
    loading.value = false
  }
}

const getInitials = (name: string): string => {
  return name.split(' ').map((n) => n[0]).join('')
}

onMounted(async () => {
  dataCard.value = {
    totalRevenue: 45231.89,
    totalRevenueDesc: 20.1 / 100,
    subscriptions: 2350,
    subscriptionsDesc: 180.5 / 100,
    sales: 12234,
    salesDesc: 45 / 100,
    activeNow: 573,
    activeNowDesc: 201,
  }

  await Promise.all([fetchReviews(), fetchAnalytics()])
})
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="flex flex-wrap items-center justify-between gap-2">
      <h2 class="text-2xl font-bold tracking-tight">
        Пікірлерді талдау тақтасы
      </h2>
      <div class="flex items-center space-x-2">
        <Button @click="exportToExcel">Жүктеу</Button>
      </div>
    </div>

    <main class="flex flex-1 flex-col gap-4 md:gap-8">
      <div class="grid gap-4 lg:grid-cols-4 md:grid-cols-2 md:gap-8">
        <Card>
          <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle class="text-sm font-medium">
              Барлық пікірлер
            </CardTitle>
            <Users class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">
              <NumberFlow
                  :value="analytics?.totalReviews || 0"
              />
            </div>
            <p class="text-xs text-muted-foreground">
              жүйенің жұмысын бастағаннан бері
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle class="text-sm font-medium">
              Орташа рейтинг
            </CardTitle>
            <BarChart class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">
              <NumberFlow
                  :value="analytics?.averageRating || 0"
                  :format="{ minimumFractionDigits: 1, maximumFractionDigits: 1 }"
              />
            </div>
            <p class="text-xs text-muted-foreground">
              5 ұпайдан
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle class="text-sm font-medium">
              Жағымды пікірлер
            </CardTitle>
            <TrendingUp class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">
              <NumberFlow
                  :value="analytics?.sentimentCounts.positive || 0"
              />
            </div>
            <p class="text-xs text-muted-foreground">
              <NumberFlow
                  :value="analytics?.sentimentPercentages.positive ? analytics.sentimentPercentages.positive / 100 : 0"
                  :format="{ style: 'percent', minimumFractionDigits: 1 }"
              /> жалпы санынан
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle class="text-sm font-medium">
              Жағымсыз пікірлер
            </CardTitle>
            <TrendingDown class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">
              <NumberFlow
                  :value="analytics?.sentimentCounts.negative || 0"
              />
            </div>
            <p class="text-xs text-muted-foreground">
              <NumberFlow
                  :value="analytics?.sentimentPercentages.negative ? analytics.sentimentPercentages.negative / 100 : 0"
                  :format="{ style: 'percent', minimumFractionDigits: 1 }"
              /> жалпы санынан
            </p>
          </CardContent>
        </Card>
      </div>

      <div class="grid gap-4 lg:grid-cols-2 xl:grid-cols-3 md:gap-8">
        <Card class="xl:col-span-2">
          <CardHeader>
            <CardTitle>Шолу</CardTitle>
          </CardHeader>
          <CardContent class="pl-2">
            <Overview />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Соңғы пікірлер</CardTitle>
          </CardHeader>
          <CardContent class="grid gap-8">
            <div v-if="loading" class="py-4 text-center text-muted-foreground">
              Жүктелуде...
            </div>
            <div v-else-if="dataRecentReviews.length === 0" class="py-4 text-center text-muted-foreground">
              Пікірлер табылмады
            </div>
            <div
                v-else
                v-for="review in dataRecentReviews.slice(0, 5)"
                :key="review.id"
                class="flex items-center gap-4"
            >
              <Avatar class="hidden h-9 w-9 sm:flex">
                <AvatarFallback>{{ getInitials(review.userName || '') }}</AvatarFallback>
              </Avatar>
              <div class="grid gap-1">
                <p class="text-sm font-medium leading-none">
                  {{ review.userName }}
                </p>
                <p class="text-sm text-muted-foreground">
                  {{ review.text.substring(0, 30) }}{{ review.text.length > 30 ? '...' : '' }}
                </p>
                <div class="flex items-center">
                      <span class="text-xs mr-2">
                        Рейтинг: {{ review.rating }}/5
                      </span>
                  <span
                      class="text-xs px-1.5 py-0.5 rounded-full"
                      :class="{
                          'bg-green-100 text-green-800': review.sentiment === 'positive',
                          'bg-gray-100 text-gray-800': review.sentiment === 'neutral',
                          'bg-red-100 text-red-800': review.sentiment === 'negative'
                        }"
                  >
                        {{ review.sentiment === 'positive' ? 'Жағымды' : review.sentiment === 'neutral' ? 'Бейтарап' : 'Жағымсыз' }}
                      </span>
                </div>
              </div>
              <div class="ml-auto font-medium">
                2GIS
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  </div>
</template>