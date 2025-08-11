<template>
  <section class="process">
    <div class="process__overlay">
      <h2 class="process__title">НАШ СКЛАД И ПРОЦЕСС РЕМОНТА СТИРАЛЬНЫХ МАШИН</h2>
      <p class="process__subtitle">
        Мы специализируемся на выездном ремонте, 98% ремонтов выполняем на месте.
        Оборудование и запчасти всегда с собой — это гарантия быстрого ремонта на дому
      </p>

      <div class="process__grid">
        <img v-for="(src, i) in images" :key="i" :src="src" alt="Наш склад и процесс ремонта" class="process__img" loading="lazy" />
      </div>
    </div>
  </section>
</template>

<script setup>
const images = [
  '/images/process/nash-sklad.jpg',
  '/images/process/nash-sklad2.jpg',
  '/images/process/nash-sklad3.jpg',
  '/images/process/nash-sklad4.jpg',
  '/images/process/proces-remonta.jpg',
  '/images/process/proces-remonta2.jpg',
  '/images/process/proces-remonta3.jpg',
  '/images/process/process-remonta4.jpg'
]
</script>

<style scoped>
.process {
  position: relative;
  background: url('/images/why/bg.jpg') center / cover no-repeat;
  color: #fff;
}

.process::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
}

.process__overlay {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 16px 56px;
  text-align: center;
}

.process__title {
  margin: 0 0 12px;
  font-size: 32px;
  font-weight: 900;
  text-transform: uppercase;
}

.process__subtitle {
  margin: 0 0 24px;
  font-size: 18px;
  opacity: 0.95;
}

.process__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.process__img {
  width: 100%;
  height: 160px;
  object-fit: cover;
  background: rgba(255,255,255,0.06);
  border-radius: 10px;
}

@media (max-width: 1024px) {
  .process__grid { grid-template-columns: repeat(3, 1fr); }
}

@media (max-width: 768px) {
  .process__title { font-size: 26px; }
  .process__subtitle { font-size: 16px; }
  .process__grid { grid-template-columns: repeat(2, 1fr); }
  .process__img { height: 140px; }
}
</style>