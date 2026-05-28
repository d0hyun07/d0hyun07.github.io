<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

// 6개 섹션 모두 lazy 로드 (성능 룰 — defineAsyncComponent)
const HeroSection = defineAsyncComponent(
  () => import('@/components/sections/HeroSection.vue'),
)
const AboutSection = defineAsyncComponent(
  () => import('@/components/sections/AboutSection.vue'),
)
const SkillsSection = defineAsyncComponent(
  () => import('@/components/sections/SkillsSection.vue'),
)
const ProjectsSection = defineAsyncComponent(
  () => import('@/components/sections/ProjectsSection.vue'),
)
const ExperienceSection = defineAsyncComponent(
  () => import('@/components/sections/ExperienceSection.vue'),
)
const ContactSection = defineAsyncComponent(
  () => import('@/components/sections/ContactSection.vue'),
)
</script>

<template>
  <HeroSection />
  <AboutSection />
  <SkillsSection />
  <ProjectsSection />
  <ExperienceSection />
  <ContactSection />
</template>
