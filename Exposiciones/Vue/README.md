# 📱 Lista de Contactos - Vue.js

Una aplicación moderna de gestión de contactos desarrollada con Vue.js 3 y Composition API, implementando una arquitectura de componentes modular y escalable.

## ✨ Características

- ➕ **Agregar contactos** con validación completa
- 👀 **Visualizar contactos** en tarjetas organizadas
- 🗑️ **Eliminar contactos** con confirmación visual
- 📱 **Diseño responsive** para todos los dispositivos
- 🎨 **Interfaz moderna** con efectos visuales
- ⚡ **Validación en tiempo real** del formulario
- ♻️ **Arquitectura modular** con componentes reutilizables

## 🛠️ Tecnologías Utilizadas

- **Vue.js 3** - Framework principal
- **Composition API** - Para lógica reactiva
- **CSS3** - Estilos y animaciones
- **Vite** - Build tool y dev server

## 🏗️ Arquitectura

La aplicación está dividida en 4 componentes principales:

- `App.vue` - Componente principal y gestión de estado
- `ContactForm.vue` - Formulario para agregar contactos
- `ContactList.vue` - Lista y contenedor de contactos  
- `ContactCard.vue` - Tarjeta individual de contacto

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js (v16 o superior)
- npm o yarn

### Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Build para producción
npm run build
```

## 📱 Funcionalidades Detalladas

### Agregar Contactos
- Formulario con validación en tiempo real
- Campos: Nombre (requerido), Teléfono (requerido), Email (opcional)
- Mensajes de error específicos
- Confirmación visual al agregar

### Gestión de Contactos
- Lista scrolleable para muchos contactos
- Información organizada con iconos
- Botón de eliminación con efectos hover
- Contador dinámico de contactos

### Diseño Responsive
- **Desktop**: Layout en 2 columnas
- **Tablet**: Layout en 1 columna
- **Mobile**: Optimizado para pantallas pequeñas

## 🎨 Características de Diseño

- **Glassmorphism** en header y footer
- **Gradientes** de fondo atractivos
- **Animaciones** suaves en hover y interacciones
- **Scroll personalizado** para mejor UX
- **Estados visuales** (loading, success, error)

## 📁 Estructura del Proyecto

```
src/
├── App.vue                 # Componente principal
├── main.js                # Entrada de la aplicación
├── components/
│   ├── ContactForm.vue    # Formulario de contactos
│   ├── ContactList.vue    # Lista de contactos
│   └── ContactCard.vue    # Tarjeta de contacto
├── assets/               # Recursos estáticos
└── style/               # Estilos globales
```

## 🔄 Flujo de Datos

La aplicación implementa el patrón **"Props Down, Events Up"**:

- Los datos fluyen hacia abajo a través de props
- Los eventos fluyen hacia arriba para comunicación entre componentes
- Estado centralizado en el componente App.vue

## 🧪 Patrones Implementados

- **Single Responsibility Principle** - Cada componente tiene una función específica
- **Composition API** - Para lógica reactiva moderna
- **Validación de Props** - Con validators personalizados
- **Event-driven Architecture** - Comunicación a través de eventos

## 📚 Documentación

Para más detalles técnicos, consulta el archivo [DOCUMENTACION.md](./DOCUMENTACION.md) que incluye:

- Descripción detallada de cada componente
- Patrones de desarrollo utilizados
- Flujo de datos y comunicación
- Posibles extensiones futuras

## 👨‍💻 Autor

Desarrollado como proyecto educativo para la materia de Aplicaciones para el Cliente Web.

---

**¡Gracias por usar nuestra aplicación de Lista de Contactos!** 🎉
