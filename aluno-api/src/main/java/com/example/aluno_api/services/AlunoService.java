package com.example.aluno_api.services;

import com.example.aluno_api.model.entities.Aluno;
import org.springframework.stereotype.Service;
import com.example.aluno_api.repository.AlunoRepository;

import java.util.List;
import java.util.Optional;

//Parei aqui. Fazer uma exception personalizada ?

@Service
public class AlunoService {


    private final AlunoRepository alunoRepository;

    public AlunoService(AlunoRepository alunoRepository) {
        this.alunoRepository = alunoRepository;
    }

    public Aluno salvarAluno(Aluno aluno) {
        return alunoRepository.save(aluno);
    }

    public List<Aluno> retornarTodosAlunos() {
        return alunoRepository.findAll();
    }

    public void deletarAlunoPorId(Integer id) {
        alunoRepository.deleteById(id);
    }

    public Aluno atualizarAluno(Integer id, Aluno dadosAtualizados) {
        return alunoRepository.findById(id)
                .map(alunoExistente -> {
                    alunoExistente.setNome(dadosAtualizados.getNome());
                    alunoExistente.setNota1(dadosAtualizados.getNota1());
                    alunoExistente.setNota2(dadosAtualizados.getNota2());
                    return alunoRepository.save(alunoExistente);
                })
                .orElseThrow(() -> new RuntimeException("Aluno não encontrado com id " + id));
    }

    public String verificarSituacao(Integer id) {
        Optional<Aluno> alunoOpt = alunoRepository.findById(id);
        if (alunoOpt.isPresent()) {
            Aluno aluno = alunoOpt.get();
            double media = (aluno.getNota1() + aluno.getNota2()) / 2;
            return media >= 6.0
                    ? "Aluno: " + aluno.getNome() + " - Aprovado - Média: " + media
                    : "Aluno: " + aluno.getNome() + " - Reprovado - Média: " + media;
        } else {
            return "Aluno não encontrado.";
        }
    }

}
