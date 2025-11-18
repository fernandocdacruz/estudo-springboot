const apiUrl = "http://localhost:8080/api/tela-login/cadastrar"

const inNome =  document.getElementById("inNome");
const inLogin = document.getElementById("inLogin");
const inSenha = document.getElementById("inSenha");
const formCadastro = document.getElementById("formCadastro");

formCadastro.addEventListener("submit", async (e) => {
    e.preventDefault();
    const usuario = { nome: inNome.value, login: inLogin.value , senha: inSenha.value}
    await fetch(apiUrl, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(usuario)
    });
    inNome.value = "";
    inLogin.value = "";
    inSenha.value = "";
    window.location.replace("cadastroRealizado.html");
})