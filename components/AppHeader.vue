<template>
  <header class="bg-white shadow-sm sticky top-0 z-50">
    <div class="container mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <!-- Логотип -->
        <div class="flex items-center space-x-3">
          <div class="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <div>
            <h1 class="text-xl font-bold text-gray-900">СТИРАЛ-СЕРВИС</h1>
            <p class="text-sm text-gray-600">Чиним стиральные машины с 2012 года</p>
          </div>
        </div>

        <!-- Контакты -->
        <div class="hidden md:flex items-center space-x-6">
          <div class="text-right">
            <p class="text-sm text-gray-600">Отвечаем на звонки с 08:00 до 23:00</p>
            <a 
              :href="`tel:${phone}`" 
              class="text-lg font-bold text-blue-600 hover:text-blue-700 transition-colors"
            >
              {{ phone }}
            </a>
          </div>
          <button 
            @click="scrollToForm"
            class="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center space-x-2"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
            </svg>
            <span>ПЕРЕЗВОНИТЕ МНЕ</span>
          </button>
        </div>

        <!-- Мобильное меню -->
        <button 
          @click="toggleMobileMenu"
          class="md:hidden p-2"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>

      <!-- Навигация -->
      <nav class="hidden md:block mt-4 border-t border-gray-200 pt-4">
        <div class="flex space-x-8">
          <a href="#" class="text-blue-600 font-medium">Главная</a>
          <a href="#" class="text-gray-600 hover:text-blue-600 transition-colors">Цены</a>
          <a href="#" class="text-gray-600 hover:text-blue-600 transition-colors">Поломки</a>
          <a href="#" class="text-gray-600 hover:text-blue-600 transition-colors">Льготы</a>
          <a href="#" class="text-gray-600 hover:text-blue-600 transition-colors">Отзывы</a>
          <a href="#" class="text-gray-600 hover:text-blue-600 transition-colors">Контакты</a>
        </div>
      </nav>

      <!-- Мобильное меню -->
      <div v-if="isMobileMenuOpen" class="md:hidden mt-4 pb-4 border-t border-gray-200">
        <div class="pt-4 space-y-4">
          <div class="text-center">
            <p class="text-sm text-gray-600">Отвечаем на звонки с 08:00 до 23:00</p>
            <a 
              :href="`tel:${phone}`" 
              class="text-lg font-bold text-blue-600 hover:text-blue-700 transition-colors"
            >
              {{ phone }}
            </a>
          </div>
          <button 
            @click="scrollToForm"
            class="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center space-x-2"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
            </svg>
            <span>ПЕРЕЗВОНИТЕ МНЕ</span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
const props = defineProps({
  phone: {
    type: String,
    default: '+7 (922) 660-01-72'
  }
})

const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const scrollToForm = () => {
  const form = document.getElementById('contact-form')
  if (form) {
    form.scrollIntoView({ behavior: 'smooth' })
  }
}
</script> 