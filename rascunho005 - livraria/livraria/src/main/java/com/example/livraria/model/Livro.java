package com.example.livraria.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import java.util.UUID;

@Entity
@Table(name = "livro")
@Data
@RequiredArgsConstructor
public class Livro {

    @Id
    @GeneratedValue(generator = "UUID")
    @org.hibernate.annotations.GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @NonNull
    @Column(name = "nome", length = 150, nullable = false)
    private String nome;

    @NonNull
    @Column(name = "autor", length = 150, nullable = false)
    private String autor;

}

