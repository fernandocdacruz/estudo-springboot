package com.example.livraria.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Entity
@Table(name = "livro")
@Data
@NoArgsConstructor
@RequiredArgsConstructor
public class Livro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    @Column(name = "nome", nullable = false, length = 150)
    private String nome;

    @NonNull
    @Column(name = "autor", nullable = false, length = 150)
    private String autor;

}
