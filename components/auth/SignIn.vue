<script setup lang="ts">
import { Loader2 } from 'lucide-vue-next'
import PasswordInput from '~/components/common/PasswordInput.vue'
import {Button} from "~/components/ui/button";
import {Separator} from "~/components/ui/separator";
import {Label} from "~/components/ui/label";
import {Input} from "~/components/ui/input";
import { useAuth } from '~/composables/useAuth'

const email = ref('')
const password = ref('')
const isLoading = ref(false)
const errorMessage = ref('')

const { signIn } = useAuth()

async function onSubmit(event: Event) {
  event.preventDefault()

  if (!email.value || !password.value) {
    errorMessage.value = 'Барлық өрістерді толтырыңыз'
    return
  }

  isLoading.value = true
  errorMessage.value = ''

  try {
    await signIn(email.value, password.value)
    await navigateTo('/')
  } catch (error: any) {
    console.error('Кіру қатесі:', error)

    // Translate common Supabase errors to Kazakh
    switch (error.message) {
      case 'Invalid login credentials':
        errorMessage.value = 'Дұрыс емес электрондық пошта немесе құпия сөз'
        break
      case 'Email not confirmed':
        errorMessage.value = 'Электрондық поштаңызды растауыңыз керек'
        break
      case 'Too many requests':
        errorMessage.value = 'Тым көп әрекет. Кейінірек көрініңіз'
        break
      default:
        errorMessage.value = 'Кіру қатесі. Қайталап көріңіз'
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <form class="grid gap-6" @submit="onSubmit">
    <div v-if="errorMessage" class="text-sm text-red-600 bg-red-50 p-3 rounded-md">
      {{ errorMessage }}
    </div>

    <Separator label="Немесе жалғастыру" />

    <div class="grid gap-2">
      <Label for="email">
        Электрондық пошта
      </Label>
      <Input
          id="email"
          v-model="email"
          type="email"
          placeholder="name@example.com"
          :disabled="isLoading"
          auto-capitalize="none"
          auto-complete="email"
          auto-correct="off"
          required
      />
    </div>

    <div class="grid gap-2">
      <div class="flex items-center">
        <Label for="password">
          Құпия сөз
        </Label>
        <NuxtLink
            to="/reset-password"
            class="ml-auto inline-block text-sm underline"
        >
          Құпия сөзіңізді ұмыттыңыз ба?
        </NuxtLink>
      </div>
      <PasswordInput id="password" v-model="password" :disabled="isLoading" required />
    </div>

    <Button type="submit" class="w-full" :disabled="isLoading">
      <Loader2 v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
      Кіру
    </Button>
  </form>

  <div class="mt-4 text-center text-sm text-muted-foreground">
    Аккаунтыңыз жоқ па?
    <NuxtLink to="/register" class="underline">
      Тіркелу
    </NuxtLink>
  </div>
</template>