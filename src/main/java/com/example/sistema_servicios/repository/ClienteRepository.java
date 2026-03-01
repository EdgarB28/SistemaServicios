package com.example.sistema_servicios.repository;

import com.example.sistema_servicios.entity.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {

    boolean existsByNroDocumento(String nroDocumento);

    boolean existsByCorreo(String correo);

    Page<Cliente> findByEstado(Integer estado, Pageable pageable);
}
