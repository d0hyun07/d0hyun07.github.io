<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
import { personal } from '@/data/personal'
import { useTypingAnimation } from '@/composables/useTypingAnimation'

const { displayText } = useTypingAnimation(personal.role, {
  typingSpeed: 90,
  deletingSpeed: 45,
  pauseAfterType: 1400,
})
</script>

<template>
  <section
    id="hero"
    class="relative min-h-screen flex items-center bg-dot-grid overflow-hidden"
    aria-label="소개"
  >
    <!-- 좌상단 액센트 그라데이션 (장식용) -->
    <div
      class="absolute -top-40 -left-40 w-[480px] h-[480px] rounded-full opacity-20 blur-3xl pointer-events-none"
      style="background: radial-gradient(closest-side, var(--color-primary), transparent)"
      aria-hidden="true"
    />

    <div class="container-portfolio w-full relative z-10 py-24">
      <div class="max-w-3xl">
        <p class="font-mono text-sm text-[var(--color-text-muted)] mb-4">
          $ whoami — 안녕하세요, 저는
        </p>

        <h1
          class="font-mono text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
        >
          <span class="text-[var(--color-primary)]">{{ personal.name }}</span
          ><span class="text-[var(--color-text)]">.</span>
        </h1>

        <div
          class="font-mono text-xl md:text-2xl lg:text-3xl text-[var(--color-text)] mb-8 min-h-[2.5rem] flex items-center"
        >
          <span class="text-[var(--color-text-muted)] mr-2">&gt;</span>
          <span aria-live="polite">{{ displayText }}</span>
          <span
            class="typing-cursor inline-block w-[3px] h-[1.1em] bg-[var(--color-primary)] ml-1 align-middle"
            aria-hidden="true"
          />
        </div>

        <p
          class="text-base md:text-lg text-[var(--color-text-muted)] mb-10 max-w-2xl leading-relaxed"
        >
          {{ personal.bio }}
        </p>

        <div class="flex flex-wrap gap-4">
          <BaseButton variant="primary" href="#projects">
            프로젝트 보기 →
          </BaseButton>
          <BaseButton
            variant="ghost"
            :href="personal.github"
            target="_blank"
            aria-label="GitHub 프로필 새 탭에서 열기"
          >
            GitHub ↗
          </BaseButton>
        </div>
      </div>
    </div>

    <!-- 스크롤 안내 -->
    <a
      href="#about"
      class="absolute bottom-8 left-1/2 -translate-x-1/2 text-[var(--color-text-dim)] hover:text-[var(--color-primary)] transition-colors"
      aria-label="아래 About 섹션으로 스크롤"
      @click.prevent="
        document
          .getElementById('about')
          ?.scrollIntoView({ behavior: 'smooth' })
      "
    >
      <div class="font-mono text-xs animate-bounce">scroll ↓</div>
    </a>
  </section>
</template>
