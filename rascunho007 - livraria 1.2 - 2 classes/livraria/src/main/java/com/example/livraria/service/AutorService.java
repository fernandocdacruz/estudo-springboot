package com.example.livraria.service;

import jakarta.transaction.Transactional;
import com.example.livraria.model.Autor;
import org.springframework.stereotype.Service;
import com.example.livraria.repository.AutorRepository;

import java.util.List;

@Service
@Transactional
public class AutorService {

    private final AutorRepository autorRepository;

    public AutorService(AutorRepository autorRepository) {
        this.autorRepository = autorRepository;
    }

    public List<Autor> listar() {
        return autorRepository.findAll();
    }

    public Autor salvar(Autor autor) {
        return autorRepository.save(autor);
    }

    public Autor atualizar(Long id, Autor novo) {
        return autorRepository.findById(id)
                .map(a -> {
                    a.setNome(novo.getNome());
                    return autorRepository.save(a);
                })
                .orElseThrow(() -> new RuntimeException("Autor não encontrado"));
    }

    public void deletar(Long id) {
        autorRepository.deleteById(id);
    }

}
