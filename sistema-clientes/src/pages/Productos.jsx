import { useEffect, useState } from "react";
import { listarProductos, crearProducto, eliminarProducto, actualizarProducto } from "../services/productoService";
import ProductoTable from "../components/ProductoTable";
import Swal from "sweetalert2";

function Productos() {
    const [productos, setProductos] = useState([]);
    const [productosFiltrados, setProductosFiltrados] = useState([]);
    const [editandoId, setEditandoId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [errors, setErrors] = useState({});
    const [busqueda, setBusqueda] = useState("");

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
        precio: "",
        estado: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm({
            ...form,
            [e.target.name]: e.target.value,
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
                precio: "",
                estado: ""
            });

            setEditandoId(null);
            setShowModal(false);

            Swal.fire({
                icon: "success",
                title: "Éxito",
                text: "Produucto guardado correctamente",
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
            precio: "",
            estado: ""
        });

        setEditandoId(null);
        setErrors({});
        setShowModal(true);
    };

    const handleEliminar = async (id) => {
        const result = await Swal.fire({
            title: "¿Estás seguro?",
            text: "No podrás revertir esto",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        });

        if (result.isConfirmed) {
            await eliminarProducto(id);
            await cargarProductos();

            Swal.fire("Eliminado", "El Producto fue eliminado", "success");
        }
    };

    const handleEditar = (producto) => {
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

        if (!form.cantidad.trim()) {
            nuevosErrores.apellidos = "Colocar la cantidad";
        }

        if (!form.precio.trim()) {
            nuevosErrores.nroDocumento = "Colocar el precio";
        }
        setErrors(nuevosErrores);

        return Object.keys(nuevosErrores).length === 0;
    };

  /* const opcionesProductos = productos.map(producto => ({
        value: producto.id,
        label: producto.descripcion
    }));*/

    useEffect(() => {
        if (!busqueda) {
            setProductosFiltrados([]);
            return;
        }

        const resultado = productos.filter(c =>
            c.descripcion.toLowerCase().includes(busqueda.toLowerCase())  
        );

        setProductosFiltrados(resultado);
    }, [busqueda, productos]);

    return (
        <div>
            <h3 className="text-start">Productos</h3>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div style={{ position: "relative", width: "350px" }}>

                </div>
            </div>

            <hr />

            <h5 className="text-start">Lista de Productos</h5>

            <ProductoTable
                productos={productosFiltrados.length ? productosFiltrados : productos}  //datos
                onEliminar={handleEliminar} //funcion
                onEditar={handleEditar} //funcion
            />

        </div>



    )
}

export default Productos;
