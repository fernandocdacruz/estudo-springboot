interface Livro {
    id: number;
    titulo: string;
    autor: Autor; // agora é do tipo Autor
}

interface Autor {
    id: number;
    nome: string;
    livros: Livro[]
}

// Endereço APIs
const apiUrlAutores = "http://localhost:8080/api/autores"


//Variáveis
const cadastrarAutorForm = document.getElementById("cadastrarAutorForm") as HTMLFormElement;
const inNomeAutor = document.getElementById("inNomeAutor") as HTMLInputElement;
const listaAutores = document.getElementById("listaAutores") as HTMLUListElement;

let editandoId: number | null = null;

async function carregarAutores(): Promise<void> {
    const res = await fetch(apiUrlAutores);
    const autores: Autor[] = await res.json();
    listaAutores.innerHTML = "";

    autores.forEach(autor => {
        const li = document.createElement("li");
        li.dataset.id = autor.id.toString();

        const spanNome = document.createElement("span");
        spanNome.textContent = autor.nome;

        const btnDelete = document.createElement("button");
        btnDelete.textContent = "Excluir";
        btnDelete.addEventListener("click", async () => {
            await fetch(`${apiUrlAutores}/${autor.id}`, { method: "DELETE" });
            await carregarAutores();
        });

        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.addEventListener("click", () => {
            inNomeAutor.value = autor.nome;
            editandoId = autor.id;
        });

        li.appendChild(spanNome);
        li.appendChild(btnDelete);
        li.appendChild(btnEditar);
        listaAutores.appendChild(li);
    });

}

cadastrarAutorForm.addEventListener("submit", async (e: Event): Promise<void> => {
    e.preventDefault();

    const autor = { nome: inNomeAutor.value };

    if (editandoId !== null) {
        await fetch(`${apiUrlAutores}/${editandoId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(autor)
        });
        editandoId = null;
    } else {
        await fetch(apiUrlAutores, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(autor)
        });
    }

    inNomeAutor.value = "";
    inNomeAutor.focus();
    await carregarAutores();
})

carregarAutores();
