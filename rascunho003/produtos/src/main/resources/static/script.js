/* script.js - front simples para consumir /api/produtos
   coloque este arquivo em src/main/resources/static/
*/

const apiUrl = "/api/produtos"; // relativo ao host onde o Spring roda
const produtoListEl = document.getElementById("produtoList");
const form = document.getElementById("produtoForm");
const inputId = document.getElementById("produtoId");
const inputNome = document.getElementById("nome");
const inputQuantidade = document.getElementById("quantidade");
const inputDescricao = document.getElementById("descricao");
const inputCusto = document.getElementById("custo");
const feedbackEl = document.getElementById("feedback");
const btnCancelar = document.getElementById("btnCancelar");
const btnRefresh = document.getElementById("btnRefresh");
const searchEl = document.getElementById("search");
const formTitle = document.getElementById("form-title");

function showFeedback(text, ok = true, time = 3000) {
  feedbackEl.textContent = text;
  feedbackEl.style.color = ok ? "green" : "crimson";
  feedbackEl.classList.remove("hidden");
  setTimeout(()=> feedbackEl.classList.add("hidden"), time);
}

function escapeHtml(s) {
  if (s == null) return "";
  return String(s).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;");
}

async function carregarProdutos(q = "") {
  try {
    const url = q ? `${apiUrl}?q=${encodeURIComponent(q)}` : apiUrl;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Falha ao carregar: ${res.status}`);
    const produtos = await res.json();
    produtoListEl.innerHTML = "";
    produtos.forEach(p => {
      const li = document.createElement("li");
      li.className = "prod-item";

      const info = document.createElement("div");
      info.className = "prod-info";
      info.innerHTML = `
        <div><span class="tag">${escapeHtml(p.nome)}</span></div>
        <div class="small">${escapeHtml(p.descricao || "")}</div>
        <div class="small">Quantidade: ${p.quantidade ?? 0} • Custo: R$ ${Number(p.custo).toFixed(2)}</div>
      `;

      const right = document.createElement("div");
      right.style.display = "flex";
      right.style.alignItems = "center";
      right.style.gap = "12px";

      const preco = document.createElement("div");
      preco.className = "price";
      preco.textContent = `Venda: R$ ${Number(p.precoVenda ?? (p.custo * 1.2)).toFixed(2)}`;

      const actions = document.createElement("div");
      actions.className = "prod-actions";

      const btnEdit = document.createElement("button");
      btnEdit.className = "btn btn-edit";
      btnEdit.textContent = "Editar";
      btnEdit.onclick = () => preencherForm(p);

      const btnDel = document.createElement("button");
      btnDel.className = "btn btn-del";
      btnDel.textContent = "Excluir";
      btnDel.onclick = async () => {
        if (!confirm(`Excluir "${p.nome}"?`)) return;
        const dres = await fetch(`${apiUrl}/${p.id}`, { method: "DELETE" });
        if (!dres.ok) { showFeedback("Erro ao excluir", false); return; }
        showFeedback("Excluído");
        carregarProdutos(searchEl.value.trim());
      };

      actions.appendChild(btnEdit);
      actions.appendChild(btnDel);

      right.appendChild(preco);
      right.appendChild(actions);

      li.appendChild(info);
      li.appendChild(right);
      produtoListEl.appendChild(li);
    });
  } catch(err) {
    console.error(err);
    showFeedback("Erro ao carregar produtos", false);
  }
}

function preencherForm(p) {
  inputId.value = p.id ?? "";
  inputNome.value = p.nome ?? "";
  inputQuantidade.value = p.quantidade ?? 0;
  inputDescricao.value = p.descricao ?? "";
  inputCusto.value = p.custo ?? 0;
  formTitle.textContent = p.id ? "Editar Produto" : "Novo Produto";
}

form.addEventListener("submit", async (ev) => {
  ev.preventDefault();
  const id = inputId.value;
  const payload = {
    nome: inputNome.value.trim(),
    quantidade: Number(inputQuantidade.value),
    descricao: inputDescricao.value.trim(),
    custo: Number(inputCusto.value)
  };

  if (!payload.nome) { showFeedback("Nome obrigatório", false); return; }

  try {
    const method = id ? "PUT" : "POST";
    const url = id ? `${apiUrl}/${id}` : apiUrl;
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      const txt = await res.text().catch(()=>null);
      console.error("Erro salvar:", res.status, txt);
      showFeedback("Erro ao salvar", false);
      return;
    }
    const saved = await res.json().catch(()=>null);
    showFeedback(id ? "Atualizado" : "Salvo");
    form.reset();
    inputId.value = "";
    formTitle.textContent = "Novo Produto";
    carregarProdutos(searchEl.value.trim());
  } catch(err) {
    console.error(err);
    showFeedback("Erro ao salvar", false);
  }
});

btnCancelar.addEventListener("click", () => {
  form.reset(); inputId.value = ""; formTitle.textContent = "Novo Produto";
});

btnRefresh.addEventListener("click", () => carregarProdutos(searchEl.value.trim()));

let debounce;
searchEl.addEventListener("input", (e) => {
  clearTimeout(debounce);
  debounce = setTimeout(()=> carregarProdutos(e.target.value.trim()), 250);
});

// inicial
carregarProdutos();
