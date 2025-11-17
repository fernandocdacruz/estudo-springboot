const apiUrl = "http://localhost:8080/api/produtos";
const produtoListEl = document.getElementById("produtoList");
const form = document .getElementById("produtoForm");
const inputNome = document.getElementById("nome");

async function carregarProdutos() {
    const res = await fetch(apiUrl);
    const produtos = await res.json();
    produtoListEl.innerHTML = "";
    produtos.forEach(p => {
        const li = document.createElement("li");
        li.textContent = p.nome + " ";

        const btnDelete = document.createElement("button");
        btnDelete.textContent = "Excluir";
        btnDelete.addEventListener("click", async () => {
            await fetch(`${apiUrl}/${p.id}`, {
                method: "DELETE"
            });
            carregarProdutos();
        });

        const btnUpdate = document.createElement("button");
        btnUpdate.textContent = "Atualizar";
        btnUpdate.addEventListener("click", async () => {
            const novoNome = prompt("Digite o novo nome:", p.nome);
            if (novoNome) {
                await fetch(`${apiUrl}/${p.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ...p, nome: novoNome })
                });
                carregarProdutos();
            }
        });

        li.appendChild(btnDelete);
        li.appendChild(btnUpdate);
        produtoListEl.appendChild(li);
    });
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const payload = { nome: inputNome.value };
    await fetch(apiUrl, {
        method: "POST",
        headers: {"Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });
    inputNome.value = "";
    carregarProdutos();
})

carregarProdutos();