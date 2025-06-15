import type { NavMenu, NavMenuItems } from '~/scripts/nav'

export const navMenu: NavMenu[] = [
  {
    heading: 'Басты мәзір',
    items: [
      {
        title: 'Басты шолу',
        icon: 'i-lucide-bar-chart-2',
        link: '/',
      },
      {
        title: 'Пікірлер',
        icon: 'i-lucide-calendar-check-2',
        link: '/tasks',
      },
      {
        title: 'Аккаунт',
        'icon': 'i-lucide-user',
        link: '/account',
      }
    ]
  }
]