package com.example.livraria.controller;

import com.example.livraria.model.Livro;
import com.example.livraria.service.LivroService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/livraria")
@CrossOrigin("*")
public class LivroController {

    private LivroService livroService;

    public LivroController(LivroService livroService) {
        this.livroService = livroService;
    }

    @PostMapping
    public Livro criarLivro(@RequestBody Livro livro) {
        return livroService.criarLivro(livro);
    }

}
