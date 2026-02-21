package com.example.sistema_servicios.controller;


import com.example.sistema_servicios.dto.ClienteRequestDTO;
import com.example.sistema_servicios.dto.ClienteResponseDTO;
import com.example.sistema_servicios.service.ClienteService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clientes")
public class ClienteController {
    private final ClienteService clienteService;

    public ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    @GetMapping
    public List<ClienteResponseDTO> listar() {
        return clienteService.listarTodos();
    }

    @GetMapping("/{id}")
    public ClienteResponseDTO buscar(@PathVariable Long id) {
        return clienteService.buscarPorId(id);
    }

    @PostMapping
    public ClienteResponseDTO crear(
            @Valid @RequestBody ClienteRequestDTO request) {
        return clienteService.guardar(request);
    }

    @PutMapping("/{id}")
    public ClienteResponseDTO actualizar(
            @PathVariable Long id,
            @Valid @RequestBody ClienteRequestDTO request) {
        return clienteService.actualizar(id, request);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        clienteService.eliminar(id);
    }
}
