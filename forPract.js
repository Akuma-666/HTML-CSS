const button = document.getElementById("gerar");
const lista = document.getElementById("lista");
const inputNumero = document.getElementById("numero");

button.addEventListener("click", function() {
    const num = Number(inputNumero.value);

    if (!inputNumero.value) {
        alert("Por favor, digite um número!");
        return;
    }

    lista.innerHTML = "";

    for (let i = 1; i <= 10; i++) {
        const item = document.createElement("li");
        
        item.textContent = `${num} x ${i} = ${num * i}`;
        
        lista.appendChild(item);
    }
});