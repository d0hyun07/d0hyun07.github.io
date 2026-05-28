<script setup lang="ts">
import { computed } from 'vue'
import { RouterView } from 'vue-router'
import { useActiveSection } from '@/composables/useActiveSection'
import { personal } from '@/data/personal'

interface NavSection {
  id: string
  label: string
}

const SECTIONS: readonly NavSection[] = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
] as const

const { activeId } = useActiveSection(
  SECTIONS.map((s) => s.id),
  88,
)

function handleNavClick(id: string, event: MouseEvent) {
  event.preventDefault()
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const currentYear = computed(() => new Date().getFullYear())
</script>

<template>
  <!-- 스킵 링크 (스크린리더 / 키보드 접근성) -->
  <a
    href="#hero"
    class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-[var(--color-primary)] focus:text-[var(--color-bg)] focus:rounded-md focus:font-mono focus:text-sm"
    @click="handleNavClick('hero', $event)"
  >
    메인 콘텐츠로 건너뛰기
  </a>

  <!-- 글로벌 상단 네비게이션 -->
  <header
    class="fixed top-0 left-0 right-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)]/80 backdrop-blur-md"
  >
    <nav
      class="container-portfolio flex items-center justify-between h-16 md:h-20"
      aria-label="메인 네비게이션"
    >
      <!-- 로고 / 이름 -->
      <a
        href="#hero"
        class="font-mono text-base md:text-lg font-bold text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors"
        @click="handleNavClick('hero', $event)"
      >
        <span class="text-[var(--color-primary)]">&lt;</span>
        {{ personal.name }}
        <span class="text-[var(--color-primary)]"> /&gt;</span>
      </a>

      <!-- 섹션 링크 (Hero 제외) -->
      <ul class="flex items-center gap-0.5 md:gap-1">
        <li v-for="section in SECTIONS.slice(1)" :key="section.id">
          <a
            :href="`#${section.id}`"
            class="block px-2 md:px-3 py-2 font-mono text-xs md:text-sm rounded-md transition-colors"
            :class="
              activeId === section.id
                ? 'text-[var(--color-primary)] bg-[var(--color-primary-dim)]'
                : 'text-[var(--color-text-muted)] hover:text-[var(--color-primary)]'
            "
            :aria-current="activeId === section.id ? 'location' : undefined"
            @click="handleNavClick(section.id, $event)"
          >
            <span class="hidden sm:inline text-[var(--color-text-dim)] mr-1">
              {{ String(SECTIONS.indexOf(section)).padStart(2, '0') }}.
            </span>{{ section.label }}
          </a>
        </li>
      </ul>
    </nav>
  </header>

  <!-- 메인 컨텐츠 -->
  <main class="pt-16 md:pt-20">
    <RouterView />
  </main>

  <!-- 푸터 -->
  <footer
    class="border-t border-[var(--color-border)] py-8 mt-8"
  >
    <div class="container-portfolio flex flex-col md:flex-row items-center justify-between gap-3">
      <p class="font-mono text-xs text-[var(--color-text-muted)]">
        © {{ currentYear }} {{ personal.name }}. All rights reserved.
      </p>
      <p class="font-mono text-xs text-[var(--color-text-dim)]">
        Built with Vue 3 · Vite · Tailwind CSS
      </p>
    </div>
  </footer>
</template>
