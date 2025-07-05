<script setup>
import { ref } from "vue";
import ContactForm from './components/ContactForm.vue'
import ContactList from './components/ContactList.vue'

// Estado principal de la aplicación
const contacts = ref([
  { id: 1, name: "Juan Pérez", phone: "555-0123", email: "juan@email.com" },
  { id: 2, name: "María García", phone: "555-0456", email: "maria@email.com" },
]);

// Manejar la adición de un nuevo contacto
const handleAddContact = (newContact) => {
  contacts.value.push(newContact);
};

// Manejar la eliminación de un contacto
const handleDeleteContact = (contactId) => {
  contacts.value = contacts.value.filter(contact => contact.id !== contactId);
};
</script>

<template>
  <div class="app-container">
    <header class="app-header">
      <h1>📱 Lista de Contactos</h1>
      <p class="app-subtitle">Gestiona tus contactos de manera simple y eficiente</p>
    </header>

    <main class="app-main">
      <div class="grid-container">
        <!-- Componente de formulario -->
        <ContactForm @addContact="handleAddContact" />
        
        <!-- Componente de lista -->
        <ContactList 
          :contacts="contacts" 
          @deleteContact="handleDeleteContact" 
        />
      </div>
    </main>

    <footer class="app-footer">
      <p>💡 Aplicación Vue.js con arquitectura de componentes</p>
    </footer>
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.app-header {
  text-align: center;
  margin-bottom: 40px;
  background: rgba(255, 255, 255, 0.95);
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
}

.app-header h1 {
  margin: 0 0 10px 0;
  color: #2c3e50;
  font-size: 2.5rem;
  font-weight: 700;
}

.app-subtitle {
  margin: 0;
  color: #6c757d;
  font-size: 1.1rem;
  font-weight: 400;
}

.app-main {
  max-width: 1200px;
  margin: 0 auto;
}

.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  align-items: start;
}

.app-footer {
  text-align: center;
  margin-top: 40px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  backdrop-filter: blur(10px);
}

.app-footer p {
  margin: 0;
  color: #ffffff;
  font-size: 14px;
  font-weight: 300;
}

/* Responsive Design */
@media (max-width: 768px) {
  .app-container {
    padding: 15px;
  }
  
  .app-header {
    padding: 20px;
    margin-bottom: 30px;
  }
  
  .app-header h1 {
    font-size: 2rem;
  }
  
  .app-subtitle {
    font-size: 1rem;
  }
  
  .grid-container {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}

@media (max-width: 480px) {
  .app-header h1 {
    font-size: 1.8rem;
  }
  
  .app-subtitle {
    font-size: 0.9rem;
  }
}
</style>
