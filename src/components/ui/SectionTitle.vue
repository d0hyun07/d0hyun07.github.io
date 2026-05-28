<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string
    subtitle?: string
    align?: 'left' | 'center'
    /** 제목 앞에 붙는 액센트 기호 (예: "#", "01.") */
    prefix?: string
  }>(),
  {
    align: 'left',
    prefix: '#',
  },
)
</script>

<template>
  <div
    class="mb-12 md:mb-16"
    :class="align === 'center' ? 'text-center' : 'text-left'"
  >
    <h2 class="font-mono text-3xl md:text-4xl font-bold text-[var(--color-text)]">
      <span class="text-[var(--color-primary)]">{{ prefix }} </span>{{ title }}
    </h2>
    <p
      v-if="subtitle"
      class="mt-3 text-sm md:text-base text-[var(--color-text-muted)] max-w-2xl"
      :class="align === 'center' ? 'mx-auto' : ''"
    >
      {{ subtitle }}
    </p>
    <div
      class="mt-4 h-px w-16 bg-[var(--color-primary)]"
      :class="align === 'center' ? 'mx-auto' : ''"
      aria-hidden="true"
    />
  </div>
</template>
