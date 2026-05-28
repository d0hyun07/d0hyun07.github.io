<script setup lang="ts">
import { computed, ref } from 'vue'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'
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
    class="py-24 bg-[var(--color-surface)]/30 reveal"
    :class="{ visible: isVisible }"
    aria-labelledby="experience-title"
  >
    <div class="container-portfolio">
      <SectionTitle
        id="experience-title"
        title="Experience"
        subtitle="시간 순으로 정리한 경력과 학력입니다."
      />

      <!-- 탭 -->
      <div
        class="flex gap-2 mb-12"
        role="tablist"
        aria-label="경력 / 학력 탭"
      >
        <button
          v-for="tab in tabs"
          :key="tab.key"
          type="button"
          role="tab"
          :aria-selected="(activeTab === tab.key).toString()"
          :tabindex="activeTab === tab.key ? 0 : -1"
          class="px-6 py-2.5 font-mono text-sm rounded-full border transition-all duration-200"
          :class="
            activeTab === tab.key
              ? 'bg-[var(--color-primary)] text-[var(--color-bg)] border-[var(--color-primary)]'
              : 'border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'
          "
          @click="handleSelect(tab.key)"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- 타임라인 -->
      <Transition name="fade" mode="out-in">
        <ol
          :key="activeTab"
          class="relative max-w-3xl ml-4 md:ml-8 border-l-2 border-[var(--color-border)] space-y-10"
          role="tabpanel"
        >
          <li
            v-for="(item, i) in items"
            :key="item.id"
            :style="{ transitionDelay: `${i * 100}ms` }"
            class="relative pl-6 md:pl-10 reveal"
            :class="{ visible: isVisible }"
          >
            <!-- 마커 -->
            <span
              class="absolute -left-[10px] top-1.5 w-4 h-4 rounded-full bg-[var(--color-primary)] ring-4 ring-[var(--color-primary-dim)]"
              aria-hidden="true"
            />

            <!-- 기간 -->
            <p
              class="font-mono text-xs md:text-sm text-[var(--color-primary)] mb-1.5"
            >
              {{ item.period }}
            </p>

            <!-- 기관 + 역할 -->
            <h3
              class="font-mono text-lg md:text-xl font-semibold text-[var(--color-text)]"
            >
              {{ item.organization }}
            </h3>
            <p
              class="font-mono text-sm text-[var(--color-text-muted)] mb-4"
            >
              {{ item.role }}
            </p>

            <!-- 업무 / 활동 목록 -->
            <ul
              class="list-disc list-outside ml-5 space-y-1.5 text-sm md:text-base text-[var(--color-text)] leading-relaxed marker:text-[var(--color-primary)]"
            >
              <li v-for="(line, idx) in item.description" :key="idx">
                {{ line }}
              </li>
            </ul>

            <!-- 사용 기술 -->
            <div
              v-if="item.tags && item.tags.length > 0"
              class="flex flex-wrap gap-1.5 mt-4"
            >
              <BaseBadge
                v-for="tag in item.tags"
                :key="tag"
                variant="muted"
                size="sm"
              >
                {{ tag }}
              </BaseBadge>
            </div>
          </li>

          <li
            v-if="items.length === 0"
            class="pl-6 md:pl-10 font-mono text-sm text-[var(--color-text-muted)]"
          >
            // 아직 등록된 항목이 없습니다.
          </li>
        </ol>
      </Transition>
    </div>
  </section>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
