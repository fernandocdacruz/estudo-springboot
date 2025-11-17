"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const apiUrlAutores1 = "http://localhost:8080/api/autores";
const apiUrlLivraria = "http://localhost:8080/api/livraria";
const selectAutor = document.getElementById("selectAutor");
const cadastrarLivroForm = document.getElementById("cadastrarLivroForm");
const inNomeLivro = document.getElementById("inNomeLivro");
const listaLivros = document.getElementById("listaLivros");
let editandoIdLivro = null;
function carregarAutoresSelect() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(apiUrlAutores1);
        const autores = yield res.json();
        console.log(autores);
        // Limpa opções atuais, mantendo o placeholder
        selectAutor.innerHTML = `<option value="">Selecione um autor</option>`;
        autores.forEach(autor => {
            const option = document.createElement("option");
            option.value = autor.id.toString(); // ID do autor
            option.textContent = autor.nome;
            selectAutor.appendChild(option);
        });
    });
}
function carregarLivros() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(apiUrlLivraria);
        const livros = yield res.json(); // Aqui muda para LivroDTO[]
        listaLivros.innerHTML = "";
        livros.forEach(livro => {
            const li = document.createElement("li");
            li.dataset.id = livro.id.toString();
            const spanTitulo = document.createElement("span");
            spanTitulo.textContent = `${livro.titulo}, ${livro.autorNome}`;
            const btnDelete = document.createElement("button");
            btnDelete.textContent = "Excluir";
            btnDelete.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
                yield fetch(`${apiUrlLivraria}/${livro.id}`, { method: "DELETE" });
                yield carregarLivros();
            }));
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
    });
}
cadastrarLivroForm.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const livro = {
        titulo: inNomeLivro.value,
        autor: {
            id: Number(selectAutor.value)
        }
    };
    if (editandoIdLivro !== null) {
        yield fetch(`${apiUrlLivraria}/${editandoIdLivro}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(livro)
        });
        editandoIdLivro = null;
    }
    else {
        yield fetch(apiUrlLivraria, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(livro)
        });
    }
    inNomeLivro.value = "";
    selectAutor.selectedIndex = 0;
    yield carregarLivros();
}));
carregarLivros();
carregarAutoresSelect();
