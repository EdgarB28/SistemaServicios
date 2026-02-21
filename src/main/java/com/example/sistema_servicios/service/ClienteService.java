package com.example.sistema_servicios.service;
import com.example.sistema_servicios.dto.ClienteRequestDTO;
import com.example.sistema_servicios.dto.ClienteResponseDTO;
import com.example.sistema_servicios.entity.Cliente;

import java.util.List;
import java.util.Optional;
public interface ClienteService {

    List<ClienteResponseDTO> listarTodos();

    ClienteResponseDTO buscarPorId(Long id);

    ClienteResponseDTO guardar(ClienteRequestDTO request);

    ClienteResponseDTO actualizar(Long id, ClienteRequestDTO request);

    void eliminar(Long id);
}
