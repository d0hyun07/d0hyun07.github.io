<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    hoverable?: boolean
    padding?: 'none' | 'sm' | 'md' | 'lg'
    /** 카드 자체가 클릭 가능한 경우 (탭 인덱스 + role) */
    interactive?: boolean
  }>(),
  {
    hoverable: true,
    padding: 'md',
    interactive: false,
  },
)

const paddingClass = computed(() => {
  switch (props.padding) {
    case 'none':
      return ''
    case 'sm':
      return 'p-4'
    case 'lg':
      return 'p-8'
    case 'md':
    default:
      return 'p-6'
  }
})

const hoverClass = computed(() =>
  props.hoverable
    ? 'hover:border-[var(--color-border-hover)] hover:-translate-y-0.5'
    : '',
)
</script>

<template>
  <div
    class="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg transition-all duration-300"
    :class="[paddingClass, hoverClass]"
    :tabindex="interactive ? 0 : undefined"
    :role="interactive ? 'group' : undefined"
  >
    <slot />
  </div>
</template>
