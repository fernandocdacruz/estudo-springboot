package com.example.livraria.controller;

import com.example.livraria.model.Livro;
import com.example.livraria.service.LivroService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/livraria")
@CrossOrigin(origins = "*")
public class LivroController {

    private final LivroService livroService;

    public LivroController(LivroService livroService) {
        this.livroService = livroService;
    }

    @GetMapping
    public List<Livro> listarLivros() {
        return livroService.listarLivros();
    }

    @PostMapping
    public Livro salvarLivro(@RequestBody Livro livro) {
        return livroService.salvarLivro(livro);
    }

    @DeleteMapping("{id}")
    public void deletarLivro(@PathVariable Long id) {
        livroService.deletarLivro(id);
    }

    @PutMapping("{id}")
    public Livro atualizarLivro(@PathVariable Long id, @RequestBody Livro livro) {
        return livroService.atualizarLivro(id, livro);
    }


}
