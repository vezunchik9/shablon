<template>
  <section id="reviews" class="reviews">
    <h2 class="reviews__title">ОТЗЫВЫ КЛИЕНТОВ</h2>
    <div class="reviews__grid">
      <article v-for="r in reviews" :key="r.name" class="review">
        <div class="review__top">
          <strong>{{ r.name }}</strong>
          <span class="review__stars">★★★★★</span>
        </div>
        <p class="review__text">{{ r.text }}</p>
      </article>
    </div>
  </section>
</template>

<script setup>
const reviews = [
  { name: 'Марина', text: 'Быстро приехали, поменяли насос. Цена как по телефону. Рекомендую!' },
  { name: 'Алексей', text: 'Не отжимала. Мастер нашёл проблему за 10 минут, починили в тот же день.' },
  { name: 'Ирина', text: 'Вежливые ребята, дали гарантию, всё работает идеально.' }
]
</script>

<style scoped>
.reviews { padding: 60px 16px; background: #fff; }
.reviews__title { text-align: center; margin: 0 0 24px; font-size: 28px; font-weight: 900; text-transform: uppercase; }
.reviews__grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; max-width: 1100px; margin: 0 auto; }
.review { border: 1px solid var(--gray-300); border-radius: 14px; padding: 18px; background: #fff; }
.review__top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
.review__stars { color: #f6c000; letter-spacing: 2px; font-size: 16px; }
.review__text { margin: 0; color: #444; line-height: 1.5; }
</style>