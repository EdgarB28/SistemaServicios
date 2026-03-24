import { useEffect, useState } from "react";
import { listarClientes, crearCliente, eliminarCliente, actualizarCliente } from "../services/clienteService";
import ClienteTable from "../components/ClienteTable";

function Clientes() {

  const [clientes, setClientes] = useState([]);

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
  };

  return (
    <div>
      <h2>Lista de Clientes</h2>

      <ClienteTable
        clientes={clientes}  //datos
        onEliminar={handleEliminar} //funcion
        onEditar={handleEditar} //funcion
      />



      <h2>Registrar Cliente</h2>

      <form onSubmit={handleSubmit}>
        <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} />
        <input name="apellidos" placeholder="Apellidos" value={form.apellidos} onChange={handleChange} />
        <input name="nroDocumento" placeholder="Documento" value={form.nroDocumento} onChange={handleChange} />
        <input name="correo" placeholder="Correo" value={form.correo} onChange={handleChange} />
        <input name="telefono" placeholder="Teléfono" value={form.telefono} onChange={handleChange} />

        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}

export default Clientes;