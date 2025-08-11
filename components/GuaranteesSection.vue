<template>
  <section id="guarantees" class="guarantees">
    <div class="guarantees__overlay">
      <h2 class="guarantees__title">НАШИ ГАРАНТИИ</h2>
      <p class="guarantees__subtitle">
        Гарантии на ремонт и используемые комплектующие прописаны в договоре. Если в течение гарантийного
        срока стиральная машина даст сбой, мастер повторно проведёт диагностику и ремонт бесплатно.
      </p>

      <div class="guarantees__grid">
        <ul class="guarantees__list">
          <li v-for="g in items" :key="g" class="guarantees__item">
            <img src="/icons/check.svg" alt="✔" class="guarantees__icon" />
            <span>{{ g }}</span>
          </li>
        </ul>

        <div class="guarantees__docs">
          <img class="doc" src="/images/garantii/garantii.jpg" alt="Договор" loading="lazy" />
          <img class="doc" src="/images/garantii/garantii.jpg" alt="Гарантийный талон" loading="lazy" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const items = [
  'Гарантия на замену ТЭНа — до 1 года',
  'Гарантия на замену клапана — до 1 года',
  'Гарантия на модуль управления — до 2 лет',
  'Гарантия на работы и запчасти — до 3 лет'
]
</script>

<style scoped>
.guarantees { position: relative; background: url('/images/why/bg.jpg') center/cover no-repeat; color: #fff; }
.guarantees::before { content: ''; position: absolute; inset: 0; background: rgba(0,0,0,0.8); }
.guarantees__overlay { position: relative; max-width: 1200px; margin: 0 auto; padding: 56px 16px 60px; }

.guarantees__title { margin: 0 0 12px; text-align: center; font-size: 32px; font-weight: 900; text-transform: uppercase; }
.guarantees__subtitle { margin: 0 auto 24px; max-width: 1060px; text-align: center; font-size: 18px; opacity: 0.98; }

.guarantees__grid { display: grid; grid-template-columns: 1.4fr 1fr; gap: 24px; align-items: center; }
.guarantees__list { list-style: none; margin: 0; padding: 0; display: grid; gap: 16px; }
.guarantees__item { display: flex; align-items: center; gap: 12px; background: rgba(255,255,255,0.06); padding: 14px 16px; border-radius: 12px; font-size: 18px; }
.guarantees__icon { width: 22px; height: 22px; filter: invert(61%) sepia(72%) saturate(673%) hue-rotate(73deg) brightness(95%) contrast(93%); }

.guarantees__docs { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; align-items: center; justify-items: center; }
.doc { width: 100%; max-width: 300px; height: 220px; object-fit: contain; background: rgba(255,255,255,0.1); border-radius: 12px; padding: 12px; }

@media (max-width: 1024px) {
  .guarantees__grid { grid-template-columns: 1fr; }
  .guarantees__docs { grid-template-columns: 1fr 1fr; }
}

@media (max-width: 600px) {
  .guarantees__title { font-size: 28px; }
  .guarantees__item { font-size: 16px; }
  .guarantees__docs { grid-template-columns: 1fr; }
}
</style>