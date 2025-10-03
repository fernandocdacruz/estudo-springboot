package com.ferman.rascunho002.controller;

import com.ferman.rascunho002.model.Usuario;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class PrimeiroController {

    private List<Usuario> usuarios = new ArrayList<>();

    @GetMapping
    public String bemVindo() {
        return "Seja bem vindo usuário !!!";
    }

    @GetMapping("/usuarios")
    public List<Usuario> listarUsuarios() {
        return usuarios;
    }

    @PostMapping("/usuarios")
    public Usuario criarUsuario(@RequestBody Usuario usuario) {
        usuarios.add(usuario);
        return usuario;
    }

}
