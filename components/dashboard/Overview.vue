  <script setup lang="ts">
import {BarChart} from "~/components/ui/chart-bar";

const data = [
  { name: 'Қаң', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Ақп', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Нау', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Сәу', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Мам', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Мау', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Шіл', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Там', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Қыр', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Қаз', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Қар', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Жел', total: Math.floor(Math.random() * 5000) + 1000 },
]
</script>

  <template>
    <BarChart
        :data="data"
        :categories="['total']"
        index="name"
        :rounded-corners="4"
        :colors="['oklch(0.5 0.25 280)']"
    />
  </template>