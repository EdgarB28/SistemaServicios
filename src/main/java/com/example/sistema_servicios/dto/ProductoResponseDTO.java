package com.example.sistema_servicios.dto;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductoResponseDTO {
    private Long idProducto;
    private String descripcion;
    private Integer cantidad;
    private BigDecimal precio;
    private Integer estado;

}
