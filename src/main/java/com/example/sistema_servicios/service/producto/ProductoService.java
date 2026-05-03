package com.example.sistema_servicios.service.producto;

import com.example.sistema_servicios.dto.producto.ProductoRequestDTO;
import com.example.sistema_servicios.dto.producto.ProductoResponseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductoService {

    ProductoResponseDTO buscarProductoID(Long idProducto);
    ProductoResponseDTO guardarProducto(ProductoRequestDTO request);
    ProductoResponseDTO actualizarProducto (Long idProducto, ProductoRequestDTO request);

    void eliminarProducto(Long idProducto);
    Page<ProductoResponseDTO> listarPaginado(Pageable pageable);
}
