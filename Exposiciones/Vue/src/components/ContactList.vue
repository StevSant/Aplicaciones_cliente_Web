<template>
  <section class="list-section">
    <h2>Contactos ({{ contacts.length }})</h2>

    <div v-if="contacts.length === 0" class="no-contacts">
      <p>📭 No hay contactos registrados.</p>
      <p class="hint">¡Agrega tu primer contacto usando el formulario!</p>
    </div>

    <div v-else class="contact-list">
      <ContactCard 
        v-for="contact in contacts" 
        :key="contact.id" 
        :contact="contact"
        @delete="handleDeleteContact"
      />
    </div>
  </section>
</template>

<script setup>
import ContactCard from './ContactCard.vue'

// Props que recibe el componente
defineProps({
  contacts: {
    type: Array,
    required: true,
    default: () => []
  }
})

// Eventos que emite el componente
const emit = defineEmits(['deleteContact'])

// Manejar la eliminación de contacto
const handleDeleteContact = (contactId) => {
  emit('deleteContact', contactId)
}
</script>

<style scoped>
.list-section {
  flex: 1 1 300px;
  background: #f9f9f9;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid #e9ecef;
}

.list-section h2 {
  margin-top: 0;
  margin-bottom: 20px;
  color: #2c3e50;
  text-align: center;
  font-size: 22px;
  border-bottom: 2px solid #e9ecef;
  padding-bottom: 10px;
}

.no-contacts {
  color: #6c757d;
  text-align: center;
  padding: 40px 20px;
  background: #ffffff;
  border-radius: 8px;
  border: 2px dashed #dee2e6;
}

.no-contacts p {
  margin: 8px 0;
}

.no-contacts .hint {
  font-size: 14px;
  font-style: italic;
  color: #868e96;
}

.contact-list {
  max-height: 500px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding-right: 5px;
}

/* Personalizar scrollbar */
.contact-list::-webkit-scrollbar {
  width: 6px;
}

.contact-list::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.contact-list::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.contact-list::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
