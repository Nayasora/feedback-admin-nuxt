<script setup lang="ts">
import Logo from "~/components/common/Logo.vue";

defineProps<{
  reverse?: boolean
}>()
</script>

<template>
  <div
      class="relative flex items-center justify-center px-4 h-dvh lg:max-w-none lg:px-0"
      :class="{ 'flex-row-reverse': reverse }"
  >
    <div class="relative hidden h-full flex-1 flex-col bg-muted p-10 text-white lg:flex">
      <div class="absolute inset-0" />
      <div class="relative z-20 flex items-center justify-center h-full text-lg font-medium w-full">
        <Logo size="300px" />
      </div>
    </div>
    <div class="mx-auto flex-1 lg:p-8">
      <slot />
    </div>
  </div>
</template>

<style scoped>

</style>