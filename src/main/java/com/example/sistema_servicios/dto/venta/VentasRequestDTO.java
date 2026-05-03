package com.example.sistema_servicios.dto.venta;
import lombok.Data;
import java.util.List;

@Data
public class VentasRequestDTO {
    private Long clienteId;
    private List<DetalleVentaRequestDTO> detalles;

}
