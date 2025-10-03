package com.example.aluno_api.controller;

import jakarta.validation.Valid;
import com.example.aluno_api.model.entities.Aluno;
import jakarta.websocket.server.PathParam;
import org.springframework.web.bind.annotation.*;
import com.example.aluno_api.services.AlunoService;

import java.util.List;

@RestController
@RequestMapping("/api/alunos")
public class AlunoController {

    private final AlunoService alunoService;

    public AlunoController(AlunoService alunoService) {
        this.alunoService = alunoService;
    }

    @PostMapping
    public Aluno salvaAluno(@RequestBody @Valid Aluno aluno) {
        return alunoService.salvarAluno(aluno);
    }

    @GetMapping
    public List<Aluno> retornarTodosAlunos() {
        return alunoService.retornarTodosAlunos();
    }

    @DeleteMapping("/{id}")
    public void deletarPeloId(@PathVariable Integer id) {
        alunoService.deletarAlunoPorId(id);
    }

    @PutMapping("/{id}")
    public Aluno atualizarAluno(@PathVariable Integer id, @RequestBody Aluno dadosAtualizados) {
        return alunoService.atualizarAluno(id, dadosAtualizados);
    }

    @GetMapping("/verificar/{id}")
    public String verificarSituacao(@PathVariable Integer id) {
        return alunoService.verificarSituacao(id);
    }


}
