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
// Endereço APIs
const apiUrlAutores = "http://localhost:8080/api/autores";
//Variáveis
const cadastrarAutorForm = document.getElementById("cadastrarAutorForm");
const inNomeAutor = document.getElementById("inNomeAutor");
const listaAutores = document.getElementById("listaAutores");
let editandoId = null;
function carregarAutores() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(apiUrlAutores);
        const autores = yield res.json();
        listaAutores.innerHTML = "";
        autores.forEach(autor => {
            const li = document.createElement("li");
            li.dataset.id = autor.id.toString();
            const spanNome = document.createElement("span");
            spanNome.textContent = autor.nome;
            const btnDelete = document.createElement("button");
            btnDelete.textContent = "Excluir";
            btnDelete.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
                yield fetch(`${apiUrlAutores}/${autor.id}`, { method: "DELETE" });
                yield carregarAutores();
            }));
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
    });
}
cadastrarAutorForm.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const autor = { nome: inNomeAutor.value };
    if (editandoId !== null) {
        yield fetch(`${apiUrlAutores}/${editandoId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(autor)
        });
        editandoId = null;
    }
    else {
        yield fetch(apiUrlAutores, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(autor)
        });
    }
    inNomeAutor.value = "";
    inNomeAutor.focus();
    yield carregarAutores();
}));
carregarAutores();
