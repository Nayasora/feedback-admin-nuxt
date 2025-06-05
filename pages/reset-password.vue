<script setup lang="ts">
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "~/components/ui/card";
import ResetPassword from "~/components/auth/ResetPassword.vue";

definePageMeta({
  layout: 'blank',
})
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-6 bg-muted p-6 min-h-svh md:p-10">
    <div class="max-w-sm w-full flex flex-col gap-6">
      <NuxtLink to="#" class="flex items-center self-center gap-2 font-medium">
        <div class="h-6 w-6 flex items-center justify-center rounded-md bg-primary text-primary-foreground">
          <Icon name="i-lucide-gallery-vertical-end" class-name="size-4" />
        </div>
        Wise Feedback
      </NuxtLink>
      <Card>
        <CardHeader class="text-center">
          <CardTitle class="text-xl">
            Құпия сөзді қалпына келтіру
          </CardTitle>
          <CardDescription>
            Құпия сөзді қалпына келтіру үшін электрондық поштаңызды енгізіңіз
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div class="grid mx-auto max-w-sm gap-6">
            <ResetPassword />
            <p class="text-center text-sm text-muted-foreground">
              Аккаунтыңыз бар ма?
              <NuxtLink
                  to="/login"
                  class="underline underline-offset-4 hover:text-primary"
              >
                Кіру
              </NuxtLink>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<style scoped>

</style>