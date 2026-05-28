<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
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
const githubShort = computed(() =>
  personal.github.replace('https://', '').replace('http://', ''),
)

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
  'field-input',
])
</script>

<template>
  <section
    id="contact"
    class="section"
    aria-labelledby="contact-title"
  >
    <div class="page">
      <div class="sec-head">
        <div class="sec-num-col">
          <div class="sec-num"><span class="sec-dot" /> 05 — CONTACT</div>
        </div>
        <div class="sec-title-col">
          <h2 id="contact-title" class="sec-title">연락하기</h2>
          <p class="sec-sub">협업 · 채용 · 기술 문의 모두 환영합니다.</p>
        </div>
      </div>

      <div class="contact-left">
        <div class="contact-big">
          함께 만들고 싶은<br />
          것이 있다면<br />
          <span class="accent">편하게 말해주세요.</span>
        </div>
        <p class="contact-sub">보통 24시간 안에 답장드립니다. 짧은 메모도 좋아요.</p>

        <div class="contact-links" aria-label="직접 연락 링크">
          <a :href="`mailto:${personal.email}`">
            <span class="label">Email</span>
            <span class="value">{{ personal.email }}</span>
            <span class="arr" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4">
                <path d="M5 19 19 5 M9 5h10v10" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </span>
          </a>
          <a :href="personal.github" target="_blank" rel="noreferrer">
            <span class="label">GitHub</span>
            <span class="value">{{ githubShort }}</span>
            <span class="arr" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4">
                <path d="M5 19 19 5 M9 5h10v10" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </span>
          </a>
        </div>
      </div>

      <div class="contact-right">
        <form class="form" novalidate @submit.prevent="handleSubmit">
          <div class="field">
            <label for="contact-name">이름</label>
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
            <p v-if="errors.name" id="contact-name-error" role="alert" class="err">
              {{ errors.name }}
            </p>
          </div>

          <div class="field">
            <label for="contact-email">이메일</label>
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
            <p v-if="errors.email" id="contact-email-error" role="alert" class="err">
              {{ errors.email }}
            </p>
          </div>

          <div class="field">
            <label for="contact-message">메시지</label>
            <textarea
              id="contact-message"
              v-model="form.message"
              required
              rows="5"
              :class="['field-input', 'textarea']"
              :aria-invalid="errors.message ? 'true' : 'false'"
              :aria-describedby="errors.message ? 'contact-message-error' : undefined"
              placeholder="어떤 이야기를 나누고 싶으세요?"
            />
            <p v-if="errors.message" id="contact-message-error" role="alert" class="err">
              {{ errors.message }}
            </p>
          </div>

          <div class="submit-row">
            <button class="btn-primary" type="submit" :disabled="isLoading">
              {{ isLoading ? '전송 중...' : '메시지 보내기' }}
              <span class="arr" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </span>
            </button>
            <p v-if="statusMessage" class="status" aria-live="polite" aria-atomic="true">
              {{ statusMessage }}
            </p>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-left {
  grid-column: 1 / span 6;
}
.contact-right {
  grid-column: 8 / span 5;
}
@media (max-width: 900px) {
  .contact-left,
  .contact-right {
    grid-column: 1 / -1;
  }
  .contact-right {
    margin-top: 48px;
  }
}

.contact-big {
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 1;
  font-size: clamp(48px, 7vw, 96px);
  color: var(--ink);
}
.contact-big .accent {
  color: var(--accent);
}
.contact-sub {
  margin-top: 22px;
  max-width: 460px;
  color: var(--ink-2);
  font-size: 16.5px;
  line-height: 1.65;
}

.contact-links {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
}
.contact-links a {
  display: grid;
  grid-template-columns: 100px 1fr 24px;
  gap: 16px;
  align-items: center;
  padding: 18px 0;
  border-top: 1px solid var(--line);
  transition: padding 0.25s ease;
}
.contact-links a:last-child {
  border-bottom: 1px solid var(--line);
}
.contact-links a:hover {
  padding-left: 8px;
}
.contact-links .label {
  color: var(--muted);
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.contact-links .value {
  font-size: 16px;
  color: var(--ink);
  letter-spacing: -0.005em;
  font-weight: 500;
  overflow-wrap: anywhere;
}
.contact-links .arr {
  color: var(--muted-2);
  transition: transform 0.25s;
  justify-self: end;
}
.contact-links a:hover .arr {
  transform: translate(4px, -4px);
  color: var(--ink);
}

.form {
  display: flex;
  flex-direction: column;
  gap: 22px;
}
.field label {
  display: block;
  font-family: var(--mono);
  font-size: 10.5px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 8px;
}
.field-input {
  width: 100%;
  background: transparent;
  border: 0;
  border-bottom: 1px solid var(--line-strong);
  padding: 10px 0;
  font-size: 15.5px;
  color: var(--ink);
  outline: none;
  transition: border-color 0.2s;
  letter-spacing: -0.005em;
  font-family: var(--sans);
}
.field-input::placeholder {
  color: var(--muted-2);
}
.field-input:focus {
  border-color: var(--ink);
}
.textarea {
  resize: vertical;
  min-height: 110px;
}
.err {
  margin-top: 6px;
  font-size: 12px;
  color: var(--accent);
}
.submit-row {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
  margin-top: 8px;
}
.status {
  font-family: var(--mono);
  font-size: 12px;
  color: var(--muted);
}
</style>
