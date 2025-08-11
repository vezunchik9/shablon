<template>
  <teleport to="body">
    <div v-if="isOpen" class="modal-overlay" @click.self="close">
      <div class="modal" role="dialog" aria-modal="true" aria-labelledby="lead-modal-title">
        <button class="modal__close" aria-label="Закрыть" @click="close">×</button>

        <h3 id="lead-modal-title" class="modal__title">{{ ctx.title }}</h3>

        <form class="modal__form" @submit.prevent="submit">
          <input
            v-model="form.name"
            type="text"
            class="input"
            placeholder="Имя"
            aria-label="Имя"
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
          <button type="submit" class="btn">{{ ctx.submitText }}</button>
        </form>

        <p class="note">Нажимая кнопку, вы даете согласие на обработку персональных данных</p>
      </div>
    </div>
  </teleport>
  
</template>

<script setup>
const { isOpen, context: ctx, close } = useLeadModal()

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

function onKeydown (e) {
  if (e.key === 'Escape') close()
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
})

async function submit () {
  try {
    await $fetch('/api/send-lead', {
      method: 'POST',
      body: { ...form, source: ctx.source, timestamp: new Date().toISOString() }
    })
    form.name = ''
    form.phone = ''
    displayPhone.value = ''
    rawPhone.value = ''
    close()
    // redirect to complete page with source for paid traffic attribution
    const q = ctx.source ? `?source=${encodeURIComponent(ctx.source)}` : ''
    navigateTo(`/complete${q}`)
  } catch (e) {
    console.error(e)
    alert('Не удалось отправить. Попробуйте ещё раз или позвоните нам.')
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.5);
  display: grid;
  place-items: center;
  z-index: 2000;
}

.modal {
  width: min(520px, 92vw);
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  position: relative;
  box-shadow: 0 12px 40px rgba(0,0,0,.2);
}

.modal__close {
  position: absolute;
  top: 8px;
  right: 12px;
  width: 36px;
  height: 36px;
  border: none;
  background: transparent;
  font-size: 24px;
  cursor: pointer;
}

.modal__title {
  margin: 0 0 16px;
  font-size: 22px;
  font-weight: 800;
  text-align: center;
}

.modal__form { display: grid; gap: 12px; }

.input { width: 100%; padding: 14px 16px; font-size: 16px; border: 1px solid #d1d1d1; border-radius: 10px; color: #000; background: #fff; }

.btn { padding: 14px 20px; background: var(--green); color: #fff; border: none; border-radius: 10px; font-weight: 800; cursor: pointer; }
.btn:hover { background: #0d9a0f; }

.note { margin: 8px 0 0; font-size: 12px; text-align: center; color: #555; }

/* phone */
.phone-group { display: grid; grid-template-columns: 64px 1fr; align-items: center; border: 1px solid #d1d1d1; border-radius: 12px; overflow: hidden; background: #fff; }
.phone-group:focus-within { border-color: var(--green); box-shadow: 0 0 0 3px rgba(14,170,16,0.2); }
.phone-prefix { display: flex; align-items: center; justify-content: center; height: 48px; background: #e9f2f9; color: #0b1f2a; font-weight: 700; }
.phone-input { height: 48px; border: 0; outline: none; padding: 0 16px; font-size: 16px; color: #000; background: #fff; }
</style>


