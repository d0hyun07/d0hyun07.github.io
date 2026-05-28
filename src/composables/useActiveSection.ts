import { onMounted, onUnmounted, ref } from 'vue'

/**
 * 현재 뷰포트에 보이는 섹션의 id 를 추적.
 * 상단 nav 의 하이라이트 처리용.
 *
 * 사용 예:
 * ```ts
 * const { activeId } = useActiveSection(['hero', 'about', 'projects'], 90)
 * ```
 *
 * @param sectionIds 추적할 섹션 element id 목록 (DOM 마운트 이후 존재해야 함)
 * @param topOffset 상단 nav 높이(px). 이 값만큼 안쪽으로 들어와야 active 로 간주.
 */
export function useActiveSection(sectionIds: string[], topOffset = 80) {
  const activeId = ref<string>(sectionIds[0] ?? '')

  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (typeof IntersectionObserver === 'undefined') return

    observer = new IntersectionObserver(
      (entries) => {
        // 현재 교차 중인 섹션 중, 화면 상단에 가장 가까운 것을 active 로 선택.
        const intersecting = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top,
          )

        const first = intersecting[0]
        if (first) {
          activeId.value = first.target.id
        }
      },
      {
        // 상단 nav 높이 만큼 안쪽으로 들어왔을 때부터 인정,
        // 하단 60%는 무시(다음 섹션이 충분히 보일 때 전환).
        rootMargin: `-${topOffset}px 0px -55% 0px`,
        threshold: 0,
      },
    )

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer?.observe(el)
    })
  })

  onUnmounted(() => {
    observer?.disconnect()
    observer = null
  })

  return { activeId }
}
