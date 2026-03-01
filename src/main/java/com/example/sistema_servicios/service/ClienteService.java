package com.example.sistema_servicios.service;
import com.example.sistema_servicios.dto.ClienteRequestDTO;
import com.example.sistema_servicios.dto.ClienteResponseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
public interface ClienteService {

    ClienteResponseDTO buscarPorId(Long id);

    ClienteResponseDTO guardar(ClienteRequestDTO request);

    ClienteResponseDTO actualizar(Long id, ClienteRequestDTO request);

    void eliminar(Long id);

    Page<ClienteResponseDTO> listarPaginado(Pageable pageable);
}
