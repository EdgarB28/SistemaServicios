import { useEffect, useState } from "react";
import { listarClientes, crearCliente, eliminarCliente, actualizarCliente } from "../services/clienteService";
import ClienteTable from "../components/ClienteTable";
import Modal from "../components/modal";
import ClienteForm from "../components/ClientesForm";
import Swal from "sweetalert2";

function Clientes() {

  const [clientes, setClientes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    cargarClientes();
  }, []);

  const cargarClientes = async () => {
    const data = await listarClientes();
    setClientes(data.content);
  };

  const [form, setForm] = useState({
    nombre: "",
    apellidos: "",
    nroDocumento: "",
    correo: "",
    telefono: "",
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
        await actualizarCliente(editandoId, form);
      } else {
        await crearCliente(form);
      }

      await cargarClientes();

      setForm({
        nombre: "",
        apellidos: "",
        nroDocumento: "",
        correo: "",
        telefono: "",
      });

      setEditandoId(null);
      setShowModal(false);

      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Cliente guardado correctamente",
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
      await eliminarCliente(id);
      await cargarClientes();

      Swal.fire("Eliminado", "El cliente fue eliminado", "success");
    }
  };

  const handleEditar = (cliente) => {
    setForm({
      nombre: cliente.nombreCompleto.split(" ")[0],
      apellidos: cliente.nombreCompleto.split(" ").slice(1).join(" "),
      nroDocumento: cliente.nroDocumento,
      correo: cliente.correo,
      telefono: cliente.telefono,
    });

    setEditandoId(cliente.id);
    setShowModal(true);
  };

  const validar = () => {
    let nuevosErrores = {};

    if (!form.nombre.trim()) {
      nuevosErrores.nombre = "El nombre es obligatorio";
    }

    if (!form.apellidos.trim()) {
      nuevosErrores.apellidos = "Los apellidos son obligatorios";
    }

    if (!form.nroDocumento.trim()) {
      nuevosErrores.nroDocumento = "El documento es obligatorio";
    }

    if (!form.correo.trim()) {
      nuevosErrores.correo = "El correo es obligatorio";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo)) {
      nuevosErrores.correo = "Correo inválido";
    }

    if (!form.telefono.trim()) {
      nuevosErrores.telefono = "El teléfono es obligatorio";
    }

    setErrors(nuevosErrores);

    return Object.keys(nuevosErrores).length === 0;
  };

  return (
    <div>
      <h3 className="text-start">Clientes</h3>

      {/* Fila buscador + botón */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        {/* Buscador (izquierda) */}
        <input
          type="text"
          className="form-control"
          placeholder="Buscar..."
          style={{ width: "300px" }}
        />

        {/* Botón (derecha) */}
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
        >
          Crear Cliente
        </button>
      </div>

      <hr />

      <h5 className="text-start">Lista de Clientes</h5>



      <ClienteTable
        clientes={clientes}  //datos
        onEliminar={handleEliminar} //funcion
        onEditar={handleEditar} //funcion
      />

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        title="Registrar Cliente"
      >
        <ClienteForm
          form={form}
          errors={errors}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </Modal>
    </div>



  );
}

export default Clientes;