<script setup lang="ts">
import {SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar} from '~/components/ui/sidebar'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuGroup, DropdownMenuSeparator } from '~/components/ui/dropdown-menu'
import {Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

const { isMobile, setOpenMobile } = useSidebar()
const { signOut } = useAuth()
const user = useSupabaseUser()

const userData = computed(() => {
  if (!user.value) return null

  return {
    name: user.value.user_metadata?.full_name || user.value.email?.split('@')[0] || 'User',
    email: user.value.email || '',
    avatar: user.value.user_metadata?.avatar_url || ''
  }
})

async function handleLogout() {
  try {
    await signOut()
  } catch (error) {
    console.error('Logout error:', error)
  }
}

const showModalTheme = ref(false)
</script>

<template>
  <SidebarMenu v-if="userData">
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <SidebarMenuButton
              size="lg"
              class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <Avatar class="h-8 w-8 rounded-lg">
              <AvatarImage :src="userData.avatar" :alt="userData.name" />
              <AvatarFallback class="rounded-lg">
                {{ userData.name.charAt(0).toUpperCase() }}
              </AvatarFallback>
            </Avatar>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-semibold">{{ userData.name }}</span>
              <span class="truncate text-xs">{{ userData.email }}</span>
            </div>
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
            class="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side="bottom"
            align="end"
            side-offset="4"
        >
          <DropdownMenuLabel class="p-0 font-normal">
            <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar class="h-8 w-8 rounded-lg">
                <AvatarImage :src="userData.avatar" :alt="userData.name" />
                <AvatarFallback class="rounded-lg">
                  {{ userData.name.charAt(0).toUpperCase() }}
                </AvatarFallback>
              </Avatar>
              <div class="grid flex-1 text-left text-sm leading-tight">
                <span class="truncate font-semibold">{{ userData.name }}</span>
                <span class="truncate text-xs">{{ userData.email }}</span>
              </div>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />
          <DropdownMenuItem @click="handleLogout">
            <Icon name="i-lucide-log-out" />
            Шығу
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  </SidebarMenu>
</template>