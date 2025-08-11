<template>
  <section class="quiz-section">
    <div class="wrapper">
      <!-- TITLE -->
      <h2 class="title">УЗНАЙТЕ СТОИМОСТЬ РЕМОНТА ЗА&nbsp;3&nbsp;МИНУТЫ</h2>
      <p class="subtitle">
        Заполнив тест, вы сэкономите время менеджеров — поэтому мы дадим вам
        скидку 20%
      </p>

      <!-- CARD -->
      <div class="quiz-container">
        <div class="card">
          <!-- LEFT IMAGE -->
          <div class="card__image">
            <img :src="currentStep.image" :alt="currentStep.alt" />
          </div>

          <!-- RIGHT CONTENT -->
          <div class="card__content">
            <!-- QUESTION -->
            <h3 class="question">{{ currentStep.question }}</h3>

            <!-- OPTIONS OR FINAL FORM -->
            <div v-if="!isLast">
              <label
                v-for="opt in currentStep.options"
                :key="opt.value"
                class="option"
                :class="{ 'option--selected': answers[current] === opt.value }"
              >
                <input
                  type="radio"
                  v-model="answers[current]"
                  :value="opt.value"
                  :name="'step-' + current"
                  @change="next"
                />
                <span>{{ opt.label }}</span>
              </label>
            </div>

            <form v-else class="final" @submit.prevent="submit">
              <p class="final__text">
                Мы начали расчёт стоимости вашего ремонта.
                <br />
                Нажмите кнопку «УЗНАТЬ СТОИМОСТЬ» и&nbsp;мы сообщим вам результат
                по&nbsp;телефону
              </p>
              <input
                v-model="form.name"
                type="text"
                placeholder="Имя"
                class="input"
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
              <button type="submit" class="submit-btn">Узнать стоимость ремонта</button>
            </form>

            <!-- PROGRESS BAR -->
            <div class="progress">
              <span class="progress__percent">{{ percent }}%</span>
              <div class="progress__bar">
                <div
                  class="progress__fill"
                  :style="{ width: percent + '%' }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, computed, ref } from 'vue'

const steps = [
  {
    question: 'Выберите производителя',
    options: [
      { label: 'Samsung', value: 'samsung' },
      { label: 'Candy', value: 'candy' },
      { label: 'Индезит', value: 'indesit' },
      { label: 'Атлант', value: 'atlant' },
      { label: 'Другое', value: 'other' }
    ],
    image: '/images/quiz/step1.jpg',
    alt: 'Стиральные машины'
  },
  {
    question: 'Выберите неисправность',
    options: [
      { label: 'Светится ошибка', value: 'error' },
      { label: 'Не включается', value: 'noPower' },
      { label: 'Не сливает воду', value: 'noDrain' },
      { label: 'Протекает', value: 'leak' },
      { label: 'Другое', value: 'other' }
    ],
    image: '/images/quiz/step2.jpg',
    alt: 'Панель стиральной машины'
  },
  {
    question: 'Сколько лет стиральной машине?',
    options: [
      { label: 'Недавно купили', value: '0' },
      { label: 'До 1-го года', value: '1' },
      { label: 'Более 2-х лет', value: '2' },
      { label: 'Более 5-ти лет', value: '5' },
      { label: 'Другое', value: 'other' }
    ],
    image: '/images/quiz/step3.jpg',
    alt: 'Шильдик'
  },
  {
    question: 'Ремонтировали ранее?',
    options: [
      { label: 'Да, 1-2 раза', value: 'few' },
      { label: 'Нет, не ремонтировали', value: 'never' },
      { label: 'Многократно ремонтировали', value: 'many' },
      {
        label: 'Вызывали мастера, снова сломалась',
        value: 'brokenAgain'
      },
      { label: 'Другое', value: 'other' }
    ],
    image: '/images/quiz/step4.jpg',
    alt: 'Мастер чинит машинку'
  },
  {
    question: 'Контакты',
    options: [],
    image: '/images/quiz/step5.jpg',
    alt: 'Калькулятор и стиралка'
  }
]

const total = steps.length
const answers = reactive({})
const current = ref(0)
const form = reactive({ name: '', phone: '' })
const displayPhone = ref('')
const rawPhone = ref('') // только цифры без префикса

// Инициализируем ответы для каждого шага как пустые
for (let i = 0; i < total - 1; i++) {
  answers[i] = ''
}

const currentStep = computed(() => steps[current.value])
const isLast = computed(() => current.value === total - 1)
const percent = computed(() =>
  Math.round(((current.value + 1) / total) * 100)
)
const left = computed(() => total - current.value - 1)

function next () {
  setTimeout(() => {
    if (current.value < total - 1) current.value++
  }, 300)
}

function prev () {
  if (current.value > 0) current.value--
}

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
    // Если курсор в конце и удаляем, снимаем последнюю цифру, а не символ маски
    const atEnd = input.selectionStart === input.value.length && input.selectionEnd === input.value.length
    if (atEnd) {
      e.preventDefault()
      if (rawPhone.value.length > 0) {
        rawPhone.value = rawPhone.value.slice(0, -1)
        syncFromDigits()
        // курсор в конец после перерендеринга
        requestAnimationFrame(() => {
          input.selectionStart = input.selectionEnd = input.value.length
        })
      }
    }
  }
}

async function submit () {
  try {
    const payloadAnswers = {}
    Object.keys(answers).forEach(k => { payloadAnswers[k] = answers[k] })
    await $fetch('/api/send-lead', {
      method: 'POST',
      body: {
        name: form.name,
        phone: form.phone,
        answers: payloadAnswers,
        source: 'quiz',
        timestamp: new Date().toISOString()
      }
    })
    navigateTo('/complete?source=quiz')
  } catch (e) {
    console.error(e)
    alert('Не удалось отправить. Попробуйте ещё раз или позвоните нам.')
  } finally {
    current.value = 0
    Object.keys(answers).forEach(k => (answers[k] = []))
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
  --gray-100: #f5f5f5;
  --gray-300: #dcdcdc;
  --gray-700: #404040;
  --radius: 8px;
}

.quiz-section {
  background: var(--gray-100);
  padding: 80px 0;
}

.wrapper {
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 16px;
  text-align: center;
  color: var(--gray-700);
}

.title {
  margin: 0 0 8px;
  font-size: 32px;
  font-weight: 800;
  text-transform: uppercase;
}

.subtitle {
  margin: 0 0 40px;
  font-size: 16px;
}

.quiz-container {
  background: white;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  overflow: hidden;
  margin: 0 auto;
  max-width: 1000px;
}

.card {
  display: flex;
  gap: 32px;
  padding: 32px;
  background: white;
}

.card__image img {
  width: 360px;
  height: auto;
  object-fit: cover;
  border-radius: 12px;
}

.card__content {
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: visible;
}

.question {
  margin: 0 0 24px;
  font-size: 20px;
  font-weight: 600;
  text-align: left;
}

.option {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  font-size: 16px;
  cursor: pointer;
  padding: 12px 16px;
  border-radius: 8px;
  border: 2px solid transparent;
  transition: all 0.3s ease;
  background: white;
}

.option:hover {
  background-color: var(--gray-100);
  border-color: var(--gray-300);
}

.option--selected {
  background-color: #f0f9ff;
  border-color: var(--green);
  box-shadow: 0 0 0 3px rgba(14, 170, 16, 0.1);
  transform: translateY(-1px);
}

.option input {
  accent-color: var(--green);
  width: 20px;
  height: 20px;
  margin: 0;
}

.progress {
  margin-top: auto;
}

.progress__bar {
  width: 100%;
  height: 6px;
  background: var(--gray-100);
  border-radius: 3px;
  margin: 8px 0;
  overflow: hidden;
}

.progress__fill {
  height: 100%;
  background: var(--green);
  border-radius: 3px;
  transition: width 0.3s ease;
}

.progress__percent {
  font-size: 14px;
  color: var(--green);
  font-weight: 600;
}

.progress__left {
  font-size: 14px;
  color: var(--gray-700);
}

.nav {
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
}

.btn {
  padding: 12px 32px;
  border: 1px solid #333;
  border-radius: 12px;
  background: #333;
  color: white;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
  opacity: 1 !important;
  visibility: visible !important;
}

.btn:hover:not([disabled]) {
  background: #555;
  border-color: #555;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.btn[disabled] {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn.primary {
  background: var(--green);
  color: #fff;
  border-color: var(--green);
  display: block;
  width: 100%;
  font-size: 16px;
  font-weight: 600;
  padding: 16px 32px;
  opacity: 1 !important;
  visibility: visible !important;
}

.btn.primary:hover:not([disabled]) {
  background: #0d9a0f;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(14, 170, 16, 0.3);
}

.final__text {
  margin: 0 0 24px;
  text-align: left;
  line-height: 1.6;
}

.final {
  display: block;
  width: 100%;
  position: relative;
  z-index: 5;
}

.final button {
  display: block;
}

.input {
  width: 100%;
  padding: 14px 16px;
  margin-bottom: 16px;
  font-size: 16px;
  border: 1px solid var(--gray-300);
  border-radius: 12px;
  transition: border-color 0.2s;
}

.input:focus {
  outline: none;
  border-color: var(--green);
  box-shadow: 0 0 0 3px rgba(14, 170, 16, 0.1);
}

/* Кнопка теперь стилизуется через inline стили */
.phone-group { display: grid; grid-template-columns: 64px 1fr; align-items: center; border: 1px solid var(--gray-300); border-radius: 12px; overflow: hidden; background: #fff; }
.phone-group:focus-within { border-color: var(--green); box-shadow: 0 0 0 3px rgba(14,170,16,0.2); }
.phone-prefix { display: flex; align-items: center; justify-content: center; height: 52px; background: #e9f2f9; color: #0b1f2a; font-weight: 700; }
.phone-input { height: 52px; border: 0; outline: none; padding: 0 16px; font-size: 16px; }
.submit-btn { width: 100%; padding: 16px 32px; background: var(--green); color: #fff; border: none; border-radius: 12px; font-size: 16px; font-weight: 600; cursor: pointer; margin-top: 16px; display: block; }

@media (max-width: 992px) {
  .card {
    flex-direction: column;
    align-items: center;
  }

  .card__image img {
    width: 100%;
    max-width: 420px;
  }

  .card__content {
    width: 100%;
  }
}
</style> 