package com.example.sistema_servicios.service;

import com.example.sistema_servicios.dto.ClienteRequestDTO;
import com.example.sistema_servicios.dto.ClienteResponseDTO;
import com.example.sistema_servicios.entity.Cliente;
import com.example.sistema_servicios.exception.ConflictException;
import com.example.sistema_servicios.exception.ResourceNotFoundException;
import com.example.sistema_servicios.repository.ClienteRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;



@Service
public class ClienteServiceImpl implements ClienteService{

    private final ClienteRepository clienteRepository;

    public ClienteServiceImpl(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    @Override
    public ClienteResponseDTO buscarPorId(Long id) {
        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente no encontrado"));
        return mapToResponse(cliente);
    }

    @Override
    public ClienteResponseDTO guardar(ClienteRequestDTO request) {
        if (clienteRepository.existsByNroDocumento(request.getNroDocumento())) {
            throw new ConflictException("El documento ya existe");
        }

        Cliente cliente = mapToEntity(request);
        Cliente guardado = clienteRepository.save(cliente);

        return mapToResponse(guardado);
    }

    @Override
    public ClienteResponseDTO actualizar(Long id, ClienteRequestDTO request) {
        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente no encontrado"));

        cliente.setNombre(request.getNombre());
        cliente.setApellidos(request.getApellidos());
        cliente.setCorreo(request.getCorreo());
        cliente.setTelefono(request.getTelefono());

        Cliente actualizado = clienteRepository.save(cliente);

        return mapToResponse(actualizado);
    }

    @Override
    public void eliminar(Long id) {
        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente no encontrado"));

        cliente.setEstado(0);
        clienteRepository.save(cliente);
    }

    @Override
    public Page<ClienteResponseDTO> listarPaginado(Pageable pageable) {
        return clienteRepository.findByEstado(1, pageable)
                .map(this::mapToResponse);
    }

    // ====== MAPPERS ======

    private ClienteResponseDTO mapToResponse(Cliente cliente) {
        ClienteResponseDTO dto = new ClienteResponseDTO();
        dto.setId(cliente.getIdCliente());
        dto.setNombreCompleto(cliente.getNombre() + " " + cliente.getApellidos());
        dto.setNroDocumento(cliente.getNroDocumento());
        dto.setCorreo(cliente.getCorreo());
        dto.setTelefono(cliente.getTelefono());
        dto.setEstado(cliente.getEstado());
        return dto;
    }

    private Cliente mapToEntity(ClienteRequestDTO request) {
        Cliente cliente = new Cliente();
        cliente.setNombre(request.getNombre());
        cliente.setApellidos(request.getApellidos());
        cliente.setNroDocumento(request.getNroDocumento());
        cliente.setCorreo(request.getCorreo());
        cliente.setTelefono(request.getTelefono());
        cliente.setEstado(1);
        return cliente;
    }
}


