package io.github.fernandocdacruz.Alunos.API.repository;

import io.github.fernandocdacruz.Alunos.API.model.Aluno;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AlunoRepository extends JpaRepository<Aluno, String> {
    List<Aluno> findByNome(String nome);
}
