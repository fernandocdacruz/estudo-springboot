package com.example.to_do_list.model.repositories;

import com.example.to_do_list.model.entities.Tarefa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TarefaRepository extends JpaRepository<Tarefa, Integer> {
}
