package com.example.livraria.service;

import com.example.livraria.model.Livro;
import com.example.livraria.repository.LivroRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LivroService {

    private final LivroRepository livroRepository;

    public LivroService(LivroRepository livroRepository) {
        this.livroRepository = livroRepository;
    }

    public List<Livro> listarLivros() {
        return livroRepository.findAll();
    }

    public Livro salvarLivro(Livro livro) {
        return livroRepository.save(livro);
    }

    public void deletarLivro(Long id) {
        livroRepository.deleteById(id);
    }

    public Livro atualizarLivro(Long id, Livro livroAtualizado) {
        return livroRepository.findById(id)
                .map(livro -> {
                    livro.setNome(livroAtualizado.getNome());
                    livro.setAutor(livroAtualizado.getAutor());
                    return livroRepository.save(livro);
                })
                .orElseThrow(() -> new RuntimeException("Livro não encontrado com id " + id));
    }


}
