package com.example.sistema_servicios.service;

import com.example.sistema_servicios.dto.ProductoRequestDTO;
import com.example.sistema_servicios.dto.ProductoResponseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductoService {

    ProductoResponseDTO buscarProductoID(Long idProducto);
    ProductoResponseDTO guardarProducto(ProductoRequestDTO request);
    ProductoResponseDTO actualizarProducto (Long idProducto, ProductoRequestDTO request);

    void eliminarProducto(Long idProducto);
    Page<ProductoResponseDTO> listarPaginado(Pageable pageable);
}
