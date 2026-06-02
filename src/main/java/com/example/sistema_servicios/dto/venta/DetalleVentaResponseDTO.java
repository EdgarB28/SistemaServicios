package com.example.sistema_servicios.dto.venta;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class DetalleVentaResponseDTO {
    private String producto;
    private Integer cantidad;
    private BigDecimal precio;
    private BigDecimal importe;
}
