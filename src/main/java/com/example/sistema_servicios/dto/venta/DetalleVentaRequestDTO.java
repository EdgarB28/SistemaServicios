package com.example.sistema_servicios.dto.venta;

import lombok.Data;

@Data
public class DetalleVentaRequestDTO {
    private Long productoId;
    private Integer cantidad;
}
