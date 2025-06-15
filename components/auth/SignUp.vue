<script setup lang="ts">
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-vue-next'
import PasswordInput from '~/components/common/PasswordInput.vue'
import {Input} from "~/components/ui/input";
import {Button} from "~/components/ui/button";
import {Label} from "~/components/ui/label";
import { useAuth } from '~/composables/useAuth'

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const isLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const { signUp } = useAuth()

async function onSubmit(event: Event) {
  event.preventDefault()

  if (!name.value || !email.value || !password.value || !confirmPassword.value) {
    errorMessage.value = 'Барлық өрістерді толтырыңыз'
    return
  }

  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Құпия сөздер сәйкес келмейді'
    return
  }

  if (password.value.length < 6) {
    errorMessage.value = 'Құпия сөз кемінде 6 таңбадан тұруы керек'
    return
  }

  isLoading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    await signUp(email.value, password.value, { full_name: name.value })
    successMessage.value = 'Тіркелу сәтті! Электрондық поштаңызды тексеріңіз'
  } catch (error: any) {
    console.error('Тіркелу қатесі:', error)

    switch (error.message) {
      case 'User already registered':
        errorMessage.value = 'Бұл электрондық пошта тіркелген'
        break
      case 'Password should be at least 6 characters':
        errorMessage.value = 'Құпия сөз кемінде 6 таңбадан тұруы керек'
        break
      case 'Invalid email':
        errorMessage.value = 'Дұрыс емес электрондық пошта форматы'
        break
      default:
        errorMessage.value = 'Тіркелу қатесі. Қайталап көріңіз'
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div :class="cn('grid gap-6', $attrs.class ?? '')">
    <form @submit="onSubmit">
      <div class="grid gap-4">
        <div v-if="errorMessage" class="text-sm text-red-600 bg-red-50 p-3 rounded-md">
          {{ errorMessage }}
        </div>

        <div v-if="successMessage" class="text-sm text-green-600 bg-green-50 p-3 rounded-md">
          {{ successMessage }}
        </div>

        <div class="grid gap-2">
          <Label for="name">
            Аты
          </Label>
          <Input
              id="name"
              v-model="name"
              placeholder="Атыңызды енгізіңіз"
              type="text"
              autocapitalize="none"
              autocomplete="name"
              autocorrect="off"
              :disabled="isLoading"
              required
          />
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
              autocapitalize="none"
              autocomplete="email"
              autocorrect="off"
              :disabled="isLoading"
              required
          />
        </div>

        <div class="grid gap-2">
          <Label for="password">
            Құпия сөз
          </Label>
          <PasswordInput
              id="password"
              v-model="password"
              autocomplete="new-password"
              :disabled="isLoading"
              required
          />
        </div>

        <div class="grid gap-2">
          <Label for="confirm-password">
            Құпия сөзді растау
          </Label>
          <PasswordInput
              id="confirm-password"
              v-model="confirmPassword"
              autocomplete="new-password"
              :disabled="isLoading"
              required
          />
        </div>

        <Button type="submit" :disabled="isLoading">
          <Loader2 v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
          Тіркелу
        </Button>
      </div>
    </form>
  </div>
</template>