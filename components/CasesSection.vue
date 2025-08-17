<template>
  <section id="cases" class="cases">
    <h2 class="cases__title">ПРИМЕРЫ НАШИХ ЧАСТЫХ РЕМОНТОВ</h2>

    <div class="cases__slider">
      <button class="nav nav--prev" @click="prev" aria-label="Предыдущий">‹</button>

      <div class="slide">
        <img :src="currentCase.img" :alt="currentCase.title" class="slide__img" />
        <div class="slide__content">
          <h3 class="slide__title">{{ currentCase.title }}</h3>

          <ul class="slide__list">
            <li>
              <strong>Причина обращения:</strong>
              <div class="muted">{{ currentCase.reason }}</div>
            </li>
            <li>
              <strong>Описание работ и сроки:</strong>
              <div class="muted">{{ currentCase.work }}</div>
            </li>
            <li>
              <strong>Стоимость:</strong>
              <div class="muted">{{ currentCase.price }}</div>
            </li>
            <li>
              <strong>Гарантия:</strong>
              <div class="muted">{{ currentCase.warranty }}</div>
            </li>
          </ul>
        </div>
      </div>

      <button class="nav nav--next" @click="next" aria-label="Следующий">›</button>
    </div>

    <div class="dots">
      <button
        v-for="(c, i) in cases"
        :key="c.title"
        class="dot"
        :class="{ active: i === index }"
        @click="go(i)"
        aria-label="Перейти к слайду"
      />
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'

const cases = [
  {
    title: 'Ремонт стиральной машины ATLANT',
    reason: 'Не греет воду',
    work: 'Замена ТЭНа. Срок 40 минут',
    price: '2 400 рублей',
    warranty: '3 года',
    img: '/images/primer/remont-atlant.jpg'
  },
  {
    title: 'Ремонт стиральной машины Samsung',
    reason: 'Не сливает воду',
    work: 'Чистка тракта слива, замена помпы. Срок 1 час',
    price: '2 900 рублей',
    warranty: '3 года',
    img: '/images/primer/remont-samsung.jpg'
  },
  {
    title: 'Ремонт стиральной машины LG',
    reason: 'Не открывается дверца',
    work: 'Замена УБЛ (замок люка). Срок 40 минут',
    price: '2 100 рублей',
    warranty: '2 года',
    img: '/images/primer/remont-lg.jpg'
  }
]

const index = ref(0)
const currentCase = computed(() => cases[index.value])

function prev() {
  index.value = (index.value - 1 + cases.length) % cases.length
}
function next() {
  index.value = (index.value + 1) % cases.length
}
function go(i) {
  index.value = i
}
</script>

<style scoped>
.cases { padding: 48px 16px; background: #fff; }
.cases__title { text-align: center; margin: 0 0 16px; font-size: 32px; font-weight: 900; text-transform: uppercase; }

.cases__slider { position: relative; max-width: 1200px; margin: 0 auto; background: #fff; border: 1px solid var(--gray-300); border-radius: 16px; overflow: hidden; }

.slide { display: grid; grid-template-columns: 1.1fr 1fr; gap: 24px; align-items: stretch; padding: 16px; }
.slide__img { width: 100%; height: 420px; object-fit: contain; background: #fafafa; border-radius: 12px; }
.slide__content { padding: 12px 8px; }
.slide__title { margin: 8px 0 12px; font-size: 24px; font-weight: 800; }

.slide__list { list-style: none; padding: 0; margin: 0; display: grid; gap: 16px; }
.slide__list li strong { display: block; font-size: 16px; }
.muted { color: #444; font-size: 16px; }

.nav { position: absolute; top: 50%; transform: translateY(-50%); width: 40px; height: 40px; border-radius: 999px; border: none; background: #fff; box-shadow: 0 2px 10px rgba(0,0,0,0.2); cursor: pointer; font-size: 28px; line-height: 40px; text-align: center; }
.nav--prev { left: 12px; }
.nav--next { right: 12px; }

.dots { display: flex; justify-content: center; gap: 8px; margin-top: 12px; }
.dot { width: 10px; height: 10px; border-radius: 50%; background: #c9c9c9; border: none; cursor: pointer; }
.dot.active { background: var(--green); }

@media (max-width: 992px) {
  .slide { grid-template-columns: 1fr; }
  .slide__img { height: 300px; }
}

@media (max-width: 600px) {
  .cases { padding: 40px 12px; }
  .cases__title { font-size: 24px; }
  .slide__img { height: 220px; }
}
</style>