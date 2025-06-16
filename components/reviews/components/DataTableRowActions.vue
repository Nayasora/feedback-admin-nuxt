<script setup lang="ts">
import type { Row } from '@tanstack/vue-table'
import type { Review } from '../data/schema'
import { computed } from 'vue'
import { reviewSchema } from '../data/schema'

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '~/components/ui/dropdown-menu'
import { Button } from '~/components/ui/button'

interface DataTableRowActionsProps {
  row: Row<Review>
}
const props = defineProps<DataTableRowActionsProps>()

const review = computed(() => reviewSchema.parse(props.row.original))

const emit = defineEmits<{
  editReview: [review: Review]
  deleteReview: [reviewId: string]
}>()
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button
          variant="ghost"
          class="h-8 w-8 flex p-0 data-[state=open]:bg-muted"
      >
        <Icon name="i-radix-icons-dots-horizontal" class="h-4 w-4" />
        <span class="sr-only">Open menu</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="w-[160px]">
      <DropdownMenuSeparator />
    </DropdownMenuContent>
  </DropdownMenu>
</template>