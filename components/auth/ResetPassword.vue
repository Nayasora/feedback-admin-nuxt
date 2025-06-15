<script setup lang="ts">
import { Loader2 } from 'lucide-vue-next'
import {Input} from "~/components/ui/input";
import {Button} from "~/components/ui/button";
import {Label} from "~/components/ui/label";
import { useAuth } from '~/composables/useAuth'

const email = ref('')
const isLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const { resetPassword } = useAuth()

async function onSubmit(event: Event) {
  event.preventDefault()

  if (!email.value) {
    errorMessage.value = 'Электрондық поштаны енгізіңіз'
    return
  }

  isLoading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    await resetPassword(email.value)
    successMessage.value = 'Құпия сөзді қалпына келтіру сілтемесі электрондық поштаңызға жіберілді'
  } catch (error: any) {
    console.error('Құпия сөзді қалпына келтіру қатесі:', error)

    switch (error.message) {
      case 'User not found':
        errorMessage.value = 'Бұл электрондық пошта тіркелмеген'
        break
      case 'Invalid email':
        errorMessage.value = 'Дұрыс емес электрондық пошта форматы'
        break
      default:
        errorMessage.value = 'Қате орын алды. Қайталап көріңіз'
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <form @submit="onSubmit">
    <div class="grid gap-4">
      <div v-if="errorMessage" class="text-sm text-red-600 bg-red-50 p-3 rounded-md">
        {{ errorMessage }}
      </div>

      <div v-if="successMessage" class="text-sm text-green-600 bg-green-50 p-3 rounded-md">
        {{ successMessage }}
      </div>

      <div class="grid gap-2">
        <Label for="email">
          Электрондық пошта
        </Label>
        <Input
            id="email"
            v-model="email"
            placeholder="name@example.com"
            type="email"
            auto-capitalize="none"
            auto-complete="email"
            auto-correct="off"
            :disabled="isLoading"
            required
        />
      </div>

      <Button type="submit" :disabled="isLoading">
        <Loader2 v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
        Жіберу
      </Button>
    </div>
  </form>
</template>