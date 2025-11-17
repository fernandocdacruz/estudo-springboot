interface Livro {
    id: number;
    nome: string;
    autor: string;
}

const apiUrl = "http://localhost:8080/api/livraria";
const listaLivros = document.getElementById("listaLivros") as HTMLUListElement;
const livroForm = document.getElementById("livroForm") as HTMLFormElement;
const inNome = document.getElementById("inNome") as HTMLInputElement;
const inAutor = document.getElementById("inAutor") as HTMLInputElement;

let editandoId: number | null = null;

async function carregarLivros(): Promise<void> {
    const res = await fetch(apiUrl);
    const livros: Livro[] = await res.json();
    listaLivros.innerHTML = "";

    livros.forEach(livro => {
        const li = document.createElement("li");
        li.dataset.id = livro.id.toString();
        li.textContent = `${livro.nome} - ${livro.autor} `;

        const btnDelete = document.createElement("button");
        btnDelete.textContent = "Excluir";
        btnDelete.addEventListener("click", async (): Promise<void> => {
            await fetch(`${apiUrl}/${livro.id}`, { method: "DELETE" });
            await carregarLivros();
        });

        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.addEventListener("click", (): void => {
            inNome.value = livro.nome;
            inAutor.value = livro.autor;
            editandoId = livro.id;
        });

        li.appendChild(btnDelete);
        li.appendChild(btnEditar);
        listaLivros.appendChild(li);
    });
}

livroForm.addEventListener("submit", async (e: Event): Promise<void> => {
    e.preventDefault();
    const livro = { nome: inNome.value, autor: inAutor.value };

    if (editandoId !== null) {
        await fetch(`${apiUrl}/${editandoId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(livro)
        });
        editandoId = null;
    } else {
        await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(livro)
        });
    }

    inNome.value = "";
    inAutor.value = "";
    await carregarLivros();
});

carregarLivros();


