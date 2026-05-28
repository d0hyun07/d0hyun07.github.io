import { onMounted, onUnmounted, ref } from 'vue'

/**
 * IntersectionObserver 기반 스크롤 진입 감지 composable.
 *
 * 사용 예:
 * ```vue
 * <script setup lang="ts">
 * const { isVisible, target } = useScrollReveal()
 * </script>
 *
 * <template>
 *   <section ref="target" class="reveal" :class="{ visible: isVisible }">
 *     ...
 *   </section>
 * </template>
 * ```
 */
export function useScrollReveal(threshold = 0.15) {
  const isVisible = ref(false)
  const target = ref<HTMLElement | null>(null)

  let observer: IntersectionObserver | null = null

  onMounted(() => {
    // SSR / 구형 브라우저 폴백 — 즉시 표시.
    if (typeof IntersectionObserver === 'undefined') {
      isVisible.value = true
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry?.isIntersecting) {
          isVisible.value = true
          // 한 번 등장하면 해제 (성능).
          observer?.disconnect()
          observer = null
        }
      },
      { threshold },
    )

    if (target.value) {
      observer.observe(target.value)
    }
  })

  onUnmounted(() => {
    observer?.disconnect()
    observer = null
  })

  return { isVisible, target }
}
