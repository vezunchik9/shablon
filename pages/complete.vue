<template>
  <section class="complete">
    <div class="box">
      <div class="icon">✓</div>
      <h1 class="title">Заявка отправлена</h1>
      <p class="subtitle">Спасибо! Мы свяжемся с вами в ближайшее время.</p>

      <p v-if="source" class="meta">Источник: {{ source }}</p>

      <NuxtLink to="/" class="btn">Вернуться на главную</NuxtLink>
    </div>
  </section>
</template>

<script setup>
const route = useRoute()
const source = computed(() => (route.query.source || '').toString())

useHead({
  title: 'Заявка отправлена',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})

onMounted(() => {
  // GTM / dataLayer
  if (typeof window !== 'undefined' && Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event: 'lead_complete', source: source.value || 'unknown', ts: Date.now() })
  }
})
</script>

<style scoped>
.complete { display: grid; place-items: center; min-height: 70vh; background: #fff; padding: 40px 16px; }
.box { text-align: center; border: 1px solid var(--gray-300); border-radius: 16px; padding: 32px 24px; max-width: 560px; width: 100%; box-shadow: 0 8px 24px rgba(0,0,0,.06); }
.icon { width: 72px; height: 72px; border-radius: 50%; margin: 0 auto 16px; background: #e9f7ea; color: var(--green); display: grid; place-items: center; font-size: 36px; font-weight: 900; }
.title { margin: 0 0 8px; font-size: 28px; font-weight: 900; }
.subtitle { margin: 0 0 12px; color: #444; }
.meta { margin: 0 0 14px; font-size: 13px; color: #777; }
.btn { display: inline-block; padding: 12px 24px; border-radius: 10px; background: var(--green); color: #fff; text-decoration: none; font-weight: 800; }
.btn:hover { opacity: .9; }
</style>


