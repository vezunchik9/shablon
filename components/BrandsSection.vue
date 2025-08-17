<template>
  <section class="brands">
    <h2 class="brands__title">МЫ РЕМОНТИРУЕМ ВСЕ МОДЕЛИ СТИРАЛЬНЫХ МАШИН</h2>

    <!-- Desktop/tablet grid -->
    <div class="brands__grid">
      <article v-for="b in brands" :key="b.name" class="brand-card">
        <img :src="b.img" :alt="b.name" class="brand-card__img" />
        <div class="brand-card__name">{{ b.name }}</div>
      </article>
    </div>

    <!-- Mobile slider: slide = grid 2 x 3 (6 брендов) -->
    <div class="brands__slider">
      <button class="slider-nav slider-nav--prev" aria-label="Предыдущий" @click="prev">‹</button>
      <div ref="sliderEl" class="brands-track" @scroll="onScroll">
        <div
          v-for="(page, i) in chunkedBrands"
          :key="i"
          class="brands-slide"
        >
          <article v-for="b in page" :key="b.name" class="brand-card">
            <img :src="b.img" :alt="b.name" class="brand-card__img" />
            <div class="brand-card__name">{{ b.name }}</div>
          </article>
        </div>
      </div>
      <button class="slider-nav slider-nav--next" aria-label="Следующий" @click="next">›</button>

      <div class="slider-dots">
        <button v-for="(p, i) in pagesCount" :key="i" class="dot" :class="{ active: i === index }" @click="go(i)" aria-label="Перейти к слайду" />
      </div>
    </div>

    <p class="brands__note">И другие модели, которых нет в списке</p>
  </section>
</template>

<script setup>
const brands = [
  { name: 'ATLANT', img: '/images/brands/atlant.jpg' },
  { name: 'INDESIT', img: '/images/brands/indesit.jpg' },
  { name: 'SAMSUNG', img: '/images/brands/samsung.jpg' },
  { name: 'LG', img: '/images/brands/lg.jpg' },
  { name: 'BOSCH', img: '/images/brands/bosch.jpg' },
  { name: 'BEKO', img: '/images/brands/beko.jpg' },
  { name: 'CANDY', img: '/images/brands/candy.jpg' },
  { name: 'ELECTROLUX', img: '/images/brands/electrolux.jpg' },
  { name: 'HAIER', img: '/images/brands/haier.jpg' },
  { name: 'HANSA', img: '/images/brands/hansa.jpg' },
  { name: 'CENTEK', img: '/images/brands/centek.jpg' },
  { name: 'ASKO', img: '/images/brands/asko.jpg' },
  { name: 'ARTEL', img: '/images/brands/artel.jpg' },
  { name: 'DAEWOO', img: '/images/brands/deawoo.jpg' },
  { name: 'HOTPOINT-ARISTON', img: '/images/brands/hotpoint-ariston.jpg' },
  { name: 'HYUNDAI', img: '/images/brands/hyundai.jpg' }
]

function chunk(array, size) {
  const res = []
  for (let i = 0; i < array.length; i += size) res.push(array.slice(i, i + size))
  return res
}
const chunkedBrands = chunk(brands, 6)
const sliderEl = ref(null)
const index = ref(0)
const pagesCount = computed(() => chunkedBrands.length)

function go(i) {
  index.value = Math.max(0, Math.min(i, pagesCount.value - 1))
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
:root {
  --gray-100: #f5f5f5;
  --gray-300: #dcdcdc;
  --gray-700: #404040;
  --radius: 12px;
}

.brands {
  padding: 40px 0 20px;
  background: #fff;
  text-align: center;
}

.brands__title {
  margin: 0 0 20px;
  font-size: 24px;
  font-weight: 800;
  text-transform: uppercase;
  color: var(--gray-700);
}

.brands__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
  max-width: 1220px;
  margin: 0 auto;
  padding: 0 16px;
}

/* Mobile slider */
.brands__slider { display: none; position: relative; }
.brands-track { display: flex; overflow-x: auto; scroll-snap-type: x mandatory; gap: 12px; -webkit-overflow-scrolling: touch; }
.brands-slide { flex: 0 0 100%; scroll-snap-align: start; display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; padding: 0 12px; }
.slider-nav { position: absolute; top: 50%; transform: translateY(-50%); width: 36px; height: 36px; border-radius: 50%; border: none; background: rgba(255,255,255,0.95); box-shadow: 0 2px 8px rgba(0,0,0,.2); z-index: 2; }
.slider-nav--prev { left: 6px; }
.slider-nav--next { right: 6px; }
.slider-dots { display: flex; justify-content: center; gap: 6px; margin-top: 8px; }
.dot { width: 6px; height: 6px; border-radius: 50%; background: #c9c9c9; border: none; }
.dot.active { background: var(--green); }

.brand-card {
  background: #ffffff;
  border: 1px solid var(--gray-300);
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.brand-card__img {
  height: 120px;
  object-fit: contain;
  margin-bottom: 12px;
}

.brand-card__name {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.6px;
  color: var(--gray-700);
}

.brands__note {
  margin: 12px 0 0;
  font-size: 12px;
  color: #777;
}

@media (max-width: 768px) {
  .brands__title { font-size: 20px; }
  .brand-card__img { height: 100px; }
}

@media (max-width: 600px) {
  .brands { padding: 32px 12px 16px; }
  /* скрываем десктопную сетку, включаем слайдер */
  .brands__grid { display: none; }
  .brands__slider { display: block; }
  .brands-track { padding: 0 16px; }
  .brand-card__img { height: 84px; }
}
</style>