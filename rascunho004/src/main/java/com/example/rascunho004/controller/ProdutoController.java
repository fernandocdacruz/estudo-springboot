package com.example.rascunho004.controller;

import com.example.rascunho004.model.Produto;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/produtos")
@CrossOrigin(origins = "*")
public class ProdutoController {

    private List<Produto> produtos = new ArrayList<>();
    private int nextId = 1;

    @GetMapping
    public List<Produto> listar() {
        return produtos;
    }

    @PostMapping
    public Produto criar(@RequestBody Produto p) {
        p.setId(nextId++);
        produtos.add(p);
        return p;
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Integer id) {
        produtos.removeIf(p -> p.getId().equals(id));
    }

    @PutMapping("/{id}")
    public Produto atualizar(@PathVariable Integer id, @RequestBody Produto p) {
        for (Produto prod : produtos) {
            if (prod.getId().equals(id)) {
                prod.setNome(p.getNome());
                return prod;
            }
        }
        return null; // ou lançar exceção
    }


}
