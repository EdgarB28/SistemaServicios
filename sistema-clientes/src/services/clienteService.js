const API_URL = "http://localhost:8080/api/clientes";

export const listarClientes = async () => {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
};

export const crearCliente = async (cliente) => {
  const response = await fetch("http://localhost:8080/api/clientes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cliente),
  });

  const data = await response.json(); 

  if (!response.ok) {
    throw data; 
  }

  return data;
};

export const eliminarCliente = async (id) => {
  await fetch(`http://localhost:8080/api/clientes/${id}`, {
    method: "DELETE",
  });
};

export const actualizarCliente = async (id, cliente) => {
  const response = await fetch(`http://localhost:8080/api/clientes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cliente),
  });

  return await response.json();
};
