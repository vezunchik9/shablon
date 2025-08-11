<template>
  <section id="about" class="about">
    <div class="overlay">
      <div class="about__grid">
        <div class="about__photos">
          <img class="photo" src="/images/onas/direktor.jpg" alt="Генеральный директор" />
          <img class="photo" src="/images/onas/gramoty.jpg" alt="Грамоты и сертификаты" />
          <img class="photo" src="/images/onas/sklad.jpg" alt="Склад запчастей" />
          <img class="photo" src="/images/onas/rabotnik.jpg" alt="Наш мастер" />
        </div>

        <div class="about__content">
          <div class="about__tag">основан в 2012 году</div>
          <h2 class="about__title">О СЕРВИСЕ</h2>
          <div class="divider" />
          <p>
            Сервисный центр «Стирал‑Сервис» — команда опытных специалистов, которые прошли обучение и сдали все
            внутренние экзамены. Единственное направление деятельности сервиса — ремонт стиральных машин. Мы узконаправленные
            специалисты в своём деле.
          </p>
          <p class="about__ceo">Генеральный директор: <strong>Зотов С.А.</strong></p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.about { position: relative; background: url('/images/why/bg.jpg') center/cover no-repeat; color: #fff; }
.about::before { content: ''; position: absolute; inset: 0; background: rgba(0,0,0,0.72); }
.overlay { position: relative; max-width: 1200px; margin: 0 auto; padding: 56px 16px; }

.about__grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 24px; align-items: center; }

.about__photos { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.photo { width: 100%; height: 160px; object-fit: cover; border-radius: 12px; background: rgba(255,255,255,0.06); }

.about__tag { text-transform: uppercase; letter-spacing: .08em; opacity: .9; margin-bottom: 6px; font-weight: 700; }
.about__title { margin: 0 0 10px; font-size: 36px; font-weight: 900; }
.divider { width: 120px; height: 4px; background: #fff; border-radius: 2px; margin: 10px 0 16px; opacity: .9; }
.about__content p { margin: 0 0 12px; font-size: 18px; line-height: 1.6; opacity: .98; }
.about__ceo { margin-top: 18px; font-weight: 600; }

@media (max-width: 992px) {
  .about__grid { grid-template-columns: 1fr; }
  .photo { height: 140px; }
  .about__title { font-size: 28px; }
}
</style>