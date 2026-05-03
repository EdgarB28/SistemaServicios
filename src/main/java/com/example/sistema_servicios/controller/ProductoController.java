package com.example.sistema_servicios.controller;
import com.example.sistema_servicios.dto.producto.ProductoRequestDTO;
import com.example.sistema_servicios.dto.producto.ProductoResponseDTO;
import com.example.sistema_servicios.service.producto.ProductoService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductoController {
    private final ProductoService productoService;

    public ProductoController(ProductoService productoService) {
        this.productoService = productoService;
    }

    @GetMapping
    public Page<ProductoResponseDTO> listar(Pageable pageable){
        return productoService.listarPaginado(pageable);
    }

    @GetMapping("/{id}")
    public ProductoResponseDTO buscar(@PathVariable Long id){
        return productoService.buscarProductoID(id);
    }

    @PostMapping
    public ProductoResponseDTO crear(
            @Valid @RequestBody ProductoRequestDTO request
    ){
        return productoService.guardarProducto(request);
    }

    @PostMapping("/{id}")
    public ProductoResponseDTO actualizar(
            @PathVariable Long id,
            @Valid @RequestBody ProductoRequestDTO request
    ){
        return productoService.actualizarProducto(id,request);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id){
        productoService.eliminarProducto(id);
    }

}
