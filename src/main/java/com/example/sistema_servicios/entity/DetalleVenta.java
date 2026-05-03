package com.example.sistema_servicios.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Getter
@Setter
@Table(name = "detalle_ventas")
public class DetalleVenta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idDetalle;

    @ManyToOne
    @JoinColumn(name = "id_ventas")
    private Ventas venta;

    @ManyToOne
    @JoinColumn(name = "id_productos")
    private Productos producto;

    private Integer cantidad;

    private BigDecimal precio;

    private BigDecimal importe;
}
