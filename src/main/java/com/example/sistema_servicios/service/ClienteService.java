package com.example.sistema_servicios.service;
import com.example.sistema_servicios.entity.Cliente;

import java.util.List;
import java.util.Optional;
public interface ClienteService {

    List<Cliente> listarTodos();

    public Cliente buscarPorId(Long id);

    Cliente guardar(Cliente cliente);

    Cliente actualizar(Long id, Cliente cliente);

    void eliminar(Long id);
}
