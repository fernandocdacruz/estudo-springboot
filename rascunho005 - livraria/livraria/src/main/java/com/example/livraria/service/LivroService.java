package com.example.livraria.service;

import com.example.livraria.model.Livro;
import com.example.livraria.repository.LivroRepository;
import org.springframework.stereotype.Service;

@Service
public class LivroService {

    private final LivroRepository livroRepository;

    public LivroService(LivroRepository livroRepository) {
        this.livroRepository = livroRepository;
    }

    public Livro criarLivro(Livro livro) {
        return livroRepository.save(livro);
    }

}
