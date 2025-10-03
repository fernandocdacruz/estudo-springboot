package com.example.produtos.component;

import com.example.produtos.model.Produto;
import org.springframework.stereotype.Component;

@Component
public class CalculadoraPrecoVenda {

    public Produto calcular(Produto produto) {
        produto.setPrecoVenda(produto.getCusto() * 1.20);
        return produto;
    }

}
