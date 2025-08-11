<!-- components/WhyUsSection.vue -->
<template>
  <section id="why-us" class="why">
    <h2 class="why__title">ПОЧЕМУ СТОИТ ВЫЗВАТЬ МАСТЕРА У&nbsp;НАС</h2>

    <div class="why__inner">
      <!-- ВЕРХНИЙ ЛЕВЫЙ -->
      <div class="why__item why__item--top-left">
        <div class="why__icon">
          <img src="/icons/check.svg" alt="" />
        </div>
        <div class="why__text">
          <h3 class="why__heading">РЕМОНТ ЗА&nbsp;1&nbsp;ВИЗИТ</h3>
          <p class="why__desc">
            Ремонт обычно занимает не&nbsp;больше&nbsp;2-х&nbsp;часов
          </p>
        </div>
      </div>

      <!-- ВЕРХНИЙ ПРАВЫЙ -->
      <div class="why__item why__item--top-right">
        <div class="why__icon">
          <img src="/icons/home.svg" alt="" />
        </div>
        <div class="why__text">
          <h3 class="why__heading">РЕКОМЕНДАЦИИ КЛИЕНТОВ</h3>
          <p class="why__desc">
            85% клиентов обращаются к&nbsp;нам&nbsp;по&nbsp;рекомендациям
          </p>
        </div>
      </div>

      <!-- ЦЕНТРАЛЬНОЕ ИЗОБРАЖЕНИЕ -->
      <div class="why__center">
        <img
          src="/images/why/wash-machine.png"
          alt="Стиральная машина"
          class="why__machine"
        />
      </div>

      <!-- НИЖНИЙ ЛЕВЫЙ -->
      <div class="why__item why__item--bottom-left">
        <div class="why__icon">
          <img src="/icons/gear.svg" alt="" />
        </div>
        <div class="why__text">
          <h3 class="why__heading">ЗАПЧАСТИ В&nbsp;НАЛИЧИИ</h3>
          <p class="why__desc">
            На&nbsp;нашем складе запчасти&nbsp;50&nbsp;производителей
          </p>
        </div>
      </div>

      <!-- НИЖНИЙ ПРАВЫЙ -->
      <div class="why__item why__item--bottom-right">
        <div class="why__icon">
          <img src="/icons/user.svg" alt="" />
        </div>
        <div class="why__text">
          <h3 class="why__heading">10 МАСТЕРОВ В&nbsp;ШТАТЕ</h3>
          <p class="why__desc">
            Все наши сотрудники состоят в&nbsp;штате&nbsp;компании
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup></script>

<style scoped>
:root {
  --green: #0eaa10;
  --overlay: rgba(0, 0, 0, 0.6);
  --radius: 8px;
}

.why {
  position: relative;
  background: url('/images/why/bg.jpg') center / cover no-repeat;
  padding: 80px 0 60px;
  color: #fff;
}

.why::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
}

.why__title {
  position: relative;
  margin: 0 0 60px;
  font-size: 32px;
  font-weight: 900;
  text-transform: uppercase;
  text-align: center;
  z-index: 1;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.7);
}

.why__inner {
  position: relative;
  display: grid;
  grid-template-areas: 
    "top-left center top-right"
    "bottom-left center bottom-right";
  grid-template-columns: 1fr auto 1fr;
  grid-template-rows: auto auto;
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  z-index: 1;
  align-items: center;
}

.why__center {
  grid-area: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.why__machine {
  width: 300px;
  height: auto;
  max-width: 100%;
}

.why__item {
  display: flex;
  align-items: center;
  gap: 16px;
  max-width: 280px;
}

.why__item--top-left {
  grid-area: top-left;
  justify-self: end;
}

.why__item--top-right {
  grid-area: top-right;
  justify-self: start;
}

.why__item--bottom-left {
  grid-area: bottom-left;
  justify-self: end;
}

.why__item--bottom-right {
  grid-area: bottom-right;
  justify-self: start;
}

.why__icon {
  flex: 0 0 100px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: var(--green);
  display: flex;
  align-items: center;
  justify-content: center;
}

.why__icon img {
  width: 44px;
  height: 44px;
  filter: brightness(0) saturate(100%) invert(48%) sepia(79%) saturate(2476%) hue-rotate(86deg) brightness(118%) contrast(119%);
}

.why__text {
  flex: 1;
}

.why__heading {
  margin: 0 0 4px;
  font-size: 16px;
  font-weight: 800;
  line-height: 1.2;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

.why__desc {
  margin: 0;
  font-size: 13px;
  line-height: 1.3;
  font-weight: 500;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

@media (max-width: 992px) {
  .why__inner {
    grid-template-areas: 
      "center"
      "top-left"
      "top-right"
      "bottom-left"
      "bottom-right";
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto auto auto;
    gap: 30px;
  }

  .why__item {
    justify-self: center;
    max-width: 320px;
  }

  .why__machine {
    width: 250px;
  }

  .why__heading {
    font-size: 15px;
  }

  .why__desc {
    font-size: 12px;
  }
}

@media (max-width: 768px) {
  .why {
    padding: 60px 0 40px;
  }

  .why__title {
    font-size: 28px;
    margin-bottom: 40px;
  }

  .why__inner {
    gap: 25px;
  }

  .why__machine {
    width: 200px;
  }

  .why__item {
    max-width: 280px;
  }
}
</style> 