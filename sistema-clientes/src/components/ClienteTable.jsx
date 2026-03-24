function ClienteTable({ clientes, onEliminar, onEditar }) {
    return (
        <table className="table table-striped table-hover">
            <thead className="table-dark">
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Documento</th>
                    <th>Correo</th>
                    <th>Acciones</th>
                </tr>
            </thead>

            <tbody>
                {clientes.map(cliente => (
                    <tr key={cliente.id}>
                        <td>{cliente.id}</td>
                        <td>{cliente.nombreCompleto}</td>
                        <td>{cliente.nroDocumento}</td>
                        <td>{cliente.correo}</td>
                        <td>
                            <button
                                className="btn btn-danger btn-sm me-2"
                                onClick={() => onEliminar(cliente.id)}
                            >
                                Eliminar
                            </button>

                            <button
                                className="btn btn-warning btn-sm"
                                onClick={() => onEditar(cliente)}
                            >
                                Editar
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default ClienteTable;