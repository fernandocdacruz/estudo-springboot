package com.example.tela_login.service;

import com.example.tela_login.dto.LoginDto;
import com.example.tela_login.model.Usuario;
import com.example.tela_login.repository.UsuarioRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public List<Usuario> listarTodosUsuarios() {
        return usuarioRepository.findAll();
    }

    public Usuario cadastrarUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public void deletarUsuarioPeloId(Long id) {
        usuarioRepository.deleteById(id);
    }

    public ResponseEntity realizarLogin(LoginDto loginDto) {
        Optional<Usuario> usuarioOptional = usuarioRepository.findByLogin(loginDto.login());

        if (usuarioOptional.isEmpty()) {
            return ResponseEntity.status(401).body("Usuário não encontrado.");
        }

        Usuario usuario = usuarioOptional.get();

        if (!usuario.getSenha().equals(loginDto.senha())) {
            return ResponseEntity.status(401).body("Senha incorreta.");
        }

        return ResponseEntity.ok("Login realizado com sucesso!");

    }
}
