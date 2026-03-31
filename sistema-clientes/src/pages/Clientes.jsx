import { useEffect, useState } from "react";
import { listarClientes, crearCliente, eliminarCliente, actualizarCliente } from "../services/clienteService";
import ClienteTable from "../components/ClienteTable";
import Modal from "../components/modal";

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
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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

    } catch (error) {
      console.error("Error", error);
    }
  };


  const handleEliminar = async (id) => {
    await eliminarCliente(id);
    await cargarClientes();
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
    } else if (!/\S+@\S+\.\S+/.test(form.correo)) {
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
      <h2>Lista de Clientes</h2>

      <button
        type="button"
        className="btn btn-primary mb-3"
        onClick={() => setShowModal(true)}
      >
        Crear Cliente
      </button>

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
        <form onSubmit={handleSubmit}>
          <input
            className={`form-control mb-1 ${errors.nombre ? "is-invalid" : ""}`}
            name="nombre"
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleChange}
          />
          {errors.nombre && (
            <div className="invalid-feedback">
              {errors.nombre}
            </div>
          )}
          <input className={`form-control mb-1 ${errors.apellidos ? "is-invalid" : ""}`}
            name="apellidos" placeholder="Apellidos" value={form.apellidos} onChange={handleChange} />
          {errors.apellidos && (
            <div className="invalid-feedback">
              {errors.apellidos}
            </div>
          )}
          <input className={`form-control mb-1 ${errors.nroDocumento ? "is-invalid" : ""}`}
            name="nroDocumento" placeholder="Documento" value={form.nroDocumento} onChange={handleChange} />
          {errors.nroDocumento && (
            <div className="invalid-feedback">
              {errors.nroDocumento}
            </div>
          )}
          <input className={`form-control mb-1 ${errors.correo ? "is-invalid" : ""}`}
            name="correo" placeholder="Correo" value={form.correo} onChange={handleChange} />
          {errors.correo && (
            <div className="invalid-feedback">
              {errors.correo}
            </div>
          )}
          <input className={`form-control mb-1 ${errors.telefono ? "is-invalid" : ""}`}
            name="telefono" placeholder="Teléfono" value={form.telefono} onChange={handleChange} />
          {errors.telefono && (
            <div className="invalid-feedback">
              {errors.telefono}
            </div>
          )}

          <button className="btn btn-success" type="submit">
            Guardar
          </button>
        </form>
      </Modal>
    </div>



  );
}

export default Clientes;