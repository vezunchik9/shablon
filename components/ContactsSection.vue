<template>
  <section id="contacts" class="contacts">
    <div class="container">
      <h2 class="contacts__title">КОНТАКТЫ СЕРВИСНОГО ЦЕНТРА</h2>

      <div class="info">
        <div class="info__item">
          <div class="info__label">Телефон</div>
          <a href="tel:+79226600172" class="link">+7 (922) 660-01-72</a>
        </div>
        <div class="info__item">
          <div class="info__label">Адрес</div>
          <div>г. Киров, ул. Ленина д.39/а</div>
        </div>
        <div class="info__item">
          <div class="info__label">Email</div>
          <a href="mailto:stiral_service_kirov43@mail.ru" class="link">stiral_service_kirov43@mail.ru</a>
        </div>
      </div>

      <div class="map">
        <iframe
          src="https://yandex.ru/map-widget/v1/?um=constructor%3A4e7b7f7ee9b8d1cbbf2e0b2aa89c0b8e1d5a5a57f0e55f0f8c9e2f3d0a4b9b5a&amp;source=constructor"
          width="100%"
          height="340"
          frameborder="0"
        ></iframe>
      </div>

      <div class="cta">
        <button class="btn" @click="openCallback">ПЕРЕЗВОНИТЕ МНЕ</button>
        <a href="https://t.me/" target="_blank" class="btn btn--ghost">Написать в Telegram</a>
      </div>
    </div>
  </section>
</template>

<script setup>
const { open } = useLeadModal()

function openCallback () {
  open({ title: 'Оставить заявку', submitText: 'Отправить', source: 'contacts-callback' })
}
</script>

<style scoped>
.contacts { padding: 56px 16px; background: #fff; text-align: center; }
.contacts__title { margin: 0 0 20px; font-size: 32px; font-weight: 900; text-transform: uppercase; text-align: center; width: 100%; }

.container { max-width: 1200px; margin: 0 auto; }

.info { display: flex; flex-wrap: wrap; justify-content: center; gap: 16px; margin: 0 auto 16px; }
.info__item { flex: 1 1 260px; max-width: 320px; border: 1px solid var(--gray-300); border-radius: 12px; padding: 16px; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 84px; text-align: center; }
.info__label { font-weight: 700; margin-bottom: 6px; }
.link { color: var(--green); text-decoration: none; font-weight: 700; }

.map { max-width: 1200px; margin: 0 auto 16px; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 24px rgba(0,0,0,.06); }

.cta { display: flex; gap: 12px; justify-content: center; align-items: center; }
.btn { display: inline-flex; align-items: center; justify-content: center; height: 48px; padding: 0 24px; border-radius: 10px; background: var(--green); color: #fff; text-decoration: none; font-weight: 800; }
.btn--ghost { background: transparent; color: var(--green); border: 2px solid var(--green); }

@media (max-width: 600px) {
  .contacts__title { font-size: 28px; }
  .btn { width: 100%; }
  .cta { flex-direction: column; }
}
</style>