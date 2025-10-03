package com.example.to_do_list.model.entities;

import jakarta.persistence.*;

@Entity
@Table(name="tarefas")
public class Tarefa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Integer id;

    @Column(name="tarefa")
    private String tarefa;

    public Tarefa() {
    }

    public Tarefa(String tarefa) {
        this.tarefa = tarefa;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTarefa() {
        return tarefa;
    }

    public void setTarefa(String tarefa) {
        this.tarefa = tarefa;
    }

}
