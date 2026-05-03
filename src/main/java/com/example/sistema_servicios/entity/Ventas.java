package com.example.sistema_servicios.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "ventas")
public class Ventas {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_ventas")
    private Long idVentas;

    @Column(name = "imp_total")
    private BigDecimal impTotal;

    @Column(name = "u_creacion")
    private String usuarioCreacion;

    @Column(name = "f_creacion")
    private LocalDateTime fechaCreacion;

    @Column(name = "estado")
    private Integer estado;

    @ManyToOne
    @JoinColumn(name = "id_cliente")
    private Cliente cliente;

    @OneToMany(mappedBy = "venta", cascade = CascadeType.ALL)
    private List<DetalleVenta> detalles;
}
