package com.example.sistema_servicios.service;

import com.example.sistema_servicios.entity.Cliente;
import com.example.sistema_servicios.repository.ClienteRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClienteServiceImpl implements ClienteService{
    private final ClienteRepository clienteRepository;

    // Inyección por constructor (forma profesional)
    public ClienteServiceImpl(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    @Override
    public List<Cliente> listarTodos() {
        return clienteRepository.findAll();
    }

    @Override
    public Cliente buscarPorId(Long id) {
        return clienteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));
    }

    @Override
    public Cliente guardar(Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    @Override
    public Cliente actualizar(Long id, Cliente cliente) {
        Cliente cl = buscarPorId(id);

        cl.setNombre(cliente.getNombre());
        cl.setApellidos(cliente.getApellidos());
        cl.setCorreo(cliente.getCorreo());
        cl.setTelefono(cliente.getTelefono());

        return clienteRepository.save(cliente);
    }

    @Override
    public void eliminar(Long id) {
        clienteRepository.deleteById(id);
    }

    }
