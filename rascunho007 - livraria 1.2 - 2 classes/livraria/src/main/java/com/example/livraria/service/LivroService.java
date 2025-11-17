package com.example.livraria.service;

import com.example.livraria.dto.LivroDTO;
import jakarta.transaction.Transactional;
import com.example.livraria.model.Livro;
import org.springframework.stereotype.Service;
import com.example.livraria.repository.LivroRepository;

import java.util.List;

@Service
@Transactional
public class LivroService {

    private final LivroRepository livroRepository;

    public LivroService(LivroRepository livroRepository) {
        this.livroRepository = livroRepository;
    }

    public List<Livro> listar() {
        return livroRepository.findAll();
    }

    public Livro salvar(Livro livro) {
        return livroRepository.save(livro);
    }

    public Livro atualizar(Long id, Livro novo) {
        return livroRepository.findById(id)
                .map(l -> {
                    l.setTitulo(novo.getTitulo());
                    l.setAutor(novo.getAutor());
                    return livroRepository.save(l);
                })
                .orElseThrow(() -> new RuntimeException("Livro não encontrado"));
    }

    public void deletar(Long id) {
        livroRepository.deleteById(id);
    }

    public LivroDTO toDTO(Livro livro) {
        return new LivroDTO(
                livro.getId(),
                livro.getTitulo(),
                livro.getAutor().getId(),
                livro.getAutor().getNome()
        );
    }

}
