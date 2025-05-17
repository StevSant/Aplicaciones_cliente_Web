// Se usa ^ y $ cuandp la cadena debe coincidir completamente
// Regex es una herramienta de caracteres especiales que permiten definir patrones

// .  Cualquier carácter (excepto salto de línea)
// \d  Dígito (0-9)
// \w  Caracter alfanumérico (letras, números, guion bajo)
// \s  Espacio en blanco
// \D  No dígito
// \W  No alfanumérico
// \S  No espacio en blanco

// *  0 o más veces
// +  1 o más veces
// ?  0 o 1 vez
// {n}  Exactamente n veces
// {n,}  n o más veces
// {n,m} 	Entre n y m veces

// ^ 	Inicio de línea
// $ 	Fin de línea

// [abc] 	a, b o c
// [^abc] 	Cualquier cosa excepto a, b o c
// [a-z] 	Rango de letras de la a a la z

function validateEmail(email) {
  // ^            → Inicio de la cadena
  // [^\s@]+      → Uno o más caracteres que NO sean espacio (\s) ni @
  // @            → Símbolo arroba obligatorio
  // [^\s@]+      → Uno o más caracteres que NO sean espacio ni @ (parte del dominio)
  // \.           → Punto literal (el punto se escapa con \)
  // [^\s@]+      → Uno o más caracteres (ej: "com", "org", etc.)
  // $            → Fin de la cadena
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return regex.test(email);
}

function validateOnlyNumbers(string) {
  // ^        → Inicio de la cadena
  // [0-9]+   → Uno o más dígitos entre 0 y 9
  // $        → Fin de la cadena
  const regex = /^[0-9]+$/;

  return regex.test(string);
}

function validateString(cadena) {
  // ^                             → Inicio de la cadena
  // [                            → Inicio del conjunto permitido:
  //   A-Za-z                     → Letras mayúsculas y minúsculas en inglés
  //   ÁÉÍÓÚáéíóúÑñÜü             → Letras especiales usadas en español
  //   \s                         → Espacios
  // ]+                            → Uno o más caracteres válidos
  // $                             → Fin de la cadena
  const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/;

  return regex.test(cadena);
}

function validateAllFields(event) {
  event.preventDefault();

  const form = document.getElementById("formAddPerson");

  const validations = [
    {
      name: "id",
      validator: (id) => validateOnlyNumbers(id) && id.length === 10,

      message:
        "La identificación debe contener solo números y tener solo 10 digitos.",
    },
    {
      name: "email",
      validator: validateEmail,
      message: "El correo electrónico no es válido.",
    },
    {
      name: "name",
      validator: validateString,
      message: "El nombre debe contener solo letras.",
    },
    {
      name: "lastName",
      validator: validateString,
      message: "El apellido debe contener solo letras.",
    },
    {
      name: "age",
      validator: validateOnlyNumbers,
      message: "La edad debe ser numérica.",
    },
    {
      name: "country",
      validator: validateString,
      message: "El país debe contener solo letras.",
    },
  ];

  for (const field of validations) {
    const value = form.elements[field.name].value;
    if (!field.validator(value)) {
      alert(field.message);
      return;
    }
  }

  alert("Todos los campos son válidos. ¡Formulario enviado!");
}

document
  .getElementById("formAddPerson")
  .addEventListener("submit", validateAllFields);
