package com.example.tela_login.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Entity
@Table(name = "usuarios")
@Data
@NoArgsConstructor
@RequiredArgsConstructor
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    @Column(name = "nome", nullable = false, length = 150)
    private String nome;

    @NonNull
    @Column(name = "login", nullable = false, length = 150)
    private String login;

    @NonNull
    @Column(name = "senha", nullable = false, length = 150)
    private String senha;

}
