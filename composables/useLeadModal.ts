export const useLeadModal = () => {
  const isOpen = useState<boolean>('leadModal:isOpen', () => false)
  const context = useState<{ title: string; submitText: string; source: string }>('leadModal:ctx', () => ({
    title: 'Оставьте заявку',
    submitText: 'Отправить',
    source: 'lead-modal'
  }))

  function open (opts?: Partial<{ title: string; submitText: string; source: string }>) {
    if (opts) context.value = { ...context.value, ...opts }
    isOpen.value = true
  }

  function close () {
    isOpen.value = false
  }

  return { isOpen, context, open, close }
}


