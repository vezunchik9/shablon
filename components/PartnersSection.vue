<template>
  <section id="partners" class="partners">
    <h2 class="partners__title">МЫ ПАРТНЁРЫ ВЕДУЩИХ КОМПАНИЙ</h2>
    <p class="partners__subtitle">
      Эти сертификаты подтверждают, что мы являемся официальным партнёром и сервисным центром ряда производителей.
      Используем оригинальные запчасти и регламенты ремонта.
    </p>

    <div class="partners__grid">
      <div class="partners__certs">
        <div class="cert">
          <img src="/images/partner/partner-samsung.jpg" alt="Сертификат Samsung" loading="lazy" />
          <strong>Samsung</strong>
          <span>Сертификат партнёра</span>
        </div>
        <div class="cert">
          <img src="/images/partner/partner-atlant.jpg" alt="Сертификат ATLANT" loading="lazy" />
          <strong>ATLANT</strong>
          <span>Авторизованный сервис</span>
        </div>
        <div class="cert">
          <img src="/images/partner/partner-lg.jpg" alt="Сертификат LG" loading="lazy" />
          <strong>LG</strong>
          <span>Сервисный партнёр</span>
        </div>
      </div>

      <div class="partners__text">
        <p>
          Наши специалисты имеют право обслуживать технику известных брендов. Мы используем официальные
          комплектующие и диагностическое ПО производителей, что позволяет выполнять ремонт быстро и надёжно.
        </p>
        <p>
          Сертификаты — это подтверждение нашей квалификации и высокой компетентности в области обслуживания
          продукции данных компаний, а также гарантия для клиентов на качественный результат.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.partners { padding: 56px 16px; background: #fff; color: #222; }
.partners__title { text-align: center; margin: 0 0 10px; font-size: 32px; font-weight: 900; text-transform: uppercase; }
.partners__subtitle { text-align: center; margin: 0 auto 24px; max-width: 980px; font-size: 18px; opacity: 0.9; }

.partners__grid { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 28px; align-items: start; }

.partners__certs { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.cert { background: #fff; border: 1px solid var(--gray-300); border-radius: 12px; padding: 14px; text-align: center; box-shadow: 0 4px 12px rgba(0,0,0,0.06); }
.cert img { width: 120px; height: auto; margin-bottom: 8px; border-radius: 6px; }
.cert strong { display: block; font-size: 14px; }
.cert span { display: block; font-size: 12px; color: #666; }

.partners__text { font-size: 16px; line-height: 1.6; color: #444; }
.partners__text p { margin: 0 0 12px; }

@media (max-width: 992px) {
  .partners__grid { grid-template-columns: 1fr; }
  .partners__certs { grid-template-columns: repeat(3, 1fr); }
}

@media (max-width: 640px) {
  .partners__certs { grid-template-columns: 1fr 1fr; }
}
</style>