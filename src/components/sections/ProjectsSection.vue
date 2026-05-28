<script setup lang="ts">
import { computed, ref } from 'vue'
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
      return 'security' as const
    case 'robotics':
      return 'robotics' as const
    case 'embedded':
      return 'embedded' as const
    case 'web':
    default:
      return 'web' as const
  }
}

const { isVisible, target } = useScrollReveal()
</script>

<template>
  <section
    id="projects"
    ref="target"
    class="section reveal"
    :class="{ visible: isVisible }"
    aria-labelledby="projects-title"
  >
    <div class="page">
      <div class="sec-head">
        <div class="sec-num-col">
          <div class="sec-num"><span class="sec-dot" /> 02 — WORK</div>
        </div>
        <div class="sec-title-col">
          <h2 id="projects-title" class="sec-title">최근 작업</h2>
          <p class="sec-sub">실무 · 학교 · 사이드 프로젝트를 한곳에 모았습니다.</p>
        </div>
      </div>

      <!-- 카테고리 필터 -->
      <div
        class="filters"
        role="toolbar"
        aria-label="프로젝트 카테고리 필터"
      >
        <button
          v-for="filter in filters"
          :key="filter.key"
          type="button"
          :aria-pressed="activeFilter === filter.key"
          class="filter-btn"
          :class="{ on: activeFilter === filter.key }"
          @click="handleFilter(filter.key)"
        >
          {{ filter.label }}
        </button>
      </div>

      <div class="work-area">
        <div class="project-list">
          <a
            v-for="(project, i) in visibleProjects"
            :key="project.id"
            class="project reveal"
            :class="{ visible: isVisible }"
            :style="{ transitionDelay: `${Math.min(i * 60, 400)}ms` }"
            :href="project.githubUrl || project.demoUrl || undefined"
            :target="project.githubUrl || project.demoUrl ? '_blank' : undefined"
            rel="noreferrer"
          >
            <div class="year">
              {{ String(project.id).padStart(2, '0') }}
            </div>

            <div class="title-block">
              <div class="title">
                {{ project.title }}
                <span v-if="project.featured" class="featured">Featured</span>
              </div>
              <div class="role">
                {{ categoryLabel(project.category) }}
              </div>
            </div>

            <div class="desc">
              {{ project.description }}
            </div>

            <div class="stack" aria-label="기술 스택">
              <span
                v-for="tag in project.tags.slice(0, 6)"
                :key="tag"
              >
                {{ tag }}
              </span>
            </div>

            <div class="arrow" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4">
                <path d="M5 19 19 5 M9 5h10v10" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
          </a>
        </div>

        <p
          v-if="visibleProjects.length === 0"
          class="empty"
        >
          // 해당 카테고리에는 아직 공개된 프로젝트가 없습니다.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.filters,
.work-area {
  grid-column: 4 / span 9;
}

@media (max-width: 900px) {
  .filters,
  .work-area {
    grid-column: 1 / -1;
  }
}

.work-area {
}

.filters {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 32px;
}

.filter-btn {
  font-family: var(--mono);
  font-size: 11.5px;
  letter-spacing: 0.04em;
  padding: 8px 16px;
  border-radius: 999px;
  color: var(--muted);
  border: 1px solid var(--line-strong);
  background: transparent;
  transition: all 0.18s;
}

.filter-btn:hover {
  color: var(--ink);
  border-color: var(--ink);
}

.filter-btn.on {
  color: var(--bg);
  background: var(--ink);
  border-color: var(--ink);
}

.project-list {
  border-top: 1px solid var(--line);
}

.project {
  display: grid;
  grid-template-columns: 70px 3fr 4fr 2fr 24px;
  gap: 24px;
  align-items: start;
  padding: 28px 0;
  border-bottom: 1px solid var(--line);
  cursor: pointer;
  transition: padding 0.25s ease, background 0.25s ease;
}

.project:hover {
  padding-left: 14px;
  background: linear-gradient(to right, var(--bg-2) 0%, transparent 60%);
}

.year {
  font-family: var(--mono);
  font-size: 12px;
  color: var(--muted);
  letter-spacing: 0.04em;
  padding-top: 7px;
}

.title {
  font-weight: 700;
  font-size: 22px;
  letter-spacing: -0.025em;
  line-height: 1.2;
  color: var(--ink);
}

.role {
  margin-top: 6px;
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.08em;
  color: var(--muted);
  text-transform: uppercase;
}

.featured {
  display: inline-block;
  margin-left: 8px;
  font-family: var(--mono);
  font-size: 9.5px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent);
  border: 1px solid var(--accent);
  border-radius: 999px;
  padding: 3px 8px;
  vertical-align: 4px;
}

.desc {
  font-size: 14.5px;
  line-height: 1.65;
  color: var(--ink-2);
  letter-spacing: -0.005em;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.stack {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  padding-top: 6px;
  justify-content: flex-start;
}

.stack span {
  font-family: var(--mono);
  font-size: 10.5px;
  color: var(--muted);
  padding: 2px 8px;
  border: 1px solid var(--line-strong);
  border-radius: 999px;
  white-space: nowrap;
}

.arrow {
  padding-top: 6px;
  opacity: 0;
  transform: translateX(-6px);
  transition: all 0.25s;
  color: var(--ink);
}

.project:hover .arrow {
  opacity: 1;
  transform: translateX(0);
}

.empty {
  padding: 28px 0;
  font-family: var(--mono);
  font-size: 12px;
  color: var(--muted);
}

@media (max-width: 900px) {
  .project {
    grid-template-columns: 1fr;
    gap: 10px;
  }
  .arrow {
    display: none;
  }
  .year {
    padding-top: 0;
  }
}
</style>
