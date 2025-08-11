// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Совместимость с Nitro
  compatibilityDate: '2025-08-07',
  
  // Режим статической генерации для максимальной скорости
  ssr: true,
  nitro: {
    prerender: {
      routes: ['/']
    }
  },

  // Модули
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@pinia/nuxt',
    '@vueuse/nuxt'
  ],

  // Настройки для Vercel
  experimental: {
    payloadExtraction: false
  },



  // Настройки приложения
  app: {
    head: {
      title: 'Лендинг услуг',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Профессиональные услуги по ремонту и обслуживанию' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  // Переменные окружения
  runtimeConfig: {
    // Приватные ключи (только на сервере)
    telegramBotToken: '',
    telegramChatId: '',
    googleSheetsId: '',
    googleServiceAccountKey: '',
    
    // Публичные переменные (доступны на клиенте)
    public: {
      siteUrl: process.env.SITE_URL || 'http://localhost:3000'
    }
  },

  // Настройки для разработки
  devtools: { enabled: true }
})
