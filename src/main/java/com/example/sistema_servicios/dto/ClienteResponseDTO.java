package com.example.sistema_servicios.dto;
import lombok.Data;

@Data
public class ClienteResponseDTO {
    private Long id;
    private String nombreCompleto;
    private String nroDocumento;
    private String correo;
    private String telefono;
    private Integer estado;


}
