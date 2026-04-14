package com.example.sistema_servicios.dto;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductoRequestDTO {
    @NotBlank
    private String descripcion;
    @NotBlank
    private Integer cantidad;
    @NotBlank
    private BigDecimal precio;

}
