<template>
  <section class="hero">
    <div class="container hero__inner">
      <!-- LEFT SIDE -->
      <div class="hero__left">
        <h1 class="hero__title">
          РЕМОНТ СТИРАЛЬНЫХ МАШИН В&nbsp;КИРОВЕ ЗА&nbsp;2&nbsp;ЧАСА
        </h1>
        <p class="hero__subtitle">
          ОТ&nbsp;200&nbsp;РУБЛЕЙ С&nbsp;ГАРАНТИЕЙ ДО&nbsp;3-Х ЛЕТ&nbsp;ПО ДОГОВОРУ
        </p>

        <ul class="benefits">
          <li v-for="b in benefits" :key="b" class="benefits__item">
            <span class="benefits__icon" />
            <span>{{ b }}</span>
          </li>
        </ul>
      </div>

      <!-- RIGHT SIDE (CTA FORM) -->
      <div class="hero__right">
        <form class="cta" @submit.prevent="submit">
          <h2 class="cta__title">
            Заполните форму и&nbsp;узнайте цену ремонта стиральной машины
          </h2>

          <input
            v-model="form.name"
            class="cta__input"
            type="text"
            placeholder="Имя"
          />

          <div class="phone-group">
            <span class="phone-prefix">+7</span>
            <input
              v-model="displayPhone"
              type="tel"
              inputmode="tel"
              placeholder="(___) ___-__-__"
              class="phone-input"
              @input="onPhoneInput"
              @keydown="onPhoneKeydown"
              maxlength="15"
              required
            />
          </div>

          <button type="submit" class="cta__btn">Узнать стоимость</button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue'

const benefits = [
  'Выезд в течение 30 минут',
  'Выезд мастера бесплатно',
  'Ремонтируем за 1 выезд',
  'Оплата по факту ремонта'
]

const form = reactive({ name: '', phone: '' })
const displayPhone = ref('')
const rawPhone = ref('') // только цифры без префикса

function formatDigits (d) {
  let res = ''
  if (d.length > 0) res = `(${d.slice(0, Math.min(3, d.length))}`
  if (d.length >= 3) res = `(${d.slice(0,3)}) `
  if (d.length > 3) res += d.slice(3, Math.min(6, d.length))
  if (d.length >= 6) res += '-'
  if (d.length > 6) res += d.slice(6, Math.min(8, d.length))
  if (d.length >= 8) res += '-'
  if (d.length > 8) res += d.slice(8, Math.min(10, d.length))
  return res
}

function syncFromDigits () {
  displayPhone.value = formatDigits(rawPhone.value)
  form.phone = '+7' + rawPhone.value
}

function onPhoneInput (e) {
  let d = e.target.value.replace(/\D/g, '')
  if (d.startsWith('7')) d = d.slice(1)
  if (d.startsWith('8')) d = d.slice(1)
  rawPhone.value = d.slice(0, 10)
  syncFromDigits()
}

function onPhoneKeydown (e) {
  if (e.key === 'Backspace') {
    const input = e.target
    const atEnd = input.selectionStart === input.value.length && input.selectionEnd === input.value.length
    if (atEnd) {
      e.preventDefault()
      if (rawPhone.value.length > 0) {
        rawPhone.value = rawPhone.value.slice(0, -1)
        syncFromDigits()
        requestAnimationFrame(() => {
          input.selectionStart = input.selectionEnd = input.value.length
        })
      }
    }
  }
}

async function submit () {
  try {
    await $fetch('/api/send-lead', {
      method: 'POST',
      body: { name: form.name, phone: form.phone, source: 'hero', timestamp: new Date().toISOString() }
    })
    navigateTo('/complete?source=hero')
  } catch (e) {
    console.error(e)
    alert('Не удалось отправить. Попробуйте ещё раз или позвоните нам.')
  } finally {
    form.name = ''
    form.phone = ''
    displayPhone.value = ''
    rawPhone.value = ''
  }
}
</script>

<style scoped>
:root {
  --green: #0eaa10;
  --yellow: #eede77;
  --overlay: rgba(0, 0, 0, 0.6);
  --gray-100: #f5f5f5;
  --gray-700: #404040;
  --radius: 8px;
}

.container {
  max-width: 1200px;
  margin-inline: auto;
  padding-inline: 16px;
}

/* ─── HERO ──────────────────────────────────────────────────────────────────── */
.hero {
  position: relative;
  background: url('/images/washer-bg.jpg') center / cover no-repeat;
  color: #fff;
  padding-block: 80px 60px;
}

.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
}

.hero__inner {
  position: relative;
  display: flex;
  gap: 40px;
  z-index: 1;
}

.hero__left { flex: 1; }

.hero__title {
  margin: 0 0 12px;
  font-size: 36px;
  font-weight: 800;
  text-transform: uppercase;
  line-height: 1.2;
}

.hero__subtitle {
  margin: 0 0 32px;
  font-size: 20px;
  font-weight: 700;
  color: var(--yellow);
}

.benefits { list-style: none; padding: 0; margin: 0; }
.benefits__item { display: flex; align-items: center; gap: 12px; font-size: 18px; margin-bottom: 20px; }
.benefits__icon { width: 24px; height: 24px; background: url('/icons/arrow-yellow.svg') center / contain no-repeat; flex: 0 0 24px; }

/* CTA FORM */
.hero__right { flex: 0 0 360px; }

.cta { border: 2px dashed var(--yellow); border-radius: var(--radius); padding: 32px; backdrop-filter: blur(4px); background: rgba(0, 0, 0, 0.25); }
.cta__title { margin: 0 0 24px; font-size: 18px; font-weight: 600; text-align: center; }

.cta__input { width: 100%; padding: 12px 16px; margin-bottom: 16px; font-size: 16px; border: 1px solid #d1d1d1; border-radius: var(--radius); color: #000; background: #fff; }

/* phone */
.phone-group { display: grid; grid-template-columns: 64px 1fr; align-items: center; border: 1px solid #d1d1d1; border-radius: var(--radius); overflow: hidden; background: #fff; margin-bottom: 16px; }
.phone-group:focus-within { border-color: var(--green); box-shadow: 0 0 0 3px rgba(14,170,16,0.2); }
.phone-prefix { display: flex; align-items: center; justify-content: center; height: 48px; background: #e9f2f9; color: #0b1f2a; font-weight: 700; }
.phone-input { height: 48px; border: 0; outline: none; padding: 0 16px; font-size: 16px; color: #000; background: #fff; }

.cta__btn { width: 100%; padding: 14px 16px; font-size: 16px; font-weight: 600; border: none; border-radius: var(--radius); background: var(--green); color: #fff; cursor: pointer; transition: opacity 0.2s; }
.cta__btn:hover { opacity: 0.9; }

/* ─── MEDIA QUERIES ─────────────────────────────────────────────────────────── */
@media (max-width: 992px) {
  .hero__inner { flex-direction: column; }
  .hero__right { width: 100%; max-width: 480px; }
}

@media (max-width: 600px) {
  .container { padding-inline: 12px; }
  .hero { padding-block: 12px 8px !important; }
  .hero__inner { gap: 16px; }
  .hero__left { text-align: center; width: 100%; }
  .hero__title { font-size: 30px; line-height: 1.22; text-align: center; margin: 0 0 8px; }
  .hero__subtitle { font-size: 18px; text-align: center; }
  .benefits { margin-top: 10px; gap: 12px; width: 100%; }
  .benefits__item { font-size: 22px; line-height: 1.4; justify-content: center; width: 100%; }
  .benefits__icon { width: 20px; height: 20px; flex: 0 0 20px; }
  .hero__right { max-width: 100%; width: 100%; }
  .cta { padding: 14px; width: 100%; }
  .cta__title { font-size: 18px; }
  .cta__btn { padding: 12px 14px; font-size: 15px; width: 100%; }
}
</style> 