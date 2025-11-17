package com.example.livraria.controller;

import com.example.livraria.dto.LivroDTO;
import com.example.livraria.model.Livro;
import org.springframework.web.bind.annotation.*;
import com.example.livraria.service.LivroService;

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
    public List<LivroDTO> listar() {
        return livroService.listar()
                .stream()
                .map(l -> new LivroDTO(
                        l.getId(),
                        l.getTitulo(),
                        l.getAutor().getId(),
                        l.getAutor().getNome()
                ))
                .toList();
    }

    @PostMapping
    public Livro criar(@RequestBody Livro livro) {
        return livroService.salvar(livro);
    }

    @PutMapping("/{id}")
    public Livro atualizar(@PathVariable Long id, @RequestBody Livro livro) {
        return livroService.atualizar(id, livro);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        livroService.deletar(id);
    }



}
