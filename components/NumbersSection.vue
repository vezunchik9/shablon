<template>
  <section class="numbers">
    <h2 class="numbers__title">СТИРАЛ-СЕРВИС В ЦИФРАХ</h2>

    <div class="numbers__grid">
      <div class="metric">
        <div class="metric__value">12</div>
        <div class="metric__label">ЛЕТ</div>
        <p class="metric__desc">Ремонтируем стиральные машины в Кирове</p>
      </div>

      <div class="metric">
        <div class="metric__value">5000+</div>
        <div class="metric__label">СТИРАЛЬНЫХ МАШИН</div>
        <p class="metric__desc">Отремонтировали и дали им вторую жизнь</p>
      </div>

      <div class="metric">
        <div class="metric__value">120+</div>
        <div class="metric__label">СОЦИАЛЬНЫХ ПРОЕКТОВ</div>
        <p class="metric__desc">Выполнили за период нашей работы в Кирове</p>
      </div>

      <div class="metric">
        <div class="metric__value">85%</div>
        <div class="metric__label">КЛИЕНТОВ</div>
        <p class="metric__desc">Приходят к нам по рекомендациям</p>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.numbers { padding: 56px 16px; background: #fff; color: #111; text-align: center; }
.numbers__title { margin: 0 0 24px; font-size: 32px; font-weight: 900; text-transform: uppercase; }

.numbers__grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; max-width: 1200px; margin: 0 auto; }
.metric { padding: 8px 12px; }
.metric__value { font-size: 72px; font-weight: 900; letter-spacing: 1px; }
.metric__label { margin-top: 6px; font-weight: 800; color: #2b2b2b; }
.metric__desc { margin: 8px 0 0; color: #555; }

@media (max-width: 992px) {
  .numbers__grid { grid-template-columns: repeat(2, 1fr); }
  .metric__value { font-size: 56px; }
}

@media (max-width: 600px) {
  .numbers__grid { grid-template-columns: 1fr; }
  .metric__value { font-size: 48px; }
}
</style>