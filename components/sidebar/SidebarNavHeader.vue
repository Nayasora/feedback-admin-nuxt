<script setup lang="ts">
import {SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar} from '~/components/ui/sidebar'
import {DropdownMenu, DropdownMenuShortcut, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator } from "~/components/ui/dropdown-menu";

const { isMobile } = useSidebar()
</script>

<template>
  <SidebarMenu>
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <SidebarMenuButton
            size="lg"
            class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-semibold">
                Жеке кабинет
              </span>
            </div>
            <Icon name="i-lucide-chart-line" class="ml-auto" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
      </DropdownMenu>
    </SidebarMenuItem>
  </SidebarMenu>
</template>

<style scoped>

</style>
