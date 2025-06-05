<script setup lang="ts">
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-vue-next'
import PasswordInput from '~/components/common/PasswordInput.vue'
import {Input} from "~/components/ui/input";
import {Button} from "~/components/ui/button";
import {Label} from "~/components/ui/label";

const isLoading = ref(false)
async function onSubmit(event: Event) {
  event.preventDefault()
  isLoading.value = true

  setTimeout(() => {
    isLoading.value = false
  }, 3000)
}
</script>

<template>
  <div :class="cn('grid gap-6', $attrs.class ?? '')">
    <form @submit="onSubmit">
      <div class="grid gap-4">
        <div class="grid gap-2">
          <Label for="name">
            Аты
          </Label>
          <Input
              id="name"
              placeholder="Атыңызды енгізіңіз"
              type="text"
              autocapitalize="none"
              autocomplete="name"
              autocorrect="off"
              :disabled="isLoading"
          />
        </div>
        <div class="grid gap-2">
          <Label for="email">
            Электрондық пошта
          </Label>
          <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autocapitalize="none"
              autocomplete="email"
              autocorrect="off"
              :disabled="isLoading"
          />
        </div>
        <div class="grid gap-2">
          <Label for="password">
            Құпия сөз
          </Label>
          <PasswordInput id="password" autocomplete="new-password" />
        </div>
        <div class="grid gap-2">
          <Label for="confirm-password">
            Құпия сөзді растау
          </Label>
          <PasswordInput id="confirm-password" autocomplete="new-password" />
        </div>
        <Button :disabled="isLoading">
          <Loader2 v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
          Электрондық поштамен кіру
        </Button>
      </div>
    </form>
  </div>
</template>