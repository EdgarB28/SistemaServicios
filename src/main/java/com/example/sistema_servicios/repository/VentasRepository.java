package com.example.sistema_servicios.repository;

import com.example.sistema_servicios.entity.Ventas;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VentasRepository extends JpaRepository<Ventas,Long> {
}
