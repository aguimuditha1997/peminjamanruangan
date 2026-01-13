import { reactive } from 'vue'

export const alertState = reactive({
    isOpen: false,
    type: 'info', // info, success, error, warning, details
    title: '',
    message: '',
    details: null, // For structured data like booking details
    onClose: null
})

export const showAlert = (options) => {
    alertState.title = options.title || ''
    alertState.message = options.message || ''
    alertState.type = options.type || 'info'
    alertState.details = options.details || null
    alertState.onClose = options.onClose || null
    alertState.isOpen = true
}

export const closeAlert = () => {
    alertState.isOpen = false
    if (alertState.onClose) alertState.onClose()
}
