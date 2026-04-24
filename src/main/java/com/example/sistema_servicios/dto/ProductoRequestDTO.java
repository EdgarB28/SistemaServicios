package com.example.sistema_servicios.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductoRequestDTO {
    @NotBlank
    private String descripcion;
    @NotNull
    @Positive
    private Integer cantidad;
    @NotNull
    @Positive
    private BigDecimal precio;

}
