import { useEffect, useState } from "react";
import { listarProductos, crearProducto, eliminarProducto, actualizarProducto } from "../services/productoService";
import ProductoTable from "../components/ProductoTable";

function Productos() {
    const [productos, setProductos] = useState([]);
    const [productosFiltrados, setProductosFiltrados] = useState([]);

    useEffect(() => {
        cargarProductos();
    }, []);

    const cargarProductos = async () => {
        const data = await listarProductos();
        setProductos(data);
    };


    return (
        <div>
            <h3 className="text-start">Productos</h3>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div style={{ position: "relative", width: "350px" }}>

                </div>
            </div>

            <hr />

            <h5 className="text-start">Lista de Productos</h5>

            < ProductoTable
                Productos={clientesFiltrados.length ? clientesFiltrados : clientes}  //datos
            //onEliminar={handleEliminar} //funcion
            //onEditar={handleEditar} //funcion
            />

        </div>



    )
}

export default Productos;