package com.example.sistema_servicios.repository;
import com.example.sistema_servicios.entity.Productos;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductosRepository extends JpaRepository<Productos, Long> {

    Page<Productos> findByEstado(Integer estado, Pageable pageable);
}
