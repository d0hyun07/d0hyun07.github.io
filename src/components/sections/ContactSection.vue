<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { personal } from '@/data/personal'
import type { ContactStatus } from '@/types'

// TODO: 실제 Formspree form id 로 교체 (https://formspree.io/forms)
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/your_form_id'

interface ContactForm {
  name: string
  email: string
  message: string
}

interface ContactErrors {
  name?: string
  email?: string
  message?: string
}

const form = reactive<ContactForm>({
  name: '',
  email: '',
  message: '',
})

const errors = ref<ContactErrors>({})
const status = ref<ContactStatus>('idle')
const statusMessage = ref('')

const isLoading = computed(() => status.value === 'loading')

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function validate(): boolean {
  const next: ContactErrors = {}
  if (!form.name.trim()) next.name = '이름을 입력해 주세요.'
  if (!form.email.trim()) next.email = '이메일을 입력해 주세요.'
  else if (!validateEmail(form.email)) next.email = '올바른 이메일 형식이 아닙니다.'
  if (!form.message.trim()) next.message = '메시지를 입력해 주세요.'
  else if (form.message.trim().length < 10)
    next.message = '메시지를 10자 이상 입력해 주세요.'

  errors.value = next
  return Object.keys(next).length === 0
}

async function handleSubmit() {
  if (!validate()) {
    statusMessage.value = '입력 항목을 다시 확인해 주세요.'
    status.value = 'error'
    return
  }

  status.value = 'loading'
  statusMessage.value = '전송 중...'

  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(form),
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    status.value = 'success'
    statusMessage.value = '메시지가 정상적으로 전송되었습니다. 감사합니다!'
    form.name = ''
    form.email = ''
    form.message = ''
    errors.value = {}
  } catch (err) {
    if (import.meta.env.DEV) {
      console.error('Contact form 전송 실패:', err)
    }
    status.value = 'error'
    statusMessage.value =
      '전송에 실패했습니다. 잠시 후 다시 시도하거나 이메일로 직접 연락 주세요.'
  }
}

const inputClass = computed(() => [
  'w-full px-4 py-3 rounded-md font-sans text-sm md:text-base',
  'bg-[var(--color-surface)] text-[var(--color-text)]',
  'border border-[var(--color-border)]',
  'focus:border-[var(--color-primary)] focus:outline-none',
  'transition-colors duration-150',
  'placeholder:text-[var(--color-text-dim)]',
])
</script>

<template>
  <section
    id="contact"
    class="py-24"
    aria-labelledby="contact-title"
  >
    <div class="container-portfolio max-w-3xl">
      <SectionTitle
        id="contact-title"
        title="Contact"
        subtitle="협업 · 채용 · 기술 문의 모두 환영합니다. 보통 24시간 내 답장 드려요."
        align="center"
      />

      <!-- 문의 폼 -->
      <form
        class="space-y-5"
        novalidate
        @submit.prevent="handleSubmit"
      >
        <!-- 이름 -->
        <div>
          <label
            for="contact-name"
            class="block font-mono text-xs text-[var(--color-text-muted)] mb-2 uppercase tracking-wider"
          >
            이름
            <span class="text-[var(--color-error)]" aria-hidden="true">*</span>
          </label>
          <input
            id="contact-name"
            v-model="form.name"
            type="text"
            required
            autocomplete="name"
            :class="inputClass"
            :aria-invalid="errors.name ? 'true' : 'false'"
            :aria-describedby="errors.name ? 'contact-name-error' : undefined"
            placeholder="홍길동"
          />
          <p
            v-if="errors.name"
            id="contact-name-error"
            role="alert"
            class="mt-1.5 text-xs text-[var(--color-error)]"
          >
            {{ errors.name }}
          </p>
        </div>

        <!-- 이메일 -->
        <div>
          <label
            for="contact-email"
            class="block font-mono text-xs text-[var(--color-text-muted)] mb-2 uppercase tracking-wider"
          >
            이메일
            <span class="text-[var(--color-error)]" aria-hidden="true">*</span>
          </label>
          <input
            id="contact-email"
            v-model="form.email"
            type="email"
            required
            autocomplete="email"
            :class="inputClass"
            :aria-invalid="errors.email ? 'true' : 'false'"
            :aria-describedby="errors.email ? 'contact-email-error' : undefined"
            placeholder="you@example.com"
          />
          <p
            v-if="errors.email"
            id="contact-email-error"
            role="alert"
            class="mt-1.5 text-xs text-[var(--color-error)]"
          >
            {{ errors.email }}
          </p>
        </div>

        <!-- 메시지 -->
        <div>
          <label
            for="contact-message"
            class="block font-mono text-xs text-[var(--color-text-muted)] mb-2 uppercase tracking-wider"
          >
            메시지
            <span class="text-[var(--color-error)]" aria-hidden="true">*</span>
          </label>
          <textarea
            id="contact-message"
            v-model="form.message"
            required
            rows="6"
            :class="[inputClass, 'resize-y min-h-[160px]']"
            :aria-invalid="errors.message ? 'true' : 'false'"
            :aria-describedby="
              errors.message ? 'contact-message-error' : undefined
            "
            placeholder="안녕하세요, 다음 내용으로 문의드립니다..."
          />
          <p
            v-if="errors.message"
            id="contact-message-error"
            role="alert"
            class="mt-1.5 text-xs text-[var(--color-error)]"
          >
            {{ errors.message }}
          </p>
        </div>

        <!-- 제출 버튼 -->
        <div class="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
          <BaseButton
            type="submit"
            variant="primary"
            :disabled="isLoading"
          >
            {{ isLoading ? '전송 중...' : '메시지 보내기 →' }}
          </BaseButton>

          <!-- 상태 안내 (스크린리더 친화) -->
          <p
            v-if="statusMessage"
            aria-live="polite"
            aria-atomic="true"
            class="font-mono text-sm"
            :class="
              status === 'success'
                ? 'text-[var(--color-success)]'
                : status === 'error'
                  ? 'text-[var(--color-error)]'
                  : 'text-[var(--color-text-muted)]'
            "
          >
            {{ statusMessage }}
          </p>
        </div>
      </form>

      <!-- SNS / 직접 연락 -->
      <div
        class="mt-12 pt-10 border-t border-[var(--color-border)] text-center"
      >
        <p
          class="font-mono text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-4"
        >
          또는 직접 연락
        </p>
        <ul class="flex flex-wrap justify-center gap-4 md:gap-6">
          <li>
            <a
              :href="`mailto:${personal.email}`"
              class="font-mono text-sm text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors"
              :aria-label="`이메일 ${personal.email} 으로 보내기`"
            >
              ✉ {{ personal.email }}
            </a>
          </li>
          <li>
            <a
              :href="personal.github"
              target="_blank"
              rel="noopener noreferrer"
              class="font-mono text-sm text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors"
              aria-label="GitHub 프로필 새 탭에서 열기"
            >
              ⌥ GitHub
            </a>
          </li>
          <li v-if="personal.linkedin">
            <a
              :href="personal.linkedin"
              target="_blank"
              rel="noopener noreferrer"
              class="font-mono text-sm text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors"
              aria-label="LinkedIn 프로필 새 탭에서 열기"
            >
              in LinkedIn
            </a>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
