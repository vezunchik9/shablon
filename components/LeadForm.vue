<template>
  <section id="contact-form" class="py-16 bg-gray-50">
    <div class="container mx-auto px-4">
      <div class="max-w-2xl mx-auto">
        <!-- Заголовок формы -->
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {{ title }}
          </h2>
          <p class="text-lg text-gray-600">
            {{ subtitle }}
          </p>
        </div>

        <!-- Форма -->
        <form @submit.prevent="submitForm" class="bg-white rounded-xl shadow-lg p-8">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <!-- Имя -->
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
                Ваше имя *
              </label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Введите ваше имя"
              />
            </div>

            <!-- Телефон -->
            <div>
              <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
                Телефон *
              </label>
              <input
                id="phone"
                v-model="form.phone"
                type="tel"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="+7 (999) 123-45-67"
              />
            </div>
          </div>

          <!-- Услуга -->
          <div class="mb-6">
            <label for="service" class="block text-sm font-medium text-gray-700 mb-2">
              Выберите услугу
            </label>
            <select
              id="service"
              v-model="form.service"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Выберите услугу</option>
              <option v-for="service in services" :key="service.id" :value="service.name">
                {{ service.name }}
              </option>
            </select>
          </div>

          <!-- Сообщение -->
          <div class="mb-6">
            <label for="message" class="block text-sm font-medium text-gray-700 mb-2">
              Описание проблемы
            </label>
            <textarea
              id="message"
              v-model="form.message"
              rows="4"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Опишите проблему или укажите модель техники"
            ></textarea>
          </div>

          <!-- Чекбокс согласия -->
          <div class="mb-6">
            <label class="flex items-start space-x-3">
              <input
                v-model="form.agreement"
                type="checkbox"
                required
                class="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span class="text-sm text-gray-600">
                Я согласен на обработку персональных данных в соответствии с 
                <a href="#" class="text-blue-600 hover:underline">политикой конфиденциальности</a>
              </span>
            </label>
          </div>

          <!-- Кнопка отправки -->
          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <span v-if="isSubmitting" class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Отправляем...
            </span>
            <span v-else>{{ submitButtonText }}</span>
          </button>

          <!-- Сообщение об успехе/ошибке -->
          <div v-if="submitStatus" class="mt-4 p-4 rounded-lg" :class="submitStatus.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'">
            {{ submitStatus.message }}
          </div>
        </form>

        <!-- Дополнительная информация -->
        <div class="mt-8 text-center text-sm text-gray-600">
          <p>Оставляя заявку, вы соглашаетесь с обработкой персональных данных</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: 'Оставьте заявку'
  },
  subtitle: {
    type: String,
    default: 'Мы свяжемся с вами в течение 15 минут'
  },
  submitButtonText: {
    type: String,
    default: 'Отправить заявку'
  },
  services: {
    type: Array,
    default: () => [
      { id: 1, name: 'Ремонт стиральной машины' },
      { id: 2, name: 'Ремонт холодильника' },
      { id: 3, name: 'Ремонт посудомоечной машины' },
      { id: 4, name: 'Ремонт духовки' },
      { id: 5, name: 'Ремонт микроволновки' },
      { id: 6, name: 'Другое' }
    ]
  }
})

// Состояние формы
const form = ref({
  name: '',
  phone: '',
  service: '',
  message: '',
  agreement: false
})

const isSubmitting = ref(false)
const submitStatus = ref(null)

// Отправка формы
const submitForm = async () => {
  if (!form.value.name || !form.value.phone || !form.value.agreement) {
    submitStatus.value = {
      type: 'error',
      message: 'Пожалуйста, заполните все обязательные поля'
    }
    return
  }

  isSubmitting.value = true
  submitStatus.value = null

  try {
    // Отправляем данные на сервер
    const response = await $fetch('/api/send-lead', {
      method: 'POST',
      body: {
        name: form.value.name,
        phone: form.value.phone,
        service: form.value.service,
        message: form.value.message,
        timestamp: new Date().toISOString(),
        source: 'landing'
      }
    })

    if (response.success) {
      submitStatus.value = {
        type: 'success',
        message: 'Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.'
      }
      
      // Очищаем форму
      form.value = {
        name: '',
        phone: '',
        service: '',
        message: '',
        agreement: false
      }
    } else {
      throw new Error(response.message || 'Ошибка отправки')
    }
  } catch (error) {
    console.error('Ошибка отправки формы:', error)
    submitStatus.value = {
      type: 'error',
      message: 'Произошла ошибка при отправке заявки. Пожалуйста, попробуйте еще раз или позвоните нам.'
    }
  } finally {
    isSubmitting.value = false
  }
}
</script> 