<template>
  <div class="card">
    <div class="contact-info">
      <h3>{{ contact.name }}</h3>
      <p>📞 {{ contact.phone }}</p>
      <p v-if="contact.email">✉️ {{ contact.email }}</p>
    </div>
    <button 
      @click="$emit('delete', contact.id)" 
      class="delete-btn"
      :aria-label="`Eliminar contacto ${contact.name}`"
    >
      🗑️
    </button>
  </div>
</template>

<script setup>
// Props que recibe el componente
defineProps({
  contact: {
    type: Object,
    required: true,
    validator: (contact) => {
      return contact && 
             typeof contact.id !== 'undefined' && 
             typeof contact.name === 'string' && 
             typeof contact.phone === 'string'
    }
  }
})

// Eventos que emite el componente
defineEmits(['delete'])
</script>

<style scoped>
.card {
  background: #fff;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  transition: all 0.3s ease;
}

.card:hover {
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.2);
  border-color: #007bff;
  transform: translateY(-2px);
}

.contact-info h3 {
  margin: 0 0 8px 0;
  color: #2c3e50;
  font-size: 18px;
}

.contact-info p {
  margin: 4px 0;
  color: #6c757d;
  font-size: 14px;
}

.delete-btn {
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 16px;
  line-height: 1;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.delete-btn:hover {
  background: #c82333;
  transform: scale(1.1);
}

.delete-btn:active {
  transform: scale(0.95);
}
</style>
