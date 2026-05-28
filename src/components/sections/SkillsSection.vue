<script setup lang="ts">
import { computed, ref } from 'vue'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import { skills } from '@/data/skills'
import type { SkillCategory } from '@/types'
import { useScrollReveal } from '@/composables/useScrollReveal'

type TabKey = 'all' | SkillCategory

interface Tab {
  key: TabKey
  label: string
}

const tabs: Tab[] = [
  { key: 'all', label: 'All' },
  { key: 'frontend', label: 'Frontend' },
  { key: 'backend', label: 'Backend' },
  { key: 'security', label: 'Security · AD' },
  { key: 'embedded', label: 'Embedded · Robotics' },
  { key: 'devops', label: 'DevOps' },
]

const activeTab = ref<TabKey>('all')

const filteredSkills = computed(() =>
  activeTab.value === 'all'
    ? skills
    : skills.filter((s) => s.category === activeTab.value),
)

function handleSelect(key: TabKey) {
  activeTab.value = key
}

const { isVisible, target } = useScrollReveal()
</script>

<template>
  <section
    id="skills"
    ref="target"
    class="py-24 bg-[var(--color-surface)]/30 reveal"
    :class="{ visible: isVisible }"
    aria-labelledby="skills-title"
  >
    <div class="container-portfolio">
      <SectionTitle
        id="skills-title"
        title="Skills"
        subtitle="실무·프로젝트에서 직접 사용해 본 기술 스택입니다."
      />

      <!-- 카테고리 탭 -->
      <div
        class="flex flex-wrap gap-2 mb-10"
        role="tablist"
        aria-label="스킬 카테고리"
      >
        <button
          v-for="tab in tabs"
          :key="tab.key"
          type="button"
          role="tab"
          :aria-selected="activeTab === tab.key"
          :tabindex="activeTab === tab.key ? 0 : -1"
          class="px-4 py-2 font-mono text-xs md:text-sm rounded-full border transition-all duration-200"
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

      <!-- 스킬 카드 그리드 -->
      <Transition name="fade" mode="out-in">
        <div
          :key="activeTab"
          class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          role="tabpanel"
        >
          <BaseCard
            v-for="(skill, i) in filteredSkills"
            :key="`${skill.category}-${skill.name}`"
            padding="md"
            :style="{ transitionDelay: `${Math.min(i * 40, 400)}ms` }"
            class="reveal"
            :class="{ visible: isVisible }"
          >
            <h3
              class="font-mono text-sm md:text-base text-[var(--color-text)] mb-2"
            >
              {{ skill.name }}
            </h3>

            <p
              class="font-mono text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-3"
            >
              {{ skill.category }}
            </p>

            <!-- 숙련도 바 -->
            <div
              v-if="typeof skill.level === 'number'"
              class="w-full h-1.5 bg-[var(--color-surface-2)] rounded-full overflow-hidden"
              role="progressbar"
              :aria-valuenow="skill.level"
              aria-valuemin="0"
              aria-valuemax="100"
              :aria-label="`${skill.name} 숙련도`"
            >
              <div
                class="h-full bg-[var(--color-primary)] rounded-full transition-all duration-700"
                :style="{ width: isVisible ? `${skill.level}%` : '0%' }"
              />
            </div>
          </BaseCard>

          <!-- 카테고리에 항목이 없을 때 -->
          <p
            v-if="filteredSkills.length === 0"
            class="col-span-full text-center font-mono text-sm text-[var(--color-text-muted)] py-12"
          >
            // 이 카테고리는 아직 정리 중입니다.
          </p>
        </div>
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
