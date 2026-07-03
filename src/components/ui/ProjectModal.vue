<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import type { Project, ProjectCategory } from '@/types'
import { projectDetails } from '@/data/projectDetails'

const props = defineProps<{
  project: Project | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const panelRef = ref<HTMLElement | null>(null)
const closeBtnRef = ref<HTMLButtonElement | null>(null)

const isOpen = computed(() => props.project !== null)
const detail = computed(() =>
  props.project ? projectDetails[props.project.id] : undefined,
)

function categoryLabel(category: ProjectCategory): string {
  switch (category) {
    case 'web':
      return '웹'
    case 'security':
      return '보안'
    case 'robotics':
      return '로봇'
    case 'embedded':
      return '임베디드'
  }
}

function close() {
  emit('close')
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    close()
    return
  }
  // 간단한 포커스 트랩: Tab 이 패널 밖으로 나가지 않도록 순환
  if (e.key === 'Tab' && panelRef.value) {
    const focusable = panelRef.value.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    )
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (!first || !last) return
    const active = document.activeElement as HTMLElement | null
    if (e.shiftKey && active === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && active === last) {
      e.preventDefault()
      first.focus()
    }
  }
}

watch(isOpen, async (open) => {
  if (open) {
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeydown)
    await nextTick()
    closeBtnRef.value?.focus()
  } else {
    document.body.style.overflow = ''
    document.removeEventListener('keydown', onKeydown)
  }
})

onBeforeUnmount(() => {
  document.body.style.overflow = ''
  document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isOpen && project"
        class="overlay"
        @click.self="close"
      >
        <div
          ref="panelRef"
          class="panel"
          role="dialog"
          aria-modal="true"
          :aria-label="`${project.title} 상세 정보`"
        >
          <button
            ref="closeBtnRef"
            type="button"
            class="close"
            aria-label="닫기"
            @click="close"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
              <path d="M6 6l12 12M18 6L6 18" stroke-linecap="round" />
            </svg>
          </button>

          <div class="scroll">
            <!-- 헤더 -->
            <header class="head">
              <div class="meta">
                <span class="num">{{ String(project.id).padStart(2, '0') }}</span>
                <span class="dot" />
                <span class="cat">{{ categoryLabel(project.category) }}</span>
                <span v-if="detail?.status" class="status">{{ detail.status }}</span>
              </div>
              <h2 class="title">{{ project.title }}</h2>
              <p v-if="detail?.tagline" class="tagline">{{ detail.tagline }}</p>
              <div class="tags">
                <span v-for="tag in project.tags" :key="tag">{{ tag }}</span>
              </div>
            </header>

            <template v-if="detail">
              <!-- 개요 -->
              <section class="block">
                <p v-for="(p, i) in detail.overview" :key="i" class="para">
                  {{ p }}
                </p>
              </section>

              <!-- 섹션들 -->
              <section
                v-for="(sec, si) in detail.sections"
                :key="si"
                class="block"
              >
                <h3 class="block-title">{{ sec.heading }}</h3>

                <p v-for="(p, i) in sec.body" :key="`b${i}`" class="para">
                  {{ p }}
                </p>

                <ul v-if="sec.bullets" class="bullets">
                  <li v-for="(b, i) in sec.bullets" :key="`li${i}`">{{ b }}</li>
                </ul>

                <div v-if="sec.table" class="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th v-for="(h, i) in sec.table.headers" :key="i">{{ h }}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(row, ri) in sec.table.rows" :key="ri">
                        <td v-for="(cell, ci) in row" :key="ci">{{ cell }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <!-- 기술 하이라이트 -->
              <section v-if="detail.highlights" class="block">
                <h3 class="block-title">기술 하이라이트</h3>
                <ul class="highlights">
                  <li v-for="(h, i) in detail.highlights" :key="i">{{ h }}</li>
                </ul>
              </section>

              <!-- 링크 -->
              <section v-if="detail.links && detail.links.length" class="block links">
                <a
                  v-for="link in detail.links"
                  :key="link.url"
                  :href="link.url"
                  target="_blank"
                  rel="noreferrer"
                  class="link-btn"
                >
                  {{ link.label }}
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
                    <path d="M5 19 19 5 M9 5h10v10" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </a>
              </section>
            </template>

            <p v-else class="para muted">
              // 상세 내용이 준비 중입니다.
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: clamp(16px, 6vh, 80px) 16px;
  background: color-mix(in srgb, var(--ink) 55%, transparent);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  overflow-y: auto;
}

.panel {
  position: relative;
  width: 100%;
  max-width: 760px;
  background: var(--bg-card);
  border: 1px solid var(--line-strong);
  border-radius: 14px;
  box-shadow: 0 30px 80px -20px color-mix(in srgb, var(--ink) 45%, transparent);
}

.close {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 999px;
  color: var(--muted);
  border: 1px solid var(--line);
  background: var(--bg-card);
  transition: all 0.18s ease;
}
.close:hover {
  color: var(--ink);
  border-color: var(--ink);
}

.scroll {
  max-height: calc(100vh - clamp(32px, 12vh, 160px));
  overflow-y: auto;
  padding: 44px clamp(24px, 5vw, 52px) clamp(32px, 5vw, 52px);
}

/* 헤더 */
.head {
  padding-bottom: 26px;
  border-bottom: 1px solid var(--line);
  margin-bottom: 28px;
}
.meta {
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 16px;
}
.dot {
  width: 6px;
  height: 6px;
  background: var(--accent);
  border-radius: 999px;
}
.status {
  margin-left: auto;
  color: var(--accent);
  border: 1px solid var(--accent);
  border-radius: 999px;
  padding: 4px 10px;
  letter-spacing: 0.06em;
  text-transform: none;
}
.title {
  font-weight: 700;
  font-size: clamp(26px, 4vw, 34px);
  letter-spacing: -0.03em;
  line-height: 1.1;
  color: var(--ink);
}
.tagline {
  margin-top: 12px;
  font-size: 15px;
  color: var(--muted);
  line-height: 1.6;
}
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 18px;
}
.tags span {
  font-family: var(--mono);
  font-size: 10.5px;
  color: var(--muted);
  padding: 3px 9px;
  border: 1px solid var(--line-strong);
  border-radius: 999px;
  white-space: nowrap;
}

/* 본문 블록 */
.block {
  margin-bottom: 30px;
}
.block:last-child {
  margin-bottom: 0;
}
.block-title {
  font-family: var(--mono);
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink);
  margin-bottom: 14px;
  padding-left: 12px;
  border-left: 2px solid var(--accent);
}
.para {
  font-size: 14.5px;
  line-height: 1.75;
  color: var(--ink-2);
  letter-spacing: -0.005em;
}
.para + .para {
  margin-top: 12px;
}
.para.muted {
  font-family: var(--mono);
  color: var(--muted);
  font-size: 13px;
}

.bullets,
.highlights {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.bullets li,
.highlights li {
  position: relative;
  padding-left: 20px;
  font-size: 14px;
  line-height: 1.6;
  color: var(--ink-2);
}
.bullets li::before {
  content: '';
  position: absolute;
  left: 2px;
  top: 10px;
  width: 5px;
  height: 5px;
  border-radius: 999px;
  background: var(--line-strong);
}
.highlights li::before {
  content: '→';
  position: absolute;
  left: 0;
  top: 0;
  color: var(--accent);
  font-family: var(--mono);
  font-size: 13px;
}

/* 표 */
.table-wrap {
  overflow-x: auto;
  border: 1px solid var(--line);
  border-radius: 10px;
}
table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13.5px;
}
th,
td {
  text-align: left;
  padding: 11px 14px;
  border-bottom: 1px solid var(--line);
  vertical-align: top;
  line-height: 1.5;
}
th {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--muted);
  background: var(--bg-2);
  white-space: nowrap;
}
td {
  color: var(--ink-2);
}
td:first-child {
  font-weight: 600;
  color: var(--ink);
  white-space: nowrap;
}
tbody tr:last-child td {
  border-bottom: none;
}

/* 링크 */
.links {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.link-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  font-size: 13px;
  font-weight: 500;
  border-radius: 999px;
  background: var(--ink);
  color: var(--bg);
  border: 1px solid var(--ink);
  transition: all 0.2s ease;
}
.link-btn:hover {
  background: var(--accent);
  border-color: var(--accent);
}

/* 트랜지션 */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.22s ease;
}
.modal-enter-active .panel,
.modal-leave-active .panel {
  transition:
    transform 0.26s cubic-bezier(0.16, 1, 0.3, 1),
    opacity 0.22s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-from .panel,
.modal-leave-to .panel {
  opacity: 0;
  transform: translateY(16px) scale(0.98);
}

@media (max-width: 560px) {
  .scroll {
    padding: 44px 20px 28px;
  }
}
</style>
