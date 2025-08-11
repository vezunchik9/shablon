export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  try {
    // Валидация данных
    if (!body.name || !body.phone) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Необходимо указать имя и телефон'
      })
    }

    // Формируем сообщение для Telegram
    const telegramMessage = `
🆕 Новая заявка с сайта

👤 Имя: ${body.name}
📞 Телефон: ${body.phone}
🔧 Услуга: ${body.service || 'Не указана'}
💬 Сообщение: ${body.message || 'Не указано'}
⏰ Время: ${new Date().toLocaleString('ru-RU')}
🌐 Источник: ${body.source || 'Лендинг'}
    `.trim()

    // Отправляем в Telegram
    if (config.telegramBotToken && config.telegramChatId) {
      try {
        const telegramResponse = await $fetch(`https://api.telegram.org/bot${config.telegramBotToken}/sendMessage`, {
          method: 'POST',
          body: {
            chat_id: config.telegramChatId,
            text: telegramMessage,
            parse_mode: 'HTML'
          }
        })

        console.log('Telegram отправлен:', telegramResponse)
      } catch (telegramError) {
        console.error('Ошибка отправки в Telegram:', telegramError)
        // Не прерываем выполнение, если Telegram недоступен
      }
    }

    // Записываем в Google Sheets
    if (config.googleSheetsId && config.googleServiceAccountKey) {
      try {
        await addToGoogleSheets(body, config)
        console.log('Данные записаны в Google Sheets')
      } catch (sheetsError) {
        console.error('Ошибка записи в Google Sheets:', sheetsError)
        // Не прерываем выполнение, если Sheets недоступен
      }
    }

    return {
      success: true,
      message: 'Заявка успешно отправлена'
    }

  } catch (error) {
    console.error('Ошибка обработки заявки:', error)
    
    return {
      success: false,
      message: error.message || 'Произошла ошибка при отправке заявки'
    }
  }
})

// Функция для записи в Google Sheets
async function addToGoogleSheets(data: any, config: any) {
  // Здесь будет логика записи в Google Sheets
  // Для простоты пока просто логируем
  console.log('Данные для записи в Sheets:', {
    timestamp: new Date().toISOString(),
    name: data.name,
    phone: data.phone,
    service: data.service,
    message: data.message,
    source: data.source
  })
  
  // В реальной реализации здесь будет код для работы с Google Sheets API
  // Пример:
  // const { google } = require('googleapis')
  // const auth = new google.auth.GoogleAuth({
  //   credentials: JSON.parse(config.googleServiceAccountKey),
  //   scopes: ['https://www.googleapis.com/auth/spreadsheets']
  // })
  // const sheets = google.sheets({ version: 'v4', auth })
  // await sheets.spreadsheets.values.append({
  //   spreadsheetId: config.googleSheetsId,
  //   range: 'Лист1!A1',
  //   valueInputOption: 'RAW',
  //   requestBody: {
  //     values: [[
  //       new Date().toISOString(),
  //       data.name,
  //       data.phone,
  //       data.service,
  //       data.message,
  //       data.source
  //     ]]
  //   }
  // })
} 