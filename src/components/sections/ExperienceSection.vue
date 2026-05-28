<script setup lang="ts">
import { computed, ref } from 'vue'
import { experience } from '@/data/experience'
import type { ExperienceType } from '@/types'
import { useScrollReveal } from '@/composables/useScrollReveal'

interface Tab {
  key: ExperienceType
  label: string
}

const tabs: Tab[] = [
  { key: 'work', label: '경력' },
  { key: 'education', label: '학력' },
]

const activeTab = ref<ExperienceType>('work')

const items = computed(() =>
  activeTab.value === 'work' ? experience.work : experience.education,
)

function handleSelect(key: ExperienceType) {
  activeTab.value = key
}

const { isVisible, target } = useScrollReveal()
</script>

<template>
  <section
    id="experience"
    ref="target"
    class="section reveal"
    :class="{ visible: isVisible }"
    aria-labelledby="experience-title"
  >
    <div class="page">
      <div class="sec-head">
        <div class="sec-num-col">
          <div class="sec-num"><span class="sec-dot" /> 04 — TIMELINE</div>
        </div>
        <div class="sec-title-col">
          <h2 id="experience-title" class="sec-title">경력 · 학력</h2>
          <p class="sec-sub">시간 순으로 정리한 발자취입니다.</p>
        </div>
      </div>

      <!-- 탭 -->
      <div
        class="tabs"
        role="tablist"
        aria-label="경력 / 학력 탭"
      >
        <button
          v-for="tab in tabs"
          :key="tab.key"
          type="button"
          role="tab"
          :aria-selected="activeTab === tab.key"
          :tabindex="activeTab === tab.key ? 0 : -1"
          class="tab"
          :class="{ on: activeTab === tab.key }"
          @click="handleSelect(tab.key)"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- 타임라인 -->
      <Transition name="fade" mode="out-in">
        <ol
          :key="activeTab"
          class="timeline"
          role="tabpanel"
        >
          <li
            v-for="(item, i) in items"
            :key="item.id"
            :style="{ transitionDelay: `${i * 100}ms` }"
            class="tl-item reveal"
            :class="{ visible: isVisible }"
          >
            <!-- 기간 -->
            <div class="tl-period">{{ item.period }}</div>

            <!-- 기관 + 역할 -->
            <div class="tl-role">{{ item.organization }}</div>
            <div class="tl-where">{{ item.role }}</div>

            <!-- 업무 / 활동 목록 -->
            <div class="tl-body">
              <ul>
                <li v-for="(line, idx) in item.description" :key="idx">{{ line }}</li>
              </ul>

              <div v-if="item.tags && item.tags.length > 0" class="tl-tags">
                <span v-for="tag in item.tags" :key="tag">{{ tag }}</span>
              </div>
            </div>
          </li>

          <li
            v-if="items.length === 0"
            class="empty"
          >
            // 아직 등록된 항목이 없습니다.
          </li>
        </ol>
      </Transition>
    </div>
  </section>
</template>

<style scoped>
.tabs {
  display: inline-flex;
  gap: 2px;
  padding: 4px;
  background: var(--bg-card);
  border: 1px solid var(--line);
  border-radius: 999px;
  margin-bottom: 36px;
}
.tab {
  font-family: var(--mono);
  font-size: 11.5px;
  letter-spacing: 0.06em;
  padding: 9px 20px;
  border-radius: 999px;
  color: var(--muted);
  transition: all 0.2s;
}
.tab.on {
  background: var(--ink);
  color: var(--bg);
}

.timeline {
  position: relative;
  padding-left: 32px;
  max-width: 920px;
}
.timeline::before {
  content: '';
  position: absolute;
  left: 6px;
  top: 8px;
  bottom: 8px;
  width: 1px;
  background: var(--line-strong);
}

.tl-item {
  position: relative;
  padding: 0 0 48px;
}
.tl-item:last-child {
  padding-bottom: 0;
}
.tl-item::before {
  content: '';
  position: absolute;
  left: -32px;
  top: 9px;
  width: 13px;
  height: 13px;
  border-radius: 999px;
  background: var(--bg);
  border: 1px solid var(--ink);
}

.tl-period {
  font-family: var(--mono);
  font-size: 11.5px;
  letter-spacing: 0.06em;
  color: var(--muted);
  margin-bottom: 6px;
}
.tl-role {
  font-weight: 700;
  font-size: 24px;
  letter-spacing: -0.025em;
  line-height: 1.25;
  color: var(--ink);
}
.tl-where {
  font-family: var(--mono);
  font-size: 12px;
  color: var(--muted);
  margin-top: 4px;
  letter-spacing: 0.04em;
}
.tl-body {
  margin-top: 16px;
}
.tl-body ul {
  list-style: none;
}
.tl-body li {
  font-size: 14.5px;
  line-height: 1.7;
  color: var(--ink-2);
  padding: 4px 0 4px 18px;
  position: relative;
  letter-spacing: -0.005em;
}
.tl-body li::before {
  content: '—';
  position: absolute;
  left: 0;
  color: var(--muted-2);
}
.tl-tags {
  margin-top: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}
.tl-tags span {
  font-family: var(--mono);
  font-size: 10.5px;
  color: var(--muted);
  padding: 3px 9px;
  border: 1px solid var(--line-strong);
  border-radius: 999px;
}

.empty {
  padding: 12px 0 0;
  font-family: var(--mono);
  font-size: 12px;
  color: var(--muted);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
