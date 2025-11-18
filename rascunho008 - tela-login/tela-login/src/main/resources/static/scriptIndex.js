const apiUrl = "http://localhost:8080/api/tela-login/login";

const inLogin = document.getElementById("inLogin");
const inSenha = document.getElementById("inSenha");
const loginForm = document.getElementById("formLogin");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const loginDto = {login: inLogin.value, senha: inSenha.value};
    
    const resposta = await fetch(apiUrl, {
        method: "POST",
        headers:  {"Content-type": "application/json"},
        body: JSON.stringify(loginDto)
    });

    if (resposta.ok) {
        window.location.href = "homeUsuario.html";
    } else {
        alert(await resposta.text());
        inLogin.value = "";
        inSenha.value = "";
        inLogin.focus();
    }

})

