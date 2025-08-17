<template>
  <section class="repair-time-cta">
    <div class="overlay">
      <h2 class="title">УЗНАЙТЕ СРОК РЕМОНТА СТИРАЛЬНОЙ МАШИНЫ</h2>

      <form class="form" @submit.prevent="submit">
        <input v-model="form.name" class="input" type="text" placeholder="Имя" aria-label="Имя" />
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
        <button type="submit" class="btn">УЗНАТЬ СРОК РЕМОНТА</button>
      </form>

      <p class="note">Нажимая кнопку, вы даете согласие на обработку персональных данных</p>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue'

const form = reactive({ name: '', phone: '' })
const displayPhone = ref('')
const rawPhone = ref('')

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
      body: { name: form.name, phone: form.phone, source: 'repair-time-cta', timestamp: new Date().toISOString() }
    })
    navigateTo('/complete?source=repair-time-cta')
  } catch (e) {
    console.error(e)
    alert('Не удалось отправить. Попробуйте ещё раз или позвоните нам.')
  }
}
</script>

<style scoped>
.repair-time-cta { position: relative; background: url('/images/why/bg.jpg') center/cover no-repeat; color: #fff; }
.repair-time-cta::before { content: ''; position: absolute; inset: 0; background: rgba(0,0,0,0.7); }
.overlay { position: relative; max-width: 1200px; margin: 0 auto; padding: 48px 16px 40px; text-align: center; }
.title { margin: 0 0 20px; font-size: 36px; font-weight: 900; text-transform: uppercase; }
.form { display: grid; grid-template-columns: 1fr 1fr auto; gap: 12px; align-items: center; max-width: 980px; margin: 0 auto 10px; }
.input { width: 100%; padding: 14px 16px; font-size: 16px; border: none; border-radius: 10px; color: #000; background: #fff; }
.btn { padding: 14px 22px; background: var(--green) !important; color: #fff !important; border: none !important; border-radius: 10px; font-size: 14px; font-weight: 800; cursor: pointer; white-space: nowrap; }
.btn:hover { background: #0d9a0f !important; }
.note { margin: 8px 0 0; font-size: 12px; opacity: 0.95; }
@media (max-width: 900px) {
  .title { font-size: 28px; }
  .form { grid-template-columns: 1fr; }
  .btn { width: 100%; }
}

/* phone */
.phone-group { display: grid; grid-template-columns: 64px 1fr; align-items: center; border: 1px solid #d1d1d1; border-radius: 12px; overflow: hidden; background: #fff; }
.phone-group:focus-within { border-color: var(--green); box-shadow: 0 0 0 3px rgba(14,170,16,0.2); }
.phone-prefix { display: flex; align-items: center; justify-content: center; height: 48px; background: #e9f2f9; color: #0b1f2a; font-weight: 700; }
.phone-input { height: 48px; border: 0; outline: none; padding: 0 16px; font-size: 16px; color: #000; background: #fff; }

@media (max-width: 600px) {
  .overlay { padding: 36px 14px 28px; }
  .title { font-size: 24px; }
  .input { padding: 12px 14px; font-size: 15px; }
  .btn { padding: 12px 18px; font-size: 15px; }
}
</style>