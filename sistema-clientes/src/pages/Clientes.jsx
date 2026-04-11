import { useEffect, useState } from "react";
import { listarClientes, crearCliente, eliminarCliente, actualizarCliente } from "../services/clienteService";
import ClienteTable from "../components/ClienteTable";
import Modal from "../components/modal";
import ClienteForm from "../components/ClientesForm";
import Swal from "sweetalert2";
import Select from "react-select";
import { FaSearch, FaTimes } from "react-icons/fa";

function Clientes() {

  const [clientes, setClientes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  const [errors, setErrors] = useState({});
  const [inputValue, setInputValue] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [clientesFiltrados, setClientesFiltrados] = useState([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);

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
  
  const handleCrearCliente = () => {
  setForm({
    nombre: "",
    apellidos: "",
    nroDocumento: "",
    correo: "",
    telefono: "",
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

  const opcionesClientes = clientes.map(cliente => ({
    value: cliente.id,
    label: `${cliente.nombreCompleto} - ${cliente.nroDocumento}`
  }));

  useEffect(() => {
    if (!busqueda) {
      setClientesFiltrados([]);
      return;
    }

    const resultado = clientes.filter(c =>
      c.nombreCompleto.toLowerCase().includes(busqueda.toLowerCase()) ||
      c.nroDocumento.includes(busqueda)
    );

    setClientesFiltrados(resultado);
  }, [busqueda, clientes]);

  return (
    <div>
      <h3 className="text-start">Clientes</h3>
      <div className="d-flex justify-content-between align-items-center mb-3">

        <div style={{ position: "relative", width: "350px" }}>
 
          <Select
            options={opcionesClientes}
            inputValue={inputValue}
            onInputChange={(value) => {
              setInputValue(value); 
            }}
            onChange={(option) => {
              setClienteSeleccionado(option);

              if (option) {
                const cliente = clientes.find(c => c.id === option.value);
                setClientesFiltrados([cliente]);
              } else {
                setClientesFiltrados([]);
              }
            }}
            isSearchable
            isClearable
            placeholder="Buscar cliente..."
          />
 
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={handleCrearCliente}
        >
          Crear Cliente
        </button>
      </div>

      <hr />

      <h5 className="text-start">Lista de Clientes</h5>



      <ClienteTable
        clientes={clientesFiltrados.length ? clientesFiltrados : clientes}  //datos
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
    </div >



  );
}

export default Clientes;