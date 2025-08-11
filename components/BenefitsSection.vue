<template>
  <section id="benefits" class="benefits">
    <h2 class="benefits__title">НАШИ СОЦИАЛЬНЫЕ ЛЬГОТЫ</h2>
    <p class="benefits__subtitle">
      Ремонтировать за бесплатно мы не можем, этой работой наши мастера зарабатывают себе на хлеб.
      Поэтому можем предоставить небольшие скидки для категорий граждан
    </p>

    <div class="benefits__grid">
      <article v-for="b in list" :key="b.title" class="benefit">
        <img :src="b.img" :alt="b.title" class="benefit__img" loading="lazy" />
        <h3 class="benefit__headline" v-html="b.headline" />
        <p class="benefit__desc">{{ b.desc }}</p>
        <button class="benefit__btn" @click="openDiscount">ПОЛУЧИТЬ СКИДКУ</button>
      </article>
    </div>
  </section>
</template>

<script setup>
const { open } = useLeadModal()

function openDiscount () {
  open({ title: 'Оставить заявку', submitText: 'Отправить', source: 'discount-benefit' })
}

const list = [
  {
    img: '/images/skidki-lgoty/skidka-pensioneram.jpg',
    headline: 'СКИДКА <strong>10%</strong> - пенсионерам',
    desc: 'Мы понимаем какие пенсии у пенсионеров, поэтому предоставляем скидку на ремонт'
  },
  {
    img: '/images/skidki-lgoty/skidka-mnogodetnim.jpg',
    headline: 'СКИДКА <strong>15%</strong> - многодетным',
    desc: 'Мы понимаем как сложно поднимать детей в наше время, поэтому даём вам скидку 15%'
  },
  {
    img: '/images/skidki-lgoty/skidka-svo.jpg',
    headline: 'СКИДКА <strong>25%</strong> - семьям СВО',
    desc: 'Предоставляем скидку 25% на ремонт семьям участников СВО г. Киров'
  }
]
</script>

<style scoped>
.benefits { padding: 60px 16px; background: #fff; text-align: center; }
.benefits__title { margin: 0 0 16px; font-size: 28px; font-weight: 900; text-transform: uppercase; }
.benefits__subtitle { max-width: 980px; margin: 0 auto 20px; color: #444; }

.benefits__grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 340px)); gap: 24px; max-width: 1200px; margin: 0 auto; align-items: stretch; justify-content: center; }
.benefit { border: 1px solid var(--gray-300); border-radius: 14px; padding: 18px; background: #fff; text-align: center; display: flex; flex-direction: column; align-items: center; height: 100%; }
.benefit__img { width: 100%; height: 240px; object-fit: cover; border-radius: 12px; margin-bottom: 12px; }
.benefit__headline { margin: 6px 0 8px; font-size: 18px; font-weight: 900; letter-spacing: .2px; }
.benefit__headline strong { font-weight: 900; }
.benefit__desc { margin: 0 0 14px; font-size: 14px; color: #555; max-width: 90%; }
.benefit__btn { display: inline-block; padding: 12px 20px; border-radius: 10px; background: var(--green); color: #fff; text-decoration: none; font-weight: 800; margin-top: auto; }

@media (max-width: 600px) {
  .benefit__img { height: 200px; }
}
</style>