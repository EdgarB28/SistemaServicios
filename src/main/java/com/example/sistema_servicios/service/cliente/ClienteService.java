package com.example.sistema_servicios.service.cliente;
import com.example.sistema_servicios.dto.cliente.ClienteRequestDTO;
import com.example.sistema_servicios.dto.cliente.ClienteResponseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ClienteService {

    ClienteResponseDTO buscarPorId(Long id);

    ClienteResponseDTO guardar(ClienteRequestDTO request);

    ClienteResponseDTO actualizar(Long id, ClienteRequestDTO request);

    void eliminar(Long id);

    Page<ClienteResponseDTO> listarPaginado(Pageable pageable);
}
