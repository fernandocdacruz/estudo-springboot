const apiUrl = "http://localhost:8080/api/livraria";
const listaLivros = document.getElementById("listaLivros");
const livroForm = document.getElementById("livroForm");
const inNome = document.getElementById("inNome");
const inAutor = document.getElementById("inAutor");

async function carregarLivros() {
    const res = await fetch(apiUrl);
    const livros = await res.json();
    listaLivros.innerHTML = "";
    livros.forEach(livro => {
        const li = document.createElement("li");
        li.textContent = livro.nome + " - " + livro.autor + " ";
        listaLivros.appendChild(li);
    });
}

livroForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const livro = { nome: inNome.value, autor: inAutor.value}
    await fetch(apiUrl, {
        method: "POST",
        headers: {"Content-Type": "application/json" },
        body: JSON.stringify(livro)
    });
    inNome.value = "";
    inAutor.value = "";
    carregarLivros();
})

carregarLivros();