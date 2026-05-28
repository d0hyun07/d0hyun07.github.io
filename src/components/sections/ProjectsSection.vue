<script setup lang="ts">
import { computed, ref } from 'vue'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { projects } from '@/data/projects'
import type { ProjectCategory } from '@/types'
import { useScrollReveal } from '@/composables/useScrollReveal'

type FilterKey = 'all' | ProjectCategory

interface Filter {
  key: FilterKey
  label: string
}

const filters: Filter[] = [
  { key: 'all', label: '전체' },
  { key: 'web', label: '웹' },
  { key: 'security', label: '보안' },
  { key: 'robotics', label: '로봇' },
  { key: 'embedded', label: '임베디드' },
]

const activeFilter = ref<FilterKey>('all')

const visibleProjects = computed(() => {
  const publicProjects = projects.filter((p) => p.isPublic)
  const filtered =
    activeFilter.value === 'all'
      ? publicProjects
      : publicProjects.filter((p) => p.category === activeFilter.value)

  // featured 우선, 같은 등급이면 id 오름차순.
  return [...filtered].sort((a, b) => {
    const aFeatured = a.featured ? 1 : 0
    const bFeatured = b.featured ? 1 : 0
    if (aFeatured !== bFeatured) return bFeatured - aFeatured
    return a.id - b.id
  })
})

function handleFilter(key: FilterKey) {
  activeFilter.value = key
}

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

function categoryBadgeColor(category: ProjectCategory) {
  switch (category) {
    case 'security':
      return 'error' as const
    case 'robotics':
      return 'warning' as const
    case 'embedded':
      return 'success' as const
    case 'web':
    default:
      return 'primary' as const
  }
}

const { isVisible, target } = useScrollReveal()
</script>

<template>
  <section
    id="projects"
    ref="target"
    class="py-24 reveal"
    :class="{ visible: isVisible }"
    aria-labelledby="projects-title"
  >
    <div class="container-portfolio">
      <SectionTitle
        id="projects-title"
        title="Projects"
        subtitle="실무 · 학교 · 사이드 프로젝트 모음."
      />

      <!-- 카테고리 필터 -->
      <div
        class="flex flex-wrap gap-2 mb-10"
        role="toolbar"
        aria-label="프로젝트 카테고리 필터"
      >
        <button
          v-for="filter in filters"
          :key="filter.key"
          type="button"
          :aria-pressed="activeFilter === filter.key"
          class="px-4 py-2 font-mono text-xs md:text-sm rounded-full border transition-all duration-200"
          :class="
            activeFilter === filter.key
              ? 'bg-[var(--color-primary)] text-[var(--color-bg)] border-[var(--color-primary)]'
              : 'border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'
          "
          @click="handleFilter(filter.key)"
        >
          {{ filter.label }}
        </button>
      </div>

      <!-- 프로젝트 카드 그리드 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <BaseCard
          v-for="(project, i) in visibleProjects"
          :key="project.id"
          padding="lg"
          :style="{ transitionDelay: `${Math.min(i * 60, 400)}ms` }"
          class="reveal flex flex-col"
          :class="{ visible: isVisible }"
        >
          <!-- 상단: 카테고리 + featured -->
          <div class="flex items-center justify-between mb-4 gap-2">
            <BaseBadge :variant="categoryBadgeColor(project.category)">
              {{ categoryLabel(project.category) }}
            </BaseBadge>
            <BaseBadge v-if="project.featured" variant="primary" size="sm">
              ★ featured
            </BaseBadge>
          </div>

          <!-- 제목 -->
          <h3
            class="font-mono text-lg md:text-xl font-semibold text-[var(--color-text)] mb-3 leading-snug"
          >
            {{ project.title }}
          </h3>

          <!-- 설명 -->
          <p
            class="text-sm text-[var(--color-text-muted)] leading-relaxed mb-5 line-clamp-4 flex-1"
          >
            {{ project.description }}
          </p>

          <!-- 기술 배지 -->
          <div class="flex flex-wrap gap-1.5 mb-5">
            <BaseBadge
              v-for="tag in project.tags"
              :key="tag"
              variant="muted"
              size="sm"
            >
              {{ tag }}
            </BaseBadge>
          </div>

          <!-- 링크 버튼 -->
          <div
            v-if="project.githubUrl || project.demoUrl"
            class="flex flex-wrap gap-2 mt-auto pt-2"
          >
            <BaseButton
              v-if="project.githubUrl"
              :href="project.githubUrl"
              target="_blank"
              variant="ghost"
              size="sm"
              :aria-label="`${project.title} GitHub 새 탭에서 열기`"
            >
              GitHub ↗
            </BaseButton>
            <BaseButton
              v-if="project.demoUrl"
              :href="project.demoUrl"
              target="_blank"
              variant="primary"
              size="sm"
              :aria-label="`${project.title} 데모 새 탭에서 열기`"
            >
              데모 ↗
            </BaseButton>
          </div>
        </BaseCard>

        <p
          v-if="visibleProjects.length === 0"
          class="col-span-full text-center font-mono text-sm text-[var(--color-text-muted)] py-12"
        >
          // 해당 카테고리에는 아직 공개된 프로젝트가 없습니다.
        </p>
      </div>
    </div>
  </section>
</template>
