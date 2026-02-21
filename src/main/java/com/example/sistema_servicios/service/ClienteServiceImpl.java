package com.example.sistema_servicios.service;

import com.example.sistema_servicios.dto.ClienteRequestDTO;
import com.example.sistema_servicios.dto.ClienteResponseDTO;
import com.example.sistema_servicios.entity.Cliente;
import org.springframework.stereotype.Service;


@Service
public class ClienteServiceImpl {

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


