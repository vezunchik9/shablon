<!-- components/PricesSection.vue -->
<template>
  <section id="prices" class="prices">
    <h2 class="prices__title">ЦЕНЫ НА НАШИ УСЛУГИ</h2>

    <div class="prices__grid">
      <article v-for="item in items" :key="item.slug" class="card">
        <img :src="item.img" :alt="item.title" class="card__img" />

        <h3 class="card__title" v-html="item.title" />

        <p class="card__time">Время ремонта {{ item.time }}</p>

        <del class="card__old">{{ item.old }} рублей</del>

        <p class="card__price">
          цена от <strong>{{ item.price }} рублей</strong>
        </p>

        <button type="button" class="card__btn" @click="openMore(item)">Узнать подробнее</button>
      </article>
    </div>

    <!-- Mobile slider -->
    <div class="prices__slider">
      <button class="slider-nav slider-nav--prev" aria-label="Предыдущий" @click="prev">‹</button>
      <div ref="sliderEl" class="prices-track" @scroll="onScroll">
        <article v-for="item in items" :key="item.slug" class="card card--slide">
          <img :src="item.img" :alt="item.title" class="card__img" />
          <h3 class="card__title" v-html="item.title" />
          <p class="card__time">Время ремонта {{ item.time }}</p>
          <del class="card__old">{{ item.old }} рублей</del>
          <p class="card__price">цена от <strong>{{ item.price }} рублей</strong></p>
          <button type="button" class="card__btn" @click="openMore(item)">Узнать подробнее</button>
        </article>
      </div>
      <button class="slider-nav slider-nav--next" aria-label="Следующий" @click="next">›</button>
      <div class="slider-dots">
        <button v-for="(_, i) in items" :key="i" class="dot" :class="{ active: i === index }" @click="go(i)" aria-label="Перейти к слайду" />
      </div>
    </div>
  </section>
</template>

<script setup>
const { open } = useLeadModal()
const sliderEl = ref(null)
const index = ref(0)

function go(i) {
  index.value = Math.max(0, Math.min(i, items.length - 1))
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

function openMore (item) {
  open({ title: 'Узнать подробнее', submitText: 'Узнать', source: `more-${item.slug}` })
}

const items = [
  {
    slug: 'ten',
    title: 'Замена<br>ТЭНа',
    time: '2-3 часа',
    old: '2 500',
    price: '590',
    img: '/images/prices/ten.jpg'
  },
  {
    slug: 'pump',
    title: 'Замена<br>сливного насоса',
    time: '20-40 минут',
    old: '3 200',
    price: '490',
    img: '/images/prices/slivnoy-nasos.jpg'
  },
  {
    slug: 'pcb',
    title: 'Замена<br>модуля управления',
    time: '1-2 часа',
    old: '3 400',
    price: '800',
    img: '/images/prices/modul-upravleniya.jpg'
  },
  {
    slug: 'install',
    title: 'Подключение<br>стиральной&nbsp;машины',
    time: '1-2 часа',
    old: '2 500',
    price: '600',
    img: '/images/prices/podklucheniyr-stiral-mashin.jpg'
  },
  {
    slug: 'gasket',
    title: 'Замена<br>манжеты',
    time: '30-40 минут',
    old: '1 400',
    price: '550',
    img: '/images/prices/zamena-manjeta.jpg'
  },
  {
    slug: 'bearing',
    title: 'Замена<br>подшипников',
    time: '1-2 дня',
    old: '3 200',
    price: '1 400',
    img: '/images/prices/zamena-podshibnika.jpg'
  },
  {
    slug: 'inlet-valve',
    title: 'Замена<br>заливного клапана',
    time: '2-3 часа',
    old: '2 400',
    price: '700',
    img: '/images/prices/zamena-slivnogo-klapana.jpg'
  },
  {
    slug: 'drum',
    title: 'Замена<br>бака',
    time: '6 часов',
    old: '3 200',
    price: '2 300',
    img: '/images/prices/zamena-baka.jpg'
  }
]
</script>

<style scoped>
:root {
  --green: #0eaa10;
  --gray-100: #f5f5f5;
  --gray-300: #dcdcdc;
  --gray-700: #404040;
  --radius: 8px;
}

.prices {
  padding: 80px 0 60px;
  text-align: center;
}

.prices__title {
  margin: 0 0 40px;
  font-size: 32px;
  font-weight: 800;
  text-transform: uppercase;
  color: var(--gray-700);
}

.prices__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 40px 32px;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 16px;
}
.prices__slider { display: none; position: relative; }
.prices-track { display: flex; overflow-x: auto; scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch; padding: 0 12px; }
.card--slide { flex: 0 0 90%; scroll-snap-align: start; margin-inline: 12px; }
.slider-nav { position: absolute; top: 50%; transform: translateY(-50%); width: 36px; height: 36px; border-radius: 50%; border: none; background: rgba(255,255,255,0.95); box-shadow: 0 2px 8px rgba(0,0,0,.2); z-index: 2; }
.slider-nav--prev { left: 6px; }
.slider-nav--next { right: 6px; }
.slider-dots { display: flex; justify-content: center; gap: 6px; margin-top: 8px; }
.dot { width: 6px; height: 6px; border-radius: 50%; background: #c9c9c9; border: none; }
.dot.active { background: var(--green); }

.card {
  border: 1px solid var(--gray-300);
  border-radius: var(--radius);
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  position: relative;
}

.card__img {
  height: 140px;
  object-fit: contain;
  margin-bottom: 24px;
}

.card__title {
  margin: 0 0 8px;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.25;
}

.card__time {
  margin: 0 0 8px;
  font-size: 14px;
  color: #666;
}

.card__old {
  margin: 0 0 8px;
  font-size: 16px;
  color: #b5b5b5;
}

.card__price {
  margin: 0 0 20px;
  font-size: 16px;
}

.card__btn {
  padding: 12px 32px;
  border-radius: var(--radius);
  background: var(--green) !important;
  color: #fff !important;
  font-weight: 600;
  font-size: 14px;
  text-decoration: none !important;
  transition: all 0.2s;
  display: block;
  width: 100%;
  text-align: center;
  border: none !important;
  cursor: pointer;
  margin-top: 16px;
  opacity: 1 !important;
  visibility: visible !important;
  filter: none !important;
  pointer-events: auto;
}

/* Всегда видима во всех состояниях */
.card__btn:link,
.card__btn:visited,
.card__btn:active,
.card__btn:focus {
  background: var(--green) !important;
  color: #fff !important;
  opacity: 1 !important;
  visibility: visible !important;
}

.card__btn:hover {
  background: #0d9a0f !important;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(14, 170, 16, 0.3);
}

@media (max-width: 600px) {
  .prices { padding: 56px 0 40px; }
  .prices__title { font-size: 28px; }
  .prices__grid { display: none; }
  .prices__slider { display: block; }
}
</style> 