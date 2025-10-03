package com.example.to_do_list.controller;

import com.example.to_do_list.model.entities.Tarefa;
import com.example.to_do_list.model.repositories.TarefaRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/to-do-list")
public class TarefaController {

    private TarefaRepository repository;

    public TarefaController(TarefaRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public Tarefa inserirTarefa(@RequestBody Tarefa tarefa) {
        return repository.save(tarefa);
    }

    @GetMapping
    public List<Tarefa> listarTodasTarefas() {
        return repository.findAll();
    }

    @DeleteMapping("/{id}")
    public void deletarTarefaPorId(@PathVariable Integer id) {
        repository.deleteById(id);
    }



}
