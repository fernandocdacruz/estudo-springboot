package com.example.produtos.service;

import com.example.produtos.component.CalculadoraPrecoVenda;
import com.example.produtos.model.Produto;
import com.example.produtos.repository.ProdutoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProdutoService {

    private final ProdutoRepository produtoRepository;
    private final CalculadoraPrecoVenda calculadora;

    public ProdutoService(ProdutoRepository produtoRepository, CalculadoraPrecoVenda calculadora) {
        this.produtoRepository = produtoRepository;
        this.calculadora = calculadora;
    }

    public List<Produto> listarTodos() {
        List<Produto> produtos = produtoRepository.findAll();
        produtos.forEach((calculadora::calcular));
        return produtos;
    }

    public Produto salvar(Produto produto) {
        return calculadora.calcular((produtoRepository.save(produto)));
    }

    public Produto atualizar(Integer id, Produto dados) {
        Produto existente = produtoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));
        existente.setNome(dados.getNome());
        existente.setDescricao(dados.getDescricao());
        existente.setQuantidade(dados.getQuantidade());
        existente.setCusto(dados.getCusto());
        produtoRepository.save(existente);
        return calculadora.calcular(existente);
    }

    public void deletar(Integer id) {
        produtoRepository.deleteById(id);
    }

    public Produto buscarPorId(Integer id) {
        return calculadora.calcular(produtoRepository.findById(id).orElseThrow(() -> new RuntimeException("Produto não encontrado")));
    }
}
