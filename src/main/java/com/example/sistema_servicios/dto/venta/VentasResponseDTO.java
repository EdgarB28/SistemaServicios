package com.example.sistema_servicios.dto.venta;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class VentasResponseDTO {
    private Long idVenta;
    private String cliente;
    private BigDecimal total;
    private LocalDateTime fecha;
    private List<DetalleVentaResponseDTO> detalles;

}
