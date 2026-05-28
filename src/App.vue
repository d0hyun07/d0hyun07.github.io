<script setup lang="ts">
import { computed } from 'vue'
import { onBeforeUnmount, onMounted, ref } from 'vue'
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

const isTopbarScrolled = ref(false)

function handleScroll() {
  isTopbarScrolled.value = window.scrollY > 24
}

function handleNavClick(id: string, event: MouseEvent) {
  event.preventDefault()
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const currentYear = computed(() => new Date().getFullYear())

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <!-- 스킵 링크 (스크린리더 / 키보드 접근성) -->
  <a
    href="#hero"
    class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-[var(--ink)] focus:text-[var(--bg)] focus:rounded-md focus:text-sm"
    @click="handleNavClick('hero', $event)"
  >
    메인 콘텐츠로 건너뛰기
  </a>

  <!-- 글로벌 상단 네비게이션 -->
  <header class="topbar" :class="{ scrolled: isTopbarScrolled }">
    <div class="page topbar-inner" aria-label="메인 네비게이션">
      <!-- 브랜드 -->
      <a href="#hero" class="brand" @click="handleNavClick('hero', $event)">
        <span class="brand-square" aria-hidden="true" />
        <span>{{ personal.name }}</span>
        <span class="brand-mini">Portfolio · {{ currentYear }}</span>
      </a>

      <!-- 섹션 링크 (Hero 제외) -->
      <nav class="nav">
        <a
          v-for="(section, idx) in SECTIONS.slice(1)"
          :key="section.id"
          :href="`#${section.id}`"
          :class="{ active: activeId === section.id }"
          :aria-current="activeId === section.id ? 'location' : undefined"
          @click="handleNavClick(section.id, $event)"
        >
          <span class="nav-num">{{ String(idx + 1).padStart(2, '0') }}</span>{{ section.label }}
        </a>
      </nav>
    </div>
  </header>

  <!-- 메인 컨텐츠 -->
  <main :style="{ paddingTop: 'var(--topbar-h)' }">
    <RouterView />
  </main>

  <!-- 푸터 -->
  <footer class="footer">
    <div class="page">
      <div class="footer-row">
        <div>© {{ currentYear }} {{ personal.name }} · Kang Dohyun</div>
        <div>Designed &amp; built in Busan</div>
      </div>
    </div>
  </footer>
</template>
