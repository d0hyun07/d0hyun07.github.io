<script setup lang="ts">
import SectionTitle from '@/components/ui/SectionTitle.vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'
import { personal } from '@/data/personal'
import { useScrollReveal } from '@/composables/useScrollReveal'

const { isVisible, target } = useScrollReveal()
</script>

<template>
  <section
    id="about"
    ref="target"
    class="py-24 reveal"
    :class="{ visible: isVisible }"
    aria-labelledby="about-title"
  >
    <div class="container-portfolio">
      <SectionTitle
        id="about-title"
        title="About Me"
        subtitle="저를 짧게 소개합니다."
      />

      <div class="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-10 md:gap-14 items-start">
        <!-- 프로필 영역 -->
        <div class="flex flex-col items-center md:items-start">
          <!-- 프로필 이미지 (없으면 placeholder) -->
          <div
            v-if="personal.profileImage"
            class="w-44 h-44 md:w-60 md:h-60 rounded-lg overflow-hidden border border-[var(--color-border)] glow-primary"
          >
            <img
              :src="personal.profileImage"
              :alt="`${personal.name} 프로필 사진`"
              class="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
              width="240"
              height="240"
            />
          </div>
          <div
            v-else
            class="w-44 h-44 md:w-60 md:h-60 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center"
            role="img"
            :aria-label="`${personal.name} 프로필 자리표시자`"
          >
            <span
              class="font-mono text-6xl text-[var(--color-primary)] opacity-80"
            >
              {{ personal.name.slice(0, 1) }}
            </span>
          </div>

          <!-- 빠른 정보 카드 -->
          <dl
            class="mt-6 w-full text-sm font-mono space-y-2 text-[var(--color-text-muted)]"
          >
            <div class="flex gap-2">
              <dt class="text-[var(--color-primary)]">name</dt>
              <dd>{{ personal.name }}</dd>
            </div>
            <div class="flex gap-2">
              <dt class="text-[var(--color-primary)]">email</dt>
              <dd class="break-all">{{ personal.email }}</dd>
            </div>
            <div class="flex gap-2">
              <dt class="text-[var(--color-primary)]">github</dt>
              <dd>
                <a
                  :href="personal.github"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="hover:text-[var(--color-primary)] transition-colors"
                >
                  {{ personal.github.replace(/^https?:\/\//, '') }}
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <!-- 자기소개 -->
        <div>
          <div class="space-y-5 text-base text-[var(--color-text)] leading-relaxed">
            <p
              v-for="(paragraph, i) in personal.description"
              :key="i"
              :style="{ transitionDelay: `${i * 80}ms` }"
              class="reveal"
              :class="{ visible: isVisible }"
            >
              {{ paragraph }}
            </p>
          </div>

          <!-- 관심 분야 배지 -->
          <div class="mt-8">
            <h3
              class="font-mono text-sm text-[var(--color-text-muted)] mb-3 uppercase tracking-wider"
            >
              관심 분야
            </h3>
            <div class="flex flex-wrap gap-2">
              <BaseBadge
                v-for="(interest, i) in personal.interests"
                :key="interest"
                :style="{ transitionDelay: `${i * 60}ms` }"
                class="reveal"
                :class="{ visible: isVisible }"
              >
                {{ interest }}
              </BaseBadge>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
