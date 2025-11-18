package com.example.tela_login.controller;

import com.example.tela_login.dto.LoginDto;
import com.example.tela_login.model.Usuario;
import com.example.tela_login.service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tela-login")
@CrossOrigin(origins = "*")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping
    public List<Usuario> listarTodosUsuarios() {
        return usuarioService.listarTodosUsuarios();
    }

    @PostMapping("/cadastrar")
    public Usuario cadastrarUsuario(@RequestBody Usuario usuario) {
        return usuarioService.cadastrarUsuario(usuario);
    }

    @DeleteMapping("{id}")
    public void deletarUsuarioPeloId(@PathVariable Long id) {
        usuarioService.deletarUsuarioPeloId(id);
    }

    @PostMapping("/login")
    public ResponseEntity realizarLogin(@RequestBody LoginDto loginDto) {
        return usuarioService.realizarLogin(loginDto);
    }

}
