package com.example.sistema_servicios.service;

import com.example.sistema_servicios.dto.ClienteRequestDTO;
import com.example.sistema_servicios.dto.ProductoRequestDTO;
import com.example.sistema_servicios.dto.ProductoResponseDTO;
import com.example.sistema_servicios.entity.Productos;
import com.example.sistema_servicios.exception.ResourceNotFoundException;
import com.example.sistema_servicios.repository.ProductosRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ProductoServicieImpl implements  ProductoService{
    private final ProductosRepository productosRepository;

    public ProductoServicieImpl(ProductosRepository productosRepository) {
        this.productosRepository = productosRepository;
    }


    @Override
    public ProductoResponseDTO buscarProductoID(Long idProducto) {
        Productos productos = productosRepository.findById(idProducto).
                orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado"));
        return mapToResponse(productos);
    }

    @Override
    public ProductoResponseDTO guardarProducto(ProductoRequestDTO request) {
        Productos productos = mapToEntity(request);
        Productos guardado = productosRepository.save(productos);

        return mapToResponse(guardado);
    }

    @Override
    public ProductoResponseDTO actualizarProducto(Long idProducto, ProductoRequestDTO request) {
        Productos productos = productosRepository.findById(idProducto)
                .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado"));

        productos.setDescripcion(request.getDescripcion());
        productos.setCantidad(request.getCantidad());
        productos.setPrecio(request.getPrecio());

        Productos actualizar = new Productos();
        return mapToResponse(actualizar);
    }

    @Override
    public void eliminarProducto(Long idProducto) {
        Productos productos = productosRepository.findById(idProducto)
                .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado"));

        productos.setEstado(0);
        productosRepository.save(productos);
    }

    @Override
    public Page<ProductoResponseDTO> listarPaginado(Pageable pageable) {
        return productosRepository.findByEstado(1, pageable)
                .map(this::mapToResponse);
    }

    // METODOS
    private ProductoResponseDTO mapToResponse(Productos productos) {
        ProductoResponseDTO dto= new ProductoResponseDTO();
        dto.setIdProducto(productos.getIdProductos());
        dto.setDescripcion(productos.getDescripcion());
        dto.setCantidad(productos.getCantidad());
        dto.setPrecio(productos.getPrecio());
        dto.setEstado(productos.getEstado());
        return dto;
    }

    private Productos mapToEntity(ProductoRequestDTO request) {
        Productos productos = new Productos();
        productos.setDescripcion(request.getDescripcion());
        productos.setCantidad(request.getCantidad());
        productos.setPrecio(request.getPrecio());
        productos.setEstado(1);
        return productos;
    }

}
