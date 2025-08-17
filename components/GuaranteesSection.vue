<template>
  <section id="guarantees" class="guarantees">
    <div class="guarantees__overlay">
      <h2 class="guarantees__title">НАШИ ГАРАНТИИ</h2>
      <p class="guarantees__subtitle">
        Гарантии на ремонт и используемые комплектующие прописаны в договоре. Если в течение гарантийного
        срока стиральная машина даст сбой, мастер повторно проведёт диагностику и ремонт бесплатно.
      </p>

      <div class="guarantees__grid">
        <ul class="guarantees__list">
          <li v-for="g in items" :key="g" class="guarantees__item">
            <img src="/icons/check.svg" alt="✔" class="guarantees__icon" />
            <span>{{ g }}</span>
          </li>
        </ul>

        <div class="guarantees__docs">
          <div class="docs-slider">
            <div 
              class="docs-slider__container"
              @touchstart="handleTouchStart"
              @touchend="handleTouchEnd"
            >
              <img class="doc active" src="/images/garantii/garantii.jpg" alt="Договор" loading="lazy" />
              <img class="doc" src="/images/garantii/garantii.jpg" alt="Гарантийный талон" loading="lazy" />
            </div>
            <div class="docs-slider__dots">
              <button 
                v-for="(_, index) in 2" 
                :key="index" 
                class="docs-slider__dot"
                :class="{ active: index === activeSlide }"
                @click="setActiveSlide(index)"
              ></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const activeSlide = ref(0)
let touchStartX = 0
let touchEndX = 0

const items = [
  'Гарантия на замену ТЭНа — до 1 года',
  'Гарантия на замену клапана — до 1 года',
  'Гарантия на модуль управления — до 2 лет',
  'Гарантия на работы и запчасти — до 3 лет'
]

function setActiveSlide(index) {
  activeSlide.value = index
  const container = document.querySelector('.docs-slider__container')
  if (container) {
    container.style.transform = `translateX(-${index * 50}%)`
  }
}

function handleTouchStart(e) {
  touchStartX = e.touches[0].clientX
}

function handleTouchEnd(e) {
  touchEndX = e.changedTouches[0].clientX
  handleSwipe()
}

function handleSwipe() {
  const swipeThreshold = 50
  const diff = touchStartX - touchEndX
  
  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0 && activeSlide.value < 1) {
      // Свайп влево - следующий слайд
      setActiveSlide(activeSlide.value + 1)
    } else if (diff < 0 && activeSlide.value > 0) {
      // Свайп вправо - предыдущий слайд
      setActiveSlide(activeSlide.value - 1)
    }
  }
}
</script>

<style scoped>
.guarantees { position: relative; background: url('/images/why/bg.jpg') center/cover no-repeat; color: #fff; overflow: hidden; }
.guarantees::before { content: ''; position: absolute; inset: 0; background: rgba(0,0,0,0.8); }
.guarantees__overlay { position: relative; max-width: 1200px; margin: 0 auto; padding: 56px 16px 60px; }

.guarantees__title { margin: 0 0 12px; text-align: center; font-size: 32px; font-weight: 900; text-transform: uppercase; }
.guarantees__subtitle { margin: 0 auto 24px; max-width: 1060px; text-align: center; font-size: 18px; opacity: 0.98; }

.guarantees__grid { display: grid; grid-template-columns: 1.4fr 1fr; gap: 24px; align-items: center; }
.guarantees__list { list-style: none; margin: 0; padding: 0; display: grid; gap: 16px; }
.guarantees__item { display: flex; align-items: center; gap: 12px; background: rgba(255,255,255,0.06); padding: 14px 16px; border-radius: 12px; font-size: 18px; }
.guarantees__icon { width: 22px; height: 22px; filter: invert(61%) sepia(72%) saturate(673%) hue-rotate(73deg) brightness(95%) contrast(93%); }

.guarantees__docs { display: flex; justify-content: center; overflow: hidden; }
.docs-slider { width: 100%; max-width: 300px; overflow: hidden; }
.docs-slider__container { position: relative; width: 200%; height: 220px; overflow: hidden; border-radius: 12px; display: flex; transition: transform 0.3s ease; user-select: none; touch-action: pan-y; }
.doc { width: 50%; height: 100%; object-fit: contain; background: rgba(255,255,255,0.1); padding: 12px; flex-shrink: 0; }

.docs-slider__dots { display: flex; justify-content: center; gap: 8px; margin-top: 16px; }
.docs-slider__dot { width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,0.3); border: none; cursor: pointer; transition: all 0.3s ease; }
.docs-slider__dot:hover { background: rgba(255,255,255,0.5); transform: scale(1.1); }
.docs-slider__dot.active { background: var(--green); transform: scale(1.2); }

@media (max-width: 1024px) {
  .guarantees__grid { grid-template-columns: 1fr; }
}

@media (max-width: 600px) {
  .guarantees__title { font-size: 28px; }
  .guarantees__item { font-size: 16px; }
  .guarantees__docs { justify-content: center; }
  .docs-slider { max-width: 280px; }
  .docs-slider__container { height: 200px; }
  .docs-slider__dot { width: 10px; height: 10px; }
}
</style>