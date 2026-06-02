package com.example.sistema_servicios.service.venta;

import com.example.sistema_servicios.dto.venta.DetalleVentaRequestDTO;
import com.example.sistema_servicios.dto.venta.DetalleVentaResponseDTO;
import com.example.sistema_servicios.dto.venta.VentasRequestDTO;
import com.example.sistema_servicios.dto.venta.VentasResponseDTO;
import com.example.sistema_servicios.entity.Cliente;
import com.example.sistema_servicios.entity.DetalleVenta;
import com.example.sistema_servicios.entity.Productos;
import com.example.sistema_servicios.entity.Ventas;
import com.example.sistema_servicios.exception.ResourceNotFoundException;
import com.example.sistema_servicios.repository.ClienteRepository;
import com.example.sistema_servicios.repository.ProductosRepository;
import com.example.sistema_servicios.repository.VentasRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;


@Service
public class VentaServiceImpl implements VentaService{
    private final VentasRepository ventasRepository;
    private final ClienteRepository clienteRepository;
    private final ProductosRepository productoRepository;

    public VentaServiceImpl(VentasRepository ventasRepository,
                            ClienteRepository clienteRepository,
                            ProductosRepository productoRepository) {
        this.ventasRepository = ventasRepository;
        this.clienteRepository = clienteRepository;
        this.productoRepository= productoRepository;
    }

    @Override
    public VentasResponseDTO buscarVenta(long idVenta) {
         Ventas ventas = ventasRepository.findById(idVenta).
                 orElseThrow(() -> new ResourceNotFoundException("Venta no encontrada"));
        return mapToResponse(ventas);
    }


    @Override
    public VentasResponseDTO guardarVenta(VentasRequestDTO request) {
        Ventas venta = new Ventas();
        //VALIDAR LA EXISTENCIA DEL CLIENTE
        Cliente cliente = clienteRepository.findById(request.getClienteId())
                .orElseThrow(() -> new ResourceNotFoundException("Cliente no encontrado"));

        venta.setCliente(cliente);

        List<DetalleVenta> detalles = new ArrayList<>();

        BigDecimal total = BigDecimal.ZERO;

        for (DetalleVentaRequestDTO det : request.getDetalles()) {
            //VALIDAR EXISTENCIA DEL PRODUCTO
            Productos producto = productoRepository.findById(det.getProductoId())
                    .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado"));

            //CALCULAR EL IMPORTE
            BigDecimal precio = producto.getPrecio();
            BigDecimal importe = precio.multiply(BigDecimal.valueOf(det.getCantidad()));

            DetalleVenta detalle = new DetalleVenta();
            detalle.setVenta(venta);
            detalle.setProducto(producto);
            detalle.setCantidad(det.getCantidad());
            detalle.setPrecio(precio);
            detalle.setImporte(importe);

            //TOTAL DE LA VENTA
            total = total.add(importe);

            detalles.add(detalle);
        }

        venta.setImpTotal(total);
        venta.setDetalles(detalles);

        Ventas guardado = ventasRepository.save(venta);

        return mapToResponse(guardado);
    }

    @Override
    public VentasResponseDTO actualizarVenta(long idVneta, VentasRequestDTO request) {
        return null;
    }

    @Override
    public void eliminarVenta(Long idVenta) {

    }

    // METODOS
    private VentasResponseDTO mapToResponse(Ventas venta){
        VentasResponseDTO dto = new VentasResponseDTO();

        dto.setIdVenta(venta.getIdVentas());
        dto.setTotal(venta.getImpTotal());
        dto.setFecha(venta.getFechaCreacion());

        if (venta.getCliente() != null) {
            dto.setCliente(venta.getCliente().getNombre());
        }

        List<DetalleVentaResponseDTO> detallesDTO = venta.getDetalles()
                .stream()
                .map(det -> {

                    DetalleVentaResponseDTO dtoDet =
                            new DetalleVentaResponseDTO();

                    dtoDet.setProducto(
                            det.getProducto().getDescripcion());

                    dtoDet.setCantidad(
                            det.getCantidad());

                    dtoDet.setPrecio(
                            det.getPrecio());

                    dtoDet.setImporte(
                            det.getImporte());

                    return dtoDet;
                })
                .toList();

        dto.setDetalles(detallesDTO);

        return dto;
    };







}
