<script setup lang="ts">
import { computed } from 'vue'
import { personal } from '@/data/personal'
import { useTypingAnimation } from '@/composables/useTypingAnimation'

const { displayText } = useTypingAnimation(personal.role, {
  typingSpeed: 90,
  deletingSpeed: 45,
  pauseAfterType: 1400,
})

// 단어 전환 순간(displayText === '')에도 높이를 유지하기 위한 텍스트
const stableRoleText = computed(() => (displayText.value ? displayText.value : '\u00A0'))

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <section id="hero" aria-label="소개">
    <div class="page hero">
      <div class="hero-left">
        <div class="photo-frame">
          <img src="/profile.jpg" alt="프로필 사진" />
          <div class="photo-corner">PROFILE / 01</div>
          <div class="photo-tag">{{ personal.name }} · DOHYUN KANG</div>
        </div>
      </div>

      <div class="hero-right">
        <div>
          <div class="eyebrow">
            <span class="bar" aria-hidden="true" />
            Portfolio · Spring {{ new Date().getFullYear() }}
          </div>

          <h1 class="hero-name">
            <span class="ko">{{ personal.name }}</span>
            <span class="en">Kang Dohyun</span>
          </h1>

          <div class="hero-role">
            <span aria-live="polite">{{ stableRoleText }}</span>
          </div>

          <p class="hero-lead">
            {{ personal.bio }}
          </p>
        </div>

        <div>
          <div class="hero-cta">
            <a class="btn-primary" href="#projects" @click.prevent="scrollTo('projects')">
              프로젝트 보기
              <span class="arr" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
                  <path d="M5 19 19 5 M9 5h10v10" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </span>
            </a>
            <a class="btn-ghost" :href="personal.github" target="_blank" rel="noreferrer">
              GitHub
              <span class="arr" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
                  <path d="M5 19 19 5 M9 5h10v10" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </span>
            </a>
          </div>

          <div class="hero-meta" aria-label="요약 정보">
            <div class="cell">
              <div class="k">Based in</div>
              <div class="v">부산, 대한민국</div>
            </div>
            <div class="cell">
              <div class="k">Email</div>
              <div class="v">{{ personal.email }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding: 96px 0 110px;
}

.hero-left {
  grid-column: 1 / span 5;
}

.hero-right {
  grid-column: 7 / span 6;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 560px;
}

@media (max-width: 900px) {
  .hero {
    padding: 56px 0 64px;
  }
  .hero-left,
  .hero-right {
    grid-column: 1 / -1;
  }
  .hero-right {
    min-height: auto;
    margin-top: 32px;
    gap: 26px;
  }
}

.eyebrow {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--muted);
  display: flex;
  align-items: center;
  gap: 12px;
}
.eyebrow .bar {
  width: 28px;
  height: 1px;
  background: var(--ink);
}

.hero-name {
  font-weight: 800;
  letter-spacing: -0.04em;
  font-size: clamp(68px, 10vw, 140px);
  line-height: 0.92;
  color: var(--ink);
  margin: 22px 0 10px;
}
.hero-name .ko {
  display: block;
}
.hero-name .en {
  display: block;
  font-weight: 300;
  font-size: 0.26em;
  color: var(--muted);
  margin-top: 14px;
  line-height: 1;
  font-family: var(--mono);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.hero-role {
  font-size: 22px;
  font-weight: 500;
  letter-spacing: -0.02em;
  color: var(--ink-2);
  margin-top: 4px;
  /* 타이핑 텍스트가 빈 값일 때도 레이아웃 점프 방지 */
  min-height: 1.6em;
}

.hero-lead {
  margin-top: 28px;
  font-size: 17px;
  line-height: 1.7;
  color: var(--ink-2);
  max-width: 520px;
  letter-spacing: -0.005em;
}

.hero-cta {
  margin-top: 32px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.btn-primary .arr,
.btn-ghost .arr {
  transition: transform 0.2s ease;
}
.btn-primary:hover .arr,
.btn-ghost:hover .arr {
  transform: translate(2px, -2px);
}

.hero-meta {
  margin-top: 48px;
  padding-top: 24px;
  border-top: 1px solid var(--line);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px 24px;
}
.hero-meta .k {
  font-family: var(--mono);
  font-size: 10.5px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 4px;
}
.hero-meta .v {
  font-size: 14.5px;
  color: var(--ink-2);
  letter-spacing: -0.005em;
  font-weight: 500;
}
</style>
