package com.example.livraria.controller;

import com.example.livraria.model.Autor;
import org.springframework.web.bind.annotation.*;
import com.example.livraria.service.AutorService;

import java.util.List;

@RestController
@RequestMapping("/api/autores")
@CrossOrigin(origins = "*")
public class AutorController {

    private final AutorService autorService;

    public AutorController(AutorService autorService) {
        this.autorService = autorService;
    }

    @GetMapping
    public List<Autor> listar() {
        return autorService.listar();
    }

    @PostMapping
    public Autor criar(@RequestBody Autor autor) {
        return autorService.salvar(autor);
    }

    @PutMapping("/{id}")
    public Autor atualizar(@PathVariable Long id, @RequestBody Autor autor) {
        return autorService.atualizar(id, autor);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        autorService.deletar(id);
    }
}
