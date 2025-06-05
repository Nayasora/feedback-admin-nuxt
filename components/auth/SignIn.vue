<script setup lang="ts">
import { Loader2 } from 'lucide-vue-next'
import PasswordInput from '~/components/common/PasswordInput.vue'
import {Button} from "~/components/ui/button";
import {Separator} from "~/components/ui/separator";
import {Label} from "~/components/ui/label";
import {Input} from "~/components/ui/input";

const email = ref('demo@gmail.com')
const password = ref('password')
const isLoading = ref(false)

function onSubmit(event: Event) {
  event.preventDefault()
  if (!email.value || !password.value)
    return

  isLoading.value = true

  setTimeout(() => {
    if (email.value === 'demo@gmail.com' && password.value === 'password')
      navigateTo('/')

    isLoading.value = false
  }, 3000)
}
</script>

<template>
  <form class="grid gap-6" @submit="onSubmit">
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
      <PasswordInput id="password" v-model="password" />
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

<style scoped>

</style>