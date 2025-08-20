<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__top">
        <div class="brand">
          <img src="/logo.png" alt="СТИРАЛ-СЕРВИС" class="brand__img" />
          <div class="brand__text">
            <div class="brand__name">СТИРАЛ-СЕРВИС</div>
            <div class="brand__desc">Ремонт стиральных машин с 2012 года</div>
          </div>
        </div>

        <nav class="menu">
          <a href="#prices">Цены</a>
          <a href="#faults">Поломки</a>
          <a href="#benefits">Льготы</a>
          <a href="#reviews">Отзывы</a>
          <a href="#contacts">Контакты</a>
        </nav>

        <div class="contacts">
          <a href="tel:+79226600172" class="contacts__phone">+7 (922) 660‑01‑72</a>
          <div class="contacts__time">Ежедневно 08:00–23:00</div>
        </div>
      </div>

      <div class="footer__bottom">
        <small>© {{ new Date().getFullYear() }} Стирал‑Сервис. Все права защищены.</small>
        <small>ИНН 0000000000 • ОГРНИП 000000000000000</small>
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
.footer { background: #0f172a; color: #cbd5e1; padding: 24px 0; }
.container { max-width: 1200px; margin: 0 auto; padding: 0 16px; }
.footer__top { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; align-items: center; }
.brand { display: flex; align-items: center; gap: 10px; }
.brand__img { width: 40px; height: 40px; }
.brand__name { font-weight: 800; color: #fff; }
.brand__desc { font-size: 12px; opacity: .8; }
.menu { display: flex; justify-content: center; gap: 16px; }
.menu a { color: #cbd5e1; text-decoration: none; }
.menu a:hover { color: #fff; }
.contacts { text-align: right; }
.contacts__phone { color: #22c55e; text-decoration: none; font-weight: 800; display: block; }
.contacts__time { font-size: 12px; opacity: .8; }
.footer__bottom { margin-top: 14px; display: flex; justify-content: space-between; font-size: 12px; opacity: .8; }

@media (max-width: 900px) {
  .footer__top { grid-template-columns: 1fr; text-align: center; }
  .contacts { text-align: center; }
  .footer__bottom { flex-direction: column; gap: 6px; align-items: center; }
}
</style>