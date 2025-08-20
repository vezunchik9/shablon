<!-- pages/index.vue -->
<template>
  <div class="page-wrapper">
    <!-- ─── TOP BAR ───────────────────────────────────────────────────────────── -->
    <header class="topbar">
      <div class="container topbar__inner">
        <div class="logo">
          <img src="/logo.png" alt="СТИРАЛ-СЕРВИС" class="logo__img" />
          <div class="logo__text">
            <span class="logo__name">«СТИРАЛ-СЕРВИС»</span>
            <span class="logo__slogan">Чиним стиральные&nbsp;машины с&nbsp;2012&nbsp;года</span>
          </div>
        </div>

        <div class="contacts">
          <span class="contacts__schedule">08:00 – 23:00 ежедневно</span>
          <a href="tel:+79226600172" class="contacts__phone">+7&nbsp;(922)&nbsp;660-01-72</a>
        </div>

        <button class="callback" @click="openLead('header-callback')">Перезвоните мне</button>

        <a href="tel:+79226600172" class="topbar__call" aria-label="Позвонить"></a>
        <button class="nav__burger" aria-label="Меню" @click="isNavOpen = true">
          <span class="nav__burger-line" />
          <span class="nav__burger-line" />
          <span class="nav__burger-line" />
        </button>
      </div>

      <div ref="navSpacer" class="nav-spacer"></div>
      <nav ref="navEl" class="nav">
        <div class="container">
          <ul class="nav__list">
          <li v-for="item in nav" :key="item.href" class="nav__item">
            <NuxtLink :to="item.href" class="nav__link">{{ item.title }}</NuxtLink>
          </li>
          </ul>
        </div>
      </nav>
      <!-- Mobile drawer -->
      <div v-if="isNavOpen" class="nav-mobile-overlay" @click.self="isNavOpen = false">
        <nav class="nav-mobile" role="dialog" aria-modal="true">
          <button class="nav-mobile__close" aria-label="Закрыть" @click="isNavOpen = false">×</button>
          <ul class="nav-mobile__list">
            <li v-for="item in nav" :key="item.href">
              <NuxtLink :to="item.href" class="nav-mobile__link" @click="isNavOpen = false">{{ item.title }}</NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>

    <!-- СЕКЦИИ -->
    <HeroSection />
    <FactsBar />
    <QuizSection />
    <WhyUsSection />
    <PricesSection />
    <DiagnosticsCta />
    <BrandsSection />
    <CommonFaultsSection />
    <TeamSection />
    <ProcessSection />
    <BenefitsSection />
    <FinalCta />
    <PartnersSection />
    <GuaranteesSection />
    <CasesSection />
    <RepairTimeCta />
    <NumbersSection />
    <AboutSection />
    <ReviewsSection />
    <VideoReviewsSection />
    <FaqSection />
    <ContactsSection />
    <SiteFooter />
  </div>
</template>

<script setup>
import HeroSection from '@/components/HeroSection.vue'
import WhyUsSection from '@/components/WhyUsSection.vue'
import PricesSection from '@/components/PricesSection.vue'
import FactsBar from '@/components/FactsBar.vue'
import DiagnosticsCta from '@/components/DiagnosticsCta.vue'
import BrandsSection from '@/components/BrandsSection.vue'
import CommonFaultsSection from '@/components/CommonFaultsSection.vue'
import TeamSection from '@/components/TeamSection.vue'
import BenefitsSection from '@/components/BenefitsSection.vue'
import ReviewsSection from '@/components/ReviewsSection.vue'
import VideoReviewsSection from '@/components/VideoReviewsSection.vue'
import ProcessSection from '@/components/ProcessSection.vue'
import NumbersSection from '@/components/NumbersSection.vue'
import AboutSection from '@/components/AboutSection.vue'
import PartnersSection from '@/components/PartnersSection.vue'
import GuaranteesSection from '@/components/GuaranteesSection.vue'
import CasesSection from '@/components/CasesSection.vue'
import RepairTimeCta from '@/components/RepairTimeCta.vue'
import FaqSection from '@/components/FaqSection.vue'
import FinalCta from '@/components/FinalCta.vue'
import ContactsSection from '@/components/ContactsSection.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import LeadModal from '@/components/LeadModal.vue'
const { open: openLead } = useLeadModal()
const isNavOpen = ref(false)

const nav = [
  { title: 'Главная', href: '/' },
  { title: 'Цены', href: '#prices' },
  { title: 'Поломки', href: '#faults' },
  { title: 'Льготы', href: '#benefits' },
  { title: 'Отзывы', href: '#reviews' },
  { title: 'Контакты', href: '#contacts' }
]

const benefits = [
  'Выезд в течение 30 минут',
  'Выезд мастера бесплатно',
  'Ремонтируем за 1 выезд',
  'Оплата по факту ремонта'
]

const facts = [
  { icon: '/icons/calendar.svg', text: 'Ремонтируем 7 дней в неделю без выходных' },
  { icon: '/icons/worker.svg', text: 'Мастера граждане РФ с опытом более 5 лет' },
  { icon: '/icons/wallet.svg', text: 'Оплата наличкой или переводом на карту' },
  { icon: '/icons/stats.svg', text: 'Произвели более 5 000 ремонтов' }
]

const form = reactive({ name: '', phone: '' })

function submit () {
  // TODO: интеграция с backend / CRM
  console.table(form)
  form.name = ''
  form.phone = ''
}

// Если страница перезагружается с хэшем (например, #benefits), возвращаемся к началу
onMounted(() => {
  const route = useRoute()
  const navs = typeof performance !== 'undefined' && typeof performance.getEntriesByType === 'function'
    ? performance.getEntriesByType('navigation')
    : []
  const isReload = Array.isArray(navs) ? (navs[0] && navs[0].type === 'reload') : (performance && performance.navigation && performance.navigation.type === 1)
  if (isReload && route.hash) {
    history.replaceState(null, '', route.path || window.location.pathname)
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }

  // Фиксируем только панель навигации при прокрутке ниже верхней полосы
  const navEl = document.querySelector('.nav')
  const topbarEl = document.querySelector('.topbar')
  const spacerEl = document.querySelector('.nav-spacer')
  if (!navEl || !topbarEl || !spacerEl) return
  const navHeight = navEl.offsetHeight
  const topbarHeight = topbarEl.offsetHeight

  function onScroll() {
    if (window.scrollY >= topbarHeight) {
      navEl.classList.add('is-fixed')
      spacerEl.style.height = navHeight + 'px'
    } else {
      navEl.classList.remove('is-fixed')
      spacerEl.style.height = '0px'
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
</script>

<style scoped>
:root {
  --green: #0eaa10;
  --yellow: #eede77;
  --overlay: rgba(0, 0, 0, 0.6);
  --gray-100: #f5f5f5;
  --gray-700: #404040;
  --radius: 8px;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: 'Inter', 'Roboto', sans-serif;
  color: var(--gray-700);
}

.page-wrapper {
  background-color: var(--gray-100);
  min-height: 100vh;
  overflow-x: hidden;
}

.container {
  max-width: 1200px;
  margin-inline: auto;
  padding-inline: 16px;
  overflow-x: hidden;
}

/* ─── TOPBAR ────────────────────────────────────────────────────────────────── */
.topbar {
  background: #ffffff;
  border-bottom: 1px solid #e3e3e3;
}

  .topbar__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-block: 6px;
  }

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo__img {
  width: 48px;
  height: 48px;
}

.logo__name {
  font-weight: 700;
  display: block;
}

.logo__slogan {
  font-size: 12px;
  line-height: 1;
}

.contacts {
  text-align: right;
  font-size: 14px;
}

.contacts__phone {
  display: block;
  color: var(--green);
  font-weight: 600;
  text-decoration: none;
}

.callback {
  padding: 8px 20px;
  border: none;
  border-radius: var(--radius);
  background: var(--green);
  color: #fff;
  font-weight: 600;
  cursor: pointer;
}

.callback:hover {
  opacity: 0.9;
}

/* NAV */
.nav {
  background: #f0f0f0;
  border-bottom: 1px solid #e3e3e3;
}

.nav-spacer { height: 0; }

.nav.is-fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1100;
}

.nav__list {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 28px;
  height: 56px;
  padding-block: 0;
  margin: 0;
  list-style: none;
}

.nav__link {
  display: inline-flex;
  align-items: center;
  height: 40px;
  padding: 0 10px;
  text-decoration: none;
  color: var(--gray-700);
  font-weight: 600;
  line-height: 1;
}

.nav__link:hover {
  color: var(--green);
}

/* ─── MOBILE NAV ───────────────────────────────────────────────────────────── */
@media (max-width: 600px) {
  .nav__list {
    gap: 16px;
    height: 48px;
    padding-inline: 8px;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }
  .nav__list::-webkit-scrollbar { display: none; }
  .nav__link { height: 36px; padding: 0 8px; font-weight: 600; }
}

/* Enforce tight hero spacing on mobile (deep selector to override child component) */
@media (max-width: 600px) {
  :deep(.hero) { padding-block: 12px 8px !important; }
  :deep(.hero__inner) { gap: 12px !important; }
  :deep(.hero__title) { margin-bottom: 8px !important; }
  :deep(.cta) { margin-top: 8px !important; }
}

/* Mobile burger */
.nav__burger { display: none; margin-left: 12px; width: 36px; height: 36px; border: 1px solid #e3e3e3; border-radius: 8px; background: #fff; align-items: center; justify-content: center; gap: 4px; flex-direction: column; cursor: pointer; }
.nav__burger-line { display: block; width: 22px; height: 2px; background: #111; border-radius: 1px; }

@media (max-width: 900px) {
  .callback { display: none; }
  .nav__burger { display: inline-flex; }
  .contacts__schedule { display: none; }
  .contacts__phone { display: none; }
  .topbar__call { display: inline-flex; }
  /* Скрываем горизонтальную полосу навигации на мобиле — только бургер */
  .nav { display: none; }
  .nav-spacer { display: none; height: 0 !important; }
}

.nav-mobile-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.5); z-index: 2000; display: grid; place-items: end; }
.nav-mobile { width: 86vw; max-width: 380px; height: 100vh; background: #fff; padding: 16px; box-shadow: -8px 0 24px rgba(0,0,0,.12); }
.nav-mobile__close { position: absolute; top: 8px; right: 12px; width: 36px; height: 36px; border: none; background: transparent; font-size: 24px; cursor: pointer; }
.nav-mobile__list { margin: 40px 0 0; padding: 0; list-style: none; display: grid; gap: 8px; }
.nav-mobile__link { display: block; padding: 12px 10px; border-radius: 8px; color: #111; text-decoration: none; font-weight: 600; }
.nav-mobile__link:hover { background: #f3f3f3; }

/* quick phone icon */
.topbar__call { display: none; width: 36px; height: 36px; border-radius: 8px; border: 1px solid #e3e3e3; background: #fff url('/icons/home.svg') center/18px no-repeat; margin-left: 8px; }

/* ─── HERO ──────────────────────────────────────────────────────────────────── */
.hero {
  position: relative;
  background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #3b82f6 100%);
  color: #fff;
  padding-block: 80px 60px;
}

.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--overlay);
}

.hero__inner {
  position: relative;
  display: flex;
  gap: 40px;
  z-index: 1;
}

.hero__left { flex: 1; }

.hero__title {
  margin: 0 0 12px;
  font-size: 36px;
  font-weight: 800;
  text-transform: uppercase;
  line-height: 1.2;
}

.hero__subtitle {
  margin: 0 0 32px;
  font-size: 20px;
  font-weight: 700;
  color: var(--yellow);
}

/* ─── FACTS ─────────────────────────────────────────────────────────────────── */
.facts { background: #ffffff; padding-block: 24px; }
.facts__grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px; }
.fact { text-align: center; }
.fact__icon { width: 40px; height: 40px; margin-bottom: 8px; }
.fact__text { font-size: 14px; font-weight: 500; margin: 0; }

/* ─── MEDIA ─────────────────────────────────────────────────────────────────── */
@media (max-width: 992px) {
  .hero__inner { flex-direction: column; }
  .hero__right { width: 100%; max-width: 400px; }
}

@media (max-width: 600px) {
  .hero__title { font-size: 28px; }
  .hero__subtitle { font-size: 18px; }
  .benefits__item { font-size: 16px; }
}
</style> 

<!-- Modal Mount -->
<!-- Global modal is mounted in app.vue -->