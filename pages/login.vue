<script setup lang="ts">
import AuthLayout from "~/components/auth/AuthLayout.vue";
import SignIn from "~/components/auth/SignIn.vue";

definePageMeta({
  layout: 'blank',
})
</script>

<template>
  <AuthLayout reverse>
    <div class="grid mx-auto max-w-sm gap-6">
      <div class="grid gap-2 text-center">
        <h1 class="text-2xl font-semibold tracking-tight">
          Wise Feedback
        </h1>
        <p class="text-balance text-sm text-muted-foreground">
          Аккаунтыңызға кіріңіз
        </p>
      </div>
      <SignIn />
    </div>
  </AuthLayout>
</template>