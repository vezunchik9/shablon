<template>
  <section id="faq" class="faq">
    <h2 class="faq__title">ЧАСТЫЕ ВОПРОСЫ</h2>

    <div class="faq__list">
      <div v-for="(q, idx) in faqs" :key="q.q" class="faq__item">
        <button class="faq__question" @click="toggle(idx)">
          <span>{{ q.q }}</span>
          <span class="faq__icon" :class="{ open: openIndex === idx }">⌄</span>
        </button>
        <div class="faq__answer" v-show="openIndex === idx">
          {{ q.a }}
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const faqs = [
  { q: 'Сколько стоит выезд и диагностика?', a: 'Выезд по Кирову и диагностика бесплатны при ремонте у нас. Без ремонта — 400 рублей.' },
  { q: 'Сколько длится ремонт?', a: 'В 98% случаев ремонт выполняется за один выезд в течение 1–2 часов.' },
  { q: 'Есть ли гарантия?', a: 'Да, предоставляем гарантию до 3 лет в зависимости от узла и запчастей.' },
  { q: 'Какие способы оплаты?', a: 'Наличные или перевод на карту после выполнения работ.' }
]

const openIndex = ref(-1)
function toggle(i) {
  openIndex.value = openIndex.value === i ? -1 : i
}
</script>

<style scoped>
.faq { padding: 60px 16px; background: #fff; }
.faq__title { text-align: center; margin: 0 0 24px; font-size: 28px; font-weight: 900; text-transform: uppercase; }
.faq__list { max-width: 900px; margin: 0 auto; display: grid; gap: 12px; }
.faq__item { border: 1px solid var(--gray-300); border-radius: 12px; background: #fff; overflow: hidden; }
.faq__question { width: 100%; display: flex; justify-content: space-between; align-items: center; padding: 14px 16px; background: #f9f9f9; border: 0; cursor: pointer; font-weight: 700; }
.faq__icon { transition: transform 0.2s ease; }
.faq__icon.open { transform: rotate(180deg); }
.faq__answer { padding: 14px 16px; color: #444; line-height: 1.55; }
</style>