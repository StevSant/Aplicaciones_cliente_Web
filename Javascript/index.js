function calculateResults() {
    const num1 = parseFloat(document.getElementById("num1").value);
    const num2 = parseFloat(document.getElementById("num2").value);
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    if (isNaN(num1) || isNaN(num2)) {
        resultsDiv.innerHTML = `<div class="error">⚠️ Por favor, ingresa dos números válidos.</div>`;
        return;
    }

    const operations = [
        { iteration: "PRIMERA", name: "SUMA", result: num1 + num2 },
        { iteration: "SEGUNDA", name: "RESTA", result: num1 - num2 },
        { iteration: "TERCERA", name: "MULTIPLICACIÓN", result: num1 * num2 },
        {
            iteration: "CUARTA",
            name: "DIVISIÓN",
            result: num2 !== 0 ? (num1 / num2).toFixed(2) : "No se puede dividir por cero",
        },
        {
            iteration: "QUINTA",
            name: "MÓDULO",
            result: num2 !== 0 ? num1 % num2 : "No se puede calcular el módulo con cero",
        },
    ];

    operations.forEach(({ iteration, name, result }) => {
        const item = document.createElement("div");
        item.className = "result-item";
        item.textContent = `En la ${iteration} iteración: ${name} de ${num1} y ${num2} = ${result}`;
        resultsDiv.appendChild(item);
    });
}
