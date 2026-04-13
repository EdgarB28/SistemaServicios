package com.example.sistema_servicios.entity;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "productos")
public class Productos {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_productos")
    private Long idProductos;

    @Column(nullable = false, length = 150)
    private String descripcion;

    @Column(length = 150)
    private Integer  cantidad;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal precio;

    @Column(nullable = false)
    private Integer estado = 1;

    @Column(name = "u_creacion", length = 150)
    private String usuarioCreacion;

    @Column(name = "f_creacion", updatable = false)
    private LocalDateTime fechaCreacion;

    @PrePersist
    public void prePersist() {
        this.fechaCreacion = LocalDateTime.now();
    }

}
