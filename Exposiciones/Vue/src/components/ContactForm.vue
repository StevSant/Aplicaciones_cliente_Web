<template>
  <section class="form-section">
    <h2>✏️ Nuevo Contacto</h2>
    
    <form @submit.prevent="handleSubmit" class="contact-form">
      <div class="form-group">
        <label for="name">Nombre *</label>
        <input 
          id="name"
          v-model="formData.name" 
          type="text" 
          placeholder="Ingresa el nombre completo"
          required 
          class="form-input"
          :class="{ 'error-input': errors.name }"
        />
        <span v-if="errors.name" class="error-text">{{ errors.name }}</span>
      </div>

      <div class="form-group">
        <label for="phone">Teléfono *</label>
        <input 
          id="phone"
          v-model="formData.phone" 
          type="tel" 
          placeholder="Ej: 555-0123"
          required 
          class="form-input"
          :class="{ 'error-input': errors.phone }"
        />
        <span v-if="errors.phone" class="error-text">{{ errors.phone }}</span>
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input 
          id="email"
          v-model="formData.email" 
          type="email" 
          placeholder="correo@ejemplo.com (opcional)"
          class="form-input"
          :class="{ 'error-input': errors.email }"
        />
        <span v-if="errors.email" class="error-text">{{ errors.email }}</span>
      </div>

      <button type="submit" class="submit-btn" :disabled="isSubmitting">
        <span v-if="!isSubmitting">➕ Agregar Contacto</span>
        <span v-else>⏳ Agregando...</span>
      </button>

      <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
    </form>
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue'

// Estado del formulario
const formData = reactive({
  name: '',
  phone: '',
  email: ''
})

// Estado de errores
const errors = reactive({
  name: '',
  phone: '',
  email: ''
})

// Estados adicionales
const isSubmitting = ref(false)
const successMessage = ref('')

// Eventos que emite el componente
const emit = defineEmits(['addContact'])

// Validar formulario
const validateForm = () => {
  // Limpiar errores previos
  Object.keys(errors).forEach(key => errors[key] = '')
  
  let isValid = true

  // Validar nombre
  if (!formData.name.trim()) {
    errors.name = 'El nombre es obligatorio'
    isValid = false
  } else if (formData.name.trim().length < 2) {
    errors.name = 'El nombre debe tener al menos 2 caracteres'
    isValid = false
  }

  // Validar teléfono
  if (!formData.phone.trim()) {
    errors.phone = 'El teléfono es obligatorio'
    isValid = false
  } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
    errors.phone = 'Formato de teléfono inválido'
    isValid = false
  }

  // Validar email (opcional, pero si se ingresa debe ser válido)
  if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Formato de email inválido'
    isValid = false
  }

  return isValid
}

// Limpiar formulario
const clearForm = () => {
  formData.name = ''
  formData.phone = ''
  formData.email = ''
  Object.keys(errors).forEach(key => errors[key] = '')
}

// Mostrar mensaje de éxito
const showSuccessMessage = () => {
  successMessage.value = '✅ ¡Contacto agregado exitosamente!'
  setTimeout(() => {
    successMessage.value = ''
  }, 3000)
}

// Manejar envío del formulario
const handleSubmit = async () => {
  if (!validateForm()) return

  isSubmitting.value = true

  try {
    // Simular delay de procesamiento
    await new Promise(resolve => setTimeout(resolve, 500))

    // Crear objeto de contacto
    const newContact = {
      id: Date.now(),
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim() || null
    }

    // Emitir evento al componente padre
    emit('addContact', newContact)

    // Limpiar formulario y mostrar éxito
    clearForm()
    showSuccessMessage()

  } catch (error) {
    console.error('Error al agregar contacto:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.form-section {
  flex: 1 1 300px;
  background: #f9f9f9;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid #e9ecef;
  height: fit-content;
}

.form-section h2 {
  margin-top: 0;
  margin-bottom: 25px;
  color: #2c3e50;
  text-align: center;
  font-size: 22px;
  border-bottom: 2px solid #e9ecef;
  padding-bottom: 10px;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-weight: 600;
  color: #495057;
  font-size: 14px;
}

.form-input {
  padding: 12px 16px;
  border: 2px solid #dee2e6;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s ease;
  background: #ffffff;
}

.form-input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}

.form-input.error-input {
  border-color: #dc3545;
  background-color: #fff5f5;
}

.error-text {
  color: #dc3545;
  font-size: 12px;
  font-weight: 500;
  margin-top: 2px;
}

.submit-btn {
  background: linear-gradient(135deg, #007bff, #0056b3);
  color: white;
  padding: 14px 20px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;
}

.submit-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #0056b3, #004085);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
}

.submit-btn:disabled {
  background: #6c757d;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.success-message {
  background: #d4edda;
  color: #155724;
  padding: 12px;
  border-radius: 6px;
  margin: 0;
  text-align: center;
  font-weight: 500;
  border: 1px solid #c3e6cb;
}
</style>
