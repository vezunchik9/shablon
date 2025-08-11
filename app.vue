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
</style>
