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

interface LivroDTO {
    id: number;
    titulo: string;
    autorId: number;
    autorNome: string;
}

const apiUrlAutores1 = "http://localhost:8080/api/autores";
const apiUrlLivraria = "http://localhost:8080/api/livraria";

const selectAutor = document.getElementById("selectAutor") as HTMLSelectElement;
const cadastrarLivroForm = document.getElementById("cadastrarLivroForm") as HTMLFormElement;
const inNomeLivro = document.getElementById("inNomeLivro") as HTMLInputElement;
const listaLivros = document.getElementById("listaLivros") as HTMLUListElement;

let editandoIdLivro: number | null = null;

async function carregarAutoresSelect(): Promise<void> {
    const res = await fetch(apiUrlAutores1);
    const autores: Autor[] = await res.json();
    console.log(autores);
    // Limpa opções atuais, mantendo o placeholder
    selectAutor.innerHTML = `<option value="">Selecione um autor</option>`;

    autores.forEach(autor => {
        const option = document.createElement("option");
        option.value = autor.id.toString(); // ID do autor
        option.textContent = autor.nome;
        selectAutor.appendChild(option);
    });
}

async function carregarLivros(): Promise<void> {
    const res = await fetch(apiUrlLivraria);
    const livros: LivroDTO[] = await res.json();  // Aqui muda para LivroDTO[]
    listaLivros.innerHTML = "";

    livros.forEach(livro => {
        const li = document.createElement("li");
        li.dataset.id = livro.id.toString();

        const spanTitulo = document.createElement("span");
        spanTitulo.textContent = `${livro.titulo}, ${livro.autorNome}`;

        const btnDelete = document.createElement("button");
        btnDelete.textContent = "Excluir";
        btnDelete.addEventListener("click", async () => {
            await fetch(`${apiUrlLivraria}/${livro.id}`, { method: "DELETE" });
            await carregarLivros();
        });

        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.addEventListener("click", () => {
            inNomeLivro.value = livro.titulo;
            editandoIdLivro = livro.id;
        });

        li.appendChild(spanTitulo);
        li.appendChild(btnDelete);
        li.appendChild(btnEditar);
        listaLivros.appendChild(li);
    });
}


cadastrarLivroForm.addEventListener("submit", async (e: Event): Promise<void> => {
    e.preventDefault();

       const livro = {
        titulo: inNomeLivro.value,
        autor: {
            id: Number(selectAutor.value)
        }
    };

    if (editandoIdLivro !== null) {
        await fetch(`${apiUrlLivraria}/${editandoIdLivro}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(livro)
        });
        editandoIdLivro = null;
    } else {
        await fetch(apiUrlLivraria, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(livro)
        });
    }

    inNomeLivro.value = "";
    selectAutor.selectedIndex = 0;
    await carregarLivros();

})

carregarLivros();
carregarAutoresSelect();