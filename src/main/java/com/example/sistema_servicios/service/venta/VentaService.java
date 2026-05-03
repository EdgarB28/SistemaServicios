package com.example.sistema_servicios.service.venta;
import com.example.sistema_servicios.dto.venta.VentasRequestDTO;
import com.example.sistema_servicios.dto.venta.VentasResponseDTO;

public interface VentaService {
    VentasResponseDTO buscarVenta(long idVenta);
    VentasResponseDTO guardarVenta(VentasRequestDTO request);
    VentasResponseDTO actualizarVenta(long idVenta,VentasRequestDTO request);
    void eliminarVenta(Long idVenta);
}
