package com.example.sistema_servicios.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ClienteRequestDTO {
    @NotBlank
    private String nombre;

    @NotBlank
    private String apellidos;

    @NotBlank
    private String nroDocumento;

    @Email
    private String correo;

    private String telefono;

}
