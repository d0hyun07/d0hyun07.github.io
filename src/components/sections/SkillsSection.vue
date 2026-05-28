<script setup lang="ts">
import { computed } from 'vue'
import { skills } from '@/data/skills'
import { useScrollReveal } from '@/composables/useScrollReveal'

type SkillGroupKey = 'frontend' | 'backend' | 'robotics' | 'infra'

interface SkillGroup {
  key: SkillGroupKey
  title: string
  cat: string
  items: { name: string; lvl: string }[]
}

function levelLabel(level?: number): string {
  if (typeof level !== 'number') return '—'
  if (level >= 85) return 'Daily'
  if (level >= 70) return 'Proficient'
  if (level >= 55) return 'Familiar'
  return 'Learning'
}

const grouped = computed<SkillGroup[]>(() => {
  const frontend = skills.filter((s) => s.category === 'frontend')
  const backend = skills.filter((s) => s.category === 'backend')
  const robotics = skills.filter((s) => s.category === 'embedded')
  const infra = skills.filter((s) => s.category === 'devops' || s.category === 'security')

  const mapItems = (list: typeof skills) =>
    list
      .slice()
      .sort((a, b) => (b.level ?? 0) - (a.level ?? 0))
      .slice(0, 10)
      .map((s) => ({ name: s.name, lvl: levelLabel(s.level) }))

  return [
    { key: 'frontend', title: 'Frontend', cat: 'Interfaces', items: mapItems(frontend) },
    { key: 'backend', title: 'Backend', cat: 'Services', items: mapItems(backend) },
    { key: 'robotics', title: 'Robotics · AI', cat: 'Embedded', items: mapItems(robotics) },
    { key: 'infra', title: 'Infrastructure', cat: 'Ops', items: mapItems(infra) },
  ]
})

const { isVisible, target } = useScrollReveal()
</script>

<template>
  <section
    id="skills"
    ref="target"
    class="section reveal"
    :class="{ visible: isVisible }"
    aria-labelledby="skills-title"
  >
    <div class="page">
      <div class="sec-head">
        <div class="sec-num-col">
          <div class="sec-num"><span class="sec-dot" /> 03 — TOOLKIT</div>
        </div>
        <div class="sec-title-col">
          <h2 id="skills-title" class="sec-title">기술 스택</h2>
          <p class="sec-sub">실무·프로젝트에서 직접 사용해 본 도구들입니다.</p>
        </div>
      </div>

      <div class="skills-grid">
        <div
          v-for="(g, i) in grouped"
          :key="g.key"
          class="skill-group reveal"
          :class="{ visible: isVisible }"
          :style="{ transitionDelay: `${Math.min(i * 80, 240)}ms` }"
        >
          <div class="cat">{{ g.cat }}</div>
          <h3>{{ g.title }}</h3>
          <ul>
            <li v-for="it in g.items" :key="it.name">
              <span>{{ it.name }}</span>
              <span class="lvl">{{ it.lvl }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.skills-grid {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: var(--line);
  border: 1px solid var(--line);
}
@media (max-width: 900px) {
  .skills-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 480px) {
  .skills-grid {
    grid-template-columns: 1fr;
  }
}
.skill-group {
  background: var(--bg);
  padding: 30px 26px;
}
.cat {
  font-family: var(--mono);
  font-size: 10.5px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 6px;
}
h3 {
  font-weight: 700;
  font-size: 22px;
  letter-spacing: -0.02em;
  color: var(--ink);
  margin-bottom: 20px;
}
ul {
  list-style: none;
}
li {
  font-size: 14.5px;
  color: var(--ink-2);
  padding: 9px 0;
  border-bottom: 1px dashed var(--line);
  letter-spacing: -0.005em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}
li:last-child {
  border-bottom: 0;
}
.lvl {
  font-family: var(--mono);
  font-size: 10.5px;
  color: var(--muted-2);
  letter-spacing: 0.08em;
  white-space: nowrap;
}
</style>
