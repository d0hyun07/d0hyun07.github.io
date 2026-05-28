<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    variant?: 'primary' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
    /** 지정 시 <a> 로 렌더링 */
    href?: string
    target?: '_blank' | '_self'
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
    fullWidth?: boolean
    ariaLabel?: string
  }>(),
  {
    variant: 'primary',
    size: 'md',
    type: 'button',
    disabled: false,
    fullWidth: false,
  },
)

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const sizeClass = computed(() => {
  if (props.size === 'sm') return 'px-4 py-2 text-xs'
  if (props.size === 'lg') return 'px-8 py-4 text-base'
  return 'px-6 py-3 text-sm'
})

const variantClass = computed(() => {
  if (props.variant === 'primary') {
    return 'bg-[var(--color-primary)] text-[var(--color-bg)] hover:opacity-90'
  }
  return 'border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary-dim)]'
})

const baseClass = computed(() => [
  'inline-flex items-center justify-center gap-2',
  'font-mono font-semibold rounded-md',
  'transition-all duration-150 active:scale-95',
  'disabled:opacity-50 disabled:pointer-events-none',
  props.fullWidth ? 'w-full' : '',
  sizeClass.value,
  variantClass.value,
])

const isExternal = computed(
  () => props.target === '_blank' || /^https?:\/\//.test(props.href ?? ''),
)

function handleClick(event: MouseEvent) {
  // 동일 페이지 해시 링크(#projects 등)는 router-hash 모드에서 URL 충돌이 있으므로
  // 자체적으로 smooth scroll 처리.
  if (
    props.href &&
    props.href.startsWith('#') &&
    !isExternal.value
  ) {
    event.preventDefault()
    const id = props.href.slice(1)
    const el = id ? document.getElementById(id) : null
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
  emit('click', event)
}
</script>

<template>
  <a
    v-if="href"
    :href="href"
    :target="target"
    :rel="isExternal ? 'noopener noreferrer' : undefined"
    :aria-label="ariaLabel"
    :class="baseClass"
    @click="handleClick"
  >
    <slot />
  </a>
  <button
    v-else
    :type="type"
    :disabled="disabled"
    :aria-label="ariaLabel"
    :class="baseClass"
    @click="handleClick"
  >
    <slot />
  </button>
</template>
