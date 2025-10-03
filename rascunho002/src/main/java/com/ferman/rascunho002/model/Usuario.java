package com.ferman.rascunho002.model;

public class Usuario {

    private int id;
    private String nome;

    public Usuario() {
    }

    public Usuario(int id, String nome) {
        this.id = id;
        this.nome = nome;
    }

    public int getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }
}
