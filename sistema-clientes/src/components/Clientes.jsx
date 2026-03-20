import { useEffect, useState } from "react";
import { listarClientes, crearCliente } from "../services/clienteService";

function Clientes() {

  const [clientes, setClientes] = useState([]);

  useEffect( () => {
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

    await crearCliente(form);

    cargarClientes(); // refrescar tabla

    setForm({
      nombre: "",
      apellidos: "",
      nroDocumento: "",
      correo: "",
      telefono: "",
    });
  };

  return (
    <div>
      <h2>Lista de Clientes</h2>

      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Documento</th>
            <th>Correo</th>
          </tr>
        </thead>

        <tbody>
          {clientes.map(cliente => (
            <tr key={cliente.id}>
              <td>{cliente.id}</td>
              <td>{cliente.nombreCompleto}</td>
              <td>{cliente.nroDocumento}</td>
              <td>{cliente.correo}</td>
            </tr>
          ))}
        </tbody>

      </table>



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