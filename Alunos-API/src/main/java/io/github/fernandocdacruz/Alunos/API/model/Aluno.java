package io.github.fernandocdacruz.Alunos.API.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "alunos")
public class Aluno {

    @Id
    @Column(name = "id")
    private String id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "n1")
    private double n1;

    @Column(name = "n2")
    private double n2;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public double getN1() {
        return n1;
    }

    public void setN1(double n1) {
        this.n1 = n1;
    }

    public double getN2() {
        return n2;
    }

    public void setN2(double n2) {
        this.n2 = n2;
    }

    @Override
    public String toString() {
        return "Aluno{" +
                "id='" + id + '\'' +
                ", nome='" + nome + '\'' +
                ", n1=" + n1 +
                ", n2=" + n2 +
                '}';
    }

}
