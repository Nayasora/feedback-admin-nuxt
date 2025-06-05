import type { NavMenu, NavMenuItems } from '~/scripts/nav'

export const navMenu: NavMenu[] = [
  {
    heading: 'General',
    items: [
      {
        title: 'Analytics',
        icon: 'i-lucide-bar-chart-2',
        link: '/',
      },
      {
        title: 'Tasks',
        icon: 'i-lucide-calendar-check-2',
        link: '/tasks',
        new: true,
      },
      {
        title: 'Account',
        'icon': 'i-lucide-user',
        link: '/account',
      }
    ]
  }
]