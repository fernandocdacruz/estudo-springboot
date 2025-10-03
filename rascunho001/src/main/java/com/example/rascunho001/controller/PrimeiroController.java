package com.example.rascunho001.controller;

import com.example.rascunho001.model.Usuario;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
public class PrimeiroController {

    private List<Usuario> usuarios new ArrayList<>();

    @GetMapping("/saudacao")
    // /saudacao?nome=Fer
    public String saudações(String nome) {
        return "Bem vindo " + (nome != null ? nome : "Visitante") + "!";
    }

    @GetMapping("/saudacao2/{nome}")
    public String saudacaoPath(@PathVariable String nome) {
        return "Olá, " + nome + "!";
    }

    @GetMapping("/hello")
    public String hello() {
        return "hello !";
    }

    @GetMapping("/usuarios")
    public void listarUsuarios() {
        for (Usuario usuario : usuarios) {
            
        }
    }

}
