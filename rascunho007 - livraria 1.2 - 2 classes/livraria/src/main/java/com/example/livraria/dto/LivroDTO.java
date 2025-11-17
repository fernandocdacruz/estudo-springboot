package com.example.livraria.dto;

public record LivroDTO(
        Long id,
        String titulo,
        Long autorId,
        String autorNome
) {}
