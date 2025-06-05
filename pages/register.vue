<script setup lang="ts">
import SignUp from "~/components/auth/SignUp.vue";
import AuthLayout from "~/components/auth/AuthLayout.vue";

definePageMeta({
  layout: 'blank',
})
</script>

<template>
  <AuthLayout reverse>
    <div class="grid mx-auto max-w-sm gap-6">
      <div class="flex flex-col text-center space-y-2">
        <h1 class="text-2xl font-semibold tracking-tight">
          Аккаунт құру
        </h1>
        <p class="text-sm text-muted-foreground">
          Аккаунт құру үшін электрондық поштаңызды енгізіңіз
        </p>
      </div>
      <SignUp />
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
  </AuthLayout>
</template>

<style scoped>

</style>