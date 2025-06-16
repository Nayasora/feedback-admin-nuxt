import { Icon } from '#components'
import { h } from 'vue'

export const sentiments = [
  {
    value: 'positive',
    label: 'Оң',
    icon: h(Icon, { name: 'i-radix-icons-face-smile' }),
  },
  {
    value: 'neutral',
    label: 'Бейтарап',
    icon: h(Icon, { name: 'i-radix-icons-face-neutral' }),
  },
  {
    value: 'negative',
    label: 'Теріс',
    icon: h(Icon, { name: 'i-radix-icons-face-frown' }),
  },
]

export const ratings = [
  {
    value: '1',
    label: '1 жұлдыз',
    icon: h(Icon, { name: 'i-radix-icons-star' }),
  },
  {
    value: '2',
    label: '2 жұлдыз',
    icon: h(Icon, { name: 'i-radix-icons-star' }),
  },
  {
    value: '3',
    label: '3 жұлдыз',
    icon: h(Icon, { name: 'i-radix-icons-star' }),
  },
  {
    value: '4',
    label: '4 жұлдыз',
    icon: h(Icon, { name: 'i-radix-icons-star' }),
  },
  {
    value: '5',
    label: '5 жұлдыз',
    icon: h(Icon, { name: 'i-radix-icons-star' }),
  },
]