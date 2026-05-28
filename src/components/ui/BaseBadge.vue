<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    variant?: 'primary' | 'muted' | 'success' | 'warning' | 'error'
    size?: 'sm' | 'md'
  }>(),
  {
    variant: 'primary',
    size: 'sm',
  },
)

const variantClass = computed(() => {
  switch (props.variant) {
    case 'muted':
      return 'bg-[var(--color-surface-2)] text-[var(--color-text-muted)] border-[var(--color-border)]'
    case 'success':
      return 'bg-[var(--color-success)]/15 text-[var(--color-success)] border-[var(--color-success)]/30'
    case 'warning':
      return 'bg-[var(--color-warning)]/15 text-[var(--color-warning)] border-[var(--color-warning)]/30'
    case 'error':
      return 'bg-[var(--color-error)]/15 text-[var(--color-error)] border-[var(--color-error)]/30'
    case 'primary':
    default:
      return 'bg-[var(--color-primary-dim)] text-[var(--color-primary)] border-[var(--color-primary)]/30'
  }
})

const sizeClass = computed(() =>
  props.size === 'md' ? 'px-4 py-1.5 text-sm' : 'px-3 py-1 text-xs',
)
</script>

<template>
  <span
    class="inline-flex items-center font-mono rounded-full border whitespace-nowrap"
    :class="[variantClass, sizeClass]"
  >
    <slot />
  </span>
</template>
