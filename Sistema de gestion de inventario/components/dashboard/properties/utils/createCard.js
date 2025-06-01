export function createPropertyCard(p, coursesData, categoriesData) {


  // Crear una tarjeta de propiedad
  const course = coursesData.find((c) => c.id === p.courseId);
  const category = categoriesData.find((cat) => cat.id === p.categoryId);


  return `
  <div class="list-card">
    <div class="card-content">
      <div class="card-info">
        <h3>${p.name}</h3>
        <p><strong>ID:</strong> ${p.id}</p>
        <p><strong>Categoría:</strong> ${category ? category.name : "N/A"} (#${
    p.categoryId
  })</p>
        <p><strong>Curso:</strong> ${course ? course.name : "N/A"} (#${
    p.courseId
  })</p>
      </div>
      <div class="card-actions">
        <button class="edit-btn" data-id="${p.id}">✏️</button>
        <button class="delete-btn" data-id="${p.id}">🗑️</button>
      </div>
    </div>
  </div>`;
}
