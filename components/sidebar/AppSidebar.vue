<script setup lang="ts">
import type { NavGroup, NavLink, NavSectionTitle } from '~/scripts/nav'
import { navMenu } from '~/scripts/menus'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarRail
} from "~/components/ui/sidebar";

function resolveNavItemComponent(item: NavLink | NavGroup | NavSectionTitle): any {
  if ('children' in item)
    return resolveComponent('SidebarNavGroup')

  return resolveComponent('SidebarNavLink')
}

const user: {
  name: string
  email: string
  avatar: string
} = {
  name: 'Dian Pratama',
  email: 'dianpratama2@gmail.com',
  avatar: '/avatars/avatartion.png',
}


</script>

<template>
  <Sidebar collapsible="offcanvas" side="left" variant="sidebar">
    <SidebarHeader>
      <SidebarNavHeader />
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup v-for="(nav, indexGroup) in navMenu" :key="indexGroup">
        <SidebarGroupLabel v-if="nav.heading">
          {{ nav.heading }}
        </SidebarGroupLabel>
        <component :is="resolveNavItemComponent(item)" v-for="(item, index) in nav.items" :key="index" :item="item" />
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      <SidebarNavFooter :user="user" />
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>

<style scoped>

</style>
