<template>
  <section class="brands">
    <h2 class="brands__title">МЫ РЕМОНТИРУЕМ ВСЕ МОДЕЛИ СТИРАЛЬНЫХ МАШИН</h2>

    <div class="brands__grid">
      <article v-for="b in brands" :key="b.name" class="brand-card">
        <img :src="b.img" :alt="b.name" class="brand-card__img" />
        <div class="brand-card__name">{{ b.name }}</div>
      </article>
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
</style>