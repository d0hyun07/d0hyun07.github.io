import { onMounted, onUnmounted, ref } from 'vue'

interface TypingOptions {
  /** 한 글자 입력 간격 (ms) */
  typingSpeed?: number
  /** 한 글자 삭제 간격 (ms) */
  deletingSpeed?: number
  /** 단어 입력 완료 후 대기 (ms) */
  pauseAfterType?: number
  /** 삭제 완료 후 다음 단어 시작 전 대기 (ms) */
  pauseAfterDelete?: number
}

/**
 * 단어 배열을 순환하며 타이핑/삭제 애니메이션 텍스트를 반환.
 *
 * 사용 예:
 * ```vue
 * <script setup lang="ts">
 * const { displayText } = useTypingAnimation(['풀스택 개발자', '로봇 SW 개발자'])
 * </script>
 *
 * <template>
 *   <span>{{ displayText }}</span><span class="typing-cursor">|</span>
 * </template>
 * ```
 */
export function useTypingAnimation(
  words: string[],
  options: TypingOptions = {},
) {
  const {
    typingSpeed = 90,
    deletingSpeed = 45,
    pauseAfterType = 1400,
    pauseAfterDelete = 300,
  } = options

  const displayText = ref('')

  let wordIndex = 0
  let charIndex = 0
  let isDeleting = false
  let timer: ReturnType<typeof setTimeout> | null = null

  function tick() {
    const current = words[wordIndex] ?? ''

    if (isDeleting) {
      charIndex--
      displayText.value = current.slice(0, charIndex)

      if (charIndex <= 0) {
        isDeleting = false
        wordIndex = (wordIndex + 1) % words.length
        timer = setTimeout(tick, pauseAfterDelete)
        return
      }

      timer = setTimeout(tick, deletingSpeed)
      return
    }

    charIndex++
    displayText.value = current.slice(0, charIndex)

    if (charIndex >= current.length) {
      isDeleting = true
      timer = setTimeout(tick, pauseAfterType)
      return
    }

    timer = setTimeout(tick, typingSpeed)
  }

  onMounted(() => {
    if (words.length === 0) return
    timer = setTimeout(tick, typingSpeed)
  })

  onUnmounted(() => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  })

  return { displayText }
}
