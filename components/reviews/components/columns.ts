import type { ColumnDef } from '@tanstack/vue-table'
import type { Review } from '../data/schema'
import { h } from 'vue'
import { sentiments } from '../data/data'
import DataTableColumnHeader from './DataTableColumnHeader.vue'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export const columns: ColumnDef<Review>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'ID' }),
    cell: ({ row }) => h('div', { class: 'w-20 font-mono text-xs' }, row.getValue('id').substring(0, 8) + '...'),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'user',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Пайдаланушы' }),
    cell: ({ row }) => {
      const user = row.getValue('user') as any
      if (!user) return h('span', { class: 'text-muted-foreground' }, 'Белгісіз')

      return h('div', { class: 'flex items-center space-x-2' }, [
        h(Avatar, { class: 'h-6 w-6' }, [
          h(AvatarImage, { src: user.avatar_url }),
          h(AvatarFallback, user.username?.charAt(0).toUpperCase() || 'П')
        ]),
        h('span', { class: 'font-medium' }, user.username),
      ])
    },
    enableSorting: false,
  },
  {
    accessorKey: 'product',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Өнім' }),
    cell: ({ row }) => {
      const product = row.getValue('product') as any
      if (!product) return h('span', { class: 'text-muted-foreground' }, 'Белгісіз')

      return h('div', { class: 'flex items-center space-x-2 max-w-[200px]' }, [
        product.image_url && h('img', {
          src: product.image_url,
          alt: product.name,
          class: 'h-6 w-6 rounded object-cover'
        }),
        h('span', { class: 'truncate font-medium' }, product.name),
      ])
    },
    enableSorting: false,
  },
  {
    accessorKey: 'rating',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Бағалау' }),
    cell: ({ row }) => {
      const rating = row.getValue('rating') as number

      return h('div', { class: 'flex items-center space-x-1' }, [
        ...Array(5).fill(0).map((_, i) =>
            h('svg', {
              class: `h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`,
              viewBox: '0 0 20 20',
              fill: 'currentColor'
            }, [
              h('path', { d: 'M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' })
            ])
        ),
        h('span', { class: 'ml-2 text-sm font-medium' }, rating.toString())
      ])
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id).toString())
    },
  },
  {
    accessorKey: 'sentiment',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Көңіл-күй' }),
    cell: ({ row }) => {
      const sentiment = sentiments.find(
          sentiment => sentiment.value === row.getValue('sentiment'),
      )

      if (!sentiment) return null

      const colors = {
        positive: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        neutral: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
        negative: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
      }

      return h(Badge, {
        class: `${colors[sentiment.value as keyof typeof colors]} border-0`,
        variant: 'secondary'
      }, [
        sentiment.icon && h(sentiment.icon, { class: 'mr-1 h-3 w-3' }),
        sentiment.label,
      ])
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'text',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Шолу мәтіні' }),
    cell: ({ row }) => {
      const text = row.getValue('text') as string
      return h('div', {
        class: 'max-w-[300px] truncate text-sm',
        title: text
      }, text)
    },
    enableSorting: false,
  },
  {
    accessorKey: 'created_at',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Құрылған күні' }),
    cell: ({ row }) => {
      const date = new Date(row.getValue('created_at'))
      return h('div', { class: 'text-sm text-muted-foreground' },
          date.toLocaleDateString('kk-KZ')
      )
    },
  },
]