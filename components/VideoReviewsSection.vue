<template>
  <section id="video-reviews" class="reviews">
    <h2 class="reviews__title">ОТЗЫВЫ НАШИХ КЛИЕНТОВ</h2>

    <!-- Desktop grid -->
    <div class="grid">
      <article v-for="r in reviews" :key="r.title" class="card">
        <div class="card__media">
          <iframe
            :src="`https://www.youtube.com/embed/${r.youtubeId}`"
            title="Видео отзыв"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          />
        </div>

        <div class="card__body">
          <p><strong>Производитель:</strong> {{ r.brand }}</p>
          <p><strong>Что сделали:</strong> {{ r.work }}</p>
          <p><strong>Срок выполнения:</strong> {{ r.time }}</p>
          <p><strong>Стоимость:</strong> {{ r.price }}</p>

          <button class="btn" @click="openConsult">ПОЛУЧИТЬ КОНСУЛЬТАЦИЮ</button>
        </div>
      </article>
    </div>

    <!-- Mobile slider -->
    <div class="reviews__slider">
      <button class="slider-nav slider-nav--prev" aria-label="Предыдущий" @click="prev">‹</button>
      <div ref="sliderEl" class="reviews-track" @scroll="onScroll">
        <article v-for="r in reviews" :key="r.title" class="card card--slide">
          <div class="card__media">
            <iframe
              :src="`https://www.youtube.com/embed/${r.youtubeId}`"
              title="Видео отзыв"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            />
          </div>
          <div class="card__body">
            <p><strong>Производитель:</strong> {{ r.brand }}</p>
            <p><strong>Что сделали:</strong> {{ r.work }}</p>
            <p><strong>Срок выполнения:</strong> {{ r.time }}</p>
            <p><strong>Стоимость:</strong> {{ r.price }}</p>
            <button class="btn" @click="openConsult">ПОЛУЧИТЬ КОНСУЛЬТАЦИЮ</button>
          </div>
        </article>
      </div>
      <button class="slider-nav slider-nav--next" aria-label="Следующий" @click="next">›</button>
      <div class="slider-dots">
        <button v-for="(_, i) in reviews" :key="i" class="dot" :class="{ active: i === index }" @click="go(i)" aria-label="Перейти к слайду" />
      </div>
    </div>
  </section>
</template>

<script setup>
const { open } = useLeadModal()

function openConsult () {
  open({ title: 'Получить консультацию', submitText: 'Отправить', source: 'consultation' })
}

const reviews = [
  {
    youtubeId: 'dQw4w9WgXcQ',
    brand: 'Samsung',
    work: 'Замена сливного насоса',
    time: '2 часа',
    price: '1 200 рублей',
    title: 'Отзыв 1'
  },
  {
    youtubeId: 'oHg5SJYRHA0',
    brand: 'Bosch',
    work: 'Ремонт дверцы',
    time: '30 минут',
    price: '900 рублей',
    title: 'Отзыв 2'
  },
  {
    youtubeId: '6_b7RDuLwcI',
    brand: 'Candy',
    work: 'Замена платы управления',
    time: '3 часа',
    price: '2 400 рублей',
    title: 'Отзыв 3'
  }
]

const sliderEl = ref(null)
const index = ref(0)
function go(i) {
  index.value = Math.max(0, Math.min(i, reviews.length - 1))
  const el = sliderEl.value
  if (!el) return
  el.scrollTo({ left: el.clientWidth * index.value, behavior: 'smooth' })
}
function prev() { go(index.value - 1) }
function next() { go(index.value + 1) }
function onScroll(e) {
  const el = e.target
  index.value = Math.round(el.scrollLeft / el.clientWidth)
}
</script>

<style scoped>
.reviews { padding: 56px 16px; background: #fff; }
.reviews__title { text-align: center; margin: 0 0 20px; font-size: 32px; font-weight: 900; text-transform: uppercase; }

.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; max-width: 1200px; margin: 0 auto; }
.card { background: #fff; border: 1px solid var(--gray-300); border-radius: 14px; box-shadow: 0 4px 16px rgba(0,0,0,0.06); overflow: hidden; display: flex; flex-direction: column; }
.card__media iframe { width: 100%; height: 220px; display: block; }
.card__body { padding: 16px; display: grid; gap: 6px; }
.btn { margin-top: 10px; display: inline-block; padding: 12px 18px; border-radius: 10px; background: var(--green); color: #fff; text-decoration: none; font-weight: 700; text-align: center; }

/* mobile slider */
.reviews__slider { display: none; position: relative; }
.reviews-track { display: flex; overflow-x: auto; scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch; gap: 12px; padding: 0 16px; }
.card--slide { flex: 0 0 92%; scroll-snap-align: start; }
.slider-nav { position: absolute; top: 50%; transform: translateY(-50%); width: 36px; height: 36px; border-radius: 50%; border: none; background: rgba(255,255,255,0.95); box-shadow: 0 2px 8px rgba(0,0,0,.2); z-index: 2; }
.slider-nav--prev { left: 6px; }
.slider-nav--next { right: 6px; }
.slider-dots { display: flex; justify-content: center; gap: 6px; margin-top: 8px; }
.dot { width: 6px; height: 6px; border-radius: 50%; background: #c9c9c9; border: none; }
.dot.active { background: var(--green); }

@media (max-width: 992px) { .grid { grid-template-columns: 1fr 1fr; } }
@media (max-width: 600px) { 
  .reviews { padding: 40px 12px; }
  .reviews__title { font-size: 24px; }
  .grid { display: none; }
  .reviews__slider { display: block; }
  .card__media iframe { height: 200px; }
  .btn { width: 100%; }
}
</style>