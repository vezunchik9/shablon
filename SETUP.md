# Настройка лендинга услуг

## Быстрый старт

1. Установите зависимости:
```bash
npm install
```

2. Создайте файл `.env` на основе `.env.example`:
```bash
cp .env.example .env
```

3. Запустите проект в режиме разработки:
```bash
npm run dev
```

## Настройка интеграций

### Telegram Bot

1. Создайте бота через @BotFather в Telegram
2. Получите токен бота
3. Узнайте ID чата (вашего или группы)
4. Добавьте в `.env`:
```
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id
```

### Google Sheets

#### Способ 1: Google Sheets API (рекомендуется)

1. Создайте проект в Google Cloud Console
2. Включите Google Sheets API
3. Создайте сервисный аккаунт
4. Скачайте JSON-ключ
5. Добавьте в `.env`:
```
GOOGLE_SHEETS_ID=your_sheet_id
GOOGLE_SERVICE_ACCOUNT_KEY={"type":"service_account",...}
```

#### Способ 2: Google Apps Script

1. Создайте Google Таблицу
2. Откройте Apps Script (Расширения → Apps Script)
3. Создайте веб-приложение с кодом:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);
  
  sheet.appendRow([
    new Date(),
    data.name,
    data.phone,
    data.service,
    data.message,
    data.source
  ]);
  
  return ContentService.createTextOutput("OK");
}
```

4. Деплойте как веб-приложение
5. Обновите URL в `server/api/send-lead.post.ts`

## Кастомизация

### Изменение контента

Отредактируйте объект `siteConfig` в `pages/index.vue`:

```javascript
const siteConfig = {
  companyName: 'Ваша компания',
  companyDescription: 'Ваше описание',
  phone: '+7 (999) 123-45-67',
  // ... остальные настройки
}
```

### Добавление новых блоков

1. Создайте компонент в `components/`
2. Импортируйте на страницу
3. Добавьте в разметку

### Изменение стилей

Проект использует Tailwind CSS. Основные цвета:
- Синий: `blue-600`, `blue-700`
- Серый: `gray-50`, `gray-100`, `gray-600`, `gray-900`

## Деплой на Vercel

1. Подключите репозиторий к Vercel
2. Добавьте переменные окружения в настройках проекта
3. Деплой произойдет автоматически

## Структура проекта

```
├── components/          # Vue компоненты
│   ├── AppHeader.vue   # Шапка сайта
│   ├── HeroSection.vue # Главный баннер
│   └── LeadForm.vue    # Форма заявки
├── pages/              # Страницы
│   └── index.vue       # Главная страница
├── server/             # Серверные API
│   └── api/
│       └── send-lead.post.ts # Обработка заявок
├── nuxt.config.ts      # Конфигурация Nuxt
└── package.json        # Зависимости
```

## Производительность

- Статическая генерация для быстрой загрузки
- Оптимизация изображений через @nuxt/image
- Минификация CSS через Tailwind
- Ленивая загрузка компонентов

## SEO

- Автоматические мета-теги
- Структурированные данные
- Оптимизация для поисковиков

## Аналитика

Добавьте Яндекс Метрику в `nuxt.config.ts`:

```javascript
app: {
  head: {
    script: [
      {
        src: 'https://mc.yandex.ru/metrika/tag.js',
        async: true
      }
    ]
  }
}
``` 