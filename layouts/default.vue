<script setup lang="ts">
import {SidebarInset, SidebarProvider} from "~/components/ui/sidebar";
import AppSidebar from "~/components/sidebar/AppSidebar.vue";
import Header from "~/components/Header.vue";
</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <Header />
      <div class="min-w-0 w-full flex-1 overflow-x-auto p-4 lg:p-6">
        <slot />
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>

<style scoped>

</style>
