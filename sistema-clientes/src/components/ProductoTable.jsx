function ProductoTable({ productos, onEliminar, onEditar }) {
    const listaProductos = Array.isArray(productos) ? productos : [];
 

    return (
        <table className="table table-striped table-hover">
            <thead className="table-dark">
                <tr>
                    <th>Descripcion</th>
                    <th>cantidad</th>
                    <th>precio</th>
                    <th>estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>

            <tbody>
                {listaProductos.map(producto => {
                    const estaActivo = Number(producto.estado) === 1;

                    return (
                        <tr key={producto.idProducto}>
                            <td>{producto.descripcion}</td>
                            <td>{producto.cantidad}</td>
                            <td>{producto.precio}</td>
                            <td>
                                <span className={`badge ${estaActivo ? "bg-success" : "bg-danger"}`}>
                                    {estaActivo ? "Activo" : "Eliminado"}
                                </span>
                            </td>
                            <td>
                                <button
                                    className="btn btn-danger btn-sm me-2"
                                    onClick={() => onEliminar(producto)}
                                >
                                    Eliminar
                                </button>

                                <button
                                    className="btn btn-warning btn-sm"
                                    onClick={() => onEditar(producto)}
                                >
                                    Editar
                                </button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>

        </table>

    );

}

export default ProductoTable;
