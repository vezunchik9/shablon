<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtPage />
    <!-- Global lead modal mount -->
    <LeadModal />
  </div>
</template>

<script setup>
import LeadModal from '@/components/LeadModal.vue'
</script>

<style>
/* Global design tokens (not scoped) */
:root {
  --green: #0eaa10;
  --yellow: #eede77;
  --overlay: rgba(0, 0, 0, 0.6);
  --gray-100: #f5f5f5;
  --gray-300: #dcdcdc;
  --gray-700: #404040;
  --radius: 8px;
}

/* Prevent horizontal scroll bleed on mobile */
html, body, #__nuxt { overflow-x: hidden; }

/* Unified mobile typography */
@media (max-width: 600px) {
  /* Big headline (hero) */
  .hero__title {
    font-size: 26px !important;
    line-height: 1.22 !important;
    text-align: center !important;
    margin: 0 auto 12px !important;
    max-width: 20ch;
  }
  .hero__subtitle {
    font-size: 16px !important;
    text-align: center !important;
  }

  /* Section titles */
  .prices__title,
  .benefits__title,
  .reviews__title,
  .cases__title,
  .brands__title,
  .final-cta__title,
  .cta-diagnostics__title,
  .title { /* repair-time cta */
    font-size: 24px !important;
    line-height: 1.28 !important;
    text-align: center !important;
    margin: 0 0 20px !important;
  }

  /* Section subtitles / helper text */
  .benefits__subtitle {
    font-size: 14px !important;
    line-height: 1.5 !important;
    text-align: center !important;
  }
}
</style>
