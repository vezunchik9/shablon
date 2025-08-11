<!-- components/FactsBar.vue -->
<template>
  <section class="facts">
    <div class="container facts__grid">
      <div v-for="f in facts" :key="f.text" class="fact">
        <img :src="f.icon" alt="" class="fact__icon" />
        <p class="fact__text">{{ f.text }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
const facts = [
  { icon: '/icons/calendar.svg', text: 'Ремонтируем 7 дней в неделю без выходных' },
  { icon: '/icons/worker.svg', text: 'Мастера граждане РФ с опытом более 5 лет' },
  { icon: '/icons/wallet.svg', text: 'Оплата наличкой или переводом на карту' },
  { icon: '/icons/stats.svg', text: 'Произвели более 5 000 ремонтов' }
]
</script>

<style scoped>
:root {
  --green: #0eaa10;
  --gray-100: #f5f5f5;
  --gray-700: #404040;
  --radius: 8px;
}

.container {
  max-width: 1200px;
  margin-inline: auto;
  padding-inline: 16px;
}

/* ─── FACTS ─────────────────────────────────────────────────────────────────── */
.facts {
  background: #ffffff;
  padding-block: 24px;
}

.facts__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
}

.fact {
  text-align: center;
}

.fact__icon {
  width: 40px;
  height: 40px;
  margin-bottom: 8px;
}

.fact__text {
  font-size: 14px;
  font-weight: 500;
  margin: 0;
}
</style> 