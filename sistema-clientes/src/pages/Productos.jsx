import { useEffect, useState } from "react";
import { listarProductos, crearProducto, eliminarProducto, actualizarProducto } from "../services/productoService";
import ProductoTable from "../components/ProductoTable";
import Swal from "sweetalert2";
import Modal from "../components/modal";
import ProductoForm from "../components/ProductosForm";

function Productos({ filtroEstado = "todos" }) {
    const [productos, setProductos] = useState([]);
    const [productosFiltrados, setProductosFiltrados] = useState([]);
    const [editandoId, setEditandoId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [errors, setErrors] = useState({});
    const [busqueda, setBusqueda] = useState("");
    const productoEstaActivo = (estado) => Number(estado) === 1;
    const filtrarProductosPorEstado = (listaProductos) => {
        if (filtroEstado === "activos") {
            return listaProductos.filter(producto => productoEstaActivo(producto.estado));
        }

        if (filtroEstado === "eliminados") {
            return listaProductos.filter(producto => !productoEstaActivo(producto.estado));
        }

        return listaProductos;
    };

    const tituloProductos = filtroEstado === "activos"
        ? "Productos activos"
        : filtroEstado === "eliminados"
            ? "Productos eliminados"
            : "Productos";

    useEffect(() => {
        cargarProductos();
    }, []);

    const cargarProductos = async () => {
        const data = await listarProductos();
        setProductos(Array.isArray(data) ? data : data.content ?? []);
    };

    const [form, setForm] = useState({
        descripcion: "",
        cantidad: "",
        precio: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm({
            ...form,
            [name]:
                name === "cantidad"
                    ? parseInt(value) || ""
                    : name === "precio"
                        ? parseFloat(value) || ""
                        : value,
        });

        setErrors({
            ...errors,
            [name]: ""
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validar()) return;

        try {
            if (editandoId) {
                await actualizarProducto(editandoId, form);
            } else {
                await crearProducto(form);
            }

            await cargarProductos();

            setForm({
                descripcion: "",
                cantidad: "",
                precio: ""
            });

            setEditandoId(null);
            setShowModal(false);

            Swal.fire({
                icon: "success",
                title: "Éxito",
                text: "Producto guardado correctamente",
                timer: 2000,
                showConfirmButton: false,
            });


        } catch (error) {
            console.log(error);

            Swal.fire({
                icon: "error",
                title: "Error",
                text: error.message || "Ocurrió un error",
            });

        }
    };

    const handleCrearProducto = () => {
        setForm({
            descripcion: "",
            cantidad: "",
            precio: ""
        });

        setEditandoId(null);
        setErrors({});
        setShowModal(true);
    };

    const handleEliminar = async (producto) => {
        if (!productoEstaActivo(producto.estado)) {
            Swal.fire({
                icon: "info",
                title: "Producto eliminado",
                text: "Este producto ya esta eliminado",
            });
            return;
        }

        const result = await Swal.fire({
            title: "¿Estás seguro?",
            text: "No podrás revertir esto",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        });

        if (result.isConfirmed) {
            await eliminarProducto(producto.idProducto);
            await cargarProductos();

            Swal.fire("Eliminado", "El Producto fue eliminado", "success");
        }
    };

    const handleEditar = (producto) => {
        if (!productoEstaActivo(producto.estado)) {
            Swal.fire({
                icon: "info",
                title: "Producto eliminado",
                text: "Este producto ya esta eliminado",
            });
            return;
        }

        setForm({
            descripcion: producto.descripcion,
            cantidad: producto.cantidad,
            precio: producto.precio,
            estado: producto.estado
        });

        setEditandoId(producto.idProducto);
        setShowModal(true);
    };

    const validar = () => {
        let nuevosErrores = {};

        if (!form.descripcion.trim()) {
            nuevosErrores.descripcion = "Colocar el nombre del producto";
        }

        if (form.cantidad === "" || form.cantidad === null) {
            nuevosErrores.cantidad = "Colocar la cantidad";
        } else if (form.cantidad <= 0) {
            nuevosErrores.cantidad = "La cantidad debe ser mayor a 0";
        }

        if (form.precio === "" || form.precio === null) {
            nuevosErrores.precio = "Colocar el precio";
        } else if (form.precio <= 0) {
            nuevosErrores.precio = "El precio debe ser mayor a 0";
        }
        setErrors(nuevosErrores);

        return Object.keys(nuevosErrores).length === 0;
    };

    /* const opcionesProductos = productos.map(producto => ({
          value: producto.id,
          label: producto.descripcion
      }));*/

    useEffect(() => {
        const productosBase = filtrarProductosPorEstado(productos);

        if (!busqueda) {
            setProductosFiltrados([]);
            return;
        }

        const resultado = productosBase.filter(c =>
            c.descripcion.toLowerCase().includes(busqueda.toLowerCase())
        );

        setProductosFiltrados(resultado);
    }, [busqueda, productos, filtroEstado]);

    return (
        <div>
            <h3 className="text-start">{tituloProductos}</h3>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div style={{ position: "relative", width: "350px" }}>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleCrearProducto}
                    >
                        Crear Producto
                    </button>
                </div>
            </div>

            <hr />

            <h5 className="text-start">Lista de Productos</h5>

            <ProductoTable
                productos={busqueda ? productosFiltrados : filtrarProductosPorEstado(productos)}  //datos
                onEliminar={handleEliminar} //funcion
                onEditar={handleEditar} //funcion
            />


            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                title="Registrar Producto"
            >
                <ProductoForm
                    form={form}
                    errors={errors}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                />
            </Modal>

        </div>



    )
}

export default Productos;
