import { useEffect, useState } from "react";
import { listarClientes, crearCliente, eliminarCliente, actualizarCliente } from "../services/clienteService";
import ClienteTable from "../components/ClienteTable";
import Modal from "../components/modal";

function Clientes() {

  const [clientes, setClientes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editandoId, setEditandoId] = useState(null);

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

  return (
    <div>
      <h2>Lista de Clientes</h2>

      <button
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
          <input className="form-control mb-2" name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} />
          <input className="form-control mb-2" name="apellidos" placeholder="Apellidos" value={form.apellidos} onChange={handleChange} />
          <input className="form-control mb-2" name="nroDocumento" placeholder="Documento" value={form.nroDocumento} onChange={handleChange} />
          <input className="form-control mb-2" name="correo" placeholder="Correo" value={form.correo} onChange={handleChange} />
          <input className="form-control mb-2" name="telefono" placeholder="Teléfono" value={form.telefono} onChange={handleChange} />

          <button className="btn btn-success" type="submit">
            Guardar
          </button>
        </form>
      </Modal>
    </div>



  );
}

export default Clientes;