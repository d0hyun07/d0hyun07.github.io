<script setup lang="ts">
import { personal } from '@/data/personal'
import { useScrollReveal } from '@/composables/useScrollReveal'

const { isVisible, target } = useScrollReveal()
</script>

<template>
  <section
    id="about"
    ref="target"
    class="section reveal"
    :class="{ visible: isVisible }"
    aria-labelledby="about-title"
  >
    <div class="page">
      <div class="sec-head">
        <div class="sec-num-col">
          <div class="sec-num"><span class="sec-dot" /> 01 — ABOUT</div>
        </div>
        <div class="sec-title-col">
          <h2 id="about-title" class="sec-title">소개</h2>
          <p class="sec-sub">하드웨어와 소프트웨어 사이를 오가며 일해온 개발자입니다.</p>
        </div>
      </div>

      <div class="about-side-col">
        <div class="about-side">
          <div class="row">
            <div class="label">Name</div>
            <div class="val">{{ personal.name }}</div>
          </div>
          <div class="row">
            <div class="label">Born</div>
            <div class="val">2007 · 01 · 24</div>
          </div>
          <div class="row">
            <div class="label">Role</div>
            <div class="val">{{ personal.role[0] }}</div>
          </div>
          <div class="row">
            <div class="label">Email</div>
            <div class="val">{{ personal.email }}</div>
          </div>
          <div class="row">
            <div class="label">GitHub</div>
            <div class="val">
              <a :href="personal.github" target="_blank" rel="noreferrer">
                {{ personal.github.replace(/^https?:\/\//, '') }}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="about-body-col">
        <div class="prose">
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

        <div class="focus">
          <span v-for="interest in personal.interests" :key="interest" class="chip">
            {{ interest }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-side-col {
  grid-column: 1 / span 3;
}
.about-body-col {
  grid-column: 4 / span 9;
}
@media (max-width: 900px) {
  .about-side-col,
  .about-body-col {
    grid-column: 1 / -1;
  }
  .about-side-col {
    margin-bottom: 32px;
  }
}
.about-side .row {
  padding: 14px 0;
  border-bottom: 1px solid var(--line);
}
.about-side .row:first-child {
  border-top: 1px solid var(--line);
}
.about-side .label {
  font-family: var(--mono);
  font-size: 10.5px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--muted);
}
.about-side .val {
  margin-top: 4px;
  font-size: 14.5px;
  color: var(--ink-2);
  font-weight: 500;
  letter-spacing: -0.005em;
  overflow-wrap: anywhere;
}
.prose p {
  font-size: 18px;
  line-height: 1.75;
  color: var(--ink-2);
  letter-spacing: -0.01em;
  max-width: 720px;
}
.prose p + p {
  margin-top: 20px;
}
.focus {
  margin-top: 40px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
</style>
