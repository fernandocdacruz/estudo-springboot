package io.github.fernandocdacruz.Alunos.API.controller;

import io.github.fernandocdacruz.Alunos.API.model.Aluno;
import io.github.fernandocdacruz.Alunos.API.repository.AlunoRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

import static org.springframework.data.jpa.domain.AbstractPersistable_.id;

@RestController
@RequestMapping("alunos")
public class AlunoController {

    private AlunoRepository alunoRepository;

    public AlunoController(AlunoRepository alunoRepository) {
        this.alunoRepository = alunoRepository;
    }

    @PostMapping
    public Aluno salvar(@RequestBody Aluno aluno) {
        System.out.println("Aluno cadastrado: " + aluno);
        var id = UUID.randomUUID().toString();
        aluno.setId(id);
        alunoRepository.save(aluno);
        return aluno;
    }

    @GetMapping("{id}")
    public Aluno obterPorId(@PathVariable("id") String id) {
        return alunoRepository.findById(id).orElse(null);
    }

    @DeleteMapping("{id}")
    public void deletar(@PathVariable("id") String id) {
        alunoRepository.deleteById(id);
    }

    @PutMapping("{id}")
    public void atualizar(@PathVariable("id") String id, @RequestBody Aluno aluno) {
        aluno.setId(id);
        alunoRepository.save(aluno);
    }

    @GetMapping
    public List<Aluno> buscar(@RequestParam("nome") String nome) {
        return alunoRepository.findByNome(nome);
    }

}
